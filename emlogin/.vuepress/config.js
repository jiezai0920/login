const base = process.env.GH ? '/login/' : '/'

module.exports = {
  title: '登录组件',
  base,
  head: [
    ['link', { rel: 'icon', href: `/logo.png` }]
  ],
  dest: './docs',
  serviceWorker: true,
  themeConfig: {
    editLinks: false,
    searchMaxSuggestions: 5,
    docsDir: 'emlogin',
    editLinkText: '帮助我们改善此页面！',
    sidebar: [
      '/',
      '/login/zh-cn',
      '/login-wap/zh-cn',
    ]
  }
}
