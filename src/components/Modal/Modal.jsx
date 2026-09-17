import { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children, maxWidth = "max-w-xl" }) {
    useEffect(() => {
    const handleKeyDown = (e) => {
        if (e.key === 'Escape' && isOpen) {
        onClose();
        }
    };
    if (isOpen) {
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleKeyDown);
    };
    }, [isOpen, onClose]);

    if (!isOpen) return null; // se não estiver aberto, não renderiza o modal

    return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn">
      {/* Backdrop */}
        <div 
        className="fixed inset-0 bg-stone-950/75 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        />

      {/* Parchment-style Modal Content Window */}
        <div className={`relative w-full ${maxWidth} bg-[#fcf9f2] rounded-2xl shadow-2xl border border-amber-900/20 overflow-hidden transform transition-all duration-300 my-auto z-10 font-sans`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-amber-900/10 bg-[#f7f2e8]/80">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-amber-950 tracking-tight">
            {title}
            </h3>
            <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-500 hover:text-stone-900 hover:bg-amber-900/10 transition-colors"
            aria-label="Fechar"
            >
            <X className="w-5 h-5" />
            </button>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
            {children}
        </div>
        </div>
    </div>
    );
}
