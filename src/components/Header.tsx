import React from 'react';
import { MainCategory } from '../types';
import logo from '../Power Solution LogoB.png'; // 导入公司Logo

// 定义组件的属性接口，修复 IntrinsicAttributes 报错
interface HeaderProps {
  activeTab: MainCategory;
  setActiveTab: (tab: MainCategory) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-[100] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* 1. Logo 区域：蓝色圈出来的Logo已改成公司logo */}
        <div className="flex flex-col cursor-pointer" onClick={() => setActiveTab('home')}>
          {/* 将文本Logo替换为图片Logo，并设置合适的高度 */}
          <img src={logo} alt="Power Solution Logo" className="h-16 w-auto object-contain" />
        </div>
        
        {/* 2. 导航区域 */}
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
      </div>
    </header>
  );
};

export default Header;
