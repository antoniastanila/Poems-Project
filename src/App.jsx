// src/App.jsx
import "./App.css";
import poems from "./poems"; // poemsByYear era de fapt o listă de poezii
import { useState } from "react";

// Grupăm poeziile pe ani într-un obiect: { 2025: [...], 2024: [...] }
const poemsByYear = poems.reduce((acc, poem) => {
  if (!acc[poem.year]) {
    acc[poem.year] = [];
  }
  acc[poem.year].push(poem);
  return acc;
}, {});

// Lista de ani, ordonați descrescător
const years = Object.keys(poemsByYear)
  .map(Number)
  .sort((a, b) => b - a);

function App() {
  const [selectedPoem, setSelectedPoem] = useState(null);

  return (
    <div className="app">
      <div className="app-inner">
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
                  <button
                    key={poem.id}
                    className="poem-card"
                    onClick={() => setSelectedPoem(poem)}
                  >
                    <h3>{poem.title}</h3>
                    <p className="poem-date">{poem.date}</p>
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
            <p className="modal-date">{selectedPoem.date}</p>
            {/* aici trebuie folosit `content`, nu `text` */}
            <pre className="poem-text">{selectedPoem.content}</pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
