export const INITIAL_MEMORIES = [
  {
    id: "mem-01",
    number: 1,
    title: "Um dia tranquilo",
    date: "2026-09-15",
    formattedDate: "15 de setembro de 2026",
    emotion: "Tranquilo",
    emoji: "😌",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1000&q=80",
    text: "Hoje foi um daqueles dias simples que acabaram sendo bons. Tomei um café quente olhando a chuva pela janela, saí um pouco para caminhar no parque e fiquei pensando em algumas coisas da minha vida. Um momento de paz que ressoa na alma.",
    bookmarked: true,
    location: "Café da Esquina, SP",
    createdAt: "2026-09-15T10:30:00.000Z"
  },
  {
    id: "mem-02",
    number: 2,
    title: "Tarde de Sol na Praia",
    date: "2026-08-20",
    formattedDate: "20 de agosto de 2026",
    emotion: "Feliz",
    emoji: "😊",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
    text: "Sentir o vento marítimo e a areia quente sob os pés traz uma alegria renovadora. Passamos a tarde inteira rindo, conversando sobre o futuro e vendo o sol se pôr em um horizonte dourado inesquecível.",
    bookmarked: false,
    location: "Praia do Rosa, SC",
    createdAt: "2026-08-20T17:45:00.000Z"
  },
  {
    id: "mem-03",
    number: 3,
    title: "Jantar sob as Estrelas",
    date: "2026-07-12",
    formattedDate: "12 de julho de 2026",
    emotion: "Apaixonado",
    emoji: "🥰",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80",
    text: "Luzes quentes, risadas bobas e uma comida deliciosa. Quando olhei nos seus olhos à luz de velas, soube que momentos como esse são os verdadeiros tesouros que tornam a caminhada valiosa.",
    bookmarked: true,
    location: "Bistrô Jardim, MG",
    createdAt: "2026-07-12T21:15:00.000Z"
  },
  {
    id: "mem-04",
    number: 4,
    title: "Conquista do Projeto Novo",
    date: "2026-06-04",
    formattedDate: "04 de junho de 2026",
    emotion: "Animado",
    emoji: "🤩",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80",
    text: "Depois de semanas de dedicação e noites mal dormidas, finalmente o projeto ganhou vida! Ver tudo pronto e funcionando dá um sentimento único de realização e coragem para os próximos desafios.",
    bookmarked: false,
    location: "Escritório Home Office",
    createdAt: "2026-06-04T18:00:00.000Z"
  }
];

export const EMOTIONS = [
  { id: 'feliz', label: 'Feliz', emoji: '😊', color: 'bg-amber-100 text-amber-900 border-amber-300' },
  { id: 'tranquilo', label: 'Tranquilo', emoji: '😌', color: 'bg-emerald-100 text-emerald-900 border-emerald-300' },
  { id: 'apaixonado', label: 'Apaixonado', emoji: '🥰', color: 'bg-rose-100 text-rose-900 border-rose-300' },
  { id: 'triste', label: 'Triste', emoji: '😢', color: 'bg-sky-100 text-sky-900 border-sky-300' },
  { id: 'irritado', label: 'Irritado', emoji: '😡', color: 'bg-orange-100 text-orange-900 border-orange-300' },
  { id: 'ansioso', label: 'Ansioso', emoji: '😰', color: 'bg-purple-100 text-purple-900 border-purple-300' },
  { id: 'animado', label: 'Animado', emoji: '🤩', color: 'bg-yellow-100 text-yellow-900 border-yellow-300' },
  { id: 'cansado', label: 'Cansado', emoji: '😴', color: 'bg-stone-200 text-stone-900 border-stone-400' },
  { id: 'grato', label: 'Grato', emoji: '❤️', color: 'bg-red-100 text-red-900 border-red-300' }
];

export const PRESET_PHOTOS = [
  { url: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80", label: "Café aconchegante" },
  { url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80", label: "Praia de verão" },
  { url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80", label: "Jantar à luz de velas" },
  { url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80", label: "Montanha ao amanhecer" },
  { url: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80", label: "Estudo e Leitura" },
  { url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80", label: "Música e Violão" }
];
