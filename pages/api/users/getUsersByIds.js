import { getUsersNamesByIds } from "@/src/data/users";

export default async function handler(req, res) {
    try {
        const userIds = req.body.userIds; // Assuming userIds is an array of user IDs
        const users = await getUsersNamesByIds(userIds);
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
