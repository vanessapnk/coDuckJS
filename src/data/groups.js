const { connectToCollection } = require("./mongodb");

const collectionName = "groupData";

async function getGroups() {
    const collection = await connectToCollection(collectionName)
    const result = collection.find().toArray()
    return result
}

module.exports = { getGroups };