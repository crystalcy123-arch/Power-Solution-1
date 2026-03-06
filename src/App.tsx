/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Zap, 
  Shield, 
  TrendingDown, 
  Wrench, 
  GraduationCap, 
  Phone, 
  Mail, 
  Globe,
  ArrowRight,
  FileDown
} from 'lucide-react';
// 修复点 1: 确保导出路径兼容大多数 Vercel 部署环境
import { motion } from 'framer-motion';

// --- 子组件定义 ---

const BenefitCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm hover:shadow-md transition-shadow"
  >
    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
      <Icon className="text-emerald-600 w-6 h-6" />
    </div>
    <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
    <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
  </motion.div>
);

const Step = ({ number, title, description }: { number: string, title: string, description: string }) => (
  <div className="flex gap-4 items-start">
    <div className="flex-shrink-0 w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
      {number}
    </div>
    <div>
      <h4 className="font-bold text-slate-900 mb-1">{title}</h4>
      <p className="text-slate-600 text-sm">{description}</p>
    </div>
  </div>
);

// --- 主应用组件 ---

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'solar' | 'adu' | 'gallery'>('home');

  // 修复点 2: 定义默认位置信息，防止 ADU 渲染时报错
  const location = { city: "St. Catharines", region: "Ontario" };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* 1. 全局 Header 导航 */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-[100] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex flex-col cursor-pointer" onClick={() => setActiveTab('home')}>
            <span className="text-xl font-black tracking-tighter text-slate-900">POWER SOLUTION</span>
            <span className="text-[8px] tracking-[0.3em] uppercase opacity-70 text-emerald-600">Think Unlimited</span>
          </div>
          
          <nav className="flex items-center space-x-1 bg-slate-100 p-1 rounded-2xl border border-slate-200">
            <button 
              onClick={() => setActiveTab('home')}
              className={`px-4 md:px-6 py-2 rounded-xl font-bold text-sm transition-all ${activeTab === 'home' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-emerald-600'}`}
            >
              Home
            </button>
            <button 
              onClick={() => setActiveTab('solar')}
              className={`px-4 md:px-6 py-2 rounded-xl font-bold text-sm transition-all ${activeTab === 'solar' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-emerald-600'}`}
            >
              Solar
            </button>
            <button 
              onClick={() => setActiveTab('adu')}
              className={`px-4 md:px-6 py-2 rounded-xl font-bold text-sm transition-all ${activeTab === 'adu' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-emerald-600'}`}
            >
              ADU Design
            </button>
            <button 
              onClick={() => setActiveTab('gallery')}
              className={`px-4 md:px-6 py-2 rounded-xl font-bold text-sm transition-all ${activeTab === 'gallery' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-emerald-600'}`}
            >
              Gallery
            </button>
          </nav>
        </div>
      </header>

      <main className="pt-20">
        
        {/* --- HOME 标签页内容 (原生流程) --- */}
        {activeTab === 'home' && (
          <div className="animate-in fade-in duration-700">
            <div className="bg-emerald-900 text-white py-24 px-6 text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <img src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover" alt="Background" />
              </div>
              <div className="relative z-10 max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tighter">
                  Our <span className="text-emerald-400">Zero-CAPEX</span> Process
                </h1>
                <p className="text-xl text-emerald-50/80 mb-12 leading-relaxed">
                  We believe the future of Ontario's grid is distributed. Power Solution is a Niagara-based Independent Power Producer (IPP) specializing in "Behind-the-Meter" solar and storage.
                </p>
                <button 
                  onClick={() => window.print()}
                  className="px-10 py-5 bg-white text-emerald-900 font-bold rounded-2xl hover:bg-emerald-50 transition-all flex items-center gap-3 mx-auto shadow-2xl"
                >
                  <FileDown className="w-6 h-6" /> Download Full PDF
                </button>
              </div>
            </div>

            <section className="py-24 container mx-auto px-6">
              <div className="grid md:grid-cols-3 gap-12 relative max-w-5xl mx-auto">
                <div className="absolute left-5 top-0 bottom-0 w-px bg-slate-200 hidden md:block"></div>
                <Step number="01" title="Site Access Agreement" description="A simple 1-page document allowing our engineers to finalize the system design and layout." />
                <Step number="02" title="Energy Service Agreement (ESA)" description="We define the discounted rate you'll pay for the clean power generated on-site." />
                <Step number="03" title="The 'Switch'" description="We install and manage the system. You start saving from Day 1 of commissioning." />
              </div>
            </section>
          </div>
        )}

        {/* --- SOLAR 标签页内容 --- */}
        {activeTab === 'solar' && (
          <section className="py-24 animate-in fade-in duration-500">
            <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-4">Why Choose Us</h2>
                <h3 className="text-4xl font-black text-slate-900">Strategic Benefits for Your Business</h3>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <BenefitCard icon={TrendingDown} title="Guaranteed Savings" description="20% electricity bill saving guaranteed from day one." />
                <BenefitCard icon={Shield} title="Unmatched Resilience" description="Backup power system ensures your campus stays powered." />
                <BenefitCard icon={Wrench} title="Zero Maintenance" description="We handle all licensing and 24/7 power management." />
                <BenefitCard icon={GraduationCap} title="Sustainable Innovation" description="Position your company as a leader in the green transition." />
              </div>
            </div>
          </section>
        )}

        {/* --- ADU DESIGN 标签页内容 --- */}
        {activeTab === 'adu' && (
          <div className="animate-in fade-in duration-500">
            <section className="py-24 bg-gradient-to-br from-slate-50 to-emerald-50 text-center px-6">
              <div className="max-w-5xl mx-auto">
                <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 leading-[1.1] tracking-tighter">
                  Modern Living, Redefined: <br />
                  Custom Garden Suites & Clean Energy
                </h2>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                  Creating independent, smart-enabled spaces for the ones you love. We combine architectural excellence with solar-powered solutions to deliver comfortable, eco-friendly homes for Ontario families.
                </p>
                {/* 按钮已移除 */}
              </div>
            </section>
          </div>
        )}

        {/* --- GALLERY 标签页内容 --- */}
        {activeTab === 'gallery' && (
          <div className="py-24 container mx-auto px-6 text-center animate-in fade-in duration-500">
             <h3 className="text-3xl font-black text-slate-900 mb-4">Project Gallery</h3>
             <p className="text-slate-500">Showcasing our recent solar and ADU installations across Ontario.</p>
          </div>
        )}
      </main>

      {/* 2. 全局固定 Footer */}
      <footer className="bg-slate-900 text-white pt-20 pb-10 border-t border-slate-800">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div className="space-y-6">
              <div className="flex flex-col">
                <span className="text-3xl font-black tracking-tighter">POWER SOLUTION</span>
                <span className="text-[10px] tracking-[0.3em] uppercase opacity-50">Think Unlimited</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                Building long-term energy partnerships that support local business growth and sustainable infrastructure through smart, reliable battery storage.
              </p>
            </div>
            
            <div className="space-y-6">
              <h5 className="font-bold uppercase tracking-widest text-xs text-emerald-400">Contact Us</h5>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-slate-300">
                  <Phone className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm font-medium">905-348-8834</span>
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <Mail className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm font-medium">sales@powersolution.ca</span>
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <Globe className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm font-medium">powersolution.ca</span>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h5 className="font-bold uppercase tracking-widest text-xs text-emerald-400">Location</h5>
              <p className="text-slate-300 text-sm leading-relaxed">
                Niagara Region,<br />
                Ontario, Canada
              </p>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-slate-500 uppercase tracking-widest font-black">
            <div>© {new Date().getFullYear()} Power Solution. All rights reserved.</div>
            <div className="flex gap-8">
              <a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
