const express = require('express');
const app = express();
const port = 3000;
const goodsRouter = require('./routes/goods');
const cartsRouter = require('./routes/carts');
const connect = require("./schemas");
connect();

app.use(express.json()); // post, put 전달된 BODY 데이터를 req.body로 사용할 수 있도록 만든 bodyparser



app.use("/api", (req, res, next) => {
  console.log('네번째 미들웨어');
  next();
},
(req, res, next) => {
  console.log('다번째 미들웨어');
  next();
},[goodsRouter, cartsRouter]); // API가 사용되기 위한 라우터를 등록

// app.get('/', (req, res) => {
//   console.log(req.body)
//   res.status(400).json({test: 'aaaaa'});
// });

app.post('/', (req, res) => {
  // console.log(req.body)
  res.json(req.body);
});

app.get('/', (req, res) => {
  console.log(req.params, req.body)
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});