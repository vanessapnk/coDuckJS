import { loginHandler } from "@/src/services/users";



export default async function handler(req, res) {
    if (req.method === 'POST') {
        await loginHandler(req, res);
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}