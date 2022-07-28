var sidebarTxt = '* [首页](/README.md)\n';
var path = require('path');
var curPath = path.resolve('./');

console.log('当前路径', curPath);
function walkSync(currentDirPath, prefixBlank, callback) {
  var fs = require('fs'),
    path = require('path');
  console.log('测试', fs.readdirSync(currentDirPath));
  //读取目录
  fs.readdirSync(currentDirPath).forEach(function (name) {
    var filePath = path.join(currentDirPath, name);
    console.log('遍历目录', filePath);
    // 文件目录的 Stats 对象存储着关于这个文件或文件夹的一些重要信息，如创建时间、最后一次访问的时间、最后一次修改的时间、文章所占字节和判断文件类型的多个方法等等。
    var stat = fs.statSync(filePath);
    if (stat.isFile()) {
      callback(filePath, stat);
    } else if (
      stat.isDirectory() &&
      '.git' != path.basename(filePath) &&
      '_' != path.basename(filePath).substr(0, 1)
    ) {
      sidebarTxt += prefixBlank;
      if (filePath.substr(0, filePath.lastIndexOf('/')) === curPath) {
        sidebarTxt += '* 𐄒 ';
      } else {
        sidebarTxt += '* 𐄛 ';
      }
      sidebarTxt += path.basename(filePath) + '\n';

      walkSync(filePath, prefixBlank + '  ', callback);
    }
  });
}
walkSync(curPath, '', function (filePath, stat) {
  if (
    '.md' == path.extname(filePath).toLowerCase() &&
    '_' != path.basename(filePath).substr(0, 1) &&
    'README.md' != path.basename(filePath)
  ) {
    var relativeFilePath = filePath.substr(curPath.length);
    //console.log("file:"+ path.basename(filePath).slice(1));
    var itemText = relativeFilePath.substr(1, relativeFilePath.length - 4);
    while (itemText.indexOf('/') > 0) {
      console.log('----', itemText.indexOf('/'));
      itemText = itemText.substr(itemText.indexOf('/') + 1);
      sidebarTxt += '  ';
    }
    const reg = /^[0-9]+[_|-]/;
    const reg1 = /[-]+/;
    sidebarTxt +=
      '- [𐄢 ' + itemText.replace(reg, '').replace(reg1, '_') + '](' + relativeFilePath + ')\n';
  }
  //console.log("file:"+ +path.extname(filePath));
});

var path = require('path');
var fs = require('fs');
fs.copyFile(
  path.resolve('./') + '/_sidebar.md',
  path.resolve('./') + '/_sidebar.md.bak',
  function (err) {
    if (err) throw new Error('something wrong was happended');
  },
);
//console.log(path.resolve('./')+"/_sidebar.md");

console.log(sidebarTxt);
fs.writeFile(path.resolve('./') + '/_sidebar.md', sidebarTxt, function (err) {
  if (err) {
    console.error(err);
  }
});
