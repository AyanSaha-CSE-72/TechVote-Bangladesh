import React from 'react';
import { Lock, EyeOff, MessageSquare, ShieldCheck, Share2, Smartphone } from 'lucide-react';
import { Language } from '../types';

interface SafeSpaceProps {
  language: Language;
}

export const SafeSpace: React.FC<SafeSpaceProps> = ({ language }) => {
  const guides = [
    {
      title: language === 'en' ? "Secure Your Account" : "অ্যাকাউন্ট সুরক্ষিত করুন",
      icon: Lock,
      content: language === 'en' 
        ? "Turn on Two-Factor Authentication (2FA) for Facebook and WhatsApp. Use a strong password unique to your social media."
        : "ফেসবুক এবং হোয়াটসঅ্যাপের জন্য টু-ফ্যাক্টর অথেনটিকেশন (2FA) চালু করুন। শক্তিশালী পাসওয়ার্ড ব্যবহার করুন।",
      action: language === 'en' ? "Check Privacy Settings" : "সেটিংস চেক করুন"
    },
    {
      title: language === 'en' ? "Spot Deepfakes" : "ডিপফেক শনাক্ত করুন",
      icon: EyeOff,
      content: language === 'en' 
        ? "Look for unnatural blinking, mismatched lip-syncing, or blurry edges around the face. AI-generated audio often lacks emotion."
        : "অস্বাভাবিক চোখের পলক বা ঠোঁটের অসামঞ্জস্যতা লক্ষ্য করুন। এআই-তৈরি অডিওতে প্রায়ই আবেগের অভাব থাকে।",
      action: language === 'en' ? "Learn More" : "আরও জানুন"
    },
    {
      title: language === 'en' ? "Handling Harassment" : "হয়রানি মোকাবিলা",
      icon: ShieldCheck,
      content: language === 'en' 
        ? "If you receive threats or hate speech, do not reply. Screenshot the evidence, block the user, and report it to the platform."
        : "হুমকি বা ঘৃণাত্মক বার্তা পেলে উত্তর দেবেন না। স্ক্রিনশট নিন, ব্যবহারকারীকে ব্লক করুন এবং রিপোর্ট করুন।",
      action: language === 'en' ? "Report Guide" : "রিপোর্ট গাইড"
    },
    {
      title: language === 'en' ? "Think Before Sharing" : "শেয়ার করার আগে ভাবুন",
      icon: Share2,
      content: language === 'en' 
        ? "Misinformation spreads faster than facts. Ask: Who wrote this? Is there a source link? Is the image from an old event?"
        : "ভুল তথ্য সত্যের চেয়ে দ্রুত ছড়ায়। প্রশ্ন করুন: এর লেখক কে? কোন সূত্র আছে কি? ছবিটি কি পুরনো?",
      action: language === 'en' ? "Fact-Check Tips" : "যাচাই টিপস"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-indigo-700 rounded-3xl p-8 md:p-12 mb-12 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-indigo-500 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-40 h-40 bg-pink-500 rounded-full opacity-30 blur-3xl"></div>
        
        <h2 className="text-3xl md:text-4xl font-bold mb-4 relative z-10">
          {language === 'en' ? 'Safe Digital Spaces' : 'নিরাপদ ডিজিটাল স্পেস'}
        </h2>
        <p className="text-lg text-indigo-100 max-w-2xl mx-auto mb-8 relative z-10">
          {language === 'en' 
            ? 'The internet should be a safe place for political discussion. Learn how to protect yourself and your community during the election.'
            : 'ইন্টারনেট রাজনৈতিক আলোচনার জন্য একটি নিরাপদ স্থান হওয়া উচিত। নির্বাচনকালীন সময়ে নিজেকে এবং আপনার সম্প্রদায়কে কীভাবে রক্ষা করবেন তা জানুন।'}
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 relative z-10">
          <button className="bg-white text-indigo-700 font-bold py-3 px-6 rounded-full shadow hover:bg-indigo-50 transition">
            {language === 'en' ? 'Digital Hygiene Checklist' : 'ডিজিটাল হাইজিন চেকলিস্ট'}
          </button>
          <button className="bg-indigo-600 border border-indigo-400 text-white font-bold py-3 px-6 rounded-full hover:bg-indigo-500 transition">
            {language === 'en' ? 'Helpline Numbers' : 'হেল্পলাইন নম্বর'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {guides.map((guide, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start">
              <div className="p-3 bg-indigo-50 rounded-lg mr-4 text-indigo-600">
                <guide.icon size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{guide.title}</h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {guide.content}
                </p>
                <button className="text-indigo-600 font-semibold text-sm hover:text-indigo-800 inline-flex items-center">
                  {guide.action} <Smartphone size={14} className="ml-1" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <MessageSquare className="mr-2" />
          {language === 'en' ? 'Community Insights' : 'কমিউনিটি রিপোর্ট'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-bangla-green mb-1">1,240</div>
            <div className="text-sm text-gray-500">{language === 'en' ? 'Rumors Clarified' : 'গুজব যাচাই করা হয়েছে'}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-indigo-600 mb-1">85%</div>
            <div className="text-sm text-gray-500">{language === 'en' ? 'Users feel safer' : 'ব্যবহারকারী নিরাপদ বোধ করছেন'}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-orange-500 mb-1">500+</div>
            <div className="text-sm text-gray-500">{language === 'en' ? 'Volunteers Active' : 'সক্রিয় স্বেচ্ছাসেবক'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};