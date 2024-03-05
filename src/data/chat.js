const { connectToCollection } = require("./mongodb");
import { ObjectId } from 'mongodb'; // Import ObjectId from mongodb

const collectionName = "chatData";

async function getChats() {
    const collection = await connectToCollection(collectionName)
    const result = await collection.find().toArray()
    return result
}

async function getChatByGroupId(groupId) {
    const collection = await connectToCollection(collectionName);
    const result = await collection.findOne({ group_id: groupId });
    return result;
}

module.exports = { getChats, getChatByGroupId };