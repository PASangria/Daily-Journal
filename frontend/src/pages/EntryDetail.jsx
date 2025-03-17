import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

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
        <div>
            <h2>{editMode ? "Edit Entry" : "View Entry"}</h2>
            {editMode ? (
                <>
                    <input
                        type="text"
                        value={updatedTitle}
                        onChange={(e) => setUpdatedTitle(e.target.value)}
                    />
                    <textarea
                        value={updatedContent}
                        onChange={(e) => setUpdatedContent(e.target.value)}
                    />
                    <button onClick={handleUpdate}>Save Changes</button>
                </>
            ) : (
                <>
                    <h3>{entry.title}</h3>
                    <p>{entry.content}</p>
                    <button onClick={() => setEditMode(true)}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </>
            )}
            <button onClick={() => navigate("/entries")}>Back</button>
        </div>
    );
}

export default EntryDetail;
