import React from 'react';
import { Star, MapPin, MessageCircle, Briefcase } from 'lucide-react';
import { ProfessionalService } from '../types';

interface BusinessCardProps {
  professional: ProfessionalService;
  onView: (id: string) => void;
  onContact: (professional: ProfessionalService) => void;
}

const BusinessCard: React.FC<BusinessCardProps> = React.memo(({ professional, onView, onContact }) => {
  const getTierBadge = () => {
    if (professional.tier === 'Platinum') return { bg: 'bg-gold-500', text: 'text-black', label: 'PLATINUM' };
    if (professional.tier === 'Elite') return { bg: 'bg-amber-500', text: 'text-black', label: 'ELITE' };
    return null;
  };

  const tierBadge = getTierBadge();

  return (
    <div className="group relative glass-card rounded-lg overflow-hidden cursor-pointer h-full flex flex-col border border-white/10 hover:border-gold-500/50 transition-all hover:shadow-lg hover:shadow-gold-500/10">
      {/* Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none z-10"></div>

      {/* Image Section - ULTRA COMPACT */}
      <div className="relative h-20 md:h-32 overflow-hidden bg-black/40 flex-shrink-0">
        <img 
          src={professional.image} 
          alt={professional.name} 
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
        {professional.rating && (
          <div className="absolute bottom-2 left-2 z-20 flex items-center gap-0.5 bg-black/60 backdrop-blur-sm px-1.5 py-0.5 rounded-full">
            <Star size={10} className="text-gold-500 fill-gold-500" />
            <span className="text-white text-xs font-semibold">{professional.rating}</span>
          </div>
        )}
      </div>

      {/* Content Section - ULTRA COMPACT */}
      <div className="flex-1 flex flex-col p-1.5 md:p-2.5">
        {/* Firm Name - COMPACT */}
        <h3 className="text-xs md:text-sm font-serif text-white group-hover:text-gold-300 transition-colors truncate mb-0">
          {professional.name}
        </h3>
        
        {/* Category - COMPACT */}
        <p className="text-xs text-gray-400 mb-1 truncate">{professional.subcategory}</p>

        {/* Location - COMPACT */}
        <div className="flex items-center gap-1 text-gray-300 text-xs mb-0">
          <MapPin size={10} className="text-gold-500 flex-shrink-0" />
          <span className="truncate text-xs">{typeof professional.location === 'string' ? professional.location : professional.location.area}</span>
        </div>

        {/* Service Summary - HIDDEN ON MOBILE */}
        {professional.servicesSummary && (
          <p className="hidden md:block text-xs text-gray-400 mb-1 line-clamp-1">{professional.servicesSummary}</p>
        )}

        {/* Tags - MINIMAL */}
        {professional.tags && professional.tags.length > 0 && (
          <div className="hidden md:flex flex-wrap gap-0.5 mb-1">
            {professional.tags.slice(0, 2).map((tag, idx) => (
              <span key={idx} className="text-[9px] bg-black/40 text-gray-300 px-1 py-0.5 rounded-full truncate max-w-20">
                {tag}
              </span>
            ))}
            {professional.tags.length > 2 && (
              <span className="text-[9px] text-gray-400">+{professional.tags.length - 2}</span>
            )}
          </div>
        )}

        {/* Action Buttons - ULTRA COMPACT */}
        <div className="flex gap-0.5 mt-auto pt-1 border-t border-white/5">
          <button
            onClick={() => onView(professional.id)}
            className="flex-1 px-2 py-1.5 bg-black/40 text-gray-200 text-xs rounded hover:bg-gold-500/20 transition-colors truncate"
          >
            Details
          </button>
          <button
            onClick={() => onView(professional.id)}
            className="flex-1 px-2 py-1.5 bg-gold-500/10 text-gold-400 text-xs rounded hover:bg-gold-500/20 transition-colors flex items-center justify-center gap-1 flex-shrink-0"
          >
            <Briefcase size={12} />
          </button>
          <button
            onClick={() => onContact(professional)}
            className="flex-1 px-2 py-1.5 bg-black/40 text-gray-200 text-xs rounded hover:bg-black/60 transition-colors flex items-center justify-center gap-1 flex-shrink-0"
          >
            <MessageCircle size={12} />
          </button>
        </div>
      </div>
    </div>
  );
});

BusinessCard.displayName = 'BusinessCard';
export default BusinessCard;
