const express = require('express');
const app = express();
const port = 3000;
const goodsRouter = require('./routes/goods');
const cartsRouter = require('./routes/carts');
const connect = require("./schemas");
connect();

app.use(express.json());

app.use("/api", [goodsRouter, cartsRouter]);

app.get('/', (req, res) => {
  console.log(req.body)
  res.status(400).json({test: 'aaaaa'});
});

app.post('/', (req, res) => {
  console.log(req.body)
  res.json(req.body);
});

app.get('/:id', (req, res) => {
  console.log(req.params, req.body)
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});