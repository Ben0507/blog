module.exports = {
  base: '/blog/public/',
  "title": "Ben Blog",
  "description": "",
  "dest": "public",
  "head": [
    [
      "link",
      {
        "rel": "icon",
        "href": "/favicon.ico"
      }
    ],
    [
      "meta",
      {
        "name": "viewport",
        "content": "width=device-width,initial-scale=1,user-scalable=no"
      }
    ]
  ],
  "theme": "reco",
  "themeConfig": {
    // 密钥
    keyPage: {
      keys: ['e10adc3949ba59abbe56e057f20f883e'], // 1.3.0 版本后需要设置为密文
      color: '#42b983', // 登录页动画球的颜色
      lineColor: '#42b983' // 登录页动画线的颜色
    },
    "nav": [
      {
        "text": "主页",
        "link": "/",
        "icon": "reco-home"
      },
      {
        "text": "时间轴",
        "link": "/timeline/",
        "icon": "reco-date"
      },
      {
        "text": "文档",
        "icon": "reco-message",
        "items": [
          {
            "text": "vuepress-reco",
            "link": "/docs/theme-reco/"
          }
        ]
      }
    ],
    "sidebar": {
      "/docs/theme-reco/": [
        "",
        "theme",
        "plugin",
        "api"
      ]
    },
    "type": "blog",
    "blogConfig": {
      "category": {
        "location": 2,
        "text": "分类"
      },
      "tag": {
        "location": 3,
        "text": "标签"
      }
    },
    // "logo": "/logo.png",
    "search": true,
    "searchMaxSuggestions": 10,
    "lastUpdated": "Last Updated",
    "author": "Ben",
    "authorAvatar": "/authorAvatar.jpg",
    "startYear": "2023",
    huawei: true
  },
  // 中文
  locales: {
    "/": {
      lang: "zh-CN"
    },
  },
  //在所有页面中启用自动生成子侧边栏，原 sidebar 仍然兼容
  subSidebar: 'auto',
  "markdown": {
    "lineNumbers": true
  },
  //  解决markDown图片问题
  markdown: {
    extendMarkdown: md => {
      md.set({breaks: true})
      md.use(require("markdown-it-disable-url-encode"), "./")
    }
  }
}