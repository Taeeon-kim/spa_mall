const jwt = require('jsonwebtoken');
const User = require('../schemas/user');
module.exports = async (req, res, next) => {
  const { Authorization } = req.cookies;
  const [authType, authToken] = (Authorization ?? '').split(' ');

  //authType check Bearer
  if (authType !== 'Bearer' || !authToken) {
    res.status(400).json({
      errorMessage: '로그인 후에 이용할 수 있는 기능입니다.',
    });
    return;
  }

  // authToken check 검증
  try {
    // check 1. 만료
    // check 2. 서버가 발큽토큰이 맞는지 검증
    const { userId } = jwt.verify(authToken, 'customized-secret-key');

    // CHeck 3. userId에 해당 사용자가 실제 DB존재하는지
    const user = await User.findById(userId);
    res.locals.user = user;
    next(); // 이 미들웨어 다음으로 보낸다
  } catch (error) {
    console.error(error);
    res.status(400).json({ errorMessage: '로그인 후에 이용할 수 있는 기능' });
    return;
  }
};
