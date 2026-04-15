import React from 'react';
import { Star, MapPin, Heart } from 'lucide-react';
import { Business, ListingTier } from '../types';

interface AirbnbPremiumCardProps {
  business: Business;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onClick: () => void;
}

const AirbnbPremiumCard: React.FC<AirbnbPremiumCardProps> = React.memo(({
  business,
  isFavorite,
  onToggleFavorite,
  onClick
}) => {
  // Extract vibe from description or generate minimal one
  const getVibeText = (name: string, description?: string) => {
    if (!description) return name;
    // Take first 6-8 words max
    const words = description.split(' ').slice(0, 8).join(' ');
    return words.length > 60 ? words.substring(0, 60) + '...' : words;
  };

  const vibeText = getVibeText(business.name, business.description);
  const isPlatinum = business.tier === ListingTier.Platinum;
  const isElite = business.tier === ListingTier.Elite;
  const badgeLabel = isPlatinum ? 'Platinum' : isElite ? 'Elite' : null;
  const badgeColor = isPlatinum 
    ? 'bg-purple-600/90 text-purple-50' 
    : isElite 
    ? 'bg-gold-600/90 text-gold-50' 
    : '';

  return (
    <div 
      onClick={onClick}
      className="group cursor-pointer flex flex-col h-full bg-gradient-to-b from-[#1A1A1A] to-[#0B0B0B] rounded-2xl overflow-hidden border border-white/8 hover:border-white/20 transition-all duration-400 hover:shadow-2xl hover:shadow-gold-500/5 hover:-translate-y-2"
    >
      {/* Image Container - Visual First */}
      <div className="relative overflow-hidden bg-gray-950 aspect-square">
        <img 
          src={business.image} 
          alt={business.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        
        {/* Soft Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />

        {/* Favorite Button - Minimal */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-black/40 hover:bg-black/60 transition-all duration-300 backdrop-blur-sm hover:scale-110"
        >
          <Heart 
            size={18} 
            className={isFavorite ? 'fill-gold-400 text-gold-400' : 'text-white/70 group-hover:text-white'} 
          />
        </button>

        {/* Badge - Small & Elegant (top-left) */}
        {badgeLabel && (
          <div className={`absolute top-3 left-3 ${badgeColor} text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm`}>
            {badgeLabel}
          </div>
        )}
      </div>

      {/* Content Container - Minimal & Scannable */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        
        {/* Name - Bold & Clean */}
        <div>
          <h3 className="text-sm font-bold text-white group-hover:text-gold-400 transition line-clamp-1 mb-3">
            {business.name}
          </h3>

          {/* Meta Row - Rating & Location Inline */}
          <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
            <div className="flex items-center gap-1">
              <Star size={12} className="fill-gold-500 text-gold-500" />
              <span className="font-semibold text-white">
                {(business.rating || 4.5).toFixed(1)}
              </span>
              <span className="text-gray-500">
                ({business.reviewCount || 0})
              </span>
            </div>
            <div className="flex items-center gap-1 text-gray-500">
              <MapPin size={12} />
              <span className="line-clamp-1">{business.location}</span>
            </div>
          </div>
        </div>

        {/* One-Line Vibe - The Heart of Airbnb UX */}
        {vibeText && (
          <p className="text-xs text-gray-300 italic mb-4 line-clamp-1 min-h-4 leading-tight">
            {vibeText}
          </p>
        )}

        {/* Discover Button - Minimal CTA */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          className="w-full py-2.5 text-xs font-semibold text-black bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-gold-500/20"
        >
          Discover
        </button>
      </div>
    </div>
  );
});

AirbnbPremiumCard.displayName = 'AirbnbPremiumCard';

export default AirbnbPremiumCard;
