import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SolarSection from './components/SolarSection';
import ADUSection from './components/ADUSection';
import ProcessSection from './components/ProcessSection'; 
import GallerySection from './components/GallerySection';
import Footer from './components/Footer';
import { MainCategory, UserLocation } from './types';

const App: React.FC = () => {
  // 1. 状态初始化：显式指定类型以匹配 types.ts 定义
  const [activeTab, setActiveTab] = useState<MainCategory>('home');
  
  // 2. 修复类型错误：补全 UserLocation 接口所需的 isDetected 属性
  const [location] = useState<UserLocation>({
    city: 'St. Catharines',
    region: 'ON',
    country: 'Canada',
    isDetected: true // 补全此属性以通过 TS 编译
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
            {/* Hero 介绍文字现在仅在此板块显示 */}
            {/* 彩色按钮已在此组件内部代码中去掉 */}
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

      {/* 统一页脚：包含专业联系信息，主页底部不再显示重复的蓝色块 */}
      <Footer />
    </div>
  );
};

export default App;
