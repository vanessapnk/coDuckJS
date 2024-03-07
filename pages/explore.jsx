import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Navbar } from '@/components/custom/navbar';
import Link from "next/link";
import { CardItem } from '@/components/custom/cardItem';
import SheetFilters from '@/components/custom/sheetFilters';

export default function Explore() {
    const [selectedTab, setSelectedTab] = useState('groups');
    const [filterGroups, setFilterGroups] = useState([]);
    const [filterEvents, setFilterEvents] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [appliedFilters, setAppliedFilters] = useState({});

    const router = useRouter();

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const res = await fetch(`/api/groups/filters?search=${searchQuery}${formatFilters(appliedFilters)}`);
                const data = await res.json();
                setFilterGroups(data);
            } catch (error) {
                console.error('Error fetching groups:', error);
            }
        };

        const fetchEvents = async () => {
            try {
                const res = await fetch(`/api/events/filters?search=${searchQuery}${formatFilters(appliedFilters)}`);
                const data = await res.json();
                setFilterEvents(data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        if (selectedTab === 'groups') {
            fetchGroups();
        } else if (selectedTab === 'events') {
            fetchEvents();
        }
    }, [selectedTab, searchQuery, appliedFilters]);

    const handleTabChange = (tabValue) => {
        setSelectedTab(tabValue);
    };

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const applyFilters = () => {
        handleApplyFilters(appliedFilters)
    };

    // Helper function to format applied filters
    const formatFilters = (filters) => {
        let queryString = '';
        for (const key in filters) {
            if (filters[key].length > 0) {
                filters[key].forEach(value => {
                    queryString += `&${key}=${encodeURIComponent(value)}`;
                });
            }
        }
        return queryString;
    };

    const handleApplyFilters = (filters) => {
        setAppliedFilters(filters);
    };

    return (
        <>
            <h1>Explore</h1>
            <Tabs defaultValue="groups" className="w-[full]">
                <TabsList>
                    <TabsTrigger value="groups" className={`focus:bg-white ${selectedTab === 'groups' ? 'bg-slate-100' : ''}`} onClick={() => handleTabChange('groups')}>Groups</TabsTrigger>
                    <TabsTrigger value="events" className={`focus:bg-white ${selectedTab === 'events' ? 'bg-slate-100' : ''}`} onClick={() => handleTabChange('events')}>Events</TabsTrigger>
                </TabsList>
                <TabsContent value="groups">
                    <div>
                        <Input type="search" placeholder="Search groups here" onChange={handleSearchInputChange} />
                    </div>
                    <div>
                        <SheetFilters onApplyFilters={handleApplyFilters} />
                    </div>
                    <div className="flex flex-col gap-4">
                        {filterGroups.map((group) => (
                            <Link key={group._id} href={`/groups/${group._id}`}>
                                <CardItem
                                    members={group.members}
                                    usersLimit={group.usersLimit}
                                    category={group.category}
                                    profileCheck={true}
                                    location={group.city}
                                    modality={group.modality}
                                    profileImage={
                                        group.photo_url ||
                                        "https://images.pexels.com/photos/3471028/pexels-photo-3471028.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                    }
                                    title={group.name}
                                    description={group.description}
                                    likes={group.likes}
                                    stacks={group.stacks}
                                />
                            </Link>
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="events">
                    <div>
                        <Input type="search" placeholder="Search events here" onChange={handleSearchInputChange} />
                    </div>
                    <div>
                        <SheetFilters onApplyFilters={handleApplyFilters} />
                    </div>
                    <div className="flex flex-col gap-4">
                        {filterEvents.length > 0 &&
                            filterEvents.map((event) => (
                                <Link key={event._id} href={`/events/${event._id}`}>
                                    <CardItem
                                        members={event.members}
                                        usersLimit={event.usersLimit}
                                        category={event.category}
                                        profileCheck={true}
                                        location={event.city}
                                        modality={event.modality}
                                        profileImage={
                                            event.photo_url ||
                                            "https://images.pexels.com/photos/3471028/pexels-photo-3471028.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                        }
                                        title={event.name}
                                        description={event.description}
                                        stacks={event.stacks}
                                    />
                                </Link>
                            ))}
                    </div>
                </TabsContent>
            </Tabs>
            <Navbar homeActive={false} groupsActive={false} exploreActive={true} eventsActive={false} />
        </>
    );
}

