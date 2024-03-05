const { connectToCollection } = require("../mongodb");

export async function filterGroupsByCity(city) {
    try {
        const collection = await connectToCollection("groupData");
        const pipeline = [
            {
                $match: {
                    city: city
                }
            }
        ];
        const groups = await collection.aggregate(pipeline).toArray();
        return groups;
    } catch (error) {
        console.error('Error filtering groups by city:', error);
        throw new Error('Failed to filter groups by city');
    }
}
    module.exports = { filterByCity };
