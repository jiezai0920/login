<template>
  <div class="login-wap" v-if="show" @click="closeFlag">
    <div class="login-wap-popup">
      <h3 class="login-wap-title">请完善购买人信息</h3>
      <p class="login-wap-desc">购票短信将会发送给购买人</p>
      <div class="login-wap-close" @click="popupClose">
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAQCAYAAAGHNqTJAAAABGdBTUEAALGPC/xhBQAAAZRJREFUOBF9U7tOw0AQtC2EZKeCUNDxAxQ8OldIdv6AP6DkX/gDekqklLGRKDAVj4I0VKQgpoBQWYjGZmbjvZwPw0n2PXZmdnbt85qmCTyMPM/POHuTyaSRRf8ry7KFDRMyRDZ46Pv+p9CAupIFXlA+8LmB8kMQBCdhGL4IjZu6rs/jOF4IrCiKTUUKhdkgPhuNRvsMcFAPrLvBYDAU0PLY81rwK/a7DIosNpKLIDJpFTaPaLWqqpznHGvT6XR9Pp9/wx2Zqix+2qKvWcKtmlzyVm/EnlFRcArZDzCGq9DSG/aVyGoF8LCVpinBpkrNa8qkUbsFppokSe7bICtKNZ0BqCw8HULhXY1LCg1qZ9WTdBXBEow3Daq0gnw2qyzLGUDbCD4yPytRYN/cdj8Dh34vO5XiUAJ/idlkYmAz4fc1IprRBdIZnh07gZKV80tEA44Yj01mxehs2q4HnB2BJzjhBdnjn6efw8Z3nDjkTpPdmF2SiPwHsDNy3Yf10bAA/8ENLH9FUXSst8klu3uK4XpegDf+Ac1BU3TI5L2aAAAAAElFTkSuQmCC" width="100%">
      </div>
      <div class="login-wap-box">
        <div class="login-wap-prefix-wraper">
          <select class="login-wap-prefix" v-model="nowData.prefix">
            <option :value="data.prefix" v-for="data in abroadDatas">+{{ data.prefix }}</option>
          </select>
        </div>
        <div class="login-wap-line">
          <input class="login-wap-input" type="number" placeholder="请输入手机号" v-model="nowData.tel" @blur="telBlur" @input="telInput">
        </div>
      </div>
      <div class="login-wap-box">
        <input class="login-wap-input" type="tel" maxlength="6" placeholder="请输入验证码" v-model="smscode" @blur="codeBlur">
        <div class="login-wap-smscode-wraper" @click="sendSmsCode">
          <span :class="['login-wap-smscode', {'login-wap-smscode-disabled' : countStart}]">{{sendText}}</span>
        </div>
      </div>
      <button :class="['login-wap-button', {'login-wap-button-disabled' : loginOnFlg}]" @click="login">{{loginText}}</button>
      <div class="login-wap-error" v-show="errorShow">
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAFM0aXcAAAABGdBTUEAALGPC/xhBQAAAdlJREFUKBWlUc1LG1EQn3m7GzVmU7GQe6GK+NF6qReTsAnVXuqlxoNeREVB/4T+H714EUrpqXrQi1jqLk2aS0W8CKVY9B+waLJKkv14vnn4NptAT32Hmfl9zL6ZtwDi1Iq5dVYv5ja10fFtIuTBmpXlVCEFAsa7Enh7X9qEVBFLlKFeyG7IQgTZi08GgN/eQNqpYPQxcjAGq0yEJWVPHVd25C1uMbsYhvBZCZRRXGDa5V0UF2xxDh+UqOct8L87EmrI1qI5JZNMgjY6BsHJTwlpCFmoQOPS4gpTjhzu6/xEGPC3CPq+advnkSi67sQMyXYXummnbLJ6IVdRgpj2UecpwX9jnPNp1cGDQJUg+CKLkCj43+s4BCaW/6GY8OJClfQox3Lafw5EVtOu9DMNXwr7e0RjnCYlPtqTQOON9dxr+jviX2cJx48w2nqvvtp36FwpXjY3ZvJDnh+eqZWlaJrQs7wCfrUKwemJ8lOuG736C/oIc2esyZYX/u5oJEuzCYn5BcBMhlD8mF7Dv6zNWiOM+8FcXInqVgu46wK/7nw+pTMvmGOoaweK6M7NTx8hvPzTTUscGtoBS311zhIGG0aE+7gLB5+KsUugvZqK01TTzs/SR86v/3rtB4r5vIPMy4DjAAAAAElFTkSuQmCC" class="login-wap-error-img">
        <span class="login-wap-error-text">{{errorText}}</span>
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
      flagStatus: false,
      smscode: '',
      sendText: '获取验证码',
      countEnd: '获取验证码',
      countStart: true,
      AllTimes: 60,
      countNums: 0,
      errorShow: false,
      errorText: '验证码错误',
      loginText: '提交信息',
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
  mounted() {
    this.countNums = this.AllTimes;
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
        this.countStart = true;
        this.errorText = '请输入手机号';
      } else if (reg.test(code + this.nowData.tel)) {
        this.telFlg = true;
        this.errorShow = false;
        this.countStart = false;
        this.errorText = '';
      } else {
        this.telFlg = false;
        this.errorShow = true;
        this.countStart = true;
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
        this.loginText = '提交信息中';
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
                this.loginText = '提交信息';
                this.loginOnFlg = false;
                this.close(false);
              });
            } else {
              this.canLogin = true;
              this.loginText = '提交信息';
              this.loginOnFlg = false;
              this.errorShow = true;
              this.errorText = res.message;
            }
          },
          onError: (err, response) => {
            this.canLogin = true;
            this.loginText = '提交信息';
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
