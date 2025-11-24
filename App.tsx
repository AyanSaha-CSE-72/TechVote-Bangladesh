import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { RumorChecker } from './components/RumorChecker';
import { VoterJourney } from './components/VoterJourney';
import { SafeSpace } from './components/SafeSpace';
import { CommunityReport } from './components/CommunityReport';
import { ViewState, Language } from './types';
import { Shield, ChevronRight, CheckCircle, Users } from 'lucide-react';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [language, setLanguage] = useState<Language>('en');

  const renderContent = () => {
    switch (currentView) {
      case ViewState.RUMOR_CHECKER:
        return <RumorChecker language={language} />;
      case ViewState.JOURNEY:
        return <VoterJourney language={language} />;
      case ViewState.MEDIA_LITERACY:
        return <SafeSpace language={language} />;
      case ViewState.COMMUNITY:
        return <CommunityReport language={language} />;
      case ViewState.HOME:
      default:
        return <HomeView setView={setCurrentView} language={language} />;
    }
  };

  return (
    <Layout currentView={currentView} setView={setCurrentView} language={language} setLanguage={setLanguage}>
      {renderContent()}
    </Layout>
  );
}

const HomeView: React.FC<{ setView: (view: ViewState) => void; language: Language }> = ({ setView, language }) => {
  const t = {
    tagline: language === 'en' ? 'Bangladesh Election 2026' : 'বাংলাদেশ নির্বাচন ২০২৬',
    heroTitle: language === 'en' ? 'Your Vote,' : 'আপনার ভোট,',
    heroTitle2: language === 'en' ? 'Your Future' : 'আপনার ভবিষ্যৎ',
    heroDesc: language === 'en' 
      ? 'A safe space for verified election information, rumor checking, and digital safety tools. Built for every citizen.'
      : 'যাচাইকৃত নির্বাচন তথ্য, গুজব যাচাই এবং ডিজিটাল নিরাপত্তা টুলের জন্য একটি নিরাপদ স্থান। প্রতিটি নাগরিকের জন্য তৈরি।',
    btnJourney: language === 'en' ? 'Start Voter Journey' : 'ভোটার গাইড শুরু করুন',
    btnRumor: language === 'en' ? 'Check a Rumor' : 'গুজব যাচাই করুন',
    card1Title: language === 'en' ? 'Voter Guide' : 'ভোটার গাইড',
    card1Desc: language === 'en' 
      ? 'Step-by-step instructions on registration, polling centers, and voting rights.'
      : 'নিবন্ধন, ভোট কেন্দ্র এবং ভোটের অধিকার সম্পর্কে ধাপে ধাপে নির্দেশিকা।',
    card2Title: language === 'en' ? 'Safe Spaces' : 'নিরাপদ ইন্টারনেট',
    card2Desc: language === 'en'
      ? 'Tips to stay safe online, avoid harassment, and spot fake news.'
      : 'অনলাইনে নিরাপদ থাকা, হয়রানি এড়ানো এবং ভুয়া খবর শনাক্ত করার টিপস।',
    card3Title: language === 'en' ? 'Fact Checker' : 'গুজব যাচাই',
    card3Desc: language === 'en'
      ? 'AI-powered analysis to help you verify social media claims instantly.'
      : 'সোশ্যাল মিডিয়ার দাবি তাৎক্ষণিকভাবে যাচাই করতে এআই-চালিত বিশ্লেষণ।',
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-bangla-green to-emerald-900 text-white pt-12 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-white/20 text-white text-sm font-medium mb-6 backdrop-blur-sm">
            {t.tagline}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            {t.heroTitle} <br/>
            <span className="text-emerald-300">{t.heroTitle2}</span>
          </h1>
          <p className="text-lg md:text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            {t.heroDesc}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => setView(ViewState.JOURNEY)}
              className="bg-white text-bangla-green px-8 py-4 rounded-full font-bold text-lg hover:bg-emerald-50 transition shadow-lg flex items-center justify-center"
            >
              {t.btnJourney}
              <ChevronRight className="ml-2" />
            </button>
            <button 
              onClick={() => setView(ViewState.RUMOR_CHECKER)}
              className="bg-bangla-red text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-red-600 transition shadow-lg flex items-center justify-center"
            >
              {t.btnRumor}
              <Shield className="ml-2" />
            </button>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 -mt-12 z-10 grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div 
          onClick={() => setView(ViewState.JOURNEY)}
          className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition cursor-pointer border-t-4 border-bangla-green"
        >
          <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <CheckCircle className="text-bangla-green" />
          </div>
          <h3 className="text-xl font-bold mb-2">{t.card1Title}</h3>
          <p className="text-gray-600">{t.card1Desc}</p>
        </div>

        <div 
          onClick={() => setView(ViewState.MEDIA_LITERACY)}
          className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition cursor-pointer border-t-4 border-indigo-500"
        >
          <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <Users className="text-indigo-600" />
          </div>
          <h3 className="text-xl font-bold mb-2">{t.card2Title}</h3>
          <p className="text-gray-600">{t.card2Desc}</p>
        </div>

        <div 
          onClick={() => setView(ViewState.RUMOR_CHECKER)}
          className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition cursor-pointer border-t-4 border-bangla-red"
        >
          <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <Shield className="text-bangla-red" />
          </div>
          <h3 className="text-xl font-bold mb-2">{t.card3Title}</h3>
          <p className="text-gray-600">{t.card3Desc}</p>
        </div>
      </div>
    </div>
  );
};

export default App;