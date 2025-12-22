import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CTAButtonProps {
  variant?: 'primary' | 'secondary' | 'whatsapp';
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'default' | 'lg';
  external?: boolean;
}

export function CTAButton({ 
  variant = 'primary', 
  href, 
  onClick, 
  children, 
  className,
  size = 'default',
  external = false
}: CTAButtonProps) {
  const baseStyles = cn(
    'font-semibold transition-all duration-300',
    'flex items-center gap-2',
    className
  );

  const variantStyles = {
    primary: 'gradient-primary text-primary-foreground hover:opacity-90 glow-sm hover:glow-md',
    secondary: 'bg-secondary text-secondary-foreground border border-border hover:border-primary/50 hover:bg-secondary/80',
    whatsapp: 'bg-[#25D366] hover:bg-[#20BD5A] text-white',
  };

  const sizeStyles = {
    sm: 'h-9 px-4 text-sm',
    default: 'h-11 px-6',
    lg: 'h-12 px-8 text-lg',
  };

  const buttonContent = (
    <>
      {variant === 'whatsapp' && <MessageCircle className="h-5 w-5" />}
      {children}
      {variant === 'primary' && <ArrowRight className="h-4 w-4" />}
    </>
  );

  if (href && external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        <Button 
          className={cn(baseStyles, variantStyles[variant], sizeStyles[size])}
        >
          {buttonContent}
        </Button>
      </a>
    );
  }

  if (href) {
    return (
      <Link to={href}>
        <Button 
          className={cn(baseStyles, variantStyles[variant], sizeStyles[size])}
        >
          {buttonContent}
        </Button>
      </Link>
    );
  }

  return (
    <Button 
      onClick={onClick}
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size])}
    >
      {buttonContent}
    </Button>
  );
}
