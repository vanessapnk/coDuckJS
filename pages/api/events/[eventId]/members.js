import { getEventById } from "@/src/data/events";
import { connectToCollection } from "@/src/data/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    const { eventId } = req.query;

    if (req.method === 'PATCH') {
        try {
            const { member } = req.body;
            const collection = await connectToCollection("eventData");
            const event = await getEventById(eventId);

            // Check if the member already exists in the group
            const isMember = event.members.includes(member);

            // If the member exists, remove it; otherwise, add it if the group size allows
            let updatedMembers;
            if (isMember) {
                updatedMembers = event.members.filter(existingMember => existingMember !== member);
            } else {
                if (event.members.length < event.usersLimit) {
                    updatedMembers = [...event.members, member];
                } else {
                    return res.status(400).json({ success: false, error: 'Group maximum size exceeded' });
                }
            }

            // Update the group's members in the database
            await collection.updateOne(
                { _id: new ObjectId(eventId) },
                { $set: { members: updatedMembers } }
            );

            res.json({ success: true });
        } catch (error) {
            console.error('Error updating members:', error);
            res.status(500).json({ success: false, error: 'Failed to update members' });
        }
    }
}