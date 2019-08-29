# 登录弹框(wap)
> 基于Vue.js 的 前端业务组件。

## 英文版案例演示

<div class="demo-box">
  <button type="button" name="button" @click="englishStatus = true">登录</button>
  <w-login-wap :value="value1" :show="englishStatus" :close="englishClose" :success="success" orgid="100253" :countrycodeAction="countrycodeAction" :sendAction="sendAction" :loginAction="loginAction" :sendEnglishAction="sendEnglishAction" :loginEnglishAction="loginEnglishAction"  lang="zzz"></w-login-wap>
</div>


``` vue
<div class="demo-box">
  <button type="button" name="button" @click="englishStatus = true">登录</button>
  <w-login-wap :show="englishStatus" :close="englishClose" :success="success" orgid="100253" :countrycodeAction="countrycodeAction" :sendAction="sendAction" :loginAction="loginAction"  :sendEnglishAction="sendEnglishAction" :loginEnglishAction="loginEnglishAction"  lang="zzz"></w-login-wap>
</div>
```

## 中文版案例演示

<div class="demo-box">
  <button type="button" name="button" @click="chinaStatus = true">登录</button>
  <w-login-wap :value="value1" :show="chinaStatus" :close="chinaClose" :success="success" orgid="100253" :countrycodeAction="countrycodeAction" :sendAction="sendAction" :loginAction="loginAction"></w-login-wap>
</div>

``` vue
<div class="demo-box">
  <button type="button" name="button" @click="chinaStatus = true">登录</button>
  <w-login-wap :show="chinaStatus" :close="chinaClose" :success="success" orgid="100253" :countrycodeAction="countrycodeAction" :sendAction="sendAction" :loginAction="loginAction"></w-login-wap>
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
      sendAction: 'https://www.easy-mock.com/mock/5ab386ecca15e11ded65b593/chinese/smssend',
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

使用 `<w-login-wap />` 标签声明组件，指定图标对应的 type 属性，示例代码如下:

```` html
<w-login-wap></w-login-wap>
````

## API

|参数|说明|类型|是否必填|默认值|
|---|----|---|-------|-----|
|title|自定义标题 `0.4.0` 新增。|String|是|请完善手机信息|
|value|定义数据 `0.5.0` 新增。|String|是|无|
|show|控制弹框显示|Boolean|是|false|
|org_id|主办id|String|是|-|
|countrycodeAction|获取countrycode接口地址|String|是|-|
|sendAction|发送验证码接口地址|String|是|-|
|domain|设置cookie登录状态的domain|String|否|'evente.cn'|
|loginAction|用户登录接口地址|String|是|-|
|close|关闭弹框|Function|是|() => {}|
|success|登录成功|Function|是|() => {}|
|desc|自定义描述 `0.6.0` 新增|String|是|成功短信将发送至该手机|
|telPlaceholder|手机号 placeholder `0.6.0` 新增|String|是|输入手机号|
|smsPlaceholder|验证码 placeholder `0.6.0` 新增|String|是|输入验证码|
|smsBtnText|验证码按钮默认 `0.6.0` 新增|String|是|获取验证码|
|telFormatErrorText|手机号格式有误 文案 `0.6.0` 新增|String|是|手机号格式有误|
|telEmptyText|手机号为空 文案 `0.6.0` 新增|String|是|输入手机号|
|sendingText|验证码获取中 文案 `0.6.0` 新增|String|是|获取中|
|subingText|点击确定提交中 文案 `0.6.0` 新增|String|是|正在提交...|
|btnText|提交按钮默认 文案 `0.6.0` 新增|String|是|确定|

<script>
import WLoginWap from './index';

export default {
  data() {
    return {
      value1: {},
      show: false,
      chinaStatus: false,
      englishStatus: false,
      countrycodeAction: 'https://www.easy-mock.com/mock/5ab386ecca15e11ded65b593/chinese/countrycode',
      sendAction: 'https://www.easy-mock.com/mock/5ab386ecca15e11ded65b593/chinese/smssend',
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
