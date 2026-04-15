import React from 'react';
import { Star, MapPin, Heart } from 'lucide-react';
import { Business, ListingTier } from '../types';

interface AirbnbCompactCardProps {
  business: Business;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onClick: () => void;
}

const AirbnbCompactCard: React.FC<AirbnbCompactCardProps> = React.memo(({
  business,
  isFavorite,
  onToggleFavorite,
  onClick
}) => {
  const isPlatinum = business.tier === ListingTier.Platinum;
  const isElite = business.tier === ListingTier.Elite;
  const badgeLabel = isPlatinum ? 'Platinum' : isElite ? 'Elite' : 'Featured';
  const badgeColor = isPlatinum ? 'bg-purple-500/80' : isElite ? 'bg-gold-500/80' : 'bg-blue-500/80';

  return (
    <div 
      onClick={onClick}
      className="group cursor-pointer flex flex-col h-full bg-[#0B0B0B] rounded-xl overflow-hidden border border-white/8 hover:border-gold-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-gold-500/10 hover:-translate-y-1"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gray-900 h-48 sm:h-40 md:h-48">
        <img 
          src={business.image} 
          alt={business.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

        {/* Favorite Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          className="absolute top-2 right-2 p-2 rounded-full bg-black/60 hover:bg-black/80 transition z-10 backdrop-blur-sm"
        >
          <Heart 
            size={16} 
            className={isFavorite ? 'fill-gold-500 text-gold-500' : 'text-gray-300'} 
          />
        </button>

        {/* Tier Badge */}
        <div className={`absolute top-2 left-2 ${badgeColor} text-white text-xs font-bold px-2 py-1 rounded-full`}>
          {badgeLabel}
        </div>
      </div>

      {/* Content Container */}
      <div className="flex-1 p-3 flex flex-col">
        
        {/* Title */}
        <h3 className="text-sm font-bold text-white group-hover:text-gold-400 transition line-clamp-1 mb-2">
          {business.name}
        </h3>

        {/* Rating Row */}
        <div className="flex items-center gap-1 mb-2">
          <Star size={14} className="fill-gold-500 text-gold-500" />
          <span className="text-xs font-semibold text-white">
            {(business.rating || 4.5).toFixed(1)}
          </span>
          <span className="text-xs text-gray-400">
            ({business.reviewCount || 0})
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1 text-gray-400 text-xs mb-2 truncate">
          <MapPin size={12} className="flex-shrink-0" />
          <span className="truncate">{business.location}</span>
        </div>

        {/* Short Description */}
        {business.description && (
          <p className="text-xs text-gray-400 line-clamp-2 mb-3 flex-1">
            {business.description}
          </p>
        )}

        {/* CTA Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          className="w-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-black text-xs font-bold py-2 rounded-lg transition-all duration-300"
        >
          Discover
        </button>
      </div>
    </div>
  );
});

AirbnbCompactCard.displayName = 'AirbnbCompactCard';

export default AirbnbCompactCard;
