import React, { useState } from 'react';
import { useUserLocation } from '../hooks/useUserLocation';
import { UserLocation } from '../types';
import GallerySection from './GallerySection'; // 导入 GallerySection 以作为背景展示

interface ADUSectionProps {
  location: UserLocation;
}

// 提交成功的模态框组件
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
        <h3 className="text-2xl font-black text-center text-slate-900 mb-4 font-heading">Design Session Booked!</h3>
        <p className="text-slate-600 text-center leading-relaxed mb-8">
          Thank you for choosing Power Solution. A garden suite expert will review your preliminary configuration and contact you shortly to schedule your personalized design session.
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

const ADUSection: React.FC<ADUSectionProps> = ({ location: initialLocation }) => {
  // 默认使用传入的位置，如果没有则使用 Hook 检测
  const hookLocation = useUserLocation();
  const location = initialLocation.city ? initialLocation : hookLocation;

  const [config, setConfig] = useState({ size: '500', finish: 'modern' });
  const [contact, setContact] = useState({ name: '', email: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const basePrice = useMemo(() => {
    const prices: Record<string, number> = { '500': 189000, '750': 249000, '1000': 319000 };
    return prices[config.size] || 189000;
  }, [config.size]);

  // 处理表单提交逻辑
  const handleBookSession = async () => {
    if (!contact.email || !contact.name) {
      alert("Please provide at least your name and email.");
      return;
    }

    setIsSubmitting(true);
    try {
      // 准备提交数据，加入 _gotcha 提高可信度
      const payload = {
        _subject: `New ADU Design Inquiry: ${contact.name} (${config.size} sqft)`,
        _gotcha: "", // Honeypot 字段，防止被标记为 Spam
        projectType: "ADU Design Session",
        customerName: contact.name,
        customerEmail: contact.email,
        customerPhone: contact.phone,
        selectedSize: `${config.size} sqft`,
        estimatedBasePrice: `$${basePrice.toLocaleString()}`,
        finishStyle: config.finish,
        detectedLocation: `${location.city || 'St. Catharines'}, ${location.region || 'ON'}`, // 默认 St. Catharines
        timestamp: new Date().toISOString()
      };

      // 使用您的新 Formspree ID xreadzbr
      const response = await fetch("https://formspree.io/f/xreadzbr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setShowSuccess(true);
        // 重置联系信息
        setContact({ name: '', email: '', phone: '' });
      } else {
        throw new Error("Submission failed");
      }
    } catch (err) {
      alert("Something went wrong. Please try again or contact admin@powersolution.ca directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative pt-32 pb-24 overflow-hidden bg-slate-50">
      <SuccessModal isOpen={showSuccess} onClose={() => setShowSuccess(false)} />
      
      {/* 引用 GallerySection 作为背景 */}
      <div className="absolute inset-0 z-0 opacity-[0.03] scale-110 blur-[2px]">
        <GallerySection />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* 左侧文字介绍区域 */}
          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="text-5xl md:text-6xl font-heading font-extrabold text-slate-900 leading-tight tracking-tighter">
                Modern Living, Redefined: <span className="text-emerald-600">Custom Garden Suites.</span>
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed max-w-xl">
                Create independent, smart-enabled spaces in {location.city || 'your Ontario community'} for the ones you love. We combine architectural excellence with solar-powered solutions to deliver comfortable, eco-friendly homes.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xl inline-flex items-center space-x-4">
              <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m0 0l7-7 7 7M19 10v10a1 1 0 01-1 1h-3m-60a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <div>
                <span className="block text-sm font-bold text-slate-400 uppercase">Pricing in {location.city || 'Ontario'} Starts From</span>
                <span className="block text-4xl font-black text-slate-900">${basePrice.toLocaleString()}<span className="text-lg text-slate-500 font-medium">.00+</span></span>
              </div>
            </div>
          </div>

          {/* 右侧配置器区域 */}
          <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl border border-slate-100 space-y-10 relative">
            <div className="absolute -top-6 -right-6 bg-emerald-600 text-white px-6 py-3 rounded-full font-bold text-sm shadow-lg">
              Configurator V1.2
            </div>
            
            <div className="space-y-8">
              <div className="space-y-3">
                <label className="text-lg font-bold text-slate-900">1. Select Suite Size (sqft)</label>
                <div className="grid grid-cols-3 gap-4">
                  {.map(size => (
                    <button key={size} onClick={() => setConfig({...config, size})} className={`py-4 rounded-xl border-2 font-black text-xl transition-all ${config.size === size ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg' : 'bg-slate-50 border-slate-50 text-slate-600 hover:border-slate-200'}`}>
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="pt-8 border-t border-slate-100 space-y-4">
                <label className="text-lg font-bold text-slate-900">2. Share Your Contact Details</label>
                <input type="text" placeholder="Your Full Name" value={contact.name} onChange={e => setContact({...contact, name: e.target.value})} className="w-full p-4 rounded-xl border border-slate-200 focus:border-emerald-500 outline-none font-medium" />
                <div className="grid md:grid-cols-2 gap-4">
                  <input type="email" placeholder="Email Address" value={contact.email} onChange={e => setContact({...contact, email: e.target.value})} className="w-full p-4 rounded-xl border border-slate-200 focus:border-emerald-500 outline-none font-medium" />
                  <input type="tel" placeholder="Phone Number" value={contact.phone} onChange={e => setContact({...contact, phone: e.target.value})} className="w-full p-4 rounded-xl border border-slate-200 focus:border-emerald-500 outline-none font-medium" />
                </div>
              </div>
            </div>

            <button 
              disabled={isSubmitting}
              onClick={handleBookSession}
              className={`w-full py-6 rounded-2xl font-black text-xl transition-all shadow-xl flex items-center justify-center space-x-3 ${isSubmitting ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-200 active:scale-95'}`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-6 w-6 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  <span>Verifying Details...</span>
                </>
              ) : (
                <span>Book Free Design Session</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ADUSection;
