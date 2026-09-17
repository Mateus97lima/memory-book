import  { useState } from 'react';
import { BookOpen, Sparkles, Music } from 'lucide-react';
import { soundFx } from '../../utils/audioEffects';

export default function Cover({ onOpenBook, totalMemories = 0 }) {
    const [isOpening, setIsOpening] = useState(false);

    const handleOpen = () => {
    soundFx.playBookOpen();
    setIsOpening(true);
    setTimeout(() => {
        onOpenBook();
    }, 600);
    };

    return (
    <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-8 bg-[#09080c] overflow-hidden select-none">
      {/* Soft Ambient Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-900/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] bg-rose-950/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Book Container with 3D Hinge Animation */}
        <div 
        className={`relative w-full max-w-[440px] sm:max-w-[500px] aspect-[1/1.4] transition-all duration-700 transform-gpu perspective-1500 ${
            isOpening ? 'rotate-y-[-90deg] scale-95 opacity-0' : 'scale-100 opacity-100 hover:scale-[1.01]'
        }`}
        >
        {/* page stack */}
        <div className="absolute top-2 right-[-14px] bottom-2 w-4 bg-[#e8dbca] rounded-r border-r border-amber-950/40 shadow-inner flex flex-col justify-around py-4">
            <div className="w-full h-px bg-amber-950/15" />
            <div className="w-full h-px bg-amber-950/15" />
            <div className="w-full h-px bg-amber-950/15" />
            <div className="w-full h-px bg-amber-950/15" />
        </div>

        {/* Satin Ribbon Hanging out from Bottom */}
        <div className="absolute bottom-[-28px] left-16 w-6 h-20 bg-gradient-to-b from-red-800 to-red-900 rounded-b shadow-lg z-0 flex items-end justify-center pb-2 border-x border-red-950">
            <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[12px] border-b-[#09080c]" />
        </div>

        {/* Hardcover Front Surface */}
        <div className="relative w-full h-full bg-cover-leather rounded-r-2xl rounded-l-md border-y border-r border-amber-700/30 shadow-book-3d overflow-hidden p-6 sm:p-10 flex flex-col items-center justify-between z-10 text-center">
        
          {/* Embossed Outer Frame Lines */}
            <div className="absolute inset-3 border-2 border-amber-500/20 rounded-r-xl rounded-l-sm pointer-events-none" />
            <div className="absolute inset-5 border border-amber-500/15 rounded-r-lg pointer-events-none" />

          {/* Ornate Corner Elements */}
            <div className="absolute top-6 left-6 text-amber-500/40 text-xl font-serif">✦</div>
            <div className="absolute top-6 right-6 text-amber-500/40 text-xl font-serif">✦</div>
            <div className="absolute bottom-6 left-6 text-amber-500/40 text-xl font-serif">✦</div>
            <div className="absolute bottom-6 right-6 text-amber-500/40 text-xl font-serif">✦</div>

          {/* Spine Crease Line Left */}
            <div className="absolute top-0 bottom-0 left-4 w-[6px] bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

          {/* Header Icon / Monogram */}
            <div className="mt-6 flex flex-col items-center">
            <div className="w-14 h-14 rounded-full border border-amber-500/30 bg-amber-950/40 flex items-center justify-center shadow-inner mb-3 text-amber-300">
                <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <span className="text-[11px] tracking-[0.3em] uppercase text-amber-200/60 font-medium">
                Álbum Digital Pessoal
            </span>
            </div>

          {/* Book Title & Quotes */}
            <div className="my-auto py-6 space-y-4">
            <h1 className="font-display text-5xl sm:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-200 to-amber-400 drop-shadow-md">
                Memory
            </h1>
            
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent mx-auto" />

            <h2 className="font-serif text-xl sm:text-2xl italic text-amber-100/90 font-light">
                Meu livro de memórias
            </h2>

            <p className="font-handwriting text-2xl sm:text-3xl text-amber-200/80 pt-2">
                "Momentos que quero guardar."
            </p>
            </div>

          {/* Footer & Open Book Button */}
            <div className="w-full mb-4 space-y-4">
            <button
                onClick={handleOpen}
                className="group relative w-full py-4 px-8 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-amber-950 font-serif font-bold text-lg tracking-wide shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 border border-amber-300/40 cursor-pointer overflow-hidden"
            >
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <BookOpen className="w-5 h-5 transition-transform group-hover:scale-110 text-amber-950" />
                <span>Abrir meu livro</span>
            </button>

            <div className="flex items-center justify-between text-xs text-amber-200/50 pt-2 px-1">
                <span>{totalMemories} {totalMemories === 1 ? 'memória registrada' : 'memórias registradas'}</span>
                <button 
                onClick={() => soundFx.toggleAmbient()} 
                className="flex items-center gap-1 hover:text-amber-200 transition-colors cursor-pointer"
                title="Sons de fundo"
                >
                <Music className="w-3.5 h-3.5" />
                <span>Música ambiente</span>
                </button>
            </div>
            </div>

        </div>
        </div>
    </div>
    );
}
