import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { NavInternal } from "@/components/custom/navInternal";
import { UserBody } from "@/components/profile/userBody";
import { UserTop } from "@/components/profile/userTop";
import { Navbar } from "@/components/custom/navbar";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const { userId } = { userId: "65e5dbb3505908129ea047ee" }; // Corrected userId extraction
      if (!userId) return;

      try {
        const res = await fetch(`/api/users/${userId}`); // Updated URL with userId
        if (!res.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await res.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []); // Refetch data when profileId changes

  const userBg = userData
    ? userData.backgroundImage
    : "https://github.com/shadcn.png";

  return (
    <div className="px-4 flex flex-col gap-2">
      <NavInternal backLink={"/"} editLink={"/"} />
      <UserTop user={userData} />

      <div>
        <h2>User Data:</h2>
        <pre>{JSON.stringify(userData, null, 2)}</pre>
      </div>

      <UserBody user={userData} />
      <Navbar profileActive={true} />
    </div>
  );
}
