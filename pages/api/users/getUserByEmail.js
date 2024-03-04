import { getUserByEmail } from "@/src/data/users";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { email } = req.query;
        try {
            const user = await getUserByEmail(email);
            if (user) {
                res.status(200).json({ user });
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (error) {
            console.error("Error fetching user:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    } else {
        res.status(405).json({ message: "Method Not Allowed" });
    }
}
