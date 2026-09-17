import React from 'react';
import MemoryCard from './../MemoryCard/MemoryCard';
import { Plus, Bookmark } from 'lucide-react';

export default function BookPage({ 
    memory, 
    pageNumber, 
    side = 'left', 
    onView, 
    onEdit, 
    onDelete, 
    onToggleBookmark,
    onAddNew 
}) {
    const isLeft = side === 'left';
    const pageLabel = `Pág. ${String(pageNumber).padStart(2, '0')}`;

    return (
    <div 
        className={`relative w-full h-full bg-parchment p-6 sm:p-8 flex flex-col justify-between select-none overflow-hidden transition-all duration-300 ${
        isLeft ? 'shadow-spine-left rounded-l-lg border-l border-amber-900/10' : 'shadow-spine-right rounded-r-lg border-r border-amber-900/10'
        }`}
    >
      {/* Delicate Page Corner Accent */}
        <div className={`absolute top-0 ${isLeft ? 'left-0 border-l-2 border-t-2 border-amber-900/15' : 'right-0 border-r-2 border-t-2 border-amber-900/15'} w-4 h-4 pointer-events-none`} />
        <div className={`absolute bottom-0 ${isLeft ? 'left-0 border-l-2 border-b-2 border-amber-900/15' : 'right-0 border-r-2 border-b-2 border-amber-900/15'} w-4 h-4 pointer-events-none`} />

      {/* Ribbon decor element on right page top right */}
        {!isLeft && (
        <div className="absolute top-0 right-8 text-amber-800/30 opacity-60">
            <Bookmark className="w-5 h-7 fill-current" />
        </div>
        )}

      {/* Page Top Header */}
        <div className="flex items-center justify-between border-b border-amber-900/10 pb-2 mb-4">
        <span className="font-handwriting text-xl text-amber-900/70 font-semibold tracking-wide">
            {pageLabel}
        </span>
        <span className="text-[10px] uppercase tracking-widest text-amber-900/40 font-sans">
            Memora • Livro de Memórias
        </span>
        </div>

      {/* Page Main contenier */}
        <div className="flex-1 flex flex-col justify-center">
        {memory ? (
            <MemoryCard 
            memory={memory}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggleBookmark={onToggleBookmark}
            />
        ) : (
        
        <div className="h-full flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-amber-900/20 rounded-2xl my-auto bg-amber-900/[0.02]">
            <div className="w-14 h-14 rounded-full bg-amber-900/10 flex items-center justify-center text-amber-900 mb-4 shadow-inner">
            <Plus className="w-7 h-7" />
            </div>
            <h4 className="font-display text-2xl font-bold text-amber-950 mb-2">
            Página em Branco
            </h4>
            <p className="font-serif italic text-stone-600 text-sm max-w-xs mb-6 leading-relaxed">
            "Cada momento guardado se transforma em uma lembrança eterna neste livro."
            </p>
            <button
            onClick={onAddNew}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-amber-50 text-sm font-semibold shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
            <Plus className="w-4 h-4" />
            <span>Adicionar memória</span>
            </button>
        </div>
        )}
    </div>

      {/* Page Bottom Footer */}
    <div className="pt-3 border-t border-amber-900/10 flex items-center justify-between text-[11px] text-amber-900/50 font-serif italic">
        <span>{isLeft ? '— Memory' : 'Guarde seus momentos —'}</span>
        <span>{pageLabel}</span>
    </div>
    </div>
);
}
