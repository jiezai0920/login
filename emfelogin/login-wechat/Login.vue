<template>
  <div class="login-wechat-wap" v-if="show">
    <div class="login-wechat-wap-login" v-if="oauthType == 'login' && isLoginFail">
      <img class="login-wechat-wap-login-img" src="https://static2.evente.cn/static/img/loading201904171.gif" alt="">
    </div>
    <div v-else>
      <div v-if="loginType === 'phone'" class="login-wechat-wap-popup popup2">
        <h3 class="login-wechat-wap-title">{{title}}</h3>
        <p class="login-wechat-wap-desc" v-html="desc"></p>
        <div v-show="errorShow" class="login-wechat-wap-error">
          <img v-show="errorShow" src="https://static2.evente.cn/static/img/login-icon-error1.png" class="login-wechat-wap-error-img">
          <span v-show="errorShow" class="login-wechat-wap-error-text">{{errorText}}</span>
        </div>
        <div class="login-wechat-wap-close" @click="popupClose">
          <img src="https://static2.evente.cn/static/img/login-icon-close2.png" width="100%">
        </div>
        <div class="login-wechat-wap-box">
          <div class="login-wechat-wap-prefix-wraper">
            <select class="login-wechat-wap-prefix" v-model="nowData.prefix" @change="nowData.tel = ''">
              <option
                :value="data.prefix"
                :key="dataIndex"
                v-for="(data, dataIndex) in abroadDatas"
              >+{{ data.prefix }}</option>
            </select>
          </div>
          <input class="login-wechat-wap-input" type="number" :placeholder="telPlaceholder" v-model="nowData.tel" @blur="telBlur" @input="telInput" ref="telElem">
        </div>
        <div class="login-wechat-wap-box">
          <input class="login-wechat-wap-input" type="tel" :maxlength="smscodeLength" :placeholder="smsPlaceholder" v-model="smscode" @blur="codeBlur" ref="codeElem">
          <div class="login-wechat-wap-smscode-wraper" @click="sendSmsCode">
            <span :class="['login-wechat-wap-smscode', {'login-wechat-wap-smscode-disabled' : smsStatus || sendText !== countEnd}]">{{sendText}}</span>
          </div>
        </div>
        <button :class="['login-wechat-wap-button', {'login-wechat-wap-button-disabled' : loginOnFlg || btnText !== loginText}]" @click="login">{{loginText}}</button>
        <div class="login-wechat-wap-wechatbox">
          <img v-if="isWechat && !oauthType" @click="wechatBind" class="login-wechat-wap-wechatbox-img" src="https://0img.evente.cn/e6/19/bf/df8258231f301305300dd2b9c9.jpg">
          <img v-if="!oauthType" @click="loginTypeClick('email')" class="login-wechat-wap-wechatbox-img" src="https://1img.evente.cn/97/e6/dc/e6c517d24ab7f1fd23703d4874.jpg">
        </div>
      </div>
      <!-- 英文版 start -->
      <div v-if="loginType === 'email'" class="login-wechat-wap-popup" :class="{'popup2':showPasswordFalg || forgetPassword,'popup3':showPasswordFalg && setPassword}">
        <div class="login-wechat-wap-close" @click="popupClose">
          <img src="https://static2.evente.cn/static/img/login-icon-close2.png" width="100%">
        </div>
        <h3 class="login-wechat-wap-english-title">{{resultJson['login.popup.title']}}</h3>
        <div v-show="errorShow" class="login-wechat-wap-error">
          <img v-show="errorShow" src="https://static2.evente.cn/static/img/login-icon-error1.png" class="login-wechat-wap-error-img">
          <span v-show="errorShow" class="login-wechat-wap-error-text">{{errorEnglishText}}</span>
        </div>
        <div class="login-wechat-wap-box">
          <input class="login-wechat-wap-english-input" type="email" :placeholder="resultJson['login.popup.input.email']" v-model="nowEnglishData.email" @blur="emailBlur">
        </div>
        <div v-if="showPasswordFalg">
          <div v-if="!setPassword" class="login-wechat-wap-box">
            <input class="login-wechat-wap-english-input" type="password" :placeholder="resultJson['login.popup.input.password']" v-model="nowEnglishData.password" @blur="passwordBlur">
            <div v-if="!forgetPassword && !setPassword && showPasswordFalg" class="login-wechat-wap-box-forget">
              <span @click="forgetPasswordClick">{{resultJson['login.popup.btn.forget_pwd']}}</span>
            </div>
          </div>
          <div v-if="setPassword">
            <div class="login-wechat-wap-box">
              <input class="login-wechat-wap-english-input" type="password" :placeholder="resultJson['login.popup.input.create_password']" v-model="nowEnglishData.createPassword" @blur="createpasswordBlur">
            </div>
            <div class="login-wechat-wap-box">
              <input class="login-wechat-wap-english-input" type="password" :placeholder="resultJson['login.popup.input.confirm_password']" v-model="nowEnglishData.confirmPassword" @blur="confirmpasswordBlur">
            </div>
          </div>
        </div>
        <div v-if="forgetPassword" class="login-wechat-wap-box">
          <input class="login-wechat-wap-english-input" type="tel" :maxlength="smscodeLength" :placeholder="resultJson['login.popup.input.code']" v-model="smscode">
          <div class="login-wechat-wap-english-wraper" @click="sendEnglishSmsCode">
            <span :class="['login-wechat-wap-english-smscode', {'login-wechat-wap-smscode-disabled' : smsEnglishStatus || sendEnglishText !== countEnd}]">{{sendEnglishText}}</span>
          </div>
        </div>
        <div v-if="forgetPassword" class="login-wechat-wap-box">
          <input class="login-wechat-wap-english-input" type="password" :placeholder="resultJson['login.popup.input.set_password']" v-model="setnewpassword">
        </div>
        <div v-if="!showPasswordFalg">
          <!-- 验证邮箱是否注册 按钮 -->
          <button v-if="!forgetPassword" :class="['login-wechat-wap-english-button', {'login-wechat-wap-button-disabled' : loginEnglishOnFlg}]" @click="continueFun">{{resultJson['login.popup.btn.continue']}}</button>
          <!-- 忘记面膜 按钮 -->
          <button v-if="forgetPassword" :class="['login-wechat-wap-english-button', {'login-wechat-wap-button-disabled' : !confirmsetpasswordFlg || btnText !== loginEnglishText}]" @click="emailSetAccount">{{loginEnglishText}}</button>
        </div>
        <div v-else>
          <!-- 邮箱密码登录 按钮 -->
          <button v-if="!setPassword" :class="['login-wechat-wap-english-button', {'login-wechat-wap-button-disabled' : !submitEnglishOnFlg || btnText !== loginEnglishText}]" @click="loginEnglish">{{loginEnglishText}}</button>
          <!-- 密码注册 -->
          <button v-if="setPassword" :class="['login-wechat-wap-english-button', {'login-wechat-wap-button-disabled' : !confirmpasswordFlg}]" @click="emailAccount">{{resultJson['login.popup.btn.create_account']}}</button>
        </div>
        <div v-if="forgetPassword && !setPassword && !showPasswordFalg" class="login-wechat-wap-forget">
          <span @click="returnPasswordClick">{{resultJson['login.popup.btn.return']}}</span>
        </div>

        <div class="login-wechat-wap-wechatbox">
          <img v-if="isWechat && !oauthType" @click="wechatBind" class="login-wechat-wap-wechatbox-img" src="https://0img.evente.cn/e6/19/bf/df8258231f301305300dd2b9c9.jpg">
          <img @click="loginTypeClick('phone')" class="login-wechat-wap-wechatbox-img" src="https://2img.evente.cn/e0/f4/12/86c89d21cdf38c7f55bdee9acd.jpg">
        </div>
      </div>
      <!-- 英文版 end -->
    </div>

  </div>
</template>
<script>
import ajax from '../tools/ajax';
import logined from '../tools/loginedwechat';
import CONSTANT from '../contant';

export default {
  name: 'WLoginWechat',
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
        org_id: '',
        type: '',
        key: '',
        origin: 'c-login',
      },
      loginData: {
        org_id: '',
        code: '',
        verify_code: '',
        phone: '',
        mode: '',
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
        org_id: '',
        type: 'email',
        key: '',
        origin: 'c-login',
      },
      sendEnglishText: '',
      errorEnglishText: '',
      loginEnglishText: '',
      emailEnglishFlg: false,
      countEnglishStart: true,
      loginEnglishData: {
        key: '',
        oauth_key: '',
        org_id: '',
        type: 'email',
        sms_code: '',
      },
      // 英文版 end
      isWechat: false,
      // isWechat: false,
      isLoginFail: true, // 是否登录成功
      // new英文版
      continueFalg: false,
      setPassword: false, //是否设置密码
      showPasswordFalg: false, //是否展示设置密码
      forgetPassword: false, //忘记密码
      loginType: 'phone',
      setnewpassword: '', //设置新密码
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
      default: '请完善账户信息',
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
    //微信绑定
    wechatUrl: {
      type: String,
    },
    oauthkey: { //微信绑定key 值
      type: String,
    },
    oauthType: {//微信绑定类型 值
      type: String,
    },
    //新版英文登录
    loginConfirmAction: {
      type: String,
    },
    loginRegisterAction: {
      type: String,
    },
    autologinAction: {
      type: String,
    },
    wechatLoginAction: {
      type: String,
    },
    bindWechatAction: {
      type: String,
    },
    resultJson: Object,
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
    // new 英文登录
    submitEnglishOnFlg() {
      return this.nowEnglishData.password;
    },
    confirmpasswordFlg() {
      return !!this.nowEnglishData.createPassword &&
        this.nowEnglishData.createPassword === this.nowEnglishData.confirmPassword;
    },
    confirmsetpasswordFlg() {
      return !!(this.setnewpassword && this.smscode && this.smscode.length === 6);
    },
  },
  mounted() {
    this.countNums = this.AllTimes;
    this.loginText = this.btnText;
    this.loginEnglishText = this.btnText;

    if (/MicroMessenger/i.test(window.navigator.userAgent)) {
      this.isWechat = true;
    }

    if (this.oauthType === 'login') {
      const loginData = {
        token: decodeURIComponent(decodeURIComponent(this.oauthkey)),
      };
      ajax({
        headers: this.headers,
        type: 'POST',
        data: JSON.stringify(loginData),
        action: this.wechatLoginAction,
        withCredentials: this.domain === 'evente.cn',
        onSuccess: (res) => {
          if (res.code === 10000) {
            const { data } = res;
            window.$cookie.set(CONSTANT.EVENT_EMTOKEN, `${CONSTANT.COOKIE_PERFIX_TOKEN} ${data.token}`, data.expires, '/', this.domain);
            this.autologin();
          } else {
            this.errorShow = true;
            this.errorText = res.message;
          }
        },
        onError: (err, response) => {
          this.isLoginFail = false;
          this.canLogin = true;
          this.loginText = this.btnText;
          this.errorShow = true;
          this.errorText = response.message;
        },
      });
    }
  },
  created() {
    this.sendText = this.smsBtnText;
    this.sendEnglishText = this.smsBtnText;
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
        this.sendData.type = 'sms';
        this.sendData.key = `${this.nowData.prefix}+${this.nowData.tel}`;
        this.sendData.org_id = this.orgid;

        //发送验证码
        ajax({
          headers: this.headers,
          type: 'POST',
          data: JSON.stringify(this.sendData),
          withCredentials: this.domain === 'evente.cn',
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
    bindWechat() {
      if (this.codeFlg && this.telFlg && this.canLogin) {
        this.canLogin = false;
        this.loginText = this.subingText;

        this.loginData.mode = 'phone';
        this.loginData.verify_code = this.smscode;
        this.loginData.phone = this.nowData.tel;
        this.loginData.code = this.nowData.prefix;
        this.loginData.org_id = this.orgid;
        this.loginData.token = decodeURIComponent(decodeURIComponent(this.oauthkey));

        ajax({
          headers: this.headers,
          type: 'POST',
          data: JSON.stringify(this.loginData),
          action: this.bindWechatAction,
          withCredentials: this.domain === 'evente.cn',
          onSuccess: (res) => {
            if (res.code === 10000) {
              const { data } = res;
              window.$cookie.set(CONSTANT.EVENT_EMTOKEN, `${CONSTANT.COOKIE_PERFIX_TOKEN} ${data.token}`, data.expires, '/', this.domain);
              this.autologin();
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
    // 登录
    login() {
      if (this.oauthType === 'bind') {
        this.bindWechat();
        return;
      }
      if (this.codeFlg && this.telFlg && this.canLogin) {
        this.canLogin = false;
        this.loginText = this.subingText;

        this.loginData.mode = 'phone';
        this.loginData.verify_code = this.smscode;
        this.loginData.phone = this.nowData.tel;
        this.loginData.code = this.nowData.prefix;
        this.loginData.org_id = this.orgid;

        ajax({
          headers: this.headers,
          type: 'POST',
          data: JSON.stringify(this.loginData),
          action: this.loginAction,
          withCredentials: this.domain === 'evente.cn',
          onSuccess: (res) => {
            if (res.code === 10000) {
              const { data } = res;
              window.$cookie.set(CONSTANT.EVENT_EMTOKEN, `${CONSTANT.COOKIE_PERFIX_TOKEN} ${data.token}`, data.expires, '/', this.domain);
              this.autologin();
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
      const text = this.nowEnglishData.email ? this.resultJson['login.popup.tips.email_invalid'] : this.resultJson['login.popup.input.email'];
      /* eslint-disable */
      return {
        resultEmail: emailPattern.test(this.nowEnglishData.email),
        text,
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
        this.sendEnglishText = this.subingText;
        this.sendEnglishData.key = this.nowEnglishData.email;
        this.sendEnglishData.org_id = this.orgid;
        //发送验证码
        ajax({
          headers: this.headers,
          type: 'POST',
          data: JSON.stringify(this.sendEnglishData),
          action: this.sendAction,
          withCredentials: this.domain === 'evente.cn',
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
      this.sendEnglishText = this.smsBtnText;
      this.countNums = this.AllTimes;
      this.countEnglishStart = false;
      this.goEnglishStatus = true;
    },
    loginEnglish() {
      if (this.emailEnglishFlg && this.canLogin) {
        this.canLogin = false;
        this.loginEnglishText = this.subingText;
        const params = {
          mode: this.loginType,
          email: this.nowEnglishData.email,
          password: this.nowEnglishData.password,
        }

        //发送验证码
        ajax({
          headers: this.headers,
          type: 'POST',
          data: JSON.stringify(params),
          action: this.loginAction,
          withCredentials: this.domain === 'evente.cn',
          onSuccess: (res) => {
            if (res.code === 10000) {
              this.errorShow = false;
              this.errorText = '';
              const { data } = res;
              window.$cookie.set(CONSTANT.EVENT_EMTOKEN, `${CONSTANT.COOKIE_PERFIX_TOKEN} ${data.token}`, data.expires, '/', this.domain);
              this.autologin();
            } else {
              this.canLogin = true;
              this.loginEnglishText = this.btnText;
              this.errorShow = true;
              this.errorEnglishText = res.message;
            }
          },
          onError: (err, response) => {
            this.canLogin = true;
            this.loginEnglishText = this.btnText;
            this.errorShow = true;
            this.errorEnglishText = response.message;
          },
        });
      } else {
        this.emailBlur();
      }
    },
    // 英文版 end
    //微信绑定
    wechatBind() {
      window.location.href = this.wechatUrl;
    },
    // new 英文版
    continueFun() {
      if (this.nowEnglishData.email) {
        const userObj = {
        	"key": this.nowEnglishData.email,
        }
        ajax({
          headers: this.headers,
          type: 'GET',
          withCredentials: this.domain === 'evente.cn',
          action: `${this.loginConfirmAction}?email=${userObj.key}`,
          onSuccess: (res) => {
            if (res.code === 10000) {
              if (res.data.exist) {
                this.showPasswordFalg = true;
                this.setPassword = false;
              } else {
                this.showPasswordFalg = true;
                this.setPassword = true;
              }
            } else {
              this.errorShow = true;
              this.errorEnglishText = response.message;
            }
          },
          onError: (err, response) => {
            this.errorShow = true;
            this.errorEnglishText = response.message;
          },
        });
      }
    },
    //注册
    emailAccount() {
      if (this.confirmpasswordFlg) {
        const userObj = {
          "email": this.nowEnglishData.email,
          "password": this.nowEnglishData.createPassword,
        }
        ajax({
          headers: this.headers,
          type: 'POST',
          data: JSON.stringify(userObj),
          withCredentials: this.domain === 'evente.cn',
          action: this.loginRegisterAction,
          onSuccess: (res) => {
            if (res.code === 10000) {
              this.errorShow = false;
              this.errorText = '';
              const { data } = res;
              window.$cookie.set(CONSTANT.EVENT_EMTOKEN, `${CONSTANT.COOKIE_PERFIX_TOKEN} ${data.token}`, data.expires, '/', this.domain);
              this.autologin();
            } else {
              this.canLogin = true;
              this.loginEnglishText = this.btnText;
              this.errorShow = true;
              this.errorEnglishText = res.message;
              this.errorText = res.message;
            }
          },
          onError: (err, response) => {
            this.errorShow = true;
            this.errorEnglishText = response.message;
            this.errorText = response.message;
          },
        });
      }
    },
    //注册
    emailSetAccount() {
      if (this.confirmsetpasswordFlg && this.canLogin) {
        this.canLogin = false;
        this.loginEnglishText = this.subingText;
        const userObj = {
          "email": this.nowEnglishData.email,
          "password": this.setnewpassword,
          "verify_code": this.smscode,
        }
        ajax({
          headers: this.headers,
          type: 'POST',
          data: JSON.stringify(userObj),
          withCredentials: this.domain === 'evente.cn',
          action: this.loginRegisterAction,
          onSuccess: (res) => {
            this.canLogin = true;
            if (res.code === 10000) {
              this.errorShow = false;
              this.errorText = '';
              const { data } = res;
              window.$cookie.set(CONSTANT.EVENT_EMTOKEN, `${CONSTANT.COOKIE_PERFIX_TOKEN} ${data.token}`, data.expires, '/', this.domain);
              this.autologin();
            } else {
              this.loginEnglishText = this.btnText;
              this.errorShow = true;
              this.errorEnglishText = res.message;
              this.errorText = res.message;
            }
          },
          onError: (err, response) => {
            this.canLogin = true;
            this.errorShow = true;
            this.errorEnglishText = response.message;
            this.errorText = response.message;
          },
        });
      }
    },
    testPassword() {
      return {
        resultPassword: this.nowEnglishData.password,
        text: this.resultJson['login.popup.tips.password_invalid'],
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
        text: this.resultJson['login.popup.tips.password_invalid'],
      }
      this.errorShow = !obj.resultPassword;
      this.errorEnglishText = text.text;
    },
    confirmpasswordBlur() {
      const obj = {
        resultPassword: this.nowEnglishData.confirmPassword,
        text: this.nowEnglishData.createPassword ? this.resultJson['login.popup.tips.password_not_consistent'] : this.resultJson['login.popup.tips.password_invalid'],
      }
      this.errorShow = !obj.resultPassword;
      this.errorEnglishText = text.text;
    },
    forgetPasswordClick() {
      this.forgetPassword = true;
      this.showPasswordFalg = false;
      this.nowEnglishData.password = '';
    },
    returnPasswordClick() {
      this.forgetPassword = false;
      this.showPasswordFalg = true;
      this.smscode = '';
    },


    loginTypeClick(type) {
      this.errorShow = false;
      this.loginType = type;
    },

    autologin() {
      const dataObj = {
        'Authorization': window.$cookie.get(CONSTANT.EVENT_EMTOKEN),
      }
      const params = Object.assign(dataObj, this.headers);
      ajax({
        headers: params,
        type: 'GET',
        withCredentials: this.domain === 'evente.cn',
        action: `${this.autologinAction}?org_id=${this.orgid}`,
        onSuccess: (res) => {
          if (res.code === 10000) {
            this.errorShow = false;
            this.errorText = '';
            logined(res, this.orgid, this, () => {
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
          this.errorShow = true;
          this.errorEnglishText = response.message;
        },
      });
    },
  },
  watch: {
    value(val, oldVal) {
      if (val !== oldVal) {
        this.nowData = val;
        this.telBlur();
      }
    },
  },
};
</script>
