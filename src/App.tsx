import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SolarSection from './components/SolarSection';
import ADUSection from './components/ADUSection';
import GallerySection from './components/GallerySection';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-grow pt-20">
        {/* 1. 新首页：全屏展示独立网页内容 */}
        {activeTab === 'home' && (
          <div className="w-full h-[calc(100vh-5rem)]">
            <iframe 
              src="https://zero-carpex.vercel.app/" 
              title="Home"
              className="w-full h-full border-none"
            />
          </div>
        )}

        {/* 2. ADU 板块：包含原有的 Hero 介绍文字 */}
        {activeTab === 'adu' && (
          <>
            <Hero location={location} /> {/* 原首页内容现位于 ADU 顶部 */}
            <ADUSection location={location} />
          </>
        )}

        {/* 3. Solar 板块 */}
        {activeTab === 'solar' && <SolarSection location={location} />}

        {/* 4. Gallery 板块 */}
        {activeTab === 'gallery' && <GallerySection />}
      </main>

      <Footer />
    </div>
  );
};

export default App;
