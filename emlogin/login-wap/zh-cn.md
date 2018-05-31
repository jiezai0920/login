# C端登录弹框(wap)
> 基于Vue.js 的 前端业务组件。

## 案例演示

<div class="login-box">
  <button type="button" name="button" @click="click">登录</button>
  <w-login-wap :show="show" :close="close" :success="success" orgid="100253" :countrycodeAction="countrycodeAction" :sendAction="sendAction" :loginAction="loginAction"></w-login-wap>
</div>

``` vue
<div class="login-box">
  <button type="button" name="button" @click="click">登录</button>
  <w-login-wap :show="show" :close="close" :success="success" orgid="100253" :countrycodeAction="countrycodeAction" :sendAction="sendAction" :loginAction="loginAction"></w-login-wap>
</div>
```

``` js
import WLoginWap from './index';

export default {
  data() {
    return {
      show: false,
      countrycodeAction: 'https://www.easy-mock.com/mock/5ab386ecca15e11ded65b593/chinese/countrycode',
      sendAction: 'https://www.easy-mock.com/mock/5ab386ecca15e11ded65b593/chinese/smssend',
      loginAction: 'https://www.easy-mock.com/mock/5ab386ecca15e11ded65b593/chinese/login',
    }
  },
  components: {
    WLoginWap,
  },
  mounted() {
    document.getElementsByTagName('html')[0].className = 'html';
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
|show|控制弹框显示|Boolean|是|false|
|org_id|主办id|String|是|-|
|countrycodeAction|获取countrycode接口地址|String|是|-|
|sendAction|发送验证码接口地址|String|是|-|
|loginAction|用户登录接口地址|String|是|-|
|close|关闭弹框|Function|是|() => {}|
|success|登录成功|Function|是|() => {}|



## 方法

```` html
<w-login-wap />
````

|事件名|说明|返回值|
|---|------|-----|
|close|点击触发,关闭弹框|false|

<script>
import WLoginWap from './index';

export default {
  data() {
    return {
      show: false,
      countrycodeAction: 'https://www.easy-mock.com/mock/5ab386ecca15e11ded65b593/chinese/countrycode',
      sendAction: 'https://www.easy-mock.com/mock/5ab386ecca15e11ded65b593/chinese/smssend',
      loginAction: 'https://www.easy-mock.com/mock/5ab386ecca15e11ded65b593/chinese/login',
    }
  },
  components: {
    WLoginWap,
  },
  mounted() {
    document.getElementsByTagName('html')[0].className = 'html';
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
    success(res) {
      console.log(res, '登录');
    },
  },
}
</script>
<style lang="scss">
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

.login-box {
  padding: 30px 0;
}

</style>
