const express = require('express');
const router = express.Router();
const Goods = require('../schemas/goods');

//GET, 모든 상품목록 goods 정보 가져오기
router.get('/goods', async (req, res) => {
  const { category } = req.query;

  const goods = await Goods.find(category ? { category } : {})
    .sort('-date')
    .exec();

  const results = goods.map((item) => {
    return {
      goodsId: item.goodsId,
      name: item.name,
      price: item.price,
      thumbnailUrl: item.thumbnailUrl,
      category: item.category,
    };
  });

  res.status(200).json({ goods: results });
});

//GET, 상품상세조회 goods 정보 가져오기
router.get('/goods/:goodsId', async (req, res) => {
  const { category } = req.query;
  const { goodsId } = req.params;
  const goods = await Goods.findOne({ goodsId: goodsId }).sort('-date').exec();

  const result = {
    goodsId: goods.goodsId,
    name: goods.name,
    price: goods.price,
    thumbnailUrl: goods.thumbnailUrl,
    category: goods.category,
  };

  res.status(200).json({ goods: result });
});

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

const Cart = require('../schemas/cart');
router.post('/goods/:goodsId/cart', async (req, res) => {
  const { goodsId } = req.params;
  const { quantity } = req.body;

  const existsCarts = await Cart.find({ goodsId });
  if (existsCarts.length) {
    return res.status(400).json({
      success: false,
      errorMessage: '이미 장바구니에 해당하는 상품이 존재합니다.',
    });
  }

  await Cart.create({ goodsId, quantity });

  res.json({ result: 'success' });
});

router.put('/goods/:goodsId/cart', async (req, res) => {
  const { goodsId } = req.params;
  const { quantity } = req.body;

  const existsCarts = await Cart.find({ goodsId });
  if (existsCarts.length) {
    await Cart.updateOne(
      { goodsId: goodsId },
      { $set: { quantity: quantity } }
    );
  }
  res.status(200).json({ success: true });
});

router.delete('/goods/:goodsId/cart', async (req, res) => {
  const { goodsId } = req.params;
  const existsCarts = await Cart.find({ goodsId });

  if (existsCarts.length) {
    await Cart.deleteOne({ goodsId: goodsId });
  }

  res.json({ result: 'success' });
});

//POST, GOODs(상품) 추가(등록)
router.post('/goods', async (req, res) => {
  const { goodsId, name, thumbnailUrl, category, price } = req.body;

  const goods = await Goods.find({ goodsId });
  if (goods.length) {
    return res
      .status(400)
      .json({ success: false, errorMessage: '이미 있는 데이터입니다.' });
  }

  const createdGoods = await Goods.create({
    goodsId,
    name,
    thumbnailUrl,
    category,
    price,
  });

  res.json({ goods: createdGoods });
});

// //GET, 모든 goods 정보 가져오기
// router.get('/goods',
// (req, res, next) => {
//   console.log('/goods 미들웨어');
//   next();
// }
// ,async (req, res) => {
//   const goods = await Goods.find({});
//     res.status(200).json(goods)
// })

// //GET, 특정 goodsId의 goods 정보 가져오기
// router.get('/goods/:goodsId', async (req, res) => {
//   const { goodsId } = req.params;
//   // let result = null;
//   // for(const good of goods){
//   //   if( Number(goodsId) === good.goodsId){
//   //     result = good;
//   //   }
//   // }
//   const goods = await Goods.find({goodsId});
//   const [result] = goods.filter(good => Number(goodsId) === good.goodsId)

//   res.status(200).json({ detail: result})
// })

module.exports = router;
