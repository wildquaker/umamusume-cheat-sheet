'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon, LinkIcon, UserIcon, BookIcon, FlagIcon, ClubIcon, CloseIcon, MenuIcon } from './Icons';

const navItems = [
  { path: '/', label: 'Home', icon: HomeIcon },
  { path: '/links', label: 'Links', icon: LinkIcon },
  { path: '/characters', label: 'Umas', icon: UserIcon },
  { path: '/skills', label: 'Skills', icon: BookIcon },
  { path: '/races', label: 'Races', icon: FlagIcon },
  { path: '/builds', label: 'Builds', icon: ClubIcon },
];

export default function Navigation({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsOpen(false)}></div>
      )}

      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-neutral-900 border-r border-neutral-800 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:sticky md:top-0 md:h-screen md:shrink-0`}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-neutral-800">
          <span className="text-xl font-bold text-white">Menu</span>
          <button onClick={() => setIsOpen(false)} className="md:hidden text-neutral-400 hover:text-white">
            <CloseIcon />
          </button>
        </div>
        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path));
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-pink-500/10 text-pink-400' : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'}`}
              >
                <Icon />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      <main className="flex-1 min-w-0">
        <div className="md:hidden h-16 flex items-center px-4 border-b border-neutral-800 bg-neutral-900/50 backdrop-blur top-0 sticky z-30">
          <button onClick={() => setIsOpen(true)} className="text-neutral-400 hover:text-white p-2">
            <MenuIcon />
          </button>
          <span className="ml-4 font-semibold">Umamusume Cheat Sheet</span>
        </div>
        {children}
      </main>
    </>
  );
}
