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
    try {
        const collection = await connectToCollection(collectionName);
        const result = collection.findOne({ _id: new ObjectId(id) });
        return result;
    }
    catch (error) {
        console.error('Error fetching user by ID:', error);
        throw error;
    }
}

module.exports = { getUserByEmail, getUserById, getUsers }