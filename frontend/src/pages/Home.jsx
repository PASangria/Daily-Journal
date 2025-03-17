import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Welcome to Daily Journal</h1>

      <div>
        <div>
          <img
            src="https://cdn-icons-png.flaticon.com/512/1998/1998592.png" 
            alt="Journal"
          />
        </div>

        <h2>Capture Your Thoughts, One Entry at a Time</h2>
        <p>Your place to unwind, reflect, and capture your thoughts. Just start writing—you'll love it!</p>

        <div>
          <Link to="/new">Write a Journal Entry</Link>
          <Link to="/entries">View Journal Entries</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
