import { getUsers } from "@/src/data/users";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        await getUsers(req, res);
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}