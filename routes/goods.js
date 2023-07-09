const express = require('express');
const router = express.Router();

// /routes/goods.js

// const goods = [
//     {
//       goodsId: 4,
//       name: "상품 4",
//       thumbnailUrl:
//         "https://cdn.pixabay.com/photo/2016/09/07/02/11/frogs-1650657_1280.jpg",
//       category: "drink",
//       price: 0.1,
//     },
//     {
//       goodsId: 3,
//       name: "상품 3",
//       thumbnailUrl:
//         "https://cdn.pixabay.com/photo/2016/09/07/02/12/frogs-1650658_1280.jpg",
//       category: "drink",
//       price: 2.2,
//     },
//     {
//       goodsId: 2,
//       name: "상품 2",
//       thumbnailUrl:
//         "https://cdn.pixabay.com/photo/2014/08/26/19/19/wine-428316_1280.jpg",
//       category: "drink",
//       price: 0.11,
//     },
//     {
//       goodsId: 1,
//       name: "상품 1",
//       thumbnailUrl:
//         "https://cdn.pixabay.com/photo/2016/09/07/19/54/wines-1652455_1280.jpg",
//       category: "drink",
//       price: 6.2,
//     },
//   ];

const Goods = require("../schemas/goods");


//POST, GOODs(상품) 추가(등록)
router.post('/goods', async (req, res) => {
  const { goodsId, name, thumbnailUrl, category, price } = req.body;

  const goods = await Goods.find({ goodsId });
  if (goods.length) {
    return res.status(400).json({ success: false, errorMessage: "이미 있는 데이터입니다." });
  }

  const createdGoods = await Goods.create({ goodsId, name, thumbnailUrl, category, price });
  
  res.json({ goods: createdGoods });
})


//GET, 모든 goods 정보 가져오기
router.get('/goods', async (req, res) => {
  const goods = await Goods.find({});
    res.status(200).json(goods)
})

//GET, 특정 goodsId의 goods 정보 가져오기
router.get('/goods/:goodsId', async (req, res) => {
  const { goodsId } = req.params;
  // let result = null;
  // for(const good of goods){
  //   if( Number(goodsId) === good.goodsId){
  //     result = good;
  //   }
  // }
  const goods = await Goods.find({goodsId});
  const [result] = goods.filter(good => Number(goodsId) === good.goodsId)

  res.status(200).json({ detail: result})
})

module.exports = router;


