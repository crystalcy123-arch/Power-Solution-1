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
    const formData = {
      projectType: 'ADU Design Session',
      customerName: contact.name,
      customerEmail: contact.email,
      customerPhone: contact.phone,
      aduSize: config.size,
      basePrice: basePrice,
      rentalEstimate: rentalIncome,
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
      alert("Something went wrong. Please try again.");
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
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">Unlock the Full Potential of Your Backyard</h2>
            <p className="text-slate-600 text-lg leading-relaxed">We configure high-performance ADUs with solar energy and smart-tech options tailored for your property.</p>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-slate-200 shadow-2xl space-y-10">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Select Design Framework</label>
              <div className="grid grid-cols-3 gap-4">
                {['studio', '1-bedroom', '2-bedroom'].map((s) => (
                  <button key={s} onClick={() => setConfig({ ...config, size: s as any })} 
                    className={`py-4 px-2 text-center rounded-2xl border-2 transition-all ${config.size === s ? 'bg-sky-500 border-sky-500 text-white font-bold' : 'border-slate-100 bg-slate-50 text-slate-600'}`}>
                    <span className="text-sm md:text-base capitalize font-bold">{s.replace('-', ' ')}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 恢复原始稳健尺寸的收益卡片 */}
            <div className="bg-[#0f172a] p-8 rounded-[2rem] flex items-center justify-between shadow-xl border border-white/5">
              <div className="flex items-center space-x-6">
                <div className="w-12 h-12 bg-[#0ea5e9] rounded-2xl flex items-center justify-center text-white shadow-lg">
                   <span className="text-xl font-bold">$</span>
                </div>
                <div className="text-lg md:text-xl font-bold text-white leading-tight">Monthly Rental<br />Income</div>
              </div>
              <div className="text-right">
                <p className="text-3xl md:text-4xl font-bold text-white tracking-tight">{rentalIncome}</p>
                <p className="text-sm text-[#0ea5e9] font-bold uppercase tracking-widest mt-1">CAD</p>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-100 space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <input type="text" placeholder="Name" value={contact.name} onChange={e => setContact({...contact, name: e.target.value})} className="w-full p-4 rounded-xl border border-slate-200 focus:border-sky-500 outline-none font-medium bg-slate-50" />
                <input type="email" placeholder="Email" value={contact.email} onChange={e => setContact({...contact, email: e.target.value})} className="w-full p-4 rounded-xl border border-slate-200 focus:border-sky-500 outline-none font-medium bg-slate-50" />
              </div>
              <button disabled={isSubmitting} onClick={handleBookSession} 
                className={`w-full py-5 rounded-[1.2rem] font-bold text-lg transition-all shadow-lg active:scale-95 flex items-center justify-center ${isSubmitting ? 'bg-slate-200 text-slate-400' : 'bg-sky-500 text-white hover:bg-sky-600 shadow-sky-200'}`}>
                {isSubmitting ? <span>Processing...</span> : <span>Book Design Session</span>}
              </button>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="bg-[#0f172a] text-white p-8 md:p-10 rounded-[3rem] shadow-2xl h-full flex flex-col sticky top-24 border border-white/5">
             <div className="flex-grow space-y-8">
                <div className="rounded-[2rem] overflow-hidden border border-white/10 bg-white p-2 shadow-xl relative cursor-zoom-in group" onClick={() => setIsEnlarged(true)}>
                  <img src={currentImage} alt="Floor Plan" className="w-full h-auto max-h-[350px] object-contain rounded-[1.5rem] bg-white transform transition-transform group-hover:scale-105" />
                </div>
                
                <div>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2 italic">Starting Investment</p>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl md:text-4xl font-bold text-white tracking-tight">{basePrice}</span>
                    <span className="text-lg text-sky-500 font-bold">CAD</span>
                  </div>
                  <p className="text-slate-500 text-xs mt-4 font-medium italic opacity-80 leading-relaxed">Includes structural shell and standard install.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {highlights.map((h, i) => (
                    <div key={i} className="bg-white/5 rounded-xl p-4 border border-white/5">
                      <h4 className="text-[12px] font-bold text-sky-400 mb-1 uppercase tracking-wider">{h.title}</h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed">{h.intro}</p>
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
