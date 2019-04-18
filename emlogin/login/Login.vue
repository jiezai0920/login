<template>
  <div class="login" v-if="show">
    <div class="login-popup" v-if="isChina">
      <h3 class="login-title">请完善手机信息</h3>
      <p class="login-desc">成功短信将发送至该手机</p>
      <div class="login-close" @click="popupClose">
        <img src="https://static2.evente.cn/static/img/login-icon-close2.png" width="100%">
      </div>
      <div class="login-box">
        <div class="login-prefix-wraper">
          <select class="login-prefix" v-model="nowData.prefix" @change="nowData.tel = ''">
            <option :value="data.prefix" v-for="data in abroadDatas">+{{ data.prefix }}</option>
          </select>
        </div>
        <input class="login-input" type="number" placeholder="输入手机号" v-model="nowData.tel" @blur="telBlur" @input="telInput" ref="telElem">
      </div>
      <div class="login-box">
        <input class="login-input" type="tel" :maxlength="smscodeLength" placeholder="输入验证码" v-model="smscode" @blur="codeBlur" ref="codeElem">
        <div class="login-smscode-wraper" @click="sendChinaSmsCode">
          <span :class="['login-smscode', {'login-smscode-disabled' : smsChinaStatus || sendChinaText !== countChinaEnd}]">{{sendChinaText}}</span>
        </div>
      </div>
      <button :class="['login-button', {'login-button-disabled' : loginChinaOnFlg || loginChinaDefault !== loginChinaText}]" @click="loginChina">{{loginChinaText}}</button>
      <div class="login-error">
        <img v-show="errorShow" src="https://static2.evente.cn/static/img/login-icon-error1.png" class="login-error-img">
        <span v-show="errorShow" class="login-error-text">{{errorChinaText}}</span>
      </div>
    </div>
    <!-- 英文版 start -->
    <div class="login-popup" v-else>
      <div class="login-close" @click="popupClose">
        <img src="https://static2.evente.cn/static/img/login-icon-close2.png" width="100%">
      </div>
      <h3 class="login-english-title">Ticket Buyer</h3>
      <div class="login-box">
        <input class="login-input" type="email" placeholder="Email Address" v-model="nowEnglishData.email" @blur="emailBlur">
      </div>
      <div class="login-box">
        <input class="login-input" type="tel" :maxlength="smscodeLength" placeholder="Security Code" v-model="smscode">
        <div class="login-english-wraper" @click="sendEnglishSmsCode">
          <span :class="['login-smscode', {'login-smscode-disabled' : smsEnglishStatus || sendEnglishText !== countEnglishEnd}]">{{sendEnglishText}}</span>
        </div>
      </div>
      <button :class="['login-english-button', {'login-button-disabled' : loginEnglishOnFlg || loginEnglishDefault !== loginEnglishText}]" @click="loginEnglish">{{loginEnglishText}}</button>
      <div class="login-error">
        <img v-show="errorShow" src="https://static2.evente.cn/static/img/login-icon-error1.png" class="login-error-img">
        <span v-show="errorShow" class="login-error-text">{{errorEnglishText}}</span>
      </div>
    </div>
    <!-- 英文版 end -->
  </div>
</template>
<script>
import ajax from '../tools/ajax';
import logined from '../tools/logined';

export default {
  name: 'WLogin',
  data() {
    return {
      goChinaStatus: true,
      timer: null,
      telFlg: false,
      codeFlg: false,
      smscode: '',
      smscodeLength: 6,
      sendChinaText: '获取验证码',
      countChinaEnd: '获取验证码',
      countChinaStart: true,
      AllTimes: 60,
      countNums: 0,
      errorShow: false,
      errorChinaText: '验证码错误',
      loginChinaDefault: '确定',
      loginChinaText: '',
      nowData: {
        name: '中国',
        tel: '',
        prefix: '86',
        url: 'https://static.evente.cn/evente/img/flag/v1/zg.jpg',
      },
      abroadDatas: [],
      sendChinaData: {
        country_code: '',
        mobile: '',
        origin: 'c-login',
      },
      loginChinaData: {
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
      },
      sendEnglishData: {
        email: '',
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
    };
  },
  props: {
    // 控制登录弹框 显示 / 不显示
    show: {
      type: Boolean,
      default: false,
    },
    lang: {
      type: String,
      default: 'zh_CN',
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
    sendEnglishAction: {
      type: String,
    },
    loginEnglishAction: {
      type: String,
    },
  },
  computed: {
    isChina() {
      return this.lang === 'zh_CN';
    },
    loginChinaOnFlg() {
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
    smsChinaStatus() {
      const {
        resultTel,
      } = this.testTel();
      const { telElem } = this.$refs;
      if (resultTel && telElem) {
        telElem.blur();
      }
      return !resultTel;
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
  },
  mounted() {
    this.countNums = this.AllTimes;
    this.loginChinaText = this.loginChinaDefault;
    this.loginEnglishText = this.loginEnglishDefault;
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
          this.errorChinaText = res.message;
        }
      },
      onError: (err, response) => {
        this.errorShow = true;
        this.errorChinaText = response.message;
      },
    });
  },
  methods: {
    reset() {
      this.loginEnglishText = this.loginEnglishDefault;
      this.loginChinaText = this.loginChinaDefault;
      this.canLogin = true;
    },
    // 关闭登录弹框
    popupClose() {
      this.close(false);
      this.reset();
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
      this.errorChinaText = text;
      this.countChinaStart = !resultTel;
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
      this.errorChinaText = smsResult ? '' : '输入验证码';
      this.codeFlg = smsResult;
      this.errorShow = !smsResult;
      // 将不在浏览器窗口的可见区域内的元素滚动到浏览器窗口的可见区域。
      document.activeElement.scrollIntoViewIfNeeded();
    },
    // 发送验证码
    sendChinaSmsCode() {
      if (this.telFlg && this.goChinaStatus) {
        this.goChinaStatus = false;
        this.sendChinaText = '获取中';
        this.sendChinaData.country_code = this.nowData.prefix;
        this.sendChinaData.mobile = this.nowData.tel;
        //发送验证码
        ajax({
          headers: this.headers,
          type: 'POST',
          data: JSON.stringify(this.sendChinaData),
          action: this.sendAction,
          onSuccess: (res) => {
            if (res.code === 10000) {
              this.errorShow = false;
              this.errorChinaText = '';
              this.countChinaStart = true;
              this.autoChina();
            } else {
              this.errorShow = true;
              this.errorChinaText = res.message;
              this.resetChinaAuto();
            }
          },
          onError: (err, response) => {
            this.resetChinaAuto();
            this.errorShow = true;
            this.errorChinaText = response.message;
          },
        });
      }
      // 修复倒计时过程中再点击变蓝色
      //  else {
      //   this.telBlur();
      // }
    },
    autoChina() {
      setTimeout(() => {
        if (this.countChinaStart) {
          if (this.countNums > 1) {
            this.countNums--;
            this.sendChinaText = `${this.countNums} s`;
            this.timer = setTimeout(this.autoChina.bind(this), 1000);
          } else {
            clearTimeout(this.timer);
            this.resetChinaAuto();
          }
        }
      }, 500);
    },
    resetChinaAuto() {
      this.sendChinaText = this.countChinaEnd;
      this.countNums = this.AllTimes;
      this.countChinaStart = false;
      this.goChinaStatus = true;
    },
    // 登录
    loginChina() {
      if (this.telFlg && this.canLogin) {
        this.canLogin = false;
        this.loginChinaText = '正在提交...';
        this.loginChinaData.code = this.nowData.prefix;
        this.loginChinaData.phone = this.nowData.tel;
        this.loginChinaData.sms_code = this.smscode;
        //发送验证码
        ajax({
          headers: this.headers,
          type: 'POST',
          data: JSON.stringify(this.loginChinaData),
          action: this.loginAction,
          onSuccess: (res) => {
            if (res.code === 10000) {
              this.errorShow = false;
              this.errorChinaText = '';
              logined(res, res.data.org_id, this, () => {
                this.success(res);
                this.canLogin = true;
                this.loginChinaText = this.loginChinaDefault;
                this.close(false);
              });
            } else {
              this.canLogin = true;
              this.loginChinaText = this.loginChinaDefault;
              this.errorShow = true;
              this.errorChinaText = res.message;
            }
          },
          onError: (err, response) => {
            this.canLogin = true;
            this.loginChinaText = this.loginChinaDefault;
            this.errorShow = true;
            this.errorChinaText = response.message;
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
        this.sendEnglishData.email = this.nowEnglishData.email;
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
  },
  watch: {
    value(val, oldVal) {
      if (val !== oldVal) {
        this.nowData = val;
      }
    },
    orgid(val) {
      this.loginChinaData.org_id = val;
      this.loginEnglishData.org_id = val;
    },
  },
};
</script>
