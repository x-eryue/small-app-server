const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const port = 3000;
// 跨域
app.use(cors());

// 开放静态资源
app.use("/images", express.static(path.resolve("static/images/")));

// 处理post请求
// 1.来解析表单中的 url-encoded 格式的数据 解析 URL-encoded 格式的请求体数据 键值对
app.use(express.urlencoded({ extended: false }));
// 2.解析表单中的 JSON 格式的数据 解析 JSON 格式的请求体数据 {json}
app.use(express.json());

app.get("/", (request, response) => {
  response.send("ok");
});
// 用户路由
const usersRouter = require("./router/users.js");
app.use("/api/users", usersRouter);
// 图片路由
const picsRouter = require("./router/pics.js");
app.use("/api/pics", picsRouter);
// 商品路由
const goodsRouter = require("./router/goods.js");
app.use("/api/goods", goodsRouter);
// 新闻路由
const newsRouter = require("./router/news.js");
app.use("/api/news", newsRouter);
// 评论路由
const cmtRouter = require("./router/comments.js");
app.use("/api/cmts", cmtRouter);
// 统一处理无响应
// 没有路径处理就返回 404 Not Found
app.use(function (req, res, next) {
  res.send("404 Not Found");
});
app.listen(port, () => {
  console.log("server is running at: http://127.0.0.1:" + port);
});
