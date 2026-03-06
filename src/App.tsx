import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SolarSection from './components/SolarSection';
import ADUSection from './components/ADUSection';
import GallerySection from './components/GallerySection';
import Footer from './components/Footer';
import { MainCategory, UserLocation } from './types';

const App: React.FC = () => {
  // 1. 状态管理
  const [activeTab, setActiveTab] = useState<MainCategory>('home');
  const [location, setLocation] = useState<UserLocation>({
    city: 'St. Catharines', // 默认城市
    region: 'ON',
    country: 'Canada'
  });

  // 2. 模拟位置检测（保持原有逻辑）
  useEffect(() => {
    // 可以在这里保留您原有的 IP 检测逻辑
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* 顶部导航栏：已更新顺序并去掉 Contact */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-grow pt-20">
        {/* --- 场景 1: HOME (仅显示新网页) --- */}
        {activeTab === 'home' && (
          <div className="w-full h-[calc(100vh-5rem)] overflow-hidden">
            <iframe 
              src="https://zero-carpex.vercel.app/" 
              title="Power Solution - Home"
              className="w-full h-full border-none"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
              loading="lazy"
            />
          </div>
        )}

        {/* --- 场景 2: SOLAR (换到 ADU 之前) --- */}
        {activeTab === 'solar' && (
          <div className="animate-in fade-in duration-500">
            <SolarSection location={location} />
          </div>
        )}

        {/* --- 场景 3: ADU DESIGN (包含原首页内容) --- */}
        {activeTab === 'adu' && (
          <div className="animate-in fade-in duration-500 space-y-0">
            {/* 原首页的文字介绍现在挪到了这里 */}
            <Hero location={location} onHomeClick={() => {}} onSolarClick={() => {}} />
            {/* 紧接着是 ADU 配置器内容 */}
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

      {/* 页脚保持不变 */}
      <Footer />
    </div>
  );
};

export default App;
