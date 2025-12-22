import { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { OfferCard } from '@/components/cards/OfferCard';
import { FloatingWhatsAppButton } from '@/components/ui/floating-whatsapp';
import { getGameBySlug, getOffersByGameId } from '@/data/mockData';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Coins, Ticket, Info } from 'lucide-react';

export default function GameOffers() {
  const { slug } = useParams<{ slug: string }>();
  const [filter, setFilter] = useState<'all' | 'currency' | 'battlepass'>('all');
  const game = getGameBySlug(slug || '');

  if (!game) return <Navigate to="/games" replace />;

  const allOffers = getOffersByGameId(game.id);
  const offers = filter === 'all' ? allOffers : allOffers.filter(o => o.type === filter);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="relative pt-20 pb-12">
        <div className="absolute inset-0 h-64">
          <img src={game.banner} alt={game.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/90 to-background" />
        </div>
        <div className="container mx-auto px-4 relative z-10 pt-16">
          <h1 className="font-gaming font-bold text-3xl md:text-4xl text-foreground mb-2">{game.name}</h1>
          <p className="text-muted-foreground max-w-xl">{game.description}</p>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="gaming-card p-6 mb-8 max-w-2xl">
            <h3 className="font-semibold text-foreground mb-4">Información del jugador (opcional)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><Label htmlFor="playerId">ID de Jugador</Label><Input id="playerId" placeholder="Ej: 123456789" className="mt-1.5" /></div>
              <div><Label htmlFor="notes">Notas</Label><Input id="notes" placeholder="Instrucciones adicionales" className="mt-1.5" /></div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-8">
            <Button variant={filter === 'all' ? 'default' : 'outline'} onClick={() => setFilter('all')}>Todos</Button>
            <Button variant={filter === 'currency' ? 'default' : 'outline'} onClick={() => setFilter('currency')} className="gap-2"><Coins className="h-4 w-4" />{game.currencyName}</Button>
            <Button variant={filter === 'battlepass' ? 'default' : 'outline'} onClick={() => setFilter('battlepass')} className="gap-2"><Ticket className="h-4 w-4" />Pase de Batalla</Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {offers.map((offer) => (<OfferCard key={offer.id} offer={offer} gameName={game.name} />))}
          </div>

          <div className="mt-8 p-4 bg-muted/50 rounded-lg flex items-start gap-3">
            <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">Todas las compras requieren confirmación manual por nuestro equipo. Te contactaremos por WhatsApp para completar tu pedido.</p>
          </div>
        </div>
      </section>
      <Footer />
      <FloatingWhatsAppButton />
    </div>
  );
}
