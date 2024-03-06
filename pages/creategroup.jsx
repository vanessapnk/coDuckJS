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
    "TypeScript",
    "Tailwind",
    "React",
    "NextJs",
    "MongoDB",
    "UI/UX Design",
  ];
  const languageList = [
    "English",
    "Mandarin",
    "Spanish",
    "Hindi",
    "Arabic",
    "Portuguese",
    "Bengali",
    "Russian",
    "French",
  ];

  return (
    <div>
      <h1>Create Group</h1>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <label>
          Group Name:
          <input
            type="text"
            name="name"
            value={groupData.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Creator:
          <input
            type="text"
            name="creator"
            value={groupData.creator}
            onChange={handleChange}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={groupData.description}
            onChange={handleChange}
          />
        </label>
        <label>
          Category:
          <input
            type="text"
            name="category"
            value={groupData.category}
            onChange={handleChange}
          />
        </label>
        <label>
          Modality:
          <input
            type="text"
            name="modality"
            value={groupData.modality}
            onChange={handleChange}
          />
        </label>
        <label>
          City:
          <input
            type="text"
            name="city"
            value={groupData.city}
            onChange={handleChange}
          />
        </label>
        <label>
          Users Limit:
          <input
            type="number"
            name="usersLimit"
            value={groupData.usersLimit}
            onChange={handleChange}
          />
        </label>
        <label>
          Stacks:
          {stacksList.map((stack) => (
            <div key={stack}>
              <input
                type="checkbox"
                name="stacks"
                value={stack}
                checked={groupData.stacks.includes(stack)}
                onChange={handleCheckboxChange}
              />
              {stack}
            </div>
          ))}
        </label>
        <label>
          Languages Spoken:
          {languageList.map((language) => (
            <div key={language}>
              <input
                type="checkbox"
                name="languagesSpoken"
                value={language}
                checked={groupData.languagesSpoken.includes(language)}
                onChange={handleCheckboxChange}
              />
              {language}
            </div>
          ))}
        </label>
        <button type="submit">Create Group</button>
      </form>
      {groupCreated && (
        <div>
          <p>Name: {groupData.name}</p>
          <p>Creator: {groupData.creator}</p>
          <p>Description: {groupData.description}</p>
          <p>Category: {groupData.category}</p>
          <p>Modality: {groupData.modality}</p>
          <p>City: {groupData.city}</p>
          <p>Users Limit: {groupData.usersLimit}</p>
          <p>Group created successfully!</p>
        </div>
      )}
      <div>
        <button
          onClick={() => router.push("/events")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
