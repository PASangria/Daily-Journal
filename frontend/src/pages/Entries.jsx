import { Link } from "react-router-dom";
import journalImage from "../assets/journaling.png";

function Entries({ entries }) {
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

    <div className="entry-container">
        <h1 className="entry-label">Journal Entries</h1>
        <ul className="entry-list">
        {entries
            .slice(0, 4)
            .sort((a, b) => b.id - a.id)
            .map(entry => (
            <li key={entry.id} className="entry-item">
                <div className="entry-icon">
                <img  src="../src/assets/diary.png" alt="diary-icon" />
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
