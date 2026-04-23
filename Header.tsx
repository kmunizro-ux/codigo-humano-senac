import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="h-16 border-b bg-white/50 backdrop-blur-sm flex items-center justify-between px-8 shrink-0">
      <div className="flex items-center space-x-2">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Sistema Online</span>
      </div>
      <div className="flex space-x-4 items-center">
        <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center">
          <div className="w-full h-full bg-gradient-to-br from-[#00417B] to-[#F37021] opacity-20"></div>
        </div>
      </div>
    </header>
  );
};
