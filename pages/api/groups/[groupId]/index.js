import { loadGroupWithMembersById } from "@/src/services/groups";

//NÃO ESTOU A CONSEGUIR USAR http://localhost:3000/api/users?id=ETC, SÓ http://localhost:3000/api/users/ETC
export default async function handler(req, res) {
  const { query: { groupId } } = req;

  try {
    const group = await loadGroupWithMembersById(groupId);
    console.log(group)

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    return res.status(200).json(group);
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}