import React from 'react';
import { Star, Car, Users, Briefcase, ShieldCheck, Wifi, Heart, Share2, MapPin } from 'lucide-react';
import { PrimaryButton } from './Shared';

const Amenity = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <div className="flex items-center gap-2 text-sm text-gray-300">
    <div className="w-7 h-7 rounded-full bg-black/40 flex items-center justify-center text-gold-300">{icon}</div>
    <div className="truncate">{label}</div>
  </div>
);

const TransportCard: React.FC<{
  service: any;
  onBook?: (s: any) => void;
  onContact?: (s: any) => void;
  onOpen?: (s: any) => void;
}> = ({ service, onBook, onContact, onOpen }) => {
  return (
    <div
      className="group bg-[#0b0b0b] rounded-2xl overflow-hidden border border-white/6 shadow-[0_6px_24px_rgba(0,0,0,0.6)] transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.9)] cursor-pointer"
      onClick={() => onOpen && onOpen(service)}
    >
      <div className="relative overflow-hidden" style={service.subcategory && String(service.subcategory).toUpperCase().includes('HELICOPTER') ? {height: '288px'} : {aspectRatio: '4 / 5'}}>
        <img src={service.image} alt={service.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

        <div className="absolute top-4 left-4">
          {service.tier && (
            <div className="bg-black text-gold-300 text-[11px] font-bold px-3 py-1 rounded shadow">{service.tier.toUpperCase()}</div>
          )}
        </div>

        <div className="absolute top-4 right-4 flex gap-2">
          <button onClick={(e) => { e.stopPropagation(); /* favorite action could be wired */ }} className="p-2 rounded-full bg-black/50 border border-white/6 text-white">
            <Heart size={14} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); /* share */ }} className="p-2 rounded-full bg-black/50 border border-white/6 text-white">
            <Share2 size={14} />
          </button>
        </div>
      </div>

        <div className="p-5 flex flex-col gap-3">
        <div>
          <h3 className="text-lg md:text-xl font-serif text-white truncate">{service.name}</h3>
          <div className="text-sm text-gray-400 mt-1 flex items-center gap-2"><MapPin className="text-gold-300" /> {service.vehicleType} • <span className="text-gold-400">{service.provider?.name || service.location || 'Mpumalanga'}</span></div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-gold-400">
            <Star /> <span className="font-semibold text-white">{(service.rating || 0).toFixed(1)}</span>
          </div>
          <div className="text-gray-400 text-sm">({service.reviewCount || 0} reviews)</div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <Amenity icon={<Car size={14} />} label={service.vehicleType || 'Private Vehicle'} />
          <Amenity icon={<Users size={14} />} label={`${service.capacity || '–'} guests`} />
          <Amenity icon={<Briefcase size={14} />} label={`${service.luggage || '2'} bags`} />
          <Amenity icon={<ShieldCheck size={14} />} label="Insured" />
          {service.amenities?.includes('Wi‑Fi') && <Amenity icon={<Wifi size={14} />} label="Wi‑Fi" />}
        </div>

        <div className="flex items-center justify-between mt-3">
          <div>
            <div className="text-gold-300 font-black text-2xl">{service.price || 'POA'}</div>
            <div className="text-gray-400 text-xs">{service.duration || ''}</div>
            <div className="text-xs text-gray-400 mt-1">{service.subcategory || ''}</div>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={(e) => { e.stopPropagation(); onBook && onBook(service); }} className="px-4 py-2 rounded-lg bg-gradient-to-r from-gold-600 to-gold-400 text-black font-bold">Discover</button>
            <button onClick={(e) => { e.stopPropagation(); onContact && onContact(service); }} className="px-3 py-2 rounded-lg border border-gold-400 text-gold-300 hover:bg-gold-400 hover:text-black transition">Inquire</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransportCard;
