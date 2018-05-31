/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "1ff2bbb355b7ecac2873e1f33f7b2405"
  },
  {
    "url": "assets/css/0.styles.0eb13166.css",
    "revision": "4c8435dbce51b88a7c9f8531baaa2451"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/1.5c03ca4e.js",
    "revision": "ef644f776f3e034d866f56dfe91f80d5"
  },
  {
    "url": "assets/js/2.f5e4482f.js",
    "revision": "7287821adbde0cc1fd03b3b8d81a6d5d"
  },
  {
    "url": "assets/js/3.a8d90726.js",
    "revision": "94e15e9a3ddc6c3b593e64efe3798252"
  },
  {
    "url": "assets/js/4.c7eef264.js",
    "revision": "ba07c3eb7d0756aa2171f25df5050b65"
  },
  {
    "url": "assets/js/app.a74e1c53.js",
    "revision": "cc42f7e4f6d300aef6e14bce8702e69c"
  },
  {
    "url": "icon/zh-cn.html",
    "revision": "3ecdd2ef30d0189b5f2b429f88146a11"
  },
  {
    "url": "index.html",
    "revision": "c43c2e0db0927600f682a76799037ba3"
  },
  {
    "url": "login-wap/zh-cn.html",
    "revision": "36f80979c666c39a25d1e2fd3814065f"
  },
  {
    "url": "login/zh-cn.html",
    "revision": "e6e8325142f32b6767d7925f9cb6687a"
  },
  {
    "url": "logo.png",
    "revision": "a53179ca13039218c56cb6bce42e3aa6"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
