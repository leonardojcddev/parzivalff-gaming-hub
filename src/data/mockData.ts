export interface Game {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  description: string;
  image: string;
  banner: string;
  currencyName: string;
  currencyImage: string;
  color: string;
}

export interface Offer {
  id: string;
  gameId: string;
  name: string;
  description: string;
  type: 'currency' | 'battlepass';
  amount?: number;
  price: number;
  originalPrice?: number;
  image: string;
  popular: boolean;
  discount?: number;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  gameName: string;
  date: string;
  verified: boolean;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export const games: Game[] = [
  {
    id: 'free-fire',
    slug: 'free-fire',
    name: 'Free Fire',
    shortName: 'FF',
    description: 'El battle royale más popular de Latinoamérica. Recarga diamantes al mejor precio.',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop',
    banner: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&h=400&fit=crop',
    currencyName: 'Diamantes',
    currencyImage: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=100&h=100&fit=crop',
    color: '#FF5722',
  },
  {
    id: 'pubg-mobile',
    slug: 'pubg-mobile',
    name: 'PUBG Mobile',
    shortName: 'PUBG',
    description: 'El rey de los battle royale móviles. Consigue UC para personalizar tu personaje.',
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=300&fit=crop',
    banner: 'https://images.unsplash.com/photo-1552820728-8b83bb6b2b0a?w=1200&h=400&fit=crop',
    currencyName: 'UC',
    currencyImage: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=100&h=100&fit=crop',
    color: '#FFC107',
  },
  {
    id: 'blood-strike',
    slug: 'blood-strike',
    name: 'BLOOD STRIKE',
    shortName: 'BS',
    description: 'Acción intensa y gráficos impresionantes. Recarga oro para dominar el campo de batalla.',
    image: 'https://images.unsplash.com/photo-1493711662062-fa541f7f078d?w=400&h=300&fit=crop',
    banner: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1200&h=400&fit=crop',
    currencyName: 'Oro',
    currencyImage: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=100&h=100&fit=crop',
    color: '#E91E63',
  },
  {
    id: 'delta-force',
    slug: 'delta-force',
    name: 'Garena Delta Force',
    shortName: 'DF',
    description: 'Táctico y estratégico. El nuevo shooter de Garena que está conquistando el mundo.',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop',
    banner: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&h=400&fit=crop',
    currencyName: 'Tokens',
    currencyImage: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=100&h=100&fit=crop',
    color: '#4CAF50',
  },
  {
    id: 'genshin-impact',
    slug: 'genshin-impact',
    name: 'Genshin Impact',
    shortName: 'GI',
    description: 'Explora Teyvat con los mejores personajes. Recarga Genesis Crystals aquí.',
    image: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=400&h=300&fit=crop',
    banner: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=1200&h=400&fit=crop',
    currencyName: 'Genesis Crystals',
    currencyImage: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=100&h=100&fit=crop',
    color: '#9C27B0',
  },
  {
    id: 'honor-of-kings',
    slug: 'honor-of-kings',
    name: 'Honor of Kings',
    shortName: 'HoK',
    description: 'El MOBA más jugado del mundo. Compra tokens para desbloquear héroes legendarios.',
    image: 'https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=400&h=300&fit=crop',
    banner: 'https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=1200&h=400&fit=crop',
    currencyName: 'Tokens',
    currencyImage: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=100&h=100&fit=crop',
    color: '#2196F3',
  },
];

export const offers: Offer[] = [
  // Free Fire Offers
  { id: 'ff-1', gameId: 'free-fire', name: '100 Diamantes', description: 'Paquete básico', type: 'currency', amount: 100, price: 1.50, originalPrice: 2.00, image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=200', popular: false, discount: 25 },
  { id: 'ff-2', gameId: 'free-fire', name: '310 Diamantes', description: 'Paquete popular', type: 'currency', amount: 310, price: 4.50, originalPrice: 5.50, image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=200', popular: true, discount: 18 },
  { id: 'ff-3', gameId: 'free-fire', name: '520 Diamantes', description: 'Mejor valor', type: 'currency', amount: 520, price: 7.00, originalPrice: 9.00, image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=200', popular: true, discount: 22 },
  { id: 'ff-4', gameId: 'free-fire', name: '1060 Diamantes', description: 'Paquete grande', type: 'currency', amount: 1060, price: 14.00, originalPrice: 17.00, image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=200', popular: false, discount: 18 },
  { id: 'ff-5', gameId: 'free-fire', name: '2180 Diamantes', description: 'Mega paquete', type: 'currency', amount: 2180, price: 27.00, originalPrice: 33.00, image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=200', popular: false, discount: 18 },
  { id: 'ff-6', gameId: 'free-fire', name: 'Pase Élite', description: 'Temporada actual', type: 'battlepass', price: 9.00, originalPrice: 12.00, image: 'https://images.unsplash.com/photo-1560942485-b2a11cc13456?w=200', popular: true, discount: 25 },
  { id: 'ff-7', gameId: 'free-fire', name: 'Pase Élite Plus', description: 'Con bonus exclusivos', type: 'battlepass', price: 18.00, originalPrice: 22.00, image: 'https://images.unsplash.com/photo-1560942485-b2a11cc13456?w=200', popular: false, discount: 18 },

  // PUBG Mobile Offers
  { id: 'pubg-1', gameId: 'pubg-mobile', name: '60 UC', description: 'Paquete inicial', type: 'currency', amount: 60, price: 1.00, image: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=200', popular: false },
  { id: 'pubg-2', gameId: 'pubg-mobile', name: '325 UC', description: 'Popular entre jugadores', type: 'currency', amount: 325, price: 5.00, originalPrice: 6.00, image: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=200', popular: true, discount: 17 },
  { id: 'pubg-3', gameId: 'pubg-mobile', name: '660 UC', description: 'Mejor relación calidad-precio', type: 'currency', amount: 660, price: 10.00, originalPrice: 12.00, image: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=200', popular: true, discount: 17 },
  { id: 'pubg-4', gameId: 'pubg-mobile', name: '1800 UC', description: 'Para los más dedicados', type: 'currency', amount: 1800, price: 25.00, originalPrice: 30.00, image: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=200', popular: false, discount: 17 },
  { id: 'pubg-5', gameId: 'pubg-mobile', name: 'Royale Pass', description: 'Temporada actual', type: 'battlepass', price: 10.00, originalPrice: 12.00, image: 'https://images.unsplash.com/photo-1560942485-b2a11cc13456?w=200', popular: true, discount: 17 },
  { id: 'pubg-6', gameId: 'pubg-mobile', name: 'Royale Pass Plus', description: 'Con 25 niveles extra', type: 'battlepass', price: 22.00, originalPrice: 26.00, image: 'https://images.unsplash.com/photo-1560942485-b2a11cc13456?w=200', popular: false, discount: 15 },

  // Blood Strike Offers
  { id: 'bs-1', gameId: 'blood-strike', name: '100 Oro', description: 'Paquete básico', type: 'currency', amount: 100, price: 1.50, image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=200', popular: false },
  { id: 'bs-2', gameId: 'blood-strike', name: '500 Oro', description: 'Popular', type: 'currency', amount: 500, price: 6.00, originalPrice: 7.50, image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=200', popular: true, discount: 20 },
  { id: 'bs-3', gameId: 'blood-strike', name: '1000 Oro', description: 'Mejor valor', type: 'currency', amount: 1000, price: 11.00, originalPrice: 14.00, image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=200', popular: true, discount: 21 },
  { id: 'bs-4', gameId: 'blood-strike', name: '2500 Oro', description: 'Mega paquete', type: 'currency', amount: 2500, price: 25.00, originalPrice: 32.00, image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=200', popular: false, discount: 22 },
  { id: 'bs-5', gameId: 'blood-strike', name: 'Pase de Batalla', description: 'Temporada actual', type: 'battlepass', price: 8.00, originalPrice: 10.00, image: 'https://images.unsplash.com/photo-1560942485-b2a11cc13456?w=200', popular: true, discount: 20 },

  // Delta Force Offers
  { id: 'df-1', gameId: 'delta-force', name: '200 Tokens', description: 'Paquete inicial', type: 'currency', amount: 200, price: 2.00, image: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=200', popular: false },
  { id: 'df-2', gameId: 'delta-force', name: '600 Tokens', description: 'Popular', type: 'currency', amount: 600, price: 5.50, originalPrice: 6.50, image: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=200', popular: true, discount: 15 },
  { id: 'df-3', gameId: 'delta-force', name: '1200 Tokens', description: 'Mejor valor', type: 'currency', amount: 1200, price: 10.00, originalPrice: 12.00, image: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=200', popular: true, discount: 17 },
  { id: 'df-4', gameId: 'delta-force', name: 'Pase Táctico', description: 'Temporada actual', type: 'battlepass', price: 9.00, originalPrice: 11.00, image: 'https://images.unsplash.com/photo-1560942485-b2a11cc13456?w=200', popular: true, discount: 18 },

  // Genshin Impact Offers
  { id: 'gi-1', gameId: 'genshin-impact', name: '60 Genesis Crystals', description: 'Paquete inicial', type: 'currency', amount: 60, price: 1.00, image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=200', popular: false },
  { id: 'gi-2', gameId: 'genshin-impact', name: '330 Genesis Crystals', description: 'Popular', type: 'currency', amount: 330, price: 5.00, originalPrice: 6.00, image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=200', popular: true, discount: 17 },
  { id: 'gi-3', gameId: 'genshin-impact', name: '1090 Genesis Crystals', description: 'Mejor valor', type: 'currency', amount: 1090, price: 15.00, originalPrice: 18.00, image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=200', popular: true, discount: 17 },
  { id: 'gi-4', gameId: 'genshin-impact', name: '2240 Genesis Crystals', description: 'Paquete grande', type: 'currency', amount: 2240, price: 30.00, originalPrice: 35.00, image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=200', popular: false, discount: 14 },
  { id: 'gi-5', gameId: 'genshin-impact', name: 'Bendición Lunar', description: '30 días de Primogems', type: 'battlepass', price: 5.00, image: 'https://images.unsplash.com/photo-1560942485-b2a11cc13456?w=200', popular: true },
  { id: 'gi-6', gameId: 'genshin-impact', name: 'Pase de Batalla', description: 'Gnostic Hymn', type: 'battlepass', price: 10.00, originalPrice: 12.00, image: 'https://images.unsplash.com/photo-1560942485-b2a11cc13456?w=200', popular: false, discount: 17 },

  // Honor of Kings Offers
  { id: 'hok-1', gameId: 'honor-of-kings', name: '100 Tokens', description: 'Paquete básico', type: 'currency', amount: 100, price: 1.50, image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=200', popular: false },
  { id: 'hok-2', gameId: 'honor-of-kings', name: '500 Tokens', description: 'Popular', type: 'currency', amount: 500, price: 7.00, originalPrice: 8.50, image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=200', popular: true, discount: 18 },
  { id: 'hok-3', gameId: 'honor-of-kings', name: '1000 Tokens', description: 'Mejor valor', type: 'currency', amount: 1000, price: 13.00, originalPrice: 16.00, image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=200', popular: true, discount: 19 },
  { id: 'hok-4', gameId: 'honor-of-kings', name: '2500 Tokens', description: 'Mega paquete', type: 'currency', amount: 2500, price: 30.00, originalPrice: 38.00, image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=200', popular: false, discount: 21 },
  { id: 'hok-5', gameId: 'honor-of-kings', name: 'Pase de Temporada', description: 'Temporada actual', type: 'battlepass', price: 8.00, originalPrice: 10.00, image: 'https://images.unsplash.com/photo-1560942485-b2a11cc13456?w=200', popular: true, discount: 20 },
];

export const reviews: Review[] = [
  { id: 'r1', userName: 'Carlos M.', rating: 5, comment: '¡Excelente servicio! Recibí mis diamantes en menos de 5 minutos. 100% recomendado.', gameName: 'Free Fire', date: '2024-01-15', verified: true },
  { id: 'r2', userName: 'María G.', rating: 5, comment: 'Primera vez que compro aquí y quedé muy satisfecha. El proceso fue súper fácil.', gameName: 'PUBG Mobile', date: '2024-01-14', verified: true },
  { id: 'r3', userName: 'Diego R.', rating: 4, comment: 'Muy buen precio y atención rápida. El admin respondió todas mis dudas por WhatsApp.', gameName: 'Free Fire', date: '2024-01-13', verified: true },
  { id: 'r4', userName: 'Ana P.', rating: 5, comment: 'Llevo 6 meses comprando aquí. Nunca he tenido problemas, siempre cumplen.', gameName: 'Genshin Impact', date: '2024-01-12', verified: true },
  { id: 'r5', userName: 'Luis S.', rating: 5, comment: 'Los mejores precios que he encontrado. El pase de batalla llegó al instante.', gameName: 'Free Fire', date: '2024-01-11', verified: true },
  { id: 'r6', userName: 'Sofia V.', rating: 4, comment: 'Buen servicio, solo tardó un poco más de lo esperado pero todo llegó correctamente.', gameName: 'Honor of Kings', date: '2024-01-10', verified: true },
  { id: 'r7', userName: 'Pedro L.', rating: 5, comment: 'Increíble atención al cliente. Me ayudaron a resolver un problema súper rápido.', gameName: 'PUBG Mobile', date: '2024-01-09', verified: true },
  { id: 'r8', userName: 'Laura C.', rating: 5, comment: 'Ya es mi tercera compra. Siempre confiable y con descuentos buenos.', gameName: 'Free Fire', date: '2024-01-08', verified: true },
  { id: 'r9', userName: 'Miguel A.', rating: 4, comment: 'Proceso sencillo y seguro. Lo recomiendo para todos los gamers.', gameName: 'Blood Strike', date: '2024-01-07', verified: true },
  { id: 'r10', userName: 'Valentina H.', rating: 5, comment: 'El mejor sitio para recargas en Latinoamérica. Precios imbatibles.', gameName: 'Genshin Impact', date: '2024-01-06', verified: true },
  { id: 'r11', userName: 'Roberto F.', rating: 5, comment: 'Compré Genesis Crystals y llegaron perfectamente. Volveré a comprar seguro.', gameName: 'Genshin Impact', date: '2024-01-05', verified: true },
  { id: 'r12', userName: 'Carmen D.', rating: 4, comment: 'Muy profesionales. El proceso de WhatsApp es fácil de seguir.', gameName: 'Delta Force', date: '2024-01-04', verified: true },
];

export const faqs: FAQ[] = [
  { id: 'faq1', question: '¿Cómo funciona el proceso de compra?', answer: 'Es muy sencillo: 1) Elige el juego y la oferta que deseas. 2) Haz clic en "Comprar por WhatsApp". 3) Envía tu ID de jugador y el comprobante de pago. 4) Recibe tus diamantes/monedas en minutos.' },
  { id: 'faq2', question: '¿Cuánto tiempo tarda la entrega?', answer: 'La mayoría de las recargas se entregan en 5-15 minutos después de confirmar el pago. En horarios de alta demanda puede tomar hasta 30 minutos.' },
  { id: 'faq3', question: '¿Es seguro comprar aquí?', answer: 'Absolutamente. Llevamos más de 2 años en el mercado con miles de clientes satisfechos. Trabajamos de manera transparente a través de WhatsApp donde puedes verificar todo el proceso.' },
  { id: 'faq4', question: '¿Qué métodos de pago aceptan?', answer: 'Aceptamos transferencias bancarias, Nequi, Daviplata, PayPal, y más. Al contactarnos por WhatsApp te indicamos todas las opciones disponibles para tu país.' },
  { id: 'faq5', question: '¿Qué pasa si hay un problema con mi recarga?', answer: 'Ofrecemos garantía total. Si hay cualquier inconveniente, te devolvemos el dinero o realizamos la recarga nuevamente sin costo adicional.' },
  { id: 'faq6', question: '¿Por qué los precios son más bajos?', answer: 'Compramos créditos al por mayor directamente de distribuidores autorizados, lo que nos permite ofrecer mejores precios que las tiendas oficiales.' },
  { id: 'faq7', question: '¿Necesito dar mi contraseña?', answer: '¡Nunca! Solo necesitamos tu ID de jugador que es público. Nunca te pediremos tu contraseña o datos de acceso a tu cuenta.' },
  { id: 'faq8', question: '¿Hacen recargas a cualquier región?', answer: 'Sí, realizamos recargas a cuentas de cualquier región. Solo asegúrate de indicarnos el servidor correcto de tu cuenta.' },
];

export const getGameBySlug = (slug: string): Game | undefined => {
  return games.find(game => game.slug === slug);
};

export const getOffersByGameId = (gameId: string): Offer[] => {
  return offers.filter(offer => offer.gameId === gameId);
};

export const getFeaturedOffers = (): Offer[] => {
  return offers.filter(offer => offer.popular).slice(0, 6);
};
