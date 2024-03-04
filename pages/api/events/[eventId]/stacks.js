import { connectToCollection } from "@/src/data/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    const { eventId } = req.query;

    if (req.method === 'PATCH') {
        try {
            const { stacks } = req.body;
            const collection = await connectToCollection("eventData");

            // Update the "stacks" field of the group directly in the database
            await collection.updateOne(
                { _id: new ObjectId(eventId) },
                { $set: { stacks } }
            );

            res.json({ success: true });
        } catch (error) {
            console.error('Error updating stacks:', error);
            res.status(500).json({ success: false, error: 'Failed to update stacks' });
        }
    }
}