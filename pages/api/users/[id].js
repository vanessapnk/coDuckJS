import { getUserById } from "@/src/data/users";

//NÃO ESTOU A CONSEGUIR USAR http://localhost:3000/api/users?id=ETC, SÓ http://localhost:3000/api/users/ETC
export default async function handler(req, res) {
    const { query: { id } } = req;

  try {
    const user = await getUserById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}