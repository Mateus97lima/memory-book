import { useState, useEffect } from 'react';
import { INITIAL_MEMORIES } from '../utils/sampleMemories';

const STORAGE_KEY = 'memora_memories_v1';

export function useMemories() {
    const [memories, setMemories] = useState(() => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
        }
        }
    } catch (e) {
        console.error('Failed to load memories from localStorage:', e);
    }
    return INITIAL_MEMORIES;
    });

  // Sync state to LocalStorage
    useEffect(() => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(memories));
    } catch (e) {
        console.error('Failed to save memories to localStorage:', e);
    }
    }, [memories]);

  // Format date  (YYYY-MM-DD -> DD de Mês de YYYY)
    const formatDateString = (dateStr) => {
    if (!dateStr) return '';
    try {
        const [year, month, day] = dateStr.split('-');
        const months = [
        'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
        'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
        ];
      const monthIdx = parseInt(month, 10) - 1;
      return `${parseInt(day, 10)} de ${months[monthIdx] || month} de ${year}`;
    } catch (e) {
      return dateStr;
    }
  };

  const addMemory = (newMemoryData) => {
    const nextNumber = memories.length > 0 
      ? Math.max(...memories.map(m => m.number || 0)) + 1 
      : 1;

    const newMemory = {
      id: `mem-${Date.now()}`,
      number: nextNumber,
      title: newMemoryData.title,
      date: newMemoryData.date,
      formattedDate: formatDateString(newMemoryData.date),
      emotion: newMemoryData.emotion,
      emoji: newMemoryData.emoji,
      image: newMemoryData.image || 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
      text: newMemoryData.text,
      location: newMemoryData.location || '',
      bookmarked: false,
      createdAt: new Date().toISOString()
    };

    setMemories(prev => [newMemory, ...prev]);
    return newMemory;
  };

  const updateMemory = (id, updatedData) => {
    setMemories(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          ...updatedData,
          formattedDate: updatedData.date ? formatDateString(updatedData.date) : item.formattedDate,
          updatedAt: new Date().toISOString()
        };
      }
      return item;
    }));
  };

  const deleteMemory = (id) => {
    setMemories(prev => prev.filter(item => item.id !== id));
  };

  const toggleBookmark = (id) => {
    setMemories(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, bookmarked: !item.bookmarked };
      }
      return item;
    }));
  };

  const resetToDefaults = () => {
    setMemories(INITIAL_MEMORIES);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_MEMORIES));
  };

  return {
    memories,
    addMemory,
    updateMemory,
    deleteMemory,
    toggleBookmark,
    resetToDefaults
  };
}
