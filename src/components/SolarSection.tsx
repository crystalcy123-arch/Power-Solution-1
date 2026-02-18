import React, { useState, useMemo } from 'react';
import { SolarNeeds, CommercialNeeds, UserLocation, AIResponse } from '../types';
import { getSolarConsultation } from '../services/geminiService';

interface SolarSectionProps {
  location: UserLocation;
}

const SuccessModal: React.FC<{ isOpen: boolean; onClose: () => void; aiAdvice: AIResponse | null }> = ({ isOpen, onClose, aiAdvice }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-[2.5rem] p-8 md:p-10 max-w-2xl w-full shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-300 overflow-y-auto max-h-[90vh]">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-black text-center text-slate-900 mb-2 font-heading">Inquiry Received!</h3>
        <p className="text-slate-500 text-center text-sm mb-6 whitespace-pre-wrap">Our clean-energy experts will contact you shortly.</p>
        
        {/* 仅在 AI 成功返回数据时显示建议 */}
        {aiAdvice?.recommendations && (
          <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-100">
            <h4 className="text-emerald-700 font-bold text-sm uppercase tracking-widest mb-4">AI Energy Recommendations</h4>
            <ul className="space-y-3">
              {aiAdvice.recommendations.map((rec, idx) => (
                <li key={idx} className="flex items-start text-slate-700 text-sm leading-relaxed">
                  <span className="text-emerald-500 mr-2 font-bold">•</span>
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        )}

        <button 
          onClick={onClose}
          className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
        >
          Got it, thanks!
        </button>
      </div>
    </div>
  );
};

const SolarSection: React.FC<SolarSectionProps> = ({ location }) => {
  const [mode, setMode] = useState<'residential' | 'commercial'>('residential');
  const [resPostalCode, setResPostalCode] = useState('');
  const [contact, setContact] = useState({ name: '', email: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [aiAdvice, setAiAdvice] = useState<AIResponse | null>(null);
  
  const [resNeeds, setResNeeds] = useState<SolarNeeds>({
    monthlyBill: 0,
    roofType: 'asphalt-shingle',
    energyPriority: 'savings'
  });
  
  const [comNeeds, setComNeeds] = useState<CommercialNeeds>({
    facilityType: 'industrial',
    squareFootage: 15000,
    primaryGoal: 'cost-reduction',
    monthlyBill: 0,
    postalCode: '',
    notes: ''
  });

  const activeRegion = useMemo(() => location.region || 'ON', [location.region]);

  const handleSubmit = async () => {
    if (!contact.email || !contact.name) {
      alert("Please provide at least your name and email.");
      return;
    }

    setIsSubmitting(true);

    let advice: AIResponse | null = null;
    try {
      // 尝试获取 AI 咨询，如果失败（如缺少 Key）则静默跳过
      const needs = mode === 'residential' ? resNeeds : comNeeds;
      advice = await getSolarConsultation(needs, location, mode === 'commercial');
      setAiAdvice(advice);
    } catch (err) {
      console.warn("AI Consultation skipped due to missing API Key or network error.");
    }

    const formData = {
      projectType: mode === 'residential' ? 'Residential Solar' : 'Commercial Solar',
      customerName: contact.name,
      customerEmail: contact.email,
      customerPhone: contact.phone,
      ...(mode === 'residential' 
        ? { monthlyBill: resNeeds.monthlyBill, postalCode: resPostalCode, priority: resNeeds.energyPriority }
        : { facility: comNeeds.facilityType, sqft: comNeeds.squareFootage, monthlyBill: comNeeds.monthlyBill, postalCode: comNeeds.postalCode, notes: comNeeds.notes }
      ),
      city: location.city,
      province: activeRegion,
      // 如果 AI 运行失败，这些字段将为空，但不影响表单提交
      aiFullReport: advice?.summary || 'N/A (No API Key)',
      aiRecommendations: advice?.recommendations?.join(" | ") || 'N/A',
      aiEstimatedROI: advice?.roiEstimate || 'N/A'
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
      alert("Submission failed. Please contact crystalsli@outlook.com directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4">
      <SuccessModal 
        isOpen={showSuccess} 
        onClose={() => setShowSuccess(false)} 
        aiAdvice={aiAdvice} 
      />
      
      <div className="grid lg:grid-cols-2 gap-16">
        <div className="space-y-10">
          <div className="flex flex-col space-y-6">
            <h2 className="text-4xl font-heading font-extrabold text-slate-900">Power Your Future with <span className="text-emerald-600">Solar Energy.</span></h2>
            <p className="text-slate-600 text-lg leading-relaxed max-w-xl">From residential rooftop arrays to industrial-scale energy ecosystems, we deliver high-yield solar solutions across Canada.</p>
            
            <div className="bg-slate-200/50 p-1.5 rounded-2xl w-full sm:w-fit flex border border-slate-200">
              <button onClick={() => setMode('residential')} className={`px-8 py-3 rounded-xl font-bold transition-all text-sm ${mode === 'residential' ? 'bg-white text-emerald-600 shadow-md border border-slate-100' : 'text-slate-500'}`}>Residential</button>
              <button onClick={() => setMode('commercial')} className={`px-8 py-3 rounded-xl font-bold transition-all text-sm ${mode === 'commercial' ? 'bg-white text-emerald-600 shadow-md border border-slate-100' : 'text-slate-500'}`}>Commercial</button>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-2xl space-y-8 relative">
             <div className="space-y-6">
                {mode === 'residential' ? (
                  <div className="grid md:grid-cols-2 gap-6">
                    <input 
                      type="number" 
                      placeholder="Total Monthly Bill ($)" 
                      value={resNeeds.monthlyBill || ''} 
                      onChange={e => setResNeeds({...resNeeds, monthlyBill: parseInt(e.target.value) || 0})} 
                      className="w-full p-5 rounded-xl border-2 border-slate-100 font-bold text-slate-900 bg-slate-50 focus:border-emerald-500 outline-none transition-colors" 
                    />
                    <input 
                      type="text" 
                      placeholder="Postal Code" 
                      value={resPostalCode} 
                      onChange={e => setResPostalCode(e.target.value.toUpperCase())} 
                      className="w-full p-5 rounded-xl border-2 border-slate-100 font-bold text-slate-900 bg-slate-50 focus:border-emerald-500 outline-none transition-colors" 
                    />
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-3 gap-3">
                      {['industrial', 'office', 'retail', 'multi-unit', 'farm', 'others'].map(t => (
                        <button 
                          key={t} 
                          onClick={() => setComNeeds({...comNeeds, facilityType: t as any})} 
                          className={`p-4 rounded-xl border-2 font-bold capitalize transition-all text-sm md:text-base ${
                            comNeeds.facilityType === t 
                            ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-200' 
                            : 'bg-slate-50 border-slate-50 text-slate-600 hover:border-slate-200'
                          }`}
                        >
                          {t.replace('-', ' ')}
                        </button>
                      ))}
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <input 
                        type="number" 
                        placeholder="Total Monthly Bill ($)" 
                        value={comNeeds.monthlyBill || ''} 
                        onChange={e => setComNeeds({...comNeeds, monthlyBill: parseInt(e.target.value) || 0})} 
                        className="w-full p-5 rounded-xl border-2 border-slate-100 font-bold bg-slate-50 focus:border-emerald-500 outline-none transition-colors" 
                      />
                      <input 
                        type="text" 
                        placeholder="Postal Code" 
                        value={comNeeds.postalCode} 
                        onChange={e => setComNeeds({...comNeeds, postalCode: e.target.value.toUpperCase()})} 
                        className="w-full p-5 rounded-xl border-2 border-slate-100 font-bold bg-slate-50 focus:border-emerald-500 outline-none transition-colors" 
                      />
                    </div>
                    <textarea placeholder="Custom operational requirements..." value={comNeeds.notes} onChange={e => setComNeeds({...comNeeds, notes: e.target.value})} className="w-full p-5 rounded-xl border-2 border-slate-100 font-medium bg-slate-50 min-h-[100px] resize-none focus:border-emerald-500 outline-none transition-colors" />
                  </div>
                )}

                <div className="pt-6 border-t border-slate-100 space-y-4">
                  <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest">Your Contact Information</label>
                  <div className="grid md:grid-cols-2 gap-4">
                    <input type="text" placeholder="Full Name" value={contact.name} onChange={e => setContact({...contact, name: e.target.value})} className="w-full p-4 rounded-xl border border-slate-200 focus:border-emerald-500 outline-none font-medium" />
                    <input type="email" placeholder="Email Address" value={contact.email} onChange={e => setContact({...contact, email: e.target.value})} className="w-full p-4 rounded-xl border border-slate-200 focus:border-emerald-500 outline-none font-medium" />
                  </div>
                </div>

                <button 
                  disabled={isSubmitting}
                  onClick={handleSubmit}
                  className={`w-full py-6 rounded-2xl font-black text-xl transition-all shadow-xl flex items-center justify-center space-x-3 active:scale-95 ${isSubmitting ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-200'}`}
                >
                  {isSubmitting ? <span>Submitting...</span> : <span>Submit Inquiry</span>}
                </button>
             </div>
          </div>
        </div>

        <div className="relative">
          <div className="h-full rounded-[3.5rem] overflow-hidden border-4 border-white bg-white flex flex-col items-center justify-center min-h-[600px] sticky top-24 shadow-2xl">
            <img src={mode === 'residential' ? "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=1200" : "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&q=80&w=1200"} alt="Solar" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
            <div className="relative z-10 p-12 text-white w-full mt-auto">
               <div className="bg-emerald-500/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl">
                  <h3 className="text-3xl font-black mb-4 uppercase tracking-tight">Solar Infrastructure</h3>
                  <p className="text-white/80 font-medium italic">High-efficiency arrays engineered for the Canadian climate.</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolarSection;
