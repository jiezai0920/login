<template>
  <div class="login-wap" v-if="show">
    <div class="login-wap-popup" v-if="isChina">
      <h3 class="login-wap-title">{{title}}</h3>
      <p class="login-wap-desc">{{desc}}</p>
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
        <input class="login-wap-input" type="number" :placeholder="telPlaceholder" v-model="nowData.tel" @blur="telBlur" @input="telInput" ref="telElem">
      </div>
      <div class="login-wap-box">
        <input class="login-wap-input" type="tel" :maxlength="smscodeLength" :placeholder="smsPlaceholder" v-model="smscode" @blur="codeBlur" ref="codeElem">
        <div class="login-wap-smscode-wraper" @click="sendSmsCode">
          <span :class="['login-wap-smscode', {'login-wap-smscode-disabled' : smsStatus || sendText !== countEnd}]">{{sendText}}</span>
        </div>
      </div>
      <button :class="['login-wap-button', {'login-wap-button-disabled' : loginOnFlg || btnText !== loginText}]" @click="login">{{loginText}}</button>
      <div class="login-wap-error">
        <img v-show="errorShow" src="https://static2.evente.cn/static/img/login-icon-error1.png" class="login-wap-error-img">
        <span v-show="errorShow" class="login-wap-error-text">{{errorText}}</span>
      </div>
    </div>
    <!-- 英文版 start -->
    <div class="login-wap-popup" v-else>
      <div class="login-wap-close" @click="popupClose">
        <img src="https://static2.evente.cn/static/img/login-icon-close2.png" width="100%">
      </div>
      <h3 class="login-wap-english-title">Ticket Buyer</h3>
      <div class="login-wap-box">
        <input class="login-wap-english-input" type="email" placeholder="Email Address" v-model="nowEnglishData.email" @blur="emailBlur">
      </div>

      <div v-if="showPasswordFalg">
        <div v-if="!setPassword" class="login-wap-box">
          <input class="login-wap-english-input" type="text" placeholder="Password" v-model="nowEnglishData.password" @blur="passwordBlur">
        </div>
        <div v-if="setPassword">
          <div class="login-wap-box">
            <input class="login-wap-english-input" type="text" placeholder="Create Password" v-model="nowEnglishData.createPassword" @blur="createpasswordBlur">
          </div>
          <div class="login-wap-box">
            <input class="login-wap-english-input" type="text" placeholder="Confirm Password" v-model="nowEnglishData.confirmPassword" @blur="confirmpasswordBlur">
          </div>
        </div>
      </div>
      <div v-if="forgetPassword" class="login-wap-box">
        <input class="login-wap-english-input" type="tel" :maxlength="smscodeLength" placeholder="Security Code" v-model="smscode">
        <div class="login-wap-english-wraper" @click="sendEnglishSmsCode">
          <span :class="['login-wap-english-smscode', {'login-wap-smscode-disabled' : smsEnglishStatus || sendEnglishText !== countEnglishEnd}]">{{sendEnglishText}}</span>
        </div>
      </div>
      <div class="login-wap-forget">
        <span v-if="!forgetPassword && !setPassword" @click="forgetPasswordClick">Forgot your password?</span>
        <span v-if="forgetPassword && !setPassword" @click="returnPasswordClick">return</span>
      </div>
      <button v-if="!showPasswordFalg" :class="['login-wap-english-button', {'login-wap-button-disabled' : loginEnglishOnFlg}]" @click="continueFun">Continue</button>
      <button v-if="showPasswordFalg && !setPassword" :class="['login-wap-english-button', {'login-wap-button-disabled' : !submitEnglishOnFlg || loginEnglishDefault !== loginEnglishText}]" @click="loginEnglish">{{loginEnglishText}}</button>
      <button v-if="showPasswordFalg && setPassword" :class="['login-wap-english-button', {'login-wap-button-disabled' : !confirmpasswordFlg}]" @click="loginEnglish">Create Account</button>
      <button :class="['login-wap-english-button', {'login-wap-button-disabled' : loginEnglishOnFlg || loginEnglishDefault !== loginEnglishText}]" @click="loginEnglish">{{loginEnglishText}}</button>
      <div v-if="errorShow" class="login-wap-error">
        <img v-show="errorShow" src="https://static2.evente.cn/static/img/login-icon-error1.png" class="login-wap-error-img">
        <span v-show="errorShow" class="login-wap-error-text">{{errorEnglishText}}</span>
      </div>
    </div>
    <!-- 英文版 end -->
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
      sendText: '',
      countEnd: '',
      countStart: true,
      AllTimes: 60,
      countNums: 0,
      errorShow: false,
      errorText: '',
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
      // 英文版 start
      goEnglishStatus: true,
      nowEnglishData: {
        email: '',
        password: '',
        createPassword: '',
        confirmPassword: '',
      },
      sendEnglishData: {
        type: 'email',
        key: '',
        origin: 'c-login',
      },
      sendEnglishText: 'Get Code',
      countEnglishEnd: 'Get Code',
      errorEnglishText: '',
      loginEnglishDefault: 'Submit',
      loginEnglishText: '',
      emailEnglishFlg: false,
      countEnglishStart: true,
      loginEnglishData: {
        org_id: this.orgid,
        email: '',
        moudle_name: 'c-login',
        sms_code: '',
      },
      // 英文版 end
      // new英文版
      continueFalg: false,
      setPassword: false, //是否设置密码
      showPasswordFalg: false, //是否展示设置密码
      forgetPassword: false, //忘记密码
    };
  },
  props: {
    value: Object,
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
    desc: {
      type: String,
      default: '成功短信将发送至该手机',
    },
    telPlaceholder: {
      type: String,
      default: '输入手机号',
    },
    smsPlaceholder: {
      type: String,
      default: '输入验证码',
    },
    smsBtnText: {
      type: String,
      default: '获取验证码',
    },
    telFormatErrorText: {
      type: String,
      default: '手机号格式有误',
    },
    telEmptyText: {
      type: String,
      default: '输入手机号',
    },
    sendingText: {
      type: String,
      default: '获取中',
    },
    subingText: {
      type: String,
      default: '正在提交...',
    },
    btnText: {
      type: String,
      default: '确定',
    },
    //多语言添加
    lang: {
      type: String,
      default: 'zh_CN',
    },
    sendEnglishAction: {
      type: String,
    },
    loginEnglishAction: {
      type: String,
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
    isChina() {
      console.log(this.lang);
      return this.lang === 'zh_CN';
    },
    // english start
    smsEnglishStatus() {
      const {
        resultEmail,
      } = this.testEmail();
      return !resultEmail;
    },
    loginEnglishOnFlg() {
      return this.smsEnglishStatus;
    },
    // english end
    submitEnglishOnFlg() {
      return this.nowEnglishData.password;
    },
    confirmpasswordFlg() {
      return !!this.nowEnglishData.createPassword &&
        this.nowEnglishData.createPassword === this.nowEnglishData.confirmPassword;
    },
  },
  mounted() {
    this.countNums = this.AllTimes;
    this.loginText = this.btnText;
    this.loginEnglishText = this.loginEnglishDefault;
  },
  created() {
    this.sendText = this.smsBtnText;
    this.countEnd = this.smsBtnText;
    ajax({
      headers: this.headers,
      type: 'GET',
      withCredentials: this.domain === 'evente.cn',
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
        text = this.telFormatErrorText;
      }

      if (telEmpty) {
        text = this.telEmptyText;
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
      window.scroll(0, 0);
    },
    testSms() {
      return this.telFlg ? (`${this.smscode}`).length === this.smscodeLength : false;
    },
    // 验证码文本框失去焦点事件
    codeBlur() {
      const smsResult = this.testSms();
      this.errorText = smsResult ? '' : this.smsPlaceholder;
      this.codeFlg = smsResult;
      this.errorShow = !smsResult;
      // 将不在浏览器窗口的可见区域内的元素滚动到浏览器窗口的可见区域。
      document.activeElement.scrollIntoViewIfNeeded();
      window.scroll(0, 0);
    },
    // 发送验证码
    sendSmsCode() {
      if (this.telFlg && this.goStatus) {
        this.goStatus = false;
        this.sendText = this.sendingText;
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
        this.loginText = this.subingText;
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
                this.loginText = this.btnText;
                this.close(false);
              });
            } else {
              this.canLogin = true;
              this.loginText = this.btnText;
              this.errorShow = true;
              this.errorText = res.message;
            }
          },
          onError: (err, response) => {
            this.canLogin = true;
            this.loginText = this.btnText;
            this.errorShow = true;
            this.errorText = response.message;
          },
        });
      } else {
        this.telBlur();
        this.codeBlur();
      }
    },
    // 英文版 start
    testEmail() {
      /* eslint-disable */
      //Email
      const emailPattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      /* eslint-disable */
      return {
        resultEmail: emailPattern.test(this.nowEnglishData.email),
        text: 'Check your email',
      };
    },
    emailBlur() {
      const {
        resultEmail,
        text,
      } = this.testEmail();
      this.errorShow = !resultEmail;
      this.errorEnglishText = text;
      this.countEnglishStart = !resultEmail;
      this.emailEnglishFlg = resultEmail;
    },
    // 发送验证码
    sendEnglishSmsCode() {
      if (this.emailEnglishFlg && this.goEnglishStatus) {
        this.goEnglishStatus = false;
        this.sendEnglishText = 'Waiting...';
        this.sendEnglishData.key = this.nowEnglishData.email;
        this.sendEnglishData.org_id = this.orgid;
        //发送验证码
        ajax({
          headers: this.headers,
          type: 'POST',
          data: JSON.stringify(this.sendEnglishData),
          action: this.sendEnglishAction,
          onSuccess: (res) => {
            if (res.code === 10000) {
              this.errorShow = false;
              this.errorEnglishText = '';
              this.countEnglishStart = true;
              this.autoEnglish();
            } else {
              this.errorShow = true;
              this.errorEnglishText = res.message;
              this.resetEnglishAuto();
            }
          },
          onError: (err, response) => {
            this.resetEnglishAuto();
            this.errorShow = true;
            this.errorEnglishText = response.message;
          },
        });
      }
    },
    autoEnglish() {
      setTimeout(() => {
        if (this.countEnglishStart) {
          if (this.countNums > 1) {
            this.countNums--;
            this.sendEnglishText = `${this.countNums} s`;
            this.timer = setTimeout(this.autoEnglish.bind(this), 1000);
          } else {
            clearTimeout(this.timer);
            this.resetEnglishAuto();
          }
        }
      }, 500);
    },
    resetEnglishAuto() {
      this.sendEnglishText = this.countEnglishEnd;
      this.countNums = this.AllTimes;
      this.countEnglishStart = false;
      this.goEnglishStatus = true;
    },
    loginEnglish() {
      if (this.emailEnglishFlg && this.canLogin) {
        this.canLogin = false;
        this.loginEnglishText = 'Waiting...';
        this.loginEnglishData.email = this.nowEnglishData.email;
        this.loginEnglishData.sms_code = this.smscode;
        //发送验证码
        ajax({
          headers: this.headers,
          type: 'POST',
          data: JSON.stringify(this.loginEnglishData),
          action: this.loginEnglishAction,
          onSuccess: (res) => {
            if (res.code === 10000) {
              this.errorShow = false;
              this.errorChinaText = '';
              logined(res, res.data.org_id, this, () => {
                this.success(res);
                this.canLogin = true;
                this.loginEnglishText = this.loginEnglishDefault;
                this.close(false);
              });
            } else {
              this.canLogin = true;
              this.loginEnglishText = this.loginEnglishDefault;
              this.errorShow = true;
              this.errorEnglishText = res.message;
            }
          },
          onError: (err, response) => {
            this.canLogin = true;
            this.loginEnglishText = this.loginEnglishDefault;
            this.errorShow = true;
            this.errorEnglishText = response.message;
          },
        });
      } else {
        this.emailBlur();
      }
    },
    // 英文版 end
    // new 英文版
    continueFun() {
      if (!this.loginEnglishOnFlg) {
        this.showPasswordFalg = true;
        this.setPassword = false;
      }
    },
    testPassword() {
      return {
        resultPassword: this.nowEnglishData.password,
        text: 'Please enter the password correctly',
      };
    },
    passwordBlur() {
      const {
        resultPassword,
        text,
      } = this.testPassword();
      this.errorShow = !resultPassword;
      this.errorEnglishText = text;
      this.countEnglishStart = !resultPassword;
    },
    createpasswordBlur() {
      const obj = {
        resultPassword: this.nowEnglishData.createPassword,
        text: 'Please enter the password',
      }
      this.errorShow = !resultPassword;
      this.errorEnglishText = text;
    },
    confirmpasswordBlur() {
      const obj = {
        resultPassword: this.nowEnglishData.confirmPassword,
        text: 'The password is different twice',
      }
      this.errorShow = !resultPassword;
      this.errorEnglishText = text;
    },
    forgetPasswordClick() {
      this.forgetPassword = true;
    },
    returnPasswordClick() {
      this.forgetPassword = false;
    },
  },
  watch: {
    value(val, oldVal) {
      if (val !== oldVal) {
        this.nowData = val;
        this.telBlur();
      }
    },
    orgid(val) {
      this.loginData.org_id = val;
    },
  },
};
</script>
