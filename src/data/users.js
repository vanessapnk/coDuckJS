const { connectToCollection } = require("./mongodb");

const collectionName = "userData";

async function getUsers() {
    const collection = await connectToCollection(collectionName)
    const result = await collection.find().toArray()
    return result
}

async function getUserByEmail(email) {
    const collection = await connectToCollection(collectionName);
    const result = await collection.findOne({ email: {$eq: email} });
    return result;
}

async function getUserById(userId) {
    const collection = await connectToCollection(collectionName);
    const user = await collection.findOne({ _id: {$eq: userId} });
    return user;
}

module.exports = { getUserByEmail, getUserById, getUsers };