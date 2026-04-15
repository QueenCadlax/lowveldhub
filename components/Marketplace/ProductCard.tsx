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
      className="group bg-black rounded-2xl overflow-hidden transition-transform duration-300 hover:shadow-[0_24px_80px_rgba(212,175,55,0.12)] hover:-translate-y-1 cursor-pointer border border-white/6"
      style={{
        display: 'flex',
        flexDirection: window.innerWidth < 640 ? 'row' : 'column',
        height: window.innerWidth < 640 ? '140px' : (window.innerWidth < 1024 ? '360px' : '420px'),
      }}
    >
      {/* Image Container - Responsive Sizing */}
      <div className="relative bg-[#070707] overflow-hidden flex-shrink-0" style={{
        width: window.innerWidth < 640 ? '140px' : '100%',
        height: window.innerWidth < 640 ? '140px' : (window.innerWidth < 768 ? '180px' : (window.innerWidth < 1024 ? '240px' : '280px')),
      }}>
        {/* Image guaranteed by hard render rule above */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={firstImage} alt={product.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />

        {/* price overlay */}
        <div className="absolute bottom-1 left-1 sm:bottom-2 sm:left-2 bg-black/30 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full border border-white/6">
          <span className="text-gray-300 text-xs">{priceLabel}</span>
        </div>

        {/* favorite button */}
        <button onClick={(e) => e.stopPropagation()} className="absolute top-1 right-1 sm:top-2 sm:right-2 p-1 sm:p-2 rounded-full bg-black/50 text-gold-300 border border-white/6 hover:bg-black/70 transition-all">
          <Heart size={12} className="sm:w-4 sm:h-4" />
        </button>

        {/* quick action: View only - hidden on mobile */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:flex">
          <div className="flex gap-3 bg-black/40 p-2 rounded-full">
            <button onClick={(e) => { e.stopPropagation(); onView?.(product); }} className="p-2 rounded-full bg-black/70 text-[#ffd700] hover:bg-gold-300/20 transition-all"><Eye size={16} /></button>
          </div>
        </div>
      </div>

      {/* Content Section - Full Width */}
      <div className="flex-1 p-1.5 sm:p-3 md:p-4 flex flex-col justify-between" style={{ minWidth: window.innerWidth < 640 ? '0' : 'auto' }}>
        {/* Top Section - Brand & Title */}
        <div className="min-w-0">
          <div className="text-xs uppercase text-gray-400 tracking-wider line-clamp-1">{product.brand || ''}</div>
          <h3 className="text-xs sm:text-base md:text-lg font-semibold text-white line-clamp-2 sm:line-clamp-2 mt-0.5 sm:mt-1">{product.title}</h3>
        </div>

        {/* Rating & Button - Compact Row */}
        <div className="flex items-end justify-between gap-1 mt-1 sm:mt-2 min-w-0">
          {/* Rating */}
          <div className="flex items-center gap-0.5 sm:gap-2 flex-shrink-0">
            <Star size={11} className="sm:w-4 sm:h-4 text-gold-400" />
            <span className="text-xs sm:text-sm font-medium text-white">{product.rating?.toFixed(1) || '—'}</span>
            <span className="text-xs text-gray-500 hidden sm:inline">({product.reviewCount || 0})</span>
          </div>

          {/* View Button - Touch-friendly on mobile */}
          <MarketButton 
            onClick={(e: any) => { e.stopPropagation(); onView?.(product); }} 
            className="px-1.5 sm:px-3 py-0.5 sm:py-2 text-xs sm:text-sm bg-black/70 border border-white/6 flex-shrink-0 hover:border-gold-300/50 transition-all whitespace-nowrap"
          >
            View
          </MarketButton>
        </div>
      </div>
    </article>
  );
}

