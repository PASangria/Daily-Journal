import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import journalImage from "../assets/journaling.png";
import diaryImage from "../assets/diary.png";

function Entries() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/entries")
      .then((res) => res.json())
      .then((data) => setEntries(data))
      .catch((error) => console.error("Error fetching entries:", error));
  }, []);

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

      {/* Journal Entries */}
      <div className="entry-container">
        <h1 className="entry-label">Journal Entries</h1>
        <ul className="entry-list">
          {entries
            .sort((a, b) => b.id - a.id) // Sorting in descending order
            .slice(0, 4) // Limit to 4 most recent entries
            .map((entry) => (
              <li key={entry.id} className="entry-item">
                <div className="entry-icon">
                  <img src={diaryImage} alt="diary-icon" />
                </div>
                <div className="entry-content">
                  <h3 className="entry-title">{entry.title}</h3>
                  <p className="entry-date">{entry.date}</p>
                </div>
                <Link to={`/entries/${entry.id}`} className="view-button">
                  View
                </Link>
              </li>
            ))}
        </ul>
      </div>

      <div className="footer"></div>
    </div>
  );
}

export default Entries;
