import { createRequire } from 'module'
import { defineConfig } from 'vitepress'
import { generateSidebarChapter } from './side_bar.js'

const require = createRequire(import.meta.url)

const chapters = generateSidebarChapter('zh_CN', new Map([
  ['introduction', '简介'],
  ['configuration', '配置'],
  ['premium', 'Premium 版本'],
  ['runtime', '运行时'],
  ['advanced-usages', '高级用法'],
]))

export default defineConfig({
  lang: 'zh-CN',

  description: '基于规则的 Go 网络隧道. ',

  themeConfig: {
    nav: nav(),

    logo: '/logo.png',

    lastUpdatedText: '最后更新于',

    sidebar: chapters,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Dreamacro/clash' },
    ],

    editLink: {
      pattern: 'https://github.com/Dreamacro/clash/edit/master/docs/:path',
      text: '在 GitHub 中编辑此页面'
    },

    docFooter: { prev: '上一篇', next: '下一篇' },

    outline: {
      level: 'deep',
      label: '页面导航',
    },

  }
})

function nav() {
  return [
    { text: '主页', link: '/zh_CN/' },
    { text: '配置', link: '/zh_CN/configuration/configuration-reference' },
    {
      text: '下载',
      items: [
        { text: 'GitHub 开源版', link: 'https://github.com/Dreamacro/clash/releases/' },
        { text: 'Premium 版本', link: 'https://github.com/Dreamacro/clash/releases/tag/premium' },
      ]
    }
  ]
}
