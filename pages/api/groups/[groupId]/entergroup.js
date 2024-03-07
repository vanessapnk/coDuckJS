import { connectToCollection } from "@/src/data/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    const { groupId } = req.query;

    if (req.method === 'PATCH') {
        try {
            const { userId } = req.body;
            const collection = await connectToCollection("groupData");

            // Update the group with the userId
            await collection.updateOne(
                { _id: new ObjectId(groupId) },
                { $push: { members: userId } } // Add the userId to the members array
            );

            res.json({ success: true });
        } catch (error) {
            console.error('Error entering group:', error);
            res.status(500).json({ success: false, error: 'Failed to enter group' });
        }
    }
}
