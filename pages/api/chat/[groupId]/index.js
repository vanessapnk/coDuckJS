import { getChatsByGroupId } from "@/src/data/chat";

export default async function handler(req, res) {
    const { groupId } = req.query;

    // Check if groupId is not provided or if it's not a string
    if (!groupId || typeof groupId !== 'string') {
        return res.status(400).json({ message: 'Invalid groupId' });
    }

    try {
        // Query the database with the groupId
        const chat = await getChatsByGroupId(groupId);

        if (!chat) {
            return res.status(404).json({ message: 'Chat not found' });
        }

        return res.status(200).json(chat);
    } catch (error) {
        console.error('Error fetching chat:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
