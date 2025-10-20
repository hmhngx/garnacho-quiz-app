import { useState } from 'react';

function FlashcardForm({ addFlashcard }) {
  const [term, setTerm] = useState('');
  const [definition, setDefinition] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('legend');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (term || definition || image) {
      addFlashcard(term, definition, image, category);
      setTerm('');
      setDefinition('');
      setImage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mb-8 flex flex-col gap-6 neon-form">
      <input
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Player Name"
        className="neon-input w-full rounded-lg bg-white text-black border-2 border-[#DA291C] focus:outline-none focus:ring-2 focus:ring-[#DA291C] transition-all hover:shadow-neon-red focus:shadow-neon-red"
      />
      <input
        type="text"
        value={definition}
        onChange={(e) => setDefinition(e.target.value)}
        placeholder="Key Fact or Stat"
        className="neon-input w-full rounded-lg bg-white text-black border-2 border-[#DA291C] focus:outline-none focus:ring-2 focus:ring-[#DA291C] transition-all hover:shadow-neon-red focus:shadow-neon-red"
      />
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        placeholder="Player Image URL (optional)"
        className="neon-input w-full rounded-lg bg-white text-black border-2 border-[#DA291C] focus:outline-none focus:ring-2 focus:ring-[#DA291C] transition-all hover:shadow-neon-red focus:shadow-neon-red"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="neon-input w-full rounded-lg bg-white text-black border-2 border-[#DA291C] focus:outline-none focus:ring-2 focus:ring-[#DA291C] transition-all hover:shadow-neon-red focus:shadow-neon-red"
      >
        <option value="legend">Legend</option>
        <option value="modern">Modern Star</option>
      </select>
      <button type="submit" className="neon-button px-8 py-4 bg-gradient-to-r from-[#DA291C] to-[#b52417] text-white rounded-lg font-semibold hover:from-[#b52417] hover:to-[#DA291C] transition-all duration-300 hover:scale-105 hover:shadow-neon-red text-lg">Add Player</button>
    </form>
  );
}

export default FlashcardForm;