import { connectToCollection } from "@/src/data/mongodb";

export async function createGroup(name, creatorId, description, stack, stackLevel, location, usersLimit) {
    try {
        const collection = await connectToCollection("groupData");
        await collection.insertOne({
            name,
            creator: creatorId,
            description: description || "", // Optional
            stack: stack || [], // Optional
            stackLevel: stackLevel || "", // Optional
            location: location || {}, // Optional - vai ter Presencial ou online e a cidade se presencial
            usersLimit: usersLimit || undefined, // Optional
            members: [creatorId] // Always start with the creator
        });
        return { success: true };
    } catch (error) {
        console.error('Error creating group:', error);
        throw new Error('Failed to create group');
    }
}