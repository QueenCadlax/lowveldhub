import React, { useState } from 'react';
import { Star, MapPin, MessageCircle, Music, Heart, Sparkles } from 'lucide-react';
import { NightlifeVenue } from '../types';

interface NightlifeCardProps {
  venue: NightlifeVenue;
  onView: (id: string) => void;
  onContact: (venue: NightlifeVenue) => void;
}

const NightlifeCard: React.FC<NightlifeCardProps> = React.memo(({ venue, onView, onContact }) => {
  const [saved, setSaved] = useState(false);

  const getTierBadge = () => {
    if (venue.tier === 'Platinum') return { bg: 'bg-gradient-to-r from-[#E0C36A] to-[#C9A24D]', text: 'text-black', label: '✨ PLATINUM' };
    if (venue.tier === 'Elite') return { bg: 'bg-[#111]', text: 'text-[#E0C36A]', label: '⭐ ELITE', border: 'border border-[#E0C36A]/30' };
    return null;
  };

  const tierBadge = getTierBadge();
  const isLiveMusic = venue.features?.liveMusic;
  const isDJ = venue.features?.dj;

  return (
    <div className="group cursor-pointer h-full">
      <div className="rounded-2xl overflow-hidden bg-[#0f0f0f] border border-white/8 transition-all duration-500 hover:border-[#E0C36A]/40 hover:shadow-2xl hover:shadow-[#E0C36A]/20 h-full flex flex-col">
        
        {/* Image Container - Marketplace Size */}
        <div className="relative h-56 overflow-hidden bg-black/60 group-hover:shadow-lg">
          <img 
            src={venue.image} 
            alt={venue.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-85 group-hover:opacity-100" 
            onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=1200'; }}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

          {/* Top Left: Live Indicators */}
          {(isLiveMusic || isDJ) && (
            <div className="absolute top-3 left-3 z-20 flex gap-2">
              {isLiveMusic && (
                <div className="flex items-center gap-1 bg-red-600/90 text-white px-2.5 py-1 rounded-full text-xs font-bold animate-pulse shadow-lg">
                  <Music size={12} /> LIVE
                </div>
              )}
              {isDJ && (
                <div className="flex items-center gap-1 bg-purple-600/90 text-white px-2.5 py-1 rounded-full text-xs font-bold animate-pulse shadow-lg">
                  <Sparkles size={12} /> DJ SET
                </div>
              )}
            </div>
          )}

          {/* Top Right: Tier Badge */}
          {tierBadge && (
            <div className={`absolute top-3 right-3 z-20 ${tierBadge.bg} ${tierBadge.text} text-xs font-bold px-3 py-1.5 rounded-full ${tierBadge.border || ''} shadow-lg`}>
              {tierBadge.label}
            </div>
          )}

          {/* Favorite Button */}
          <button
            onClick={(e) => { e.stopPropagation(); setSaved(!saved); }}
            className="absolute right-3 bottom-3 z-20 w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-black/80 transition-all hover:scale-110"
          >
            <Heart size={16} className={`transition-colors ${saved ? 'text-[#E0C36A] fill-[#E0C36A]' : 'text-white'}`} />
          </button>

          {/* Bottom Left: Rating */}
          {venue.rating && (
            <div className="absolute bottom-3 left-3 z-20 flex items-center gap-1.5 bg-black/70 backdrop-blur-sm px-2.5 py-1.5 rounded-full">
              <Star size={13} className="text-[#E0C36A] fill-[#E0C36A]" />
              <span className="text-white text-sm font-bold">{venue.rating.toFixed(1)}</span>
              <span className="text-gray-300 text-xs">({venue.reviewCount || 0})</span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="flex-1 flex flex-col p-4">
          {/* Venue Name */}
          <h3 className="text-base font-serif text-white mb-1 line-clamp-1 group-hover:text-[#E0C36A] transition-colors">
            {venue.name}
          </h3>

          {/* Category */}
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-2.5">{venue.subcategory}</p>

          {/* Location */}
          <div className="flex items-center gap-2 text-gray-300 text-xs mb-2.5">
            <MapPin size={12} className="text-[#C9A24D] flex-shrink-0" />
            <span className="truncate">{typeof venue.location === 'string' ? venue.location : venue.location.area}</span>
          </div>

          {/* Vibe Description */}
          {venue.vibeDescription && (
            <p className="text-xs text-gray-400 mb-3 line-clamp-2 leading-relaxed">{venue.vibeDescription}</p>
          )}

          {/* Tags */}
          {venue.tags && venue.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {venue.tags.slice(0, 2).map((tag, idx) => (
                <span key={idx} className="text-xs bg-white/5 text-gray-300 px-2 py-1 rounded-full border border-white/10">
                  {tag}
                </span>
              ))}
              {venue.tags.length > 2 && (
                <span className="text-xs text-gray-500 px-2 py-1">+{venue.tags.length - 2}</span>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 mt-auto pt-3 border-t border-white/8">
            <button
              onClick={() => onView(venue.id)}
              className="flex-1 px-3 py-2.5 bg-gradient-to-r from-[#E0C36A] to-[#C9A24D] text-black text-xs font-bold rounded-lg hover:shadow-lg hover:shadow-[#E0C36A]/30 transition-all hover:-translate-y-0.5"
            >
              Explore
            </button>
            <button
              onClick={() => onContact(venue)}
              className="flex-1 px-3 py-2.5 border border-[#C9A24D]/30 text-[#E0C36A] text-xs font-semibold rounded-lg hover:bg-[#E0C36A]/10 transition-colors"
            >
              Inquire
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

NightlifeCard.displayName = 'NightlifeCard';
export default NightlifeCard;
