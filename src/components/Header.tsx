import React from 'react';
import { MainCategory } from '../types';

interface HeaderProps {
  activeTab: MainCategory;
  setActiveTab: (tab: MainCategory) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-[100] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex flex-col cursor-pointer" onClick={() => setActiveTab('home')}>
          <span className="text-xl font-black text-slate-900 tracking-tighter">POWER SOLUTION</span>
        </div>
        <nav className="flex items-center space-x-1 bg-slate-100 p-1 rounded-2xl">
          <button onClick={() => setActiveTab('home')} className={`px-4 md:px-6 py-2 rounded-xl font-bold text-sm ${activeTab === 'home' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500'}`}>Home</button>
          <button onClick={() => setActiveTab('solar')} className={`px-4 md:px-6 py-2 rounded-xl font-bold text-sm ${activeTab === 'solar' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500'}`}>Solar</button>
          <button onClick={() => setActiveTab('adu')} className={`px-4 md:px-6 py-2 rounded-xl font-bold text-sm ${activeTab === 'adu' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500'}`}>ADU Design</button>
          <button onClick={() => setActiveTab('gallery')} className={`px-4 md:px-6 py-2 rounded-xl font-bold text-sm ${activeTab === 'gallery' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500'}`}>Gallery</button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
