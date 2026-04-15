
import React, { useState, useEffect } from 'react';
import { Star, MapPin, CheckCircle, Heart, Share2, Phone, Mail, Search, Sparkles, Filter, ChevronDown, Check, X, User, Lock, ArrowRight, Briefcase, Camera, Crown, MessageCircle, DollarSign, Award, Layers, RefreshCw, Linkedin, Facebook, Instagram, Twitter, ShieldCheck, Gem, Clock } from 'lucide-react';
import { MPUMALANGA_AREAS, PRICE_FILTERS, RATING_FILTERS, LISTING_TIER_FILTERS, SERVICE_TYPE_FILTERS, ListingTier } from '../types';

export const SectionTitle = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="mb-12 text-center relative z-10 group">
    <h2 className="text-3xl md:text-5xl font-serif text-white mb-3 tracking-wide drop-shadow-lg transform transition-transform duration-500 group-hover:scale-105">
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold-200 via-gold-400 to-gold-200 bg-300% animate-shimmer">
        {title}
      </span>
    </h2>
    {subtitle && <p className="text-gray-400 font-sans tracking-[0.2em] uppercase text-xs md:text-sm animate-fade-in">{subtitle}</p>}
    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mt-6 shadow-[0_0_15px_rgba(227,185,44,0.5)]"></div>
  </div>
);

export const LuxuryCard: React.FC<{ 
  image: string; 
  title: string; 
  logo?: string;
  subtitle?: string; 
  rating?: number; 
  reviewCount?: number;
  price?: string; 
  location?: string; 
  badge?: string; 
  id?: string;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
  onPress?: () => void;
  phone?: string;
  email?: string;
  tiktokUrl?: string;
  linkedinUrl?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
  category?: string;
  subcategory?: string;
  verified?: boolean;
  isElite?: boolean;
  isPlatinum?: boolean;
  isTopRated?: boolean;
  isFeatured?: boolean;
  compact?: boolean;
  isVerifiedSeller?: boolean;
  isLocalVendor?: boolean;
  areaDominationArea?: string;
  areaDominationTier?: 'Gold' | 'Platinum';
  trustBadges?: string[];
}> = ({ 
  image, 
  logo,
  title, 
  subtitle, 
  rating, 
  reviewCount,
  price, 
  location, 
  badge,
  id,
  isFavorite,
  onToggleFavorite,
  onPress,
  phone,
  email,
  tiktokUrl,
  linkedinUrl,
  facebookUrl,
  instagramUrl,
  twitterUrl,
  category,
  subcategory,
  verified,
  isElite,
  isPlatinum,
  isTopRated,
  isFeatured,
  compact,
  isVerifiedSeller,
  isLocalVendor,
  areaDominationArea,
  areaDominationTier,
  trustBadges
}) => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}${window.location.pathname}?id=${id || 'listing'}`;
    const shareData = { title: title, text: subtitle || `Discover ${title} on LowveldHub`, url: shareUrl };
    if (navigator.share) navigator.share(shareData).catch(() => copyToClipboard(shareUrl));
    else copyToClipboard(shareUrl);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => alert('Link copied to clipboard!')).catch(err => console.error(err));
  };

  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

  const formatWhatsApp = (num?: string) => {
    if (!num) return '';
    let cleaned = num.replace(/\D/g, '');
    if (cleaned.startsWith('0') && cleaned.length === 10) {
      cleaned = '27' + cleaned.substring(1);
    }
    return cleaned;
  };

  const whatsappUrl = phone 
    ? `https://wa.me/${formatWhatsApp(phone)}?text=${encodeURIComponent(`Hi, I'm interested in "${title}" on LowveldHub.`)}`
    : '#';

  return (
    <div className="group relative h-full perspective-1000" onClick={onPress}>
      {/* Dynamic tier-based background glow layers */}
      {isPlatinum && (
        <>
          <div className="absolute -inset-[14px] rounded-[1.8rem] bg-purple-600/40 blur-[60px] opacity-0 group-hover:opacity-100 transition-all duration-1000 z-0"></div>
          <div className="absolute -inset-[8px] rounded-[1.6rem] bg-indigo-500/30 blur-[30px] opacity-0 group-hover:opacity-100 transition-all duration-700 z-0"></div>
          <div className="absolute -inset-[2px] rounded-[1.4rem] bg-white/10 blur-[8px] opacity-0 group-hover:opacity-100 transition-all duration-500 z-0"></div>
        </>
      )}
      {isElite && !isPlatinum && (
        <div className="absolute -inset-[8px] rounded-[1.6rem] bg-gold-500/30 blur-[25px] opacity-0 group-hover:opacity-100 transition-all duration-700 z-0"></div>
      )}
      {isFeatured && !isElite && !isPlatinum && (
        <div className="absolute -inset-[6px] rounded-[1.4rem] bg-gold-500/15 blur-[15px] opacity-0 group-hover:opacity-100 transition-all duration-700 z-0"></div>
      )}
      
      <div className={`relative h-full bg-[#0d0d0d]/95 backdrop-blur-md rounded-xl overflow-hidden border 
        transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] transform 
        group-hover:-translate-y-3 group-hover:scale-[1.015]
        ${isPlatinum 
           ? 'border-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.3)] group-hover:shadow-[0_0_120px_rgba(168,85,247,0.8),0_0_40px_rgba(168,85,247,0.5)] group-hover:border-purple-300' 
           : (isElite || isFeatured)
             ? 'border-gold-500/40 shadow-[0_0_20px_rgba(227,185,44,0.15)] group-hover:animate-pulse-gold group-hover:border-gold-400 group-hover:shadow-[0_0_40px_rgba(227,185,44,0.5)]' 
             : badge === 'Premium' 
               ? 'border-gold-500/30' 
               : 'border-white/10'
        } 
        cursor-pointer flex flex-col z-10`}>
        
        {/* Metallic Shimmer Overlay */}
        <div className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 overflow-hidden transition-opacity duration-700">
           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent -skew-x-12 translate-x-[-100%] animate-shimmer-metallic"></div>
        </div>

        <div className={`${compact ? 'h-48' : 'h-64'} relative overflow-hidden flex-shrink-0`}>
          <img loading="lazy" src={image || 'https://images.unsplash.com/photo-1531297461136-82eb8a638e51?auto=format&fit=crop&q=80&w=800'} alt={title} onLoad={() => setImgLoaded(true)} className={`w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-110 ${imgLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-lg'}`} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent opacity-85 transition-opacity group-hover:opacity-70"></div>
          
          <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-30">
            {isPlatinum && (
              <span className="bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-500 text-white text-[8px] font-black px-2.5 py-1 rounded-full uppercase tracking-tighter shadow-xl flex items-center gap-1.5 border border-purple-300/40">
                <Award size={9} /> PLATINUM
              </span>
            )}
            {isElite && !isPlatinum && (
              <span className="bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 text-black text-[8px] font-black px-2.5 py-1 rounded-full uppercase tracking-tighter shadow-xl flex items-center gap-1.5 border border-gold-300/40">
                <Crown size={9} /> ELITE
              </span>
            )}
            {verified && !isElite && !isPlatinum && (
              <span className="bg-gradient-to-r from-green-600 to-green-500 text-white text-[8px] font-black px-2.5 py-1 rounded-full uppercase tracking-tighter shadow-xl flex items-center gap-1.5 border border-green-300/40">
                <CheckCircle size={9} /> VERIFIED
              </span>
            )}
            {(isFeatured || badge === 'Featured') && (
              <span className="bg-gradient-to-r from-gold-600 to-gold-400 text-black text-[8px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest shadow-[0_0_15px_rgba(227,185,44,0.4)] flex items-center gap-1.5 border border-gold-300/40 animate-pulse-slow">
                <Gem size={9} className="animate-bounce" /> SPONSORED
              </span>
            )}
            {badge === 'HIGH_DEMAND' && (
              <span className="bg-gradient-to-r from-red-600 to-red-500 text-white text-[8px] font-black px-2.5 py-1 rounded-full uppercase tracking-tighter shadow-xl flex items-center gap-1.5 border border-red-300/40">
                <Sparkles size={9} /> HIGH DEMAND
              </span>
            )}
            {badge === 'BY_INVITATION' && (
              <span className="bg-gradient-to-r from-blue-600 to-blue-500 text-white text-[8px] font-black px-2.5 py-1 rounded-full uppercase tracking-tighter shadow-xl flex items-center gap-1.5 border border-blue-300/40">
                <Lock size={9} /> INVITE ONLY
              </span>
            )}
          </div>
          
          <div className="absolute top-3 right-3 flex flex-col gap-2 z-30">
            <button onClick={(e) => { e.stopPropagation(); if (onToggleFavorite && id) onToggleFavorite(id); }} className={`p-2 rounded-full transition-all duration-300 backdrop-blur-md border border-white/5 ${isFavorite ? 'bg-gold-500 text-black shadow-[0_0_20px_rgba(227,185,44,0.6)] scale-110' : 'bg-black/50 text-white hover:bg-gold-500 hover:text-black'}`} title="Favorite"><Heart size={15} fill={isFavorite ? "currentColor" : "none"} /></button>
            <button onClick={handleShare} className="p-2 rounded-full bg-black/50 text-white border border-white/5 hover:bg-gold-500 hover:text-black transition-all duration-300 backdrop-blur-md" title="Share"><Share2 size={15} /></button>
          </div>

          {/* Logo badge - overlaps image and card body for brand presence */}
          <div className="absolute -bottom-10 left-6 w-20 h-20 rounded-full border-2 border-white/8 overflow-hidden bg-black z-40 shadow-lg flex items-center justify-center">
            <img loading="lazy" src={logo || image} alt={`${title} logo`} onLoad={() => setLogoLoaded(true)} className={`w-full h-full object-cover transition-transform ${logoLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'}`} />
          </div>

          {price && (
            <div className="absolute bottom-3 right-3 bg-black/90 backdrop-blur-xl px-3 py-1.5 rounded-lg border border-gold-500/30 shadow-2xl z-30 transform group-hover:scale-110 transition-transform duration-500">
              <span className="text-gold-300 font-black text-[11px] font-sans tracking-[0.12em] uppercase leading-none">{price}</span>
            </div>
          )}
        </div>

          <div className={`${compact ? 'p-4' : 'p-6'} relative flex flex-col flex-grow z-30 overflow-hidden`}>
          {rating && (
            <div className="flex items-center gap-2 text-gold-400 mb-2">
              <Star size={13} fill="currentColor" />
              <span className="text-sm font-medium text-white">{rating.toFixed(1)} <span className="text-gray-500 font-normal ml-1">({reviewCount || 0})</span></span>
            </div>
          )}

          <div className="overflow-hidden mb-3">
             <h3 className={`${compact ? 'text-lg md:text-xl' : 'text-2xl md:text-3xl'} font-serif font-semibold text-white group-hover:text-gold-100 transition-colors truncate leading-tight`}>
               {title}
             </h3>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center flex-wrap gap-2">
              {subtitle && (
                <p className="text-gray-400 text-sm line-clamp-1 normal-case font-sans font-medium group-hover:text-gold-400 transition-colors">
                  {subtitle}
                </p>
              )}
              {(verified || isElite || isPlatinum) && (
                <div className="flex-shrink-0">
                  <CheckCircle size={12} className="text-gold-500 drop-shadow-[0_0_10px_rgba(227,185,44,0.5)]" />
                </div>
              )}
            </div>
            
            {(isVerifiedSeller || isLocalVendor || isFeatured) && (
              <div className="flex flex-wrap gap-1.5 mt-1 opacity-90 group-hover:opacity-100 transition-opacity">
                {isVerifiedSeller && (
                  <span className="inline-flex items-center gap-1 text-[8px] font-black uppercase tracking-widest text-gold-500 bg-gold-500/10 px-1.5 py-0.5 rounded border border-gold-500/20" title="Verified Seller">
                    <ShieldCheck size={10} /> Verified
                  </span>
                )}
                {isLocalVendor && (
                  <span className="inline-flex items-center gap-1 text-[8px] font-black uppercase tracking-widest text-gold-500 bg-gold-500/10 px-1.5 py-0.5 rounded border border-gold-500/20" title="Local Vendor">
                    <MapPin size={10} /> Local
                  </span>
                )}
              </div>
            )}

            {areaDominationArea && areaDominationTier && (
              <div className="mt-2">
                <AreaDominationBadge area={areaDominationArea} tier={areaDominationTier} />
              </div>
            )}

            {trustBadges && trustBadges.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {trustBadges.slice(0, 2).map((badge: string) => (
                  <TrustBadgeDisplay key={badge} badge={badge} />
                ))}
              </div>
            )}
          </div>
          
          <div className={`flex items-center justify-between mt-auto pt-4 border-t border-white/5 group-hover:border-gold-500/40 transition-colors`}>
            {location && (
              <div className="flex items-center gap-2 text-gray-400 text-sm group-hover:text-white transition-colors">
                <MapPin size={12} className="text-gold-500" />
                <span className="truncate max-w-[180px] font-sans font-medium">{location}</span>
              </div>
            )}
          </div>

          <button 
            onClick={(e) => { e.stopPropagation(); setIsContactOpen(true); }}
            className={`mt-5 w-full py-3 rounded-lg border font-semibold text-sm transition-all duration-400 transform active:scale-98 shadow-md ${
              isPlatinum 
                ? 'bg-purple-600/10 border-purple-500/40 text-purple-200 group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-600 group-hover:shadow-[0_0_25px_rgba(168,85,247,0.4)]' 
                : 'bg-gold-500/10 border-gold-500/40 text-gold-400 group-hover:bg-gold-500 group-hover:text-black group-hover:border-gold-500 group-hover:shadow-[0_0_25px_rgba(227,185,44,0.4)]'
            }`}
          >
            Contact
          </button>

          <div className={`flex flex-wrap items-center justify-center gap-2.5 mt-3 pt-3 border-t border-white/5 transition-all duration-300 ${compact ? 'opacity-100 md:opacity-0 md:group-hover:opacity-100' : 'opacity-100'}`}>
             <a href={`tel:${phone || '000'}`} onClick={stopPropagation} className="p-1.5 rounded-md text-gold-500 hover:bg-gold-500/10 transition-colors" title="Call">
               <Phone size={13} />
             </a>
             <a href={whatsappUrl} target="_blank" onClick={stopPropagation} className="p-1.5 rounded-md text-green-500 hover:bg-green-500/10 transition-colors" title="WhatsApp">
               <MessageCircle size={13} />
             </a>
             <a href={`https://maps.google.com/?q=${encodeURIComponent(title + ' ' + (location || ''))}`} target="_blank" onClick={stopPropagation} className="p-1.5 rounded-md text-gold-500 hover:bg-gold-500/10 transition-colors" title="Map">
               <MapPin size={13} />
             </a>
          </div>
        </div>
      </div>

      {/* Premium Contact Modal */}
      {isContactOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl animate-fade-in" 
          onClick={(e) => { e.stopPropagation(); setIsContactOpen(false); }}
        >
          <div 
            className="bg-[#0f0f0f] border border-gold-500/30 rounded-[2.5rem] p-10 max-w-md w-full shadow-[0_0_80px_rgba(0,0,0,0.9)] relative overflow-hidden" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-gold-500/15 blur-[100px] rounded-full"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gold-500/10 blur-[100px] rounded-full"></div>

            <div className="relative z-10">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <div className="text-gold-500 text-[11px] font-black uppercase tracking-[0.4em] mb-2">Connect Directly</div>
                  <h3 className="text-3xl font-serif text-white tracking-tight leading-none">{title}</h3>
                </div>
                <button 
                  onClick={() => setIsContactOpen(false)} 
                  className="text-gray-500 hover:text-white p-2.5 bg-white/5 rounded-full border border-white/10 transition-all hover:scale-110"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="space-y-4">
                {phone && (
                  <a href={`tel:${phone}`} className="flex items-center gap-4 p-5 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-gold-500/15 hover:border-gold-500/40 transition-all group">
                    <div className="w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center border border-gold-500/20 group-hover:bg-gold-500 group-hover:text-black transition-all">
                      <Phone size={18} />
                    </div>
                    <span className="text-white text-base font-semibold">{phone}</span>
                  </a>
                )}
                {phone && (
                  <a href={whatsappUrl} target="_blank" className="flex items-center gap-4 p-5 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-green-500/15 hover:border-green-500/40 transition-all group">
                    <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20 group-hover:bg-green-500 group-hover:text-black transition-all">
                      <MessageCircle size={18} />
                    </div>
                    <span className="text-white text-base font-semibold">WhatsApp Message</span>
                  </a>
                )}
                {email && (
                  <a href={`mailto:${email}`} className="flex items-center gap-4 p-5 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-gold-500/15 hover:border-gold-500/40 transition-all group">
                    <div className="w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center border border-gold-500/20 group-hover:bg-gold-500 group-hover:text-black transition-all">
                      <Mail size={18} />
                    </div>
                    <span className="text-white text-base font-semibold truncate">{email}</span>
                  </a>
                )}
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {facebookUrl && (
                    <a href={facebookUrl} target="_blank" className="flex items-center justify-center gap-2 p-5 rounded-xl bg-[#1877f2]/10 border border-[#1877f2]/20 hover:bg-[#1877f2] hover:text-white text-[#1877f2] transition-all font-black text-[10px] uppercase tracking-[0.15em]">
                      <Facebook size={16} /> Facebook
                    </a>
                  )}
                  {instagramUrl && (
                    <a href={instagramUrl} target="_blank" className="flex items-center justify-center gap-2 p-5 rounded-xl bg-[#e4405f]/10 border border-[#e4405f]/20 hover:bg-[#e4405f] hover:text-white text-[#e4405f] transition-all font-black text-[10px] uppercase tracking-[0.15em]">
                      <Instagram size={16} /> Instagram
                    </a>
                  )}
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-white/5 text-center">
                <p className="text-[10px] text-gray-600 font-black uppercase tracking-[0.4em] mb-1">LowveldHub Verified Partner</p>
                <div className="w-12 h-0.5 bg-gold-500/30 mx-auto rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Memoize LuxuryCard to prevent unnecessary re-renders
export const MemoLuxuryCard = React.memo(LuxuryCard);

export const CategoryCard: React.FC<{
  Icon: any;
  label: string;
  description?: string;
  count?: number;
  onClick?: () => void;
}> = ({ Icon, label, description, count, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="group relative text-left p-8 rounded-[1.5rem] bg-[#0a0a0a] border border-white/6 hover:border-gold-400 transition-all duration-700 shadow-[0_12px_40px_rgba(0,0,0,0.6)] transform hover:-translate-y-3"
    >
      <div className="relative z-20 flex items-start gap-4">
        <div className="w-20 h-20 rounded-xl flex items-center justify-center bg-gradient-to-b from-black/60 to-black/30 border border-white/6 shadow-md overflow-hidden">
          <Icon size={32} className="text-gold-300" />
        </div>

        <div className="flex-1">
          <div>
            <div className="text-lg font-semibold text-white leading-tight">{label}</div>
            {description && <div className="text-sm text-gray-400 mt-1">{description}</div>}
          </div>
        </div>
      </div>
    </button>
  );
};

export const PrimaryButton = ({ children, onClick, className = '' }: { children?: React.ReactNode, onClick?: () => void, className?: string }) => (
  <button onClick={onClick} className={`relative overflow-hidden bg-gradient-to-r from-gold-600 to-gold-400 text-black font-black py-4 px-10 rounded-xl shadow-[0_0_25px_rgba(227,185,44,0.35)] hover:shadow-[0_0_40px_rgba(227,185,44,0.6)] transform hover:-translate-y-1 transition-all duration-300 group ${className}`}><div className="absolute inset-0 bg-white/40 translate-y-full group-hover:translate-y-0 transition-transform duration-500 skew-y-12"></div><span className="relative z-10 uppercase tracking-[0.2em] text-xs flex items-center gap-3 justify-center">{children}</span></button>
);

export const MarketButton = ({ children, onClick, className = '', size = 'md' }: { children?: React.ReactNode, onClick?: (e?: React.MouseEvent) => void, className?: string, size?: 'sm'|'md'|'lg' }) => {
  const sizes: Record<string,string> = {
    sm: 'py-2 px-3 text-sm',
    md: 'py-3 px-4 text-sm',
    lg: 'py-4 px-6 text-base'
  };
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-250 transform ${sizes[size]} ${className} bg-black text-[#ffd700] border border-[#d4af37]/20 hover:bg-[#ffd700] hover:text-black hover:border-[#ffd700] shadow-[0_6px_18px_rgba(0,0,0,0.6)] hover:shadow-[0_8px_28px_rgba(212,175,55,0.12)]`}
    >
      {children}
    </button>
  );
};

export const HeroFilterHeader = ({ title, subtitle, placeholder, image }: { title: string; subtitle: string; placeholder?: string; image: string; }) => {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <div className="relative h-[60vh] min-h-[450px] flex items-center justify-center mb-20 overflow-hidden rounded-b-[4rem] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)]">
      <div className="absolute inset-0 overflow-hidden"><img src={image} alt={title} className="w-full h-full object-cover transform scale-105 transition-transform duration-[20s] ease-linear hover:scale-110 will-change-transform" style={{ transform: `translateY(${scrollY * 0.4}px) scale(1.1)` }} /><div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-[#050505] backdrop-blur-[2px]"></div><div className="absolute top-0 right-10 z-20"><div className="bg-gold-500 w-14 h-24 shadow-2xl flex flex-col items-center justify-end pb-3 rounded-b-xl"><Star size={18} className="text-black fill-current animate-pulse-slow" /></div></div></div>
      <div className="relative z-10 container mx-auto px-4 text-center"><div className="animate-slide-up"><h1 className="text-6xl md:text-8xl font-serif text-white mb-6 drop-shadow-2xl tracking-tighter uppercase"><span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gold-200 to-white bg-300% animate-shimmer">{title}</span></h1><p className="text-gold-400 text-sm md:text-xl uppercase tracking-[0.4em] mb-12 font-black text-glow">{subtitle}</p></div>
        {placeholder && (<div className="max-w-3xl mx-auto relative group animate-fade-in delay-200"><div className="absolute inset-0 bg-gold-500/30 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div><div className="relative flex items-center bg-white/5 backdrop-blur-2xl border border-white/20 rounded-full px-8 py-5 shadow-2xl focus-within:bg-black/95 focus-within:border-gold-500 transition-all duration-300 transform group-hover:scale-[1.01]"><div className="text-gold-400 mr-5"><Search size={26} /></div><input type="text" placeholder={placeholder} className="bg-transparent border-none outline-none text-white w-full placeholder-gray-500 font-sans text-xl" /><button className="hidden md:block text-[10px] font-black tracking-widest bg-gold-500 text-black px-8 py-3 rounded-full hover:bg-white transition-all shadow-lg uppercase">Intelligent Search</button></div></div>)}
      </div>
    </div>
  );
};

export const SponsoredBanner = ({ pageType }: { pageType: 'restaurant' | 'car' | 'estate' | 'general' }) => {
    const [isVisible, setIsVisible] = useState(true);
    if (!isVisible) return null;
    let content = { title: "Exclusive Offer", desc: "Get 20% off your first month.", img: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=400" };
    if (pageType === 'restaurant') content = { title: "Summer Menu Tasting", desc: "Book at Blue Moon Bistro today.", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=800" };
    else if (pageType === 'car') content = { title: "Westvaal Clearance", desc: "Low interest rates on all AMGs.", img: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=400" };
    else if (pageType === 'estate') content = { title: "Shandon Estate Phase 2", desc: "Plots selling from R1.2M.", img: "https://images.unsplash.com/photo-1600596542815-2a4d9f6facb8?auto=format&fit=crop&q=80&w=800" };
    return (
        <div className="container mx-auto px-4 -mt-10 relative z-20 mb-16">
            <div className="bg-white/5 backdrop-blur-2xl border border-gold-500/40 rounded-xl p-5 flex items-center justify-between shadow-2xl animate-fade-in group"><div className="flex items-center gap-6"><div className="relative w-20 h-20 rounded-lg overflow-hidden border border-white/10"><img src={content.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Ad" /></div><div><span className="text-[10px] text-gold-500 uppercase tracking-[0.3em] font-black mb-1 block">Elite Partner Spotlight</span><h4 className="text-white font-serif text-2xl leading-none mb-1 uppercase tracking-tight">{content.title}</h4><p className="text-gray-400 text-sm font-medium tracking-wide">{content.desc}</p></div></div><button onClick={() => setIsVisible(false)} className="text-gray-500 hover:text-white p-3 hover:bg-white/5 rounded-full transition-all"><span><X size={20}/></span></button></div>
        </div>
    );
};

export interface FilterState { search: string; areas: string[]; categories: string[]; subcategories: string[]; minRating: number; prices: string[]; listingTiers: string[]; serviceTypes: string[]; verifiedOnly?: boolean; onlyOpenNow?: boolean }

export const AdvancedFilterPanel = ({ type = 'marketplace', onFilter }: { type?: 'marketplace' | 'directory' | 'creator'; onFilter: (state: FilterState) => void; }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [areaSearch, setAreaSearch] = useState(''); 
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [selectedTiers, setSelectedTiers] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
  const [onlyOpenNow, setOnlyOpenNow] = useState<boolean>(false);

  const handleToggle = (list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    setList(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };

  const applyFilters = () => { 
    onFilter({ search, areas: selectedAreas, categories: [], subcategories: [], minRating: selectedRating, prices: selectedPrices, listingTiers: selectedTiers, serviceTypes: selectedServices, verifiedOnly, onlyOpenNow }); 
    setIsOpen(false); 
  };

  const resetFilters = () => { 
    setSearch(''); setAreaSearch(''); setSelectedAreas([]); setSelectedPrices([]); setSelectedRating(0); setSelectedTiers([]); setSelectedServices([]);
    onFilter({ search: '', areas: [], categories: [], subcategories: [], minRating: 0, prices: [], listingTiers: [], serviceTypes: [] }); 
  };

  const filteredAreas = MPUMALANGA_AREAS.filter(area => 
    area.toLowerCase().includes(areaSearch.toLowerCase())
  );

  const filterBtnBase = "transition-all duration-500 border font-black uppercase tracking-[0.2em] text-[10px] px-5 py-3 rounded-xl whitespace-nowrap shadow-sm";
  const getFilterBtnClass = (isActive: boolean) => {
    return `${filterBtnBase} ${isActive 
      ? 'bg-gold-500/20 border-gold-500 text-gold-400 shadow-[0_0_15px_rgba(227,185,44,0.3)] animate-pulse-gold' 
      : 'bg-white/[0.03] border-white/10 text-gray-500 hover:border-gold-500/40 hover:text-white'}`;
  };

  return (
    <div className="relative z-30 mb-10">
      <div className="flex flex-col md:flex-row gap-5 items-stretch">
        <div className="flex-1 relative group">
          <div className="absolute inset-0 bg-gold-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative flex items-center bg-black/60 backdrop-blur-2xl border border-white/10 rounded-full px-8 py-4 shadow-2xl focus-within:border-gold-500 transition-all duration-500">
            <Search size={24} className="text-gold-500 mr-4" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && applyFilters()} placeholder="Deep search regional entities..." className="bg-transparent border-none outline-none text-white w-full placeholder-gray-500 text-base font-sans" />
          </div>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className={`px-10 py-4 rounded-full border flex items-center justify-center gap-3 transition-all duration-500 font-black text-xs uppercase tracking-[0.3em] ${isOpen ? 'bg-gold-500 text-black border-gold-500 shadow-[0_0_20px_rgba(227,185,44,0.4)]' : 'bg-black/60 text-white border-white/10 hover:border-gold-500/60 shadow-lg'}`}>
          <Filter size={18} /> {isOpen ? 'Hide Filters' : 'Refine Results'}
        </button>
      </div>

      <div className={`absolute top-full left-0 right-0 mt-6 bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.9)] overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${isOpen ? 'max-h-[1200px] opacity-100 py-12 z-50' : 'max-h-0 opacity-0 pointer-events-none'}`}>
        <div className="px-10 md:px-16 space-y-12 custom-scrollbar overflow-y-auto max-h-[75vh]">
          {/* Service Types */}
          <div>
            <h4 className="text-gold-400 text-[11px] font-black uppercase tracking-[0.3em] mb-7 flex items-center gap-3 opacity-90"><Layers size={16} /> Filter by Service</h4>
            <div className="flex flex-wrap gap-3">
              {SERVICE_TYPE_FILTERS.map(service => (
                <button key={service} onClick={() => handleToggle(selectedServices, setSelectedServices, service)} className={getFilterBtnClass(selectedServices.includes(service))}>{service}</button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Area Filter with Search */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-7">
                <h4 className="text-gold-400 text-[11px] font-black uppercase tracking-[0.3em] flex items-center gap-3 opacity-90"><MapPin size={16} /> Regional Hubs</h4>
                <div className="relative max-w-[280px] w-full">
                  <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input 
                    type="text" 
                    value={areaSearch} 
                    onChange={(e) => setAreaSearch(e.target.value)} 
                    placeholder="Search regional hubs..." 
                    className="w-full bg-white/5 border border-white/15 rounded-xl py-3 pl-10 pr-4 text-xs text-white focus:border-gold-500/60 outline-none transition-all placeholder:text-gray-600 font-sans" 
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-3 h-56 overflow-y-auto pr-6 custom-scrollbar scroll-gold">
                {filteredAreas.map(area => (
                  <button key={area} onClick={() => handleToggle(selectedAreas, setSelectedAreas, area)} className={getFilterBtnClass(selectedAreas.includes(area))}>{area}</button>
                ))}
                {filteredAreas.length === 0 && <div className="text-gray-600 text-xs py-4 uppercase tracking-widest font-black">No sectors found.</div>}
              </div>
            </div>

            {/* Price & Listing Type */}
            <div className="space-y-10">
              <div>
                <h4 className="text-gold-400 text-[11px] font-black uppercase tracking-[0.3em] mb-7 flex items-center gap-3 opacity-90"><DollarSign size={16} /> Price Tier</h4>
                <div className="flex flex-wrap gap-3">
                  {PRICE_FILTERS.map(price => (
                    <button key={price} onClick={() => handleToggle(selectedPrices, setSelectedPrices, price)} className={getFilterBtnClass(selectedPrices.includes(price))}>{price}</button>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-gold-400 text-[11px] font-black uppercase tracking-[0.3em] mb-7 flex items-center gap-3 opacity-90"><Crown size={16} /> Network Tier</h4>
                <div className="flex flex-wrap gap-3">
                  {LISTING_TIER_FILTERS.map(tier => (
                    <button key={tier} onClick={() => handleToggle(selectedTiers, setSelectedTiers, tier)} className={getFilterBtnClass(selectedTiers.includes(tier))}>{tier}</button>
                  ))}
                </div>
              </div>
            </div>

            {/* Rating */}
            <div>
              <h4 className="text-gold-400 text-[11px] font-black uppercase tracking-[0.3em] mb-7 flex items-center gap-3 opacity-90"><Star size={16} /> Guest Experience</h4>
              <div className="flex flex-col gap-3">
                {RATING_FILTERS.map(rating => (
                  <button key={rating.value} onClick={() => setSelectedRating(selectedRating === rating.value ? 0 : rating.value)} className={getFilterBtnClass(selectedRating === rating.value)}>
                    <div className="flex items-center gap-3">
                      <Star size={12} fill={selectedRating === rating.value ? "currentColor" : "none"} />
                      {rating.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Verified / Open Now quick toggles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-gold-400 text-[11px] font-black uppercase tracking-[0.3em] mb-3 flex items-center gap-3 opacity-90"><ShieldCheck size={16} /> Verification</h4>
              <div className="flex gap-3">
                <button onClick={() => setVerifiedOnly(!verifiedOnly)} className={getFilterBtnClass(verifiedOnly)}>{verifiedOnly ? 'Verified Only' : 'Include All'}</button>
              </div>
            </div>
            <div>
              <h4 className="text-gold-400 text-[11px] font-black uppercase tracking-[0.3em] mb-3 flex items-center gap-3 opacity-90"><Clock size={16} /> Open Now</h4>
              <div className="flex gap-3">
                <button onClick={() => setOnlyOpenNow(!onlyOpenNow)} className={getFilterBtnClass(onlyOpenNow)}>{onlyOpenNow ? 'Open Now' : 'Any Time'}</button>
              </div>
            </div>
          </div>

          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <button onClick={resetFilters} className="text-gray-600 text-[10px] font-black uppercase tracking-[0.3em] hover:text-white transition-all flex items-center gap-3 group">
              <RefreshCw size={14} className="group-hover:rotate-180 transition-transform duration-700" /> Purge Selection
            </button>
            <div className="flex items-center gap-5 w-full md:w-auto">
              <button onClick={() => setIsOpen(false)} className="px-10 py-4 text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] hover:text-white transition-all">Cancel</button>
              <button onClick={applyFilters} className="flex-1 md:flex-none bg-gold-500 hover:bg-white text-black px-14 py-4 rounded-xl font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl shadow-gold-500/30 transition-all transform hover:-translate-y-1">Apply Parameters</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AuthModal = ({ isOpen, onClose, initialMode = 'login' }: { isOpen: boolean; onClose: () => void; initialMode?: 'login' | 'signup'; }) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', area: 'Mbombela (Nelspruit)', type: 'User' as 'User' | 'Business' | 'Creator' });
  const [loading, setLoading] = useState(false);
  useEffect(() => { if (isOpen) { setMode(initialMode); setFormData(prev => ({ ...prev, email: '', password: '', name: '' })); } }, [isOpen, initialMode]);
  if (!isOpen) return null;
  const handleSubmit = async (e: React.FormEvent) => { e.preventDefault(); setLoading(true); await new Promise(resolve => setTimeout(resolve, 1500)); setLoading(false); onClose(); };
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl animate-fade-in"><div className="relative bg-[#121212] border border-white/10 rounded-[2.5rem] w-full max-w-md shadow-[0_0_100px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col max-h-[90vh]"><div className="relative p-10 pb-5 text-center border-b border-white/5"><button onClick={onClose} className="absolute top-6 right-6 text-gray-500 hover:text-white p-2.5 bg-white/5 rounded-full border border-white/10 transition-all hover:scale-110"><X size={24} /></button><h3 className="text-4xl font-serif text-white mb-3 uppercase tracking-tighter">{mode === 'login' ? 'The Hub Awaits' : 'Claim Your Space'}</h3><p className="text-[10px] text-gold-500 uppercase tracking-[0.4em] font-black">Secure Authentication</p></div><div className="p-10 pt-8 overflow-y-auto"><form onSubmit={handleSubmit} className="space-y-6"><div><label className="block text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] mb-3">Email Address</label><input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-white/[0.03] border border-white/15 rounded-xl p-4 text-white focus:border-gold-500 outline-none transition-all font-sans" /></div><div><label className="block text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] mb-3">Password Credentials</label><input type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="w-full bg-white/[0.03] border border-white/15 rounded-xl p-4 text-white focus:border-gold-500 outline-none transition-all font-sans" /></div><button type="submit" disabled={loading} className="w-full bg-gold-500 hover:bg-gold-400 text-black font-black py-5 rounded-xl uppercase tracking-[0.3em] text-[11px] shadow-2xl shadow-gold-500/40 transition-all mt-8 flex items-center justify-center gap-3">{loading ? 'Validating Hub Access...' : (mode === 'login' ? 'Enter Sanctuary' : 'Initialize Profile')}<ArrowRight size={18} /></button></form><div className="mt-10 text-center border-t border-white/5 pt-8"><button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} className="text-gold-400 font-black hover:text-white transition-all uppercase text-[10px] tracking-[0.4em]">{mode === 'login' ? 'Create New Member Identity' : 'Existing Member Access'}</button></div></div></div></div>
  );
};

export const AreaDominationBadge = ({ area, tier }: { area: string; tier: 'Gold' | 'Platinum' }) => {
  const isGold = tier === 'Gold';
  const isPlatinum = tier === 'Platinum';
  
  return (
    <div className={`inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full font-black text-[10px] uppercase tracking-[0.3em] border transition-all ${
      isPlatinum 
        ? 'bg-gradient-to-r from-purple-600/30 to-purple-500/20 border-purple-400/60 text-purple-200 shadow-[0_0_20px_rgba(168,85,247,0.3)]'
        : 'bg-gradient-to-r from-amber-600/30 to-amber-500/20 border-amber-400/60 text-amber-200 shadow-[0_0_20px_rgba(217,119,6,0.3)]'
    }`}>
      <MapPin size={14} className="flex-shrink-0" />
      <span className="whitespace-nowrap">
        {isPlatinum ? '👑' : '🏆'} Dominating {area}
      </span>
    </div>
  );
};

export const TrustBadgeDisplay = ({ badge }: { badge: string }) => {
  const badgeConfig: Record<string, { label: string; color: string; icon: string }> = {
    'TOP_SELLER': { label: 'Top Seller', color: 'from-purple-600 to-purple-500', icon: '⭐' },
    'VERIFIED': { label: 'Verified', color: 'from-green-600 to-green-500', icon: '✓' },
    'RISING_STAR': { label: 'Rising Star', color: 'from-yellow-600 to-yellow-500', icon: '🌟' },
    'CUSTOMER_CHOICE': { label: 'Customer Choice', color: 'from-red-600 to-red-500', icon: '❤️' },
    'CERTIFIED': { label: 'Certified', color: 'from-blue-600 to-blue-500', icon: '🔒' },
    'RESPONSIVE_TEAM': { label: 'Responsive Team', color: 'from-emerald-600 to-emerald-500', icon: '⚡' }
  };

  const config = badgeConfig[badge] || { label: badge, color: 'from-gray-600 to-gray-500', icon: '✓' };

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${config.color} text-white text-[8px] font-black uppercase tracking-wider shadow-lg`}>
      <span>{config.icon}</span>
      <span>{config.label}</span>
    </div>
  );
};

export const VerificationIndicator = ({ type, isVerified, badge }: { type: string; isVerified: boolean; badge?: string }) => {
  const typeConfig: Record<string, { label: string; icon: string; color: string }> = {
    'ISO': { label: 'ISO Certified', icon: '📋', color: 'text-blue-400' },
    'BGC': { label: 'BGC Checked', icon: '🛡️', color: 'text-green-400' },
    'INSURANCE': { label: 'Insured', icon: '🏛️', color: 'text-purple-400' },
    'RESPONSE_TIME': { label: 'Fast Response', icon: '⚡', color: 'text-yellow-400' },
    'PAYMENT_SECURE': { label: 'Secure Payment', icon: '🔐', color: 'text-green-400' }
  };

  const config = typeConfig[type] || { label: type, icon: '✓', color: 'text-gray-400' };

  if (!isVerified) return null;

  return (
    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 ${config.color}`}>
      <span className="text-sm">{config.icon}</span>
      <span className="text-[8px] font-black uppercase tracking-wider">{badge || config.label}</span>
    </div>
  );
};

export const SellerScoreBreakdown = ({ score }: { score: any }) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-300">Quality</span>
        <div className="flex items-center gap-2">
          <div className="w-24 h-2 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-gold-500 to-gold-400" style={{ width: `${(score.quality / 5) * 100}%` }} />
          </div>
          <span className="text-sm font-bold text-gold-400">{score.quality.toFixed(1)}</span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-300">Reliability</span>
        <div className="flex items-center gap-2">
          <div className="w-24 h-2 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-green-500 to-emerald-400" style={{ width: `${score.reliability}%` }} />
          </div>
          <span className="text-sm font-bold text-green-400">{score.reliability}%</span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-300">Communication</span>
        <div className="flex items-center gap-2">
          <div className="w-24 h-2 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400" style={{ width: `${score.communication}%` }} />
          </div>
          <span className="text-sm font-bold text-blue-400">{score.communication}%</span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-300">Security</span>
        <div className="flex items-center gap-2">
          <div className="w-24 h-2 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-500 to-pink-400" style={{ width: `${score.security}%` }} />
          </div>
          <span className="text-sm font-bold text-purple-400">{score.security}%</span>
        </div>
      </div>
    </div>
  );
};

export const TrustStackPanel = ({ trustStack }: { trustStack: any }) => {
  if (!trustStack) return null;

  return (
    <div className="bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10 rounded-xl p-6 space-y-6">
      <div>
        <h3 className="text-gold-400 text-sm font-black uppercase tracking-widest mb-4">Trust Badges</h3>
        <div className="flex flex-wrap gap-2">
          {trustStack.badges?.map((badge: string) => (
            <TrustBadgeDisplay key={badge} badge={badge} />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-gold-400 text-sm font-black uppercase tracking-widest mb-4">Verification Status</h3>
        <div className="flex flex-wrap gap-2">
          {trustStack.indicators?.map((indicator: any, idx: number) => (
            <VerificationIndicator 
              key={idx} 
              type={indicator.type} 
              isVerified={indicator.isVerified} 
              badge={indicator.badge} 
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-gold-400 text-sm font-black uppercase tracking-widest mb-4">Performance Metrics</h3>
        <SellerScoreBreakdown score={trustStack.sellerScore} />
        <div className="mt-4 pt-4 border-t border-white/5 flex justify-between">
          <span className="text-sm text-gray-400">{trustStack.sellerScore.verifiedPurchaseReviews} Verified Reviews</span>
          <span className="text-sm text-gray-400">{trustStack.sellerScore.completedTransactions} Transactions</span>
        </div>
      </div>
    </div>
  );
};


