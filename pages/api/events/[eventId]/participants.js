import { getEventById } from "@/src/data/events";
import { connectToCollection } from "@/src/data/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    const { eventId } = req.query;

    if (req.method === 'PATCH') {
        try {
            const { participant } = req.body;
            const collection = await connectToCollection("eventData");
            const event = await getEventById(eventId);

            // Check if the participant already exists in the event
            const isParticipant = event.participants.includes(participant);

            // If the participant exists, remove it; otherwise, add it if the event size allows
            let updatedParticipants;
            if (isParticipant) {
                updatedParticipants = event.participants.filter(existingParticipant => existingParticipant !== participant);
            } else {
                if (event.participants.length < event.usersLimit) {
                    updatedParticipants = [...event.participants, participant];
                } else {
                    return res.status(400).json({ success: false, error: 'Event maximum size exceeded' });
                }
            }

            // Update the group's participants in the database
            await collection.updateOne(
                { _id: new ObjectId(eventId) },
                { $set: { participants: updatedParticipants } }
            );

            res.json({ success: true });
        } catch (error) {
            console.error('Error updating participants:', error);
            res.status(500).json({ success: false, error: 'Failed to update participants' });
        }
    }
}