import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewEntry({ onEntryAdded }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newEntry = {
        date: new Date().toISOString().split('T')[0], // Format: YYYY-MM-DD
        title,
        content
    };

    try {
        const response = await fetch("http://127.0.0.1:5000/entries", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newEntry),
        });

        if (!response.ok) {
            throw new Error("Failed to save entry");
        }

        const data = await response.json();
        console.log("Entry saved:", data);
    } catch (error) {
        console.error("Error adding entry:", error);
    }
};


  return (
    <div>
      <h1>Add a Journal Entry</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your entry..."
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default NewEntry;
