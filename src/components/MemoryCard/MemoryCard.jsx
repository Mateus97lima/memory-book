
import { Calendar, MapPin, Star, Edit3, Trash2, Maximize2 } from 'lucide-react';
import { EMOTIONS } from '../../utils/sampleMemories';

export default function MemoryCard({ 
    memory, 
    onView, 
    onEdit, 
    onDelete, 
    onToggleBookmark 
}) {
    if (!memory) return null;

  // Find emotion color styling if available
    const emotionObj = EMOTIONS.find(e => e.label === memory.emotion) || {
    color: 'bg-amber-100 text-amber-900 border-amber-300'
    };

    const formattedNum = String(memory.number || 1).padStart(2, '0');

    return (
    <div className="relative w-full h-full flex flex-col justify-between group">
    
      {/* Top Header: Memory Number & Actions */}
        <div className="flex items-center justify-between border-b border-amber-900/10 pb-3 mb-4">
        <div className="flex items-center gap-2">
            <span className="font-handwriting text-3xl font-bold text-amber-900/90 leading-none">
            #{formattedNum}
            </span>
            {memory.bookmarked && (
            <span className="inline-flex items-center text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full text-xs font-medium">
                <Star className="w-3 h-3 fill-amber-500 mr-1" /> Favorita
            </span>
            )}
        </div>

        {/* Card Micro-Actions */}
        <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
            <button
            onClick={(e) => { e.stopPropagation(); onToggleBookmark(memory.id); }}
            className={`p-1.5 rounded-full transition-colors ${
                memory.bookmarked 
                ? 'text-amber-600 hover:bg-amber-200/50' 
                : 'text-stone-400 hover:text-amber-600 hover:bg-amber-100/50'
            }`}
            title={memory.bookmarked ? "Remover favorita" : "Marcar como favorita"}
            >
            <Star className={`w-4 h-4 ${memory.bookmarked ? 'fill-amber-500' : ''}`} />
            </button>
        
            <button
            onClick={(e) => { e.stopPropagation(); onEdit(memory); }}
            className="p-1.5 rounded-full text-stone-500 hover:text-amber-900 hover:bg-amber-100/50 transition-colors"
            title="Editar memória"
            >
            <Edit3 className="w-4 h-4" />
            </button>

            <button
            onClick={(e) => { e.stopPropagation(); onDelete(memory.id); }}
            className="p-1.5 rounded-full text-stone-400 hover:text-red-700 hover:bg-red-50 transition-colors"
            title="Excluir memória"
            >
            <Trash2 className="w-4 h-4" />
            </button>
        </div>
        </div>

      {/* Main Body */}
        <div className="flex-1 flex flex-col space-y-4">
        
        {/* Photo Container styled like a Vintage Polaroid Photo */}
        <div 
            onClick={() => onView(memory)}
            className="relative w-full aspect-[4/3] bg-white p-2.5 sm:p-3 rounded-lg shadow-md border border-stone-200 cursor-pointer transform transition-transform duration-300 hover:rotate-1 hover:scale-[1.01] overflow-hidden group/img"
        >
          {/* Top Tape Strip Decor */}
            <div className="absolute top-[-4px] left-1/2 -translate-x-1/2 w-16 h-4 bg-amber-100/70 border-x border-amber-900/10 rotate-[-1deg] shadow-sm z-10" />

            <div className="w-full h-full overflow-hidden rounded relative bg-stone-100">
            <img
                src={memory.image}
                alt={memory.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                loading="lazy"
                onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80';
                }}
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                <span className="bg-stone-900/80 text-amber-100 px-3 py-1.5 rounded-full text-xs flex items-center gap-1.5 shadow">
                <Maximize2 className="w-3.5 h-3.5" /> Ampliar foto
                </span>
            </div>
            </div>
        </div>

        {/* Date & Location */}
        <div className="flex items-center justify-between text-xs text-stone-600 pt-1 font-sans">
            <div className="flex items-center gap-1.5 text-stone-600 font-medium">
            <Calendar className="w-3.5 h-3.5 text-amber-800" />
            <span>{memory.formattedDate || memory.date}</span>
            </div>

            {memory.location && (
            <div className="flex items-center gap-1 text-stone-500 truncate max-w-[150px]">
                <MapPin className="w-3 h-3 text-amber-700" />
                <span className="truncate">{memory.location}</span>
            </div>
            )}
        </div>

        {/* Memory Title */}
        <h3 
            onClick={() => onView(memory)}
            className="font-display text-2xl font-bold text-amber-950 hover:text-amber-800 cursor-pointer transition-colors leading-tight"
        >
            "{memory.title}"
        </h3>

        {/* Sentiment Badge */}
        <div className="pt-0.5">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold shadow-xs ${emotionObj.color}`}>
            <span className="text-sm leading-none">{memory.emoji}</span>
            <span>{memory.emotion}</span>
            </span>
        </div>

        {/* Memory Text */}
        <p className="font-serif text-stone-700/90 text-sm sm:text-base leading-relaxed italic line-clamp-5 pt-1">
            "{memory.text}"
        </p>

        </div>

      {/* Footer Read More Button */}
        <div className="pt-4 border-t border-amber-900/10 flex justify-end">
        <button
            onClick={() => onView(memory)}
            className="text-xs font-semibold text-amber-900 hover:text-amber-700 flex items-center gap-1 transition-colors group/btn cursor-pointer"
        >
            <span>Ler memória completa</span>
            <span className="transition-transform group-hover/btn:translate-x-1">→</span>
        </button>
        </div>

    </div>
    );
}
