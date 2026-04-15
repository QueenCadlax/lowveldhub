import React from 'react';
import { Star, MapPin, MessageCircle, ShoppingBag } from 'lucide-react';
import { Retailer } from '../types';

interface RetailCardProps {
  retailer: Retailer;
  onView: (id: string) => void;
  onContact: (retailer: Retailer) => void;
}

const RetailCard: React.FC<RetailCardProps> = React.memo(({ retailer, onView, onContact }) => {
  const getTierBadge = () => {
    if (retailer.tier === 'Platinum') return { bg: 'bg-gold-500', text: 'text-black', label: 'PLATINUM' };
    if (retailer.tier === 'Elite') return { bg: 'bg-amber-500', text: 'text-black', label: 'ELITE' };
    return null;
  };

  const tierBadge = getTierBadge();

  return (
    <div className="group relative glass-card rounded-lg overflow-hidden cursor-pointer h-full flex flex-col border border-white/10 hover:border-gold-500/50 transition-all hover:shadow-lg hover:shadow-gold-500/10">
      {/* Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none z-10"></div>

      {/* Image Section - COMPACT */}
      <div className="relative h-28 md:h-40 overflow-hidden bg-black/40 flex-shrink-0">
        <img 
          src={retailer.image} 
          alt={retailer.name} 
          className="w-full h-full object-cover opacity-75 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>

        {/* Tier Badge */}
        {tierBadge && (
          <div className={`absolute top-2 right-2 z-20 ${tierBadge.bg} ${tierBadge.text} text-[10px] font-bold px-1.5 py-0.5 rounded shadow-lg`}>
            {tierBadge.label}
          </div>
        )}

        {/* Rating */}
        {retailer.rating && (
          <div className="absolute bottom-2 left-2 z-20 flex items-center gap-0.5 bg-black/60 backdrop-blur-sm px-1.5 py-0.5 rounded-full">
            <Star size={10} className="text-gold-500 fill-gold-500" />
            <span className="text-white text-xs font-semibold">{retailer.rating}</span>
          </div>
        )}
      </div>

      {/* Content Section - ULTRA COMPACT */}
      <div className="flex-1 flex flex-col p-1.5 md:p-2.5">
        {/* Store Name - ULTRA COMPACT */}
        <h3 className="text-xs md:text-sm font-serif text-white group-hover:text-gold-300 transition-colors truncate mb-0">
          {retailer.name}
        </h3>
        
        {/* Category - ULTRA COMPACT */}
        <p className="text-xs text-gray-400 mb-1 truncate">{retailer.subcategory}</p>

        {/* Location - ULTRA COMPACT */}
        <div className="flex items-center gap-1 text-gray-300 text-xs mb-0">
          <MapPin size={10} className="text-gold-500 flex-shrink-0" />
          <span className="truncate text-xs">{typeof retailer.location === 'string' ? retailer.location : retailer.location.area}</span>
        </div>

        {/* Price Range - HIDDEN ON MOBILE */}
        {retailer.priceRange && (
          <p className="hidden md:block text-xs text-gray-400 mb-1 truncate">Price: {retailer.priceRange}</p>
        )}

        {/* Tags - MINIMAL */}
        {retailer.tags && retailer.tags.length > 0 && (
          <div className="hidden md:flex flex-wrap gap-0.5 mb-1">
            {retailer.tags.slice(0, 2).map((tag, idx) => (
              <span key={idx} className="text-[9px] bg-black/40 text-gray-300 px-1 py-0.5 rounded-full truncate max-w-20">
                {tag}
              </span>
            ))}
            {retailer.tags.length > 2 && (
              <span className="text-[9px] text-gray-400">+{retailer.tags.length - 2}</span>
            )}
          </div>
        )}

        {/* Action Buttons - ULTRA COMPACT */}
        <div className="flex gap-0.5 mt-auto pt-1 border-t border-white/5">
          <button
            onClick={() => onView(retailer.id)}
            className="flex-1 px-1.5 py-1 bg-black/40 text-gray-200 text-xs rounded hover:bg-gold-500/20 transition-colors truncate"
          >
            Details
          </button>
          {retailer.onlineStore ? (
            <button
              onClick={() => retailer.website && window.open(retailer.website, '_blank')}
              className="px-2 py-1 bg-gold-500/10 text-gold-400 rounded hover:bg-gold-500/20 transition-colors flex items-center justify-center flex-shrink-0"
            >
              <ShoppingBag size={12} />
            </button>
          ) : (
            <button
              onClick={() => onView(retailer.id)}
              className="flex-1 px-2 py-1.5 bg-gold-500/10 text-gold-400 text-xs rounded hover:bg-gold-500/20 transition-colors flex items-center justify-center gap-1 flex-shrink-0"
            >
              <ShoppingBag size={12} />
            </button>
          )}
          <button
            onClick={() => onContact(retailer)}
            className="flex-1 px-2 py-1.5 bg-black/40 text-gray-200 text-xs rounded hover:bg-black/60 transition-colors flex items-center justify-center gap-1 flex-shrink-0"
          >
            <MessageCircle size={12} />
          </button>
        </div>
      </div>
    </div>
  );
});

RetailCard.displayName = 'RetailCard';
export default RetailCard;
