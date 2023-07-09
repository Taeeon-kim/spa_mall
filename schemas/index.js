const mongoose = require("mongoose");

const connect = async () => {
  try{
    await mongoose.connect("mongodb://127.0.0.1:27017/spa_mall")
    console.log("Connected to MongoDB")
}
catch(err){
  (err => console.log(err));
}
};

mongoose.connection.on("error", err => {
  console.error("몽고디비 연결 에러", err);
});

module.exports = connect;