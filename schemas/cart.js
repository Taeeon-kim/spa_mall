const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: {
    type: String, // ObjectId 이기 떄문에 문자열
    required: true, // 장바구니는 특정한 사용자만 사용할 수 있다.
  },
  goodsId: {
    type: Number,
    required: true,
    unique: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Cart', cartSchema);
