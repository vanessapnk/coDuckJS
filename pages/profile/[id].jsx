import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { NavInternal } from "@/components/custom/navInternal";
import { UserBody } from "@/components/profile/userBody";
import { UserTop } from "@/components/profile/userTop";
import { Navbar } from "@/components/custom/navbar";
import { useAuth } from "../context/authContext";
import { useUserAuth } from "../_app";

export default function Profile() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = router.query;
  const { authenticatedUser } = useAuth();
  console.log("authenticatedUser: " + authenticatedUser);
  //   const [userData, setUserData] = useState(null);
  const { user, login } = useUserAuth((state) => state);
  const [groupsData, setGroupsData] = useState(null);
  const [eventsData, setEventsData] = useState(null);
  //   const fetchUserData = async () => {
  //     try {
  //       const userResponse = await fetch(`/api/users/${id}`);
  //       const groupResponse = await fetch(`/api/users/${id}/mygroups`);
  //       const eventResponse = await fetch(`/api/users/${id}/myevents`);

  //       if (userResponse.ok && groupResponse.ok && eventResponse.ok) {
  //         const udata = await userResponse.json();
  //         setUserData(udata);
  //         const gdata = await groupResponse.json();
  //         setGroupsData(gdata.numberOfGroups);
  //         const edata = await eventResponse.json();
  //         setEventsData(edata.numberOfEvents);
  //       } else {
  //         console.error(
  //           "Error fetching user or group data:",
  //           userResponse.statusText
  //         );
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     }
  //   };

  //   useEffect(() => {
  //     if (id !== undefined) {
  //       fetchUserData();
  //     }
  //   }, [id]);

  return (
    <div className="px-4 flex flex-col gap-2">
      <NavInternal backLink={"/"} editLink={"/"} />
      {user.userData && (
        <UserTop
          userId={user.userData.id}
          github={user.userData.githubUsername}
          location={user.userData.city}
          name={user.userData.name}
          age={user.userData.age}
          job={user.userData.job}
          about={user.userData.about}
          groups={groupsData}
          events={eventsData}
          langueges={"3"}
        />
      )}
      {user.userData && (
        <>
          {JSON.stringify(user.userData)}
          <UserBody
            stacks={user.userData.stacks}
            hobbies={user.userData.hobbies}
            languagesSpoken={user.userData.languagesSpoken}
          />
        </>
      )}

      <Navbar profileActive={true} />
    </div>
  );
}
