import { connectToCollection } from "@/src/data/mongodb";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            // Extract event data from the request body
            const eventData = req.body;

            // Connect to the MongoDB collection
            const collection = await connectToCollection("eventData");

            // Insert the new event into the database
            await collection.insertOne(eventData);

            // Return a success message
            res.status(201).json({ message: "Event created successfully" });
        } catch (error) {
            // If an error occurs during database operations, return an error response
            console.error("Error:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    } else {
        // If the request method is not POST, return a 405 Method Not Allowed response
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
}
