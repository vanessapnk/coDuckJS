import { createGroup } from "@/src/services/groups";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { name, description, stack, stackLevel, location, usersLimit, userId } = req.body;

    // Use the provided user ID if it's provided, or null otherwise
    const creatorId = userId || null;

    try {
        await createGroup(name, creatorId, description, stack, stackLevel, location, usersLimit);
        return res.status(201).json({ message: 'Group created successfully' });
    } catch (error) {
        console.error('Error creating group:', error);
        return res.status(500).json({ error: 'Failed to create group' });
    }
}