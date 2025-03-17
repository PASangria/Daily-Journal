import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Entries from "./pages/Entries";
import NewEntry from "./pages/NewEntry";
import EntryDetail from "./pages/EntryDetail";

function App() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/entries")
      .then(response => response.json())
      .then(data => setEntries(data))
      .catch(error => console.error("Error fetching entries:", error));
  }, []);

  const handleEntryAdded = (newEntry) => {
    setEntries([newEntry, ...entries]);
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/entries" element={<Entries entries={entries} />} />
      <Route path="/new" element={<NewEntry onEntryAdded={handleEntryAdded} />} />
      <Route path="/entries/:id" element={<EntryDetail />} />
    </Routes>
  );
}

export default App;
