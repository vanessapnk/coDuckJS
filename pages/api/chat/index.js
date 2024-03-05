import { getChats } from "@/src/data/chat";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const chats = await getChats();

            res.status(200).json(chats);
        } catch (error) {
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}