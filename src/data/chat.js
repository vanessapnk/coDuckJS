const { connectToCollection } = require("./mongodb");
import { ObjectId } from 'mongodb'; // Import ObjectId from mongodb

const collectionName = "chatData";

async function getChats() {
    const collection = await connectToCollection(collectionName)
    const result = await collection.find().toArray()
    return result
}

async function getChatsByGroupId(groupId) {
    try {
        const collection = await connectToCollection(collectionName);
        const result = await collection.find({ group_id: groupId }).toArray();
        return result;
    } catch (error) {
        console.error("Error fetching chats:", error);
        throw new Error("Failed to fetch chats. Please try again later.");
    }
}

module.exports = { getChats, getChatsByGroupId };