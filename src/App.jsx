import { useState, useEffect } from 'react';
import FlashcardList from './components/FlashcardList';
import StudyMode from './components/StudyMode';
import './App.css';

function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [masteredCards, setMasteredCards] = useState([]);
  const [mode, setMode] = useState('start');
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);

  const initialCards = [
    { id: 1, term: "Which Argentine manager gave Garnacho his first senior national team call-up?", definition: "Lionel Scaloni", category: "easy" },
    { id: 2, term: "What year did Garnacho officially make his Manchester United senior debut?", definition: "2022", category: "easy" },
    { id: 3, term: "Against which team did Garnacho score his first senior goal for Manchester United?", definition: "Real Sociedad", category: "hard" },
    { id: 4, term: "What is the name of Manchester United's training ground where Garnacho developed?", definition: "Carrington", category: "easy" },
    { id: 5, term: "Which iconic Manchester United number did Garnacho temporarily inherit in training?", definition: "7", category: "hard" },
    { id: 6, term: "Who assisted Garnacho’s first Premier League goal?", definition: "Christian Eriksen", category: "hard" },
    { id: 7, term: "In which competition did Garnacho score his first goal for Argentina’s U20 team?", definition: "Toulon Tournament", category: "hard" },
    { id: 8, term: "What is Garnacho’s current shirt number for Manchester United?", definition: "17", category: "easy" },
    { id: 9, term: "What team did Garnacho play against at his EPL debut match?", definition: "Chelsea", category: "easy" },
    { id: 10, term: "What is Garnacho’s dominant foot?", definition: "Right", category: "easy" },
  ];

  useEffect(() => {
    setFlashcards(initialCards);
  }, []);

  const totalQuestions = initialCards.length;

  const shuffleCards = () => {
    const shuffled = [...flashcards].sort(() => Math.random() - 0.5);
    setFlashcards(shuffled);
  };

  const markAsMastered = (card) => {
    setFlashcards(flashcards.filter(c => c.id !== card.id));
    setMasteredCards([...masteredCards, card]);
  };

  const handleStartOver = () => {
    setFlashcards(initialCards); 
    setMasteredCards([]); 
    setCurrentStreak(0); 
    setLongestStreak(0); 
    setMode('start'); 
  };

  return (
    <div>
      <h1 className="text-4xl font-bold md:text-5xl mb-2">Garnacho Quiz Challenge</h1>
      <p className="text-lg mb-4">Test your knowledge of Alejandro Garnacho!</p>
      <p className="text-sm mb-4">Number of cards: {totalQuestions}</p>
      <p className="text-sm mb-4">Current Streak: {currentStreak} | Longest Streak: {longestStreak}</p>
      {mode === 'start' ? (
        <div className="start-screen">
          <button onClick={() => setMode('study')} className="start-button">
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
          <StudyMode
            flashcards={flashcards}
            setCurrentStreak={setCurrentStreak}
            setLongestStreak={setLongestStreak}
            currentStreak={currentStreak}
            longestStreak={longestStreak}
            markAsMastered={markAsMastered}
            shuffleCards={shuffleCards}
          />
          <button
            onClick={handleStartOver}
            className="mt-6 px-6 py-3 rounded-xl transition-all back-button"
          >
            Start Over
          </button>
          {masteredCards.length > 0 && (
            <div className="mt-6">
              <h2 className="text-xl font-bold">Mastered Cards</h2>
              <ul className="text-left">
                {masteredCards.map(card => (
                  <li key={card.id} className="text-white">
                    {card.term}: {card.definition}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
      <p className="read-the-docs">Viva Garnacho!</p>
    </div>
  );
}

export default App;