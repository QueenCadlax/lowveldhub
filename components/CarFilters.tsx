import React, { useMemo } from 'react';

type Filters = {
  brand?: string;
  model?: string;
  yearMin?: number;
  yearMax?: number;
  priceMin?: number;
  priceMax?: number;
  dealerTypes?: string[];
  condition?: string[];
  fuel?: string[];
  transmission?: string[];
  mileageMax?: number;
};

export const defaultFilters: Filters = {};

export const CarFilters: React.FC<{
  cars: any[];
  filters: Filters;
  setFilters: (f: Filters) => void;
  onApply?: () => void;
}> = ({ cars, filters, setFilters, onApply }) => {
  // derive brands & models
  const brands = useMemo(() => {
    const s = new Set<string>();
    cars.forEach(c => {
      const brand = (c.title || '').split(' ')[0];
      if (brand) s.add(brand);
    });
    return Array.from(s).sort();
  }, [cars]);

  const models = useMemo(() => {
    const ms = new Set<string>();
    cars.forEach(c => {
      const parts = (c.title || '').split(' ');
      if (parts.length > 1) ms.add(parts.slice(1).join(' '));
    });
    return Array.from(ms).slice(0, 50);
  }, [cars]);

  const update = (patch: Partial<Filters>) => setFilters({ ...filters, ...patch });

  return (
    <div className="w-80 bg-black p-4 rounded-2xl shadow-lg sticky top-24 h-fit border border-white/6">
      <h2 className="text-white font-bold text-lg mb-4">Filters</h2>

      <label className="text-sm text-gray-300 block mb-2">Brand</label>
      <select value={filters.brand || ''} onChange={e => update({ brand: e.target.value || undefined })} className="w-full bg-white/5 border border-white/10 rounded p-2 text-white mb-3">
        <option value="">Any</option>
        {brands.map(b => <option key={b} value={b}>{b}</option>)}
      </select>

      <label className="text-sm text-gray-300 block mb-2">Model</label>
      <select value={filters.model || ''} onChange={e => update({ model: e.target.value || undefined })} className="w-full bg-white/5 border border-white/10 rounded p-2 text-white mb-3">
        <option value="">Any</option>
        {models.map(m => <option key={m} value={m}>{m}</option>)}
      </select>

      <label className="text-sm text-gray-300 block mb-2">Year</label>
      <div className="flex gap-2 mb-3">
        <input type="number" placeholder="Min" value={filters.yearMin || ''} onChange={e => update({ yearMin: e.target.value ? Number(e.target.value) : undefined })} className="w-1/2 bg-white/5 border border-white/10 rounded p-2 text-white" />
        <input type="number" placeholder="Max" value={filters.yearMax || ''} onChange={e => update({ yearMax: e.target.value ? Number(e.target.value) : undefined })} className="w-1/2 bg-white/5 border border-white/10 rounded p-2 text-white" />
      </div>

      <label className="text-sm text-gray-300 block mb-2">Price (R)</label>
      <div className="flex gap-2 mb-3">
        <input type="number" placeholder="Min" value={filters.priceMin || ''} onChange={e => update({ priceMin: e.target.value ? Number(e.target.value) : undefined })} className="w-1/2 bg-white/5 border border-white/10 rounded p-2 text-white" />
        <input type="number" placeholder="Max" value={filters.priceMax || ''} onChange={e => update({ priceMax: e.target.value ? Number(e.target.value) : undefined })} className="w-1/2 bg-white/5 border border-white/10 rounded p-2 text-white" />
      </div>

      <label className="text-sm text-gray-300 block mb-2">Dealer Type</label>
      <div className="flex flex-col gap-2 mb-3">
        {['Premium','Verified','Local'].map(dt => (
          <label key={dt} className="text-gray-300 text-sm"><input type="checkbox" checked={filters.dealerTypes?.includes(dt) || false} onChange={e => {
            const set = new Set(filters.dealerTypes || []);
            if (e.target.checked) set.add(dt); else set.delete(dt);
            update({ dealerTypes: Array.from(set) });
          }} className="mr-2" />{dt}</label>
        ))}
      </div>

      <label className="text-sm text-gray-300 block mb-2">Condition</label>
      <div className="flex gap-2 mb-3">
        {['New','Used','Certified'].map(c => (
          <button key={c} onClick={() => update({ condition: filters.condition?.includes(c) ? filters.condition?.filter(x => x !== c) : [...(filters.condition || []), c] })} className={`px-3 py-2 rounded ${filters.condition?.includes(c) ? 'bg-gold-500 text-black' : 'bg-white/5 text-white'}`}>{c}</button>
        ))}
      </div>

      <label className="text-sm text-gray-300 block mb-2">Fuel</label>
      <div className="flex flex-wrap gap-2 mb-3">
        {['Petrol','Diesel','Electric','Hybrid'].map(f => (
          <button key={f} onClick={() => update({ fuel: filters.fuel?.includes(f) ? filters.fuel?.filter(x => x !== f) : [...(filters.fuel || []), f] })} className={`px-2 py-1.5 rounded text-xs font-medium ${filters.fuel?.includes(f) ? 'bg-gold-500 text-black' : 'bg-white/5 text-white'}`}>{f}</button>
        ))}
      </div>

      <label className="text-sm text-gray-300 block mb-2">Transmission</label>
      <div className="flex gap-2 mb-3">
        {['Manual','Automatic'].map(t => (
          <button key={t} onClick={() => update({ transmission: filters.transmission?.includes(t) ? filters.transmission?.filter(x => x !== t) : [...(filters.transmission || []), t] })} className={`px-3 py-2 rounded ${filters.transmission?.includes(t) ? 'bg-gold-500 text-black' : 'bg-white/5 text-white'}`}>{t}</button>
        ))}
      </div>

      <label className="text-sm text-gray-300 block mb-2">Max Mileage (km)</label>
      <input type="number" placeholder="e.g. 50000" value={filters.mileageMax || ''} onChange={e => update({ mileageMax: e.target.value ? Number(e.target.value) : undefined })} className="w-full bg-white/5 border border-white/10 rounded p-2 text-white mb-4" />

      <div className="mt-2">
        <button onClick={() => onApply && onApply()} className="w-full p-3 bg-gold-500 text-black font-bold rounded-lg">Apply Filters</button>
      </div>
    </div>
  );
};

export default CarFilters;
