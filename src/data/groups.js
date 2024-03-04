const { connectToCollection } = require("./mongodb");
import { ObjectId } from 'mongodb'; // Import ObjectId from mongodb


const collectionName = "groupData";

async function getGroups() {
    const collection = await connectToCollection(collectionName)
    const result = collection.find().toArray()
    return result
}

async function getGroupById(groupId) {
    const collection = await connectToCollection(collectionName);
    const result = await collection.findOne({ _id: new ObjectId(groupId) });
    return result;
}

async function getGroupsByCity(city) {
    const collection = await connectToCollection(collectionName);
    const result = await collection.find({ city: city }).toArray();
    return result;
}

async function getGroupsByStack(stack) {
    const collection = await connectToCollection(collectionName);
    const result = await collection.find({ stacks: stack }).toArray();
    return result;
}

async function getGroupsByStacks(stacks) {
    const collection = await connectToCollection(collectionName);
    const result = await collection.find({ stacks: { $all: stacks } }).toArray();
    return result;
}

async function getGroupByName(groupName) {
    const collection = await connectToCollection(collectionName);
    const regex = new RegExp(groupName, "i"); // "i" flag for case-insensitive
    const result = await collection.findOne({ name: { $regex: regex } });
    return result;
}


module.exports = { getGroups, getGroupById, getGroupsByCity, getGroupsByStack, getGroupsByStacks, getGroupByName };