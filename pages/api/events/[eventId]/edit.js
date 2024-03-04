import { connectToCollection } from "@/src/data/mongodb";
import { ObjectId } from "mongodb";


export default async function handler(req, res) {
    const { groupId } = req.query;

    if (req.method === 'PATCH') {
        try {
            const { name, description, category, modality, city, stackLevel } = req.body;
            const collection = await connectToCollection("groupData");

            // Prepare update object with only provided fields
            const updateObject = {};
            if (name !== undefined) updateObject.name = name;
            if (description !== undefined) updateObject.description = description;
            if (category !== undefined) updateObject.category = category;
            if (modality !== undefined) updateObject.modality = modality;
            if (city !== undefined) updateObject.city = city;
            if (stackLevel !== undefined) updateObject.stackLevel = stackLevel;

            await collection.updateOne(
                { _id: new ObjectId(groupId) },
                { $set: updateObject }
            );

            res.json({ success: true });
        } catch (error) {
            console.error('Error editing group information:', error);
            res.status(500).json({ success: false, error: 'Failed to edit group information' });
        }
    }
}