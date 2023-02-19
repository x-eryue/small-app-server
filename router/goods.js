/**
 * 1. 获取商品列表
 * 2. 获取商品详情
 * 3. 获取商品详情页轮播图
 *
 * */
const express = require("express");
const router = express.Router();
const { readFile } = require("../utils/utils_file");
// 3.获取商品详情页轮播图
router.get("/getgoodslunbo/:id", async (req, res) => {
  const gid = Number.parseInt(req.params.id);
  let meta;
  let message;
  try {
    const ret = await readFile("data/goods/goodsLunbo.json");
    let lbt = ret.filter((item) => item.id === gid)[0].lbt;
    message = lbt;
    meta = {
      status: 200,
      msg: "获取商品轮播图成功",
    };
  } catch (e) {
    meta = {
      status: 500,
      msg: "获取轮播图失败",
    };
  }
  res.json({
    meta,
    message,
  });
});

// 2. 获取商品详情
router.get("/getinfo/:id", async (req, res) => {
  const gid = Number.parseInt(req.params.id);
  let meta;
  let message;
  try {
    const ret = await readFile("data/goods/goodsList.json");
    let checkData = ret.filter((item) => item.id === gid)[0];
    meta = {
      status: 200,
      msg: "获取商品详情成功",
    };
    message = {
      id,
      title,
      add_time,
      goods_no,
      stock_quantity,
      market_price,
      sell_price,
      img_url,
    } = checkData;
  } catch (e) {
    meta = {
      status: 500,
      msg: "获取商品详情失败",
    };
  }
  res.json({
    meta,
    message,
  });
});
// 1.获取商品列表
router.get("/getlist", async (req, res) => {
  const pageindex = req.query.pageindex;
  let message;
  let meta;
  try {
    message = await readFile("data/goods/goodsList.json");
    meta = {
      status: 200,
      msg: "获取商品列表成功",
    };
  } catch (e) {
    meta = {
      status: 500,
      msg: "获取商品列表失败",
    };
  }
  res.json({
    meta,
    message,
  });
});
module.exports = router;
