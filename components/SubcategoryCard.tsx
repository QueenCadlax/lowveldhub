import React, { useState } from 'react';
import { Business } from '../types';
import { MapPin, Star, Heart, ChevronRight } from 'lucide-react';

type Props = {
  business: Business;
  onClick?: (b: Business) => void;
  primaryCTA?: string;
  secondaryCTA?: string;
  isCompact?: boolean;
};

/**
 * ULTRA-COMPACT MOBILE CARD
 * TikTok-inspired: minimal height (~140px total), gorgeous typography, high info density
 * Perfect for mobile scrolling with 8-10 cards per screen
 */
const SubcategoryCard: React.FC<Props> = ({ business, onClick, primaryCTA, secondaryCTA, isCompact = false }) => {
  const [saved, setSaved] = useState(false);
  const img = (business as any).image || (business.images && business.images[0]) || '';
  const isElite = (business as any).isElite || business.tier === 'Elite';
  const isPlatinum = (business as any).isPlatinum || business.tier === 'Platinum';

  const handleClick = (e?: React.MouseEvent) => {
    e && e.stopPropagation();
    onClick && onClick(business);
  };

  // ===================== COMPACT MODE (MOBILE) =====================
  if (isCompact) {
    return (
      <div
        onClick={handleClick}
        className="group cursor-pointer rounded-lg overflow-hidden bg-black border border-white/5 shadow-sm transition-all duration-300 hover:border-[#E0C36A]/40 hover:shadow-lg hover:shadow-[#E0C36A]/10 flex flex-col h-full"
      >
        {/* IMAGE: 70px height - ultra compact */}
        <div className="relative overflow-hidden flex-shrink-0 bg-gradient-to-br from-gray-800 to-black" style={{ height: '70px' }}>
          <img
            src={img}
            alt={business.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1505691723518-36a5f3b2c74b?auto=format&fit=crop&q=80&w=1200'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* TIER BADGE */}
          {(isPlatinum || isElite) && (
            <div className="absolute top-1 left-1 z-10">
              {isPlatinum ? (
                <span className="inline-block bg-gradient-to-r from-purple-600 to-purple-500 text-white text-[7px] font-black uppercase px-1.5 py-0.5 rounded-full">PLATINUM</span>
              ) : (
                <span className="inline-block bg-[#E0C36A] text-black text-[7px] font-black uppercase px-1.5 py-0.5 rounded-full">ELITE</span>
              )}
            </div>
          )}

          {/* FAVORITE ICON */}
          <button
            onClick={(e) => { e.stopPropagation(); setSaved(s => !s); }}
            className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/50 flex items-center justify-center hover:bg-[#E0C36A] transition-all z-10"
          >
            <Heart size={10} className={`${saved ? 'text-[#E0C36A] fill-[#E0C36A]' : 'text-white'}`} />
          </button>

          {/* RATING */}
          {business.rating && (
            <div className="absolute bottom-1 left-1 z-10 flex items-center gap-0.5 bg-black/70 backdrop-blur-sm px-1 py-0.5 rounded">
              <Star size={8} className="text-[#E0C36A] fill-[#E0C36A]" />
              <span className="text-white text-[9px] font-bold">{business.rating.toFixed(1)}</span>
            </div>
          )}
        </div>

        {/* CONTENT: Super minimal spacing */}
        <div className="flex-1 flex flex-col px-1.5 py-1 gap-0.5">
          {/* TITLE */}
          <h3 className="text-[11px] font-serif font-semibold text-white line-clamp-1 leading-tight">
            {business.name}
          </h3>

          {/* LOCATION */}
          {business.location && (
            <div className="flex items-center gap-0.5 text-gray-500 text-[9px] line-clamp-1">
              <MapPin size={8} className="text-[#E0C36A] flex-shrink-0" />
              <span className="truncate">{business.location}</span>
            </div>
          )}

          {/* CATEGORY */}
          <div className="text-[8px] text-gray-600 line-clamp-1">
            {business.subcategory || business.tags?.[0] || 'Featured'}
          </div>

          {/* CTA BUTTON */}
          <button
            onClick={handleClick}
            className="mt-auto w-full bg-gradient-to-r from-[#E0C36A] to-[#C9A24D] text-black px-1.5 py-1 rounded text-[9px] font-bold uppercase tracking-wide hover:shadow-lg hover:shadow-[#E0C36A]/30 transition-all flex items-center justify-center gap-0.5 group/btn"
          >
            <span>{primaryCTA || 'View'}</span>
            <ChevronRight size={9} className="group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    );
  }

  // ===================== NORMAL MODE (DESKTOP) =====================
  return (
    <div
      onClick={handleClick}
      className="group cursor-pointer rounded-[18px] overflow-hidden bg-[#0b0b0b] border border-white/5 shadow-sm transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="relative" style={{ aspectRatio: '3 / 4' }}>
        <img
          src={img}
          alt={business.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1505691723518-36a5f3b2c74b?auto=format&fit=crop&q=80&w=1200'; }}
        />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

        <div className="absolute top-3 left-3 flex gap-2">
          {isPlatinum && (
            <div className="bg-gradient-to-r from-[#E0C36A] to-[#C9A24D] text-black text-[10px] font-bold uppercase px-3 py-1 rounded-full shadow-[0_6px_20px_rgba(201,162,77,0.18)]">PLATINUM</div>
          )}
          {isElite && !isPlatinum && (
            <div className="bg-[#111] text-[#E0C36A] text-[11px] font-medium px-2 py-1 rounded-full border border-[#E0C36A]/10">ELITE</div>
          )}
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); setSaved(s => !s); }}
          aria-label={saved ? 'Remove from favorites' : 'Add to favorites'}
          className="absolute right-3 top-3 w-9 h-9 rounded-full bg-black/40 flex items-center justify-center backdrop-blur-sm border border-white/6"
        >
          <Heart size={16} className={`${saved ? 'text-[#C9A24D]' : 'text-white'}`} />
        </button>
      </div>

      <div className="p-4 bg-[#0b0b0b]">
        <div className="mb-2">
          <h3 className="text-lg md:text-xl font-serif text-white leading-tight line-clamp-2">{business.name}</h3>

          <div className="flex items-center gap-3 mt-2 text-sm text-gray-300">
            {business.rating ? (
              <div className="flex items-center gap-1 text-[#E0C36A] font-semibold">
                <Star size={14} className="text-[#E0C36A]" /> <span className="text-xs">{(business.rating || 0).toFixed(1)}</span>
                <span className="text-gray-400 text-[10px]">({business.reviewCount || 0})</span>
              </div>
            ) : (
              <div className="text-xs text-gray-400">{(business.tags && business.tags[0]) || (business.subcategory || 'Popular')}</div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-300 mb-3">
          <div className="flex items-center gap-2"><MapPin size={14} className="text-[#C9A24D]"/> <span>{business.location || 'Mpumalanga'}</span></div>
        </div>

        <div className="text-sm text-gray-300 mb-3 line-clamp-2">{business.description || business.tags?.join(' · ') || ''}</div>

        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-400 uppercase tracking-wider">{isPlatinum ? 'Platinum' : isElite ? 'Elite' : 'Featured'}</div>

          <div className="flex gap-2">
            <button onClick={() => handleClick()} className="bg-gradient-to-r from-[#E0C36A] to-[#C9A24D] text-black px-3 py-2 rounded-lg text-sm font-semibold">{primaryCTA || 'Discover'}</button>
            <button onClick={(e) => { e.stopPropagation(); /* secondary action placeholder */ }} className="border border-[#C9A24D]/20 text-[#E0C36A] px-3 py-2 rounded-lg text-sm">{secondaryCTA || 'Inquire'}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubcategoryCard;
