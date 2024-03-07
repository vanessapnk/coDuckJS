import { connectToCollection } from "@/src/data/mongodb";
import { getGroupById } from "@/src/data/groups";
import { getUserById } from "../data/users";

export async function createGroup(name, creatorId, description, category, stacks, stackLevel, languagesSpoken, modality, city, usersLimit) {
    try {
        const collection = await connectToCollection("groupData");
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
            members: [creatorId] // Always start with the creator
        });
        return { success: true };
    } catch (error) {
        console.error('Error creating group:', error);
        throw new Error('Failed to create group');
    }
}
export async function loadGroupWithMembersById(groupId) {
    const group = await getGroupById(groupId)
    if (!group) return
    const members = await loadGroupMembers(group.members)
    return { ...group, members: members }

}
export async function loadGroupMembers(mids) {
    const members = await Promise.all(mids.map(async (id) => {
        console.log(`Searching for user ${id}`)
        return await getUserById(id)
    }))

    console.log(mids)
    console.log(members)

    return members
}
