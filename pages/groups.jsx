import { Navbar } from "@/components/custom/navbar";
import { CardProfile } from "@/components/profile/cardProfile";

export default function Groups() {
    return (
        <>
            <div className="flex flex-col gap-4 pb-12">
                <h1 className="text-2xl font-medium">Explore Events</h1>
                <div>
                    <div className="flex flex-col gap-4">
                        <CardProfile
                            category="Event"
                            profileCheck={true}
                            profileImage="https://images.pexels.com/photos/3471028/pexels-photo-3471028.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            title="Coisinhas "
                            location="Parque de Devesa, Famalicão"
                            description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit possimus, eius dolor"
                        />

                        <CardProfile
                            category="Group"
                            profileCheck={true}
                            profileImage="https://images.pexels.com/photos/4058668/pexels-photo-4058668.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            title="coisinhas "
                            location="Parque de Devesa, Famalicão"
                            description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit possimus, eius dolor"
                        />
                    </div>

                </div>
            </div>

            <Navbar homeActive={false} groupsActive={true} eventsActive={false} />
        </>
    )
}