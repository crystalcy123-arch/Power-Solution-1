import React from 'react';
import { 
  TrendingDown, 
  Shield, 
  Wrench, 
  GraduationCap, 
  ArrowRight,
  FileDown 
} from 'lucide-react'; // 确保这些图标已安装

const BenefitCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
    <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6">
      <Icon className="text-emerald-600 w-7 h-7" />
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
  </div>
);

const ProcessSection: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-700">
      {/* 1. Hero 区域 */}
      <section className="relative bg-emerald-900 text-white py-24 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover" alt="Background" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter">GREEN <span className="text-emerald-400">UPGRADE</span></h1>
          <div className="flex items-center gap-3 px-8 py-4 bg-emerald-950/40 border border-white/20 rounded-2xl backdrop-blur-sm mx-auto w-fit">
            <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-lg font-bold">20% Guaranteed Savings</span>
          </div>
        </div>
      </section>

      {/* 2. About Us 板块 */}
      <section className="py-24 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-widest">About Us</h2>
          <h3 className="text-4xl font-black text-slate-900 leading-tight">We believe the future of Ontario's grid is distributed.</h3>
          <p className="text-slate-600 text-lg leading-relaxed">Power Solution is a Niagara-based Independent Power Developer specializing in "Behind-the-Meter" solar and storage solutions.
            </p>
            {/* 新增段落 1 */}
            <p className="font-medium text-slate-900">
              Our mission is to make energy independence accessible through a unique Zero-CAPEX model, allowing all businesses to lower their carbon footprint and electricity bills without upfront costs.
            </p>
            {/* 新增段落 2 */}
            <p>
              With 20+ years of large consultant company and Ontario Hydro experience, we bridge the gap between global technology and local application.</p>
        </div>
        <div className="aspect-video rounded-[3rem] overflow-hidden shadow-2xl">
          <img src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover" alt="Solar Building" />
        </div>
      </section>

      {/* 3. 新增：Strategic Benefits (挪动自 Solar 内嵌页) */}
      <section className="py-24 bg-slate-900 text-white rounded-[4rem] mx-4">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-sm font-bold text-emerald-400 uppercase tracking-widest">Why Choose Us</h2>
            <h3 className="text-4xl md:text-5xl font-black">Strategic Benefits for Your Business</h3>
            <p className="text-slate-400 max-w-2xl mx-auto">Our fully-funded clean-energy transformation handles the complexity so you can focus on your business.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <BenefitCard icon={TrendingDown} title="Guaranteed Savings" description="20% electricity bill saving guaranteed from day one of commissioning." />
            <BenefitCard icon={Shield} title="Unmatched Resilience" description="State-of-the-art backup power system ensures your campus stays powered during grid outages." />
            <BenefitCard icon={Wrench} title="Zero Maintenance" description="We handle all maintenance, licensing, and 24/7 power management. Zero burden on your team." />
            <BenefitCard icon={GraduationCap} title="Sustainable Innovation" description="Position your company as a leader in the green transition, showcasing your commitment." />
          </div>

          {/* $0.00 投资模型展示 */}
          <div className="mt-16 bg-emerald-600 rounded-[3rem] p-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <h4 className="text-3xl font-bold mb-3">The "Zero-Cost" Partnership Model</h4>
              <p className="text-emerald-50/90 leading-relaxed">We act as the developer, owner, and operator. We handle the $500k+ initial cost, all IESO licensing, and ongoing operations.</p>
            </div>
            <div className="text-center md:text-right bg-white/10 backdrop-blur-md p-8 rounded-3xl min-w-[240px]">
              <div className="text-5xl font-black mb-1">$0.00</div>
              <div className="text-xs font-bold uppercase tracking-widest opacity-80">Your Upfront Investment</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Simple 3-Step Launch (位置在 Benefits 之下) */}
      <section className="py-24 max-w-4xl mx-auto px-6">
        <h3 className="text-5xl font-black text-slate-900 mb-20 text-center">Simple 3-Step Launch</h3>
        <div className="space-y-16 relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-slate-200 hidden sm:block"></div>
          {[
            { n: "01", t: "Site Access Agreement", d: "A simple 1-page document to finalize system design and layout." },
            { n: "02", t: "Energy Service Agreement (ESA)", d: "Define the discounted rate you'll pay for clean power." },
            { n: "03", t: "The 'Switch'", d: "Start saving from Day 1 of commissioning." }
          ].map((step, idx) => (
            <div key={idx} className="flex gap-8 items-start relative z-10">
              <div className="flex-shrink-0 w-12 h-12 bg-emerald-600 text-white rounded-xl flex items-center justify-center font-bold text-xl shadow-lg">{step.n}</div>
              <div>
                <h4 className="text-2xl font-bold text-slate-900 mb-2">{step.t}</h4>
                <p className="text-slate-600 text-lg leading-relaxed">{step.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProcessSection;
