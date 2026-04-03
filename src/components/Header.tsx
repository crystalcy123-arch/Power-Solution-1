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
        {/* Logo 区域 */}
        <div className="flex items-center cursor-pointer" onClick={() => setActiveTab('home')}>
          <img 
            src="/Power Solution LogoB.png" 
            alt="Power Solution Logo" 
            className="h-12 w-auto object-contain"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        </div>

        {/* 导航标签 */}
        <nav className="flex items-center space-x-1 bg-slate-100 p-1 rounded-2xl border border-slate-200">
          <button 
            onClick={() => setActiveTab('home')}
            className={`px-4 md:px-6 py-2 rounded-xl font-bold text-sm transition-all ${activeTab === 'home' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-emerald-600'}`}
          >
            Home
          </button>
          
          {/* 确保这里的字符串与 types.ts 中的定义精确匹配 */}
          <button 
            onClick={() => setActiveTab('solar & BESS')}
            className={`px-4 md:px-6 py-2 rounded-xl font-bold text-sm transition-all ${activeTab === 'solar & BESS' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-emerald-600'}`}
          >
            Solar & BESS
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
  );
};

export default Header;
