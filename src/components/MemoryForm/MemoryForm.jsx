import { useState, useEffect } from 'react';
import { Upload, Image as ImageIcon, Check } from 'lucide-react';
import EmotionSelector from './../Emotion/EmotionSelector';
import { PRESET_PHOTOS } from './../../utils/sampleMemories';

export default function MemoryForm({ 
  initialData = null, 
  onSubmit, 
  onCancel 
}) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [text, setText] = useState('');
  const [emotion, setEmotion] = useState('Tranquilo');
  const [emoji, setEmoji] = useState('😌');
  const [image, setImage] = useState(PRESET_PHOTOS[0].url);
  const [location, setLocation] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setDate(initialData.date || new Date().toISOString().split('T')[0]);
      setText(initialData.text || '');
      setEmotion(initialData.emotion || 'Tranquilo');
      setEmoji(initialData.emoji || '😌');
      setImage(initialData.image || PRESET_PHOTOS[0].url);
      setLocation(initialData.location || '');
    }
  }, [initialData]);

  // Handle local image file upload (convert to Base64)
  const handleFileUpload = (file) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMsg('Por favor selecione um arquivo de imagem válido.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg('A imagem deve ter no máximo 5MB.');
      return;
    }

    setErrorMsg('');
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMsg('Por favor informe um título para a memória.');
      return;
    }
    if (!text.trim()) {
      setErrorMsg('Por favor escreva um relato para a memória.');
      return;
    }

    onSubmit({
      title: title.trim(),
      date,
      text: text.trim(),
      emotion,
      emoji,
      image,
      location: location.trim()
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 font-sans">
      {errorMsg && (
        <div className="p-3 rounded-lg bg-red-100 border border-red-300 text-red-800 text-xs font-medium">
          {errorMsg}
        </div>
      )}

      {/* Image Upload & Preview Section */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold tracking-wider text-amber-900/80 uppercase">
          Foto da memória *
        </label>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
          {/* Preview Box */}
          <div className="relative w-full aspect-[4/3] bg-stone-100 rounded-xl border border-amber-900/20 overflow-hidden shadow-inner flex items-center justify-center">
            {image ? (
              <img src={image} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <div className="text-stone-400 text-center p-4">
                <ImageIcon className="w-8 h-8 mx-auto mb-1 opacity-50" />
                <span className="text-xs">Nenhuma foto selecionada</span>
              </div>
            )}
          </div>

          {/* Upload Dropzone */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-4 text-center flex flex-col items-center justify-center h-full transition-colors cursor-pointer ${
              isDragOver 
                ? 'border-amber-600 bg-amber-500/10' 
                : 'border-stone-300 hover:border-amber-500 bg-stone-50/50'
            }`}
          >
            <Upload className="w-6 h-6 text-amber-800 mb-2" />
            <p className="text-xs text-stone-700 font-medium mb-1">
              Arraste sua foto aqui
            </p>
            <p className="text-[10px] text-stone-500 mb-3">ou clique para carregar</p>
            
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="memory-image-input"
              onChange={(e) => e.target.files && handleFileUpload(e.target.files[0])}
            />
            
            <label
              htmlFor="memory-image-input"
              className="px-3 py-1.5 rounded-lg bg-amber-900/10 hover:bg-amber-900/20 text-amber-950 text-xs font-semibold cursor-pointer transition-colors"
            >
              Escolher foto
            </label>
          </div>
        </div>

        {/* Preset Photos Options */}
        <div className="pt-2">
          <p className="text-[11px] text-stone-500 mb-1.5 font-medium">Ou selecione uma foto de demonstração:</p>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {PRESET_PHOTOS.map((photo, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setImage(photo.url)}
                className={`relative shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                  image === photo.url ? 'border-amber-600 scale-105 shadow' : 'border-stone-200 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={photo.url} alt={photo.label} className="w-full h-full object-cover" />
                {image === photo.url && (
                  <div className="absolute inset-0 bg-amber-900/40 flex items-center justify-center text-white">
                    <Check className="w-4 h-4" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Memory Title & Date Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="sm:col-span-2 space-y-1">
          <label htmlFor="memory-title" className="block text-xs font-semibold tracking-wider text-amber-900/80 uppercase">
            Título da memória *
          </label>
          <input
            id="memory-title"
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ex: Um dia tranquilo"
            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-600/40 focus:border-amber-600 text-stone-800 text-sm font-serif text-lg font-bold"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="memory-date" className="block text-xs font-semibold tracking-wider text-amber-900/80 uppercase">
            Data *
          </label>
          <input
            id="memory-date"
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-600/40 focus:border-amber-600 text-stone-800 text-sm"
          />
        </div>
      </div>

      {/* Location (Optional) */}
      <div className="space-y-1">
        <label htmlFor="memory-location" className="block text-xs font-semibold tracking-wider text-amber-900/80 uppercase">
          Local (Opcional)
        </label>
        <input
          id="memory-location"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Ex: Praia do Rosa, SC"
          className="w-full px-3.5 py-2 rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-600/40 focus:border-amber-600 text-stone-800 text-xs"
        />
      </div>

      {/* Emotion Selector Component */}
      <EmotionSelector
        selectedEmotion={emotion}
        onSelectEmotion={(selectedObj) => {
          setEmotion(selectedObj.label);
          setEmoji(selectedObj.emoji);
        }}
      />

      {/* Memory Text Area */}
      <div className="space-y-1">
        <label htmlFor="memory-text" className="block text-xs font-semibold tracking-wider text-amber-900/80 uppercase">
          Texto da memória / Relato *
        </label>
        <textarea
          id="memory-text"
          required
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Escreva como você se sentiu, detalhes do dia, momentos marcantes..."
          className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-600/40 focus:border-amber-600 text-stone-800 text-sm font-serif leading-relaxed italic"
        />
      </div>

      {/* Buttons: Guardar memória & Cancelar */}
      <div className="flex items-center justify-end gap-3 pt-3 border-t border-amber-900/10">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 rounded-xl border border-stone-300 text-stone-700 text-sm font-medium hover:bg-stone-100 transition-colors cursor-pointer"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-amber-50 text-sm font-semibold shadow-md transition-all cursor-pointer"
        >
          Guardar memória
        </button>
      </div>

    </form>
  );
}
