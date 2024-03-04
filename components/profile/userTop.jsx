import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, MapPin } from "lucide-react";
import { User } from "iconsax-react";
import { getUserByEmail } from "your-api"; // Import your getUserByEmail function here
const userEmail = "example@example.com";

export function UserTop() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserByEmail(userEmail);
        setUserData(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      {userData && (
        <div className="flex flex-row gap-4 py-6">
          <Avatar className="rounded-2xl h-20 w-20">
            <AvatarImage src={userData.avatarUrl} alt={userData.username} />
            <AvatarFallback>
              <User className="opacity-60" size="42" variant="Bold" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-xl">
              {userData.username}, {userData.age}
            </h1>
            <p className="text-sm opacity-70">{userData.role}</p>
            <div className="flex gap-2 items-center opacity-70">
              <MapPin size={12} strokeWidth={2} />
              <h2 className="text-sm">{userData.location}</h2>
            </div>
          </div>
        </div>
      )}
      {userData && (
        <div className="flex flex-col gap-1">
          <p className="text-sm pb-4">{userData.bio}</p>
        </div>
      )}
      <div className="flex gap-2 items-center">
        {/* Add additional components here if needed */}
      </div>
    </div>
  );
}
