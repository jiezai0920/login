# C端登录弹框(pc)
> 基于Vue.js 的 前端业务组件。

## 案例演示

<div class="login-box">
  <button type="button" name="button" @click="click">登录</button>
  <w-login :show="show" :close="close" :success="success" orgid="100253" :countrycodeAction="countrycodeAction" :sendAction="sendAction" :loginAction="loginAction"></w-login>
</div>

``` vue
<div class="login-box">
  <button type="button" name="button" @click="click">登录</button>
  <w-login :show="show" :close="close" :success="success" orgid="100253" :countrycodeAction="countrycodeAction" :sendAction="sendAction" :loginAction="loginAction"></w-login>
</div>
```

``` js
import WLogin from './index';

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
    WLogin,
  },
  methods: {
    click() {
      this.show = true;
    },
    close(val) {
      this.show = val;
    },
    success(res) {
      console.log(res, '登录成功');
    },
  },
}
```

## 如何使用

使用 `<w-login />` 标签声明组件，指定图标对应的 type 属性，示例代码如下:

```` html
<w-login></w-login>
````

## API

|参数|说明|类型|是否必填|默认值|
|---|----|---|-------|-----|
|show|控制弹框显示|Boolean|是|false|
|org_id|主办id|String|是|-|
|countrycodeAction|获取countrycode接口地址|String|是|-|
|sendAction|发送验证码接口地址|String|是|-|
|domain|设置cookie登录状态的domain|String|否|'evente.cn'|
|loginAction|用户登录接口地址|String|是|-|
|jiyanAction|极验接口地址|String|是|-|
|close|关闭弹框|Function|是|() => {}|
|success|登录成功|Function|是|() => {}|


<script>
import WLogin from './index';

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
    WLogin,
  },
  methods: {
    click() {
      this.show = true;
    },
    close(val) {
      this.show = val;
    },
    success(res) {
      console.log(res, '登录成功');
    },
  },
}
</script>

<style lang="scss">
@import './style/login.scss';

.login-box {
  padding: 30px 0;
}
</style>
