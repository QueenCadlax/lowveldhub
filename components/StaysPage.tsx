import React, { useMemo, useState, useCallback } from 'react';
import { stays as staysData } from '../data/seeds';
import { Category, MPUMALANGA_AREAS } from '../types';
import { ChevronDown, Heart, MapPin, Star, Wifi, Droplets, Utensils, Filter, X, Search } from 'lucide-react';

interface Stay {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviewCount?: number;
  location: string;
  pricePerNight?: number;
  type?: string;
  tier?: string;
  amenities?: string[];
  maxGuests?: number;
  bathrooms?: number;
  featured?: boolean;
  isElite?: boolean;
}

const PROPERTY_TYPES = ['Villa', 'Lodge', 'Cottage', 'Resort', 'Guest House', 'Boutique Hotel'];
const STAY_TYPES = ['Luxury Suite', 'Self-Catering', 'Bed & Breakfast', 'All-Inclusive'];
const AMENITIES_LIST = ['Pool', 'Spa', 'Restaurant', 'WiFi', 'Pet Friendly', 'Mountain View', 'River View', 'Hot Tub'];
const SPECIAL_FEATURES = ['Romantic 💕', 'Family-Friendly 👨‍👩‍👧‍👦', 'Pet-Friendly 🐾', 'Adventure-Ready 🏔️'];

interface AmenityIconProps {
  name: string;
  className?: string;
}

const AmenityIcon: React.FC<AmenityIconProps> = ({ name, className = '' }) => {
  const icons: Record<string, React.ReactNode> = {
    'WiFi': <Wifi className={`w-4 h-4 ${className}`} />,
    'Pool': <Droplets className={`w-4 h-4 ${className}`} />,
    'Restaurant': <Utensils className={`w-4 h-4 ${className}`} />,
    'Spa': <Droplets className={`w-4 h-4 ${className}`} />,
  };
  return <>{icons[name] || '✓'}</>;
};

const PremiumStayCard: React.FC<{ stay: Stay; onViewDetail: (id: string) => void }> = React.memo(({ stay, onViewDetail }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleSave = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
  }, [isSaved]);

  return (
    <div
      onClick={() => onViewDetail(stay.id)}
      className="group cursor-pointer rounded-xl overflow-hidden bg-[#1A1A1E] border border-[#2A2A2E] hover:border-[#D4AF37] transition-all hover:shadow-2xl hover:shadow-[#D4AF37]/20"
    >
      {/* Image Container - Shorter */}
      <div className="relative h-52 bg-gradient-to-br from-[#2A2A2E] to-[#0E0E11] overflow-hidden">
        {!imageError && stay.image ? (
          <img
            src={stay.image}
            alt={stay.name}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center text-[#7A7A80]">
              <Droplets className="w-8 h-8 mx-auto opacity-30 mb-1" />
              <span className="text-xs">{stay.name}</span>
            </div>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

        {/* Top-Left Badge */}
        {(stay.tier === 'Elite' || stay.tier === 'Platinum' || stay.isElite) && (
          <div className="absolute top-3 left-3">
            <span className="bg-black/70 backdrop-blur text-[#D4AF37] px-2 py-1 rounded-full text-xs font-bold uppercase">
              {stay.tier === 'Platinum' ? '💎 LUXURY' : '✨ ELITE'}
            </span>
          </div>
        )}

        {/* Top-Right Favorite Heart */}
        <button
          onClick={handleSave}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-white/10 backdrop-blur rounded-full hover:bg-white/20 transition-all"
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-white'}`} />
        </button>
      </div>

      {/* Content - More Compact */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <h3 className="text-base font-semibold text-white line-clamp-1">{stay.name}</h3>

        {/* Type & Location */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-[#A0A0A6]">{stay.type || 'Accommodation'}</span>
          <span className="text-[#7A7A80]">•</span>
          <div className="flex items-center gap-1 text-[#A0A0A6] line-clamp-1">
            <MapPin className="w-3 h-3 text-[#D4AF37] flex-shrink-0" />
            {stay.location}
          </div>
        </div>

        {/* Amenities Icons - Compact */}
        {stay.amenities && stay.amenities.length > 0 && (
          <div className="flex gap-2">
            {stay.amenities.slice(0, 2).map((amenity, idx) => (
              <div key={idx} title={amenity} className="text-[#D4AF37]">
                <AmenityIcon name={amenity} />
              </div>
            ))}
          </div>
        )}

        {/* Rating & Price - Horizontal */}
        <div className="flex items-center justify-between pt-2 border-t border-[#2A2A2E]">
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-[#D4AF37] text-[#D4AF37]" />
            <span className="font-semibold text-white text-sm">{(stay.rating || 4.8).toFixed(1)}</span>
          </div>
          <p className="text-sm font-bold text-white">
            R<span className="text-[#D4AF37]">{(stay.pricePerNight || 2500).toLocaleString()}</span>
            <span className="text-xs font-normal text-[#A0A0A6]">/nt</span>
          </p>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => onViewDetail(stay.id)}
          className="w-full py-2 bg-[#D4AF37] text-black font-bold text-sm rounded-lg hover:bg-[#E8D4A0] transition-all"
        >
          View
        </button>
      </div>
    </div>
  );
});

PremiumStayCard.displayName = 'PremiumStayCard';

export default function StaysPage({ navigate }: { navigate?: (view: string, subview?: string | undefined, id?: string) => void }): JSX.Element {
  const stays = useMemo(() => (staysData || []) as Stay[], []);

  const [filters, setFilters] = useState({
    location: 'All Areas',
    propertyType: [] as string[],
    stayType: [] as string[],
    amenities: [] as string[],
    specialFeatures: [] as string[],
    priceMin: 500,
    priceMax: 10000,
    ratingMin: 0,
  });

  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleViewDetail = useCallback((id: string) => {
    if (navigate) navigate('stays-detail', undefined, id);
  }, [navigate]);

  // Filter logic
  const filtered = useMemo(() => {
    let results = [...stays];

    // Search term filter
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      results = results.filter(s => 
        s.name.toLowerCase().includes(q) ||
        s.type?.toLowerCase().includes(q) ||
        (s.amenities || []).some(a => a.toLowerCase().includes(q))
      );
    }

    if (filters.location !== 'All Areas') {
      results = results.filter(s => s.location === filters.location);
    }

    if (filters.propertyType.length > 0) {
      results = results.filter(s =>
        filters.propertyType.some(pt => s.type?.toLowerCase().includes(pt.toLowerCase()))
      );
    }

    if (filters.stayType.length > 0) {
      results = results.filter(s =>
        filters.stayType.some(st => (s.amenities || []).some(a => a.includes(st)))
      );
    }

    if (filters.amenities.length > 0) {
      results = results.filter(s =>
        filters.amenities.some(a => (s.amenities || []).some(am => am.includes(a)))
      );
    }

    if (filters.ratingMin > 0) {
      results = results.filter(s => (s.rating || 0) >= filters.ratingMin);
    }

    results = results.filter(s => {
      const price = s.pricePerNight || 2500;
      return price >= filters.priceMin && price <= filters.priceMax;
    });

    // Sort by rating & tier
    return results.sort((a, b) => {
      if (a.tier === 'Platinum' && b.tier !== 'Platinum') return -1;
      if (b.tier === 'Platinum' && a.tier !== 'Platinum') return 1;
      return (b.rating || 0) - (a.rating || 0);
    });
  }, [stays, filters, searchTerm]);

  const clearFilters = useCallback(() => {
    setFilters({
      location: 'All Areas',
      propertyType: [],
      stayType: [],
      amenities: [],
      specialFeatures: [],
      priceMin: 500,
      priceMax: 10000,
      ratingMin: 0,
    });
  }, []);

  return (
    <div className="min-h-screen bg-black text-white pt-20 pb-16">
      {/* HERO SECTION */}
      <div className="relative h-72 bg-black overflow-hidden mb-12">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-b from-gold-500/5 to-transparent" />
        </div>
        <div className="relative h-full flex flex-col items-center justify-center text-center px-8 space-y-6">
          <h1 className="text-5xl md:text-6xl font-serif font-bold">Luxury Stays</h1>
          <p className="text-lg text-gray-300 max-w-2xl">Experience exceptional accommodations across Mpumalanga</p>
          
          {/* Search Bar */}
          <div className="max-w-2xl w-full mt-6">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, type, or amenities..."
                className="w-full px-4 py-3 pl-11 rounded-lg bg-white/10 border border-gold-500/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-500 text-sm"
              />
              <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
            </div>
          </div>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-12">
        <div className="h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          {/* LEFT: FILTER PANEL */}
          <div>
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden w-full py-3 mb-6 bg-[#1A1A1E] text-white border border-[#D4AF37] rounded-lg flex items-center justify-center gap-2 hover:bg-[#2A2A2E]"
            >
              <Filter className="w-5 h-5" />
              Filters
            </button>

            {/* Filter Container */}
            <div className={`${showMobileFilters ? 'block' : 'hidden'} lg:block space-y-6 pb-8`}>
              <div>
                <h3 className="text-[#D4AF37] uppercase text-sm font-bold mb-3">Location</h3>
                <button
                  onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                  className="w-full px-4 py-3 bg-[#1A1A1E] text-white rounded-lg flex items-center justify-between hover:bg-[#2A2A2E] border border-[#2A2A2E]"
                >
                  <span className="text-sm">{filters.location}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showLocationDropdown ? 'rotate-180' : ''}`} />
                </button>
                {showLocationDropdown && (
                  <div className="mt-2 bg-[#1A1A1E] rounded-lg border border-[#2A2A2E] max-h-64 overflow-y-auto">
                    <button
                      onClick={() => {
                        setFilters(prev => ({ ...prev, location: 'All Areas' }));
                        setShowLocationDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-[#2A2A2E] text-white text-sm"
                    >
                      All Areas
                    </button>
                    {MPUMALANGA_AREAS.map(area => (
                      <button
                        key={area}
                        onClick={() => {
                          setFilters(prev => ({ ...prev, location: area }));
                          setShowLocationDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-[#2A2A2E] text-[#A0A0A6] text-sm"
                      >
                        {area}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Property Type */}
              <div>
                <h3 className="text-[#D4AF37] uppercase text-sm font-bold mb-3">Property Type</h3>
                <div className="space-y-2">
                  {PROPERTY_TYPES.map(type => (
                    <label key={type} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.propertyType.includes(type)}
                        onChange={() => {
                          setFilters(prev => ({
                            ...prev,
                            propertyType: prev.propertyType.includes(type)
                              ? prev.propertyType.filter(t => t !== type)
                              : [...prev.propertyType, type],
                          }));
                        }}
                        className="w-4 h-4 rounded accent-[#D4AF37]"
                      />
                      <span className="text-white text-sm hover:text-[#D4AF37]">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Accommodation Type */}
              <div>
                <h3 className="text-[#D4AF37] uppercase text-sm font-bold mb-3">Accommodation Type</h3>
                <div className="space-y-2">
                  {STAY_TYPES.map(type => (
                    <label key={type} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.stayType.includes(type)}
                        onChange={() => {
                          setFilters(prev => ({
                            ...prev,
                            stayType: prev.stayType.includes(type)
                              ? prev.stayType.filter(t => t !== type)
                              : [...prev.stayType, type],
                          }));
                        }}
                        className="w-4 h-4 rounded accent-[#D4AF37]"
                      />
                      <span className="text-white text-sm hover:text-[#D4AF37]">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="text-[#D4AF37] uppercase text-sm font-bold mb-3">Amenities</h3>
                <div className="space-y-2">
                  {AMENITIES_LIST.map(amenity => (
                    <label key={amenity} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.amenities.includes(amenity)}
                        onChange={() => {
                          setFilters(prev => ({
                            ...prev,
                            amenities: prev.amenities.includes(amenity)
                              ? prev.amenities.filter(a => a !== amenity)
                              : [...prev.amenities, amenity],
                          }));
                        }}
                        className="w-4 h-4 rounded accent-[#D4AF37]"
                      />
                      <span className="text-white text-sm hover:text-[#D4AF37]">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="text-[#D4AF37] uppercase text-sm font-bold mb-3">Price Range</h3>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="500"
                    max="10000"
                    step="500"
                    value={filters.priceMax}
                    onChange={(e) => setFilters(prev => ({ ...prev, priceMax: parseInt(e.target.value) }))}
                    className="w-full h-2 bg-[#2A2A2E] rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                  />
                  <div className="flex justify-between text-xs text-[#A0A0A6]">
                    <span>R{filters.priceMin.toLocaleString()}</span>
                    <span>R{filters.priceMax.toLocaleString()}+</span>
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div>
                <h3 className="text-[#D4AF37] uppercase text-sm font-bold mb-3">Rating</h3>
                <div className="space-y-2">
                  {[
                    { label: '5.0 Stars', value: 5 },
                    { label: '4.8+ Stars', value: 4.8 },
                    { label: '4.5+ Stars', value: 4.5 },
                    { label: 'Any Rating', value: 0 },
                  ].map(rating => (
                    <label key={rating.value} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="rating"
                        checked={filters.ratingMin === rating.value}
                        onChange={() => setFilters(prev => ({ ...prev, ratingMin: rating.value }))}
                        className="w-4 h-4 accent-[#D4AF37]"
                      />
                      <span className="text-white text-sm hover:text-[#D4AF37]">{rating.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Special Features */}
              <div>
                <h3 className="text-[#D4AF37] uppercase text-sm font-bold mb-3">Special Features</h3>
                <div className="space-y-2">
                  {SPECIAL_FEATURES.map(feature => (
                    <label key={feature} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.specialFeatures.includes(feature)}
                        onChange={() => {
                          setFilters(prev => ({
                            ...prev,
                            specialFeatures: prev.specialFeatures.includes(feature)
                              ? prev.specialFeatures.filter(f => f !== feature)
                              : [...prev.specialFeatures, feature],
                          }));
                        }}
                        className="w-4 h-4 rounded accent-[#D4AF37]"
                      />
                      <span className="text-white text-sm hover:text-[#D4AF37]">{feature}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Reset Button */}
              <button
                onClick={clearFilters}
                className="w-full py-3 border border-white text-white hover:text-black hover:bg-white rounded-lg transition-all font-semibold text-sm"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* RIGHT: LISTINGS FEED */}
          <div>
            {filtered.length > 0 ? (
              <>
                {/* Curated Experiences */}
                {filtered.length > 0 && (
                  <div className="mb-12">
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-white mb-2">🌟 Editor's Picks</h2>
                      <div className="h-px bg-gradient-to-r from-[#D4AF37] to-transparent w-32" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                      {filtered
                        .slice(0, 4)
                        .map(stay => (
                          <PremiumStayCard
                            key={stay.id}
                            stay={stay}
                            onViewDetail={handleViewDetail}
                          />
                        ))}
                    </div>
                    <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mb-12" />
                  </div>
                )}

                {/* All Stays */}
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-white mb-2">Available Stays</h2>
                  <p className="text-sm text-[#A0A0A6]">Showing <span className="text-[#D4AF37] font-bold">{filtered.length}</span> properties</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filtered.map(stay => (
                    <PremiumStayCard
                      key={stay.id}
                      stay={stay}
                      onViewDetail={handleViewDetail}
                    />
                  ))}
                </div>

                {/* Curated Badge Footer */}
                <div className="text-center mt-16 pt-8 border-t border-[#2A2A2E]">
                  <p className="text-sm text-[#A0A0A6]">✓ Curated by <span className="text-[#D4AF37] font-bold">LowveldHub</span></p>
                  <p className="text-xs text-[#7A7A80] mt-1">All stays verified and excellence-rated</p>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <Heart className="w-12 h-12 text-[#D4AF37] mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">No Stays Found</h3>
                <p className="text-[#A0A0A6] mb-6">Try adjusting your filters to discover luxury accommodations</p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-[#D4AF37] text-black font-semibold rounded-lg hover:bg-[#E8D4A0] transition-all"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
