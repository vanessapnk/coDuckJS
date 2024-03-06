import { connectToCollection } from "@/src/data/mongodb";
import { ObjectId } from "mongodb";


export default async function handler(req, res) {
    const { eventId } = req.query;

    if (req.method === 'PATCH') {
        try {
            const { name, description, category, stackLevel, modality, city, usersLimit, exactLocation, date, endDate } = req.body;
            const collection = await connectToCollection("eventData");

            const event = await collection.findOne({ _id: new ObjectId(eventId) });
        
            const currentParticipants = event.participants ? event.participants.length : 0

            // Prepare update object with only provided fields
            const updateObject = {};
            if (name !== undefined) updateObject.name = name;
            if (description !== undefined) updateObject.description = description;
            if (category !== undefined) updateObject.category = category;
            if (modality !== undefined) updateObject.modality = modality;
            if (city !== undefined) updateObject.city = city;
            if (stackLevel !== undefined) updateObject.stackLevel = stackLevel;
            if (exactLocation !== undefined) updateObject.exactLocation = exactLocation;
            if (date !== undefined) updateObject.date = date;
            if (endDate !== undefined) updateObject.endDate = endDate;
            if (usersLimit !== undefined && usersLimit >= currentParticipants) {
                updateObject.usersLimit = usersLimit;
            } else if (usersLimit !== undefined && usersLimit < currentParticipants) {
                return res.status(400).json({ success: false, error: 'New usersLimit is smaller than the current number of participants' });
            }

            await collection.updateOne(
                { _id: new ObjectId(eventId) },
                { $set: updateObject }
            );

            res.json({ success: true });
        } catch (error) {
            console.error('Error editing group information:', error);
            res.status(500).json({ success: false, error: 'Failed to edit group information' });
        }
    }
}