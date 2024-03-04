import { createNewUser } from "@/src/services/users";

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const newUser = req.body;
            const createdUser = await createNewUser(newUser);
            res.status(201).json({
                "message": "User created successfully!",
                "_id": createdUser._id
            });
        } catch (err) {
            console.error(err);
            let message = "Internal Server Error";
            let statusCode = 500;

            if (err.message === "Passwords don't match") {
                message = "Passwords don't match";
                statusCode = 400; // Bad Request
            } else if (err.message === "The entered email is already registered.") {
                message = "The entered email is already registered.";
                statusCode = 409; // Conflict
            }

            res.status(statusCode).json({ message, error: err.message });
        }
    } else {
        res.status(405).json({ message: "Method Not Allowed" });
    }
}