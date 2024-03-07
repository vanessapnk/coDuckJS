import { loadMyGroups } from "@/src/services/groups";

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    
    const userGroups = await loadMyGroups(id);

    const numberOfGroups = userGroups.length;

    const responseMessage = `User ${id} has ${numberOfGroups} group(s).`;

    // Return the response
    return res.status(200).json({ userGroups, message: responseMessage, number: numberOfGroups });
  } catch (error) {
    console.error('Error fetching user groups:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}