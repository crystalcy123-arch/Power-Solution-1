import React from 'react';
import { UserLocation } from '../types';

interface HeroProps {
  onHomeClick: () => void;
  onSolarClick: () => void;
  location: UserLocation;
}

const Hero: React.FC<HeroProps> = ({ location }) => {
  return (
    <section className="pt-32 pb-24 px-4 bg-gradient-to-br from-slate-50 to-sky-50 relative overflow-hidden">
      {/* 装饰性背景元素 */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-sky-100/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-emerald-100/20 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-extrabold text-slate-900 mb-8 leading-tight tracking-tight">
          Modern Living, Redefined: <br />
          Custom Garden Suites & Clean Energy
        </h1>
        
        {/* 描述文字：已根据按钮移除调整了 mb-12 边距 */}
        <p className="max-w-4xl mx-auto text-lg md:text-xl text-slate-600 mb-0 leading-relaxed">
          Creating independent, smart-enabled spaces for the ones you love. 
          We combine architectural excellence with solar-powered solutions to deliver 
          comfortable, eco-friendly homes for Ontario families.
        </p>

        {/* 按钮区域已根据需求完整移除 */}
      </div>
    </section>
  );
};

export default Hero;
