'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { FiMenu, FiX, FiPhone, FiMail } from 'react-icons/fi';

// Navigation Items
const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Supplies', href: '/supplies' },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'QHSE', href: '/qhs' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 w-full z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Contact Bar */}
        <div className="hidden sm:flex items-center justify-between py-2 text-sm text-slate-400 border-b border-white/5">
          <div className="flex items-center gap-4">
            <a 
              href="mailto:dnmultiservicesupply@outlook.com" 
              className="flex items-center gap-2 hover:text-[#1185AE] transition-colors"
            >
              <FiMail size={14} />
              info@dnmultiservices.com
            </a>
            <a 
              href="tel:+260123456789"
              className="flex items-center gap-2 hover:text-[#1185AE] transition-colors"
            >
              <FiPhone size={14} />
              +260 979 130 958
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-[#1185AE] font-medium">
              DRC & Zambia Operations
            </span>
          </div>
        </div>

        {/* Main Header */}
        <div className="py-3 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image 
              src="/logo-01.png" 
              alt="DN Multi Services Logo"
              width={88}
              height={88}
              className="group-hover:scale-105 transition-transform"
            />
            <div>
              <div className="text-sm font-bold text-white group-hover:text-[#1185AE] transition-colors">
                DN Multi Services
              </div>
              <div className="text-xs text-slate-400">Supply Ltd</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`
                    px-4 py-2.5 rounded-lg text-sm font-medium transition-all
                    ${isActive 
                      ? 'text-white bg-white/10' 
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }
                  `}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link 
              href="/contact"
              className="ml-2 bg-[#BD2227] px-5 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Request Quote
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-slate-300 p-2 hover:text-white transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden glass border-t border-white/10 animate-fadeIn">
            <div className="flex flex-col p-4 space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`
                      px-4 py-3 rounded-lg text-sm font-medium transition-colors
                      ${isActive 
                        ? 'text-white bg-white/10' 
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                      }
                    `}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
              
              {/* Mobile Contact Info */}
              <div className="pt-4 mt-4 border-t border-white/10 space-y-3">
                <a 
                  href="mailto:dnmultiservicesupply@outlook.com"
                  className="flex items-center gap-3 px-4 py-2 text-slate-300 hover:text-[#1185AE] transition-colors"
                >
                  <FiMail size={18} />
                  <span className="text-sm">info@dnmultiservices.com</span>
                </a>
                <a 
                  href="tel:+260123456789"
                  className="flex items-center gap-3 px-4 py-2 text-slate-300 hover:text-[#1185AE] transition-colors"
                >
                  <FiPhone size={18} />
                  <span className="text-sm">+260 951 864 994</span>
                </a>
              </div>
              
              <Link 
                href="/contact"
                className="mt-4 bg-[#BD2227] px-5 py-3 rounded-lg font-semibold text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Request Quote
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}