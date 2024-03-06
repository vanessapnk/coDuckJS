import { connectToCollection } from "@/src/data/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === 'PATCH') {
        try {
            const { hobbies } = req.body;
            const collection = await connectToCollection("userData");

            await collection.updateOne(
                { _id: new ObjectId(id) },
                { $set: { hobbies } }
            );

            res.json({ success: true });
        } catch (error) {
            console.error('Error updating hobbies:', error);
            res.status(500).json({ success: false, error: 'Failed to update hobbies' });
        }
    }
}