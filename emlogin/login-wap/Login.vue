<template>
  <div class="login-wap" v-if="show" @click="closeFlag">
    <div class="login-wap-popup">
      <!-- <div class="login-wap-switch" @click="switchLoginWay">
        <p class="login-wap-switch-box">
          <span id="0" :class="[{'login-wap-switch-box-text-on': index === 0}, 'login-wap-switch-box-text']">短信登录</span>
        </p>
        <p class="login-wap-switch-box">
          <span id="1" :class="[{'login-wap-switch-box-text-on': index === 1}, 'login-wap-switch-box-text']">微信登录</span>
        </p>
      </div> -->
      <!-- <div class="login-wap-close" @click="popupClose"></div> -->
      <!-- <div class="login-wap-main" v-show="index === 0">
        <div class="login-wap-main-error" v-show="errorShow">
          <span class="login-wap-main-error-text">{{errorText}}</span>
        </div>
        <div class="login-wap-main-box login-wap-tel">
          <div class="login-wap-tel-prefix" @click.stop="toggle">
            <img class="login-wap-tel-prefix-piece" :src="nowData.url" :alt="nowData.name">
            <span class="login-wap-tel-prefix-text">+{{ nowData.prefix }}</span>
            <span class="login-wap-tel-prefix-arrow"></span>
            <ul class="login-wap-tel-flag" v-show="flagStatus" >
              <li class="login-wap-tel-label" v-for="data in abroadDatas" @click.stop="choice(data)">
                <img :src="data.url" :alt="data.name" class="login-wap-tel-icon">
                <span class="login-wap-tel-icon-piece">{{ data.name }}</span>
                <span class="login-wap-tel-icon-tel">+{{ data.prefix }}</span>
              </li>
            </ul>
          </div>
          <input class="login-wap-tel-input" type="number" placeholder="手机号" v-model="nowData.tel" @blur="telBlur" @input="telInput">
        </div>
        <div class="login-wap-main-box login-wap-smscode">
          <input class="login-wap-smscode-input" type="number" placeholder="验证码" v-model="smscode" @blur="codeBlur">
          <div class="login-wap-smscode-send" @click="sendSmsCode">
            <span class="login-wap-smscode-send-text">{{sendText}}</span>
          </div>
        </div>
        <button class="login-wap-main-button" @click="login">{{loginText}}</button>
        <p class="login-wap-main-tip">首次登录自动为您创建账号</p>
      </div>
      <div class="login-wap-main login-wap-weixin" v-show="index === 1">
        <div class="login-wap-weixin-ewm"></div>
        <p class="login-wap-weixin-tip">扫一扫 登录账号</p>
      </div> -->
    </div>
  </div>
</template>
<script>
import ajax from '../tools/ajax';
import logined from '../tools/logined';

let go = true;
let timer = null;
<<<<<<< HEAD:water/login-wap/Login.vue
// let canLogin = true;
=======
>>>>>>> up/master:emlogin/login-wap/Login.vue

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
    };
  },
  props: {
    // 控制登录弹框 显示 / 不显示
    show: {
      type: Boolean,
      default: false,
      required: true,
    },
    // 登录弹框 关闭
    close: {
      type: Function,
      default: () => {},
      required: true,
    },
    headers: {
      type: Object,
      default() {
        return {};
      },
    },
    orgid: {
      type: String,
      required: true,
    },
    // 登录成功
    success: {
      type: Function,
      default: () => {},
      required: true,
    },
    countrycodeAction: {
      type: String,
      required: true,
    },
    sendAction: {
      type: String,
      required: true,
    },
    loginAction: {
      type: String,
      required: true,
    },
    // weixinAction: {
    //   type: String,
    //   required: true,
    // },
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
        console.log(err, response, 'onError');
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
        console.log(this.nowData, 'this.nowData');
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
            console.log(err, response, 'onError');
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
      if (this.codeFlg && this.telFlg) {
        this.loginText = '登录中';
        this.loginData.code = this.nowData.prefix;
        this.loginData.phone = this.nowData.tel;
        this.loginData.sms_code = this.smscode;
        console.log(this.loginData, 'this.loginData.sms_code');
        //发送验证码
        ajax({
          headers: this.headers,
          type: 'POST',
          data: JSON.stringify(this.loginData),
          action: this.loginAction,
          onSuccess: (res) => {
            console.log(res);
            if (res.code === 10000) {
              this.errorShow = false;
              this.errorText = '';
              logined(res, res.data.org_id, this, () => {
                this.success(res);
              });
            } else {
              this.loginText = '登录';
              this.errorShow = true;
              this.errorText = res.message;
            }
          },
          onError: (err, response) => {
            console.log(err, response, 'onError');
            this.loginText = '登录';
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
  },
};
</script>
