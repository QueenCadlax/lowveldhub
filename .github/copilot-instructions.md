# Copilot Instructions — LowveldHub

Essential knowledge for AI agents working on this luxury B2B directory for Mpumalanga (South Africa).

**Last Updated:** January 26, 2026 | **Stack:** React 19 + TypeScript + Vite (SPA) | **DB Model:** None (client-side state only) | **Architecture:** Monolithic SPA with single-source-of-truth state

## Quick Facts
- **Architecture:** Monolithic SPA with single-source-of-truth state in App.tsx (3536 lines)
- **Data:** 28 listing categories, 65+ Mpumalanga areas, 40+ detail view types, 32 seed files (including realEstatePropertySeeds)
- **AI Integration:** Google Gemini 3 Flash (text) + Gemini 2.5 Flash (images) via aiService.ts; realEstateService.ts provides domain-specific wrappers
- **Deployment:** Vite production build to `dist/` with chunked seed data and vendor splitting
- **Navigation:** Explicit routing via `handleNavigate()` (no browser history)

## Critical Files & Purpose
- **[App.tsx](App.tsx) (3536 lines):** Monolithic component housing all state + routing. Entry point for every view. Contains 40+ detail view cases in switch statement.
- **[types.ts](types.ts) (1232 lines):** All domain types. Update FIRST when adding features. Defines `Category` enum (28 values), `ListingTier` (4 values), `PRICING_STRUCTURE`, `MARKETPLACE_CATEGORY_GROUPS`, `ConciergePreferences`, `VIPItinerary`, and `MPUMALANGA_AREAS` (65+ areas).
- **[services/aiService.ts](services/aiService.ts) (642 lines):** All Gemini API calls. **Never import `@google/genai` elsewhere.** Uses `gemini-3-flash-preview` (text) and `gemini-2.5-flash-image` (images). Exported functions: `getSmartRecommendations`, `chatWithConcierge`, `chatWithConciergeEnhanced`, `generateListingDescription`, `generateCarImage`, `generateLuxuryPlaceholder`, `performSmartSearch`, `generateReviewSummary`, `generateAIListingDetails`, `enhanceCampaignBrief`, `enhanceStoryContent`, `getPropertyRecommendations`, `performSmartMedicalSearch`, `findBusinessMatches`, `generateAreaGuide`, `generateVIPItinerary`.
- **[services/realEstateService.ts](services/realEstateService.ts):** Real estate-specific service wrapping aiService calls for property features. Exports: `getNeighborhoodScore(area)` (returns NeighborhoodScore with safety/amenities/schools/transport scores), `generateVirtualStaging(title)` (uses aiService.generateLuxuryPlaceholder for property images). Used by [components/RealEstate/](components/RealEstate/) sub-components.
- **[components/Shared.tsx](components/Shared.tsx):** Reusable UI: `LuxuryCard` (tier badges + favorites), `SectionTitle`, `AdvancedFilterPanel`, `AuthModal`.
- **[components/Marketplace/](components/Marketplace/):** Separate namespace for C2C marketplace—ProductCard, ProductGrid, SellerProfile, FiltersPanel (toggle-based filtering).
- **[components/RealEstate/](components/RealEstate/):** Real estate feature namespace (NeighborhoodIntelligence, VirtualStaging, VirtualTour, InvestmentCalculator). All integrate with realEstateService.ts.
- **[data/](data/) directory (32 files):** Modular seed files aggregated by [data/seeds.ts](data/seeds.ts). Key imports: businessSeeds, eatsSeeds, nightlifeSeeds, nightlifeEntertainmentSeeds, retailSeeds, transportSeeds, tourismTravelSeeds, healthMedicalSeeds, expandedMedicalSeeds, specialistMedicalSeeds, familyKidsSeeds, homeConstructionTradesSeeds, businessProfessionalSeeds, automotiveSeeds, agriMiningIndustrialSeeds, luxuryLifestyleSeeds, financeMoneyServicesSeeds, itMediaCreativeSeeds, jobsAndCareersSeeds, wineAndSpiritsSeeds, realEstatePropertySeeds, and more.

## State & Navigation

**All state lives in App.tsx (line ~2624 and beyond for state setup).** No Redux/Context—intentional monolithic design for single-source-of-truth clarity. Primary state:
- `currentView`: active route string ('home', 'eats', 'directory', 'business-detail', 'marketplace', 'transport', 'nightlife', 'retail', 'stories', etc.)
- `selectedBusinessId`: currently viewed listing ID
- `activeCategory`, `activeSub`: filter state (use `Category` enum from types.ts; `CategorySubcategories` defines subcategories per category)
- `activeArea`: selected Mpumalanga area; defaults to 'All Areas'
- `localBusinesses`: dynamically filtered listing array (mutates based on category + area + search filters). **Re-initialized on every render from seed imports** to avoid stale state
- `favorites`, `isChatOpen`, `isAuthOpen`: UI toggles for modals and persistent UI state
- `conciergePrefs`: Enhanced VIP Concierge preferences including favorites, budget, areas; persisted to localStorage
- `vipItinerary`: Generated VIP itinerary data

**Routing & Navigation Pattern (line ~2924 for `handleNavigate`):** 
- **Use `handleNavigate(view: string, category?: string, id?: string, sub?: string)` for ALL routing.** Never use browser history or React Router.
- This function atomically updates state AND calls `window.scrollTo(0, 0)` to reset scroll position
- Protected routes (dashboard) check `isAuthenticated` before allowing navigation; redirects to login if needed
- Category/subcategory filters are applied during navigation, not after
- Each component receives `navigate={handleNavigate}` as a prop; never import or call directly from detail views

**Detail View Pattern:**
- Detail views (EateryDetail, BusinessDetailView, RetailDetailView, etc.) are lazy-loaded via Suspense
- All detail views **MUST** call `window.scrollTo(0, 0)` in a `useEffect` on mount (or within handleNavigate before rendering)
- Detail views receive `id` via `selectedBusinessId` state; use `<id>` prop to match with `localBusinesses` array
- Route to detail views by: `handleNavigate('<detail-view>', undefined, '<id>')` (third param is the ID)

## Listing Tier System

`ListingTier` enum in [types.ts](types.ts): `Trial` → `Premium` → `Elite` (gold glow) → `Platinum` (purple glow).

- **Before rendering premium UI, always check:** `if (listing.tier === ListingTier.Platinum) { /* purple glow */ }`
- `PRICING_STRUCTURE` in [types.ts](types.ts) maps tiers to cost; **update both together**.
- Examples: Kuka Café = `ListingTier.Elite`, University of Mpumalanga = `ListingTier.Platinum`.
- Tier glows enforced in `LuxuryCard` (line ~73): Platinum → purple shimmer, Elite → gold shimmer.

## AI Integration Pattern

**All Gemini calls must be in [services/aiService.ts](services/aiService.ts) only.** Never import `@google/genai` elsewhere in components.

**Exported functions (16 total):**
- `getSmartRecommendations(query)`: Maps search → `Category` enum values using responseSchema with JSON output
- `chatWithConcierge(message, history)`: Basic multi-turn chat with SA context awareness
- `chatWithConciergeEnhanced(message, preferences, history)`: Advanced chat with user preferences & itinerary context; may return updated preferences
- `generateListingDescription(name, type)`: Generates 2-sentence SEO descriptions
- `generateAIListingDetails(name, type, context)`: Returns structured `{description, tags[], category}`
- `generateCarImage(name)`, `generateLuxuryPlaceholder(title)`: Image generation via Gemini 2.5 Flash
- `performSmartSearch(query, allBusinesses)`: Search ranking with tier prioritization (Platinum > Elite > Premium > Trial)
- `performSmartMedicalSearch(query, allBusinesses)`: Medical-specific search with filtering and specialization
- `generateReviewSummary(name, description)`: AI-generated review examples for listings
- `findBusinessMatches(name, category, area, allBusinesses)`: Competitor/alternative matching
- `generateAreaGuide(areaName, businesses, destinations)`: Rich area content generation
- `generateVIPItinerary(preferences)`: Full itinerary generation for VIP experiences
- `enhanceCampaignBrief(brief)`: Campaign content enhancement
- `enhanceStoryContent(story)`: Story/content enhancement

**Error Handling (Mandatory):** All AI functions wrap in try/catch and return sensible defaults; never throw:
```typescript
try {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({...});
  return JSON.parse(response.text || "{}");
} catch (error) {
  console.error("AI [FunctionName] Error", error);
  return { fallback: "sensible", data: [] }; // Match return type shape
}
```

**Response Schema Pattern:** Use `responseSchema` with `responseMimeType: "application/json"` for structured output:
```typescript
config: {
  responseMimeType: "application/json",
  responseSchema: {
    type: Type.ARRAY,
    items: { type: Type.STRING }
  }
}
```

**Models & API Key:** 
- Text: `gemini-3-flash-preview` (fast, cost-effective)
- Images: `gemini-2.5-flash-image` (use only for image generation tasks)
- API key: Injected via [vite.config.ts](vite.config.ts) from `.env.local` `GEMINI_API_KEY` as `process.env.API_KEY`
- **No hot reload for `.env.local`:** Restart dev server after updating API key

## Real Estate Service Pattern

**[services/realEstateService.ts](services/realEstateService.ts) wraps domain-specific logic for property features.** Do NOT call aiService directly from RealEstate components; route through realEstateService instead.

**Exported functions:**
- `getNeighborhoodScore(area)`: Returns `NeighborhoodScore` object with algorithmic scores (safety, amenities, schools, transport, growthIndex, composite, comparableMedianPrice). Currently mocked; replace with backend analytics call in production.
- `generateVirtualStaging(title)`: Generates property image via `aiService.generateLuxuryPlaceholder()`; returns image URL or fallback Unsplash link on error.

**Pattern:** All RealEstate sub-components ([NeighborhoodIntelligence.tsx](components/RealEstate/NeighborhoodIntelligence.tsx), [VirtualStaging.tsx](components/RealEstate/VirtualStaging.tsx), [VirtualTour.tsx](components/RealEstate/VirtualTour.tsx), [InvestmentCalculator.tsx](components/RealEstate/InvestmentCalculator.tsx)) import and call `realEstateService` methods, never `aiService` directly. This maintains separation of concerns and simplifies API management.

## Seed Data Organization

**Source:** 32 modular seed files in [data/](data/) aggregated by [data/seeds.ts](data/seeds.ts). All follow schema: `{id, name, image, rating (0-5), tier (ListingTier), location, category (Category)}` + type-specific fields.

**Import Pattern in App.tsx (lines 11-34):** 
Destructure imports at top of file:
```typescript
import { businesses, nightlifeVenues, retailers, professionals, ... } from './data/seeds';
import { freightHaulageCompanies, logisticsWarehousingCompanies, ... } from './data/transportSeeds';
// Then combine all in localBusinesses state initialization
```

**Critical Notes:**
- **ID uniqueness:** All listing IDs must be globally unique across ALL seed files. Collisions cause routing failures. Use prefixes (`b_`, `r_`, `p_`) or numeric suffixes.
- **Image fields:** Every listing MUST have an `image` field (URL or path); missing images break hero sections (`h-[48vh]`).
- **Tier significance:** Affects UI rendering (gold/purple glow), search ranking, and feature access.
- **Location field:** Must match or contain a value from `MPUMALANGA_AREAS` array in [types.ts](types.ts) for area filtering to work.

**Major Seed File Categories:**
- **Core directories:** businessSeeds, eatsSeeds, retailSeeds, nightlifeSeeds, tourismTravelSeeds, transportSeeds
- **Specialized services:** healthMedicalSeeds, expandedMedicalSeeds, specialistMedicalSeeds, familyKidsSeeds, homeConstructionTradesSeeds, businessProfessionalSeeds
- **Real estate & mobility:** realEstatePropertySeeds, automotiveSeeds, agriMiningIndustrialSeeds
- **Luxury & lifestyle:** luxuryLifestyleSeeds, wineAndSpiritsSeeds, shoppingRetailSeeds, financeMoneyServicesSeeds
- **Services & support:** recruitmentAndStaffingSeeds, domesticAndPersonalServicesSeeds, convenienceAndDailyNeedsSeeds, governmentPublicServicesSeeds
- **Additional:** itMediaCreativeSeeds, jobsAndCareersSeeds, womenHealthAndMaternalSeeds, nightlifeEntertainmentSeeds, rfqSeeds, additionalPremiumSeeds, missingSeeds

## UI Components & Patterns

**`LuxuryCard`** (in [components/Shared.tsx](components/Shared.tsx)):
- Automatically handles tier badges (gold for Elite, purple for Platinum)
- Manages favorites, ratings, contact modals
- Props: `id`, `title`, `image`, `logo`, `rating`, `reviewCount`, `price`, `location`, `isElite`, `isPlatinum`, `isFavorite`, `onToggleFavorite`, `onPress`, etc.
- Use `onPress` to navigate to detail view: `onPress={() => navigate('detail-view', undefined, id)}`
- Tier glow logic (lines ~73): `if (tier === ListingTier.Platinum) { /* purple shimmer */ } else if (tier === ListingTier.Elite) { /* gold shimmer */ }`

**Responsive Design:** Mobile-first Tailwind. Grid patterns: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`. Hero heights: `h-[48vh]` (full), `h-64` (card).

**Interactive Effects:** Use `group hover:` patterns for hover states. Example: `group hover:scale-105 transition-transform`.

**Lazy Loading:** Components in `Marketplace/`, detail views (EateryDetail, BusinessDetailView, etc.) are wrapped with `Suspense` and `LoadingSpinner` to optimize initial load.

**Favorites System:** 
- `toggleFavorite(id)` mutates local state
- **Not persisted to backend** — only localStorage if explicitly added
- State shape: `favorites` is a Set<string> of business IDs

## South African Localization

- **Areas:** `MPUMALANGA_AREAS` constant in [types.ts](types.ts) (65+ areas).
- **Slang mapping in AI prompts:** "shisanyama" → braai/restaurant, "bakkie" → light truck, "koppie" → hill, "boma" → outdoor venue.
- **Currency:** Rand (R), format as "R X,XXX".
- **Concierge ranking:** verified/Premium/Elite/Platinum first, then proximity + rating.

## Build & Dev Workflow

```bash
npm install                      # Install dependencies (React 19 + TypeScript + Vite)
npm run dev                      # Vite dev server (http://localhost:3000)
npm run build                    # Production build → dist/
npm run preview                  # Preview build locally (http://localhost:4173)
```

**API Key Setup:** Create `.env.local` with `GEMINI_API_KEY=<your-key>`. [vite.config.ts](vite.config.ts) injects it via Vite's `defineConfig`.
- **No hot reload for `.env.local` changes** — restart dev server after updating.
- Both `process.env.API_KEY` and `process.env.GEMINI_API_KEY` are injected for compatibility.

**TypeScript Paths:** `@/*` alias resolves to workspace root; use `@/data/seeds` instead of `../data/seeds` (configured in [tsconfig.json](tsconfig.json)).

**Build Optimizations (vite.config.ts):**
- Seed data files are chunked separately (`seeds-*.js`) for faster main bundle loading
- Vendor splitting: `vendor-react`, `vendor-ai`, `vendor-other` for caching
- Chunk size warning limit: 800KB

**Testing & Validation:** 
- Manual: `npm run dev` → interact → check browser Console for "AI [FunctionName] Error" logs
- Playwright tests: `scripts/test-playwright.mjs`, `scripts/smoke-playwright.mjs`
- DevTools: Network tab for Gemini API calls, Console for error logs

**Key Quirks:** 
- No hot reload for `.env.local` changes; restart dev server
- Line numbers in comments drift frequently; use grep to find `handleNavigate`, `currentView`, switch statement, etc.
- Check DevTools computed styles for z-index conflicts with sticky navbar (z-50)

## Gotchas & Pitfalls

1. **Don't call `@google/genai` directly in components.** All AI must route through [services/aiService.ts](services/aiService.ts). Violating this breaks API key encapsulation and complicates error handling.
2. **State mutations in filters.** `localBusinesses` is re-computed based on `activeCategory`, `activeArea`, and search state. Never mutate this array directly; always trigger via state setters in handleNavigate.
3. **Line numbers drift.** Comment references like "Line 2810" may shift as code is added. Use grep/search to locate `handleNavigate`, `currentView`, switch statement (line 3286), etc.
4. **Navbar z-index conflicts.** Sticky header uses `z-50`; verify modals/popovers don't sit beneath. Check computed styles in DevTools.
5. **Seed data IDs must be unique across all files.** Duplicate IDs between `businesses`, `retailers`, `professionals`, etc. will cause detail view routing failures. Use prefixes (`b_`, `r_`, `p_`) or ensure global uniqueness.
6. **Marketplace ≠ Directory.** `MARKETPLACE_CATEGORY_GROUPS` (toggle-based UI) in [types.ts](types.ts) is separate from `Category` enum (dropdown filters). Never mix them.
7. **Image loading.** Detail components (EateryDetail, BusinessDetailView, etc.) expect `image` field from seed; missing images break hero sections (e.g., `h-[48vh]`).
8. **Scroll reset required.** All detail views must call `window.scrollTo(0, 0)` in `useEffect` on mount; forgetting this leaves users mid-page.
9. **Protected routes require authentication.** Dashboard and other protected views check `isAuthenticated` state; unauthenticated access redirects to login via handleNavigate.
10. **Concierge preferences persist to localStorage.** Updates during chat via `chatWithConciergeEnhanced` return updated preferences; always merge these into state if returned.

## Advanced Patterns

- **Tier-gated features:** Before rendering Elite/Platinum UI, **always check `if (listing.tier === ListingTier.Platinum)`**. Tier glows in `LuxuryCard` are enforced in the component logic.
- **Search ranking with AI:** `performSmartSearch(query)` in [services/aiService.ts](services/aiService.ts) prioritizes verified/Premium/Elite/Platinum listings first, then proximity + rating.
- **Marketplace category filtering:** Uses toggle-based UI (see [components/Marketplace/FiltersPanel.tsx](components/Marketplace/FiltersPanel.tsx)). Categories stored in state; `ProductGrid` re-filters on state change.
- **Responsive grid patterns:** Mobile-first Tailwind: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`. Hero heights: `h-[48vh]` (full), `h-64` (card).
- **Favorites persistence:** `toggleFavorite(id)` mutates local state; **not persisted to backend.** Add localStorage/API integration if persistence is needed.
- **Detail view scrolling:** All detail view components must call `window.scrollTo(0, 0)` OR `window.scrollTo({ top: 0 })` in useEffect on mount.
- **Layout compression:** New compact-luxury design reduces excessive scrolling (~37% savings). See [COMPACT_LUXURY_CHANGELOG.md](COMPACT_LUXURY_CHANGELOG.md) for spacing/padding standards.
- **Authentication flow:** LoginPage → handleLogin sets `isAuthenticated + currentUser` → protected routes redirect via handleNavigate if unauth.
- **Concierge chat context:** `chatWithConciergeEnhanced` receives `preferences` and `history` (last 10 messages); AI can return updated preferences to mutate app state.

## Adding a New Listing Type

1. Define interface in [types.ts](types.ts) with fields: `id`, `name`, `image`, `rating`, `tier`.
2. Add seed examples to new or existing seed file in [data/](data/).
3. Import seeds in [App.tsx](App.tsx) lines 11-34.
4. Add routing case in switch statement (line 3286+): `case 'my-detail': return <MyDetailView id={selectedBusinessId} navigate={handleNavigate} />`.
5. Create detail component (wrap in `Suspense` + `LoadingSpinner`); must call `window.scrollTo(0, 0)` in useEffect.
6. Update `PRICING_STRUCTURE` in [types.ts](types.ts) if adding tier-gated features.
7. Test routing: `handleNavigate('my-detail', undefined, <id>)` should render detail component with correct data.

## Common Patterns

- **App.tsx is intentionally monolithic** by design; all routing state lives there for simplicity. Current size: 3536 lines.
- **Seed data is extensive** (32 datasets, ~4000+ lines in seeds.ts); categories well-organized by type.
- **Tier system is visual + functional** — affects UI glow, search ranking, and feature access. Not just a database flag.
- **No persistent backend** — all data is client-side seed imports. State does NOT persist across page reloads unless explicitly saved to localStorage.
- **Component re-use is key** — `LuxuryCard` handles 90% of listing UI; create new detail views only for special cases.
- **Navigation is explicit** — no implicit routing; always call `handleNavigate()` to move between views.
- **Marketplace is separate namespace** — uses different Category groups and filtering logic; ProductCard ≠ LuxuryCard.
- **AI Service is the only Gemini consumer** — ensures centralized API key management and error handling. All calls wrap in try/catch with sensible fallbacks.
- **Domain services wrap AI calls** — `realEstateService` provides property-specific methods; never call `aiService` directly from domain components.
- **Detail view pattern:** All detail views receive `id` via `selectedBusinessId`, search local array, render content, call scroll reset on mount.


