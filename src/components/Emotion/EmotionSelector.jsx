
import { EMOTIONS } from '../../utils/sampleMemories';

export default function EmotionSelector({ selectedEmotion, onSelectEmotion }) {
    return (
    <div className="w-full">
        <label className="block text-xs font-semibold tracking-wider text-amber-900/80 uppercase mb-2 font-sans">
        Como você estava se sentindo? *
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-3 gap-2">
        {EMOTIONS.map((emotion) => {
            const isSelected = selectedEmotion === emotion.label;
            return (
            <button
                key={emotion.id}
                type="button"
                onClick={() => onSelectEmotion(emotion)}
                className={`flex items-center gap-2 p-2.5 rounded-xl border text-sm font-medium transition-all duration-200 cursor-pointer ${
                isSelected
                    ? `${emotion.color} shadow-md scale-[1.02] ring-2 ring-amber-700/40 font-semibold`
                    : 'bg-stone-50/80 border-stone-200/80 text-stone-700 hover:bg-stone-100 hover:border-amber-300/60'
                }`}
            >
                <span className="text-xl leading-none select-none">{emotion.emoji}</span>
                <span className="truncate text-xs sm:text-sm">{emotion.label}</span>
            </button>
            );
        })}
        </div>
    </div>
    );
}