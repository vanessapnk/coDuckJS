import { connectToCollection } from "@/src/data/mongodb";

export async function createEvent(name, creatorId, description, category, stacks, stackLevel, languagesSpoken, modality, city, usersLimit, exactLocation, dateString, endDateString) {
    try {
        const collection = await connectToCollection("eventData");

        
       
        function parseDateString(dateString) {
            const [day, month, year, hours, minutes] = dateString.split(',');
            return new Date(`${year}-${month}-${day}T${hours}:${minutes}`);
        }
                                                        // NO JSON BODY
        const date = parseDateString(dateString);       // "date": "day,month,year,hour,minutes",
        const endDate = parseDateString(endDateString); // endDate": "day,month,year,hour,minutes",

        await collection.insertOne({
            name,
            creator: creatorId,
            description: description || "",
            category: category || "",
            stacks: stacks || [],
            stackLevel: stackLevel || "",
            languagesSpoken: languagesSpoken || [],
            modality: modality || "",
            city: city || undefined,
            usersLimit: usersLimit || undefined,
            participants: [creatorId],
            exactLocation: exactLocation || undefined,
            date: date || undefined,
            endDate: endDate || undefined
        });
        return { success: true };
    } catch (error) {
        console.error('Error creating event:', error);
        throw new Error('Failed to create event');
    }
}