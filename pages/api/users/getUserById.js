import { getUserById } from "@/src/data/users";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const userId = req.body.userId;

            if (!userId) {
                return res.status(400).json({ message: 'User ID is required' });
            }

            const user = await getUserById(userId);

            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            console.error("Error fetching user:", error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
