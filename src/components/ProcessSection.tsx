import React from 'react';
import { 
  TrendingDown, 
  Shield, 
  Wrench, 
  GraduationCap, 
  FileDown 
} from 'lucide-react';

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
      {/* Hero Section */}
      <section className="relative bg-emerald-900 text-white py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover" alt="Solar" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9]">GREEN <br/><span className="text-emerald-400">ENERGY</span> <br/>UPGRADE</h1>
          <p className="text-xl text-emerald-50/80 mb-12 max-w-2xl mx-auto">Lower your carbon footprint with our unique Zero-CAPEX model. No upfront costs.</p>
          <button onClick={() => window.print()} className="px-10 py-5 bg-white text-emerald-900 font-bold rounded-2xl flex items-center gap-3 mx-auto shadow-2xl">
            <FileDown className="w-6 h-6" /> Download Full PDF
          </button>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-sm font-bold text-emerald-600 uppercase mb-4 tracking-widest">About Us</h2>
          <h3 className="text-4xl font-black text-slate-900 mb-6 leading-tight">We believe the future of Ontario's grid is distributed.</h3>
          <p className="text-slate-600 leading-relaxed">Power Solution is a Niagara-based Independent Power Producer (IPP) specializing in "Behind-the-Meter" solar solutions.</p>
        </div>
        <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl"><img src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover" alt="BTM Solar" /></div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-slate-900 text-white rounded-[4rem] mx-4">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <BenefitCard icon={TrendingDown} title="Guaranteed Savings" description="20% electricity bill saving guaranteed from day one." />
            <BenefitCard icon={Shield} title="Unmatched Resilience" description="Backup power system ensures your campus stays powered." />
            <BenefitCard icon={Wrench} title="Zero Maintenance" description="We handle all licensing and 24/7 power management." />
            <BenefitCard icon={GraduationCap} title="Sustainable Innovation" description="Position your company as a leader in the green transition." />
          </div>
        </div>
      </section>

      {/* 3-Step Process Section */}
      <section className="py-32 max-w-4xl mx-auto px-6 text-center">
        <h3 className="text-5xl font-black text-slate-900 mb-16">Simple 3-Step Launch</h3>
        <div className="space-y-12">
          <div className="flex gap-8 items-start text-left"><div className="w-12 h-12 bg-emerald-600 text-white rounded-xl flex items-center justify-center font-bold text-xl">01</div><div><h4 className="text-2xl font-bold mb-2">Site Access Agreement</h4><p className="text-slate-600">A simple 1-page document to finalize system design.</p></div></div>
          <div className="flex gap-8 items-start text-left"><div className="w-12 h-12 bg-emerald-600 text-white rounded-xl flex items-center justify-center font-bold text-xl">02</div><div><h4 className="text-2xl font-bold mb-2">Energy Service Agreement (ESA)</h4><p className="text-slate-600">Define the discounted rate for your clean power.</p></div></div>
          <div className="flex gap-8 items-start text-left"><div className="w-12 h-12 bg-emerald-600 text-white rounded-xl flex items-center justify-center font-bold text-xl">03</div><div><h4 className="text-2xl font-bold mb-2">The 'Switch'</h4><p className="text-slate-600">Start saving from Day 1 of commissioning.</p></div></div>
        </div>
      </section>
    </div>
  );
};

export default ProcessSection;
