"use client";

import { useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { SearchIcon, CloseIcon, ChevronLeftIcon, ChevronRightIcon } from "../components/Icons";
import type { Character } from "../lib/types";

export default function CharacterList({ characters }: { characters: Character[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCharacterIndex, setSelectedCharacterIndex] = useState<number | null>(null);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const filteredCharacters = characters.filter((c) => c.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleOpenModal = (index: number) => {
    setSelectedCharacterIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedCharacterIndex(null);
  };

  const handleNext = () => {
    if (selectedCharacterIndex !== null && selectedCharacterIndex < filteredCharacters.length - 1) {
      setSelectedCharacterIndex(selectedCharacterIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (selectedCharacterIndex !== null && selectedCharacterIndex > 0) {
      setSelectedCharacterIndex(selectedCharacterIndex - 1);
    }
  };

  const selectedCharacter = selectedCharacterIndex !== null ? filteredCharacters[selectedCharacterIndex] : null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Character Database</h1>
          <p className="text-neutral-400">Comprehensive guide for all Umamusume characters. Click on a character to view their detailed guide.</p>
        </div>
        <div className="text-sm text-neutral-500 shrink-0">Total Characters: {characters.length}</div>
      </div>

      <div className="space-y-6">
        <div className="flex flex-wrap gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="text-neutral-500" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search characters..."
              aria-label="Search characters"
              className="w-full pl-10 pr-4 py-3 bg-neutral-900 border border-neutral-800 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/50 transition-colors"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-neutral-500">
              {filteredCharacters.length} / {characters.length}
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSearchTerm("")}
            className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-xl px-4 py-3 text-neutral-300 hover:text-white text-sm transition-colors focus:outline-none focus:border-pink-500/50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
              <path d="M3 3v5h5"></path>
            </svg>
            Reset
          </button>
        </div>

        {filteredCharacters.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
            {filteredCharacters.map((character, index) => (
              <button
                key={character.name}
                onClick={() => handleOpenModal(index)}
                className="group relative block bg-neutral-900/50 rounded-xl overflow-hidden border border-neutral-800 hover:border-pink-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(236,72,153,0.15)] hover:-translate-y-1 w-full text-left"
              >
                <div className="aspect-[3/4] relative flex items-center justify-center p-2 bg-neutral-800">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 z-10"></div>
                  <Image src={`/${character.image}`} alt={character.name} className="w-[115px] h-[115px] group-hover:w-32 group-hover:h-32 object-contain transition-all duration-300 z-0" width={115} height={115} loading="lazy" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 z-20">
                    <h3 className="text-sm font-medium text-white truncate text-center group-hover:text-pink-400 transition-colors">{character.name}</h3>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-neutral-500 text-lg">No characters found matching your search.</div>
          </div>
        )}
      </div>

      {mounted && selectedCharacter && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={handleCloseModal}></div>
          <div className="relative bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl max-h-[90vh] overflow-hidden flex flex-col animate-zoom-fade max-w-7xl w-full z-10">
            <div className="flex items-center justify-between p-4 border-b border-neutral-800 shrink-0">
              <h2 id="modal-title" className="text-xl font-bold text-white">{selectedCharacter.name}</h2>
              <div className="flex items-center gap-2">
                <button onClick={handlePrevious} className="p-2 text-neutral-400 hover:text-white transition-colors rounded-lg hover:bg-neutral-800" title="Previous (←)">
                  <ChevronLeftIcon />
                </button>
                <button onClick={handleNext} className="p-2 text-neutral-400 hover:text-white transition-colors rounded-lg hover:bg-neutral-800" title="Next (→)">
                  <ChevronRightIcon />
                </button>
                <button onClick={handleCloseModal} className="p-1 text-neutral-400 hover:text-white transition-colors rounded-lg hover:bg-neutral-800">
                  <CloseIcon />
                </button>
              </div>
            </div>
            <div className="overflow-auto p-4 custom-scrollbar">
              <div className="flex justify-center bg-neutral-950/50 rounded-lg">
                <Image src={`/${selectedCharacter.guide}`} alt={selectedCharacter.name} className="max-w-full max-h-[75vh] object-contain rounded-lg" width={1200} height={900} />
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
