import { connectToCollection } from "@/src/data/mongodb";

export async function createEvent(name, creatorId, description, category, stacks, stackLevel, languagesSpoken, modality, city, usersLimit, exact_location, date, duration_in_days) {
    try {
        const collection = await connectToCollection("eventData");
        await collection.insertOne({
            name,
            creator: creatorId,
            description: description || "", // Optional
            category: category || "", // Optional
            stacks: stacks || [], // Optional
            stackLevel: stackLevel || "", // Optional,
            languagesSpoken: languagesSpoken || [], /// NÃO ESTA A PASSAR AS LANGAGES!!!!
            modality: modality || "", // [remote, presential or flexible]
            city: city || undefined, // so preenchido no caso de presencial ou flexible
            usersLimit: usersLimit || undefined, // Optional
            members: [creatorId], // Always start with the creator
            exact_location: exact_location || undefined, // Optional
            date: date || undefined, // Optional
            duration_in_days: duration_in_days || undefined // Optional
        });
        return { success: true };
    } catch (error) {
        console.error('Error creating group:', error);
        throw new Error('Failed to create group');
    }
}