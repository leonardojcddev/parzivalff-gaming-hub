import { Star, BadgeCheck } from 'lucide-react';
import { Review } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface ReviewCardProps {
  review: Review;
  className?: string;
}

export function ReviewCard({ review, className }: ReviewCardProps) {
  return (
    <div className={cn('gaming-card p-5 flex flex-col', className)}>
      <div className="flex items-center gap-1 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn('h-4 w-4', i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted')}
          />
        ))}
      </div>
      <p className="text-foreground text-sm leading-relaxed mb-4 flex-1">"{review.comment}"</p>
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center gap-2">
          <span className="font-medium text-foreground">{review.userName}</span>
          {review.verified && <BadgeCheck className="h-4 w-4 text-primary" />}
        </div>
        <span className="text-xs text-muted-foreground">{review.gameName}</span>
      </div>
    </div>
  );
}
