/* eslint-disable */
import jsonp from 'em-jsonp';
import CONSTANT from '../contant';

const afterLogin = (callbackUrl, inow, self, callback) => {
  let theIndex = inow;
  const urlSplit = callbackUrl[theIndex].split('?');
  const newUrl = urlSplit[0];
  let data = urlSplit[1];
  data = data.replace(/=/g, '":"').replace(/&/g, '","');
  data = JSON.parse(`{"${data}"}`);
  window.$jsonp({
    url: newUrl,
    data,
    success: (res) => {
      if (res.code === CONSTANT.AJAX_SUCCESS) {
        if (theIndex === 0) {
          callback();
        } else {
          afterLogin(callbackUrl, --theIndex, self, callback);
        }
      } else {
        self.$EmfeMessage.error({
          content: '登录失败',
        });
      }
    },
    error: () => {
      self.$EmfeMessage.error({
        content: '登录失败',
      });
    },
  });
};

const removeAllTokenCookie = (domain) => {
  const cookies = document.cookie.split('; ');
  // 过滤所有 token
  const oldToken = cookies.filter(cookieItem => cookieItem.indexOf(CONSTANT.EVENT_TOKE) > -1);
  oldToken.forEach((oToken) => {
    const oTokenList = oToken.split('=');
    if (oTokenList.length > 0) {
      window.$cookie.remove(decodeURIComponent(oTokenList[0]), '/', domain);
    }
  });
};

export default (result, orgId, self, callback) => {
  afterLogin(result.data.call_back_url, result.data.call_back_url.length - 1, self, () => {
    const { expires, token } = result.data;
    // 获取当前的时间戳
    const timestamp = new Date().getTime() / 1000;
    // 用过期时间戳-当前时间戳 = cookie有效期的秒数
    // (先判断下这个有效期是否>=0, 否则设置一个默认值)
    const newExpiresStamp = expires - timestamp;
    const newExpires = newExpiresStamp <= 0 ? CONSTANT.COOKIE_EXPIRE_TIME : newExpiresStamp;
    let domainStr = self.domain || '';

    removeAllTokenCookie(domainStr);
    setTimeout(() => {
      window.$cookie.set(`${CONSTANT.EVENT_TOKE}?org_id=${orgId}`, `${CONSTANT.COOKIE_PERFIX_TOKEN}${token}`, newExpires, '/', domainStr);
      window.$cookie.set(CONSTANT.EVENT_USER_INFO, result.data.real_name, newExpires, '/', domainStr);
      callback();
    }, 100);
  });
};
