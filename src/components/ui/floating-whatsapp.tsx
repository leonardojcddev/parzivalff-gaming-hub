import { MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FloatingWhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
  className?: string;
}

export function FloatingWhatsAppButton({ 
  phoneNumber = '1234567890',
  message = 'Hola! Me interesa hacer una recarga',
  className 
}: FloatingWhatsAppButtonProps) {
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'fixed bottom-6 right-6 z-50',
        'flex items-center justify-center',
        'w-14 h-14 md:w-16 md:h-16',
        'bg-[#25D366] hover:bg-[#20BD5A]',
        'rounded-full shadow-lg',
        'transition-all duration-300',
        'hover:scale-110 hover:shadow-xl',
        'animate-pulse-glow',
        className
      )}
      style={{
        boxShadow: '0 4px 20px rgba(37, 211, 102, 0.4)',
      }}
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="h-7 w-7 md:h-8 md:w-8 text-white" fill="white" />
    </a>
  );
}
