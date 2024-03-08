import { loadMyGroups } from "@/src/services/groups";

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    
    const userGroups = await loadMyGroups(id);

    const numberOfGroups = userGroups.length;

    return res.status(200).json({ userGroups, numberOfGroups });
  } catch (error) {
    console.error('Error fetching user groups:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}