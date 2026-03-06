import React from 'react';
import { MainCategory } from '../types';

interface HeaderProps {
  activeTab: MainCategory;
  setActiveTab: (tab: MainCategory) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-[100] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo 点击回到新首页 */}
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setActiveTab('home')}>
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-xl font-bold text-slate-900 hidden sm:inline">Power Solution</span>
        </div>

        {/* 导航栏：顺序已调整为 Home -> Solar -> ADU Design -> Gallery */}
        <nav className="flex items-center space-x-1 bg-slate-100 p-1 rounded-2xl border border-slate-200">
          <button 
            onClick={() => setActiveTab('home')}
            className={`px-4 md:px-6 py-2 rounded-xl font-bold text-sm transition-all ${activeTab === 'home' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500'}`}
          >
            Home
          </button>
          <button 
            onClick={() => setActiveTab('solar')}
            className={`px-4 md:px-6 py-2 rounded-xl font-bold text-sm transition-all ${activeTab === 'solar' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500'}`}
          >
            Solar
          </button>
          <button 
            onClick={() => setActiveTab('adu')}
            className={`px-4 md:px-6 py-2 rounded-xl font-bold text-sm transition-all ${activeTab === 'adu' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500'}`}
          >
            ADU Design
          </button>
          <button 
            onClick={() => setActiveTab('gallery')}
            className={`px-4 md:px-6 py-2 rounded-xl font-bold text-sm transition-all ${activeTab === 'gallery' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500'}`}
          >
            Gallery
          </button>
        </nav>
        <div className="w-10 hidden md:block" />
      </div>
    </header>
  );
};

export default Header;
