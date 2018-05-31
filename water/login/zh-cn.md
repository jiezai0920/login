# C端登录弹框(pc)
> 基于Vue.js 的 前端业务组件。

## 案例演示

<div class="login-box">
  <button type="button" name="button" @click="click">登录</button>
  <w-login :show="show" :close="close" :success="success" orgid="100253" :countrycodeAction="countrycodeAction" :sendAction="sendAction" :loginAction="loginAction" :jiyanAction="jiyanAction"></w-login>
</div>

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
|loginAction|用户登录接口地址|String|是|-|
|jiyanAction|极验接口地址|String|是|-|
|close|关闭弹框|Function|是|() => {}|
|success|登录成功|Function|是|() => {}|



## 方法

```` html
<w-login />
````

|事件名|说明|返回值|
|---|------|-----|
|close|点击触发,关闭弹框|false|

<script>
import WLogin from './index';

export default {
  data() {
    return {
      show: false,
      countrycodeAction: 'http://gateway.inner.evente.cn:8000/public/countrycode',
      sendAction: 'http://gateway.inner.evente.cn:8000/public/sms/send',
      loginAction: 'http://gateway.inner.evente.cn:8000/member/user/login',
      jiyanAction: 'http://gateway.inner.evente.cn:8000/public/verify/geetest/prepare',
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
