import { loadMyEvents } from "@/src/services/events";

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    
    const userEvents = await loadMyEvents(id);

    const numberOfEvents = userEvents.length;

    return res.status(200).json({ userEvents, numberOfEvents });
  } catch (error) {
    console.error('Error fetching user groups:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}