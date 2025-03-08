import { useState, useEffect } from 'react';
import FlashcardList from './components/FlashcardList';
import StudyMode from './components/StudyMode';
import './App.css';

function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [mode, setMode] = useState('start');

  useEffect(() => {
    const initialCards = [
      { term: "Scored 179 goals in 470 appearances for United", definition: "George Best", category: "legend" },
      { term: "Won the Ballon d'Or in 2008 while at United", definition: "Cristiano Ronaldo", category: "legend" },
      { term: "1966 World Cup winner and United's all-time top scorer for decades", definition: "Bobby Charlton", category: "legend" },
      { term: "United's all-time leading scorer with 253 goals", definition: "Wayne Rooney", category: "legend" },
      { term: "Known for his iconic collar-up style and kung-fu kick incident", definition: "Eric Cantona", category: "legend" },
      { term: "Most appearances for United with 963 games", definition: "Ryan Giggs", category: "legend" },
      { term: "Famous for his free-kick in 1997 against Greece", definition: "David Beckham", category: "legend" },
      { term: "Made 718 appearances and won 11 Premier League titles", definition: "Paul Scholes", category: "legend" },
      { term: "Famous for his bicycle kick agaisnt Everton and also his speed", definition: "Alejandro Garnacho", category: "modern" },
      { term: "Led United as captain during their 1999 treble-winning season", definition: "Roy Keane", category: "legend" },
    ];
    setFlashcards(initialCards);
  }, []);

  const totalQuestions = flashcards.length;

  return (
    <div>
      <h1 className="text-4xl font-bold md:text-5xl mb-2">Red Devils Quiz Challenge</h1>
      <p className="text-lg mb-4">Test your Manchester United player knowledge!</p>
      <p className="text-sm mb-8">Number of cards: {totalQuestions}</p>
      {mode === 'start' ? (
        <div className="start-screen">
          <button
            onClick={() => setMode('study')}
            className="start-button"
          >
            Start!
          </button>
        </div>
      ) : mode === 'edit' ? (
        <>
          <FlashcardList flashcards={flashcards} />
          {flashcards.length > 0 && (
            <button
              onClick={() => setMode('study')}
              className="mt-6 px-6 py-3 rounded-xl transition-all back-button"
            >
              Start Quiz
            </button>
          )}
        </>
      ) : (
        <>
          <StudyMode flashcards={flashcards} />
          <button
            onClick={() => setMode('start')}
            className="mt-6 px-6 py-3 rounded-xl transition-all back-button"
          >
            Back to Start
          </button>
        </>
      )}
      <p className="read-the-docs">Glory Glory Man United!</p>
    </div>
  );
}

export default App;