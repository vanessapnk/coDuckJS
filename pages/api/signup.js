import { createNewUser } from "@/src/services/users";

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const newUser = req.body;
            const createdUser = await createNewUser(newUser);
            res.status(201).json({
                "message": "User created with success!",
                "_id": await createdUser._id
            });
        } catch (err) {
            console.error(err);
            let mensagem = "Invalid Data provided";
            let statusCode = 500;

            if (err.message === "Passwords don't match") {
                mensagem = "Passwords don't match";
            } else if (err.message === "The entered email is already registered.") {
                mensagem = "The entered email is already registered.";
            }

            res.status(statusCode).json({ mensagem, error: err.message });
        }
    } else {
        res.status(405).json({ message: "Method Not Allowed" });
    }
}