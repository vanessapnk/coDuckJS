const { ObjectId } = require("mongodb");
const { connectToCollection } = require("./mongodb");

const collectionName = "userData";

async function getUsers() {
    const collection = await connectToCollection(collectionName)
    const result = await collection.find().toArray()
    return result
}

async function getUserByEmail(email) {
    const collection = await connectToCollection(collectionName);
    const result = await collection.findOne({ email: { $eq: email } });
    return result;
}

async function getUserById(id) {
    const collection = await connectToCollection(collectionName);
    const result = await collection.findOne({ "_id.$oid": id });
    return result;
}

module.exports = { getUserByEmail, getUserById, getUsers };
