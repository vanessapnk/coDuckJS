import { connectToCollection } from "@/src/data/mongodb";
import { getEventsByName } from "@/src/data/groups";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { name, description, stacks, date, usersLimit } = req.body;

    // Check if an event with the same name already exists
    const existingEvent = await getEventsByName(name);
    if (existingEvent) {
        return res.status(400).json({ error: 'Event name already exists' });
    }

    // Connect to MongoDB collection
    const collection = await connectToCollection("eventData");

    // Insert the new event into the collection
    try {
        await collection.insertOne({
            name,
            description,
            stacks,
            date: new Date(date),
            usersLimit,
        });
        return res.status(201).json({ message: 'Event created successfully' });
    } catch (error) {
        console.error('Error creating event:', error);
        return res.status(500).json({ error: 'Failed to create event' });
    }
}
