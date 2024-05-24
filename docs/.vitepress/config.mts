import { defineConfig } from 'vitepress'
import { set_sidebar } from './utils'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Study',
  description: 'good good study,day day up',
  sitemap: {
    hostname: 'https://jinyue127.github.io/radash-study/'
  },
  base: '/radash-study/',
  head: [
    ['link', { rel: 'icon', href: '/radash-study/logo.png' }],
    [
      'meta',
      {
        name: 'referrer',
        content: 'no-referrer'
      }
    ]
  ],
  cleanUrls: true,
  themeConfig: {
    footer: {
      message: 'Radash 源码学习'
      // copyright: 'Copyright © 2019-present Evan You'
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },

    outline: {
      label: '页面导航'
    },

    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    externalLinkIcon: true,

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    logo: '/logo-light.png',

    search: {
      provider: 'local'
    },

    editLink: {
      pattern: 'https://github.com/JinYue127/radash-study/tree/master/src/:path',
      text: '在 Github 上编辑此页面'
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Functions', link: '/array/' }
    ],

    sidebar: [
      {
        text: 'Array',
        collapsed: true,
        items: set_sidebar('/array')
      },
      {
        text: 'Async',
        collapsed: true,
        items: set_sidebar('/async')
      },
      {
        text: 'Curry',
        collapsed: true,
        items: set_sidebar('/curry')
      },
      {
        text: 'Number',
        collapsed: true,
        items: set_sidebar('/number')
      },
      {
        text: 'Object',
        collapsed: true,
        items: set_sidebar('/object')
      },
      {
        text: 'Random',
        collapsed: true,
        items: set_sidebar('/random')
      },
      {
        text: 'String',
        collapsed: true,
        items: set_sidebar('/string')
      },
      {
        text: 'Typed',
        collapsed: true,
        items: set_sidebar('/typed')
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/JinYue127/radash-study' }
    ]
  }
})
