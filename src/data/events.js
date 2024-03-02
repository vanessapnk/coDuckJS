const { connectToCollection } = require("./mongodb");

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

module.exports = { getEvents, getEventsByName };