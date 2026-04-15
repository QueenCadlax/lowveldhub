import React from 'react';
import { Product } from '../../types';
import { Star, Heart, Eye, ShoppingCart } from 'lucide-react';
import { MarketButton } from '../Shared';

interface ProductCardProps {
  product: Product;
  onView?: (p: Product) => void;
  onAddToCart?: (p: Product) => void;
}

export default function ProductCard({ product, onView, onAddToCart }: ProductCardProps) {
  const firstImage = product.images?.[0] || '';

  // HARD RENDER RULE: only render marketplace product cards when essential data exists
  const hasImage = !!firstImage;
  const hasTitle = !!product.title;
  const hasPrice = (typeof product.priceValue === 'number' && !Number.isNaN(product.priceValue)) || (product.price && product.price !== 'Price on request');
  if (!hasImage || !hasTitle || !hasPrice || product.price === 'Price on request') return null;

  const formatPrice = (p?: number, raw?: string) => {
    try {
      if (typeof p === 'number' && !Number.isNaN(p)) {
        return new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 }).format(p);
      }
    } catch (e) {}
    return raw || 'Price on request';
  };

  const priceLabel = formatPrice(product.priceValue, product.price);

  return (
    <article
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onView?.(product)}
      onClick={() => onView?.(product)}
      className="group bg-black rounded-2xl overflow-hidden transition-transform duration-300 hover:shadow-[0_24px_80px_rgba(212,175,55,0.12)] hover:-translate-y-1 cursor-pointer border border-white/6 flex flex-col h-auto sm:h-96 md:h-[420px] lg:h-96"
    >
      {/* Image-first responsive area */}
      <div className="relative w-full h-40 sm:h-48 md:h-56 bg-[#070707] overflow-hidden flex-shrink-0">
        {/* Image guaranteed by hard render rule above */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={firstImage} alt={product.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />

        {/* price overlay */}
        <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 bg-black/30 px-2 py-1 rounded-full border border-white/6">
          <span className="text-gray-300 text-xs">{priceLabel}</span>
        </div>

        {/* favorite */}
        <button onClick={(e) => e.stopPropagation()} className="absolute top-2 right-2 sm:top-3 sm:right-3 p-1.5 sm:p-2 rounded-full bg-black/50 text-gold-300 border border-white/6 hover:bg-black/70 transition-all">
          <Heart size={14} className="sm:w-4 sm:h-4" />
        </button>

        {/* quick action: View only (marketplace is discovery-first) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex gap-3 bg-black/40 p-2 rounded-full">
            <button onClick={(e) => { e.stopPropagation(); onView?.(product); }} className="p-2 rounded-full bg-black/70 text-[#ffd700] hover:bg-gold-300/20 transition-all"><Eye size={16} /></button>
          </div>
        </div>
      </div>

      {/* Content - Responsive Padding */}
      <div className="p-2 sm:p-3 md:p-4 flex flex-col flex-1 justify-between">
        <div>
          <div className="text-xs uppercase text-gray-400 tracking-wider line-clamp-1">{product.brand || ''}</div>
          <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white line-clamp-2 mt-1">{product.title}</h3>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mt-3 sm:mt-4">
            <div className="flex items-center gap-1 sm:gap-2">
            <Star size={13} className="sm:w-4 sm:h-4 text-gold-400" />
            <span className="text-xs sm:text-sm font-medium text-white">{product.rating?.toFixed(1) || '—'}</span>
            <span className="text-xs text-gray-500 hidden sm:inline">({product.reviewCount || 0})</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <MarketButton onClick={(e: any) => { e.stopPropagation(); onView?.(product); }} className="px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm bg-black/70 border border-white/6 flex-1 sm:flex-none hover:border-gold-300/50 transition-all">View Piece</MarketButton>
          </div>
        </div>
      </div>
    </article>
  );
}

