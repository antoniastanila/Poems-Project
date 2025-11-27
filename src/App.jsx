// src/App.jsx
import { useState } from "react";
import { poems } from "./poems";
import "./App.css";

function App() {
  const [selectedPoem, setSelectedPoem] = useState(null);

  // sortăm descrescător după dată (cele mai noi sus)
  const sortedPoems = [...poems].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // grupăm pe ani
  const poemsByYear = sortedPoems.reduce((acc, poem) => {
    acc[poem.year] = acc[poem.year] || [];
    acc[poem.year].push(poem);
    return acc;
  }, {});

  const years = Object.keys(poemsByYear)
    .map((y) => parseInt(y, 10))
    .sort((a, b) => b - a); // 2025, 2024, 2023...

  return (
    <div className="app">
      <header className="app-header">
        <h1>my little poetry archive</h1>
        <p>Newest poems on top · scroll down for older years ✨</p>
      </header>

      <main>
        {years.map((year) => (
          <section key={year} className="year-section">
            <h2 className="year-title">{year}</h2>
            <div className="cards-grid">
              {poemsByYear[year].map((poem) => (
                <PoemCard
                  key={poem.id}
                  poem={poem}
                  onClick={() => setSelectedPoem(poem)}
                />
              ))}
            </div>
          </section>
        ))}
      </main>

      {selectedPoem && (
        <PoemModal poem={selectedPoem} onClose={() => setSelectedPoem(null)} />
      )}
    </div>
  );
}

function PoemCard({ poem, onClick }) {
  const formattedDate = new Date(poem.date).toLocaleDateString("ro-RO", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  return (
    <button className="poem-card" onClick={onClick}>
      <h3 className="poem-title">{poem.title}</h3>
      <p className="poem-date">{formattedDate}</p>
    </button>
  );
}

function PoemModal({ poem, onClose }) {
  const formattedDate = new Date(poem.date).toLocaleDateString("ro-RO", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // să nu se închidă când dai click înăuntru
      >
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <h2>{poem.title}</h2>
        <p className="modal-date">{formattedDate}</p>
        <pre className="poem-text">{poem.content}</pre>
      </div>
    </div>
  );
}

export default App;
