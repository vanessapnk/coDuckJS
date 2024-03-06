import { connectToCollection } from "@/src/data/mongodb";
import { ObjectId } from "mongodb";


export default async function handler(req, res) {
    const { id } = req.query;
    
    if (req.method === 'PATCH') {
        try {
//    name, githubUsername, age, about, city, job, stacks, hobbies, languagesSpoken } = newUser;

            const { name, githubUsername, age, about, city, job, stacks, hobbies, languagesSpoken } = req.body;
            const collection = await connectToCollection("userData");
                                
            // Prepare update object with only provided fields
            const updateObject = {};
            if (name !== undefined) updateObject.name = name;
            if (githubUsername !== undefined) updateObject.githubUsername = githubUsername;
            if (age !== undefined) updateObject.age = age;
            if (about !== undefined) updateObject.about = about;
            if (city !== undefined) updateObject.city = city;
            if (job !== undefined) updateObject.job = job;

            await collection.updateOne(
                { _id: new ObjectId(id) },
                { $set: updateObject }
            );

            res.json({ success: true });
        } catch (error) {
            console.error('Error editing group information:', error);
            res.status(500).json({ success: false, error: 'Failed to edit user information' });
        }
    }
}