import { useState } from 'react';

function FlashcardList({ flashcards }) {
  const [flipped, setFlipped] = useState({});

  const toggleFlip = (index) => {
    setFlipped((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="w-full max-w-4xl space-y-6 neon-flashcard-container">
      {flashcards.map((card, index) => (
        <div
          key={card.id}
          className={`card-list neon-flashcard ${card.category ? `category-${card.category}` : 'category-easy'} relative cursor-pointer transform-style-3d transition-all duration-500 ${flipped[index] ? 'flipped' : ''}`}
          style={{ transform: flipped[index] ? 'rotateX(180deg)' : 'rotateX(0deg)' }}
          onClick={() => toggleFlip(index)}
          onMouseEnter={() => setFlipped((prev) => ({ ...prev, [index]: true }))}
          onMouseLeave={() => setFlipped((prev) => ({ ...prev, [index]: false }))}
        >
          <div className="absolute inset-0 flex items-center justify-center backface-hidden">
            <div className="card-content">
              {flipped[index] ? (
                <div className="neon-text text-xl">
                  {card.definition || (card.image && <img src={card.image} alt={card.term} className="neon-image" />)}
                </div>
              ) : (
                <strong className="neon-text text-xl">
                  {card.term || (card.image && <img src={card.image} alt={card.term} className="neon-image" />)}
                </strong>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FlashcardList;