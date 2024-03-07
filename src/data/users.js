// users.js

const { ObjectId } = require("mongodb");
const { connectToCollection } = require("./mongodb");

const collectionName = "userData";

async function getUsers() {
    const collection = await connectToCollection(collectionName);
    const result = await collection.find().toArray();
    return result;
}

async function getUserByEmail(email) {
    if (!email) {
        throw new Error("Email is required");
    }

    const collection = await connectToCollection(collectionName);

    try {
        const result = await collection.findOne({ email: { $eq: email } });
        return result;
    } catch (error) {
        console.error("Error fetching user by email:", error);
        throw new Error("Failed to fetch user by email");
    }
}

async function getUserById(id) {
    const collection = await connectToCollection(collectionName);
    const result = await collection.findOne({ _id: new ObjectId(id) });
    return result;
}

async function getUsersNamesByIds(ids) {
    const collection = await connectToCollection(collectionName);
    const objectIds = ids.map(id => new ObjectId(id));
    const result = await collection.find({ _id: { $in: objectIds } }).project({ name: 1 }).toArray();
    return result.map(user => user.name);
}


module.exports = { getUserByEmail, getUserById, getUsers, getUsersNamesByIds };
