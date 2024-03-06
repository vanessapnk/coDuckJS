import { getUsers } from "@/src/data/users";

export default async function handler(req, res) {
    try {
        const users = await getUsers();
        res.status(200).json(users);
    }
    catch (error) {
        console.error('Error fetching users:', error)
        return res.status(500).json({ message: 'Internal server error' })
    }
}