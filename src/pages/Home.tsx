import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/ui/hero';
import { SectionTitle } from '@/components/ui/section-title';
import { CTAButton } from '@/components/ui/cta-button';
import { TrustBadge } from '@/components/ui/trust-badge';
import { GameCard } from '@/components/cards/GameCard';
import { OfferCard } from '@/components/cards/OfferCard';
import { ReviewCard } from '@/components/cards/ReviewCard';
import { FloatingWhatsAppButton } from '@/components/ui/floating-whatsapp';
import { games, getFeaturedOffers, reviews } from '@/data/mockData';
import { Zap, Shield, HeadphonesIcon, Search, CreditCard, MessageCircle, Package } from 'lucide-react';

const steps = [
  { icon: Search, title: 'Elige tu juego', description: 'Selecciona entre nuestra amplia variedad de juegos disponibles' },
  { icon: CreditCard, title: 'Selecciona oferta', description: 'Escoge el paquete de diamantes o pase que necesitas' },
  { icon: MessageCircle, title: 'Contacta por WhatsApp', description: 'Envía tu ID de jugador y realiza el pago' },
  { icon: Package, title: 'Recibe tu recarga', description: 'En minutos recibirás tus diamantes o pase' },
];

export default function Home() {
  const featuredOffers = getFeaturedOffers();
  const featuredReviews = reviews.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <Hero
        title="Tu tienda de Recargas Gaming"
        subtitle="Diamantes, UC, Genesis Crystals y pases de batalla al mejor precio. Entrega rápida y 100% segura."
        backgroundImage="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1920&h=1080&fit=crop"
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <CTAButton href="/games" variant="primary" size="lg">Ver ofertas</CTAButton>
          <CTAButton href="https://wa.me/1234567890" variant="whatsapp" size="lg" external>
            Comprar por WhatsApp
          </CTAButton>
        </div>
      </Hero>

      {/* Trust Badges */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TrustBadge icon={Zap} title="Entrega Rápida" description="Recibe tu recarga en 5-15 minutos" />
            <TrustBadge icon={HeadphonesIcon} title="Soporte Humano" description="Atención personalizada por WhatsApp" />
            <TrustBadge icon={Shield} title="100% Seguro" description="Proceso transparente y confiable" />
          </div>
        </div>
      </section>

      {/* Games */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <SectionTitle title="Juegos Disponibles" highlight="Juegos" subtitle="Elige tu juego favorito y encuentra las mejores ofertas" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game) => (<GameCard key={game.id} game={game} />))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <SectionTitle title="¿Cómo Funciona?" highlight="Funciona" subtitle="Proceso simple y rápido en 4 pasos" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="relative text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
                <span className="absolute top-4 left-4 text-4xl font-gaming font-bold text-primary/20">{index + 1}</span>
                <h3 className="font-gaming font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Offers */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <SectionTitle title="Ofertas Destacadas" highlight="Destacadas" subtitle="Los paquetes más populares entre nuestros clientes" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredOffers.map((offer) => (<OfferCard key={offer.id} offer={offer} />))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <SectionTitle title="Lo que dicen nuestros clientes" highlight="clientes" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {featuredReviews.map((review) => (<ReviewCard key={review.id} review={review} />))}
          </div>
          <div className="text-center">
            <CTAButton href="/reviews" variant="secondary">Ver todas las referencias</CTAButton>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsAppButton />
    </div>
  );
}
