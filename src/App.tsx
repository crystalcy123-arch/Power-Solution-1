import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SolarSection from './components/SolarSection';
import ADUSection from './components/ADUSection';
import ProcessSection from './components/ProcessSection'; // 新增：导入原生流程组件
import GallerySection from './components/GallerySection';
import Footer from './components/Footer';
import { MainCategory, UserLocation } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<MainCategory>('home');
  const [location] = useState<UserLocation>({
    city: 'St. Catharines',
    region: 'ON',
    country: 'Canada'
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* 统一导航栏：Home -> Solar -> ADU Design -> Gallery */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-grow pt-20">
        {/* --- 场景 1: HOME (原生化 Zero-CAPEX 流程) --- */}
        {activeTab === 'home' && (
          <div className="animate-in fade-in duration-700">
            {/* 彻底取代 iframe，直接渲染原生项目流程内容 */}
            <ProcessSection />
          </div>
        )}

        {/* --- 场景 2: SOLAR --- */}
        {activeTab === 'solar' && (
          <div className="animate-in fade-in duration-500">
            <SolarSection location={location} />
          </div>
        )}

        {/* --- 场景 3: ADU DESIGN (包含原首页文字介绍) --- */}
        {activeTab === 'adu' && (
          <div className="animate-in fade-in duration-500">
            {/* Hero 介绍文字现在仅在此板块显示，且已去掉彩色按钮 */}
            <Hero location={location} onHomeClick={() => {}} onSolarClick={() => {}} />
            <ADUSection location={location} />
          </div>
        )}

        {/* --- 场景 4: GALLERY --- */}
        {activeTab === 'gallery' && (
          <div className="animate-in fade-in duration-500">
            <GallerySection />
          </div>
        )}
      </main>

      {/* 统一页脚：固定出现在所有标签页底部 */}
      <Footer />
    </div>
  );
};

export default App;
