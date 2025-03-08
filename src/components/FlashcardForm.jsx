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
    <form onSubmit={handleSubmit} className="w-full max-w-lg mb-8 flex flex-col gap-4">
      <input
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Player Name"
        className="p-3 rounded-lg bg-white text-black border border-[#DA291C] focus:outline-none focus:ring-2 focus:ring-[#DA291C] transition-all"
      />
      <input
        type="text"
        value={definition}
        onChange={(e) => setDefinition(e.target.value)}
        placeholder="Key Fact or Stat"
        className="p-3 rounded-lg bg-white text-black border border-[#DA291C] focus:outline-none focus:ring-2 focus:ring-[#DA291C] transition-all"
      />
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        placeholder="Player Image URL (optional)"
        className="p-3 rounded-lg bg-white text-black border border-[#DA291C] focus:outline-none focus:ring-2 focus:ring-[#DA291C] transition-all"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="p-3 rounded-lg bg-white text-black border border-[#DA291C] focus:outline-none focus:ring-2 focus:ring-[#DA291C] transition-all"
      >
        <option value="
        ">Legend</option>
        <option value="modern">Modern Star</option>
      </select>
      <button type="submit">Add Player</button>
    </form>
  );
}

export default FlashcardForm;