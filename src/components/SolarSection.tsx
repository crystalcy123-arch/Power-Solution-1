import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Landmark, Zap } from 'lucide-react';
import { SolarNeeds, CommercialNeeds, UserLocation } from '../types';

interface SolarSectionProps {
  location: UserLocation;
}

// FAQ 单个条目组件
const FAQItem = ({ question, answer, isDark = false }: { question: string; answer: string; isDark?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`border-b ${isDark ? 'border-white/10' : 'border-slate-200'} last:border-0`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full py-6 flex items-center justify-between text-left transition-colors ${isDark ? 'hover:text-emerald-400' : 'hover:text-emerald-600'}`}
      >
        <span className={`text-lg font-bold pr-8 ${isDark ? 'text-white' : 'text-slate-900'}`}>{question}</span>
        <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''} ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[600px] pb-6' : 'max-h-0'}`}>
        <p className={`leading-relaxed p-6 rounded-2xl border-l-4 border-emerald-500 ${isDark ? 'bg-white/5 text-slate-300' : 'bg-slate-50 text-slate-600'}`}>
          {answer}
        </p>
      </div>
    </div>
  );
};

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
        <h3 className="text-2xl font-black text-center text-slate-900 mb-4 font-heading">Inquiry Received!</h3>
        <p className="text-slate-600 text-center leading-relaxed mb-8">
          Thank you for reaching out to Power Solution. Our clean-energy experts will analyze your details and contact you shortly.
        </p>
        <button 
          onClick={onClose}
          className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
        >
          Excellent
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

  const handleFinalSubmit = async () => {
    if (!contact.email || !contact.name) {
      alert("Please provide your name and email.");
      return;
    }
    setIsSubmitting(true);
    const specificData = mode === 'residential' 
      ? { ...resNeeds, postalCode: resPostalCode, serviceType: 'Residential Solar' }
      : { ...comNeeds, serviceType: 'Commercial Solar' };
    const payload = {
      _subject: `Solar Energy Quote Request - ${location.city}`,
      _gotcha: "", 
      category: "Solar Inquiry",
      ...specificData,
      customerName: contact.name,
      customerEmail: contact.email,
      customerPhone: contact.phone,
      detectedCity: location.city,
      detectedRegion: location.region
    };
    try {
      const response = await fetch("https://formspree.io/f/xreadzbr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        setShowSuccess(true);
        setContact({ name: '', email: '', phone: '' });
        setResPostalCode('');
      } else { throw new Error("Submission failed"); }
    } catch (err) {
      alert("Submission failed. Please try again or contact admin@powersolution.ca directly.");
    } finally { setIsSubmitting(false); }
  };

  // FAQ 内容定义
  const techFAQs = [
    { q: "How is Power Solution different from a standard solar or battery installer?", a: "We are an Engineering-led Strategic Partner, not just a contractor. Most installers focus on \"dropping a box\" and walking away. As a firm led by a P.Eng with a Ph.D. in engineering, we focus on the Revenue Lifecycle. We are your partner, sharing the profit. We don’t just install hardware; we design a custom financial engine for your facility. While others sell you equipment, we provide a fully managed energy solution that pays for itself through advanced software and market participation." },
    { q: "If your battery fails, does my assembly line or refrigeration plant shut down?", a: "Absolutely not. Our system runs in parallel with the local utility grid. It acts as a supplemental power source, not a bottleneck. If our inverter goes offline or the battery depletes, your facility seamlessly and instantly defaults back to 100% utility power. Your equipment will not lose power, and your lights will not flicker. You take zero operational risk." },
    { q: "Does this equipment export power back to the grid? Will it mess with our utility transformer?", a: "No. Our systems are strictly designed for Behind-The-Meter Load Displacement. We install a reverse-power relay that guarantees no power ever flows backward into the utility grid. Because we only reduce the strain on the local transformers, local utilities (like NPEI and Alectra) highly favor these installations, meaning connection approvals are fast and straightforward." },
    { q: "How much physical space do you need?", a: "Very little. A standard commercial 500 kW / 1000 kWh battery system is self-contained in a weatherproof, climate-controlled enclosure roughly the size of a 20-foot shipping container. We typically place it on an unused concrete pad in your shipping yard, adjacent to your main electrical room." },
    { q: "Who handles maintenance and repairs?", a: "We do, 100%. Because we own the asset, we actively monitor the battery's health 24/7 from our Network Operations Center. If a cell underperforms or an air filter needs changing, we dispatch our own technicians at our own cost. You do not need to train your maintenance staff on our equipment." }
  ];

  const financialFAQs = [
    { q: "What is the catch? Why would you give us a multi-million dollar asset for free?", a: "There is no catch; it is a Shared Savings model. As an Independent Power Producer, we monetize provincial energy grants, federal tax credits, and wholesale grid revenues that your core business does not have the time or structure to pursue. We use those funds to build the system on your property. In exchange for the footprint, we split the massive peak demand savings with you. Our profit comes from the grid and our share of the savings, not from your capital budget." },
    { q: "Will this system go on our balance sheet as a capital lease or debt?", a: "No. This is structured as an Energy-as-a-Service (EaaS) or performance contract. Because we retain full legal ownership of the equipment and you only benefit from the generated savings, it remains entirely off your balance sheet." },
    { q: "What if the battery degrades over 10 years and stops saving us money?", a: "We carry all the performance risk. Our revenues are directly tied to the system’s performance. If the battery degrades, we lose money. Therefore, our financial model includes fully funded maintenance reserves to replace or augment battery cells as they age, ensuring the system hits its peak demand targets for the full duration of our agreement." },
    { q: "Does this affect our property or liability insurance?", a: "No. We carry comprehensive commercial general liability and property insurance specifically for our energy assets. You simply add us to your site-access registry. We hold you harmless for the standard operation of the equipment." }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 space-y-32">
      <SuccessModal isOpen={showSuccess} onClose={() => setShowSuccess(false)} />
      
      {/* 顶部交互表单区域 - 完整保留 */}
      <div className="grid lg:grid-cols-2 gap-16 items-start">
        <div className="space-y-10">
          <div className="flex flex-col space-y-6">
            <h2 className="text-4xl font-heading font-extrabold text-slate-900">
              Power Your Future with <span className="text-emerald-600">Solar Energy.</span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed max-w-xl">
              From residential rooftop arrays to industrial-scale energy ecosystems, we deliver high-yield solar solutions across Canada.
            </p>
            
            {mode === 'residential' && (
              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-r-xl">
                <p className="text-emerald-800 text-sm font-medium italic leading-relaxed">
                  🏠 You may be eligible for the <span className="font-bold">Canada Greener Homes Loan</span> (up to $40,000 interest-free).
                </p>
              </div>
            )}
            
            <div className="bg-slate-200/50 p-1.5 rounded-2xl w-full sm:w-fit flex border border-slate-200">
              <button onClick={() => setMode('residential')} className={`px-8 py-3 rounded-xl font-bold transition-all text-sm ${mode === 'residential' ? 'bg-white text-emerald-600 shadow-md border border-slate-100' : 'text-slate-500'}`}>Residential</button>
              <button onClick={() => setMode('commercial')} className={`px-8 py-3 rounded-xl font-bold transition-all text-sm ${mode === 'commercial' ? 'bg-white text-emerald-600 shadow-md border border-slate-100' : 'text-slate-500'}`}>Commercial</button>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-2xl space-y-8 relative">
             <div className="space-y-6">
                {mode === 'residential' ? (
                  <div className="grid md:grid-cols-2 gap-6">
                    <input type="number" placeholder="Total Monthly Bill ($)" value={resNeeds.monthlyBill || ''} onChange={e => setResNeeds({...resNeeds, monthlyBill: parseInt(e.target.value) || 0})} className="w-full p-5 rounded-xl border-2 border-slate-100 font-bold text-slate-900 bg-slate-50 focus:border-emerald-500 outline-none transition-colors" />
                    <input type="text" placeholder="Postal Code" value={resPostalCode} onChange={e => setResPostalCode(e.target.value.toUpperCase())} className="w-full p-5 rounded-xl border-2 border-slate-100 font-bold text-slate-900 bg-slate-50 focus:border-emerald-500 outline-none transition-colors" />
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-3 gap-3">
                      {['industrial', 'office', 'retail', 'multi-unit', 'farm', 'others'].map(t => (
                        <button key={t} onClick={() => setComNeeds({...comNeeds, facilityType: t as any})} className={`p-4 rounded-xl border-2 font-bold capitalize transition-all text-sm ${comNeeds.facilityType === t ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg' : 'bg-slate-50 border-slate-50 text-slate-600'}`}>
                          {t.replace('-', ' ')}
                        </button>
                      ))}
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <input type="number" placeholder="Total Monthly Bill ($)" value={comNeeds.monthlyBill || ''} onChange={e => setComNeeds({...comNeeds, monthlyBill: parseInt(e.target.value) || 0})} className="w-full p-5 rounded-xl border-2 border-slate-100 font-bold bg-slate-50 focus:border-emerald-500 outline-none transition-colors" />
                      <input type="text" placeholder="Postal Code" value={comNeeds.postalCode} onChange={e => setComNeeds({...comNeeds, postalCode: e.target.value.toUpperCase()})} className="w-full p-5 rounded-xl border-2 border-slate-100 font-bold bg-slate-50 focus:border-emerald-500 outline-none transition-colors" />
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
                <button disabled={isSubmitting} onClick={handleFinalSubmit} className={`w-full py-6 rounded-2xl font-black text-xl transition-all shadow-xl flex items-center justify-center space-x-3 active:scale-95 ${isSubmitting ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-200'}`}>
                  {isSubmitting ? ( <><span>Submitting...</span></> ) : ( <span>Submit Request & Contact Expert</span> )}
                </button>
             </div>
          </div>
        </div>

        <div className="relative lg:sticky lg:top-24">
          <div className="h-full rounded-[3.5rem] overflow-hidden border-4 border-white bg-white flex flex-col items-center justify-center min-h-[500px] shadow-2xl">
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

      {/* --- 新增：Q&A 板块 --- */}
      <div className="space-y-16 pt-12">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-bold border border-emerald-100">
            <HelpCircle className="w-4 h-4" />
            <span>Expert Insights</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Common Questions</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            Direct answers regarding our <span className="text-emerald-600 font-bold">Engineering-led</span> strategy and Zero-CAPEX model.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* 技术与运营 */}
          <div className="bg-white p-8 md:p-12 rounded-[3rem] border border-slate-200 shadow-xl">
            <div className="flex items-center gap-4 mb-8 text-emerald-600">
              <Zap className="w-8 h-8" />
              <h3 className="text-2xl font-black uppercase tracking-tight">Technical & Ops</h3>
            </div>
            <div className="space-y-2">
              {techFAQs.map((faq, i) => <FAQItem key={i} question={faq.q} answer={faq.a} />)}
            </div>
          </div>

          {/* 财务与风险 (CFO 专区) */}
          <div className="bg-slate-900 p-8 md:p-12 rounded-[3rem] text-white shadow-2xl">
            <div className="flex items-center gap-4 mb-8 text-emerald-400">
              <Landmark className="w-8 h-8" />
              <h3 className="text-2xl font-black uppercase tracking-tight">Finance & Risk</h3>
            </div>
            <div className="space-y-2">
              {financialFAQs.map((faq, i) => <FAQItem key={i} question={faq.q} answer={faq.a} isDark />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolarSection;
