import { connectToCollection } from "@/src/data/mongodb";
import { getUserById } from "../data/users";
import { getEventById } from "@/src/data/events";
import { getMyEvents } from "@/src/data/events";


export async function createEvent(name, creatorId, description, category, stacks, stackLevel, languagesSpoken, modality, city, usersLimit, exactLocation, dateString, endDateString, photo_url) {
    try {
        const collection = await connectToCollection("eventData");

        /*  function parseDateString(dateString) {
             const [day, month, year, hours, minutes] = dateString.split(',');
             return new Date(`${year}-${month}-${day}T${hours}:${minutes}`);
         }
         // NO JSON BODY
         const date = parseDateString(dateString);       // "date": "day,month,year,hour,minutes",
         const endDate = parseDateString(endDateString); // endDate": "day,month,year,hour,minutes", */

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
            date: dateString || undefined,
            endDate: endDateString || undefined,
            photo_url: photo_url || ""
        });
        return { success: true };
    } catch (error) {
        console.error('Error creating event:', error);
        throw new Error('Failed to create event');
    }
}

export async function loadMyEvents(id) {
    const myEvents = await getMyEvents(id);
    return myEvents;
}

export async function loadEventWithMembersById(eventId) {
    const event = await getEventById(eventId)
    if (!event) return
    const participants = await loadEventMembers(event.participants)
    return { ...event, participants: participants }
}

export async function loadEventMembers(mids) {
    const participants = await Promise.all(mids.map(async (id) => {
        participants.log(`Searching for user ${id}`)
        return await getUserById(id)
    }))

    console.log(mids)
    console.log("Participants Data:", participants); // Add this console log

    return participants
}

