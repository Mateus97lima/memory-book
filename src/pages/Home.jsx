import React, { useState, useMemo, useEffect } from 'react';
import Cover from '../components/Cover/Cover';
import Book from '../components/Book/Book';
import PageNavigation from '../components/PageNavegation/PageNavegation';
import Modal from '../components/Modal/Modal';
import MemoryForm from '../components/MemoryForm/MemoryForm';
import MemoryDetails from '../components/MemoryDetails/MemoryDetails';
import { useMemories } from '../hooks/useMemories';
import { soundFx } from '.././utils/audioEffects';

export default function Home() {
    const { 
    memories, 
    addMemory, 
    updateMemory, 
    deleteMemory, 
    toggleBookmark, 
    resetToDefaults 
    } = useMemories();

  const [viewMode, setViewMode] = useState('cover'); // 'cover' | 'book'
    const [spreadIndex, setSpreadIndex] = useState(0);
    const [mobilePageIndex, setMobilePageIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  // Modals
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingMemory, setEditingMemory] = useState(null);
    const [viewingMemory, setViewingMemory] = useState(null);
    const [deletingId, setDeletingId] = useState(null);

  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [emotionFilter, setEmotionFilter] = useState('');
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);

  // Listen to window resize for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter & Search Memories
  const filteredMemories = useMemo(() => {
    return memories.filter(mem => {
      // Search term
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesTitle = mem.title?.toLowerCase().includes(query);
        const matchesText = mem.text?.toLowerCase().includes(query);
        const matchesLocation = mem.location?.toLowerCase().includes(query);
        if (!matchesTitle && !matchesText && !matchesLocation) return false;
      }
      // Emotion filter
      if (emotionFilter && mem.emotion !== emotionFilter) {
        return false;
      }
      // Favorite filter
      if (showBookmarksOnly && !mem.bookmarked) {
        return false;
      }
      return true;
    });
  }, [memories, searchTerm, emotionFilter, showBookmarksOnly]);

  // Reset page index if filtered list changes
  useEffect(() => {
    setSpreadIndex(0);
    setMobilePageIndex(0);
  }, [searchTerm, emotionFilter, showBookmarksOnly]);

  // Desktop Page Spreads Calculation (2 memories per spread)
  const totalSpreads = Math.max(1, Math.ceil(filteredMemories.length / 2));
  const currentLeftMemory = filteredMemories[spreadIndex * 2] || null;
  const currentRightMemory = filteredMemories[spreadIndex * 2 + 1] || null;
  const leftPageNum = spreadIndex * 2 + 1;
  const rightPageNum = spreadIndex * 2 + 2;

  // Mobile Single Page Calculation
  const totalMobilePages = Math.max(1, filteredMemories.length);
  const currentMobileMemory = filteredMemories[mobilePageIndex] || null;
  const mobilePageNum = mobilePageIndex + 1;

  // Navigation handlers
  const handlePrevPage = () => {
    if (isMobile) {
      if (mobilePageIndex > 0) {
        soundFx.playPageFlip();
        setMobilePageIndex(prev => prev - 1);
      }
    } else {
      if (spreadIndex > 0) {
        soundFx.playPageFlip();
        setSpreadIndex(prev => prev - 1);
      }
    }
  };

  const handleNextPage = () => {
    if (isMobile) {
      if (mobilePageIndex < totalMobilePages - 1) {
        soundFx.playPageFlip();
        setMobilePageIndex(prev => prev + 1);
      }
    } else {
      if (spreadIndex < totalSpreads - 1) {
        soundFx.playPageFlip();
        setSpreadIndex(prev => prev + 1);
      }
    }
  };

  const hasPrev = isMobile ? mobilePageIndex > 0 : spreadIndex > 0;
  const hasNext = isMobile ? mobilePageIndex < totalMobilePages - 1 : spreadIndex < totalSpreads - 1;

  // Form Submission (Add or Edit)
  const handleFormSubmit = (formData) => {
    soundFx.playClick();
    if (editingMemory) {
      updateMemory(editingMemory.id, formData);
      setEditingMemory(null);
    } else {
      addMemory(formData);
      // Jump to first page to see newly added memory
      setSpreadIndex(0);
      setMobilePageIndex(0);
    }
    setIsFormOpen(false);
  };

  const handleConfirmDelete = () => {
    if (deletingId) {
      soundFx.playClick();
      deleteMemory(deletingId);
      setDeletingId(null);
      if (viewingMemory && viewingMemory.id === deletingId) {
        setViewingMemory(null);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0b10] text-[#2b2622] flex flex-col justify-between selection:bg-amber-500/30 font-sans">
      
      {/* View Mode 1: Hardcover View */}
      {viewMode === 'cover' ? (
        <Cover 
          onOpenBook={() => setViewMode('book')} 
          totalMemories={memories.length} 
        />
      ) : (
        
        /* View Mode 2: Open Book View */
        <div className="relative min-h-screen flex flex-col justify-between pb-6 animate-fadeIn">
          
          {/* Main Book Component */}
          <main className="flex-1 flex items-center justify-center p-2 sm:p-4">
            <Book
              leftMemory={currentLeftMemory}
              rightMemory={currentRightMemory}
              leftPageNum={leftPageNum}
              rightPageNum={rightPageNum}
              mobileMemory={currentMobileMemory}
              mobilePageNum={mobilePageNum}
              onView={(mem) => setViewingMemory(mem)}
              onEdit={(mem) => {
                setEditingMemory(mem);
                setIsFormOpen(true);
              }}
              onDelete={(id) => setDeletingId(id)}
              onToggleBookmark={(id) => toggleBookmark(id)}
              onAddNew={() => {
                setEditingMemory(null);
                setIsFormOpen(true);
              }}
              onPrevPage={handlePrevPage}
              onNextPage={handleNextPage}
              hasPrev={hasPrev}
              hasNext={hasNext}
              isMobileView={isMobile}
            />
          </main>

          {/* Navigation & Controls Footer */}
          <footer className="w-full mt-auto">
            <PageNavigation
              currentPageDisplay={isMobile ? `${mobilePageNum}` : `${leftPageNum} - ${rightPageNum}`}
              totalPagesDisplay={isMobile ? `${totalMobilePages}` : `${totalSpreads * 2}`}
              onPrevPage={handlePrevPage}
              onNextPage={handleNextPage}
              hasPrev={hasPrev}
              hasNext={hasNext}
              onAddNew={() => {
                setEditingMemory(null);
                setIsFormOpen(true);
              }}
              onReturnToCover={() => setViewMode('cover')}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedEmotionFilter={emotionFilter}
              onEmotionFilterChange={setEmotionFilter}
              showOnlyBookmarks={showBookmarksOnly}
              onToggleShowBookmarks={() => setShowBookmarksOnly(!showBookmarksOnly)}
              onResetDefaults={() => {
                if (window.confirm("Deseja restaurar as memórias de demonstração originais?")) {
                  resetToDefaults();
                }
              }}
            />
          </footer>

        </div>
      )}

      {/* Modal 1: Memory Form (Create / Edit) */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingMemory(null);
        }}
        title={editingMemory ? "Editar Memória" : "Nova Memória"}
        maxWidth="max-w-2xl"
      >
        <MemoryForm
          initialData={editingMemory}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingMemory(null);
          }}
        />
      </Modal>

      {/* Modal 2: View Memory Details Lightbox */}
      <Modal
        isOpen={!!viewingMemory}
        onClose={() => setViewingMemory(null)}
        title="Detalhes da Memória"
        maxWidth="max-w-3xl"
      >
        {viewingMemory && (
          <MemoryDetails
            memory={viewingMemory}
            onEdit={(mem) => {
              setViewingMemory(null);
              setEditingMemory(mem);
              setIsFormOpen(true);
            }}
            onDelete={(id) => {
              setDeletingId(id);
            }}
            onToggleBookmark={(id) => {
              toggleBookmark(id);
              setViewingMemory(prev => prev ? { ...prev, bookmarked: !prev.bookmarked } : null);
            }}
          />
        )}
      </Modal>

      {/* Modal 3: Confirmation Dialog for Deletion */}
      <Modal
        isOpen={!!deletingId}
        onClose={() => setDeletingId(null)}
        title="Excluir Memória"
        maxWidth="max-w-md"
      >
        <div className="space-y-4 text-stone-800">
          <p className="text-sm font-serif italic text-stone-700">
            Tem certeza que deseja apagar esta memória do seu livro? Esta ação não pode ser desfeita.
          </p>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-amber-900/10">
            <button
              onClick={() => setDeletingId(null)}
              className="px-4 py-2 rounded-xl border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-100 transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirmDelete}
              className="px-5 py-2 rounded-xl bg-red-700 hover:bg-red-800 text-white text-xs font-semibold shadow transition-colors cursor-pointer"
            >
              Sim, excluir
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
}
