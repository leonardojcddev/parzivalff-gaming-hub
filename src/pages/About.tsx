import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/ui/hero';
import { SectionTitle } from '@/components/ui/section-title';
import { FloatingWhatsAppButton } from '@/components/ui/floating-whatsapp';
import { faqs } from '@/data/mockData';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Target, Zap, Heart, ShieldCheck } from 'lucide-react';
import { Session } from '@supabase/supabase-js';

const values = [
  { icon: Zap, title: 'Rapidez', description: 'Entregas en minutos, no en horas. Tu tiempo es valioso.' },
  { icon: Heart, title: 'Confianza', description: 'Miles de clientes satisfechos avalan nuestra reputación.' },
  { icon: ShieldCheck, title: 'Seguridad', description: 'Proceso 100% transparente y seguro para ti.' },
];

interface AboutProps {
  session: Session | null;
  profile: any;
}

export default function About({ session, profile }: AboutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar session={session} profile={profile} />
      <Hero title="Sobre ParzivalFF Recargas" subtitle="Tu socio de confianza para recargas gaming en Latinoamérica" size="sm" />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <Target className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="font-gaming text-2xl font-bold text-foreground mb-4">Nuestra Historia</h2>
            <p className="text-muted-foreground leading-relaxed">
              ParzivalFF Recargas nació de la pasión por los videojuegos y la necesidad de ofrecer un servicio de recargas confiable y accesible para la comunidad gamer latinoamericana. Desde nuestros inicios, nos hemos comprometido a brindar los mejores precios y la atención más rápida del mercado.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <div key={index} className="gaming-card p-6 text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                  <value.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-gaming font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <SectionTitle title="Preguntas Frecuentes" highlight="Frecuentes" subtitle="Resolvemos tus dudas más comunes" />
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id} className="gaming-card border-none px-6">
                  <AccordionTrigger className="text-left font-medium text-foreground hover:text-primary">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsAppButton />
    </div>
  );
}
