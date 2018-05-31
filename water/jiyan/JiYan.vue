<template>
  <div ref="jiyan" @click="verify"><slot></slot></div>
</template>
<script>
import ajax from '../tools/ajax';

export default {
  name: 'WJiyan',
  data() {
    return {
      captchaGlobal: null,
    };
  },
  props: {
    before: {
      type: Function,
      default: () => true,
    },
    jiyanAction: {
      type: String,
      required: true,
    },
  },
  created() {
    console.log(11);
    this.initGt();
    // AuthApi.geetestPrepare().then((res) => {
    //   window.jiyanConfig = res;
    //   window.initGeetest({
    //     ...window.jiyanConfig,
    //     product: 'bind',
    //   }, (captchaObj) => {
    //     this.captchaGlobal = captchaObj;
    //     captchaObj.appendTo(this.$refs.jiyan);
    //     captchaObj.onSuccess(() => {
    //       this.$emit('suc', captchaObj.getValidate(), this.captchaGlobal);
    //     });
    //   });
    // });
  },
  methods: {
    initGt() {
      const scriptNode = document.createElement('script');
      scriptNode.src = 'http://static.geetest.com/static/tools/gt.js';
      document.getElementsByTagName('head')[0].appendChild(scriptNode);
      scriptNode.onload = () => {
        this.getGtConfig();
      };
    },
    getGtConfig() {
      ajax({
        headers: this.headers,
        type: 'GET',
        action: this.jiyanAction,
        onSuccess: (res) => {
          initGeetest({
            ...res.data,
            product: 'bind',
          }, (captchaObj) => {
            this.captchaGlobal = captchaObj;
            captchaObj.appendTo(this.$refs.jiyan);
            captchaObj.onSuccess((result) => {
              this.$emit('suc', this.captchaGlobal);
            });
          });
        },
        onError: (err, response) => {
          this.errorShow = true;
          this.errorText = response.message;
        },
      });
    },
    verify() {
      const canGo = this.before();
      if (canGo) {
        this.captchaGlobal.verify();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
