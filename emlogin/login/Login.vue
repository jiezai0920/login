<template>
  <div class="login" v-if="show" @click="closeFlag">
    <div class="login-popup">
      <div class="login-switch">
        <p class="login-switch-box login-switch-one">
          <span id="0" :class="[{'login-switch-box-text-on': index === 0}, 'login-switch-box-text']">登录</span>
        </p>
      </div>
      <!-- <div class="login-switch" @click="switchLoginWay">
        <p class="login-switch-box">
          <span id="0" :class="[{'login-switch-box-text-on': index === 0}, 'login-switch-box-text']">短信登录</span>
        </p>
        <p class="login-switch-box">
          <span id="1" :class="[{'login-switch-box-text-on': index === 1}, 'login-switch-box-text']">微信登录</span>
        </p>
      </div> -->
      <div class="login-close" @click="popupClose"></div>
      <div class="login-main" v-show="index === 0">
        <div class="login-main-error" v-show="errorShow">
          <span class="login-main-error-text">{{errorText}}</span>
        </div>
        <div class="login-main-box login-tel">
          <div class="login-tel-prefix" @click.stop="toggle">
            <img class="login-tel-prefix-piece" :src="nowData.url" :alt="nowData.name">
            <span class="login-tel-prefix-text">+{{ nowData.prefix }}</span>
            <span class="login-tel-prefix-arrow"></span>
            <ul class="login-tel-flag" v-show="flagStatus" >
              <li class="login-tel-label" v-for="data in abroadDatas" @click.stop="choice(data)">
                <img :src="data.url" :alt="data.name" class="login-tel-icon">
                <span class="login-tel-icon-piece">{{ data.name }}</span>
                <span class="login-tel-icon-tel">+{{ data.prefix }}</span>
              </li>
            </ul>
          </div>
          <input class="login-tel-input" type="number" placeholder="手机号" v-model="nowData.tel" @blur="telBlur" @input="telInput">
        </div>
        <div class="login-main-box login-smscode">
          <input class="login-smscode-input" type="number" placeholder="验证码" v-model="smscode" @blur="codeBlur">
          <div class="login-smscode-send" @click="sendSmsCode">
            <span :class="['login-smscode-send-text', {'login-smscode-send-text-disabled' : countStart}]">{{sendText}}</span>
          </div>
        </div>
        <button :class="['login-main-button', {'login-main-button-disabled' : loginOnFlg}]" @click="login">{{loginText}}</button>
        <!-- <w-jiyan @suc="sucCodeFn" :before="beforeCodeFn" :jiyanAction="jiyanAction">极验</w-jiyan> -->
        <p class="login-main-tip">首次登录自动为您创建账号</p>
      </div>
      <div class="login-main login-weixin" v-show="index === 1">
        <div class="login-weixin-ewm"></div>
        <p class="login-weixin-tip">扫一扫 登录账号</p>
      </div>
    </div>
  </div>
</template>
<script>
import ajax from '../tools/ajax';
import logined from '../tools/logined';
// import WJiyan from '../jiyan/index';

let go = true;
let timer = null;

export default {
  name: 'WLogin',
  data() {
    return {
      index: 0, // 登录方式切换下标
      telFlg: false,
      codeFlg: false,
      flagStatus: false,
      smscode: '',
      sendText: '获取验证码',
      countEnd: '获取验证码',
      countStart: false,
      AllTimes: 60,
      countNums: 0,
      errorShow: false,
      errorText: '验证码错误',
      loginText: '登录',
      loginOnFlg: false,
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
        org_id: '',
        code: '',
        phone: '',
        moudle_name: 'c-login',
        sms_code: '',
      },
      countryCode: {},
      canLogin: true,
    };
  },
  // components: {
  //   WJiyan,
  // },
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
    countrycodeAction: String,
    sendAction: String,
    loginAction: String,
    jiyanAction: String,
    // weixinAction: String,
  },
  mounted() {
    //do something after mounting vue instance
    this.countNums = this.AllTimes;
  },
  created() {
    //do something after creating vue instance
    // 获取countrycode
    this.loginData.org_id = this.orgid;
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
    // 切换登录方式
    switchLoginWay(e) {
      const id = e.target.id * 1;
      this.index = id;
    },
    // 关闭登录弹框
    popupClose() {
      this.close(false);
    },
    // 切换country
    toggle() {
      this.flagStatus = !this.flagStatus;
    },
    // 选择country
    choice(item) {
      this.nowData = item;
      this.flagStatus = false;
    },
    closeFlag() {
      this.flagStatus = false;
    },
    // 手机号文本框input事件
    telInput(e) {
      this.nowData.tel = e.target.value;
    },
    // 手机号文本框失去焦点事件
    telBlur() {
      const code = this.nowData.prefix;
      const reg = new RegExp(this.countryCode[code].pattern);
      if (this.nowData.tel === '') {
        this.telFlg = false;
        this.errorShow = true;
        this.errorText = '请输入手机号';
      } else if (reg.test(code + this.nowData.tel)) {
        this.telFlg = true;
        this.errorShow = false;
        this.errorText = '';
      } else {
        this.telFlg = false;
        this.errorShow = true;
        this.errorText = '手机号格式有误';
      }
    },
    // 验证码文本框失去焦点事件
    codeBlur() {
      if (this.telFlg) {
        if (this.smscode === '') {
          this.codeFlg = false;
          this.errorShow = true;
          this.errorText = '请输入验证码';
        } else {
          this.codeFlg = true;
          this.errorShow = false;
          this.errorText = '';
        }
      }
    },
    // 发送验证码
    sendSmsCode() {
      if (this.telFlg && go) {
        go = false;
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
      } else {
        this.telBlur();
      }
    },
    auto() {
      setTimeout(() => {
        if (this.countStart) {
          if (this.countNums > 1) {
            this.countNums--;
            this.sendText = `${this.countNums} 秒重试`;
            timer = setTimeout(this.auto.bind(this), 1000);
          } else {
            clearTimeout(timer);
            this.resetAuto();
          }
        }
      }, 500);
    },
    resetAuto() {
      this.sendText = this.countEnd;
      this.countNums = this.AllTimes;
      this.countStart = false;
      go = true;
    },
    // 登录
    login() {
      if (this.codeFlg && this.telFlg && this.canLogin) {
        this.canLogin = false;
        this.loginText = '登录中';
        this.loginOnFlg = true;
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
                this.loginText = '登录';
                this.loginOnFlg = false;
                this.close(false);
              });
            } else {
              this.loginText = '登录';
              this.canLogin = true;
              this.loginOnFlg = false;
              this.errorShow = true;
              this.errorText = res.message;
            }
          },
          onError: (err, response) => {
            this.canLogin = true;
            this.loginText = '登录';
            this.loginOnFlg = false;
            this.errorShow = true;
            this.errorText = response.message;
          },
        });
      } else {
        this.telBlur();
        this.codeBlur();
      }
    },
    // 极验
    // beforeCodeFn() {
    //   this.telBlur();
    //   return this.telFlg;
    // },
    // sucCodeFn() {
    //   console.log('极验成功');
    // },
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
