import { getUsers } from "@/src/data/users";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const users = await getUsers();

            res.status(200).json(users);
        } catch (error) {
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}