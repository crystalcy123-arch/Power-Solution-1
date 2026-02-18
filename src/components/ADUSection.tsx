import React, { useState, useMemo, useEffect } from 'react';
import { getADUConsultation } from '../services/geminiService';
import { ADUConfig, AIResponse, UserLocation } from '../types';
import { regionalKnowledge } from '../data/businessKnowledge';

interface ADUSectionProps {
  location: UserLocation;
}

const SuccessModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-[2.5rem] p-10 max-w-md w-full shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-300">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-black text-center text-slate-900 mb-4 font-heading">Success!</h3>
        <p className="text-slate-600 text-center leading-relaxed mb-8">
          Your design session request has been submitted. Our architectural team will contact you shortly to discuss your project.
        </p>
        <button 
          onClick={onClose}
          className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all"
        >
          Got it, thanks!
        </button>
      </div>
    </div>
  );
};

const ADUSection: React.FC<ADUSectionProps> = ({ location }) => {
  const [config, setConfig] = useState<ADUConfig>({
    size: 'studio',
    intendedUse: 'rental',
    addons: {
      energyIndependence: false,
      smartSecurity: false,
      carbonNeutral: false,
      zonalComfort: false
    }
  });
  
  const [contact, setContact] = useState({ name: '', email: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isEnlarged, setIsEnlarged] = useState(false);

  const activeRegion = useMemo(() => {
    return location.region in regionalKnowledge ? location.region : 'ON';
  }, [location.region]);

  const rentalIncome = useMemo(() => {
    const pricing = regionalKnowledge[activeRegion].aduPricing;
    switch (config.size) {
      case 'studio': return pricing.studio.rentalEstimate;
      case '1-bedroom': return pricing.oneBed.rentalEstimate;
      case '2-bedroom': return pricing.twoBed.rentalEstimate;
      default: return '$0';
    }
  }, [config.size, activeRegion]);

  const basePrice = useMemo(() => {
    const pricing = regionalKnowledge[activeRegion].aduPricing;
    switch (config.size) {
      case 'studio': return pricing.studio.basePrice;
      case '1-bedroom': return pricing.oneBed.basePrice;
      case '2-bedroom': return pricing.twoBed.basePrice;
      default: return '$0';
    }
  }, [config.size, activeRegion]);

  const policyLink = useMemo(() => {
    return (regionalKnowledge[activeRegion] || regionalKnowledge['Default']).policyUrl;
  }, [activeRegion]);

  const toggleAddon = (key: keyof ADUConfig['addons']) => {
    setConfig(prev => ({
      ...prev,
      addons: {
        ...prev.addons,
        [key]: !prev.addons[key]
      }
    }));
  };

  const handleBookSession = async () => {
    if (!contact.email || !contact.name) {
      alert("Please provide at least your name and email.");
      return;
    }

    setIsSubmitting(true);
    const activeAddonsList = Object.entries(config.addons)
      .filter(([_, active]) => active)
      .map(([name]) => name.replace(/([A-Z])/g, ' $1').trim())
      .join(", ") || "None";

    const formData = {
      projectType: 'ADU Design Session',
      customerName: contact.name,
      customerEmail: contact.email,
      customerPhone: contact.phone,
      aduSize: config.size,
      basePrice: basePrice,
      rentalEstimate: rentalIncome,
      addons: activeAddonsList,
      city: location.city,
      province: activeRegion
    };

    try {
      const response = await fetch("https://formspree.io/f/xpqjrjyz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setShowSuccess(true);
        setContact({ name: '', email: '', phone: '' });
      } else {
        throw new Error("Submission failed");
      }
    } catch (err) {
      alert("Something went wrong. Please try again or contact crystalsli@outlook.com directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const highlights = [
    { title: "1. Built Better, Built Faster", intro: "Advanced SIP Structural Panel System." },
    { title: "2. Hybrid Comfort System", intro: "High-efficiency heat pump with luxury heated floors." },
    { title: "3. Mono-Slope Energy Roof", intro: "Perfect angle for solar capture and high vaulted ceilings." },
    { title: "4. Net-Zero Standard", intro: "Built for the future of energy independence." }
  ];

  const addonOptions = [
    {
      key: 'energyIndependence' as const,
      label: 'Net-Zero Energy Bundle',
      description: 'Solar tiles and battery storage.',
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m12 8a4 4 0 100-8 4 4 0 000 8z" /></svg>
    },
    {
      key: 'zonalComfort' as const,
      label: 'Luxury Radiant Heating',
      description: 'Ultra-thin floor heating systems.',
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.99 7.99 0 0120 13a7.98 7.98 0 01-2.343 5.657z" /></svg>
    }
  ];

  const currentImage = useMemo(() => {
    if (config.size === 'studio') return '/F1.png';
    if (config.size === '1-bedroom') return '/F3.png';
    if (config.size === '2-bedroom') return '/F4.png';
    return '/F1.png';
  }, [config.size]);

  return (
    <section className="max-w-7xl mx-auto px-4">
      <SuccessModal isOpen={showSuccess} onClose={() => setShowSuccess(false)} />
      
      {isEnlarged && (
        <div className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 cursor-zoom-out" onClick={() => setIsEnlarged(false)}>
          <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors" onClick={() => setIsEnlarged(false)}>
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <img src={currentImage} alt="Floor Plan" className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl" />
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
        <div className="space-y-10">
          <div>
            <h2 className="text-4xl font-heading font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">Unlock the Full Potential of Your Backyard</h2>
            <p className="text-slate-600 text-lg leading-relaxed">We configure high-performance ADUs with solar energy and smart-tech options tailored for your property.</p>
            <div className="mt-8 bg-sky-50 border-l-4 border-sky-500 p-5 rounded-r-2xl">
              <p className="text-sky-900 text-sm font-medium leading-relaxed">
                🏠 Eligible for <span className="font-bold">Canada Greener Homes Loan</span>. 
                <a href={policyLink} target="_blank" rel="noopener noreferrer" className="underline font-bold text-sky-600 hover:text-sky-800 ml-1">View Policy</a>.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-slate-200 shadow-2xl space-y-10">
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Select Design Framework</label>
              <div className="grid grid-cols-3 gap-4">
                {['studio', '1-bedroom', '2-bedroom'].map((s) => (
                  <button key={s} onClick={() => setConfig({ ...config, size: s as any })} 
                    className={`py-6 px-2 text-center rounded-2xl border-2 transition-all ${config.size === s ? 'bg-sky-500 border-sky-500 text-white font-bold' : 'border-slate-100 bg-slate-50'}`}>
                    <span className="text-sm md:text-base capitalize font-bold">{s.replace('-', ' ')}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 修复后的收益卡片：修正电脑端换行重叠 */}
            <div className="bg-[#0f172a] p-6 md:p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between shadow-2xl border border-white/5 overflow-hidden">
              <div className="flex items-center space-x-4 md:space-x-5 w-full md:w-auto mb-6 md:mb-0">
                <div className="flex-shrink-0 w-[60px] h-[80px] md:w-[76px] md:h-[100px] bg-[#0ea5e9] rounded-[1.2rem] md:rounded-[1.8rem] flex items-center justify-center text-white">
                   <div className="w-9 h-9 md:w-11 md:h-11 rounded-full border-[2px] border-white/90 flex items-center justify-center">
                     <span className="text-lg md:text-xl font-black">$</span>
                   </div>
                </div>
                <div className="text-xl md:text-2xl font-bold text-white leading-tight tracking-tight">Monthly Rental<br />Income</div>
              </div>
              
              <div className="text-center md:text-right w-full md:w-auto">
                <p className="text-4xl sm:text-5xl md:text-5xl lg:text-5xl font-black text-white tracking-tighter leading-none mb-2 whitespace-nowrap">
                  {rentalIncome}
                </p>
                <div className="flex items-center justify-center md:justify-end space-x-2">
                   <span className="h-[2px] w-6 bg-[#0ea5e9] hidden md:block opacity-50"></span>
                   <span className="text-base md:text-lg text-[#0ea5e9] font-black uppercase tracking-[0.2em]">CAD</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 italic">Smart-Tech Add-ons</label>
              <div className="space-y-3">
                {addonOptions.map((opt) => (
                  <button key={opt.key} onClick={() => toggleAddon(opt.key)} className={`w-full p-5 rounded-2xl border-2 transition-all flex items-center space-x-4 ${config.addons[opt.key] ? 'bg-sky-50 border-sky-500 shadow-md' : 'bg-slate-50 border-slate-100'}`}>
                    <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${config.addons[opt.key] ? 'bg-sky-500 text-white' : 'bg-white text-slate-400 shadow-sm'}`}>{opt.icon}</div>
                    <div className="flex-grow text-left">
                      <div className="text-sm font-black text-slate-900 leading-none mb-1">{opt.label}</div>
                      <div className="text-[11px] text-slate-500 leading-tight">{opt.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-slate-100 space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <input type="text" placeholder="Name" value={contact.name} onChange={e => setContact({...contact, name: e.target.value})} className="w-full p-4 rounded-xl border border-slate-200 focus:border-sky-500 outline-none font-medium bg-slate-50" />
                <input type="email" placeholder="Email" value={contact.email} onChange={e => setContact({...contact, email: e.target.value})} className="w-full p-4 rounded-xl border border-slate-200 focus:border-sky-500 outline-none font-medium bg-slate-50" />
              </div>
              <button disabled={isSubmitting} onClick={handleBookSession} 
                className={`w-full py-6 rounded-[1.5rem] font-black text-xl transition-all shadow-xl active:scale-95 flex items-center justify-center ${isSubmitting ? 'bg-slate-200 text-slate-400' : 'bg-sky-500 text-white hover:bg-sky-600 shadow-sky-200'}`}>
                {isSubmitting ? <span>Processing...</span> : <span>Book Design Session</span>}
              </button>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="bg-[#0f172a] text-white p-8 md:p-10 rounded-[3.5rem] shadow-2xl h-full flex flex-col sticky top-24 border border-white/5">
             <div className="flex-grow space-y-8">
                <div className="rounded-[2.5rem] overflow-hidden border border-white/10 bg-white p-2 shadow-2xl relative cursor-zoom-in group" onClick={() => setIsEnlarged(true)}>
                  <img src={currentImage} alt="Floor Plan" className="w-full h-auto max-h-[400px] object-contain rounded-[2rem] bg-white transform transition-transform group-hover:scale-105" />
                </div>
                
                <div className="pt-4">
                  <p className="text-slate-400 text-xs font-black uppercase tracking-[0.15em] mb-2 italic">Starting Investment</p>
                  <div className="flex items-baseline space-x-2 whitespace-nowrap">
                    <span className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tighter leading-none">{basePrice}</span>
                    <span className="text-base md:text-lg text-sky-500 font-black">CAD</span>
                  </div>
                  <p className="text-slate-500 text-[11px] mt-6 font-medium italic leading-relaxed opacity-80">Includes structural shell and standard install.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {highlights.map((h, i) => (
                    <div key={i} className="bg-white/5 rounded-2xl p-4 border border-white/5">
                      <h4 className="text-[11px] font-black text-sky-400 mb-2 uppercase tracking-wider">{h.title}</h4>
                      <p className="text-[10px] text-slate-400 leading-relaxed font-medium">{h.intro}</p>
                    </div>
                  ))}
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ADUSection;
