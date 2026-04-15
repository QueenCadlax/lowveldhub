import React, { useState } from 'react';
import { Heart, MapPin, Phone, Eye, Share2 } from 'lucide-react';

type Car = {
  id: string;
  title: string;
  image: string;
  gallery?: string[];
  year?: number;
  mileage?: string;
  price?: string;
  location?: string;
  dealer?: string;
  isPremium?: boolean;
  isSponsored?: boolean;
  isVerified?: boolean;
};

const VehicleCard: React.FC<{ car: Car; isFavorite?: boolean; onToggleFavorite?: (id: string) => void; onView?: (id: string) => void }> = ({ car, isFavorite, onToggleFavorite, onView }) => {
  const gold = '#C9A24D';
  const [hoverUnderline, setHoverUnderline] = useState(false);

  return (
    <div className="flex flex-col h-full rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl" style={{ border: '1px solid rgba(201,162,77,0.15)', background: '#0B0B0B' }}>
      {/* IMAGE SECTION - Fixed 4:3 aspect ratio */}
      <div className="relative w-full overflow-hidden" style={{ height: '220px' }}>
        <img 
          src={car.image} 
          alt={car.title} 
          className="w-full h-full object-cover transition-transform duration-500" 
          style={{ transform: hoverUnderline ? 'scale(1.05)' : 'scale(1)' }}
        />
        
        {/* Gradient overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 100%)' }} />
        
        {/* BADGES - Top left */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          {car.isSponsored && (
            <div className="px-3 py-1 rounded-full text-xs font-semibold" style={{ border: `1px solid ${gold}`, color: gold, background: 'transparent' }}>
              SPONSORED
            </div>
          )}
          {car.isPremium && (
            <div className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: gold, color: '#000000' }}>
              ELITE
            </div>
          )}
        </div>
        
        {/* SAVE ICON - Top right */}
        <button 
          onClick={(e) => { e.stopPropagation(); onToggleFavorite && onToggleFavorite(car.id); }} 
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
          style={{ 
            background: isFavorite ? gold : 'rgba(0,0,0,0.4)', 
            color: isFavorite ? '#000000' : 'white',
            border: isFavorite ? 'none' : `1px solid ${gold}`
          }}
        >
          <Heart size={18} fill={isFavorite ? gold : 'none'} />
        </button>
        
        {/* IMAGE COUNT BADGE - Bottom right */}
        {car.gallery && car.gallery.length > 1 && (
          <div className="absolute bottom-4 right-4 px-2 py-1 rounded-lg text-xs font-semibold" style={{ background: 'rgba(0,0,0,0.6)', color: gold }}>
            {car.gallery.length} photos
          </div>
        )}
      </div>

      {/* CONTENT SECTION - Fixed height, flex grow */}
      <div className="flex flex-col flex-grow p-6 gap-4">
        {/* TITLE - 1 line max */}
        <div>
          <h3 className="text-lg font-serif line-clamp-1" style={{ color: '#FFFFFF' }}>
            {car.title}
          </h3>
        </div>

        {/* META - 1 line max */}
        <div className="text-sm line-clamp-1" style={{ color: '#999999' }}>
          {car.year} • {car.mileage}
        </div>

        {/* PRICE - Strong */}
        <div className="text-2xl font-semibold" style={{ color: gold }}>
          {car.price}
        </div>

        {/* LOCATION */}
        <div className="flex items-center gap-2 text-sm" style={{ color: '#CFCFCF' }}>
          <MapPin size={16} style={{ color: gold }} />
          <span className="line-clamp-1">{car.location}</span>
        </div>

        {/* SPACING - Flexible spacer */}
        <div className="flex-grow" />

        {/* CTA BUTTON - Always at bottom, full width */}
        <button
          onClick={() => onView && onView(car.id)}
          onMouseEnter={() => setHoverUnderline(true)}
          onMouseLeave={() => setHoverUnderline(false)}
          className="w-full py-3 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 group"
          style={{
            border: `1px solid ${gold}`,
            color: gold,
            background: hoverUnderline ? `${gold}15` : 'transparent'
          }}
        >
          View Details
          <span style={{ transform: hoverUnderline ? 'translateX(4px)' : 'translateX(0)', transition: 'transform 0.3s' }}>→</span>
        </button>
      </div>
    </div>
  );
};

export default VehicleCard;
