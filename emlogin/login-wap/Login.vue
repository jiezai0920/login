<template>
  <div class="login-wap" v-if="show">
    <div class="login-wap-popup">
      <h3 class="login-wap-title">{{title}}</h3>
      <p class="login-wap-desc">成功短信将发送至该手机</p>
      <div class="login-wap-close" @click="popupClose">
        <img src="https://static2.evente.cn/static/img/login-icon-close2.png" width="100%">
      </div>
      <div class="login-wap-box">
        <div class="login-wap-prefix-wraper">
          <select class="login-wap-prefix" v-model="nowData.prefix" @change="nowData.tel = ''">
            <option
              :value="data.prefix"
              :key="dataIndex"
              v-for="(data, dataIndex) in abroadDatas"
            >+{{ data.prefix }}</option>
          </select>
        </div>
        <input class="login-wap-input" type="number" placeholder="输入手机号" v-model="nowData.tel" @blur="telBlur" @input="telInput" ref="telElem">
      </div>
      <div class="login-wap-box">
        <input class="login-wap-input" type="tel" :maxlength="smscodeLength" placeholder="输入验证码" v-model="smscode" @blur="codeBlur" ref="codeElem">
        <div class="login-wap-smscode-wraper" @click="sendSmsCode">
          <span :class="['login-wap-smscode', {'login-wap-smscode-disabled' : smsStatus || sendText !== countEnd}]">{{sendText}}</span>
        </div>
      </div>
      <button :class="['login-wap-button', {'login-wap-button-disabled' : loginOnFlg || loginDefault !== loginText}]" @click="login">{{loginText}}</button>
      <div class="login-wap-error">
        <img v-show="errorShow" src="https://static2.evente.cn/static/img/login-icon-error1.png" class="login-wap-error-img">
        <span v-show="errorShow" class="login-wap-error-text">{{errorText}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import ajax from '../tools/ajax';
import logined from '../tools/logined';

export default {
  name: 'WLoginWap',
  data() {
    return {
      goStatus: true,
      timer: null,
      telFlg: false,
      codeFlg: false,
      smscode: '',
      smscodeLength: 6,
      sendText: '获取验证码',
      countEnd: '获取验证码',
      countStart: true,
      AllTimes: 60,
      countNums: 0,
      errorShow: false,
      errorText: '验证码错误',
      loginDefault: '确定',
      loginText: '',
      nowData: {
        name: '中国',
        tel: '',
        prefix: '86',
        url: 'https://static.evente.cn/evente/img/flag/v1/zg.jpg',
      },
      abroadDatas: [],
      sendData: {
        country_code: '',
        mobile: '',
        origin: 'c-login',
      },
      loginData: {
        org_id: this.orgid,
        code: '',
        phone: '',
        moudle_name: 'c-login',
        sms_code: '',
      },
      countryCode: {},
      canLogin: true,
    };
  },
  props: {
    // 控制登录弹框 显示 / 不显示
    show: {
      type: Boolean,
      default: false,
    },
    // 登录弹框 关闭
    close: {
      type: Function,
      default: () => {},
    },
    headers: {
      type: Object,
      default() {
        return {};
      },
    },
    domain: { // 是否cookie存储加 domain
      type: String,
      default: 'evente.cn',
    },
    orgid: [String, Number],
    // 登录成功
    success: {
      type: Function,
      default: () => {},
    },
    countrycodeAction: {
      type: String,
    },
    sendAction: {
      type: String,
    },
    loginAction: {
      type: String,
    },
    title: {
      type: String,
      default: '请完善手机信息',
    },
  },
  computed: {
    loginOnFlg() {
      const {
        resultTel,
      } = this.testTel();
      const { codeElem } = this.$refs;
      const smsTrue = this.testSms();
      if (smsTrue && codeElem) {
        codeElem.blur();
      }
      return !resultTel || !smsTrue;
    },
    smsStatus() {
      const {
        resultTel,
      } = this.testTel();
      const { telElem } = this.$refs;
      if (resultTel && telElem) {
        telElem.blur();
      }
      return !resultTel;
    },
  },
  mounted() {
    this.countNums = this.AllTimes;
    this.loginText = this.loginDefault;
  },
  created() {
    ajax({
      headers: this.headers,
      type: 'GET',
      action: this.countrycodeAction,
      onSuccess: (res) => {
        if (res.code === 10000) {
          let obj = {};
          const { data } = res;
          this.countryCode = data;
          Object.keys(data).forEach((item) => {
            if (data[item].enabled === 1) {
              obj = {
                name: data[item].chinese_name,
                tel: '',
                prefix: data[item].country_code,
                url: data[item].icon,
              };
              this.abroadDatas.push(obj);
            }
          });
        } else {
          this.errorShow = true;
          this.errorText = res.message;
        }
      },
      onError: (err, response) => {
        this.errorShow = true;
        this.errorText = response.message;
      },
    });
  },
  methods: {
    // 关闭登录弹框
    popupClose() {
      this.close(false);
    },
    // 手机号文本框input事件
    telInput(e) {
      this.nowData.tel = e.target.value;
    },
    testTel() {
      const { tel } = this.nowData;
      const code = this.nowData.prefix;
      const hasOwn = Object.prototype.hasOwnProperty;
      const reg = new RegExp(hasOwn.call(this.countryCode, code) && hasOwn.call(this.countryCode[code], 'pattern') ? this.countryCode[code].pattern : '^(86){0,1}1[345789][0-9]{9}$');
      const telEmpty = tel === '';
      const telError = !reg.test(code + tel);
      const resultTel = !telEmpty && !telError;
      let text = '';

      if (telError) {
        text = '手机号格式有误';
      }

      if (telEmpty) {
        text = '输入手机号';
      }

      if (resultTel) {
        text = '';
      }

      return {
        resultTel,
        text,
      };
    },
    // 手机号文本框失去焦点事件
    telBlur() {
      const {
        resultTel,
        text,
      } = this.testTel();
      this.errorShow = !resultTel;
      this.errorText = text;
      this.countStart = !resultTel;
      this.telFlg = resultTel;
      // 将不在浏览器窗口的可见区域内的元素滚动到浏览器窗口的可见区域。
      document.activeElement.scrollIntoViewIfNeeded();
    },
    testSms() {
      return this.telFlg ? (`${this.smscode}`).length === this.smscodeLength : false;
    },
    // 验证码文本框失去焦点事件
    codeBlur() {
      const smsResult = this.testSms();
      this.errorText = smsResult ? '' : '输入验证码';
      this.codeFlg = smsResult;
      this.errorShow = !smsResult;
      // 将不在浏览器窗口的可见区域内的元素滚动到浏览器窗口的可见区域。
      document.activeElement.scrollIntoViewIfNeeded();
    },
    // 发送验证码
    sendSmsCode() {
      if (this.telFlg && this.goStatus) {
        this.goStatus = false;
        this.sendText = '获取中';
        this.sendData.country_code = this.nowData.prefix;
        this.sendData.mobile = this.nowData.tel;
        //发送验证码
        ajax({
          headers: this.headers,
          type: 'POST',
          data: JSON.stringify(this.sendData),
          action: this.sendAction,
          onSuccess: (res) => {
            if (res.code === 10000) {
              this.errorShow = false;
              this.errorText = '';
              this.countStart = true;
              this.auto();
            } else {
              this.errorShow = true;
              this.errorText = res.message;
              this.resetAuto();
            }
          },
          onError: (err, response) => {
            this.resetAuto();
            this.errorShow = true;
            this.errorText = response.message;
          },
        });
      }
      // 修复倒计时过程中再点击变蓝色
      //  else {
      //   this.telBlur();
      // }
    },
    auto() {
      setTimeout(() => {
        if (this.countStart) {
          if (this.countNums > 1) {
            this.countNums--;
            this.sendText = `${this.countNums} s`;
            this.timer = setTimeout(this.auto.bind(this), 1000);
          } else {
            clearTimeout(this.timer);
            this.resetAuto();
          }
        }
      }, 500);
    },
    resetAuto() {
      this.sendText = this.countEnd;
      this.countNums = this.AllTimes;
      this.countStart = false;
      this.goStatus = true;
    },
    // 登录
    login() {
      if (this.codeFlg && this.telFlg && this.canLogin) {
        this.canLogin = false;
        this.loginText = '正在提交...';
        this.loginData.code = this.nowData.prefix;
        this.loginData.phone = this.nowData.tel;
        this.loginData.sms_code = this.smscode;
        //发送验证码
        ajax({
          headers: this.headers,
          type: 'POST',
          data: JSON.stringify(this.loginData),
          action: this.loginAction,
          onSuccess: (res) => {
            if (res.code === 10000) {
              this.errorShow = false;
              this.errorText = '';
              logined(res, res.data.org_id, this, () => {
                this.success(res);
                this.canLogin = true;
                this.loginText = this.loginDefault;
                this.close(false);
              });
            } else {
              this.canLogin = true;
              this.loginText = this.loginDefault;
              this.errorShow = true;
              this.errorText = res.message;
            }
          },
          onError: (err, response) => {
            this.canLogin = true;
            this.loginText = this.loginDefault;
            this.errorShow = true;
            this.errorText = response.message;
          },
        });
      } else {
        this.telBlur();
        this.codeBlur();
      }
    },
  },
  watch: {
    value(val, oldVal) {
      if (val !== oldVal) {
        this.nowData = val;
      }
    },
    orgid(val) {
      this.loginData.org_id = val;
    },
  },
};
</script>
