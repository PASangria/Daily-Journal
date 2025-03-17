import { Link } from "react-router-dom";
import journalImage from "../assets/journaling.png";
import "./Styles.css"; 

export default function Home() {
  return (
    <div className="main-container">
      {/* Green banner */}
      <div>
        <h1 className="title">Welcome to Daily Journal</h1>
      </div>

      {/* Main content box */}
      <div className="content-box">
        <div className="image-container">
        <img src={journalImage} alt="Journal" className="journal-image" />
        </div>

        <h2 className="subtitle">Capture Your Thoughts, One Entry at a Time</h2>
        <p className="description">
          Your place to unwind, reflect, and capture your thoughts.
          Just start writing—you'll love it!
        </p>
        </div>

        <div className="button-container">
          <Link to="/new" className="btn btn-primary">
            Write a Journal Entry
          </Link>
          <Link to="/entries" className="btn btn-secondary">
            View Journal Entries
          </Link>
        </div>
    </div>
  );
}
