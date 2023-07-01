// MongoDB Database Using the official **Mongo DB Driver**
const { MongoClient, ServerApiVersion } = require("mongodb");

const uri =
  "mongodb+srv://shubamium:Homepage123@overviewcluster.0iz4vry.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Database Pinged");
  } finally {
    await client.close();
  }
}

async function addUser(user) {
  let db = client.db("OverviewCluster");
  let userCol = db.collection("users");
  await userCol.insertOne(user);
}

// run().catch(console.dir);

module.exports = { addUser };
