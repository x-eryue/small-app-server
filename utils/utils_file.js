// 文件读取
const fs = require("fs");
const path = require("path");
// 文件读取，返回读取到的内容
function readFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(path.resolve(filePath), "utf-8", (e, d) => {
      if (e) return reject(e);
      resolve(JSON.parse(d));
    });
  });
}
// 文件写入
function write(filePath, str) {
  //设置flags为w,打开文件写入的时候，新写入的内容会覆盖文件原有的所有内容

  fs.open(path.resolve(filePath), "w", (err, fb) => {
    if (!err) {
      fs.write(fb, JSON.stringify(str), (err) => {
        if (!err) {
          console.log("写入成功");
        }
        fs.close(fb, (err) => {
          if (!err) {
            console.log("文件关闭");
          }
        });
      });
    }
  });
}

module.exports = { readFile, write };
