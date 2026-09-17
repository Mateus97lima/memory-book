
import { Calendar, MapPin, Star, Edit3, Trash2 } from 'lucide-react';
import { EMOTIONS } from '../../utils/sampleMemories';

export default function MemoryDetails({ 
  memory, 
  onEdit, 
  onDelete, 
  onToggleBookmark 
}) {
  if (!memory) return null;

  const emotionObj = EMOTIONS.find(e => e.label === memory.emotion) || {
    color: 'bg-amber-100 text-amber-900 border-amber-300'
  };

  const formattedNum = String(memory.number || 1).padStart(2, '0');

  return (
    <div className="space-y-6 font-sans">
      
      {/* Header Info */}
      <div className="flex items-center justify-between border-b border-amber-900/10 pb-3">
        <div className="flex items-center gap-3">
          <span className="font-handwriting text-3xl font-bold text-amber-900">
            #{formattedNum}
          </span>
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold ${emotionObj.color}`}>
            <span>{memory.emoji}</span>
            <span>{memory.emotion}</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggleBookmark(memory.id)}
            className={`p-2 rounded-xl border transition-colors flex items-center gap-1.5 text-xs font-medium ${
              memory.bookmarked 
                ? 'bg-amber-100 border-amber-300 text-amber-900' 
                : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
            }`}
          >
            <Star className={`w-4 h-4 ${memory.bookmarked ? 'fill-amber-500 text-amber-600' : ''}`} />
            <span>{memory.bookmarked ? 'Favoritada' : 'Favoritar'}</span>
          </button>

          <button
            onClick={() => onEdit(memory)}
            className="p-2 rounded-xl bg-stone-100 border border-stone-200 text-stone-700 hover:bg-stone-200 transition-colors"
            title="Editar"
          >
            <Edit3 className="w-4 h-4" />
          </button>

          <button
            onClick={() => onDelete(memory.id)}
            className="p-2 rounded-xl bg-red-50 border border-red-200 text-red-700 hover:bg-red-100 transition-colors"
            title="Excluir"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Expanded Image */}
      <div className="w-full aspect-[16/10] sm:aspect-[16/9] rounded-xl overflow-hidden bg-stone-900 shadow-md border border-stone-300 relative group">
        <img
          src={memory.image}
          alt={memory.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Title & Metadata */}
      <div className="space-y-2">
        <h2 className="font-display text-3xl font-bold text-amber-950">
          "{memory.title}"
        </h2>

        <div className="flex flex-wrap items-center gap-4 text-xs text-stone-600">
          <div className="flex items-center gap-1.5 font-medium text-amber-900">
            <Calendar className="w-4 h-4" />
            <span>{memory.formattedDate || memory.date}</span>
          </div>

          {memory.location && (
            <div className="flex items-center gap-1.5 text-stone-600">
              <MapPin className="w-4 h-4 text-amber-800" />
              <span>{memory.location}</span>
            </div>
          )}
        </div>
      </div>

      {/* Full Narrative Text */}
      <div className="p-4 rounded-xl bg-amber-950/5 border border-amber-900/10">
        <p className="font-serif text-lg leading-relaxed text-stone-800 italic whitespace-pre-wrap">
          "{memory.text}"
        </p>
      </div>

    </div>
  );
}
