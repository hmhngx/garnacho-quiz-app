import { useState } from 'react';

function FlashcardList({ flashcards }) {
  const [flipped, setFlipped] = useState({});

  const toggleFlip = (index) => {
    setFlipped((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="w-full max-w-lg space-y-4">
      {flashcards.map((card, index) => (
        <div
          key={index}
          className={`card-list ${card.category ? `category-${card.category}` : 'category-legend'} relative cursor-pointer transform-style-3d transition-transform duration-500 ${flipped[index] ? 'flipped' : ''}`}
          style={{ transform: flipped[index] ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
          onClick={() => toggleFlip(index)}
        >
          <div className="absolute inset-0 flex items-center justify-center backface-hidden">
            <div className="card-content">
              {flipped[index] ? (
                card.definition || (card.image && <img src={card.image} alt={card.term} />)
              ) : (
                <strong>{card.term || (card.image && <img src={card.image} alt={card.term} />)}</strong>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FlashcardList;