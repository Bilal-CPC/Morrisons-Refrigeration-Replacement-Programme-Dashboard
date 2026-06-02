import { cn } from '@/lib/utils';

type BadgeVariant = 'default' | 'outline' | 'green' | 'amber' | 'red' | 'blue' | 'violet' | 'gold';

const variants: Record<BadgeVariant, string> = {
  default: 'bg-slate-100 text-slate-700',
  outline: 'border border-slate-200 text-slate-600',
  green: 'bg-emerald-100 text-emerald-700',
  amber: 'bg-amber-100 text-amber-700',
  red: 'bg-red-100 text-red-700',
  blue: 'bg-blue-100 text-blue-700',
  violet: 'bg-violet-100 text-violet-700',
  gold: 'bg-gold-100 text-gold-600',
};

export function Badge({
  variant = 'default',
  className,
  children,
}: {
  variant?: BadgeVariant;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold',
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
