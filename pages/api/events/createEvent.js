import { createEvent } from "@/src/services/events";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { name, creator, description, category, stacks, stackLevel, languagesSpoken, modality, city, usersLimit, exactLocation, date, endDate, photo_url } = req.body;

    // Use the provided user ID if it's provided, or null otherwise
    const creatorId = /* userId || */ creator;

    try {
        const startDateObj = new Date(date);
        const endDateObj = new Date(endDate);

        await createEvent(name, creatorId, description, category, stacks, stackLevel, languagesSpoken, modality, city, usersLimit, exactLocation, startDateObj, endDateObj);
        return res.status(201).json({ message: 'Event created successfully' });
    } catch (error) {
        console.error('Error creating group:', error);
        return res.status(500).json({ error: 'Failed to create event' });
    }
}
