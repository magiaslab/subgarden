import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils/cn';

interface BrandNameProps {
  className?: string;
  variant?: 'color' | 'white';
}

export function BrandName({ className, variant = 'color' }: BrandNameProps) {
  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <span className="relative inline-block w-28 h-6 translate-y-[1px]">
        <Image
          src={variant === 'white' ? "/SUBGARDEN - LOGO BIANCO.png" : "/SUBGARDEN - LOGO COLORI.png"}
          alt="SUBGarden"
          fill
          className="object-contain"
        />
      </span>
    </span>
  );
}
