const { connectToCollection } = require("./mongodb");
import { ObjectId } from 'mongodb'; // Import ObjectId from mongodb


const collectionName = "eventData";

async function getEvents() {
    const collection = await connectToCollection(collectionName)
    const result = await collection.find().toArray()
    return result
}
async function getEventsByName(eventName) {
    const collection = await connectToCollection(collectionName);
    const result = await collection.find({ name: eventName }).toArray();
    return result;
}

async function getEventById(eventId) {
    const collection = await connectToCollection(collectionName);
    const result = await collection.findOne({ _id: new ObjectId(eventId) });
    return result;
}

module.exports = { getEvents, getEventsByName, getEventById };