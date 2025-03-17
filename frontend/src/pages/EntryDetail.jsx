import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import journalImage from "../assets/journaling.png";

function EntryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [entry, setEntry] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedContent, setUpdatedContent] = useState("");

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/entries/${id}`)
      .then(response => response.json())
      .then(data => {
        setEntry(data);
        setUpdatedTitle(data.title);
        setUpdatedContent(data.content);
      });
  }, [id]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      fetch(`http://127.0.0.1:5000/entries/${id}`, { method: "DELETE" })
        .then(response => response.json())
        .then(() => navigate("/entries")); // Redirect after deleting
    }
  };

  const handleUpdate = () => {
    fetch(`http://127.0.0.1:5000/entries/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: updatedTitle, content: updatedContent })
    })
    .then(response => response.json())
    .then(() => {
      setEditMode(false);
      setEntry({ ...entry, title: updatedTitle, content: updatedContent });
    });
  };

  if (!entry) return <p>Loading...</p>;

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

      {/* Entry Container */}
      <div className="entry-container">
        <h2 className="form-title">{editMode ? "Edit Entry" : "View Entry"}</h2>
        
        {editMode ? (
  <>
    <div className="input-group">
      <label className="input-label">Title</label>
      <input
        type="text"
        value={updatedTitle}
        onChange={(e) => setUpdatedTitle(e.target.value)}
        className="text-input"
        required
      />
    </div>
    <div className="input-group">
      <textarea
        value={updatedContent}
        onChange={(e) => setUpdatedContent(e.target.value)}
        className="textarea-input"
        required
      />
    </div>
    <div className="button-group">
      <button onClick={handleUpdate} className="button btn-save">
        Save Changes
      </button>
      <button onClick={() => setEditMode(false)} className="button btn-cancel">
        Cancel
      </button>
    </div>
  </>
) : (
          <>
            <div className="input-group">
              <label className="input-label">Title</label>
              <input type="text" value={entry.title} className="text-input" disabled />
            </div>
            <div className="input-group">
              <textarea value={entry.content} className="textarea-input" disabled />
            </div>
            <div className="entry-buttons">
              <button onClick={() => setEditMode(true)} className="button btn-edit">Edit</button>
              <button onClick={handleDelete} className="button btn-delete">Delete</button>
              <button onClick={() => navigate("/entries")} className="button btn-back">Back</button>
            </div>
          </>
        )}
      </div>
      <div className="footer"></div>
    </div>
  );
}

export default EntryDetail;
