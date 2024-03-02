const { MongoClient } = require('mongodb');

const DEFAULT_DB_NAME = "finalProject";
const URL = process.env.MONGO_URL ?? "mongodb+srv://devleandrosmacedo:mAIswYuvbB4sg9Rm@cluster0.pyxlwva.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const PORT = process.env.PORT || 3000

let client

async function connectToMongo() {
  try {
    if (!client) {
      client = await MongoClient.connect(URL)
    }
    return client;
  } catch (err) {
    console.log(err)
  }
}

async function connectToCollection(collectionName, dbName = DEFAULT_DB_NAME) {
    const client = await connectToMongo();
    const db = client.db(dbName);
    return db.collection(collectionName);
}

module.exports = { connectToCollection };