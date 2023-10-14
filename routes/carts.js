const express = require('express');
const router = express.Router();

const Cart = require('../schemas/cart.js');
const Goods = require('../schemas/goods.js');
const authMiddleware = require('../middlewares/auth-middleware');
// const cart = require('../schemas/cart');

// 장바구니 조회 API
// router.get('/goods/cart', authMiddleware, async (req, res) => {
//   const { userId } = res.locals.user;
//   const carts = await Cart.find({ userId });
//   // [{goodsId, quantity}]
//   const goodsIds = carts.map((cart) => {
//     return cart.goodsId;
//   });
//   const goods = await Goods.find({ goodsId: goodsIds });
//   const results = carts.map((cart) => {
//     return {
//       quantity: cart.quantity,
//       goods: goods.find((item) => item.goodsId === cart.goodsId),
//     };
//   });
//   res.json({
//     carts: results,
//   });
// });

//POST, cart 추가
// router.post('/goods/:goodsId/cart', async (req, res) => {
//   const { goodsId } = req.params;
//   const { quantity } = req.body;

//   const existsCarts = await Cart.find({ goodsId });
//   if (existsCarts.length) {
//     return res.status(400).json({
//       success: false,
//       errorMessage: '이미 장바구니에 해당하는 상품이 존재합니다.',
//     });
//   }
//   await Cart.create({ goodsId, quantity });
//   res.json({ result: 'success' });
// });

//PUT, cart 수정
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

//DELETE, cart 제거
router.delete('/goods/:goodsId/cart', async (req, res) => {
  const { goodsId } = req.params;
  const existsCarts = await Cart.find({ goodsId });
  if (existsCarts.length) {
    await Cart.deleteOne({ goodsId });
  }
  res.json({ result: 'success' });
});

module.exports = router;
