// 组件
import WLogin from './login/index';
import WLoginWap from './login-wap/index';
import WJiyan from './jiyan/index';

import PcTem from './login/Login';
import WapTem from './login-wap/Login';

const waterCpt = {
  WLogin,
  WLoginWap,
  WJiyan,
};

const install = (Vue) => {
  if (install.installed) return;

  Object.keys(waterCpt).forEach((key) => {
    Vue.component(key, waterCpt[key]);
  });
};


if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  version: '1.0.0',
  install,
  PcTem,
  WapTem,
};
