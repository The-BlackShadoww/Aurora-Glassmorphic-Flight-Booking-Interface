import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
}

export default function GlassCard({ children, className, hover = false }: GlassCardProps) {
    return (
        <div
            className={cn(
                'glass-card', // Using our custom class from globals.css
                hover && 'glass-card-hover',
                className
            )}
        >
            {children}
        </div>
    );
}