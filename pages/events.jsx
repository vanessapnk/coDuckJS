import { Navbar } from "@/components/custom/navbar";
export default function Events() {
    return (
        <>
            <div>
                <h1>Events</h1>
            </div>

            <Navbar homeActive={false} groupsActive={false} eventsActive={true} />
        </>
    )
}