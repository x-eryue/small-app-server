/**
 * 1. 获取轮播图
 * 2. 获取图片category
 * 3. 获取图片列表
 * 4. 图片详情获取
 * 5. 获取缩略图
 * */
const express = require("express");
const router = express.Router();
const { readFile } = require("../utils/utils_file");
// 5.获取缩略图
router.get("/getgoodsthum/:imgid", async (req, res) => {
  const imgid = parseInt(req.params.imgid);
  let message;
  let meta;
  try {
    let result = await readFile("data/pics/thumbnail.json");
    message = result.filter((item) => item.id == imgid)[0].thum;
    meta = {
      status: 200,
      msg: "获取商品缩略图成功",
    };
  } catch (err) {
    meta = {
      status: 500,
      msg: "获取商品缩略图失败",
    };
  }
  res.json({
    meta,
    message,
  });
});
// 4. 图片详情获取
router.get("/getimageInfo/:imgid", async (req, res) => {
  const imgid = parseInt(req.params.imgid);
  let message;
  let meta;
  try {
    let allList = [];
    let result = await readFile("data/pics/picsList.json");
    for (let i = 0; i < result.length; i++) {
      allList.push(...result[i].list);
    }
    const { id, title, click, add_time, content } = allList.filter(
      (item) => item.id == imgid
    )[0];
    meta = {
      status: 200,
      msg: "获取图片详情成功",
    };
    message = {
      id,
      title,
      click,
      add_time,
      content,
    };
  } catch (err) {
    meta = {
      status: 500,
      msg: "获取图片列表失败",
    };
  }
  res.json({
    meta,
    message,
  });
});
// 3. 获取图片列表
router.get("/getimages/:cateid", async (req, res) => {
  const cateid = req.params.cateid;
  let message = [];
  let meta;
  try {
    // 得到数据
    let result = await readFile("data/pics/picsList.json");
    // 筛选数据
    if (cateid == 0) {
      // 拿到所有类型下list下的图片
      for (let i = 0; i < result.length; i++) {
        message.push(...result[i].list);
      }
    } else {
      // 根据ID获取类型下的列表图片
      message = result.filter((item) => {
        if (item.cateId == cateid) {
          return item;
        }
      })[0].list;
    }
    meta = {
      status: 200,
      msg: "获取图片列表成功",
    };
  } catch (e) {
    meta = {
      status: 500,
      msg: "获取图片列表失败",
    };
  }
  res.json({
    meta,
    message,
  });
});
// 2. 获取图片category
router.get("/getimgcategory", async (req, res) => {
  let message;
  let meta;
  try {
    message = await readFile("data/pics/category.json");
    meta = {
      status: 200,
      msg: "获取图片分类成功",
    };
  } catch (error) {
    meta = {
      status: 500,
      msg: "获取图片分类失败",
    };
  }
  res.json({
    meta,
    message,
  });
});
// 1. 轮播图
router.get("/getlunbo", async (req, res) => {
  let message;
  let meta;
  try {
    message = await readFile("data/pics/lunbo.json");
    meta = {
      status: 200,
      msg: "获取轮播图成功",
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
module.exports = router;
