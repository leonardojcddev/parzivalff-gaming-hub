import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  highlight?: string;
  centered?: boolean;
  className?: string;
  children?: ReactNode;
}

export function SectionTitle({ 
  title, 
  subtitle, 
  highlight,
  centered = true, 
  className,
  children 
}: SectionTitleProps) {
  const renderTitle = () => {
    if (highlight) {
      const parts = title.split(highlight);
      return (
        <>
          {parts[0]}
          <span className="text-primary">{highlight}</span>
          {parts[1]}
        </>
      );
    }
    return title;
  };

  return (
    <div className={cn(
      'mb-8 md:mb-12',
      centered && 'text-center',
      className
    )}>
      <h2 className="font-gaming font-bold text-2xl sm:text-3xl md:text-4xl text-foreground mb-3">
        {renderTitle()}
      </h2>
      {subtitle && (
        <p className={cn(
          'text-muted-foreground text-base md:text-lg max-w-2xl',
          centered && 'mx-auto'
        )}>
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
}
