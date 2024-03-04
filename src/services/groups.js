import { connectToCollection } from "@/src/data/mongodb";

export async function createGroup(name, creatorId, description, category, stacks, stackLevel, location, usersLimit) {
    try {
        const collection = await connectToCollection("groupData");
        await collection.insertOne({
            name,
            creator: creatorId,
            description: description || "", // Optional
            category: category || "", // Optional
            stacks: stacks || [], // Optional
            stackLevel: stackLevel || "", // Optional
            location: location || [], // [online] ou [presencial, cidade]
            usersLimit: usersLimit || undefined, // Optional
            members: [creatorId] // Always start with the creator
        });
        return { success: true };
    } catch (error) {
        console.error('Error creating group:', error);
        throw new Error('Failed to create group');
    }
}