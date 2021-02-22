<template>
  <div class="login" v-if="showPopLogin">
    <div class="login-popup popup2" v-if="loginType === 'phone'">
      <h3 class="login-title">{{title}}</h3>
      <p class="login-desc">{{resultJson['login.popup.tips.send_code_success']}}</p>
      <div v-show="errorShow" class="login-error">
        <img v-show="errorShow" src="https://static2.evente.cn/static/img/login-icon-error1.png" class="login-error-img">
        <span v-show="errorShow" class="login-error-text">{{errorText}}</span>
      </div>
      <div class="login-close" @click="popupClose">
        <img src="https://static2.evente.cn/static/img/login-icon-close2.png" width="100%">
      </div>
      <div class="login-box">
        <div class="login-prefix-wraper">
          <select class="login-prefix" v-model="nowData.prefix" @change="nowData.tel = ''">
            <option
              :value="data.prefix"
              :key="dataIndex"
              v-for="(data, dataIndex) in abroadDatas"
            >+{{ data.prefix }}</option>
          </select>
        </div>
        <input class="login-input" type="number" :placeholder="resultJson['login.popup.input.phone']" v-model="nowData.tel" @blur="telBlur" @input="telInput" ref="telElem">
      </div>
      <div class="login-box">
        <input class="login-input" type="tel" :maxlength="smscodeLength" :placeholder="resultJson['login.popup.input.code']" v-model="smscode" @blur="codeBlur" ref="codeElem">
        <div class="login-smscode-wraper" @click="sendChinaSmsCode">
          <span :class="['login-smscode', {'login-smscode-disabled' : smsChinaStatus || sendChinaText !== countChinaEnd}]">{{sendChinaText}}</span>
        </div>
      </div>
      <button :class="['login-button', 'login-button-china', {'login-button-disabled' : loginChinaOnFlg || loginChinaDefault !== loginChinaText}]" @click="loginChina">{{loginChinaText}}</button>

      <div class="login-box-wechatbox">
        <img v-if="!oauthType && isShowWechat" @click="wechatBind" class="login-box-wechatbox-img" src="https://0img.evente.cn/e6/19/bf/df8258231f301305300dd2b9c9.jpg">
        <img v-if="!oauthType" @click="loginTypeClick('email')" class="login-box-wechatbox-img" src="https://1img.evente.cn/97/e6/dc/e6c517d24ab7f1fd23703d4874.jpg">
      </div>
    </div>
    <!-- 英文版 start -->
    <div class="login-popup" v-if="loginType === 'email'" :class="{'popup2':showPasswordFalg || forgetPassword,'popup3':showPasswordFalg && setPassword}">
      <div class="login-close" @click="popupClose">
        <img src="https://static2.evente.cn/static/img/login-icon-close2.png" width="100%">
      </div>
      <h3 class="login-english-title">{{resultJson['login.popup.title']}}</h3>
      <div v-if="errorShow" class="login-error">
        <img v-show="errorShow" src="https://static2.evente.cn/static/img/login-icon-error1.png" class="login-error-img">
        <span v-show="errorShow" class="login-error-text">{{errorText}}</span>
      </div>
      <div class="login-box">
        <input class="login-english-input" type="email" :placeholder="resultJson['login.popup.input.email']" v-model="nowEnglishData.email" @blur="emailBlur">
      </div>
      <div v-if="showPasswordFalg">
        <div v-if="!setPassword" class="login-box">
          <input class="login-english-input" type="password" :placeholder="resultJson['login.popup.input.password']" v-model="nowEnglishData.password" @blur="passwordBlur">
          <div v-if="!forgetPassword && !setPassword && showPasswordFalg" class="login-box-forget">
            <span  @click="forgetPasswordClick">{{resultJson['login.popup.btn.forget_pwd']}}</span>
          </div>
        </div>
        <div v-if="setPassword">
          <div class="login-box">
            <input class="login-english-input" type="password" :placeholder="resultJson['login.popup.input.create_password']" v-model="nowEnglishData.createPassword" @blur="createpasswordBlur">
          </div>
          <div class="login-box">
            <input class="login-english-input" type="password" :placeholder="resultJson['login.popup.input.confirm_password']" v-model="nowEnglishData.confirmPassword" @blur="confirmpasswordBlur">
          </div>
        </div>
      </div>
      <div v-if="forgetPassword" class="login-box">
        <input class="login-english-input" type="tel" :maxlength="smscodeLength" :placeholder="resultJson['login.popup.input.code']" v-model="smscode">
        <div class="login-english-wraper" @click="sendEnglishSmsCode">
          <span :class="['login-english-smscode', {'login-smscode-disabled' : smsEnglishStatus || sendEnglishText !== countEnglishEnd}]">{{sendEnglishText}}</span>
        </div>
      </div>
      <div v-if="forgetPassword" class="login-wechat-wap-box">

        <input class="login-english-input" type="password" :placeholder="resultJson['login.popup.input.set_password']" v-model="setnewpassword">
      </div>
      <div v-if="!showPasswordFalg">
        <!-- 验证邮箱是否注册 按钮 -->
        <button v-if="!forgetPassword" :class="['login-english-button', {'login-button-disabled' : loginEnglishOnFlg}]" @click="continueFun">{{resultJson['login.popup.btn.continue']}}</button>
        <!-- 忘记面膜 按钮 -->
        <button v-if="forgetPassword" :class="['login-english-button', {'login-button-disabled' : !confirmsetpasswordFlg || loginEnglishDefault !== loginEnglishText}]" @click="emailSetAccount">{{loginEnglishText}}</button>
      </div>
      <div v-else>
        <!-- 邮箱密码登录 按钮 -->
        <button v-if="!setPassword" :class="['login-english-button', {'login-button-disabled' : !submitEnglishOnFlg || (loginEnglishDefault !== loginEnglishText)}]" @click="loginEnglish">{{loginEnglishText}}</button>
        <!-- 密码注册 -->
        <button v-if="setPassword" :class="['login-english-button', {'login-button-disabled' : !confirmpasswordFlg}]" @click="emailAccount">{{resultJson['login.popup.btn.create_account']}}</button>
      </div>
      <div v-if="forgetPassword && !setPassword && !showPasswordFalg" class="login-forget">
        <span @click="returnPasswordClick">{{resultJson['login.popup.btn.return']}}</span>
      </div>
      <div class="login-box-wechatbox">
         <!-- v-if="isWechat && !oauthType" -->
        <img v-if="!oauthType & isShowWechat" @click="wechatBind" class="login-box-wechatbox-img" src="https://0img.evente.cn/e6/19/bf/df8258231f301305300dd2b9c9.jpg">
        <img v-if="!oauthType" @click="loginTypeClick('phone')" class="login-box-wechatbox-img" src="https://2img.evente.cn/e0/f4/12/86c89d21cdf38c7f55bdee9acd.jpg">
      </div>
    </div>
    <!-- 英文版 end -->
  </div>
</template>
<script>
import ajax from '../tools/ajax';
import logined from '../tools/loginedwechat';
import CONSTANT from '../contant';

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
      sendChinaText: '',
      countChinaEnd: '',
      countChinaStart: true,
      AllTimes: 60,
      countNums: 0,
      errorShow: false,
      errorText: '',
      loginChinaDefault: '',
      loginChinaText: '',
      nowData: {
        name: '中国',
        tel: '',
        prefix: '86',
        url: 'https://static.evente.cn/evente/img/flag/v1/zg.jpg',
      },
      abroadDatas: [],
      sendChinaData: {
        org_id: '',
        type: '',
        key: '',
        origin: 'c-login',
      },
      loginChinaData: {
        org_id: '',
        code: '',
        verify_code: '',
        phone: '',
        mode: '',
        token: '',
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
      sendEnglishText: '',
      countEnglishEnd: '',
      loginEnglishDefault: '',
      loginEnglishText: '',
      emailEnglishFlg: false,
      countEnglishStart: true,
      loginEnglishData: {
        org_id: '',
      },
      // 英文版 end
      // new英文版
      continueFalg: false,
      setPassword: false, //是否设置密码
      showPasswordFalg: false, //是否展示设置密码
      forgetPassword: false, //忘记密码

      loginType: 'phone',
      setnewpassword: '',
      showPopLogin: false,
    };
  },
  props: {
    value: Object,
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
    loginConfirmAction: {
      type: String,
    },
    loginRegisterAction: {
      type: String,
    },
    title: {
      type: String,
      default: '请完善账户信息',
    },
    resultJson: Object,
    env: Object,
    autologinAction: {
      type: String,
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
    wechatLoginAction: {
      type: String,
    },
    bindWechatAction: {
      type: String,
    },
    isShowWechat: {
      type: Boolean,
      default: true,
    },
    withCredentialsFlag: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
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
  created() {
    this.sendEnglishText = this.resultJson['login.popup.btn.send_code'];
    this.countEnglishEnd = this.resultJson['login.popup.btn.send_code'];
    this.sendChinaText = this.resultJson['login.popup.btn.send_code'];
    this.countChinaEnd = this.resultJson['login.popup.btn.send_code'];
    this.loginEnglishDefault = this.resultJson['common.btn.confirm'];
    this.loginChinaDefault = this.resultJson['common.btn.confirm'];

    this.countNums = this.AllTimes;
    this.loginChinaText = this.loginChinaDefault;
    this.loginEnglishText = this.loginEnglishDefault;

    ajax({
      headers: this.headers,
      type: 'GET',
      withCredentials: this.withCredentialsFlag,
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
          this.errorText = res.message;
          this.errorShow = true;
        }
      },
      onError: (err, response) => {
        this.errorText = response.message;
        this.errorShow = true;
      },
    });
    if (this.oauthType === 'login') {
      const loginData = {
        token: decodeURIComponent(decodeURIComponent(this.oauthkey)),
      };
      ajax({
        headers: this.headers,
        type: 'POST',
        data: JSON.stringify(loginData),
        action: this.wechatLoginAction,
        withCredentials: this.withCredentialsFlag,
        onSuccess: (res) => {
          if (res.code === 10000) {
            const { data } = res;
            window.$cookie.set(CONSTANT.EVENT_EMTOKEN, `${CONSTANT.COOKIE_PERFIX_TOKEN} ${data.token}`, data.expires, '/', this.domain);
            this.autologin();
          } else {
            this.errorText = res.message;
            this.errorShow = true;
          }
        },
        onError: (err, response) => {
          this.isLoginFail = false;
          this.canLogin = true;
          this.loginText = this.btnText;
          this.errorText = response.message;
          this.errorShow = true;
        },
      });
    } else {
      this.showPopLogin = this.show;
    }
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
        text = this.resultJson['login.popup.tips.phone_invalid'];
      }

      if (telEmpty) {
        text = this.resultJson['login.popup.input.phone'];
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
      this.errorText = text;
      this.countChinaStart = !resultTel;
      this.telFlg = resultTel;
      this.errorShow = !resultTel;
      // 将不在浏览器窗口的可见区域内的元素滚动到浏览器窗口的可见区域。
      document.activeElement.scrollIntoViewIfNeeded();
    },
    testSms() {
      return this.telFlg ? (`${this.smscode}`).length === this.smscodeLength : false;
    },
    // 验证码文本框失去焦点事件
    codeBlur() {
      const smsResult = this.testSms();
      this.errorText = smsResult ? '' : this.resultJson['login.popup.input.code'];
      this.codeFlg = smsResult;
      this.errorShow = !smsResult;
      // 将不在浏览器窗口的可见区域内的元素滚动到浏览器窗口的可见区域。
      document.activeElement.scrollIntoViewIfNeeded();
    },
    // 发送验证码
    sendChinaSmsCode() {
      if (this.telFlg && this.goChinaStatus) {
        this.goChinaStatus = false;
        this.sendChinaText = this.resultJson['login.popup.btn.sending_code'];
        this.sendChinaData.type = 'sms';
        this.sendChinaData.key = `${this.nowData.prefix}+${this.nowData.tel}`;
        this.sendChinaData.org_id = this.orgid;
        //发送验证码
        ajax({
          headers: this.headers,
          type: 'POST',
          data: JSON.stringify(this.sendChinaData),
          withCredentials: this.withCredentialsFlag,
          action: this.sendAction,
          onSuccess: (res) => {
            if (res.code === 10000) {
              this.errorText = '';
              this.countChinaStart = true;
              this.errorShow = false;
              this.autoChina();
            } else {
              this.errorText = res.message;
              this.errorShow = true;
              this.resetChinaAuto();
            }
          },
          onError: (err, response) => {
            this.resetChinaAuto();
            this.errorText = response.message;
            this.errorShow = true;
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
    bindWechat() {
      if (this.telFlg && this.canLogin) {
        this.canLogin = false;
        this.loginChinaText = this.resultJson['login.popup.btn.submiting'];

        this.loginChinaData.mode = this.loginType;
        this.loginChinaData.verify_code = this.smscode;
        this.loginChinaData.phone = this.nowData.tel;
        this.loginChinaData.code = this.nowData.prefix;
        this.loginChinaData.org_id = this.orgid;
        this.loginChinaData.token = decodeURIComponent(decodeURIComponent(this.oauthkey));

        //发送验证码
        ajax({
          headers: this.headers,
          type: 'POST',
          data: JSON.stringify(this.loginChinaData),
          withCredentials: this.withCredentialsFlag,
          action: this.bindWechatAction,
          onSuccess: (res) => {
            if (res.code === 10000) {
              this.errorShow = false;
              this.errorText = '';
              const { data } = res;
              window.$cookie.set(CONSTANT.EVENT_EMTOKEN, `${CONSTANT.COOKIE_PERFIX_TOKEN} ${data.token}`, data.expires, '/', this.domain);
              this.autologin();
            } else {
              this.canLogin = true;
              this.loginChinaText = this.loginChinaDefault;
              this.errorText = res.message;
              this.errorShow = true;
            }
          },
          onError: (err, response) => {
            this.canLogin = true;
            this.loginChinaText = this.loginChinaDefault;
            this.errorText = response.message;
            this.errorShow = true;
          },
        });
      } else {
        this.telBlur();
        this.codeBlur();
      }
    },
    // 登录
    loginChina() {
      if (this.oauthType === 'bind') {
        this.bindWechat();
        return;
      }
      if (this.telFlg && this.canLogin) {
        this.canLogin = false;
        this.loginChinaText = this.resultJson['login.popup.btn.submiting'];

        this.loginChinaData.mode = this.loginType;
        this.loginChinaData.verify_code = this.smscode;
        this.loginChinaData.phone = this.nowData.tel;
        this.loginChinaData.code = this.nowData.prefix;
        this.loginChinaData.org_id = this.orgid;

        //发送验证码
        ajax({
          headers: this.headers,
          type: 'POST',
          data: JSON.stringify(this.loginChinaData),
          withCredentials: this.withCredentialsFlag,
          action: this.loginAction,
          onSuccess: (res) => {
            if (res.code === 10000) {
              this.errorShow = false;
              this.errorText = '';
              const { data } = res;
              window.$cookie.set(CONSTANT.EVENT_EMTOKEN, `${CONSTANT.COOKIE_PERFIX_TOKEN} ${data.token}`, data.expires, '/', this.domain);
              this.autologin();
            } else {
              this.canLogin = true;
              this.loginChinaText = this.loginChinaDefault;
              this.errorText = res.message;
              this.errorShow = true;
            }
          },
          onError: (err, response) => {
            this.canLogin = true;
            this.loginChinaText = this.loginChinaDefault;
            this.errorText = response.message;
            this.errorShow = true;
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
      this.errorText = text;
      this.countEnglishStart = !resultEmail;
      this.emailEnglishFlg = resultEmail;
      this.errorShow = !resultEmail;
    },
    // 发送验证码
    sendEnglishSmsCode() {
      if (this.emailEnglishFlg && this.goEnglishStatus) {
        this.goEnglishStatus = false;
        this.sendEnglishText = this.resultJson['login.popup.btn.sending_code'];
        this.sendEnglishData.key = this.nowEnglishData.email;
        this.sendEnglishData.org_id = this.orgid;
        //发送验证码
        ajax({
          headers: this.headers,
          type: 'POST',
          data: JSON.stringify(this.sendEnglishData),
          withCredentials: this.withCredentialsFlag,
          action: this.sendEnglishAction,
          onSuccess: (res) => {
            if (res.code === 10000) {
              this.errorShow = false;
              this.errorText = '';
              this.countEnglishStart = true;
              this.autoEnglish();
            } else {
              this.errorText = res.message;
              this.errorShow = true;
              this.resetEnglishAuto();
            }
          },
          onError: (err, response) => {
            this.resetEnglishAuto();
            this.errorText = response.message;
            this.errorShow = true;
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
        this.loginEnglishText = this.resultJson['login.popup.btn.submiting'];
        this.loginEnglishData.key = this.nowEnglishData.email;
        this.loginEnglishData.org_id = this.orgid;
        const params = {
          email: this.nowEnglishData.email,
          mode: this.loginType,
          password: this.nowEnglishData.password,
        }
        //发送验证码
        ajax({
          headers: this.headers,
          type: 'POST',
          data: JSON.stringify(params),
          withCredentials: this.withCredentialsFlag,
          action: this.loginEnglishAction,
          onSuccess: (res) => {
            if (res.code === 10000) {
              this.errorShow = false;
              this.errorText = '';
              const { data } = res;
              window.$cookie.set(CONSTANT.EVENT_EMTOKEN, `${CONSTANT.COOKIE_PERFIX_TOKEN} ${data.token}`, data.expires, '/', this.domain);
              this.autologin();
            } else {
              this.canLogin = true;
              this.loginEnglishText = this.loginEnglishDefault;
              this.errorText = res.message;
              this.errorShow = true;
            }
          },
          onError: (err, response) => {
            this.canLogin = true;
            this.loginEnglishText = this.loginEnglishDefault;
            this.errorText = response.message;
            this.errorShow = true;
          },
        });
      } else {
        this.emailBlur();
      }
    },
    // 英文版 end
    // new 英文版
    continueFun() {
      this.showPasswordFalg = true;
      this.setPassword = true;
      if (this.nowEnglishData.email) {
        const userObj = {
        	"key": this.nowEnglishData.email,
        }
        ajax({
          headers: this.headers,
          type: 'GET',
          withCredentials: this.withCredentialsFlag,
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
              this.errorText = response.message;
              this.errorShow = true;
            }
          },
          onError: (err, response) => {
            this.errorText = response.message;
            this.errorShow = true;
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
          action: this.loginRegisterAction,
          withCredentials: this.withCredentialsFlag,
          onSuccess: (res) => {
            if (res.code === 10000) {
              this.errorShow = false;
              this.errorText = '';
              const { data } = res;
              window.$cookie.set(CONSTANT.EVENT_EMTOKEN, `${CONSTANT.COOKIE_PERFIX_TOKEN} ${data.token}`, data.expires, '/', this.domain);
              this.autologin();
            } else {
              this.canLogin = true;
              this.loginEnglishText = this.loginEnglishDefault;
              this.errorText = res.message;
              this.errorShow = true;
            }
          },
          onError: (err, response) => {
            this.errorText = response.message;
            this.errorShow = true;
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
      this.errorText = text;
      this.countEnglishStart = !resultPassword;
    },
    createpasswordBlur() {
      const {
        resultPassword,
        text,
      } = {
        resultPassword: this.nowEnglishData.createPassword,
        text: this.resultJson['login.popup.tips.password_invalid'],
      }
      this.errorText = text;
      this.errorShow = !resultPassword;
    },
    confirmpasswordBlur() {
      const {
        resultPassword,
        text,
      } = {
        resultPassword: this.nowEnglishData.confirmPassword,
        text: this.nowEnglishData.createPassword ? this.resultJson['login.popup.tips.password_not_consistent'] : this.resultJson['login.popup.tips.password_invalid'],
      }
      this.errorText = text;
      this.errorShow = !resultPassword;
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
      this.loginType = type;
      this.errorShow = false;
    },
    //微信绑定
    wechatBind() {
      window.location.href = this.wechatUrl;
    },
    autologin() {
      const dataObj = {
        'Authorization': window.$cookie.get(CONSTANT.EVENT_EMTOKEN),
      }
      const params = Object.assign(dataObj, this.headers);
      ajax({
        headers: params,
        type: 'GET',
        withCredentials: this.withCredentialsFlag,
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
            this.errorText = res.message;
            this.errorShow = true;
          }
        },
        onError: (err, response) => {
          this.loginText = this.btnText;
          this.errorText = response.message;
          this.errorShow = true;
        },
      });
    },
    emailSetAccount() {
      if (this.confirmsetpasswordFlg) {
        this.canLogin = false;
        this.loginEnglishText = this.resultJson['login.popup.btn.submiting'];
        this.loginEnglishData.key = this.nowEnglishData.email;
        this.loginEnglishData.org_id = this.orgid;
        const params = {
          "email": this.nowEnglishData.email,
          "password": this.setnewpassword,
          "verify_code": this.smscode,
        }
        //发送验证码
        ajax({
          headers: this.headers,
          type: 'POST',
          data: JSON.stringify(params),
          withCredentials: this.withCredentialsFlag,
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
              this.loginEnglishText = this.loginEnglishDefault;
              this.errorText = res.message;
              this.errorShow = true;
            }
          },
          onError: (err, response) => {
            this.canLogin = true;
            this.loginEnglishText = this.loginEnglishDefault;
            this.errorShow = true;
            this.errorText = response.message;
          },
        });
      } else {
        this.emailBlur();
      }
    },
  },
  watch: {
    value(val, oldVal) {
      if (val !== oldVal) {
        this.nowData = val;
      }
    },
  },
};
</script>
