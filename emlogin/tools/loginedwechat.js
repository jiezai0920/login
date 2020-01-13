/* eslint-disable */
import jsonp from 'em-jsonp';
import CONSTANT from '../contant';

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
    window.$cookie.set(`${CONSTANT.EVENT_MEMBER_LEVEL}?org_id=${orgId}`, result.data.level, newExpires, '/', domainStr);
    window.$cookie.set(`${CONSTANT.EVENT_USER_UID}?org_id=${orgId}`, result.data.uid, newExpires, '/', domainStr);
    window.$cookie.set(`${CONSTANT.EVENT_USER_ORGID}`, result.data.org_id, newExpires, '/', domainStr);
    window.$cookie.set(`${CONSTANT.EVENT_USER_PHONE}?org_id=${orgId}`, result.data.phone, newExpires, '/', domainStr);
    window.$cookie.set(`${CONSTANT.EVENT_USER_LOGO}`, result.data.org_logo, newExpires, '/', domainStr);
    callback();
  }, 100);
};
