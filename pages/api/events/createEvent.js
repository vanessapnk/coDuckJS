import { connectToCollection } from "@/src/data/mongodb";
import { getEventsByName } from "@/src/data/groups";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const eventData = req.body;

        try {
            const collection = await connectToCollection('eventData'); // Assuming 'events' is the name of your MongoDB collection
            const result = await collection.insertOne(eventData);

            res.status(201).json({ message: 'Event created successfully', event: result.ops[0] });
        } catch (error) {
            console.error('Error creating event:', error);
            res.status(500).json({ message: 'Failed to create event' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
