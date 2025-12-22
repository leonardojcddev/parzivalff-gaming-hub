import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Game } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface GameCardProps {
  game: Game;
  className?: string;
}

export function GameCard({ game, className }: GameCardProps) {
  return (
    <Link
      to={`/games/${game.slug}`}
      className={cn(
        'group relative overflow-hidden rounded-xl',
        'gaming-card-hover',
        'aspect-[4/3]',
        className
      )}
    >
      <img
        src={game.image}
        alt={game.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      <div className="absolute inset-0 p-5 flex flex-col justify-end">
        <h3 className="font-gaming font-bold text-xl text-foreground mb-1 group-hover:text-primary transition-colors">
          {game.name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{game.description}</p>
        <div className="flex items-center gap-2 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
          Ver ofertas <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </Link>
  );
}
