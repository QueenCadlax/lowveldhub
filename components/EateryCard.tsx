import React from 'react';
import { Eatery } from '../types';
import { MapPin, Star } from 'lucide-react';

const EateryCard: React.FC<{ eatery: Eatery; onView: (id: string) => void; onContact?: (eatery: Eatery) => void }> = React.memo(({ eatery, onView, onContact }) => {
  const menuTeaser = eatery.menu && eatery.menu.length ? eatery.menu.slice(0,2).map(m => `${m.itemName} • ${m.price}`).join(' | ') : '';
  const socialProof = eatery.premiumTier === 'Elite' ? 'Elite pick' : (eatery.rating && eatery.rating >= 4.6 ? 'Local favorite' : 'Popular on weekends');

  return (
    <div className="group relative bg-[#000000] rounded-[18px] overflow-hidden cursor-pointer transition-all duration-400 hover:shadow-[0_24px_70px_rgba(201,162,77,0.15)] flex flex-col h-full">
      <div className="relative flex-shrink-0" style={{aspectRatio: '4 / 5'}}>
        <img src={eatery.images?.[0] || ''} alt={eatery.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

        <div className="absolute top-4 left-4 flex gap-2">
          {eatery.premiumTier === 'Elite' && (
            <div className="bg-gradient-to-r from-[#E0C36A] to-[#C9A24D] text-black text-[9px] font-bold uppercase px-3 py-1.5 rounded-full shadow-[0_6px_20px_rgba(201,162,77,0.18)]" style={{letterSpacing: '0.08em'}}>Elite</div>
          )}
          {eatery.verified && (
            <div className="bg-[#0b0b0b] text-[#E0C36A] text-[10px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 border border-[#E0C36A]/20" style={{letterSpacing: '0.03em'}}>✓ Verified</div>
          )}
        </div>
      </div>

      <div className="flex-1 p-5 bg-[#0b0b0b] border-t border-white/5 flex flex-col">
        <div className="mb-3 flex-shrink-0">
          <h3 className="text-base md:text-lg font-serif text-white leading-tight tracking-tight">{eatery.name}</h3>
          <div className="flex items-center gap-3 mt-2.5 text-sm">
            <div className="flex items-center gap-1 text-[#E0C36A] font-semibold">★ {eatery.rating?.toFixed(1) || '—'}</div>
            <div className="text-[#3a3a3a]">•</div>
            <div className="text-gray-400 text-xs">{eatery.category} • {eatery.cuisine.join(', ')}</div>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-400 mb-3 flex-shrink-0">
          <div className="flex items-center gap-2"><MapPin size={13} className="text-[#C9A24D]"/> <span>{typeof eatery.location === 'string' ? eatery.location : eatery.location.area}</span></div>
          <div className="font-semibold text-gray-300">{eatery.priceRange || ''}</div>
        </div>

        {menuTeaser && (
          <div className="text-xs text-gray-400 mb-4 flex-shrink-0">Popular: <span className="font-semibold text-white">{menuTeaser}</span></div>
        )}

        <div className="mt-auto flex items-center justify-between flex-shrink-0">
          <div className="text-[10px] text-gray-500 uppercase tracking-wide font-medium">{socialProof}</div>
          <div className="flex gap-2">
            <button onClick={() => onView(eatery.id)} className="bg-gradient-to-r from-[#E0C36A] to-[#C9A24D] text-black px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-300 hover:shadow-[0_8px_24px_rgba(201,162,77,0.25)] hover:scale-105">View</button>
            <button onClick={() => onContact && onContact(eatery)} className="border border-[#C9A24D]/30 text-[#E0C36A] px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-300 hover:border-[#C9A24D]/60 hover:bg-white/5">Info</button>
          </div>
        </div>
      </div>
    </div>
  );
});

EateryCard.displayName = 'EateryCard';
export default EateryCard;
