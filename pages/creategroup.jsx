import React, { useState } from "react";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGroupData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send groupData to server or perform further actions
    console.log("Group data:", groupData);

    // Update state to indicate group is created
    setGroupCreated(true);
  };

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
          Users Limit
          <input
            type="number"
            name="usersLimit"
            value={groupData.usersLimit}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Create Group</button>
      </form>
      {groupCreated && (
        <div>
          <p>{groupData}</p>
          <div>
            <h2>Group Details</h2>
            <p>Name: {groupData.name}</p>
            <p>Creator: {groupData.creator}</p>
            <p>Description: {groupData.description}</p>
            <p>Category: {groupData.category}</p>
            <p>Modality: {groupData.modality}</p>
            <p>City: {groupData.city}</p>
            <p>Users Limit: {groupData.usersLimit}</p>
          </div>
          <p>Group created successfully!</p>
          {/* Show icon here */}
        </div>
      )}
    </div>
  );
}
