import React, { useState, useMemo } from 'react';
import { MapPin, Filter, Search, Grid, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Category, CategorySubcategories, MPUMALANGA_AREAS, Business, ListingTier } from '../types';
import { LuxuryCard } from './Shared';

interface CategoryGridDirectoryProps {
  businesses: Business[];
  favorites: string[];
  toggleFavorite: (id: string) => void;
  navigate: (view: string, category?: string, id?: string, subcategory?: string) => void;
}

// Category metadata for icons & display
const CATEGORY_METADATA: Record<Category, { icon: string; color: string; description: string }> = {
  [Category.FoodAndHospitality]: { icon: '🍽️', color: 'from-orange-500 to-red-500', description: 'Restaurants & Dining' },
  [Category.TourismTravelAndStays]: { icon: '✈️', color: 'from-blue-500 to-cyan-500', description: 'Travel & Accommodation' },
  [Category.LuxuryAndLifestyle]: { icon: '💎', color: 'from-purple-500 to-pink-500', description: 'Luxury Experiences' },
  [Category.NightlifeAndEntertainment]: { icon: '🎭', color: 'from-indigo-500 to-purple-500', description: 'Entertainment' },
  [Category.BeautyWellnessPersonalCare]: { icon: '💆', color: 'from-pink-500 to-rose-500', description: 'Beauty & Wellness' },
  [Category.HealthAndMedical]: { icon: '⚕️', color: 'from-green-500 to-emerald-500', description: 'Medical Services' },
  [Category.PetsAndVeterinary]: { icon: '🐾', color: 'from-yellow-500 to-amber-500', description: 'Pets & Animals' },
  [Category.RealEstateAndProperty]: { icon: '🏠', color: 'from-amber-600 to-yellow-500', description: 'Real Estate' },
  [Category.Automotive]: { icon: '🚗', color: 'from-gray-600 to-gray-700', description: 'Automotive' },
  [Category.TransportAndLogistics]: { icon: '🚚', color: 'from-blue-600 to-blue-700', description: 'Transport' },
  [Category.HomeConstructionAndTrades]: { icon: '🔨', color: 'from-orange-600 to-amber-600', description: 'Construction' },
  [Category.ShoppingAndRetail]: { icon: '🛍️', color: 'from-red-500 to-pink-500', description: 'Retail & Shopping' },
  [Category.BusinessAndProfessional]: { icon: '💼', color: 'from-slate-600 to-slate-700', description: 'Business & Law' },
  [Category.FinancialServices]: { icon: '💰', color: 'from-green-600 to-emerald-600', description: 'Financial Services' },
  [Category.EducationAndSkills]: { icon: '📚', color: 'from-indigo-600 to-blue-600', description: 'Education' },
  [Category.ITMediaAndCreative]: { icon: '💻', color: 'from-cyan-600 to-blue-600', description: 'Tech & Media' },
  [Category.AgricultureAndIndustry]: { icon: '🌾', color: 'from-green-700 to-emerald-700', description: 'Agriculture' },
  [Category.CommunityAndOrganisations]: { icon: '👥', color: 'from-blue-500 to-blue-600', description: 'Community' },
  [Category.GovernmentAndPublicServices]: { icon: '🏛️', color: 'from-slate-600 to-slate-800', description: 'Government' },
  [Category.EventsAndWeddings]: { icon: '🎉', color: 'from-pink-500 to-purple-500', description: 'Events & Weddings' },
  [Category.SportsFitnessAndRecreation]: { icon: '⚽', color: 'from-orange-500 to-yellow-500', description: 'Sports & Fitness' },
  [Category.SecuritySafetyAndProtection]: { icon: '🛡️', color: 'from-red-600 to-red-700', description: 'Security' },
  [Category.EnergyUtilitiesAndGreenSolutions]: { icon: '⚡', color: 'from-yellow-600 to-yellow-700', description: 'Energy & Green' },
  [Category.RecruitmentAndStaffing]: { icon: '👔', color: 'from-blue-600 to-indigo-600', description: 'Recruitment' },
  [Category.DomesticAndPersonalServices]: { icon: '🏠', color: 'from-amber-500 to-orange-500', description: 'Domestic Services' },
  [Category.ConvenienceAndDailyNeeds]: { icon: '🏪', color: 'from-purple-500 to-pink-500', description: 'Daily Needs' },
  [Category.WomenHealthAndMaternal]: { icon: '👩‍⚕️', color: 'from-red-500 to-pink-500', description: 'Women\'s Health' },
  [Category.JobsAndCareers]: { icon: '💼', color: 'from-indigo-600 to-blue-600', description: 'Jobs & Careers' }
};

export const CategoryGridDirectory: React.FC<CategoryGridDirectoryProps> = ({
  businesses,
  favorites,
  toggleFavorite,
  navigate
}) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [selectedArea, setSelectedArea] = useState<string>('All Areas');
  const [searchQuery, setSearchQuery] = useState('');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  // Filter businesses based on all criteria
  const filteredBusinesses = useMemo(() => {
    return businesses.filter(b => {
      if (selectedCategory && b.category !== selectedCategory) return false;
      if (selectedSubcategory && b.subcategory !== selectedSubcategory) return false;
      if (selectedArea !== 'All Areas' && !b.location.includes(selectedArea)) return false;
      if (verifiedOnly && b.tier === 'Trial') return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return b.name.toLowerCase().includes(q) || b.description?.toLowerCase().includes(q);
      }
      return true;
    });
  }, [businesses, selectedCategory, selectedSubcategory, selectedArea, verifiedOnly, searchQuery]);

  // Get subcategories for selected category
  const subcategories = selectedCategory ? CategorySubcategories[selectedCategory] : [];

  // All categories for grid
  const allCategories = Object.values(Category);

  // Pagination
  const totalPages = Math.ceil(filteredBusinesses.length / ITEMS_PER_PAGE);
  const paginatedBusinesses = useMemo(() => {
    const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredBusinesses.slice(startIdx, startIdx + ITEMS_PER_PAGE);
  }, [filteredBusinesses, currentPage]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-2">Discover Mpumalanga's Best Services</h1>
          <p className="text-amber-100 text-lg">
            Find trusted businesses in seconds. No scrolling, no hidden categories.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Search & Quick Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or keyword..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>

          {/* Filter Button & Toggle Filters */}
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              <Filter size={18} /> Filters {showFilters ? '−' : '+'}
            </button>

            {selectedArea !== 'All Areas' && (
              <button
                onClick={() => setSelectedArea('All Areas')}
                className="px-4 py-2 bg-amber-100 text-amber-800 rounded-lg text-sm font-medium flex items-center gap-2"
              >
                <MapPin size={16} /> {selectedArea} <span className="ml-1 cursor-pointer">✕</span>
              </button>
            )}

            {selectedCategory && (
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedSubcategory(null);
                }}
                className="px-4 py-2 bg-amber-100 text-amber-800 rounded-lg text-sm font-medium"
              >
                {CATEGORY_METADATA[selectedCategory].description} ✕
              </button>
            )}

            {selectedSubcategory && (
              <button
                onClick={() => setSelectedSubcategory(null)}
                className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium"
              >
                {selectedSubcategory} ✕
              </button>
            )}

            {verifiedOnly && (
              <button
                onClick={() => setVerifiedOnly(false)}
                className="px-4 py-2 bg-green-100 text-green-800 rounded-lg text-sm font-medium"
              >
                Verified Only ✕
              </button>
            )}
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-white rounded-lg border border-gray-200">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Area</label>
                <select
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  <option>All Areas</option>
                  {MPUMALANGA_AREAS.map(area => (
                    <option key={area} value={area}>{area}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Trust Level</label>
                <button
                  onClick={() => setVerifiedOnly(!verifiedOnly)}
                  className={`w-full px-4 py-2 rounded-lg font-medium transition ${
                    verifiedOnly
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  ✓ Verified & Premium Only
                </button>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Results</label>
                <p className="px-4 py-2 text-lg font-bold text-amber-700">
                  {filteredBusinesses.length} found
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Category Grid (Always Visible) */}
        {!selectedCategory ? (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {allCategories.map(cat => {
                const meta = CATEGORY_METADATA[cat];
                const count = businesses.filter(b => b.category === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`p-4 rounded-lg border-2 transition text-left group ${
                      selectedCategory === cat
                        ? 'border-amber-500 bg-amber-50'
                        : 'border-gray-200 bg-white hover:border-amber-400 hover:shadow-md'
                    }`}
                  >
                    <div className="text-3xl mb-2 group-hover:scale-110 transition">{meta.icon}</div>
                    <h3 className="font-bold text-gray-900 text-sm line-clamp-2">{meta.description}</h3>
                    <p className="text-xs text-gray-500 mt-1">{count} services</p>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="mb-12">
            <button
              onClick={() => {
                setSelectedCategory(null);
                setSelectedSubcategory(null);
              }}
              className="mb-6 text-amber-700 hover:text-amber-800 font-semibold flex items-center gap-2"
            >
              ← Back to Categories
            </button>

            {/* Subcategory Filter (if selected category) */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {CATEGORY_METADATA[selectedCategory].icon} {CATEGORY_METADATA[selectedCategory].description}
              </h2>
              
              <div className="mb-6 flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedSubcategory(null)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    !selectedSubcategory
                      ? 'bg-amber-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All ({businesses.filter(b => b.category === selectedCategory).length})
                </button>
                {subcategories.map(sub => {
                  const subCount = businesses.filter(
                    b => b.category === selectedCategory && b.subcategory === sub
                  ).length;
                  return (
                    <button
                      key={sub}
                      onClick={() => setSelectedSubcategory(sub)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                        selectedSubcategory === sub
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {sub} ({subCount})
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Results Grid */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedCategory
                ? `${CATEGORY_METADATA[selectedCategory].description}`
                : 'Featured Services'}
              <span className="text-gray-500 text-lg"> ({filteredBusinesses.length})</span>
            </h2>
          </div>

          {filteredBusinesses.length === 0 ? (
            <div className="bg-white rounded-lg p-12 text-center border-2 border-dashed border-gray-300">
              <p className="text-gray-600 font-medium text-lg">No services match your filters</p>
              <p className="text-gray-500 mt-2">Try adjusting your search or selecting a different category</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {paginatedBusinesses.map(business => (
                  <LuxuryCard
                    key={business.id}
                    id={business.id}
                    title={business.name}
                    image={business.image}
                    rating={business.rating}
                    reviewCount={business.reviewCount}
                    location={business.location}
                    isFavorite={favorites.includes(business.id)}
                    onToggleFavorite={() => toggleFavorite(business.id)}
                    onPress={() => navigate('business-detail', business.category, business.id)}
                    isPlatinum={business.tier === ListingTier.Platinum}
                    isElite={business.tier === ListingTier.Elite}
                    trustBadges={business.trustStack?.badges || []}
                  />
                ))}
              </div>
              
              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="mt-12 flex justify-center items-center gap-4">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  
                  <div className="flex gap-2">
                    {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                      const pageNum = currentPage <= 3 ? i + 1 : currentPage - 2 + i;
                      if (pageNum > totalPages) return null;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`px-3 py-2 rounded-lg transition-all ${
                            currentPage === pageNum
                              ? 'bg-amber-600 text-white'
                              : 'border border-gray-300 hover:bg-gray-100'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>
                  
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronRight size={20} />
                  </button>
                  
                  <span className="text-sm text-gray-600 ml-4">
                    Page {currentPage} of {totalPages}
                  </span>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
