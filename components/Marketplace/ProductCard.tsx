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
      className="group bg-black rounded-2xl overflow-hidden transition-transform duration-300 hover:shadow-[0_24px_80px_rgba(212,175,55,0.12)] hover:-translate-y-1 cursor-pointer border border-white/6 flex flex-col h-96"
    >
      {/* Image-first fixed area */}
      <div className="relative w-full h-56 bg-[#070707] overflow-hidden flex-shrink-0">
        {/* Image guaranteed by hard render rule above */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={firstImage} alt={product.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />

        {/* price overlay */}
        <div className="absolute bottom-3 left-3 bg-black/30 px-2 py-1 rounded-full border border-white/6">
          <span className="text-gray-300 text-xs">{priceLabel}</span>
        </div>

        {/* favorite */}
        <button onClick={(e) => e.stopPropagation()} className="absolute top-3 right-3 p-2 rounded-full bg-black/50 text-gold-300 border border-white/6">
          <Heart size={14} />
        </button>

        {/* quick action: View only (marketplace is discovery-first) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex gap-3 bg-black/40 p-2 rounded-full">
            <button onClick={(e) => { e.stopPropagation(); onView?.(product); }} className="p-2 rounded-full bg-black/70 text-[#ffd700]"><Eye size={16} /></button>
          </div>
        </div>
      </div>

      {/* Content minimal, fixed height to enforce equal card heights */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <div className="text-xs uppercase text-gray-400 tracking-wider">{product.brand || ''}</div>
          <h3 className="text-lg font-semibold text-white truncate mt-1">{product.title}</h3>
        </div>

        <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
            <Star size={14} className="text-gold-400" />
            <span className="text-sm font-medium text-white">{product.rating?.toFixed(1) || '—'}</span>
            <span className="text-xs text-gray-500">({product.reviewCount || 0})</span>
          </div>

          <div className="flex items-center gap-2">
            <MarketButton onClick={(e: any) => { e.stopPropagation(); onView?.(product); }} className="px-3 py-2 text-sm bg-black/70 border border-white/6">View Piece</MarketButton>
          </div>
        </div>
      </div>
    </article>
  );
}

