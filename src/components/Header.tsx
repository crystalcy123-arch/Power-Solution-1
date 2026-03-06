import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero'; 
import SolarSection from './components/SolarSection';
import ADUSection from './components/ADUSection';
import ProcessSection from './components/ProcessSection'; 
import GallerySection from './components/GallerySection';
import Footer from './components/Footer'; 
import { MainCategory, UserLocation } from './types';

export default function App() {
  // 显式指定初始状态为 'home'
  const [activeTab, setActiveTab] = useState<MainCategory>('home');
  
  // 补全 isDetected 属性以匹配 UserLocation 接口定义
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
        {/* 使用严格相等判断 */}
        {activeTab === 'home' && <ProcessSection />}
        {activeTab === 'solar' && <SolarSection location={location} />}
        {activeTab === 'adu' && (
          <div className="animate-in fade-in duration-500">
            {/* Hero 介绍现仅在 ADU 标签页显示 */}
            <Hero location={location} onHomeClick={() => {}} onSolarClick={() => {}} />
            <ADUSection location={location} />
          </div>
        )}
        {activeTab === 'gallery' && <GallerySection />}
      </main>
      <Footer />
    </div>
  );
}
