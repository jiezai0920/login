(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{52:function(t,s,n){"use strict";var a={install:function(t){t.prototype.$cookie||Object.defineProperties(t.prototype,{$cookie:{get:function(){return a}}})},get:function(t){return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*"+encodeURIComponent(t).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=\\s*([^;]*).*$)|^.*$"),"$1"))||null},set:function(t,s,n,a,e,o){if(!t)throw new Error("cookie name is not find in first argument");if(/^(?:expires|max\-age|path|domain|secure)$/i.test(t))throw new Error("cookie key name illegality ,Cannot be set to ['expires','max-age','path','domain','secure']\t","current key name: "+t);var c="; max-age=";if(n)switch(n.constructor){case Number:c=n===1/0||-1===n?"; expires=Fri, 31 Dec 9999 23:59:59 GMT":"; max-age="+n;break;case String:if(/^(?:\d{1,}(y|m|d|h|min|s))$/i.test(n)){var r=n.replace(/^(\d{1,})(?:y|m|d|h|min|s)$/i,"$1");switch(n.replace(/^(?:\d{1,})(y|m|d|h|min|s)$/i,"$1").toLowerCase()){case"m":c="; max-age="+259200*+r;break;case"d":c="; max-age="+86400*+r;break;case"h":c="; max-age="+3600*+r;break;case"min":c="; max-age="+60*+r;break;case"s":c="; max-age="+r;break;case"y":c="; max-age="+31104e3*+r;break;default:new Error("unknown exception of 'set operation'")}}else c="; expires="+n;break;case Date:c="; expires="+n.toUTCString()}return document.cookie=encodeURIComponent(t)+"="+encodeURIComponent(s)+c+(e?"; domain="+e:"")+(a?"; path="+a:"; path=/")+(o?"; secure":""),this},remove:function(t,s,n){return!(!t||!this.isKey(t))&&(document.cookie=encodeURIComponent(t)+"=; expires="+new Date+(n?"; domain="+n:"")+(s?"; path="+s:"; path=/"),!0)},isKey:function(t){return new RegExp("(?:^|;\\s*)"+encodeURIComponent(t).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=").test(document.cookie)},keys:function(){for(var t=document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g,"").split(/\s*(?:\=[^;]*)?;\s*/),s=0;s<t.length;s++)t[s]=decodeURIComponent(t[s]);return t}};function e(t){var s=t.responseText||t.response;if(!s)return s;try{return JSON.parse(s)}catch(t){return s}}function o(t){if("undefined"!=typeof XMLHttpRequest){var s=new XMLHttpRequest,n=t.action;s.onerror=function(s){t.onError(s)},s.onload=function(){return s.status<200||s.status>=300?t.onError(function(t,s,n){var a="fail to post "+t+" "+n.status+"'",e=new Error(a);return e.status=n.status,e.method="post",e.url=t,e}(n,0,s),e(s)):t.onSuccess(e(s))},"POST"===t.type?(s.open("post",n,!0),s.setRequestHeader("Content-Type","application/json;charset=UTF-8")):s.open("get",n,!0);var a=function(){return(65536*(1+Math.random())|0).toString(16).substring(1)},o=window.$cookie.get("X-Session-Id")||a()+a()+a()+a()+a()+a()+a()+a();window.$cookie.set("X-Session-Id",o),s.setRequestHeader("X-Session-Id",o);var c=t.headers||{};Object.keys(c).forEach(function(t){(function(t,s){return Object.prototype.hasOwnProperty.call(t,s)})(c,t)&&null!==c[t]&&s.setRequestHeader(t,c[t])}),"POST"===t.type?s.send(t.data):s.send()}}"undefined"==typeof window||window.$cookie||(window.$cookie=a),n.d(s,"a",function(){return o})},53:function(t,s,n){"use strict";var a={hOwnProperty:function(t,s){return Object.prototype.hasOwnProperty.call(t,s)},formatParams:function(t,s){var n=[];return Object.keys(t).forEach(function(s){n.push(encodeURIComponent(s)+"="+encodeURIComponent(t[s]))}),this.hOwnProperty(t,"callback")||n.push("callback="+s),n.push("v="+this.random()),n.join("&")},random:function(){return Math.floor(1e4*Math.random()+500)}};function e(t){var s=t.callback||"callback",n=document.getElementsByTagName("head")[0],e=a.formatParams(t.data||{},s),o=document.createElement("script");n.appendChild(o),window[s]=function(a){n.removeChild(o),clearTimeout(o.timer),window[s]=null,t.success&&t.success(a)},o.src=t.url+"?"+e,t.time&&(o.timer=setTimeout(function(){window[s]=null,n.removeChild(o),t.error&&t.error({message:"超时"})},t.time))}"undefined"==typeof window||window.$jsonp||(window.$jsonp=e);var o=function(t,s,n,a){var e=s,r=t[e].split("?"),i=r[0],u=r[1];u=u.replace(/=/g,'":"').replace(/&/g,'","'),u=JSON.parse('{"'+u+'"}'),window.$jsonp({url:i,data:u,success:function(s){1e4===s.code?0===e?a():o(t,--e,n,a):n.$EmfeMessage.error({content:"登录失败"})},error:function(){n.$EmfeMessage.error({content:"登录失败"}),c}})};s.a=function(t,s,n,a){o(t.data.call_back_url,t.data.call_back_url.length-1,n,function(){window.$cookie.set("Authorization?org_id="+s,"Bearer "+t.data.token,t.data.expires),window.$cookie.set("userInfo",t.data.real_name,t.data.expires),a()})}},55:function(t,s,n){},57:function(t,s,n){"use strict";var a=n(55);n.n(a).a},60:function(t,s,n){"use strict";n.r(s);var a=n(52),e=n(53),o=!0,c=null,r={name:"WLogin",data:function(){return{index:0,telFlg:!1,codeFlg:!1,flagStatus:!1,smscode:"",sendText:"获取验证码",countEnd:"获取验证码",countStart:!1,AllTimes:60,countNums:0,errorShow:!1,errorText:"验证码错误",loginText:"登录",nowData:{name:"中国",tel:"",prefix:"86",url:"https://static.evente.cn/evente/img/flag/v1/zg.jpg"},abroadDatas:[],sendData:{country_code:"",mobile:"",origin:"c-login"},loginData:{org_id:"",code:"",phone:"",moudle_name:"c-login",sms_code:""},countryCode:{}}},props:{show:{type:Boolean,default:!1,required:!0},close:{type:Function,default:function(){},required:!0},headers:{type:Object,default:function(){return{}}},orgid:{type:String,required:!0},success:{type:Function,default:function(){},required:!0},countrycodeAction:{type:String,required:!0},sendAction:{type:String,required:!0},loginAction:{type:String,required:!0}},mounted:function(){this.countNums=this.AllTimes},created:function(){var t=this;this.loginData.org_id=this.orgid,Object(a.a)({headers:this.headers,type:"GET",action:this.countrycodeAction,onSuccess:function(s){if(1e4===s.code){var n={},a=s.data;t.countryCode=a,Object.keys(a).forEach(function(s){1===a[s].enabled&&(n={name:a[s].chinese_name,tel:"",prefix:a[s].country_code,url:a[s].icon},t.abroadDatas.push(n))})}else t.errorShow=!0,t.errorText=s.message},onError:function(s,n){console.log(s,n,"onError"),t.errorShow=!0,t.errorText=n.message}})},methods:{switchLoginWay:function(t){var s=1*t.target.id;this.index=s},popupClose:function(){this.close(!1)},toggle:function(){this.flagStatus=!this.flagStatus},choice:function(t){this.nowData=t,this.flagStatus=!1},closeFlag:function(){this.flagStatus=!1},telInput:function(t){this.nowData.tel=t.target.value},telBlur:function(){var t=this.nowData.prefix,s=new RegExp(this.countryCode[t].pattern);""===this.nowData.tel?(this.telFlg=!1,this.errorShow=!0,this.errorText="请输入手机号"):s.test(t+this.nowData.tel)?(this.telFlg=!0,this.errorShow=!1,this.errorText=""):(this.telFlg=!1,this.errorShow=!0,this.errorText="手机号格式有误")},codeBlur:function(){this.telFlg&&(""===this.smscode?(this.codeFlg=!1,this.errorShow=!0,this.errorText="请输入验证码"):(this.codeFlg=!0,this.errorShow=!1,this.errorText=""))},sendSmsCode:function(){var t=this;this.telFlg&&o?(o=!1,this.sendText="获取中",console.log(this.nowData,"this.nowData"),this.sendData.country_code=this.nowData.prefix,this.sendData.mobile=this.nowData.tel,Object(a.a)({headers:this.headers,type:"POST",data:JSON.stringify(this.sendData),action:this.sendAction,onSuccess:function(s){1e4===s.code?(t.errorShow=!1,t.errorText="",t.countStart=!0,t.auto()):(t.errorShow=!0,t.errorText=s.message,t.resetAuto())},onError:function(s,n){console.log(s,n,"onError"),t.resetAuto(),t.errorShow=!0,t.errorText=n.message}})):this.telBlur()},auto:function(){var t=this;setTimeout(function(){t.countStart&&(t.countNums>1?(t.countNums--,t.sendText=t.countNums+" 秒重试",c=setTimeout(t.auto.bind(t),1e3)):(clearTimeout(c),t.resetAuto()))},500)},resetAuto:function(){this.sendText=this.countEnd,this.countNums=this.AllTimes,this.countStart=!1,o=!0},login:function(){var t=this;this.codeFlg&&this.telFlg?(this.loginText="登录中",this.loginData.code=this.nowData.prefix,this.loginData.phone=this.nowData.tel,this.loginData.sms_code=this.smscode,console.log(this.loginData,"this.loginData.sms_code"),Object(a.a)({headers:this.headers,type:"POST",data:JSON.stringify(this.loginData),action:this.loginAction,onSuccess:function(s){console.log(s),1e4===s.code?(t.errorShow=!1,t.errorText="",Object(e.a)(s,s.data.org_id,t,function(){t.success(s)})):(t.loginText="登录",t.errorShow=!0,t.errorText=s.message)},onError:function(s,n){console.log(s,n,"onError"),t.loginText="登录",t.errorShow=!0,t.errorText=n.message}})):(this.telBlur(),this.codeBlur())}},watch:{value:function(t,s){t!==s&&(this.nowData=t)}}},i=n(0),u=Object(i.a)(r,function(){var t=this.$createElement,s=this._self._c||t;return this.show?s("div",{staticClass:"login-wap",on:{click:this.closeFlag}},[s("div",{staticClass:"login-wap-popup"})]):this._e()},[],!1,null,null,null).exports;u.install=function(t){t.component(u.name,u)};var l={data:function(){return{show:!1,countrycodeAction:"https://www.easy-mock.com/mock/5ab386ecca15e11ded65b593/chinese/countrycode",sendAction:"https://www.easy-mock.com/mock/5ab386ecca15e11ded65b593/chinese/smssend",loginAction:"https://www.easy-mock.com/mock/5ab386ecca15e11ded65b593/chinese/login"}},components:{WLoginWap:u},mounted:function(){document.getElementsByTagName("html")[0].className="html"},beforeDestroy:function(){document.getElementsByTagName("html")[0].className=""},methods:{click:function(){this.show=!0},close:function(t){this.show=t},success:function(t){console.log(t,"登录")}}},p=(n(57),Object(i.a)(l,function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("div",{staticClass:"content"},[t._m(0),t._m(1),t._m(2),n("div",{staticClass:"login-box"},[n("button",{attrs:{type:"button",name:"button"},on:{click:t.click}},[t._v("登录")]),n("w-login-wap",{attrs:{show:t.show,close:t.close,success:t.success,orgid:"100253",countrycodeAction:t.countrycodeAction,sendAction:t.sendAction,loginAction:t.loginAction}})],1),t._m(3),t._m(4),t._m(5),t._m(6),t._m(7),t._m(8),t._m(9),t._m(10),t._m(11),t._m(12)])},[function(){var t=this.$createElement,s=this._self._c||t;return s("h1",{attrs:{id:"c端登录弹框-wap"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#c端登录弹框-wap","aria-hidden":"true"}},[this._v("#")]),this._v(" C端登录弹框(wap)")])},function(){var t=this.$createElement,s=this._self._c||t;return s("blockquote",[s("p",[this._v("基于Vue.js 的 前端业务组件。")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"案例演示"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#案例演示","aria-hidden":"true"}},[this._v("#")]),this._v(" 案例演示")])},function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("pre",{pre:!0,attrs:{class:"language-vue"}},[n("code",[n("span",{attrs:{class:"token tag"}},[n("span",{attrs:{class:"token tag"}},[n("span",{attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),t._v(" "),n("span",{attrs:{class:"token attr-name"}},[t._v("class")]),n("span",{attrs:{class:"token attr-value"}},[n("span",{attrs:{class:"token punctuation"}},[t._v("=")]),n("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("login-box"),n("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),n("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),n("span",{attrs:{class:"token tag"}},[n("span",{attrs:{class:"token tag"}},[n("span",{attrs:{class:"token punctuation"}},[t._v("<")]),t._v("button")]),t._v(" "),n("span",{attrs:{class:"token attr-name"}},[t._v("type")]),n("span",{attrs:{class:"token attr-value"}},[n("span",{attrs:{class:"token punctuation"}},[t._v("=")]),n("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("button"),n("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),n("span",{attrs:{class:"token attr-name"}},[t._v("name")]),n("span",{attrs:{class:"token attr-value"}},[n("span",{attrs:{class:"token punctuation"}},[t._v("=")]),n("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("button"),n("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),n("span",{attrs:{class:"token attr-name"}},[t._v("@click")]),n("span",{attrs:{class:"token attr-value"}},[n("span",{attrs:{class:"token punctuation"}},[t._v("=")]),n("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("click"),n("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),n("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("登录"),n("span",{attrs:{class:"token tag"}},[n("span",{attrs:{class:"token tag"}},[n("span",{attrs:{class:"token punctuation"}},[t._v("</")]),t._v("button")]),n("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),n("span",{attrs:{class:"token tag"}},[n("span",{attrs:{class:"token tag"}},[n("span",{attrs:{class:"token punctuation"}},[t._v("<")]),t._v("w-login-wap")]),t._v(" "),n("span",{attrs:{class:"token attr-name"}},[t._v(":show")]),n("span",{attrs:{class:"token attr-value"}},[n("span",{attrs:{class:"token punctuation"}},[t._v("=")]),n("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("show"),n("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),n("span",{attrs:{class:"token attr-name"}},[t._v(":close")]),n("span",{attrs:{class:"token attr-value"}},[n("span",{attrs:{class:"token punctuation"}},[t._v("=")]),n("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("close"),n("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),n("span",{attrs:{class:"token attr-name"}},[t._v(":success")]),n("span",{attrs:{class:"token attr-value"}},[n("span",{attrs:{class:"token punctuation"}},[t._v("=")]),n("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("success"),n("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),n("span",{attrs:{class:"token attr-name"}},[t._v("orgid")]),n("span",{attrs:{class:"token attr-value"}},[n("span",{attrs:{class:"token punctuation"}},[t._v("=")]),n("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("100253"),n("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),n("span",{attrs:{class:"token attr-name"}},[t._v(":countrycodeAction")]),n("span",{attrs:{class:"token attr-value"}},[n("span",{attrs:{class:"token punctuation"}},[t._v("=")]),n("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("countrycodeAction"),n("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),n("span",{attrs:{class:"token attr-name"}},[t._v(":sendAction")]),n("span",{attrs:{class:"token attr-value"}},[n("span",{attrs:{class:"token punctuation"}},[t._v("=")]),n("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("sendAction"),n("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),n("span",{attrs:{class:"token attr-name"}},[t._v(":loginAction")]),n("span",{attrs:{class:"token attr-value"}},[n("span",{attrs:{class:"token punctuation"}},[t._v("=")]),n("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("loginAction"),n("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),n("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),n("span",{attrs:{class:"token tag"}},[n("span",{attrs:{class:"token tag"}},[n("span",{attrs:{class:"token punctuation"}},[t._v("</")]),t._v("w-login-wap")]),n("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),n("span",{attrs:{class:"token tag"}},[n("span",{attrs:{class:"token tag"}},[n("span",{attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),n("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])},function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{attrs:{class:"token keyword"}},[t._v("import")]),t._v(" WLoginWap "),n("span",{attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),n("span",{attrs:{class:"token string"}},[t._v("'./index'")]),n("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),n("span",{attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),n("span",{attrs:{class:"token keyword"}},[t._v("default")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),n("span",{attrs:{class:"token function"}},[t._v("data")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),n("span",{attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      show"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{attrs:{class:"token boolean"}},[t._v("false")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      countrycodeAction"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{attrs:{class:"token string"}},[t._v("'https://www.easy-mock.com/mock/5ab386ecca15e11ded65b593/chinese/countrycode'")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      sendAction"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{attrs:{class:"token string"}},[t._v("'https://www.easy-mock.com/mock/5ab386ecca15e11ded65b593/chinese/smssend'")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      loginAction"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{attrs:{class:"token string"}},[t._v("'https://www.easy-mock.com/mock/5ab386ecca15e11ded65b593/chinese/login'")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  components"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    WLoginWap"),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),n("span",{attrs:{class:"token function"}},[t._v("mounted")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    document"),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{attrs:{class:"token function"}},[t._v("getElementsByTagName")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{attrs:{class:"token string"}},[t._v("'html'")]),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{attrs:{class:"token punctuation"}},[t._v("[")]),n("span",{attrs:{class:"token number"}},[t._v("0")]),n("span",{attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("className "),n("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{attrs:{class:"token string"}},[t._v("'html'")]),n("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),n("span",{attrs:{class:"token function"}},[t._v("beforeDestroy")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    document"),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{attrs:{class:"token function"}},[t._v("getElementsByTagName")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{attrs:{class:"token string"}},[t._v("'html'")]),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{attrs:{class:"token punctuation"}},[t._v("[")]),n("span",{attrs:{class:"token number"}},[t._v("0")]),n("span",{attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("className "),n("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{attrs:{class:"token string"}},[t._v("''")]),n("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  methods"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),n("span",{attrs:{class:"token function"}},[t._v("click")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),n("span",{attrs:{class:"token keyword"}},[t._v("this")]),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("show "),n("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{attrs:{class:"token boolean"}},[t._v("true")]),n("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),n("span",{attrs:{class:"token function"}},[t._v("close")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("val"),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),n("span",{attrs:{class:"token keyword"}},[t._v("this")]),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("show "),n("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" val"),n("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),n("span",{attrs:{class:"token function"}},[t._v("success")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("res"),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      console"),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{attrs:{class:"token function"}},[t._v("log")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("res"),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{attrs:{class:"token string"}},[t._v("'登录'")]),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"如何使用"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#如何使用","aria-hidden":"true"}},[this._v("#")]),this._v(" 如何使用")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("使用 "),s("code",[this._v("<w-login-wap />")]),this._v(" 标签声明组件，指定图标对应的 type 属性，示例代码如下:")])},function(){var t=this.$createElement,s=this._self._c||t;return s("pre",{pre:!0,attrs:{class:"language-html"}},[s("code",[s("span",{attrs:{class:"token tag"}},[s("span",{attrs:{class:"token tag"}},[s("span",{attrs:{class:"token punctuation"}},[this._v("<")]),this._v("w-login-wap")]),s("span",{attrs:{class:"token punctuation"}},[this._v(">")])]),s("span",{attrs:{class:"token tag"}},[s("span",{attrs:{class:"token tag"}},[s("span",{attrs:{class:"token punctuation"}},[this._v("</")]),this._v("w-login-wap")]),s("span",{attrs:{class:"token punctuation"}},[this._v(">")])]),this._v("\n")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"api"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#api","aria-hidden":"true"}},[this._v("#")]),this._v(" API")])},function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("table",[n("thead",[n("tr",[n("th",[t._v("参数")]),n("th",[t._v("说明")]),n("th",[t._v("类型")]),n("th",[t._v("是否必填")]),n("th",[t._v("默认值")])])]),n("tbody",[n("tr",[n("td",[t._v("show")]),n("td",[t._v("控制弹框显示")]),n("td",[t._v("Boolean")]),n("td",[t._v("是")]),n("td",[t._v("false")])]),n("tr",[n("td",[t._v("org_id")]),n("td",[t._v("主办id")]),n("td",[t._v("String")]),n("td",[t._v("是")]),n("td",[t._v("-")])]),n("tr",[n("td",[t._v("countrycodeAction")]),n("td",[t._v("获取countrycode接口地址")]),n("td",[t._v("String")]),n("td",[t._v("是")]),n("td",[t._v("-")])]),n("tr",[n("td",[t._v("sendAction")]),n("td",[t._v("发送验证码接口地址")]),n("td",[t._v("String")]),n("td",[t._v("是")]),n("td",[t._v("-")])]),n("tr",[n("td",[t._v("loginAction")]),n("td",[t._v("用户登录接口地址")]),n("td",[t._v("String")]),n("td",[t._v("是")]),n("td",[t._v("-")])]),n("tr",[n("td",[t._v("close")]),n("td",[t._v("关闭弹框")]),n("td",[t._v("Function")]),n("td",[t._v("是")]),n("td",[t._v("() => {}")])]),n("tr",[n("td",[t._v("success")]),n("td",[t._v("登录成功")]),n("td",[t._v("Function")]),n("td",[t._v("是")]),n("td",[t._v("() => {}")])])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"方法"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#方法","aria-hidden":"true"}},[this._v("#")]),this._v(" 方法")])},function(){var t=this.$createElement,s=this._self._c||t;return s("pre",{pre:!0,attrs:{class:"language-html"}},[s("code",[s("span",{attrs:{class:"token tag"}},[s("span",{attrs:{class:"token tag"}},[s("span",{attrs:{class:"token punctuation"}},[this._v("<")]),this._v("w-login-wap")]),this._v(" "),s("span",{attrs:{class:"token punctuation"}},[this._v("/>")])]),this._v("\n")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("table",[s("thead",[s("tr",[s("th",[this._v("事件名")]),s("th",[this._v("说明")]),s("th",[this._v("返回值")])])]),s("tbody",[s("tr",[s("td",[this._v("close")]),s("td",[this._v("点击触发,关闭弹框")]),s("td",[this._v("false")])])])])}],!1,null,null,null));s.default=p.exports}}]);