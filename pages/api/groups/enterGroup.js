/* import { connectToCollection } from "@/src/data/mongodb";
import { getGroupByName } from "@/src/data/groups";
import { ObjectId } from 'mongodb';

export default async function enterGroup(req, res) {
    // Extracting the group name and member id from the request body
    const { groupName, memberId } = req.body;

    try {
        // Connect to the MongoDB collection
        const collection = await connectToCollection('groupData');

        // Check if the provided group name is valid
        const group = await getGroupByName(groupName);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        // Add the member id to the group's members array
        await collection.updateOne(
            { _id: ObjectId(group._id) }, // Assuming group._id is the MongoDB ObjectId
            { $addToSet: { members: ObjectId(memberId) } }
        );

        res.status(200).json({ message: 'Member added to group successfully' });
    } catch (error) {
        console.error('Error entering group:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
 */