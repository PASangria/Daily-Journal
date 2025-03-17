import { Link } from "react-router-dom";

function Entries({ entries }) {
  return (
    <div>
      <h1>Journal Entries</h1>
      <ul>
        {entries.map(entry => (
          <li key={entry.id}>
            <Link to={`/entries/${entry.id}`}>{entry.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Entries;
