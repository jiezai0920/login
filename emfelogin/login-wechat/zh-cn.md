# 登录弹框(wechat)
> 基于Vue.js 的 前端业务组件。


## 英文版案例演示

<div class="demo-box">
  <button type="button" name="button" @click="englishStatus = true">登录</button>
  <w-login-wechat :domain="domain" :value="value1" :show="englishStatus" :close="englishClose" :success="success" orgid="100253" :countrycodeAction="countrycodeAction" :sendAction="sendAction" :loginAction="loginAction" :sendEnglishAction="sendEnglishAction" :loginEnglishAction="loginEnglishAction"  lang="zzz"></w-login-wechat>
</div>


``` vue
<div class="demo-box">
  <button type="button" name="button" @click="englishStatus = true">登录</button>
  <w-login-wechat :show="englishStatus" :close="englishClose" :success="success" orgid="100253" :countrycodeAction="countrycodeAction" :sendAction="sendAction" :loginAction="loginAction"  :sendEnglishAction="sendEnglishAction" :loginEnglishAction="loginEnglishAction"  lang="zzz"></w-login-wechat>
</div>
```

## 中文版案例演示

<div class="demo-box">
  <button type="button" name="button" @click="chinaStatus = true">登录</button>
  <w-login-wechat :oauthType="oauthType" :value="value1" :show="chinaStatus" :close="chinaClose" :success="success" orgid="100253" :countrycodeAction="countrycodeAction" :sendAction="sendAction" :loginAction="loginAction"></w-login-wechat>
</div>

``` vue
<div class="demo-box">
  <button type="button" name="button" @click="chinaStatus = true">登录</button>
  <w-login-wechat :oauthType="oauthType" :show="chinaStatus" :close="chinaClose" :success="success" orgid="100253" :countrycodeAction="countrycodeAction" :sendAction="sendAction" :loginAction="loginAction"></w-login-wechat>
</div>
```

``` js
import WLoginWap from './index';

export default {
  data() {
    return {
      value1: {},
      show: false,
      chinaStatus: false,
      englishStatus: false,
      countrycodeAction: 'https://www.easy-mock.com/mock/5ab386ecca15e11ded65b593/chinese/countrycode',
      sendAction: 'http://gateway.inner.evente.cn:8000//public/api/v2/message/verification/send',
      loginAction: 'https://www.easy-mock.com/mock/5ab386ecca15e11ded65b593/chinese/login',
      sendEnglishAction: 'https://www.easy-mock.com/mock/5ab386ecca15e11ded65b593/chinese/smssend',
      loginEnglishAction: 'https://www.easy-mock.com/mock/5ab386ecca15e11ded65b593/chinese/login',
    }
  },
  components: {
    WLoginWap,
  },
  mounted() {
    document.getElementsByTagName('html')[0].className = 'html';

    setTimeout(() => {
      console.log('数据录入');
      this.value1 = {
        name: '中国',
        tel: '13800138000',
        prefix: '86',
        url: 'https://static.evente.cn/evente/img/flag/v1/zg.jpg',
      }
    }, 2000);
  },
  beforeDestroy() {
    document.getElementsByTagName('html')[0].className = '';
  },
  methods: {
    click() {
      this.show = true;
    },
    close(val) {
      this.show = val;
    },
    chinaClose(val) {
      this.chinaStatus = val;
    },
    englishClose(val) {
      this.englishStatus = val;
    },
    success(res) {
      console.log(res, '登录');
    },
  },
}
```

## 如何使用

使用 `<w-login-wechat />` 标签声明组件，指定图标对应的 type 属性，示例代码如下:

```` html
<w-login-wechat></w-login-wechat>
````

## API

|参数|说明|类型|是否必填|默认值|
|---|----|---|-------|-----|
|title|自定义标题 `0.4.0` 新增。|String|是|请完善手机信息|

<script>
import WLoginWechat from './index';

export default {
  data() {
    return {
      value1: {},
      show: false,
      chinaStatus: false,
      englishStatus: false,
      domain: '',
      countrycodeAction: 'https://www.easy-mock.com/mock/5ab386ecca15e11ded65b593/chinese/countrycode',
      sendAction: 'http://gateway.inner.evente.cn:8000/public/api/v2/message/verification/send',
      loginAction: 'http://gateway.inner.evente.cn:8000/account/api/account/user/quick/login',
      sendEnglishAction: 'https://www.easy-mock.com/mock/5ab386ecca15e11ded65b593/chinese/smssend',
      loginEnglishAction: 'https://www.easy-mock.com/mock/5ab386ecca15e11ded65b593/chinese/login',
      oauthType: 'login',
    }
  },
  components: {
    WLoginWechat,
  },
  mounted() {
    document.getElementsByTagName('html')[0].className = 'html';

    // setTimeout(() => {
    //   console.log('数据录入');
    //   this.value1 = {
    //     name: '中国',
    //     tel: '13800138000',
    //     prefix: '86',
    //     url: 'https://static.evente.cn/evente/img/flag/v1/zg.jpg',
    //   }
    // }, 2000);
  },
  beforeDestroy() {
    document.getElementsByTagName('html')[0].className = '';
  },
  methods: {
    click() {
      this.show = true;
    },
    close(val) {
      this.show = val;
    },
    chinaClose(val) {
      this.chinaStatus = val;
    },
    englishClose(val) {
      this.englishStatus = val;
    },
    success(res) {
      console.log(res, '登录');
    },
  },
}
</script>
<style lang="scss" scope>
@import './style/login.scss';

.html {
  font-size: 37.5px;

  & .navbar {
    height: 34px;
    box-sizing: content-box;
    line-height: 34px;
    padding: 12px 24px;

    & a {
      line-height: 32px;
    }

    & .site-name {
      font-size: 30px;
    }

    & .links {
      right: 24px;
      top: 12px;
      line-height: 32px;
    }
  }

  & .sidebar {
    width: 32%;
    top: 57.6px;
  }

  & .page {
    padding-left: 32%;
  }

  & h1 {
    font-size: 42px;
  }

  & h2 {
    font-size: 38px;
  }

  & pre,
  & pre[class*="language-"] {
    padding: 20px 24px;

    &::before {
      font-size: 16px;
    }
  }

  & blockquote {
    font-size: 20px;
  }

  & .content code {
    padding: 4px 8px;
  }

  & .search-box input {
    height: 32px;
    width: 200px;
    padding: 0 8px 0 32px;
    background-size: 20px;
    background-position: 6px 6px;
  }
}

.demo-box {
  padding: 30px 0;
}

</style>
