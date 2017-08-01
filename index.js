var path = require('path');
var fs = require("fs");


function readFileContent() {
    var data = fs.readFileSync('.eslintignore');
    return data.toString();
}

function getIgnorePaths() {
    var cnt = readFileContent();
    var row = cnt.replace(/(\/\/.*)/g, "").split("\n");
    var rsrow = [];
    var reg = /^#\.*/; //匹配以#开头的注释行
    for (var i = 0, len = row.length; i < len; i++) {
        var item = row[i];
        //(""或者"\r")空行,#开头的注释 不推入数组
        if ("" !== item && "\r" !== item && !reg.test(item)) {
            var url = item.replace(/\r/g, ""); //替换末尾的\r
            // /**结尾的路径 替换/**
            url = url.replace(/\/\*\*$/g, "");
            rsrow.push(path.resolve(__dirname, "." + url));
        }
    }

    return rsrow;
}

/**
 * webpack eslintIgnore插件 
 * @param  {[type]} opt [description]
 * @return {[type]}     [description]
 */
function EslintIgnore(opt) {
    console.log("\n EslintIgnore eslintIgnore");
    if (this instanceof EslintIgnore) {
        return this.init();
    }
    console.error("please use new eslintIgnore()");
    return [];
}

EslintIgnore.prototype.init = function() {
    return getIgnorePaths();
}
//new EslintIgnore();
module.exports = EslintIgnore;
