import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Landmark, Zap } from 'lucide-react'; // 确保已安装 lucide-react
import { SolarNeeds, CommercialNeeds, UserLocation } from '../types';

// FAQ 单个条目组件
const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-200 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left hover:text-emerald-600 transition-colors"
      >
        <span className="text-lg font-bold text-slate-900 pr-8">{question}</span>
        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[500px] pb-6' : 'max-h-0'}`}>
        <p className="text-slate-600 leading-relaxed bg-slate-50 p-6 rounded-2xl border-l-4 border-emerald-500">
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
      <div className="bg-white rounded-[2.5rem] p-10 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Zap className="w-10 h-10 text-emerald-600" />
        </div>
        <h3 className="text-2xl font-black text-center text-slate-900 mb-4">Inquiry Received!</h3>
        <p className="text-slate-600 text-center leading-relaxed mb-8">
          Thank you for reaching out. Our experts (led by our P.Eng team) will analyze your details and contact you shortly.
        </p>
        <button onClick={onClose} className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg">Excellent</button>
      </div>
    </div>
  );
};

const SolarSection: React.FC<{ location: UserLocation }> = ({ location }) => {
  const [mode, setMode] = useState<'residential' | 'commercial'>('commercial'); // 默认切到商业以匹配 FAQ 重点
  const [resPostalCode, setResPostalCode] = useState('');
  const [contact, setContact] = useState({ name: '', email: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // FAQ 数据集
  const generalFAQs = [
    { q: "How is Power Solution different from a standard solar or battery installer?", a: "We are an Engineering-led Strategic Partner, not just a contractor. Most installers focus on 'dropping a box' and walking away. As a firm led by a P.Eng with a Ph.D. in engineering, we focus on the Revenue Lifecycle. We are your partner, sharing the profit. We don’t just install hardware; we design a custom financial engine for your facility." },
    { q: "If your battery fails, does my assembly line or refrigeration plant shut down?", a: "Absolutely not. Our system runs in parallel with the local utility grid. It acts as a supplemental power source, not a bottleneck. If our inverter goes offline or the battery depletes, your facility seamlessly and instantly defaults back to 100% utility power. You take zero operational risk." },
    { q: "Does this equipment export power back to the grid? Will it mess with our utility transformer?", a: "No. Our systems are strictly designed for Behind-The-Meter Load Displacement. We install a reverse-power relay that guarantees no power ever flows backward into the utility grid. Utilities like NPEI and Alectra favor these installations, meaning connection approvals are fast." },
    { q: "How much physical space do you need?", a: "Very little. A standard commercial 500 kW / 1000 kWh battery system is self-contained in a weatherproof enclosure roughly the size of a 20-foot shipping container, typically placed on an unused concrete pad." },
    { q: "Who handles maintenance and repairs?", a: "We do, 100%. Because we own the asset, we actively monitor the battery's health 24/7. If a cell underperforms, we dispatch our own technicians at our own cost. No staff training required on your end." }
  ];

  const financialFAQs = [
    { q: "What is the catch? Why would you give us a multi-million dollar asset for free?", a: "There is no catch; it is a Shared Savings model. As an Independent Power Producer, we monetize provincial energy grants and grid revenues to build the system. In exchange for the footprint, we split the massive peak demand savings with you." },
    { q: "Will this system go on our balance sheet as a capital lease or debt?", a: "No. This is structured as Energy-as-a-Service (EaaS). Because we retain full legal ownership and you only benefit from savings, it remains entirely off your balance sheet." },
    { q: "What if the battery degrades over 10 years and stops saving us money?", a: "We carry all the performance risk. Our revenues are tied to the system’s performance. Our model includes fully funded maintenance reserves to replace cells as they age, ensuring peak demand targets are hit." },
    { q: "Does this affect our property or liability insurance?", a: "No. We carry comprehensive commercial general liability and property insurance for our energy assets. You simply add us to your site-access registry." }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 space-y-32">
      <SuccessModal isOpen={showSuccess} onClose={() => setShowSuccess(false)} />
      
      {/* 顶部交互表单区域 (保持原样) */}
      <div className="grid lg:grid-cols-2 gap-16 items-start">
        {/* ... (此处省略您之前的表单代码，请保留原样) ... */}
      </div>

      {/* 新增：FAQ 区域 */}
      <div className="space-y-16">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-bold border border-emerald-100">
            <HelpCircle className="w-4 h-4" />
            <span>Expert Insights</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Frequently Asked Questions</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
            Direct answers from our engineering team led by <span className="text-emerald-600 font-bold">P.Eng with Ph.D. expertise</span>.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* 左侧：技术与运营问答 */}
          <div className="bg-white p-8 md:p-12 rounded-[3rem] border border-slate-200 shadow-xl shadow-slate-100/50">
            <div className="flex items-center gap-4 mb-8 text-emerald-600">
              <Zap className="w-8 h-8" />
              <h3 className="text-2xl font-black uppercase tracking-tight">Technical & Operations</h3>
            </div>
            <div className="space-y-2">
              {generalFAQs.map((faq, i) => <FAQItem key={i} question={faq.q} answer={faq.a} />)}
            </div>
          </div>

          {/* 右侧：财务问答 (CFO / VP Finance) */}
          <div className="bg-slate-900 p-8 md:p-12 rounded-[3rem] text-white shadow-2xl shadow-emerald-950/20">
            <div className="flex items-center gap-4 mb-8 text-emerald-400">
              <Landmark className="w-8 h-8" />
              <h3 className="text-2xl font-black uppercase tracking-tight">Financial & Risk (CFO)</h3>
            </div>
            <div className="space-y-2">
              {financialFAQs.map((faq, i) => (
                <div key={i} className="border-b border-white/10 last:border-0">
                  <FAQItem question={faq.q} answer={faq.a} /> 
                  {/* 注意：在深色背景下可能需要微调 FAQItem 的文字颜色，建议在组件内通过 prop 控制主题 */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolarSection;
