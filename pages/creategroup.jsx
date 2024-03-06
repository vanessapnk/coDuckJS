import React, { useState } from "react";
import { useRouter } from "next/router";

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
    "HTML & CSS",
    "CSS",
    "JavaScript",
    "Tailwind",
    "React",
    "NextJs",
    "MongoDB",
    "UI/UX Design",
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

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Create Group</h1>
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
            <option value="">Select Category</option>
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
            <option value="">Select Modality</option>
            <option value="presential">Presential</option>
            <option value="hybrid">Hybrid</option>
            <option value="online">Online</option>
          </select>
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-semibold">City</label>
          <input
            type="text"
            name="city"
            value={groupData.city}
            onChange={handleChange}
            className="border rounded p-2"
          />
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
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
