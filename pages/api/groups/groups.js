import { getGroups } from "@/src/data/groups";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const users = await getGroups();

            res.status(200).json(users);
        } catch (error) {
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}