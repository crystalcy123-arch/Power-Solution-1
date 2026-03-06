import React from 'react';
import { 
  TrendingDown, 
  Shield, 
  Wrench, 
  GraduationCap, 
  ArrowRight,
  FileDown 
} from 'lucide-react';
import { motion } from 'framer-motion';

const BenefitCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="bg-white p-8 rounded-3xl border border-emerald-100 shadow-sm hover:shadow-md transition-all">
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
      {/* 1. 原生 Hero 区域 */}
      <section className="relative bg-emerald-900 text-white overflow-hidden py-32 px-6">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=2000" 
            alt="Solar Panels" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 bg-emerald-500 text-white text-xs font-bold uppercase tracking-widest rounded-full mb-8">
            Ontario's Clean Energy Partner
          </span>
          <h1 className="text-6xl md:text-8xl font-black leading-[0.9] mb-8 tracking-tighter">
            GREEN <br />
            <span className="text-emerald-400">ENERGY</span> <br />
            UPGRADE
          </h1>
          <p className="text-xl text-emerald-50/80 mb-12 max-w-2xl mx-auto leading-relaxed">
            Lower your carbon footprint and electricity bills with our unique 
            <span className="text-white font-bold ml-1">Zero-CAPEX model</span>. 
            No upfront costs, just immediate savings.
          </p>
          <button 
            onClick={() => window.print()}
            className="px-10 py-5 bg-white text-emerald-900 font-bold rounded-2xl hover:bg-emerald-50 transition-all flex items-center gap-3 mx-auto shadow-2xl"
          >
            <FileDown className="w-6 h-6" /> Download Full PDF
          </button>
        </div>
      </section>

      {/* 2. 关于我们 (About Us) */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-widest">About Us</h2>
            <h3 className="text-4xl font-black text-slate-900 leading-tight">
              We believe the future of Ontario's grid is distributed.
            </h3>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>Power Solution is a Niagara-based Independent Power Producer (IPP) specializing in "Behind-the-Meter" solar and storage solutions.</p>
              <p>Our mission is to make energy independence accessible through a unique Zero-CAPEX model.</p>
              <p>With 20+ years of experience in Ontario Hydro and large-scale energy consulting, we bridge the gap between global technology and local application.</p>
            </div>
          </div>
          <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
            <img src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover" alt="Solar Building" />
          </div>
        </div>
      </section>

      {/* 3. 核心优势 (Benefits) */}
      <section className="py-24 bg-slate-900 text-white rounded-[4rem] mx-4">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-emerald-400 uppercase tracking-widest mb-4">Strategic Benefits</h2>
            <h3 className="text-4xl md:text-5xl font-black">Why Choose Us</h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <BenefitCard icon={TrendingDown} title="Guaranteed Savings" description="20% electricity bill saving guaranteed from day one." />
            <BenefitCard icon={Shield} title="Unmatched Resilience" description="Backup power system ensures your campus stays powered." />
            <BenefitCard icon={Wrench} title="Zero Maintenance" description="We handle all licensing and 24/7 power management." />
            <BenefitCard icon={GraduationCap} title="Sustainable Innovation" description="Position your company as a leader in the green transition." />
          </div>
          {/* Zero-Cost Model Card */}
          <div className="mt-16 bg-emerald-600 rounded-[3rem] p-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <h4 className="text-3xl font-bold mb-3">The "Zero-Cost" Partnership Model</h4>
              <p className="text-emerald-50 opacity-90">We handle the $500k+ initial cost, all IESO licensing, and ongoing operations.</p>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-md p-8 rounded-3xl min-w-[200px]">
              <div className="text-5xl font-black mb-1">$0.00</div>
              <div className="text-xs font-bold uppercase tracking-widest opacity-80">Upfront Investment</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 流程步骤 (Process) */}
      <section className="py-32 max-w-4xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-4">The Next Step</h2>
          <h3 className="text-5xl font-black text-slate-900">Simple 3-Step Launch</h3>
        </div>
        <div className="space-y-16 relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-slate-200 hidden sm:block"></div>
          {[
            { n: "01", t: "Site Access Agreement", d: "A simple 1-page document to finalize system design." },
            { n: "02", t: "Energy Service Agreement (ESA)", d: "Define the discounted rate for your clean power." },
            { n: "03", t: "The 'Switch'", d: "Start saving from Day 1 of commissioning." }
          ].map((step, idx) => (
            <div key={idx} className="flex gap-8 items-start relative z-10">
              <div className="flex-shrink-0 w-12 h-12 bg-emerald-600 text-white rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg shadow-emerald-200">
                {step.n}
              </div>
              <div className="pt-2">
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
