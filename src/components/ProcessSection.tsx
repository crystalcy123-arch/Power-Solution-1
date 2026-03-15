import React from 'react';
import { TrendingDown, Shield, Wrench, GraduationCap, FileDown } from 'lucide-react';

const ProcessSection: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-700">
      {/* 1. Hero 区域 */}
      <section className="relative bg-emerald-900 text-white py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover" alt="Solar" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9]">GREEN <br/><span className="text-emerald-400">ENERGY</span> <br/>UPGRADE</h1>
          <p className="text-xl text-emerald-50/80 mb-12 max-w-2xl mx-auto leading-relaxed">Lower your carbon footprint and electricity bills with our unique Zero-CAPEX model. No upfront costs.</p>
          <button onClick={() => window.print()} className="px-10 py-5 bg-white text-emerald-900 font-bold rounded-2xl flex items-center gap-3 mx-auto shadow-2xl transition-transform hover:scale-105">
            <FileDown className="w-6 h-6" /> Download Full Project PDF
          </button>
        </div>
      </section>

      {/* 2. 关于我们 */}
      <section className="py-24 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-widest">About Us</h2>
          <h3 className="text-4xl font-black text-slate-900 leading-tight">We believe the future of Ontario's grid is distributed.</h3>
          <p className="text-slate-600 text-lg leading-relaxed">Power Solution is a Niagara-based Independent Power Producer (IPP) specializing in "Behind-the-Meter" solar and storage solutions.</p>
        </div>
        <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
          <img src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover" alt="Solar Building" />
        </div>
      </section>

      {/* 3. 流程步骤 */}
      <section className="py-24 max-w-4xl mx-auto px-6">
        <h3 className="text-5xl font-black text-slate-900 mb-16 text-center">Simple 3-Step Launch</h3>
        <div className="space-y-12 relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-slate-200 hidden sm:block"></div>
          {[
            { n: "01", t: "Site Access Agreement", d: "A simple 1-page document to finalize system design and layout." },
            { n: "02", t: "Energy Service Agreement (ESA)", d: "Define the discounted rate you'll pay for the clean power generated on-site." },
            { n: "03", t: "The 'Switch'", d: "Start saving from Day 1 of commissioning." }
          ].map((step, idx) => (
            <div key={idx} className="flex gap-8 items-start relative z-10 bg-slate-50 p-4 rounded-2xl">
              <div className="flex-shrink-0 w-12 h-12 bg-emerald-600 text-white rounded-xl flex items-center justify-center font-bold text-xl shadow-lg">{step.n}</div>
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
