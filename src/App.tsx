import ProcessSection from './components/ProcessSection';
// ...其他导入...

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-grow pt-20">
        {/* HOME: 原生流程组件，彻底取消 iframe */}
        {activeTab === 'home' && <ProcessSection />}

        {/* SOLAR: 提前显示 */}
        {activeTab === 'solar' && <SolarSection location={location} />}

        {/* ADU: 承载原首页的欢迎文字 */}
        {activeTab === 'adu' && (
          <div className="space-y-0">
            <Hero location={location} /> 
            <ADUSection location={location} />
          </div>
        )}

        {activeTab === 'gallery' && <GallerySection />}
      </main>

      {/* 统一的页脚，固定在所有页面底部 */}
      <Footer />
    </div>
  );
};
