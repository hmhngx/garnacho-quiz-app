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
    <div className="w-full max-w-4xl text-center">
      <div className="relative flex items-center justify-center">
        {/* Flashcard */}
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
                    <p className="text-2xl">{currentCard.definition}</p>
                    {feedback === 'correct' && <p className="text-green-400 mt-4 text-xl">Correct!</p>}
                    {feedback === 'incorrect' && <p className="text-red-400 mt-4 text-xl">Incorrect!</p>}
                    <button
                      onClick={handleMastered}
                      className="neon-button mt-6 px-8 py-4 bg-green-600 rounded-lg text-white hover:bg-green-700 transition-all duration-300 hover:scale-105 hover:shadow-neon-green text-lg"
                    >
                      Mark as Mastered
                    </button>
                  </div>
                ) : (
                  <p className="text-2xl">{currentCard.term}</p>
                )}
              </div>
            </div>
          </div>
          
          {/* Left Navigation Button - positioned in the left green area */}
          <button 
            onClick={prevCard} 
            className="nav-button text-lg px-4 py-3 z-10 absolute -left-20 top-1/2 -translate-y-1/2"
          >
            ←
          </button>
          
          {/* Right Navigation Button - positioned in the right green area */}
          <button 
            onClick={nextCard} 
            className="nav-button text-lg px-4 py-3 z-10 absolute -right-20 top-1/2 -translate-y-1/2"
          >
            →
          </button>
        </div>
      </div>
      <div className="guess-section mt-8 flex flex-col justify-center items-center gap-6">
        <label className="text-white text-base font-bold neon-subtitle">Guess the answer here:</label>
        <div className="flex flex-col md:flex-row gap-3 items-center">
          <input
            type="text"
            value={userGuess}
            onChange={(e) => {
              setUserGuess(e.target.value);
              setError(''); 
            }}
            placeholder="Place your answer here"
            className="neon-input w-64 md:w-72 px-4 py-3 rounded-xl bg-white text-black border-2 border-[#DA291C] focus:outline-none focus:ring-2 focus:ring-[#DA291C] transition-all hover:shadow-neon-red focus:shadow-neon-red"
            disabled={showAnswer}
          />
          <button
            onClick={handleSubmit}
            className="neon-button px-6 py-3 bg-[#DA291C] text-white rounded-lg hover:bg-[#b52417] transition-all duration-300 hover:scale-105 hover:shadow-neon-red text-base"
            disabled={showAnswer}
          >
            Guess
          </button>
        </div>
      </div>
      {error && <p className="text-red-400 mb-4">{error}</p>} {/* Display error message */}
      <button
        onClick={shuffleCards}
        className="neon-button mt-4 px-6 py-3 bg-[#DA291C] text-white rounded-lg hover:bg-[#b52417] transition-all duration-300 hover:scale-105 hover:shadow-neon-red text-base"
      >
        Shuffle Cards
      </button>
      <p className="progress text-sm mt-2">
        Question {displayIndex} of {flashcards.length}
      </p>
    </div>
  );
}

export default StudyMode;