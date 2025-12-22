import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface TrustBadgeProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export function TrustBadge({ icon: Icon, title, description, className }: TrustBadgeProps) {
  return (
    <div className={cn(
      'flex flex-col items-center text-center p-6 rounded-xl',
      'bg-card border border-border',
      'transition-all duration-300',
      'hover:border-primary/30 hover:glow-sm',
      className
    )}>
      <div className="p-4 rounded-xl bg-primary/10 text-primary mb-4">
        <Icon className="h-8 w-8" />
      </div>
      <h3 className="font-gaming font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
