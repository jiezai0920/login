/* eslint-disable */
import CONSTANT from '../contant';

export const removeAllTokenCookie = (domain) => {
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
  const { expires } = result.data;
  const timestamp = new Date().getTime() / 1000; // 获取当前的时间戳
  // 用过期时间戳-当前时间戳 = cookie有效期的秒数
  // (先判断下这个有效期是否>=0, 否则设置一个默认值)
  const newExpires = (expires - timestamp) <= 0 ? 3600 * 24 : expires - timestamp;
  let domain = self.domain || '';
  // removeAllTokenCookie(domain);
  setTimeout(() => {
    window.$cookie.set(`${CONSTANT.EVENT_EMTOKEN}_${orgId}`, `${CONSTANT.COOKIE_PERFIX_TOKEN} ${result.data.token}`, newExpires, '/', domain);
    window.$cookie.set(`${CONSTANT.EVENT_USER_UID}?org_id=${orgId}`, result.data.uid, newExpires, '/', domain);
    callback();
  }, 100);
};
