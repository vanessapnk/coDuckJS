import { connectToCollection } from "@/src/data/mongodb";

export async function createChatMessage(senderId, groupId, content) {
    try {
        const collection = await connectToCollection("chatData");
        await collection.insertOne({
            senderId,
            group_id: groupId,
            timestamp: new Date(), // Assuming current timestamp
            content
        });
        return { success: true };
    } catch (error) {
        console.error('Error creating chat message:', error);
        throw new Error('Failed to create chat message');
    }
}
