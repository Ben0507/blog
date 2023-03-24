const path = require('path')
const rootPath = path.join(path.dirname(__dirname),'docs')
//导入生成侧边栏的工具类
const {sideBarTool} = require(path.join(__dirname, './utils/index.js'))
// 需要排除的一些目录
let unDirIncludes = ['node_modules','life']
// 只需要处理后缀的文件类型
let SuffixIncludes = ['.md', '.html']

// 侧边栏
let sidebar = sideBarTool.genSideBar(rootPath, unDirIncludes, SuffixIncludes)

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
        // keyPage: {
        //     keys: ['e10adc3949ba59abbe56e057f20f883e'], // 1.3.0 版本后需要设置为密文
        //     color: '#42b983', // 登录页动画球的颜色
        //     lineColor: '#42b983' // 登录页动画线的颜色
        // },
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
                "items": sidebar.navItems
            }
        ],
        "sidebar":sidebar.sideBar,
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
    //  解决markDown图片问题
    markdown: {
        "lineNumbers": true,
        extendMarkdown: md => {
            md.set({breaks: true})
            md.use(require("markdown-it-disable-url-encode"), "./")
        }
    },

    plugins: [
        [
            //鼠标点击特效 先安装在配置， npm install vuepress-plugin-cursor-effects --save
            "cursor-effects",
        ],
        [
            //动态标题 先安装在配置， npm install vuepress-plugin-dynamic-title --save
            "dynamic-title",
            {
                showIcon: "/favicon.ico",
                showText: "(/≧▽≦/)咦！又好了！",
                hideIcon: "/failure.ico",
                hideText: "(●—●)喔哟，崩溃啦！",
                recoverTime: 2000
            }
        ],
        [
            //图片放大插件 先安装在配置， npm install vuepress-plugin-dynamic-title --save
            '@vuepress/plugin-medium-zoom', {
            selector: '.page img',
            delay: 1000,
            options: {
                margin: 24,
                background: 'rgba(25,18,25,0.9)',
                scrollOffset: 40
            }
        }
        ], ['vuepress-plugin-code-copy', true]
    ]
}