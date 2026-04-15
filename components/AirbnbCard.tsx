import React from 'react';
import { Star, Heart } from 'lucide-react';
import { Business, ListingTier } from '../types';

interface AirbnbCardProps {
  business: Business;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onClick: () => void;
}

const AirbnbCard: React.FC<AirbnbCardProps> = React.memo(({
  business,
  isFavorite,
  onToggleFavorite,
  onClick
}) => {
  const isPlatinum = business.tier === ListingTier.Platinum;
  const isElite = business.tier === ListingTier.Elite;
  const goldColor = '#C9A24D';

  return (
    <div 
      onClick={onClick}
      className="group cursor-pointer flex flex-col h-full rounded-2xl overflow-hidden bg-transparent hover:shadow-xl transition-all duration-300"
    >
      {/* IMAGE CONTAINER - Responsive Aspect Ratio + Luxury Border */}
      <div 
        className="relative overflow-hidden bg-gray-200 rounded-2xl border border-white/5 group-hover:border-white/15 transition-all duration-300" 
        style={{ aspectRatio: 'clamp(9/16, 4/3, 4/3)' }}
      >
        <img 
          src={business.image} 
          alt={business.name}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Gradient Overlay - Enhanced on Hover */}
        <div 
          className="absolute inset-0 transition-all duration-500 group-hover:opacity-100"
          style={{
            background: 'linear-gradient(to bottom, transparent, transparent, rgba(0,0,0,0.2))',
            opacity: 0.15
          }}
        />

        {/* Favorite Button - Luxury Animation */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          className="absolute top-3 right-3 p-2 rounded-full transition-all duration-300 shadow-lg hover:scale-110 active:scale-95"
          style={{
            backgroundColor: goldColor,
            opacity: 0.9
          }}
        >
          <Heart 
            size={18} 
            className={`text-white transition-all duration-300 ${isFavorite ? 'scale-125' : 'scale-100'}`}
            fill="white"
          />
        </button>

        {/* Badge - Luxury Styling with Glow */}
        {(isPlatinum || isElite) && (
          <div 
            className="absolute top-3 left-3 px-3 py-1.5 rounded-full shadow-lg font-semibold text-xs backdrop-blur-sm transition-all duration-300 group-hover:shadow-xl"
            style={{
              backgroundColor: isPlatinum ? 'rgba(147, 51, 234, 0.95)' : `${goldColor}f2`,
              color: isPlatinum ? '#f3e8ff' : '#000000',
              boxShadow: isPlatinum ? `0 0 20px rgba(147, 51, 234, 0.3)` : `0 0 20px rgba(201, 162, 77, 0.3)`
            }}
          >
            {isPlatinum ? '👑 Platinum' : '✨ Elite'}
          </div>
        )}
      </div>

      {/* CONTENT - Luxury Premium Section with Responsive Padding */}
      <div className="flex-1 pt-3 md:pt-3 px-2 md:px-3 pb-3 flex flex-col bg-gradient-to-b from-black/40 to-black/60 backdrop-blur-sm rounded-b-2xl space-y-2 border-x border-b border-white/5 group-hover:border-white/10 transition-all duration-300">
        
        {/* Title - Responsive Font with Luxury Styling */}
        <h3 
          className="text-xs md:text-sm font-semibold text-white line-clamp-2 leading-snug cursor-pointer"
          style={{
            textShadow: `0 2px 4px rgba(0,0,0,0.5)`,
            fontFamily: 'system-ui, -apple-system, sans-serif',
            letterSpacing: '0.3px',
            transition: 'color 300ms ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = goldColor}
          onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
        >
          {business.name}
        </h3>

        {/* Location - Subtle, Mobile Optimized */}
        <p className="text-xs text-white/70 font-normal truncate">
          📍 {business.location}
        </p>

        {/* Divider Line - Subtle Gold Gradient */}
        <div 
          className="h-px my-1 opacity-60 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `linear-gradient(90deg, transparent, ${goldColor}, transparent)` }}
        />

        {/* Rating Row - Premium Layout */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 md:gap-2 flex-wrap">
            <Star 
              size={13}
              className="md:w-4 md:h-4"
              fill={goldColor}
              color={goldColor}
            />
            <span className="text-xs font-semibold text-white">
              {(business.rating || 4.5).toFixed(1)}
            </span>
            <span 
              className="text-xs opacity-70 hidden sm:inline"
              style={{ color: `${goldColor}80` }}
            >
              ({business.reviewCount || 0})
            </span>
          </div>
        </div>

        {/* Description - Poetic, Luxury Feel with Better Mobile */}
        {business.description && (
          <p 
            className="text-xs leading-relaxed line-clamp-2 italic font-light"
            style={{ 
              color: goldColor,
              opacity: 0.95
            }}
          >
            "{business.description.split(' ').slice(0, 8).join(' ')}"
          </p>
        )}
      </div>
    </div>
  );
});

AirbnbCard.displayName = 'AirbnbCard';

export default AirbnbCard;
