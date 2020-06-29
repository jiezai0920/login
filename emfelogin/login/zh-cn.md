# 登录弹框(pc)
> 基于Vue.js 的 前端业务组件。

## 英文模式

<div class="demo-box">
  <button type="button" name="button" @click="englishStatus = true">登录</button>
  <w-login :show="englishStatus" :close="englishClose" :success="success" orgid="100253" :countrycodeAction="countrycodeAction" :sendAction="sendAction" :loginAction="loginAction" :sendEnglishAction="sendEnglishAction" :resultJson="resultJson" :loginEnglishAction="loginEnglishAction" lang="zzz"></w-login>
</div>

## 中文模式

<div class="demo-box">
  <button type="button" name="button" @click="chinaStatus = true">登录</button>
  <w-login :show="chinaStatus" :value="value1" :close="chinaClose" :success="success" orgid="100253" :countrycodeAction="countrycodeAction" :sendAction="sendAction" :loginAction="loginAction" :resultJson="resultJson"></w-login>
</div>

## 如何使用

使用 `<w-login />` 标签声明组件，指定图标对应的 type 属性，示例代码如下:


## API

|参数|说明|类型|是否必填|默认值|
|---|----|---|-------|-----|
|title|自定义标题 `0.4.0` 新增。|String|是|请完善手机信息|
|value|定义数据 `0.5.0` 新增。|String|是|无|
|show|控制弹框显示|Boolean|是|false|
|org_id|主办id|String|是|-|
|lang|语言|String|否|zh_CN|
|countrycodeAction|获取countrycode接口地址|String|是|-|
|sendAction|发送验证码接口地址(中文版)|String|是|-|
|sendEnglishAction|发送验证码接口地址(英文版)|String|是|-|
|domain|设置cookie登录状态的domain|String|否|'evente.cn'|
|loginAction|用户登录接口地址(中文版)|String|是|-|
|loginEnglishAction|用户登录接口地址(英文版)|String|是|-|
|close|关闭弹框|Function|是|() => {}|
|success|登录成功|Function|是|() => {}|

<script>
import WLogin from './index';
import resultJson from '../tools/resultJson';

export default {
  data() {
    return {
      value1: {},
      chinaStatus: false,
      englishStatus: false,
      countrycodeAction: 'https://www.easy-mock.com/mock/5ab386ecca15e11ded65b593/chinese/countrycode',
      sendAction: 'https://www.easy-mock.com/mock/5ab386ecca15e11ded65b593/chinese/smssend',
      loginAction: 'https://www.easy-mock.com/mock/5ab386ecca15e11ded65b593/chinese/login',
      sendEnglishAction: 'https://www.easy-mock.com/mock/5ab386ecca15e11ded65b593/chinese/smssend',
      loginEnglishAction: 'https://www.easy-mock.com/mock/5ab386ecca15e11ded65b593/chinese/login',
      resultJson
    }
  },
  components: {
    WLogin,
  },
  mounted() {
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
  methods: {
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
<style lang="scss">
@import './style/login.scss';

.demo-box {
  padding: 30px 0;
}

</style>
