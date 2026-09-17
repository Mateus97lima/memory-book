import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Search, 
  Smile, 
  Volume2, 
  VolumeX, 
  Music, 
  BookOpen,
  RotateCcw,
  Star
} from 'lucide-react';
import { EMOTIONS } from '../../utils/sampleMemories';
import { soundFx } from '../../utils/audioEffects';

export default function PageNavigation({ 
  currentPageDisplay, 
  totalPagesDisplay, 
  onPrevPage, 
  onNextPage, 
  hasPrev, 
  hasNext, 
  onAddNew, 
  onReturnToCover,
  searchTerm,
  onSearchChange,
  selectedEmotionFilter,
  onEmotionFilterChange,
  showOnlyBookmarks,
  onToggleShowBookmarks,
  onResetDefaults
}) {
  const [soundEnabled, setSoundEnabled] = useState(soundFx.soundEnabled);
  const [ambientPlaying, setAmbientPlaying] = useState(soundFx.ambientEnabled);
  const [showFilters, setShowFilters] = useState(false);

  const toggleSound = () => {
    soundFx.soundEnabled = !soundEnabled;
    setSoundEnabled(!soundEnabled);
  };

  const toggleAmbient = () => {
    const isPlaying = soundFx.toggleAmbient();
    setAmbientPlaying(isPlaying);
  };

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 py-3 flex flex-col space-y-3 font-sans">
      
      {/* Top Bar: Controls & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#17141f]/90 backdrop-blur-md p-3 rounded-2xl border border-amber-900/30 shadow-xl text-stone-300">
        
        {/* Left: Cover Link & Bookmarks Filter */}
        <div className="flex items-center gap-2">
          <button
            onClick={onReturnToCover}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-950/40 hover:bg-amber-900/60 text-amber-200 border border-amber-700/30 text-xs font-semibold transition-colors cursor-pointer"
            title="Fechar livro e ir para a capa"
          >
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Capa do Livro</span>
          </button>

          <button
            onClick={onToggleShowBookmarks}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
              showOnlyBookmarks
                ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                : 'bg-stone-900/40 border-stone-700 text-stone-400 hover:text-amber-200'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${showOnlyBookmarks ? 'fill-amber-400 text-amber-400' : ''}`} />
            <span className="hidden sm:inline">Favoritas</span>
          </button>
        </div>

        
        <div className="flex items-center gap-2 flex-1 max-w-md mx-auto">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar memórias por título ou história..."
              className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-stone-900/80 border border-amber-900/30 focus:outline-none focus:ring-1 focus:ring-amber-500 text-xs text-amber-100 placeholder:text-stone-500"
            />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-1.5 rounded-xl border text-xs flex items-center gap-1 shrink-0 transition-colors cursor-pointer ${
              selectedEmotionFilter 
                ? 'bg-amber-600/30 border-amber-500 text-amber-300' 
                : 'bg-stone-900/80 border-amber-900/30 text-stone-400 hover:text-amber-200'
            }`}
            title="Filtrar por sentimento"
          >
            <Smile className="w-4 h-4" />
            <span className="hidden md:inline">{selectedEmotionFilter || 'Sentimento'}</span>
          </button>
        </div>

        {/* Right: + Nova memória & Sound Toggles */}
        <div className="flex items-center gap-2">
          <button
            onClick={onAddNew}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-amber-950 text-xs font-bold shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ Nova memória</span>
          </button>

          <div className="flex items-center gap-1 border-l border-amber-900/30 pl-2">
            <button
              onClick={toggleSound}
              className={`p-2 rounded-xl transition-colors cursor-pointer ${
                soundEnabled ? 'text-amber-400 hover:bg-amber-950/50' : 'text-stone-600 hover:text-stone-400'
              }`}
              title={soundEnabled ? "Sons ativados (Efeito de páginas)" : "Sons desativados"}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <button
              onClick={toggleAmbient}
              className={`p-2 rounded-xl transition-colors cursor-pointer ${
                ambientPlaying ? 'text-rose-400 bg-rose-950/40 border border-rose-800/40' : 'text-stone-500 hover:text-stone-300'
              }`}
              title={ambientPlaying ? "Desativar áudio ambiente" : "Ativar áudio ambiente aconchegante"}
            >
              <Music className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Emotion Filter Drawer (if open) */}
      {showFilters && (
        <div className="p-3 bg-[#1c1826] rounded-xl border border-amber-900/40 flex flex-wrap items-center justify-between gap-2 animate-fadeIn text-xs">
          <span className="text-amber-200/70 font-semibold uppercase tracking-wider text-[10px]">
            Filtrar por sentimento:
          </span>
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => onEmotionFilterChange('')}
              className={`px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                !selectedEmotionFilter ? 'bg-amber-500 text-amber-950 font-bold border-amber-400' : 'bg-stone-800 border-stone-700 text-stone-300'
              }`}
            >
              Todos
            </button>
            {EMOTIONS.map(e => (
              <button
                key={e.id}
                onClick={() => onEmotionFilterChange(e.label)}
                className={`px-2.5 py-1 rounded-lg border flex items-center gap-1 transition-colors cursor-pointer ${
                  selectedEmotionFilter === e.label 
                    ? 'bg-amber-500/20 border-amber-400 text-amber-200 font-bold' 
                    : 'bg-stone-900/60 border-stone-700/60 text-stone-400 hover:text-stone-200'
                }`}
              >
                <span>{e.emoji}</span>
                <span>{e.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Page Navigation Controls */}
      <div className="flex items-center justify-between pt-1 text-xs text-stone-400 font-serif">
        <button
          onClick={onPrevPage}
          disabled={!hasPrev}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
            hasPrev 
              ? 'bg-[#181520] border-amber-900/40 text-amber-200 hover:bg-amber-950 hover:border-amber-600' 
              : 'bg-stone-950/40 border-stone-800 text-stone-600 cursor-not-allowed opacity-50'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>← Página anterior</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="font-handwriting text-2xl text-amber-300 font-bold">
            Pág. {currentPageDisplay}
          </span>
          <span className="text-stone-500 font-sans text-[11px]">
            (de {totalPagesDisplay})
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onNextPage}
            disabled={!hasNext}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
              hasNext 
                ? 'bg-[#181520] border-amber-900/40 text-amber-200 hover:bg-amber-950 hover:border-amber-600' 
                : 'bg-stone-950/40 border-stone-800 text-stone-600 cursor-not-allowed opacity-50'
            }`}
          >
            <span>Próxima página →</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={onResetDefaults}
            className="p-1.5 rounded-lg text-stone-500 hover:text-stone-300 transition-colors"
            title="Restaurar memórias de exemplo"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
}
