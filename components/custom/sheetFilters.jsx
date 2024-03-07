import React, { useState } from 'react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

const categoryList = [
    "Frontend",
    "Backend",
    "Design",
    "Data Analysis",
    "Other"
];

const stacksList = [
    "HTML",
    "CSS",
    "JavaScript",
    "Tailwind",
    "React",
    "NextJs",
    "MongoDB",
    "Design",
    "Other",
];

const stackLevel = ["Beginner", "Junior", "Intermediate", "Senior"];

const languagesSpoken = [
    "English",
    "Mandarin",
    "Spanish",
    "Arabic",
    "Portuguese",
    "German",
    "Russian",
    "French",
    "Other",
];

const city = [
    "Lisbon",
    "Porto",
    "Sintra",
    "Braga",
    "Aveiro",
    "Coimbra",
    "Maputo",
    "Funchal",
    "Damascus",
    "Chelas"
];

const modality = ["Online", "Flexible", "Presential"];

export default function SheetFilters({ onApplyFilters }) {
    const [selectedFilters, setSelectedFilters] = useState({
        category: [],
        stacks: [],
        stackLevel: [],
        languagesSpoken: [],
        modality: [],
        city: []
    });

    const [isOpen, setIsOpen] = useState(false); // State to manage sheet visibility

    const handleFilterChange = (filterType, filterValue) => {
        setSelectedFilters(prevState => ({
            ...prevState,
            [filterType]: prevState[filterType].includes(filterValue)
                ? prevState[filterType].filter(value => value !== filterValue)
                : [...prevState[filterType], filterValue]
        }));
    };

    const applyFilters = () => {
        onApplyFilters(selectedFilters);
        setIsOpen(false); // Close the sheet after applying filters
    }

    return (
        <Sheet>
            <SheetTrigger onClick={() => setIsOpen(true)}>icone de filtro</SheetTrigger>
            {isOpen && ( // Render the sheet content only when isOpen is true
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Filters</SheetTitle>
                        <SheetDescription>
                            <div className="flex flex-col space-y-2">
                                <label className="text-lg font-semibold">Category</label>
                                <div className="flex flex-wrap gap-2">
                                    {categoryList.map((category) => (
                                        <div key={category} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                name="category"
                                                className="mr-1"
                                                value={category}
                                                onChange={() => handleFilterChange('category', category)}
                                            />
                                            <span>{category}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col space-y-2">
                                <label className="text-lg font-semibold">Stacks</label>
                                <div className="flex flex-wrap gap-2">
                                    {stacksList.map((stacks) => (
                                        <div key={stacks} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                name="stacks"
                                                className="mr-1"
                                                value={stacks}
                                                onChange={() => handleFilterChange('stacks', stacks)}
                                            />
                                            <span>{stacks}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col space-y-2">
                                <label className="text-lg font-semibold">Stack Level</label>
                                <div className="flex flex-wrap gap-2">
                                    {stackLevel.map((stackLevel) => (
                                        <div key={stackLevel} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                name="stackLevel"
                                                className="mr-1"
                                                value={stackLevel}
                                                onChange={() => handleFilterChange('stackLevel', stackLevel)}
                                            />
                                            <span>{stackLevel}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col space-y-2">
                                <label className="text-lg font-semibold">Languages Spoken</label>
                                <div className="flex flex-wrap gap-2">
                                    {languagesSpoken.map((languagesSpoken) => (
                                        <div key={languagesSpoken} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                name="languagesSpoken"
                                                className="mr-1"
                                                value={languagesSpoken}
                                                onChange={() => handleFilterChange('languagesSpoken', languagesSpoken)}
                                            />
                                            <span>{languagesSpoken}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col space-y-2">
                                <label className="text-lg font-semibold">Modality</label>
                                <div className="flex flex-wrap gap-2">
                                    {modality.map((modality) => (
                                        <div key={modality} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                name="modality"
                                                className="mr-1"
                                                value={modality}
                                                onChange={() => handleFilterChange('modality', modality)}
                                            />
                                            <span>{modality}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col space-y-2">
                                <label className="text-lg font-semibold">City</label>
                                <div className="flex flex-wrap gap-2">
                                    {city.map((city) => (
                                        <div key={city} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                name="city"
                                                className="mr-1"
                                                value={city}
                                            />
                                            <span>{city}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <button onClick={applyFilters}>Apply Filters</button>
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            )}
        </Sheet>
    );
}
