module.exports = {
  themeConfig: {
    sidebar: [
      {
        title: 'YamJs文档',
        collapsable: false,
        children: [
          '/',
          '/install',
          '/start',
          {
            title: '组件实例',
            path: '/instance'
          },
          {
            title: '深入了解组件',
            path: '/component'
          },
          {
            title: 'yamjs扩展',
            path: '/plugins'
          },
          {
            title: 'yamjs扩展编写',
            path: '/addPlugins'
          },
          '/History'
        ]
      }
    ]
  },

  head: [
    [
      'script',
      {
        crossorigin: 'anonymous',
        async: 'async',
        src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4565784521486024'
      }
    ]
  ]
}
