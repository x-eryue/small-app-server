/**
 * 1. 获取新闻列表
 * 2. 获取新闻详情
 * */
const express = require("express");
const router = express.Router();
const { readFile } = require("../utils/utils_file");
// 1. 获取新闻列表
router.get("/getnewslist", async (req, res) => {
  let message;
  let meta;
  try {
    message = await readFile("data/news/news.json");
    meta = {
      status: 200,
      msg: "获取新闻列表成功",
    };
  } catch (e) {
    meta = {
      status: 1,
      msg: "获取新闻列表失败",
    };
  }
  res.json({
    meta,
    message,
  });
});
router.get("/getnew/:newid", async (req, res) => {
  let { newid } = req.params;
  newid = Number.parseInt(newid);
  let jsonData = {};
  let meta;
  try {
    const ret = await readFile("data/news/news.json");
    message = {
      news_id: id,
      title,
      click,
      add_time,
      content,
    } = ret.filter((item) => item.news_id == newid)[0];
    meta = {
      status: 200,
      msg: "获取新闻详情成功",
    };
  } catch (e) {
    meta = {
      status: 500,
      msg: "获取新闻详情失败",
    };
  }
  res.json({
    meta,
    message,
  });
});
module.exports = router;
