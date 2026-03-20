import React from 'react';

export default function PageLayout({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Umamusume Cheat Sheet</h1>
        <h2 className="text-xl md:text-2xl font-medium text-pink-400">{title}</h2>
      </div>
      <div className="h-px bg-neutral-800"></div>
      <div className="animate-slide-up">
        {children}
      </div>
    </div>
  );
}
