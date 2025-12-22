import { MessageCircle, Star } from 'lucide-react';
import { Offer } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface OfferCardProps {
  offer: Offer;
  gameName?: string;
  className?: string;
}

export function OfferCard({ offer, gameName, className }: OfferCardProps) {
  const whatsappMessage = `Hola! Quiero comprar: ${offer.name}${gameName ? ` para ${gameName}` : ''} - $${offer.price}`;
  const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className={cn(
      'relative gaming-card-hover p-5 flex flex-col',
      offer.popular && 'border-primary/50',
      className
    )}>
      {offer.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center gap-1">
          <Star className="h-3 w-3" fill="currentColor" /> POPULAR
        </div>
      )}
      
      <div className="flex items-start gap-4 mb-4">
        <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
          <img src={offer.image} alt={offer.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-xs text-primary font-medium uppercase">
            {offer.type === 'currency' ? 'Monedas' : 'Pase de Batalla'}
          </span>
          <h3 className="font-gaming font-semibold text-foreground truncate">{offer.name}</h3>
          <p className="text-sm text-muted-foreground">{offer.description}</p>
        </div>
      </div>

      <div className="mt-auto">
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-2xl font-bold text-primary">${offer.price.toFixed(2)}</span>
          {offer.originalPrice && (
            <>
              <span className="text-sm text-muted-foreground line-through">${offer.originalPrice.toFixed(2)}</span>
              {offer.discount && (
                <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full font-medium">
                  -{offer.discount}%
                </span>
              )}
            </>
          )}
        </div>
        
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="block">
          <Button className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white gap-2">
            <MessageCircle className="h-4 w-4" /> Comprar por WhatsApp
          </Button>
        </a>
      </div>
    </div>
  );
}
