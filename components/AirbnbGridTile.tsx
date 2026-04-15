import React from 'react';
import { Star, Heart } from 'lucide-react';
import { Business, ListingTier } from '../types';

interface AirbnbGridTileProps {
  business: Business;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onClick: () => void;
}

const AirbnbGridTile: React.FC<AirbnbGridTileProps> = React.memo(({
  business,
  isFavorite,
  onToggleFavorite,
  onClick
}) => {
  const isPlatinum = business.tier === ListingTier.Platinum;
  const isElite = business.tier === ListingTier.Elite;
  const badgeText = isPlatinum ? 'Platinum' : isElite ? 'Elite' : null;

  return (
    <div 
      onClick={onClick}
      className="group cursor-pointer flex flex-col bg-black rounded-xl overflow-hidden border border-white/5 hover:border-white/15 transition-all duration-300 hover:shadow-lg hover:shadow-gold-500/5"
    >
      {/* IMAGE - 4:3 Aspect Ratio (Airbnb Standard) */}
      <div className="relative overflow-hidden bg-gray-900" style={{ aspectRatio: '4/3' }}>
        <img 
          src={business.image} 
          alt={business.name}
          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Soft Overlay - Subtle Enhancement */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />

        {/* Favorite Button - Top Right */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 hover:bg-black/70 transition backdrop-blur-sm z-10"
        >
          <Heart 
            size={14} 
            className={isFavorite ? 'fill-gold-400 text-gold-400' : 'text-white/60 group-hover:text-white/80'} 
          />
        </button>
      </div>

      {/* CONTENT - Balanced Footer (35-40% of card) */}
      <div className="p-3 flex flex-col gap-1.5">
        
        {/* Name + Badge Line */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-bold text-white line-clamp-2 flex-1 leading-tight">
            {business.name}
          </h3>
          {badgeText && (
            <span className={`text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap flex-shrink-0 ${
              isPlatinum 
                ? 'bg-purple-600/80 text-purple-50' 
                : 'bg-gold-600/80 text-gold-50'
            }`}>
              {badgeText}
            </span>
          )}
        </div>

        {/* Rating + Location Compact Line */}
        <div className="flex items-center gap-1.5 text-gray-400 text-xs">
          <div className="flex items-center gap-0.5 flex-shrink-0">
            <Star size={12} className="fill-gold-500 text-gold-500" />
            <span className="font-semibold text-white">{(business.rating || 4.5).toFixed(1)}</span>
          </div>
          <span className="text-gray-500">•</span>
          <span className="text-gray-400">{business.reviewCount || 0}</span>
          <span className="text-gray-500">•</span>
          <span className="text-gray-400 truncate">{business.location}</span>
        </div>

        {/* One-Line Vibe - Ultra Minimal */}
        {business.description && (
          <p className="text-xs text-gray-300 line-clamp-1 leading-tight">
            {business.description.split(' ').slice(0, 7).join(' ')}
          </p>
        )}
      </div>
    </div>
  );
});

AirbnbGridTile.displayName = 'AirbnbGridTile';

export default AirbnbGridTile;
