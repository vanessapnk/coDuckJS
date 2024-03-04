import { getEvents } from "@/src/data/events";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const events = await getEvents();

            res.status(200).json(events);
        } catch (error) {
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}