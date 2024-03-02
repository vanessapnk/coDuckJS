import { connectToCollection } from "@/src/data/mongodb";
import { getGroupByName } from "@/src/data/groups";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { name, description, stacks, city, usersLimit } = req.body;

    // Check if a group with the same name already exists
    const existingGroup = await getGroupByName(name);
    if (existingGroup) {
        return res.status(400).json({ error: 'Group name already exists' });
    }

    // Connect to MongoDB collection
    const collection = await connectToCollection("groupData");

    // Insert the new group into the collection
    try {
        await collection.insertOne({
            name,
            description,
            stacks,
            city,
            usersLimit,
            members: []
        });
        return res.status(201).json({ message: 'Group created successfully' });
    } catch (error) {
        console.error('Error creating group:', error);
        return res.status(500).json({ error: 'Failed to create group' });
    }
}   
