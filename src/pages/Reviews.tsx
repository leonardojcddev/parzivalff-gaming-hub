import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/ui/hero';
import { SectionTitle } from '@/components/ui/section-title';
import { ReviewCard } from '@/components/cards/ReviewCard';
import { FloatingWhatsAppButton } from '@/components/ui/floating-whatsapp';
import { reviews } from '@/data/mockData';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Star } from 'lucide-react';
import { Session } from '@supabase/supabase-js';

interface ReviewsProps {
  session: Session | null;
  profile: any;
}

export default function Reviews({ session, profile }: ReviewsProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar session={session} profile={profile} />
      <Hero title="Referencias de Clientes" subtitle="Miles de gamers confían en nosotros. Lee lo que dicen sobre nuestro servicio." size="sm" />
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {reviews.map((review) => (<ReviewCard key={review.id} review={review} />))}
          </div>

          <div className="max-w-xl mx-auto">
            <SectionTitle title="Deja tu Reseña" highlight="Reseña" subtitle="¿Ya compraste con nosotros? Cuéntanos tu experiencia" />
            <div className="gaming-card p-6 space-y-4">
              <div><Label>Tu nombre</Label><Input placeholder="Ej: Juan P." className="mt-1.5" /></div>
              <div><Label>Juego</Label><Input placeholder="Ej: Free Fire" className="mt-1.5" /></div>
              <div>
                <Label>Calificación</Label>
                <div className="flex gap-1 mt-1.5">{Array.from({ length: 5 }).map((_, i) => (<button key={i} className="p-1"><Star className="h-6 w-6 text-muted hover:text-yellow-500 transition-colors" /></button>))}</div>
              </div>
              <div><Label>Tu comentario</Label><Textarea placeholder="Cuéntanos sobre tu experiencia..." className="mt-1.5" rows={4} /></div>
              <Button className="w-full gradient-primary">Enviar Reseña</Button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <FloatingWhatsAppButton />
    </div>
  );
}
