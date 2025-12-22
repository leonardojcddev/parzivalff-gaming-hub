import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface HeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  children?: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Hero({ 
  title, 
  subtitle, 
  backgroundImage, 
  children, 
  className,
  size = 'lg'
}: HeroProps) {
  const sizeClasses = {
    sm: 'py-20 md:py-28',
    md: 'py-28 md:py-36',
    lg: 'py-32 md:py-44',
  };

  return (
    <section
      className={cn(
        'relative overflow-hidden',
        sizeClasses[size],
        className
      )}
    >
      {/* Background Image */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <img
            src={backgroundImage}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 hero-overlay" />
        </div>
      )}

      {/* Decorative Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-gaming font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground mb-4 md:mb-6 animate-fade-in">
            {title.split(' ').map((word, index) => (
              <span key={index}>
                {word.toLowerCase() === 'parzivalff' || word.toLowerCase() === 'gaming' || word.toLowerCase() === 'recargas' ? (
                  <span className="text-primary text-glow-sm">{word}</span>
                ) : (
                  word
                )}
                {index < title.split(' ').length - 1 && ' '}
              </span>
            ))}
          </h1>
          
          {subtitle && (
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in animation-delay-100">
              {subtitle}
            </p>
          )}
          
          {children && (
            <div className="animate-fade-in animation-delay-200">
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
