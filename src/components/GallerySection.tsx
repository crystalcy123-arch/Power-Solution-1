import React, { useState } from 'react';

const GallerySection: React.FC = () => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  // 根据您的 GitHub 路径（public/images/）更新的图片列表
  const images = [
    { 
      url: '/images/scandi-studio-adu-1772139350805.png', 
      title: 'Studio - Modern Scandi Exterior', 
      cat: 'Exterior' 
    },
    { 
      url: '/images/scandi-studio-adu-1772139399214.png', 
      title: '1-Bedroom - Industrial Craft', 
      cat: 'Exterior' 
    },
    { 
      url: '/images/scandi-studio-adu-1772139426645.png', 
      title: '2-Bedroom - Rural Contemporary', 
      cat: 'Exterior' 
    },
    { 
      url: '/images/scandi-studio-adu-1772139503055.png', 
      title: 'Studio - Urban Eco Suite', 
      cat: 'Exterior' 
    },
    { 
      url: '/images/scandi-studio-adu-1772139525160.png', 
      title: 'Efficient Minimalism Interior', 
      cat: 'Interior' 
    },
    { 
      url: '/images/scandi-studio-adu-1772139562824.png', 
      title: 'Warm Hygge Living Space', 
      cat: 'Interior' 
    },
    { 
      url: '/images/scandi-studio-adu-1772139585185.png', 
      title: 'Coastal Nordic Kitchen', 
      cat: 'Interior' 
    },
    { 
      url: '/images/scandi-studio-adu-1772139610657.png', 
      title: 'Urban Lofty Design', 
      cat: 'Interior' 
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-heading font-extrabold text-slate-900 mb-4">
          Design <span className="text-emerald-600">Inspiration</span>
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
          Explore our signature <span className="font-bold text-slate-900">Accessory Dwelling Unit (ADU)</span> configurations, featuring sustainable CLT structures and high-performance energy systems.
        </p>
      </div>

      {/* 响应式网格布局 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {images.map((img, idx) => (
          <div 
            key={idx} 
            className="group relative cursor-zoom-in overflow-hidden rounded-[2.5rem] border-4 border-white shadow-xl transition-all hover:shadow-2xl active:scale-95"
            onClick={() => setSelectedImg(img.url)}
          >
            <div className="aspect-[4/5] w-full overflow-hidden bg-slate-100">
              <img 
                src={img.url} 
                alt={img.title} 
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
              <span className="text-emerald-400 text-xs font-bold uppercase tracking-[0.2em] mb-2">{img.cat}</span>
              <h4 className="text-white text-lg font-bold leading-tight">{img.title}</h4>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImg && (
        <div 
          className="fixed inset-0 z-[300] bg-slate-900/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 cursor-zoom-out animate-in fade-in duration-300"
          onClick={() => setSelectedImg(null)}
        >
          <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img 
            src={selectedImg} 
            className="max-w-full max-h-full rounded-2xl shadow-2xl object-contain animate-in zoom-in duration-300" 
            alt="Enlarged design view" 
          />
        </div>
      )}
    </section>
  );
};

export default GallerySection;
