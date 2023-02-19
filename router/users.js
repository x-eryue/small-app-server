/**
 * 这个路由要做什么？
 * 1. 用户的登录
 * 2. 用户的注册
 * 3.token的生成
 * 4.token的验证
 *
 * */
const express = require("express");
const router = express.Router();
const { readFile, write } = require("../utils/utils_file");
const { generatorToken, verifyToken } = require("../utils/utils_token");
// 4.token 验证
router.post("/verifyToken", async (req, res) => {
  const Authorization = req.body.headers.Authorization;
  const token = Authorization.split(" ")[1];
  const result = await verifyToken(token);
  if (result.status !== 200) {
    // 500
    res.json({
      meta: {
        status: 500,
        msg: result.msg,
      },
    });
  }
  const { user, msg, status, exp } = result;
  res.json({
    meta: {
      status,
      msg,
    },
    message: {
      user_id: user.user_id,
      user_name: user.user_name,
      nick_name: user.nick_name,
      user_avatar: user.user_avatar,
      exp,
    },
  });
});
// 3. 用户头像
const fs = require("fs");
const path = require("path");
const multer = require("multer");
let upload = multer({
  storage: multer.diskStorage({
    //设置文件存储位置
    destination: function (req, file, cb) {
      let date = new Date();
      let year = date.getFullYear();
      let month = (date.getMonth() + 1).toString().padStart(2, "0");
      let day = date.getDate();
      // 按年月日分别存储
      let dir = "./static/images/user_avatar" + year + month + day;
      //判断目录是否存在，没有则创建
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, {
          recursive: true,
        });
      }
      //dir就是上传文件存放的目录
      cb(null, dir);
    },
    //设置文件名称
    filename: function (req, file, cb) {
      let fileName =
        file.fieldname + "-" + Date.now() + path.extname(file.originalname);
      //fileName就是上传文件的文件名
      cb(null, fileName);
    },
  }),
});
router.post("/user_avatar", upload.single("avatar"), (req, res) => {
  const file = req.file;
  res.json({
    meta: {
      status: 200,
      msg: "上传头像成功",
    },
    message: {
      avatar_src:
        "http://127.0.0.1:3000/" +
        file.path.replace("static", "").replace(/\\/, "").replace(/\\/g, "/"),
    },
  });
});
// 2.注册
/**
 * @param {user_name,user_pwd}
 * @return {meta:{status,msg},message:{nick_name,token}}
 * */
router.post("/register", async (req, res) => {
  let { user_name, user_pwd, nick_name, user_avatar } = req.body;
  //   清除左右空格
  user_name = user_name.trim();
  user_pwd = user_pwd.trim();
  let meta;
  let message;
  try {
    // 拿到数据
    const result = await readFile("data/users/users.json");
    console.log(result);
    // 验证用户名是否重复
    const user = result.filter((item) => item.user_name === user_name);
    if (user.length == 0) {
      // 不重复 id 自增
      let idArr = [];
      for (let i = 0; i < result.length; i++) {
        idArr.push(result[i].user_id);
      }
      const user_id = Math.max.apply(null, idArr) + 1;
      result.push({
        user_id: user_id,
        user_name,
        user_pwd,
        user_avatar:
          user_avatar ||
          "http://127.0.0.1:3000/images/user_avatar/default_1.jpg",
      });
      write("data/users/users.json", result);
      const token = generatorToken({
        user_id: user.user_id,
        user_name: user.user_name,
      });
      meta = {
        status: 200,
        msg: `用户：${user_name}注册成功`,
      };
      message = {
        token,
        nick_name,
      };
    } else {
      meta = {
        status: 200,
        msg: "用户名重复",
      };
    }
  } catch (e) {
    meta = {
      status: 500,
      msg: "服务器遇到错误，无法完成请求",
    };
  }
  res.json({
    meta,
    message,
  });
});

// 1. 登录
/**
 * @param {user_name,user_pwd}
 * @return {meta:{status,msg},message:{nick_name,token}}
 * */
router.post("/login", async (req, res) => {
  let { user_name, user_pwd } = req.body;
  //   清除左右空格
  user_name = user_name.trim();
  user_pwd = user_pwd.trim();

  let meta;
  let message;
  try {
    // 拿到数据
    const result = await readFile("data/users/users.json");
    // 验证
    const user = result.filter(
      (item) => item.user_name === user_name && item.user_pwd === user_pwd
    )[0];
    if (user !== undefined) {
      // 存在 生成token
      const token = generatorToken({
        user_id: user.user_id,
        user_name: user.user_name,
      });
      meta = {
        status: 200,
        msg: `用户：${user.user_name}登录成功`,
      };
      message = {
        token,
        nick_name: user.nick_name,
      };
    } else {
      // 不存在
      meta = {
        status: 200,
        msg: "账号或密码错误",
      };
    }
  } catch (e) {
    meta = {
      status: 500,
      msg: "服务器遇到错误，无法完成请求",
    };
  }
  res.json({
    meta,
    message,
  });
});

router.post("/register", (req, res) => {});
// 导出
module.exports = router;
