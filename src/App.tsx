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
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-grow pt-20">
        {activeTab === 'home' && (
          <div className="w-full h-[calc(100vh-5rem)] overflow-hidden">
            {/* 主页 iframe 保持新网页内容，但内部蓝色圈出的旧联系块已被删除 */}
            <iframe 
              src="https://zero-carpex.vercel.app/" 
              title="Home"
              className="w-full h-full border-none"
              loading="lazy"
            />
          </div>
        )}

        {activeTab === 'solar' && <SolarSection location={location} />}

        {activeTab === 'adu' && (
          <div className="space-y-0">
            <Hero location={location} />
            <ADUSection location={location} />
          </div>
        )}

        {activeTab === 'gallery' && <GallerySection />}
      </main>

      {/* 固定出现在每一页的新版 Footer */}
      <Footer />
    </div>
  );
};

export default App;
