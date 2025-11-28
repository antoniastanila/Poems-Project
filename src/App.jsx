import "./App.css";
import poems from "./poems";
import { useState } from "react";

const poemsByYear = poems.reduce((acc, poem) => {
  if (!acc[poem.year]) acc[poem.year] = [];
  acc[poem.year].push(poem);
  return acc;
}, {});

// sortăm poeziile din fiecare an, cele mai noi primele
Object.keys(poemsByYear).forEach((year) => {
  poemsByYear[year].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
});

const years = Object.keys(poemsByYear)
  .map(Number)
  .sort((a, b) => b - a); // cei mai noi ani sus

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("ro-RO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

function App() {
  const [selectedPoem, setSelectedPoem] = useState(null);

  return (
    <div className="app">
      <div className="app-inner">
        <header className="app-header">
          <h1>Anto's little poetry archive</h1>
          <p>Newest poems on top · scroll down for older years ✨</p>
        </header>

        <main>
          {years.map((year) => (
            <section key={year} className="year-section">
              <h2 className="year-title">{year}</h2>
              <div className="cards-grid">
                {poemsByYear[year].map((poem) => (
                  <button
                    key={poem.id}
                    className="poem-card"
                    onClick={() => setSelectedPoem(poem)}
                  >
                    <h3>{poem.title}</h3>
                    <p className="poem-date">{formatDate(poem.date)}</p>
                  </button>
                ))}
              </div>
            </section>
          ))}
        </main>
      </div>

      {selectedPoem && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedPoem(null)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedPoem(null)}
            >
              ×
            </button>
            <h2>{selectedPoem.title}</h2>
            <p className="modal-date">{formatDate(selectedPoem.date)}</p>
            <pre className="poem-text">{selectedPoem.content}</pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
