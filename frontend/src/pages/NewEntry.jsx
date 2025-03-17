import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import journalImage from "../assets/journaling.png"; 

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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEntry),
      });

      if (!response.ok) {
        throw new Error("Failed to save entry");
      }

      const data = await response.json();
      console.log("Entry saved:", data);

      onEntryAdded(data); // Notify parent component
      navigate("/entries"); // Redirect to entries page

    } catch (error) {
      console.error("Error adding entry:", error);
    }
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="header">
        <div className="logo">
          <img src={journalImage} alt="daily-journal-logo" className="logo-image" />
          <h1 className="logo-title">Daily Journal</h1>
        </div>
        <div className="home-button">
          <Link to="/" className="button btn-primary">Home</Link>
        </div>
      </div>

      {/* Form Box */}
      <div className="form-container">
        <h2 className="form-title">Add A Journal Entry</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-input"
              placeholder="Enter title"
              required
            />
          </div>
          <div className="input-group">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="textarea-input"
              placeholder="Write your entry..."
              required
            />
          </div>
          <button type="submit" className="button btn-save">Save</button>
        </form>
      </div>
      <div className="footer"></div>
    </div>
  );
}

export default NewEntry;
