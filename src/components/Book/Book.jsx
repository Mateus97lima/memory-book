import { useState } from 'react';
import BookPage from './BookPage';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { soundFx } from '../utils/audioEffects';

export default function Book({ 
  leftMemory, 
  rightMemory, 
  leftPageNum, 
  rightPageNum, 
  mobileMemory, 
  mobilePageNum, 
  onView, 
  onEdit, 
  onDelete, 
  onToggleBookmark, 
  onAddNew,
  onPrevPage,
  onNextPage,
  hasPrev,
  hasNext,
  isMobileView
}) {
  const [animatingDir, setAnimatingDir] = useState(null); // 'next' | 'prev' | null

  const handleNext = () => {
    if (!hasNext) return;
    soundFx.playPageFlip();
    setAnimatingDir('next');
    setTimeout(() => {
      onNextPage();
      setAnimatingDir(null);
    }, 300);
  };

  const handlePrev = () => {
    if (!hasPrev) return;
    soundFx.playPageFlip();
    setAnimatingDir('prev');
    setTimeout(() => {
      onPrevPage();
      setAnimatingDir(null);
    }, 300);
  };

  return (
    <div className="relative w-full max-w-[1280px] mx-auto py-2 sm:py-6 px-2 sm:px-4 flex flex-col items-center justify-center">
      
      {/* Outer Hardbound Book Leather Frame */}
      <div className="relative w-full bg-cover-leather rounded-2xl p-2 sm:p-5 shadow-book-3d border border-amber-900/40 overflow-hidden">
        
        {/* Book Spine Center Vertical Line Decor */}
        <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[16px] bg-gradient-to-r from-black/90 via-amber-950/60 to-black/90 z-20 shadow-2xl pointer-events-none" />

        {/* Satin Ribbon Bookmark Hanging down center */}
        <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-5 h-[110%] bg-gradient-to-b from-red-800 via-red-900 to-red-950 shadow-2xl z-30 pointer-events-none border-x border-red-950/40">
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-black/80" />
        </div>

        {/* Stacked Pages Bottom Edge Effect */}
        <div className="absolute bottom-1 left-4 right-4 h-2 bg-[#ded2be] rounded-b border-t border-amber-900/30 shadow-inner z-0" />

        {/* Interior Open Pages Spread Container */}
        <div className="relative w-full min-h-[580px] sm:min-h-[640px] md:min-h-[680px] rounded-xl overflow-hidden bg-[#faf5ec] shadow-inner z-10 flex">
        
          {/* Desktop & Tablet: 2 Pages Side-by-Side */}
            <div className="hidden md:grid grid-cols-2 w-full h-full min-h-[680px]">
            {/* Left Page */}
            <div className={`w-full h-full ${animatingDir === 'prev' ? 'animate-page-turn-prev' : ''}`}>
                <BookPage
                memory={leftMemory}
                pageNumber={leftPageNum}
                side="left"
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
                onToggleBookmark={onToggleBookmark}
                onAddNew={onAddNew}
                />
            </div>

            {/* Right Page */}
            <div className={`w-full h-full ${animatingDir === 'next' ? 'animate-page-turn-next' : ''}`}>
                <BookPage
                memory={rightMemory}
                pageNumber={rightPageNum}
                side="right"
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
                onToggleBookmark={onToggleBookmark}
                onAddNew={onAddNew}
                />
            </div>
            </div>

          {/* Mobile View: 1 Page at a time */}
            <div className="md:hidden w-full h-full min-h-[560px]">
            <BookPage
                memory={mobileMemory}
                pageNumber={mobilePageNum}
                side="right"
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
                onToggleBookmark={onToggleBookmark}
                onAddNew={onAddNew}
            />
            </div>

        </div>

        {/* Side Hover/Click Page Turn Arrow Controls Overlay */}
        {hasPrev && (
            <button
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full bg-stone-900/80 hover:bg-amber-900 text-amber-100 flex items-center justify-center shadow-xl border border-amber-500/30 transition-all transform hover:scale-110 cursor-pointer"
            aria-label="Página anterior"
            >
            <ChevronLeft className="w-6 h-6" />
            </button>
        )}

        {hasNext && (
            <button
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full bg-stone-900/80 hover:bg-amber-900 text-amber-100 flex items-center justify-center shadow-xl border border-amber-500/30 transition-all transform hover:scale-110 cursor-pointer"
            aria-label="Próxima página"
            >
            <ChevronRight className="w-6 h-6" />
            </button>
        )}

        </div>

    </div>
    );
}
