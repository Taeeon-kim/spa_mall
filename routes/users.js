const express = require('express');
const router = express.Router();
const User = require('../schemas/user');
const authMiddleware = require('../middlewares/auth-middleware');
// 내 정보 조회 API
router.get('/users/me', authMiddleware, async (req, res) => {
  const { email, nickname } = res.locals.user;
  res.status(200).json({
    user: {
      email,
      nickname,
    },
  });
});

// 회원가입 API
router.post('/users', async (req, res) => {
  const { email, nickname, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    // NOTE: 패스워드와 패스워드 확인 성공
    res.status(400).json({
      errorMessage: '패스워드와 전달된 패스워드가 일치하지 않슷ㅂ니다',
    });
    return;
  }
  const isExistUser = await userSchema.findOne({
    // NOTE: email, nickname 이 실제 DB에 존재하는지 확인
    $or: [{ email }, { nickname }],
  });
  if (isExistUser) {
    res.status(400).json({
      errorMessage: '이메일 또는 닉네임이 이미 사용 중입니다.',
    });
    return;
  }

  const user = new User({ email, nickname, password });
  await user.save(); // DB에 저장

  return res.status(201).json({});
});

module.exports = router;
