import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0f172a] text-white pt-16 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          
          {/* 1. 公司简介 (Think Unlimited) */}
          <div className="space-y-6">
            <h2 className="text-2xl font-black tracking-tight">POWER SOLUTION</h2>
            <p className="text-xs font-bold text-slate-400 tracking-widest uppercase">Think Unlimited</p>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Building long-term energy partnerships that support local business growth and sustainable infrastructure through smart, reliable battery storage.
            </p>
          </div>

          {/* 2. 联系方式 */}
          <div className="space-y-6">
            <h3 className="text-emerald-500 font-bold text-xs uppercase tracking-widest">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 text-slate-300 hover:text-white transition-colors group">
                <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="font-medium text-sm">905-348-8834</span>
              </li>
              <li className="flex items-center space-x-3 text-slate-300 hover:text-white transition-colors group">
                <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="font-medium text-sm">sales@powersolution.ca</span>
              </li>
              <li className="flex items-center space-x-3 text-slate-300 hover:text-white transition-colors group">
                <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                <span className="font-medium text-sm">powersolution.ca</span>
              </li>
            </ul>
          </div>

          {/* 3. 地理位置 */}
          <div className="space-y-6">
            <h3 className="text-emerald-500 font-bold text-xs uppercase tracking-widest">Location</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Niagara Region,<br />
              Ontario, Canada
            </p>
          </div>
        </div>

        {/* 底部版权与协议栏 */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
            © 2026 Power Solution. All Rights Reserved.
          </p>
          <div className="flex space-x-8 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            <a href="#" className="hover:text-emerald-500 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-emerald-500 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
