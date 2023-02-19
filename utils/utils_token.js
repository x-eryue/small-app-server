// token

/**
 * privileges ：加密的秘钥
 * 生成token
 * 接收三个参数：
 * 第一个是载荷，用于编码后存储在 token 中的数据，也是验证 token 后可以拿到的数据；
 * 第二个是密钥，自己定义的，验证的时候也是要相同的密钥才能解码；
 * 第三个是options，可以设置 token 的过期时间。例如： { expiresIn: '2h'}、{ expiresIn: '1day' },
 * */
const jwt = require("jsonwebtoken");
const secreKey = "xmyrz-%^-yyds";
const expiresIn = 5 * 60;
function generatorToken(obj) {
  // 以用户名 id 进行token生成
  try {
    const token = jwt.sign(obj, secreKey, { expiresIn: "1day" });
    // 生成token成功返回token
    return token;
  } catch (error) {
    return false;
  }
}
/**
 * @desc token验证器
 * */
const { readFile } = require("../utils/utils_file");
async function verifyToken(token) {
  let message = {};
  try {
    const ret = jwt.verify(token, secreKey);
    try {
      // 验证成功返回 user 和 要过期的时间戳
      let userAll = await readFile("data/users/users.json");
      let user = userAll.filter((item) => item.user_id === ret.user_id)[0];
      message = {
        status: 200,
        msg: "token 验证成功",
        user,
        exp: ret.exp,
      };
    } catch (e) {
      message = {
        status: 500,
        msg: "服务器遇到错误，无法完成请求",
      };
    }
  } catch (err) {
    // console.log(err.name);
    if (err.name === "JsonWebTokenError") {
      msg = "token 错误";
    }
    if (err.name === "TokenExpiredError") {
      msg = "token 过期";
    }
    message = {
      status: 200,
      msg,
    };
  }
  return message;
}
module.exports = {
  generatorToken,
  verifyToken,
};
