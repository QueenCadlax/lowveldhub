import React, { useState } from 'react';
import { Star, MapPin, Heart, Share2, Crown, Award, CheckCircle, Gem, Lock, Sparkles, MessageCircle, Phone, Mail } from 'lucide-react';
import { ListingTier } from '../types';

interface CompactBusinessCardProps {
  id: string;
  title: string;
  image: string;
  subtitle?: string;
  rating?: number;
  reviewCount?: number;
  location?: string;
  badge?: string;
  tier?: ListingTier;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
  onPress?: () => void;
  phone?: string;
  email?: string;
  isElite?: boolean;
  isPlatinum?: boolean;
  verified?: boolean;
}

const CompactBusinessCard: React.FC<CompactBusinessCardProps> = React.memo(({
  id,
  title,
  image,
  subtitle,
  rating,
  reviewCount,
  location,
  badge,
  tier,
  isFavorite = false,
  onToggleFavorite,
  onPress,
  phone,
  email,
  isElite,
  isPlatinum,
  verified
}) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}?id=${id || 'listing'}`;
    if (navigator.share) {
      navigator.share({ title, url: shareUrl }).catch(() => {});
    }
  };

  return (
    <div 
      className={`group relative cursor-pointer h-full flex flex-col rounded-lg border overflow-hidden transition-all duration-300 flex-1
        ${isPlatinum 
          ? 'bg-black/40 border-purple-500/40 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/20' 
          : isElite
            ? 'bg-black/40 border-gold-500/40 hover:border-gold-400 hover:shadow-lg hover:shadow-gold-500/20'
            : 'bg-black/30 border-white/10 hover:border-gold-500/30 hover:shadow-lg hover:shadow-gold-500/10'
      }`}
      onClick={onPress}
    >
      {/* Image Section - MEDIUM SIZE */}
      <div className="relative h-32 md:h-40 overflow-hidden bg-black/50 flex-shrink-0">
        <img 
          src={image || 'https://images.unsplash.com/photo-1560264357-8d9cf1004b7d?auto=format&fit=crop&q=80&w=500'} 
          alt={title}
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ${
            imgLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

        {/* Tier Badge */}
        {(isPlatinum || isElite || verified) && (
          <div className="absolute top-2 left-2 z-20">
            {isPlatinum ? (
              <span className="bg-gradient-to-r from-purple-600 to-purple-500 text-white text-[8px] font-black px-2 py-1 rounded-full uppercase tracking-tight flex items-center gap-1 border border-purple-300/40">
                <Award size={10} /> PLATINUM
              </span>
            ) : isElite ? (
              <span className="bg-gradient-to-r from-gold-600 to-gold-500 text-black text-[8px] font-black px-2 py-1 rounded-full uppercase tracking-tight flex items-center gap-1 border border-gold-300/40">
                <Crown size={10} /> ELITE
              </span>
            ) : (
              <span className="bg-green-600 text-white text-[8px] font-black px-2 py-1 rounded-full uppercase tracking-tight flex items-center gap-1 border border-green-300/40">
                <CheckCircle size={10} /> VERIFIED
              </span>
            )}
          </div>
        )}

        {/* Rating Badge */}
        {rating && (
          <div className="absolute bottom-2 left-2 z-20 flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full">
            <Star size={11} className="text-gold-400 fill-gold-400" />
            <span className="text-white text-xs font-semibold">{rating.toFixed(1)}</span>
          </div>
        )}

        {/* Favorite & Share Buttons */}
        <div className="absolute top-2 right-2 z-20 flex gap-1">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              if (onToggleFavorite && id) onToggleFavorite(id);
            }}
            className={`p-1.5 rounded-full backdrop-blur-md border border-white/20 transition-all ${
              isFavorite 
                ? 'bg-gold-500 text-black' 
                : 'bg-black/50 text-white hover:bg-gold-500/20'
            }`}
            title="Favorite"
          >
            <Heart size={12} fill={isFavorite ? "currentColor" : "none"} />
          </button>
          <button 
            onClick={handleShare}
            className="p-1.5 rounded-full bg-black/50 text-white hover:bg-gold-500/20 border border-white/20 transition-all backdrop-blur-md"
            title="Share"
          >
            <Share2 size={12} />
          </button>
        </div>
      </div>

      {/* Content Section - COMPACT */}
      <div className="flex-1 flex flex-col p-2 md:p-3 gap-1">
        {/* Title */}
        <h3 className="text-xs md:text-sm font-serif font-semibold text-white group-hover:text-gold-300 transition-colors line-clamp-2 leading-tight">
          {title}
        </h3>

        {/* Subtitle/Category - HIDDEN ON MOBILE */}
        {subtitle && (
          <p className="hidden md:block text-xs text-gray-400 line-clamp-1">{subtitle}</p>
        )}

        {/* Location */}
        {location && (
          <div className="flex items-center gap-1 text-gray-300 text-xs mt-auto pt-1 border-t border-white/10">
            <MapPin size={10} className="text-gold-400 flex-shrink-0" />
            <span className="truncate text-xs">{location}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-1 mt-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPress?.();
            }}
            className="flex-1 px-2 py-1.5 text-xs font-medium rounded bg-gold-500/10 text-gold-400 border border-gold-500/30 hover:bg-gold-500/20 transition-all truncate"
          >
            View
          </button>
          {phone && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                window.open(`tel:${phone}`);
              }}
              className="p-1.5 rounded bg-black/40 text-gray-300 hover:text-gold-400 border border-white/10 hover:border-gold-500/40 transition-all"
              title="Call"
            >
              <Phone size={12} />
            </button>
          )}
          {email && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                window.open(`mailto:${email}`);
              }}
              className="p-1.5 rounded bg-black/40 text-gray-300 hover:text-gold-400 border border-white/10 hover:border-gold-500/40 transition-all"
              title="Email"
            >
              <Mail size={12} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
});

CompactBusinessCard.displayName = 'CompactBusinessCard';
export default CompactBusinessCard;
