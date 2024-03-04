import { getGroupById } from "@/src/data/groups";
import { connectToCollection } from "@/src/data/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    const { groupId } = req.query;

    if (req.method === 'PATCH') {
        try {
            const { member } = req.body;
            const collection = await connectToCollection("groupData");
            const group = await getGroupById(groupId);

            // Check if the member already exists in the group
            const isMember = group.members.includes(member);

            // If the member exists, remove it; otherwise, add it if the group size allows
            let updatedMembers;
            if (isMember) {
                updatedMembers = group.members.filter(existingMember => existingMember !== member);
            } else {
                if (group.members.length < group.usersLimit) {
                    updatedMembers = [...group.members, member];
                } else {
                    return res.status(400).json({ success: false, error: 'Group maximum size exceeded' });
                }
            }

            // Update the group's members in the database
            await collection.updateOne(
                { _id: new ObjectId(groupId) },
                { $set: { members: updatedMembers } }
            );
                
            res.json({ success: true });
        } catch (error) {
            console.error('Error updating members:', error);
            res.status(500).json({ success: false, error: 'Failed to update members' });
        }
    }
}