// Mongo DB Test with ODM

const mongoose = require("mongoose");
const uri =
  "mongodb+srv://shubamium:Homepage123@overviewcluster.0iz4vry.mongodb.net/blogapp?retryWrites=true&w=majority";

async function run(callback) {
  await mongoose.connect(uri);
  console.log("DB Connected");
  callback && callback();
}

module.exports = { connectDB: run };
