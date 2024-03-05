import { createChatMessage } from "@/src/services/chat";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { senderId, groupId, content } = req.body;

            // Call the createChatMessage function to store the message in MongoDB
            await createChatMessage(senderId, groupId, content);

            res.status(201).json({ message: 'Message sent successfully' });
        } catch (error) {
            console.error('Error sending message:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
