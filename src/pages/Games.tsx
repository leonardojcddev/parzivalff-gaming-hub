import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/ui/hero';
import { GameCard } from '@/components/cards/GameCard';
import { FloatingWhatsAppButton } from '@/components/ui/floating-whatsapp';
import { games } from '@/data/mockData';
import { Session } from '@supabase/supabase-js';

interface GamesProps {
  session: Session | null;
  profile: any;
}

export default function Games({ session, profile }: GamesProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar session={session} profile={profile} />
      <Hero title="Nuestros Juegos" subtitle="Selecciona tu juego favorito y encuentra las mejores ofertas de recargas" size="sm" />
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game) => (<GameCard key={game.id} game={game} />))}
          </div>
        </div>
      </section>
      <Footer />
      <FloatingWhatsAppButton />
    </div>
  );
}
