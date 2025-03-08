import { useState } from 'react';

function StudyMode({ flashcards }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const nextCard = () => {
    setShowAnswer(false);
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  const prevCard = () => {
    setShowAnswer(false);
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  if (flashcards.length === 0) return <p className="text-white">No players to quiz!</p>;

  const currentCard = flashcards[currentIndex];
  const displayIndex = currentIndex + 1;

  return (
    <div className="w-full max-w-lg text-center">
      <div className="relative">
        <div
          className={`card ${currentCard.category ? `category-${currentCard.category}` : 'category-legend'} mb-6 cursor-pointer transform-style-3d transition-transform duration-500 ${showAnswer ? 'flipped' : ''}`}
          style={{ transform: showAnswer ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
          onClick={() => setShowAnswer(!showAnswer)}
        >
          <div className="absolute inset-0 flex items-center justify-center backface-hidden">
            <div className="card-content">
              {showAnswer ? (
                currentCard.definition || (currentCard.image && <img src={currentCard.image} alt={currentCard.term} />)
              ) : (
                currentCard.term || (currentCard.image && <img src={currentCard.image} alt={currentCard.term} />)
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={prevCard}
            className="nav-button"
          >
            ←
          </button>
          <button
            onClick={nextCard}
            className="nav-button"
          >
            →
          </button>
        </div>
      </div>
      <p className="progress">
        Player {displayIndex} of {flashcards.length}
      </p>
    </div>
  );
}

export default StudyMode;