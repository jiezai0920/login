const base = process.env.GH ? '/login/' : '/'

module.exports = {
  title: '水滴',
  base,
  head: [
    ['link', { rel: 'icon', href: `/logo.png` }]
  ],
  dest: './docs',
  serviceWorker: true,
  themeConfig: {
    repo: 'fe6/water',
    editLinks: true,
    lastUpdated: '上次更新', // string | boolean
    searchMaxSuggestions: 5,
    docsDir: 'login',
    editLinkText: '帮助我们改善此页面！',
    sidebar: [
      '/',
      '/icon/zh-cn',
      '/login/zh-cn',
      '/login-wap/zh-cn',
    ]
  }
}
