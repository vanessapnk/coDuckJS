const { connectToCollection } = require("./mongodb");
import { ObjectId } from 'mongodb';


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

async function getMyEvents(id){
    const collection = await connectToCollection(collectionName)
    const myGroups = await collection.find({ members: id }).toArray()
    return myGroups
}
module.exports = { getEvents, getEventsByName, getEventById, getMyEvents };