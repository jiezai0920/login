<template>
  <div class="emfelogin-checkout" :class="checkoutName">
    <div :class="{'emfelogin-checkout-wrap': tip}">
      <label class="emfelogin-checkout-box" :class="boxName">
        <i class="emfelogin-checkout-inner" :class="[innerName, checkedName]"></i>
        <input type="checkbox" class="emfelogin-checkout-status" :class="{'emfelogin-checkout-box-forever': checkedForever || disable || disabled, 'emfelogin-checkout-status-right': this.theme === 'right'}" :checked="checkoutStatus" @click.stop="click" @change="alocked" :name="name" :disabled="disable ||disabled" v-if="stop">
        <input type="checkbox" class="emfelogin-checkout-status" :class="{'emfelogin-checkout-box-forever': checkedForever || disable || disabled, 'emfelogin-checkout-status-right': this.theme === 'right'}" :checked="checkoutStatus" @change="alocked" :name="name" :disabled="disable ||disabled" v-else>
        <span class="emfelogin-checkout-text" :class="textName">{{ newtitle }}</span>
      </label>
      <!-- <emfe-tooltip className="emfelogin-checkout" theme="light" :placement="placement" v-if="tip">
        <emfe-icon className="emfelogin-checkout" type="tishi" slot="render"></emfe-icon>
        <div slot="tip" v-html="tip"></div>
      </emfe-tooltip> -->
    </div>
    <div class="emfelogin-checkout-slide" v-if="slideShow">
      <transition name="fade">
        <div class="emfelogin-checkout-slide-wrap" v-show="checkoutStatus" :class="openName">
          <slot name="slide"></slot>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import _ from '../tools/lodash';

export default {
  name: 'EmfeCheckout',
  data() {
    return {
      checkoutStatus: this.value,
      newtitle: this.title,
    };
  },
  props: {
    theme: {
      validator(value) {
        return _.has(value, ['left', 'right']);
      },
      default: 'left',
    },
    slideShow: {
      type: Boolean,
      default: false,
    },
    stop: {
      type: Boolean,
      default: true,
    },
    value: {
      type: Boolean,
      default: false,
    },
    tip: {
      type: String,
      default: '',
    },
    placement: {
      type: String,
      default: 'bottom',
    },
    className: String,
    disable: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    title: String,
    inline: String,
    change: {
      type: Function,
      default: () => {},
    },
    index: [Number, String],
    name: String,
    checkedForever: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    innerName() {
      return [
        {
          'emfelogin-checkout-inner-disable': this.disable || this.disabled, 'emfelogin-checkout-inner-checked': this.checkoutStatus, 'emfelogin-checkout-inner-right': this.theme === 'right',
        },
      ];
    },
    checkedName() {
      return [
        {
          'emfelogin-checkout-inner-checked-disabled': this.checkedForever || this.disable || this.disabled,
        },
      ];
    },
    checkoutName() {
      return [
        {
          [`${this.className}-checkout`]: !!this.className,
          'emfelogin-checkout-inline': this.inline,
        },
      ];
    },
    boxName() {
      return [
        {
          [`${this.className}-checkout-box`]: !!this.className,
          'emfelogin-checkout-box-forever': this.checkedForever || this.disable || this.disabled,
        },
      ];
    },
    openName() {
      return [
        {
          [`${this.className}-slide-wrap-open`]: !!this.className,
        },
      ];
    },
    textName() {
      return [
        {
          [`${this.className}-text`]: !!this.className,
          'emfelogin-checkout-text-notip': !this.tip,
          'emfelogin-checkout-text-right': this.theme === 'right',
        },
      ];
    },
  },
  methods: {
    alocked(e) {
      const checked = this.checkedForever ||
      this.disable ||
      this.disabled ? false : e.target.checked;
      this.setValue(checked);
      this.$emit('input', this.checkoutStatus);
      this.$emit('checked', this.checkoutStatus, this.title, this.index);
      this.$emit('change', this.checkoutStatus, this.title, this.index);
      this.change(this.checkoutStatus, this.title, this.index);
    },
    setValue(checked = this.value) {
      this.checkoutStatus = checked;
    },
    click() {
      this.$emit('click', this.checkoutStatus);
    },
  },
  watch: {
    title(val, oldVal) {
      if (val !== oldVal) {
        this.newtitle = val;
      }
    },
    value() {
      this.setValue();
    },
  },
};
</script>
<style lang="scss">
@import "./checkout.scss";
</style>
