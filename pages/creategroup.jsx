import React, { useState } from "react";
import { useRouter } from "next/router";
import { ArrowCircleLeft } from "iconsax-react";

export default function CreateGroup() {
  const [groupData, setGroupData] = useState({
    name: "",
    creator: "",
    description: "",
    category: "",
    stacks: [],
    stackLevel: "",
    languagesSpoken: [],
    modality: "",
    city: "",
    usersLimit: 0,
    members: [],
  });

  const [groupCreated, setGroupCreated] = useState(false); // State to track group creation
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGroupData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, value } = e.target;
    setGroupData((prevData) => ({
      ...prevData,
      [name]: prevData[name].includes(value)
        ? prevData[name].filter((item) => item !== value)
        : [...prevData[name], value],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/groups/createGroup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(groupData),
      });

      if (!response.ok) {
        throw new Error("Failed to create group");
      }

      setGroupCreated(true);
    } catch (error) {
      console.error("Error creating group:", error);
    }
  };

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
  const languageList = [
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

  const cities = [
    "Lisbon",
    "Porto",
    "Sintra",
    "Braga",
    "Aveiro",
    "Coimbra",
    "Maputo",
    "Funchal",
    "Damascus",
    "Chelas",
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Create Group 🐤</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-semibold">Group Name</label>
          <input
            type="text"
            name="name"
            value={groupData.name}
            onChange={handleChange}
            className="border rounded p-2"
          />
        </div>
        {/*   <div className="flex flex-col space-y-2">
          <label className="text-sm font-semibold">Creator</label>
          <input
            type="text"
            name="creator"
            value={groupData.creator}
            onChange={handleChange}
            className="border rounded p-2"
          />
        </div> */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-semibold">Description</label>
          <input
            type="text"
            name="description"
            value={groupData.description}
            onChange={handleChange}
            className="border rounded p-2"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-semibold">Category</label>
          <select
            name="category"
            value={groupData.category}
            onChange={handleChange}
            className="border rounded p-2"
          >
            <option value="" disabled hidden>
              Select Category
            </option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Design">Design</option>
            <option value="Data Analysis">Data Analysis</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-semibold">Modality</label>
          <select
            name="modality"
            value={groupData.modality}
            onChange={handleChange}
            className="border rounded p-2"
          >
            <option value="" disabled hidden>
              Select Modality
            </option>
            <option value="presential">Presential</option>
            <option value="hybrid">Hybrid</option>
            <option value="online">Online</option>
          </select>
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-semibold">City</label>
          <select
            name="city"
            value={groupData.city}
            onChange={handleChange}
            className="border rounded p-2"
          >
            <option value="" disabled hidden>
              Select City
            </option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-semibold">Users Limit</label>
          <input
            type="number"
            name="usersLimit"
            value={groupData.usersLimit}
            onChange={handleChange}
            className="border rounded p-2"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-semibold">Stacks</label>
          <div className="grid grid-cols-3 gap-2">
            {stacksList.map((stack) => (
              <div key={stack} className="flex items-center">
                <input
                  type="checkbox"
                  name="stacks"
                  value={stack}
                  checked={groupData.stacks.includes(stack)}
                  onChange={handleCheckboxChange}
                  className="mr-1"
                />
                <span>{stack}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-semibold">Languages Spoken</label>
          <div className="grid grid-cols-3 gap-2">
            {languageList.map((language) => (
              <div key={language} className="flex items-center">
                <input
                  type="checkbox"
                  name="languagesSpoken"
                  value={language}
                  checked={groupData.languagesSpoken.includes(language)}
                  onChange={handleCheckboxChange}
                  className="mr-1"
                />
                <span>{language}</span>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300 bg-zinc-900 text-zinc-50 hover:bg-zinc-900/90 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 h-10 px-4 py-2 rounded-xl"
        >
          Create Group
        </button>
      </form>
      {groupCreated && (
        <div className="mt-4">
          <p className="text-lg font-semibold">Group created successfully!</p>
          {/* Display group data */}
        </div>
      )}
      <div className="mt-4">
        <button
          onClick={() => router.push("/groups")}
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300 border border-zinc-200 bg-white hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 h-10 px-4 py-2 rounded-xl"
        >
          <div className="flex items-center justify-center">
            <div className="mr-2">
              <ArrowCircleLeft size="28" color="#d9e3f0" />
            </div>
            <div>Go Back</div>
          </div>
        </button>
      </div>
    </div>
  );
}
