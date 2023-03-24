const fs = require('fs');
const path = require('path');


/**
 * 创建一个侧边栏,支持多层级递归
 * @param {String} folderPath 目录路径
 * @param {String} basPath 目录路径
 * @param {Array} unDirIncludes 需要排除的某些目录(文件夹)
 * @param {Array} fileExtensions 需要处理的文件后缀
 */
const generateChildren = (folderPath, unDirIncludes, fileExtensions, basPath) => {
    const children = [];
    const files = fs.readdirSync(folderPath);
    files.sort((file1, file2) => {
        const ext1 = path.extname(file1);
        const ext2 = path.extname(file2);
        if (ext1 < ext2) {
            return -1;
        }
        if (ext1 > ext2) {
            return 1;
        }
        return 0;
    }).forEach(file => {
        const filePath = path.join(folderPath, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) { // 如果是文件夹
            if (!unDirIncludes.includes(file) && fs.existsSync(path.join(filePath, 'README.md'))) { // 如果文件夹中有README.md文件
                const child = { // 生成子节点
                    "title": extractContent(filePath + "\\README.md"), // 从README.md文件中提取标题
                    "collapsable": true, // 可折叠
                    "sidebarDepth": 2, // 侧边栏深度为2
                    "children": generateChildren(filePath, unDirIncludes, fileExtensions, basPath), // 递归生成子节点
                    "aaa": "/" + path.basename(path.dirname(filePath)) + filePath.replace(folderPath, "") + "/"
                };
                children.push(child); // 将子节点添加到children数组中
            }
        } else if (fileExtensions.includes(path.extname(file))) { // 如果是指定的文件类型
            if (!file.includes("README.md")) { // 如果不是README.md文件
                let replace = filePath.replace(basPath, '').split('\\').slice(2).join("/");
                replace = replace.includes("/") ? ('./' + replace) : replace;
                children.push(replace);
            } // 将文件名添加到children数组中
        }
    });
    return children; // 返回children数组
};
/**
 * 创建一个侧边栏,支持多层级递归
 * @param {String} RootPath 目录路径
 * @param {Array} unDirIncludes 需要排除的某些目录(文件夹)
 * @param {Array} SuffixIncludes 需要处理的文件后缀
 * @returns {Object} 返回一个对象,如下所示
 * [{"/docs/java":{"title":"java","collapsable":true,"sidebarDepth":2,"children":[],"aaa":"/docs\\java"}}
 * {"/docs/theme-reco":{"title":"暗示哦","collapsable":true,"sidebarDepth":2,"children":[{"title":"test","collapsable":true,"sidebarDepth":2,"children":[{"title":"test1","collapsable":t
 * rue,"sidebarDepth":2,"children":[{"title":"test1","collapsable":true,"sidebarDepth":2,"children":[".test/test1/test2/plugin3.md"],"aaa":"/test1\\test2"},".test/test1/plugin2.md"],"aaa":"/test\\test1"},".test/plugin1.md"],"aaa":"/theme-reco\\test"},"api.md","plugin.md","rabbitmq.md","theme.md"],"aaa":"/docs\\theme-reco"}}]
 *
 */
const sideBarTool = {
    genSideBar: (RootPath, unDirIncludes, SuffixIncludes) => {
        const sideBar = {};
        const navItems = [];
        const data = generateChildren(RootPath, unDirIncludes, SuffixIncludes, RootPath);
        for (let datum of data) {
            const start = datum.aaa.replaceAll('\\', '/');
            deleteAaa(datum)
            sideBar[start] = [datum];
            navItems.push({
                text: datum.title,
                link: start
            })
        }
        return {
            "sideBar": sideBar,
            "navItems": navItems
        }
    }
}

function deleteAaa(obj) {
    for (var key in obj) {
        if (key === 'aaa') {
            delete obj[key];
        } else if (typeof obj[key] === 'object') {
            if (Array.isArray(obj[key])) {
                for (var i = 0; i < obj[key].length; i++) {
                    deleteAaa(obj[key][i]);
                }
            } else {
                deleteAaa(obj[key]);
            }
        }
    }
}

// 从markdown文件中提取内容
function extractContent(markdownFile) {
    const fs = require('fs');
    const content = fs.readFileSync(markdownFile, 'utf-8');
    const regex = /title:\s*(.*)/;
    const match = content.match(regex);
    if (match != null) {
        return match[1]; // 返回匹配到的标题
    }
    return ''; // 如果没有匹配到标题，则返回空字符串
}


module.exports = {sideBarTool}