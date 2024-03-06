import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { NavInternal } from "@/components/custom/navInternal";
import { UserBody } from "@/components/profile/userBody";
import { UserTop } from "@/components/profile/userTop";
import { Navbar } from "@/components/custom/navbar";
import { useAuth } from "../context/authContext";


export default function Profile() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true)

    const { id } = router.query
    // console.log(id)
    const { authenticatedUser } = useAuth();
    console.log("authenticatedUser: " + authenticatedUser)

    const [userData, setUserData] = useState(null);
    console.log("userData: " + userData)

    const fetchUserData = async () => {
        try {
            const response = await fetch(`/api/users/${id}`);
            if (response.ok) {
                const data = await response.json();
                setUserData(data);
                console.log("data" + data.Name)
            } else {
                console.error("Error fetching user data:", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        if (id !== undefined) {
            fetchUserData();
        }
    }, [id]);

    return (
        <div className="px-4 flex flex-col gap-2">
            <NavInternal backLink={"/"} editLink={"/"} />
            {userData && (
                <UserTop
                    userId={userData.id}
                    github={userData.githubUsername}
                    location={userData.city}
                    name={userData.name}
                    age={userData.age}
                    job={userData.job}
                    about={userData.about}
                />
            )}
            {/* {isLoading ? `${userData.id}` : "Loading"} */}
            {/* <UserBody /> */}
            <Navbar profileActive={true} />
        </div>
    );
}