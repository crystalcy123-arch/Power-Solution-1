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
  const [activeTab, setActiveTab] = useState<MainCategory>('home');
  
  // 修复点：补全 isDetected 属性以消除 TS2345 报错
  const [location] = useState<UserLocation>({
    city: 'St. Catharines',
    region: 'ON',
    country: 'Canada',
    isDetected: true 
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-grow pt-20">
        {activeTab === 'home' && <ProcessSection />}

        {/* 关键修复：这里的判断字符串必须与 Header 传过来的完全一致 */}
        {activeTab === 'solar & BESS' && (
          <div className="animate-in fade-in duration-500">
            <SolarSection location={location} />
          </div>
        )}

        {activeTab === 'adu' && (
          <div className="animate-in fade-in duration-500">
            <Hero location={location} onHomeClick={() => {}} onSolarClick={() => {}} />
            <ADUSection location={location} />
          </div>
        )}

        {activeTab === 'gallery' && (
          <div className="animate-in fade-in duration-500">
            <GallerySection />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;
