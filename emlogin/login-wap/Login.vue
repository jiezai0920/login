<template>
  <div class="login-wap" v-if="show">
    <div class="login-wap-popup">
      <h3 class="login-wap-title">请完善手机信息</h3>
      <p class="login-wap-desc">成功短信将发送至该手机</p>
      <div class="login-wap-close" @touchend="popupClose">
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAQCAYAAAGHNqTJAAAABGdBTUEAALGPC/xhBQAAAZRJREFUOBF9U7tOw0AQtC2EZKeCUNDxAxQ8OldIdv6AP6DkX/gDekqklLGRKDAVj4I0VKQgpoBQWYjGZmbjvZwPw0n2PXZmdnbt85qmCTyMPM/POHuTyaSRRf8ry7KFDRMyRDZ46Pv+p9CAupIFXlA+8LmB8kMQBCdhGL4IjZu6rs/jOF4IrCiKTUUKhdkgPhuNRvsMcFAPrLvBYDAU0PLY81rwK/a7DIosNpKLIDJpFTaPaLWqqpznHGvT6XR9Pp9/wx2Zqix+2qKvWcKtmlzyVm/EnlFRcArZDzCGq9DSG/aVyGoF8LCVpinBpkrNa8qkUbsFppokSe7bICtKNZ0BqCw8HULhXY1LCg1qZ9WTdBXBEow3Daq0gnw2qyzLGUDbCD4yPytRYN/cdj8Dh34vO5XiUAJ/idlkYmAz4fc1IprRBdIZnh07gZKV80tEA44Yj01mxehs2q4HnB2BJzjhBdnjn6efw8Z3nDjkTpPdmF2SiPwHsDNy3Yf10bAA/8ENLH9FUXSst8klu3uK4XpegDf+Ac1BU3TI5L2aAAAAAElFTkSuQmCC" width="100%">
      </div>
      <div class="login-wap-box">
        <div class="login-wap-prefix-wraper">
          <select class="login-wap-prefix" v-model="nowData.prefix" @change="telBlur">
            <option :value="data.prefix" v-for="data in abroadDatas">+{{ data.prefix }}</option>
          </select>
        </div>
        <input class="login-wap-input" type="number" placeholder="输入手机号" v-model="nowData.tel" @blur="telBlur" @input="telInput">
      </div>
      <div class="login-wap-box">
        <input class="login-wap-input" type="tel" maxlength="6" placeholder="输入验证码" v-model="smscode" @blur="codeBlur">
        <div class="login-wap-smscode-wraper" @touchend="sendSmsCode">
          <span :class="['login-wap-smscode', {'login-wap-smscode-disabled' : smsStatus}]">{{sendText}}</span>
        </div>
      </div>
      <button :class="['login-wap-button', {'login-wap-button-disabled' : loginOnFlg}]" @touchend="login">{{loginText}}</button>
      <div class="login-wap-error">
        <img v-show="errorShow" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAAXNSR0IArs4c6QAAApFJREFUSA29Vr1rVEEQn913p+bO2NhErQQxks5CSOElHPmoBS1E/xTFSvEPEawULAyCH4TkLA5SpI2VKCSpIph4OZPDN87svVl3N/f2bYLkwbEzO7+Z383s1yhI+HrzMzfzP3gHEFuo1BVAuGzcFGwpxE1QqqMz9ab5cXW9KpyKAfbmWvcwx6dEMBnDWZuCL0qrx+OfOq/sXCCMJOwvzlwdHOYvCTsd4FPVbv2MfjD2fvVr6HCEcK/dmkWA11S+iyH4WLpSOxT87vhyZ8X18wiZjIg+EGHdBZ1UpuADWt8Fl1RLMC4jZ1ZFVpttAwUwv+YLrnr5x7E4JscWlCU0a5ZQRuzviy9gv2/lUoFiFvvBQAwh70bS0jbIvkPoyKWEQ8N0wQGG0Gz9Cg8xe1mlZFg4CofmQ518zsjZK2l6huQIk8ylzQ0ifz9ldEi8bBN8mUvzdZWAtRCPxNlAFhATiEubuzEGCm0HB4B5bmbRyTaEjdKZizIsLuJRiLI52SwyluHCeeKy5zC0xXTJTMYY1rchaqAnxp9M0IrMvPVMcKNrblub9ywF7GDs0TjmGjJXjR9P2qltJ16l+Pv5M4BGA/Lv3yqxHoAfan6pvckERU1MQDY1BersuQT0Pwhz0QsCsNu+vZF629TmF2Ds0RMTJd/egt7D+3SL0JtQ9VE3cGH58w2zS7ktqMKLPbt2XUTQl6i1aTStHhOEwxAWPUg35iC2wbslyH/sGPVw6S1A75eYYmNX+hxTUkaaPmaAa1Se6tYiy0A1zwPu/oyRDG3UatTr6pb0N5aQrafaYjCh6T2oB6GjMqwZT5704xhBP8OhjlxtTMolIFvSmpb8ny7HcJsnwXkllUkZT60RFkIZ/2er/xe07Byfrt4yVQAAAABJRU5ErkJggg==" class="login-wap-error-img">
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
  },
  computed: {
    loginOnFlg() {
      const {
        resultTel,
      } = this.testTel();
      return !resultTel || !this.testSms();
    },
    smsStatus() {
      const {
        resultTel,
      } = this.testTel();
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
    },
    testSms() {
      return this.telFlg ? this.smscode !== '' : false;
    },
    // 验证码文本框失去焦点事件
    codeBlur() {
      const smsResult = this.testSms();
      this.errorText = smsResult ? '' : '输入验证码';
      this.codeFlg = smsResult;
      this.errorShow = !smsResult;
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
        this.loginText = `${this.loginDefault}中`;
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
