import React, { useState, useEffect } from 'react';
import { FilterSearch } from 'iconsax-react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from '../ui/button';

const categoryList = [
    "Frontend",
    "Backend",
    "Design",
    "Data Analysis"
];

const stacksList = [
    "HTML",
    "CSS",
    "JavaScript",
    "Tailwind",
    "React",
    "NextJs",
    "MongoDB",
    "Design"
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
    "French"
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

    // Effect to load saved filters from local storage
    useEffect(() => {
        const savedFilters = localStorage.getItem('selectedFilters');
        if (savedFilters) {
            setSelectedFilters(JSON.parse(savedFilters));
        }
    }, []);

    // Effect to save selected filters to local storage
    useEffect(() => {
        localStorage.setItem('selectedFilters', JSON.stringify(selectedFilters));
    }, [selectedFilters]);

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
    };

    // Function to clear filters
    const clearFilters = () => {
        setSelectedFilters({
            category: [],
            stacks: [],
            stackLevel: [],
            languagesSpoken: [],
            modality: [],
            city: []
        });
    };

    return (
        <Sheet>
            <SheetTrigger onClick={() => setIsOpen(true)}>
                <FilterSearch variant="Bold" size="18" />
            </SheetTrigger>
            {isOpen && (
                <SheetContent>
                    <SheetHeader>
                        <SheetDescription>
                            <div className="flex flex-col space-y-2">
                                <label className="text-lg font-semibold text-black pt-2">Category</label>
                                <div className="flex flex-wrap gap-2 text-xl">
                                    {/* Category section */}
                                    {categoryList.map((category) => (
                                        <div key={category} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                name="category"
                                                className="mr-1"
                                                value={category}
                                                onChange={() => handleFilterChange('category', category)}
                                                checked={selectedFilters.category.includes(category)}
                                            />
                                            <span>{category}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* Stacks section */}
                            <div className="flex flex-col space-y-2">
                                <label className="text-lg font-semibold text-black pt-2">Stacks</label>
                                <div className="flex flex-wrap gap-2 text-xl">
                                    {stacksList.map((stacks) => (
                                        <div key={stacks} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                name="stacks"
                                                className="mr-1"
                                                value={stacks}
                                                onChange={() => handleFilterChange('stacks', stacks)}
                                                checked={selectedFilters.stacks.includes(stacks)}
                                            />
                                            <span>{stacks}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* Stack Level section */}
                            <div className="flex flex-col space-y-2">
                                <label className="text-lg font-semibold text-black pt-2">Stack Level</label>
                                <div className="flex flex-wrap gap-2 text-xl">
                                    {stackLevel.map((stackLevel) => (
                                        <div key={stackLevel} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                name="stackLevel"
                                                className="mr-1"
                                                value={stackLevel}
                                                onChange={() => handleFilterChange('stackLevel', stackLevel)}
                                                checked={selectedFilters.stackLevel.includes(stackLevel)}
                                            />
                                            <span>{stackLevel}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* Languages Spoken section */}
                            <div className="flex flex-col space-y-2">
                                <label className="text-lg font-semibold text-black pt-2">Languages Spoken</label>
                                <div className="flex flex-wrap gap-2 text-xl">
                                    {languagesSpoken.map((languagesSpoken) => (
                                        <div key={languagesSpoken} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                name="languagesSpoken"
                                                className="mr-1"
                                                value={languagesSpoken}
                                                onChange={() => handleFilterChange('languagesSpoken', languagesSpoken)}
                                                checked={selectedFilters.languagesSpoken.includes(languagesSpoken)}
                                            />
                                            <span>{languagesSpoken}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* Modality section */}
                            <div className="flex flex-col space-y-2">
                                <label className="text-lg font-semibold text-black pt-2">Modality</label>
                                <div className="flex flex-wrap gap-2 text-xl">
                                    {modality.map((modality) => (
                                        <div key={modality} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                name="modality"
                                                className="mr-1"
                                                value={modality}
                                                onChange={() => handleFilterChange('modality', modality)}
                                                checked={selectedFilters.modality.includes(modality)}
                                            />
                                            <span>{modality}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* City section */}
                            <div className="flex flex-col space-y-2">
                                <label className="text-lg font-semibold text-black pt-2">City</label>
                                <div className="flex flex-wrap gap-2 text-xl">
                                    {city.map((city) => (
                                        <div key={city} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                name="city"
                                                className="mr-1"
                                                value={city}
                                                onChange={() => handleFilterChange('city', city)}
                                                checked={selectedFilters.city.includes(city)}
                                            />
                                            <span>{city}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className='flex justify-between mt-2'>
                                <Button onClick={applyFilters}>Apply Filters</Button>
                                
                                <Button className="bg-black" onClick={clearFilters}>Clear</Button>
                            </div>

                        </SheetDescription>

                    </SheetHeader>
                </SheetContent>
            )}
        </Sheet>
    );
}
