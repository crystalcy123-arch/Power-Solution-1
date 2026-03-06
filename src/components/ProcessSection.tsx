import React from 'react';

const ProcessSection: React.FC = () => {
  const steps = [
    { title: "Analysis", desc: "Site evaluation and historical energy load analysis." },
    { title: "Design", desc: "Custom solar & storage engineering for maximum yield." },
    { title: "Licensing", desc: "Full IESO and local utility regulatory management." },
    { title: "Operation", desc: "24/7 monitoring and performance-guaranteed maintenance." }
  ];

  return (
    <section className="py-24 bg-white animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-slate-900">
            Our <span className="text-emerald-600">Zero-CAPEX</span> Process
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Sustainable infrastructure through smart, reliable battery storage and solar integration.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div key={i} className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:shadow-xl transition-all group">
              <div className="text-emerald-600 font-black text-5xl mb-6 opacity-20 group-hover:opacity-100 transition-opacity">0{i+1}</div>
              <h4 className="font-bold text-xl mb-3 text-slate-900">{step.title}</h4>
              <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 p-12 bg-[#0f172a] rounded-[3rem] text-center text-white relative overflow-hidden">
          <div className="relative z-10 space-y-6">
            <h3 className="text-3xl font-bold">Ready to start your Zero-Cost transition?</h3>
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all shadow-2xl flex items-center mx-auto space-x-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Download Full Project PDF</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
