import React from 'react';
import { Menu, X, Shield, Info, Home, BookOpen, Users, Globe } from 'lucide-react';
import { ViewState, Language } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentView: ViewState;
  setView: (view: ViewState) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentView, setView, language, setLanguage }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navItems = [
    { id: ViewState.HOME, label: language === 'en' ? 'Home' : 'হোম', icon: Home },
    { id: ViewState.JOURNEY, label: language === 'en' ? 'Voter Guide' : 'ভোটার গাইড', icon: BookOpen },
    { id: ViewState.RUMOR_CHECKER, label: language === 'en' ? 'Rumor Check' : 'গুজব যাচাই', icon: Shield },
    { id: ViewState.MEDIA_LITERACY, label: language === 'en' ? 'Safe Space' : 'নিরাপদ ইন্টারনেট', icon: Info },
    { id: ViewState.COMMUNITY, label: language === 'en' ? 'Report' : 'রিপোর্ট', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-green-50 font-sans flex flex-col transition-colors duration-300">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-bangla-green text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div 
              className="flex items-center gap-2 cursor-pointer" 
              onClick={() => setView(ViewState.HOME)}
            >
              <div className="bg-bangla-red p-1.5 rounded-full">
                <Shield size={20} className="text-white" />
              </div>
              <span className="font-bold text-lg tracking-tight">TechVote BD</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-4">
              <div className="ml-10 flex items-baseline space-x-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setView(item.id)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentView === item.id
                        ? 'bg-white/20 text-white'
                        : 'text-white/80 hover:bg-white/10'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              
              {/* Language Toggle */}
              <button
                onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
                className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold border border-white/20"
              >
                <Globe size={14} />
                <span>{language === 'en' ? 'BN' : 'EN'}</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center gap-4">
              <button
                onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
                className="px-2 py-1 rounded bg-white/10 text-xs font-bold"
              >
                {language === 'en' ? 'BN' : 'EN'}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-white hover:bg-white/10 focus:outline-none"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-bangla-green border-t border-white/10">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setView(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center w-full px-3 py-3 rounded-md text-base font-medium ${
                    currentView === item.id
                      ? 'bg-white/20 text-white'
                      : 'text-white/80 hover:bg-white/10'
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-white font-semibold text-lg mb-2">TechVote BD</h3>
            <p className="text-sm">
              {language === 'en' 
                ? 'Empowering Bangladeshi voters with verified information and safe digital tools for the 2026 election.'
                : '২০২৬ সালের নির্বাচনের জন্য যাচাইকৃত তথ্য এবং নিরাপদ ডিজিটাল টুলস দিয়ে বাংলাদেশী ভোটারদের ক্ষমতায়ন।'}
            </p>
          </div>
          <div className="md:text-right">
            <h3 className="text-white font-semibold text-lg mb-2">
              {language === 'en' ? 'Safe Digital Spaces' : 'নিরাপদ ডিজিটাল স্পেস'}
            </h3>
            <ul className="text-sm space-y-2 inline-block text-left md:text-right">
              <li onClick={() => setView(ViewState.MEDIA_LITERACY)} className="cursor-pointer hover:text-white">
                {language === 'en' ? 'Privacy Tips' : 'গোপনীয়তা টিপস'}
              </li>
              <li onClick={() => setView(ViewState.RUMOR_CHECKER)} className="cursor-pointer hover:text-white">
                {language === 'en' ? 'Fact Checking' : 'ফ্যাক্ট চেকিং'}
              </li>
              <li onClick={() => setView(ViewState.COMMUNITY)} className="cursor-pointer hover:text-white">
                {language === 'en' ? 'Report Harassment' : 'হয়রানি রিপোর্ট করুন'}
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};