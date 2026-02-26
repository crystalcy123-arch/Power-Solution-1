import React from 'react';
import { MainCategory } from '../types';

interface HeaderProps {
  activeTab: MainCategory;
  setActiveTab: (tab: MainCategory) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const downloadLogo = () => {
    // 构建包含图标和文字的完整品牌 Logo SVG
    const svgData = `
      <svg width="1200" height="400" viewBox="0 0 1200 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <style>
            .text-power { fill: #0f172a; font-family: 'Inter', sans-serif; font-weight: 800; font-size: 160px; }
            .text-solution { fill: #059669; font-family: 'Inter', sans-serif; font-weight: 800; font-size: 160px; }
          </style>
        </defs>
        <rect x="50" y="50" width="300" height="300" rx="70" fill="#059669"/>
        <path d="M225 175V75L100 225H187.5V325L312.5 175H225Z" fill="white"/>
        <text x="400" y="260" class="text-power">Power</text>
        <text x="910" y="260" class="text-solution">Solution</text>
      </svg>
    `.trim();

    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Power-Solution-Full-Logo.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-[100] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        {/* 左侧：Logo 下载区域 */}
        <div 
          className="flex items-center space-x-2 cursor-pointer group" 
          onClick={downloadLogo}
          title="点击下载完整品牌 Logo (含文字)"
        >
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-xl font-bold font-heading tracking-tight text-slate-900 hidden sm:inline">
            Power <span className="text-emerald-600">Solution</span>
          </span>
          <div className="ml-3 hidden lg:block opacity-0 group-hover:opacity-100 transition-opacity bg-slate-100 text-[10px] text-slate-400 px-2 py-1 rounded font-black uppercase tracking-tighter">
            Save Full Logo
          </div>
        </div>

        {/* 中间：导航标签页切换 */}
        <nav className="flex items-center space-x-1 bg-slate-100 p-1 rounded-2xl border border-slate-200">
          <button 
            onClick={() => setActiveTab('home')}
            className={`px-4 md:px-6 py-2 rounded-xl font-bold text-sm transition-all ${activeTab === 'home' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            ADU Design
          </button
