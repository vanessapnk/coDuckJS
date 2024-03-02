import { getGroups } from "@/src/data/groups";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        await getGroups(req, res);
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}