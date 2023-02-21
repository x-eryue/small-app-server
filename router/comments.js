/**
 * 1.提交评论
 * 2.获取评论
 * */
const express = require("express");
const router = express.Router();
const { readFile, write } = require("../utils/utils_file");
// 2.获取评论
router.get("/getcmts/:artid", async (req, res) => {
  let { artid } = req.params;
  let { pageindex } = req.query;
  [artid, pageindex] = [Number.parseInt(artid), Number.parseInt(pageindex)];
  let meta;
  let message;
  // 数据太少一页给三条
  try {
    const ret = await readFile("data/comments/cmt-news.json");
    let list = ret.filter((item) => item.news_id == artid)[0].list;
    message = list.splice((pageindex - 1) * 3, pageindex * 3);
    meta = {
      status: 200,
      msg: "获取评论列表成功",
    };
  } catch (e) {
    meta = {
      status: 500,
      msg: "获取评论列表失败",
    };
  }
  res.json({
    meta,
    message,
  });
});
// 1.提交评论
router.post("/postcmts/:artid", async (req, res) => {
  let { artid } = req.params;
  let { content, user } = req.body.data;
  artid = Number.parseInt(artid);
  let meta;
  let message;
  if (content.trim() == null || !user.user_id) return;
  try {
    const cmtJson = await readFile("data/comments/cmt-news.json");
    // 先处理有没有新闻ID
    const checkData = cmtJson.filter((item) => item.news_id === artid)[0];
    let objCmt = null;
    console.log(!checkData);
    if (!checkData) {
      // 没有时
      objCmt = {
        news_id: artid,
        list: [
          {
            user_id: user.user_id,
            nick_name: user.nick_name,
            user_avatar: user.user_avatar,
            contents: content,
            add_time: new Date().toISOString(),
          },
        ],
      };
      cmtJson.unshift(objCmt);
    } else {
      objCmt = {
        user_id: user.user_id,
        nick_name: user.nick_name,
        user_avatar: user.user_avatar,
        contents: content,
        add_time: new Date().toISOString(),
      };
      checkData.list.unshift(objCmt);
    }
    // 写入
    write("data/comments/cmt-news.json", cmtJson);

    meta = {
      status: 200,
      msg: "提交评论成功",
    };
    message = {
      user_id: user.user_id,
      nick_name: user.nick_name,
      user_avatar: user.user_avatar,
      contents: content,
      add_time: new Date().toISOString(),
    };
  } catch (e) {
    meta = {
      status: 500,
      msg: "评论失败",
    };
  }
  res.json({
    meta,
    message,
  });
});
module.exports = router;
