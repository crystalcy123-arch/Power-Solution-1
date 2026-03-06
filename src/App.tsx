import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SolarSection from './components/SolarSection';
import ADUSection from './components/ADUSection';
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
      {/* 统一导航栏 */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-grow pt-20">
        {/* --- 场景 1: HOME (嵌入新网页，现在支持向下滚动到页脚) --- */}
        {activeTab === 'home' && (
          <div className="w-full flex flex-col">
            <div className="w-full h-[1200px] md:h-[2000px]"> 
              {/* 设置足够的高度以展示嵌入页面的完整内容 */}
              <iframe 
                src="https://zero-carpex.vercel.app/" 
                title="Power Solution - Home"
                className="w-full h-full border-none"
                loading="lazy"
              />
            </div>
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

      {/* 统一页脚：现在 Home 页面滚动到底部也会显示它 */}
      <Footer />
    </div>
  );
};

export default App;
