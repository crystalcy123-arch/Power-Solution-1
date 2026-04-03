import React from 'react';
import { MainCategory } from '../types';

// 定义接口，修复 TS2322 / IntrinsicAttributes 报错
interface HeaderProps {
  activeTab: MainCategory;
  setActiveTab: (tab: MainCategory) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-[100] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* 蓝色圈出的 Logo 区域：已替换为公司图片 */}
        <div className="flex items-center cursor-pointer" onClick={() => setActiveTab('home')}>
          <img 
            src="/Power Solution LogoB.png" 
            alt="Power Solution Logo" 
            className="h-12 w-auto object-contain"
            onError={(e) => { e.currentTarget.style.display = 'none'; }} // 若图片加载失败则隐藏，防止显示碎图
          />
        </div>

        {/* 导航标签顺序：Home -> Solar & BESS -> ADU Design -> Gallery */}
        <nav className="flex items-center space-x-1 bg-slate-100 p-1 rounded-2xl border border-slate-200">
          <button 
            onClick={() => setActiveTab('home')}
            className={`px-4 md:px-6 py-2 rounded-xl font-bold text-sm transition-all ${activeTab === 'home' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-emerald-600'}`}
          >
            Home
          </button>
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
