// pages/profile/[id].jsx

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { NavInternal } from "@/components/custom/navInternal";
import { UserBody } from "@/components/profile/userBody";
import { UserTop } from "@/components/profile/userTop";
import { Navbar } from "@/components/custom/navbar";
import { useAuth } from "./context/authContext";

export default function UserProfile() {
    const router = useRouter();
    const { authenticatedUser } = useAuth();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Verifique se há um usuário autenticado
                if (authenticatedUser && authenticatedUser.id) {
                    console.log(authenticatedUser)
                    const response = await fetch(`/api/users/${encodeURIComponent(authenticatedUser.id)}`, {
                        headers: {
                            'Authorization': `Bearer ${authenticatedUser.token}`
                        }
                    });

                    if (response.ok) {
                        const userData = await response.json();
                        setUserData(userData);
                    } else {
                        const errorData = await response.json();
                        console.error("Error fetching user data:", errorData.message);
                        // Trate o erro na interface do usuário conforme necessário
                    }
                } else {
                    // Se não houver um usuário autenticado, redirecione para a página de login
                    router.push("/login");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [authenticatedUser, router]);

    return (
        <div className="px-4 flex flex-col gap-2">
            <NavInternal backLink={"/"} editLink={"/"} />
            {userData && (
                <UserTop
                    github={userData.github}
                    location={userData.location}
                    name={userData.name}
                    age={userData.age}
                    job={userData.job}
                    about={userData.about}
                />
            )}


            <UserBody />
            <Navbar profileActive={true} />
        </div>
    );
}
