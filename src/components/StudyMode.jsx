import { useState } from 'react';

const isAnswerCorrect = (userAnswer, correctAnswer) => {
  const normalize = (str) => str.toLowerCase().trim().replace(/[^a-z0-9\s]/g, '');
  const user = normalize(userAnswer);
  const correct = normalize(correctAnswer);
  return user !== '' && (user === correct || correct.includes(user) || user.includes(correct));
};

function StudyMode({ flashcards, setCurrentStreak, setLongestStreak, currentStreak, longestStreak, markAsMastered, shuffleCards }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [userGuess, setUserGuess] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [error, setError] = useState(''); 

  const nextCard = () => {
    setShowAnswer(false);
    setUserGuess('');
    setFeedback(null);
    setError('');
    setCurrentIndex((prev) => {
      if (flashcards.length === 0) return 0;
      return (prev + 1) % flashcards.length;
    });
  };

  const prevCard = () => {
    setShowAnswer(false);
    setUserGuess('');
    setFeedback(null);
    setError('');
    setCurrentIndex((prev) => {
      if (flashcards.length === 0) return 0;
      return (prev - 1 + flashcards.length) % flashcards.length;
    });
  };

  const handleSubmit = () => {
    if (!showAnswer) {
      if (userGuess.trim() === '') {
        setError('Please enter a guess before submitting!');
        return;
      }

      setError(''); 
      const correctAnswer = flashcards[currentIndex].definition;
      const isCorrect = isAnswerCorrect(userGuess, correctAnswer);
      setFeedback(isCorrect ? 'correct' : 'incorrect');
      setShowAnswer(true);

      if (isCorrect) {
        const newStreak = currentStreak + 1;
        setCurrentStreak(newStreak);
        if (newStreak > longestStreak) {
          setLongestStreak(newStreak);
        }
      } else {
        setCurrentStreak(0);
      }
    }
  };

  const handleMastered = () => {
    const currentCard = flashcards[currentIndex];
    markAsMastered(currentCard);
    setShowAnswer(false);
    setUserGuess('');
    setFeedback(null);
    setError('');
    setCurrentIndex((prev) => {
      if (flashcards.length <= 1) return 0; 
      return prev % (flashcards.length - 1);
    });
  };

  if (flashcards.length === 0) return <p className="text-white">No players to quiz! Start over to reset.</p>;

  const currentCard = flashcards[currentIndex];
  const displayIndex = currentIndex + 1;

  return (
    <div className="w-full max-w-lg text-center">
      <div className="relative">
        <div
          className={`card ${currentCard.category ? `category-${currentCard.category}` : 'category-easy'} mb-6 cursor-pointer transform-style-3d transition-transform duration-500 ${showAnswer ? 'flipped' : ''}`}
          style={{ transform: showAnswer ? 'rotateX(180deg)' : 'rotateX(0deg)' }}
          onClick={() => !showAnswer && setShowAnswer(true)}
        >
          <div className="absolute inset-0 flex items-center justify-center backface-hidden">
            <div className="card-content">
              {showAnswer ? (
                <div className="flex flex-col items-center">
                  <p>{currentCard.definition}</p>
                  {feedback === 'correct' && <p className="text-green-400 mt-2">Correct!</p>}
                  {feedback === 'incorrect' && <p className="text-red-400 mt-2">Incorrect!</p>}
                  <button
                    onClick={handleMastered}
                    className="mt-4 px-4 py-2 bg-green-600 rounded-lg text-white hover:bg-green-700 transition"
                  >
                    Mark as Mastered
                  </button>
                </div>
              ) : (
                <p>{currentCard.term}</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="guess-section mb-4 flex justify-center items-center space-x-2">
        <label className="text-white">Guess the answer here:</label>
        <input
          type="text"
          value={userGuess}
          onChange={(e) => {
            setUserGuess(e.target.value);
            setError(''); 
          }}
          placeholder="Place your answer here"
          className="p-2 rounded-lg bg-white text-black border border-[#DA291C] focus:outline-none focus:ring-2 focus:ring-[#DA291C] transition-all"
          disabled={showAnswer}
        />
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-[#DA291C] text-white rounded-lg hover:bg-[#b52417] transition"
          disabled={showAnswer}
        >
          Guess
        </button>
      </div>
      {error && <p className="text-red-400 mb-4">{error}</p>} {/* Display error message */}
      <div className="flex justify-between items-center mt-4">
        <button onClick={prevCard} className="nav-button">←</button>
        <button onClick={nextCard} className="nav-button">→</button>
      </div>
      <button
        onClick={shuffleCards}
        className="mt-4 px-4 py-2 bg-[#DA291C] text-white rounded-lg hover:bg-[#b52417] transition"
      >
        Shuffle Cards
      </button>
      <p className="progress">
        Player {displayIndex} of {flashcards.length}
      </p>
    </div>
  );
}

export default StudyMode;