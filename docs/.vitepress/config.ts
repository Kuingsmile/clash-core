import { defineConfig } from 'vitepress'
import locales from './locales'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Clash',

  base: '/clash/',

  head: [
    [
      'link',
      { rel: 'icon', type: "image/x-icon", href: '/clash/logo.png' }
    ],
  ],

  locales: locales.locales,

  lastUpdated: true,

  themeConfig: {
    search: {
      provider: 'local',
      options: {
        locales: {
          zh_CN: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换'
                }
              }
            }
          }
        },

      }
    }
  },
})
