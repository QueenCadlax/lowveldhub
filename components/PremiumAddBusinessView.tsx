import React, { useState, useEffect, useRef } from 'react';
import { Category, CategorySubcategories, MPUMALANGA_AREAS, ListingTier, PRICING_STRUCTURE, Business } from '../types';
import { Check, CheckCircle, Crown, Award, ChevronRight, Upload, X, ArrowRight, Zap, Heart } from 'lucide-react';

const PremiumAddBusinessView = ({ navigate, onAddBusiness, handleOpenAuth }: { navigate: any, onAddBusiness: (b: Business) => void, handleOpenAuth: (type: string) => void }) => {
    const [showForm, setShowForm] = useState(false);
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [uploadedImages, setUploadedImages] = useState<{ logo?: string; cover?: string; gallery: string[] }>({ gallery: [] });
    const [socialLinks, setSocialLinks] = useState({ instagram: '', facebook: '', linkedin: '' });

    const [formData, setFormData] = useState({
        name: '',
        address: '',
        contactName: '',
        email: '',
        phone: '',
        category: Category.FoodAndHospitality,
        subcategory: '',
        area: 'Mbombela (Nelspruit)',
        membership: ListingTier.Premium,
        description: '',
        tags: [] as string[],
    });

    const categories = Object.values(Category);
    const areas = MPUMALANGA_AREAS;
    const isLoggedIn = typeof window !== 'undefined' && !!localStorage.getItem('lh_user');

    // Auto-save form data
    useEffect(() => {
        localStorage.setItem('lh_addBusiness_draft', JSON.stringify({ formData, step, uploadedImages, socialLinks }));
    }, [formData, step, uploadedImages, socialLinks]);

    // Image upload handler
    const handleImageUpload = (type: 'logo' | 'cover', file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            setUploadedImages(prev => ({ ...prev, [type]: e.target?.result as string }));
        };
        reader.readAsDataURL(file);
    };

    const handleGalleryUpload = (files: File[]) => {
        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                setUploadedImages(prev => ({ ...prev, gallery: [...prev.gallery, e.target?.result as string] }));
            };
            reader.readAsDataURL(file);
        });
    };

    const handleSubmit = async () => {
        try {
            if (!formData.name || !formData.contactName || !formData.email) {
                setError('Please fill in all required fields.');
                return;
            }

            setError(null);
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 1600));

            const tierDetails = PRICING_STRUCTURE[formData.membership];

            const newBusiness: Business = {
                id: `b-${Date.now()}`,
                name: formData.name,
                category: formData.category,
                subcategory: formData.subcategory || 'General',
                description: formData.description,
                location: formData.area,
                image: uploadedImages.cover || 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
                rating: 4.5,
                reviewCount: 1,
                tier: formData.membership,
                subscriptionDuration: tierDetails.duration,
                isPremium: formData.membership === ListingTier.Premium,
                isElite: formData.membership === ListingTier.Elite,
                isPlatinum: formData.membership === ListingTier.Platinum,
                priceLevel: '$$',
                tags: formData.tags.length > 0 ? formData.tags : ['New Listing'],
                phone: formData.phone,
                email: formData.email
            };

            onAddBusiness(newBusiness);
            setLoading(false);
            setStep(4);
        } catch (e) {
            setLoading(false);
            setError('We\'re preparing the application. Please try again in a moment.');
        }
    };

    // Value Props Cards
    const ValuePropCard = ({ icon: Icon, title, desc }: { icon: any; title: string; desc: string }) => (
        <div className="group p-6 rounded-2xl border border-white/10 bg-white/3 hover:bg-white/5 hover:border-gold-500/20 transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center mb-4 group-hover:bg-gold-500/20 transition-colors">
                <Icon size={24} className="text-gold-400" />
            </div>
            <h3 className="text-white font-bold mb-2">{title}</h3>
            <p className="text-gray-400 text-sm">{desc}</p>
        </div>
    );

    // Package Card for preview
    const PackagePreviewCard = ({ tier, label }: { tier: ListingTier; label: string }) => {
        const tierData = PRICING_STRUCTURE[tier];
        return (
            <div className={`rounded-2xl border p-6 flex flex-col ${tier === ListingTier.Platinum ? 'border-purple-500/40 bg-purple-500/5' : 'border-white/10 bg-white/3'}`}>
                <div className="text-xs text-gold-400 font-bold uppercase tracking-widest mb-2">{label}</div>
                <h3 className={`text-xl font-bold mb-3 ${tier === ListingTier.Platinum ? 'text-purple-300' : 'text-white'}`}>{label}</h3>
                <div className="text-2xl font-bold mb-4">
                    R{tierData.price}
                    <div className="text-xs text-gray-500 font-normal">{tierData.duration}</div>
                </div>
                <ul className="text-xs text-gray-300 space-y-1.5 mb-6 flex-1">
                    {tierData.features.slice(0, 4).map((f, i) => (
                        <li key={i} className="flex items-center gap-2"><Check size={10} className="text-gold-400" /> {f}</li>
                    ))}
                </ul>
                <button 
                    onClick={() => window.location.href = 'mailto:info@lowveldhub.co.za?subject=Application%20to%20List%20My%20Business%20on%20LowveldHub'}
                    className={`w-full py-2 rounded-lg font-bold text-sm transition-colors ${tier === ListingTier.Platinum ? 'bg-transparent border border-white/10 text-gray-200 hover:border-purple-500/40' : 'bg-gold-500 text-black hover:bg-gold-600'}`}
                >
                    {tier === ListingTier.Platinum ? 'Request Review' : `Apply – ${label}`}
                </button>
            </div>
        );
    };

    // Drag & Drop Image Zone
    const DragDropZone = ({ onDrop, label, accept = 'image/*' }: { onDrop: (files: File[]) => void; label: string; accept?: string }) => {
        const [dragActive, setDragActive] = useState(false);
        const fileInputRef = useRef<HTMLInputElement>(null);

        const handleDrag = (e: React.DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(e.type === 'dragenter' || e.type === 'dragover');
        };

        const handleDrop = (e: React.DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(false);
            if (e.dataTransfer.files) onDrop(Array.from(e.dataTransfer.files));
        };

        return (
            <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`p-8 rounded-xl border-2 border-dashed transition-all cursor-pointer text-center ${dragActive ? 'border-gold-500 bg-gold-500/10' : 'border-white/20 bg-white/3 hover:border-white/40'}`}
            >
                <Upload size={32} className="mx-auto text-gold-400 mb-3" />
                <p className="text-white font-bold mb-1">{label}</p>
                <p className="text-xs text-gray-400">Drag & drop or click to browse</p>
                <input ref={fileInputRef} type="file" accept={accept} className="hidden" onChange={(e) => e.target.files && onDrop(Array.from(e.target.files))} multiple />
            </div>
        );
    };

    return (
        <div className="pt-24 pb-24 min-h-screen bg-black">
            {!showForm ? (
                // LANDING PAGE
                <div className="container mx-auto px-4 space-y-16 max-w-6xl">
                    {/* HERO */}
                    <section className="text-center space-y-6 py-12">
                        <h1 className="text-5xl md:text-6xl font-serif text-white leading-tight">
                            Join Mpumalanga's<br />Trusted Business Network
                        </h1>
                        <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
                            List your business on LowveldHub and reach discerning customers. Every listing is reviewed and verified to maintain quality and trust.
                        </p>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-4">
                            <a 
                                href="mailto:info@lowveldhub.co.za?subject=Application%20to%20Join%20LowveldHub"
                                className="bg-gold-500 text-black px-8 py-3 rounded-full font-bold hover:bg-gold-600 transition-colors text-lg"
                            >
                                Apply via Email
                            </a>
                            <button 
                                onClick={() => document.getElementById('packages-preview')?.scrollIntoView({ behavior: 'smooth' })}
                                className="border border-white/30 text-white px-8 py-3 rounded-full font-bold hover:border-gold-500 transition-colors text-lg"
                            >
                                View Packages
                            </button>
                        </div>
                    </section>

                    {/* VALUE PROPS */}
                    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <ValuePropCard 
                            icon={Check} 
                            title="Verified Listings Only" 
                            desc="Every business is reviewed before going live to maintain quality standards."
                        />
                        <ValuePropCard 
                            icon={Zap} 
                            title="AI Concierge Support" 
                            desc="Customers are guided directly to your business through smart recommendations."
                        />
                        <ValuePropCard 
                            icon={Heart} 
                            title="Trusted by Locals" 
                            desc="Access a premium, loyal audience seeking authentic Mpumalanga experiences."
                        />
                    </section>

                    {/* PACKAGES PREVIEW */}
                    <section id="packages-preview" className="pt-12">
                        <h2 className="text-3xl font-serif text-white mb-2">Listing Packages</h2>
                        <p className="text-gray-400 mb-8">Choose the plan that fits your business needs</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <PackagePreviewCard tier={ListingTier.Premium} label="Essential" />
                            <PackagePreviewCard tier={ListingTier.Elite} label="Professional" />
                            <PackagePreviewCard tier={ListingTier.Platinum} label="Platinum" />
                        </div>
                    </section>

                    {/* HOW IT WORKS */}
                    <section className="pt-8">
                        <h2 className="text-3xl font-serif text-white mb-12 text-center">How It Works</h2>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {[
                                { step: '1', title: 'Apply', desc: 'Send us your business details via email' },
                                { step: '2', title: 'Review', desc: 'We assess quality, branding, and credibility' },
                                { step: '3', title: 'Approval', desc: 'Your business is approved and onboarded' },
                                { step: '4', title: 'Go Live', desc: 'You are featured on LowveldHub' }
                            ].map((item, i) => (
                                <div key={i} className="relative">
                                    <div className="w-12 h-12 rounded-full bg-gold-500 text-black flex items-center justify-center font-bold mb-4 mx-auto">{item.step}</div>
                                    <h3 className="text-white font-bold text-center mb-2">{item.title}</h3>
                                    <p className="text-gray-400 text-sm text-center">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* CONTACT SECTION - LUXURY HOSPITALITY GRADE */}
                    <section className="mt-24 pt-20 relative">
                        {/* Decorative top divider */}
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent"></div>

                        <div className="max-w-4xl mx-auto space-y-16">
                            {/* PREMIUM HEADING WITH ACCENT */}
                            <div className="text-center space-y-6">
                                <div className="inline-block">
                                    <p className="text-xs uppercase tracking-[0.2em] text-gold-400 font-semibold">The Invitation</p>
                                </div>
                                <h2 className="text-5xl md:text-6xl font-serif text-white leading-tight">
                                    Apply to Join<br />Our Curated Network
                                </h2>
                                <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-light">
                                    We invite exceptional businesses to become part of LowveldHub — a carefully curated ecosystem where quality meets opportunity.
                                </p>
                            </div>

                            {/* DUAL COLUMN LAYOUT - LEFT: PROCESS, RIGHT: CTA */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                                
                                {/* LEFT: PROCESS & BENEFITS */}
                                <div className="space-y-8">
                                    <div>
                                        <h3 className="text-2xl font-serif text-white mb-6">The Process</h3>
                                        <div className="space-y-6">
                                            {[
                                                { num: '01', title: 'You Apply', desc: 'Email us your business details. No forms, no hassle.' },
                                                { num: '02', title: 'We Review', desc: 'Our team assesses quality, branding, and fit with our community.' },
                                                { num: '03', title: 'We Connect', desc: 'If approved, we guide you through a seamless onboarding.' },
                                                { num: '04', title: 'You Thrive', desc: 'Your business joins an elite network of curated businesses.' }
                                            ].map((step, i) => (
                                                <div key={i} className="flex gap-4">
                                                    <div className="text-gold-400 font-serif text-2xl font-bold min-w-12">{step.num}</div>
                                                    <div>
                                                        <h4 className="text-white font-semibold mb-1">{step.title}</h4>
                                                        <p className="text-gray-400 text-sm">{step.desc}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* TRUST BADGES */}
                                    <div className="bg-white/3 border border-white/10 rounded-xl p-6 space-y-4">
                                        <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold">Why Partner With Us</p>
                                        <ul className="space-y-3">
                                            {[
                                                'Verified customer base seeking premium experiences',
                                                'AI-powered recommendations to drive real business',
                                                'No commission on direct sales',
                                                'Exclusive community of 50+ curated businesses'
                                            ].map((item, i) => (
                                                <li key={i} className="flex items-start gap-3">
                                                    <span className="text-gold-400 font-bold mt-0.5">✓</span>
                                                    <span className="text-gray-300 text-sm">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* RIGHT: CTA SECTION */}
                                <div className="bg-gradient-to-br from-gold-500/10 via-transparent to-gold-500/5 border border-gold-500/20 rounded-2xl p-10 lg:p-12 space-y-8 relative overflow-hidden">
                                    {/* Subtle background accent */}
                                    <div className="absolute top-0 right-0 w-40 h-40 bg-gold-500/5 rounded-full blur-3xl -z-10"></div>
                                    
                                    {/* PRIMARY CTA */}
                                    <div className="space-y-4">
                                        <p className="text-xs uppercase tracking-widest text-gold-400 font-semibold">Ready?</p>
                                        <a 
                                            href="mailto:info@lowveldhub.co.za?subject=Application%20to%20Join%20LowveldHub&body=Hello%20LowveldHub%20Team%2C%0A%0AI%20would%20like%20to%20apply%20to%20join%20LowveldHub.%20Here%20are%20my%20business%20details%3A%0A%0ABusinessName%3A%0ALocation%3A%0ACategory%3A%0AContact%20Details%3A%0ABrief%20Description%3A%0A%0AThank%20you"
                                            className="block w-full bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-600 hover:to-gold-500 text-black font-bold py-4 px-6 rounded-xl text-center transition-all transform hover:scale-105 shadow-xl hover:shadow-gold-500/30 text-lg"
                                        >
                                            Apply Now
                                        </a>
                                    </div>

                                    {/* EMAIL DISPLAY - ELEGANT */}
                                    <div className="pt-6 border-t border-white/10 text-center space-y-3">
                                        <p className="text-xs text-gray-500 uppercase tracking-widest">Or email directly</p>
                                        <a 
                                            href="mailto:info@lowveldhub.co.za"
                                            className="inline-block text-gold-400 hover:text-gold-300 transition-colors"
                                        >
                                            <p className="text-xl font-serif font-bold">info@lowveldhub.co.za</p>
                                        </a>
                                    </div>

                                    {/* WHAT TO SEND */}
                                    <div className="space-y-4 pt-4 border-t border-white/10">
                                        <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold">In Your Email, Please Include</p>
                                        <div className="space-y-2">
                                            {[
                                                'Business Name & Website',
                                                'Location (Area in Mpumalanga)',
                                                'Category / Industry',
                                                'Contact Person & Details',
                                                '2–5 High-Quality Images',
                                                'Brief Description (50–100 words)'
                                            ].map((item, i) => (
                                                <div key={i} className="flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-gold-400"></div>
                                                    <span className="text-gray-300 text-sm">{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* RESPONSE TIME - PREMIUM WORDING */}
                                    <div className="pt-4 border-t border-white/10 text-center">
                                        <p className="text-xs text-gray-600">
                                            Our team reviews applications carefully.<br />You'll hear from us within <span className="text-gold-400">24–72 hours</span>.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* EXCLUSIVITY STATEMENT - CENTERED BELOW */}
                            <div className="text-center pt-12 border-t border-white/10">
                                <p className="text-gray-500 text-sm leading-relaxed max-w-2xl mx-auto">
                                    LowveldHub is a curated ecosystem, not a directory. We maintain rigorous standards for quality, presentation, and customer experience. Only exceptional businesses are invited to join.
                                </p>
                            </div>
                        </div>

                        {/* Decorative bottom divider */}
                        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent"></div>
                    </section>
                </div>
            ) : (
                // MULTI-STEP FORM
                <div className="container mx-auto px-4 max-w-4xl">
                    {/* Progress Bar */}
                    <div className="mb-12">
                        <div className="flex justify-between items-center mb-6">
                            {[1, 2, 3, 4].map((s) => (
                                <div key={s} className="flex flex-col items-center flex-1">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 transition-all ${step >= s ? (step === s ? 'bg-gold-500 text-black' : 'bg-green-500 text-white') : 'bg-white/10 text-gray-400'}`}>
                                        {step > s ? <Check size={20} /> : s}
                                    </div>
                                    <div className="text-xs text-gray-400 text-center hidden md:block">
                                        {s === 1 ? 'Details' : s === 2 ? 'Media' : s === 3 ? 'Package' : 'Confirm'}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-gold-500 to-gold-400 rounded-full transition-all duration-500" style={{ width: `${(step - 1) * 33.33}%` }}></div>
                        </div>
                    </div>

                    {/* Sign-in gate */}
                    {!isLoggedIn && (
                        <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center justify-between">
                            <span className="text-white text-sm">Please sign in to complete your application</span>
                            <button onClick={() => handleOpenAuth('login')} className="text-blue-400 hover:text-blue-300 font-bold text-sm">Sign In</button>
                        </div>
                    )}

                    {/* Error */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-300 text-sm">{error}</div>
                    )}

                    {/* STEP 1: Business Details */}
                    {step === 1 && (
                        <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 space-y-8 animate-fade-in">
                            <div>
                                <h2 className="text-3xl font-serif text-white mb-2">Tell us about your business</h2>
                                <p className="text-gray-400 text-sm">Basic information helps us categorize and showcase your listing correctly</p>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-white mb-2">Business Name <span className="text-red-400">*</span></label>
                                    <input 
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="e.g. Lowveld Roasters Coffee"
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-gold-500 focus:bg-white/10 outline-none transition-all"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">This is how customers will find you</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-white mb-2">Category <span className="text-red-400">*</span></label>
                                        <select 
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value as Category, subcategory: '' })}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold-500 outline-none transition-all appearance-none cursor-pointer"
                                        >
                                            {categories.map(cat => (
                                                <option key={cat} value={cat} className="bg-black text-white">{cat}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-white mb-2">Subcategory</label>
                                        <select 
                                            value={formData.subcategory}
                                            onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold-500 outline-none transition-all appearance-none cursor-pointer"
                                        >
                                            <option value="">Select subcategory</option>
                                            {(CategorySubcategories[formData.category] || []).map(sub => (
                                                <option key={sub} value={sub} className="bg-black">{sub}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-white mb-2">Location <span className="text-red-400">*</span></label>
                                    <select 
                                        value={formData.area}
                                        onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold-500 outline-none transition-all appearance-none cursor-pointer"
                                    >
                                        {areas.map(area => (
                                            <option key={area} value={area} className="bg-black">{area}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-white mb-2">Contact Person <span className="text-red-400">*</span></label>
                                    <input 
                                        type="text"
                                        value={formData.contactName}
                                        onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                                        placeholder="Full name"
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-gold-500 focus:bg-white/10 outline-none transition-all"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-white mb-2">Email <span className="text-red-400">*</span></label>
                                        <input 
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            placeholder="info@business.co.za"
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-gold-500 focus:bg-white/10 outline-none transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-white mb-2">Phone</label>
                                        <input 
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            placeholder="+27..."
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-gold-500 focus:bg-white/10 outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-white mb-2">Business Address</label>
                                    <input 
                                        type="text"
                                        value={formData.address}
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                        placeholder="Street address, city, postal code"
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-gold-500 focus:bg-white/10 outline-none transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-white mb-2">Business Description</label>
                                    <textarea 
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        placeholder="Tell customers what makes your business special..."
                                        rows={3}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-gold-500 focus:bg-white/10 outline-none transition-all resize-none"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
                                <button 
                                    onClick={() => setStep(2)}
                                    className="bg-gold-500 hover:bg-gold-600 text-black px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-colors"
                                >
                                    Next: Media & Branding <ChevronRight size={18} />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STEP 2: Media & Branding */}
                    {step === 2 && (
                        <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 space-y-8 animate-fade-in">
                            <div>
                                <h2 className="text-3xl font-serif text-white mb-2">Showcase your brand</h2>
                                <p className="text-gray-400 text-sm">High-quality images help customers get excited about your business</p>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-white mb-3">Business Logo</label>
                                    <div className="space-y-3">
                                        {uploadedImages.logo ? (
                                            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                                                <img src={uploadedImages.logo} alt="Logo" className="w-16 h-16 rounded object-cover" />
                                                <button onClick={() => setUploadedImages(prev => ({ ...prev, logo: undefined }))} className="text-red-400 hover:text-red-300 text-sm font-bold ml-auto">Remove</button>
                                            </div>
                                        ) : (
                                            <DragDropZone onDrop={(files) => handleImageUpload('logo', files[0])} label="Upload your logo" />
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-white mb-3">Cover Image / Hero Image</label>
                                    <div className="space-y-3">
                                        {uploadedImages.cover ? (
                                            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                                                <img src={uploadedImages.cover} alt="Cover" className="w-24 h-16 rounded object-cover" />
                                                <button onClick={() => setUploadedImages(prev => ({ ...prev, cover: undefined }))} className="text-red-400 hover:text-red-300 text-sm font-bold ml-auto">Remove</button>
                                            </div>
                                        ) : (
                                            <DragDropZone onDrop={(files) => handleImageUpload('cover', files[0])} label="Upload cover image (recommended: 1200x600)" />
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-white mb-3">Gallery Images (Up to 5)</label>
                                    <div className="space-y-3">
                                        {uploadedImages.gallery.length > 0 && (
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                                {uploadedImages.gallery.map((img, i) => (
                                                    <div key={i} className="relative group">
                                                        <img src={img} alt={`Gallery ${i}`} className="w-full h-24 object-cover rounded border border-white/10" />
                                                        <button 
                                                            onClick={() => setUploadedImages(prev => ({ ...prev, gallery: prev.gallery.filter((_, idx) => idx !== i) }))}
                                                            className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded transition-opacity"
                                                        >
                                                            <X size={20} className="text-red-400" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        {uploadedImages.gallery.length < 5 && (
                                            <DragDropZone onDrop={handleGalleryUpload} label="Add gallery images" />
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Instagram</label>
                                        <input 
                                            type="text"
                                            value={socialLinks.instagram}
                                            onChange={(e) => setSocialLinks({ ...socialLinks, instagram: e.target.value })}
                                            placeholder="@yourhandle"
                                            className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white text-sm placeholder-gray-600 focus:border-gold-500 outline-none transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Facebook</label>
                                        <input 
                                            type="text"
                                            value={socialLinks.facebook}
                                            onChange={(e) => setSocialLinks({ ...socialLinks, facebook: e.target.value })}
                                            placeholder="facebook.com/..."
                                            className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white text-sm placeholder-gray-600 focus:border-gold-500 outline-none transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase mb-2">LinkedIn</label>
                                        <input 
                                            type="text"
                                            value={socialLinks.linkedin}
                                            onChange={(e) => setSocialLinks({ ...socialLinks, linkedin: e.target.value })}
                                            placeholder="linkedin.com/company/..."
                                            className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white text-sm placeholder-gray-600 focus:border-gold-500 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between pt-4">
                                <button 
                                    onClick={() => setStep(1)}
                                    className="text-gray-400 hover:text-white font-bold uppercase text-xs transition-colors"
                                >
                                    ← Back
                                </button>
                                <button 
                                    onClick={() => setStep(3)}
                                    className="bg-gold-500 hover:bg-gold-600 text-black px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-colors"
                                >
                                    Next: Select Package <ChevronRight size={18} />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STEP 3: Membership & Packages */}
                    {step === 3 && (
                        <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 space-y-8 animate-fade-in">
                            <div>
                                <h2 className="text-3xl font-serif text-white mb-2">Select your plan</h2>
                                <p className="text-gray-400 text-sm">Choose the visibility and features that match your goals</p>
                            </div>

                            <div className="space-y-4">
                                {Object.values(ListingTier).map((tier) => {
                                    const tierData = PRICING_STRUCTURE[tier];
                                    const isSelected = formData.membership === tier;
                                    return (
                                        <div 
                                            key={tier}
                                            onClick={() => setFormData({ ...formData, membership: tier })}
                                            className={`p-6 rounded-xl border-2 cursor-pointer transition-all relative overflow-hidden ${isSelected ? 'border-gold-500 bg-gold-500/10' : 'border-white/10 bg-white/3 hover:border-gold-500/40'}`}
                                        >
                                            {isSelected && (
                                                <div className="absolute top-3 right-3 bg-gold-500 text-black text-[10px] font-bold px-2 py-1 rounded">SELECTED</div>
                                            )}
                                            <div className="flex items-start justify-between mb-3">
                                                <div>
                                                    <h4 className={`text-lg font-bold flex items-center gap-2 ${tier === ListingTier.Platinum ? 'text-purple-300' : tier === ListingTier.Elite ? 'text-gold-400' : 'text-white'}`}>
                                                        {tier === ListingTier.Elite && <Crown size={18} />}
                                                        {tier === ListingTier.Platinum && <Award size={18} />}
                                                        {tier}
                                                    </h4>
                                                    <p className="text-xs text-gray-500 mt-1">{tierData.note}</p>
                                                </div>
                                                {isSelected && <CheckCircle size={20} className="text-gold-500" />}
                                            </div>
                                            <div className="mb-4">
                                                <div className="text-2xl font-bold text-white">
                                                    R{tierData.price}
                                                    <div className="text-xs text-gray-500 font-normal">{tierData.duration}</div>
                                                </div>
                                            </div>
                                            <ul className="space-y-2 text-sm text-gray-300">
                                                {tierData.features.map((f, i) => (
                                                    <li key={i} className="flex items-center gap-2">
                                                        <Check size={14} className="text-gold-500 flex-shrink-0" /> {f}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4 rounded" />
                                    <span className="text-sm text-gray-300">I confirm my business meets LowveldHub standards for quality and trust</span>
                                </label>
                            </div>

                            <div className="flex justify-between pt-4">
                                <button 
                                    onClick={() => setStep(2)}
                                    className="text-gray-400 hover:text-white font-bold uppercase text-xs transition-colors"
                                >
                                    ← Back
                                </button>
                                <button 
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className="bg-green-500 hover:bg-green-600 disabled:bg-green-500/50 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-colors"
                                >
                                    {loading ? 'Processing...' : (formData.membership === ListingTier.Platinum ? 'Request Platinum Review' : 'Complete Application')} 
                                    {loading && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STEP 4: Confirmation */}
                    {step === 4 && (
                        <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-12 text-center space-y-8 animate-fade-in">
                            <div className="w-24 h-24 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center mx-auto">
                                <CheckCircle size={48} className="text-green-400" />
                            </div>
                            <div>
                                <h2 className="text-4xl font-serif text-white mb-2">Application Submitted!</h2>
                                <p className="text-lg text-gray-300">
                                    Your listing for <span className="text-gold-400 font-bold">{formData.name}</span> has been received.
                                </p>
                            </div>
                            <div className="bg-white/3 border border-white/10 rounded-lg p-6 text-left space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Business Name:</span>
                                    <span className="text-white font-bold">{formData.name}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Location:</span>
                                    <span className="text-white font-bold">{formData.area}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Package:</span>
                                    <span className="text-gold-400 font-bold">{formData.membership}</span>
                                </div>
                            </div>
                            <p className="text-gray-400 max-w-xl mx-auto">
                                Our team will review your application within 24–72 hours. You'll receive a confirmation email at <span className="text-white">{formData.email}</span> with next steps.
                            </p>
                            <div className="flex flex-col md:flex-row gap-4 justify-center pt-4">
                                <button 
                                    onClick={() => navigate('home')}
                                    className="bg-gold-500 hover:bg-gold-600 text-black px-8 py-3 rounded-lg font-bold transition-colors"
                                >
                                    Return to Home
                                </button>
                                <button 
                                    onClick={() => navigate('marketplace')}
                                    className="border border-white/20 hover:border-gold-500 text-white px-8 py-3 rounded-lg font-bold transition-colors"
                                >
                                    Explore Marketplace
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default PremiumAddBusinessView;
