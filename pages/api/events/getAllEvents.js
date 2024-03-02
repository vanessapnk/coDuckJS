import { getEvents } from "@/src/data/events";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const users = await getEvents();

            res.status(200).json(users);
        } catch (error) {
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}