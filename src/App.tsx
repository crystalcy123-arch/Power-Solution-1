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
  
  const [location] = useState<UserLocation>({
    city: 'St. Catharines',
    region: 'ON',
    country: 'Canada',
    isDetected: true // 补全属性以通过 TS 编译
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-grow pt-20">
        {activeTab === 'home' && <ProcessSection />}
        
        {activeTab === 'solar' && (
          <div className="animate-in fade-in duration-500">
            <SolarSection location={location} />
          </div>
        )}

        {activeTab === 'adu' && (
          <div className="animate-in fade-in duration-500">
            {/* 原首页文字迁移至 ADU 板块 */}
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
