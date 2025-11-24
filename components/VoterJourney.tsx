import React, { useState, useEffect } from 'react';
import { UserSegment, Language } from '../types';
import { Check, ChevronRight, User, Baby, Accessibility, Flower, Volume2, StopCircle } from 'lucide-react';

interface VoterJourneyProps {
  language: Language;
}

export const VoterJourney: React.FC<VoterJourneyProps> = ({ language }) => {
  const [segment, setSegment] = useState<UserSegment>(UserSegment.GENERAL);
  const [activeStep, setActiveStep] = useState(0);
  const [playingStep, setPlayingStep] = useState<number | null>(null);
  const [playingTipStep, setPlayingTipStep] = useState<number | null>(null);

  useEffect(() => {
    // Cleanup audio on unmount
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const segments = [
    { id: UserSegment.GENERAL, label: language === 'en' ? 'General Voter' : 'সাধারণ ভোটার', icon: User },
    { id: UserSegment.YOUNG_VOTER, label: language === 'en' ? 'First Time (Young)' : 'নতুন ভোটার', icon: Baby },
    { id: UserSegment.WOMAN, label: language === 'en' ? 'Woman Voter' : 'নারী ভোটার', icon: Flower },
    { id: UserSegment.DISABILITY, label: language === 'en' ? 'Disability Support' : 'প্রতিবন্ধী সহায়তা', icon: Accessibility },
  ];

  const steps = [
    {
      title: "Registration Check",
      titleBangla: "নিবন্ধন যাচাই",
      content: "Ensure your name is on the voter list. You can check online at the Election Commission website or your local Upazila office.",
      contentBangla: "আপনার নাম ভোটার তালিকায় আছে কিনা তা নিশ্চিত করুন। আপনি নির্বাচন কমিশনের ওয়েবসাইট বা স্থানীয় উপজেলা অফিসে এটি যাচাই করতে পারেন।",
      tips: {
        [UserSegment.GENERAL]: language === 'en' ? "Check at least 3 months before the election." : "নির্বাচনের অন্তত ৩ মাস আগে যাচাই করুন।",
        [UserSegment.YOUNG_VOTER]: language === 'en' ? "If you turned 18 recently, verify your NID draft status." : "আপনি যদি সম্প্রতি ১৮ বছর পূর্ণ করে থাকেন, তবে আপনার এনআইডি স্ট্যাটাস যাচাই করুন।",
        [UserSegment.WOMAN]: language === 'en' ? "Ensure your photo on the list matches your current appearance (e.g., hijab/niqab rules)." : "তালিকায় আপনার ছবি বর্তমান চেহারার সাথে মিলছে কিনা তা নিশ্চিত করুন।",
        [UserSegment.DISABILITY]: language === 'en' ? "Check if your disability status is marked for priority access." : "আপনার প্রতিবন্ধী স্ট্যাটাস অগ্রাধিকারের জন্য চিহ্নিত করা আছে কিনা তা দেখুন।",
        [UserSegment.RURAL]: language === 'en' ? "Visit the local Union Parishad office for help." : "সাহায্যের জন্য স্থানীয় ইউনিয়ন পরিষদ অফিসে যান।",
      }
    },
    {
      title: "Know Your Center",
      titleBangla: "ভোট কেন্দ্র জানুন",
      content: "Find out where your polling center is located. It might change from the last election.",
      contentBangla: "আপনার ভোট কেন্দ্র কোথায় তা জেনে নিন। গত নির্বাচনের চেয়ে এটি পরিবর্তন হতে পারে।",
      tips: {
        [UserSegment.GENERAL]: language === 'en' ? "Centers open at 8:00 AM." : "কেন্দ্রগুলো সকাল ৮:০০ টায় খোলে।",
        [UserSegment.YOUNG_VOTER]: language === 'en' ? "Download the 'Smart Election' app for maps." : "ম্যাপের জন্য 'স্মার্ট ইলেকশন' অ্যাপ ডাউনলোড করুন।",
        [UserSegment.WOMAN]: language === 'en' ? "Look for separate queues for women." : "নারীদের জন্য আলাদা লাইন খুঁজুন।",
        [UserSegment.DISABILITY]: language === 'en' ? "Verify if the center has ramp access." : "কেন্দ্রে র‍্যাম্প সুবিধা আছে কিনা তা যাচাই করুন।",
        [UserSegment.RURAL]: language === 'en' ? "Ask community leaders for transport arrangements." : "পরিবহন ব্যবস্থার জন্য স্থানীয় নেতাদের জিজ্ঞাসা করুন।",
      }
    },
    {
      title: "Election Day",
      titleBangla: "নির্বাচনের দিন",
      content: "Bring your NID or Smart Card. Do not wear party symbols inside the center.",
      contentBangla: "আপনার এনআইডি বা স্মার্ট কার্ড সাথে আনুন। কেন্দ্রের ভিতরে কোনো দলের প্রতীক পরবেন না।",
      tips: {
        [UserSegment.GENERAL]: language === 'en' ? "Leave your mobile phone outside the booth." : "ভোটকক্ষের বাইরে মোবাইল ফোন রেখে যান।",
        [UserSegment.YOUNG_VOTER]: language === 'en' ? "Your vote is your secret. Do not take selfies while voting." : "আপনার ভোট গোপন। ভোট দেওয়ার সময় সেলফি তুলবেন না।",
        [UserSegment.WOMAN]: language === 'en' ? "If you feel unsafe, report to the presiding officer immediately." : "নিরাপদ বোধ না করলে অবিলম্বে প্রিজাইডিং অফিসারকে জানান।",
        [UserSegment.DISABILITY]: language === 'en' ? "You are allowed to bring a trusted helper if visually impaired." : "দৃষ্টিপ্রতিবন্ধী হলে একজন বিশ্বস্ত সাহায্যকারী সাথে রাখতে পারবেন।",
        [UserSegment.RURAL]: language === 'en' ? "Go early to avoid long lines in the heat." : "গরমে দীর্ঘ লাইন এড়াতে সকালে যান।",
      }
    }
  ];

  const speak = (text: string, onStart: () => void, onEnd: () => void) => {
    if (!('speechSynthesis' in window)) {
      alert("Text-to-speech is not supported in this browser.");
      return;
    }
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    // Determine language based on content char or prop. Defaulting to Bangla for Bangla text.
    utterance.lang = language === 'en' ? 'en-US' : 'bn-BD'; 
    utterance.rate = 0.9;
    
    utterance.onstart = onStart;
    utterance.onend = onEnd;
    utterance.onerror = (e) => {
      console.error("Speech synthesis error", e);
      onEnd();
    };
    
    window.speechSynthesis.speak(utterance);
  };

  const toggleContentAudio = (index: number, text: string) => {
    if (playingStep === index) {
      window.speechSynthesis.cancel();
      setPlayingStep(null);
    } else {
      setPlayingTipStep(null); // Stop tip audio if playing
      speak(text, () => setPlayingStep(index), () => setPlayingStep(null));
    }
  };

  const toggleTipAudio = (index: number, text: string) => {
    if (playingTipStep === index) {
      window.speechSynthesis.cancel();
      setPlayingTipStep(null);
    } else {
      setPlayingStep(null); // Stop content audio if playing
      speak(text, () => setPlayingTipStep(index), () => setPlayingTipStep(null));
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900">
          {language === 'en' ? 'Voter Journey' : 'ভোটার গাইড'}
        </h2>
        <h3 className="text-xl text-bangla-green font-bengali mt-1">
          {language === 'en' ? 'Steps to Vote' : 'ভোট প্রদানের ধাপসমূহ'}
        </h3>
      </div>

      {/* Segment Selector */}
      <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4 text-center">
          {language === 'en' ? 'Customize for me' : 'আমার জন্য কাস্টমাইজ করুন'}
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {segments.map((s) => (
            <button
              key={s.id}
              onClick={() => setSegment(s.id)}
              className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all ${
                segment === s.id
                  ? 'border-bangla-green bg-green-50 text-bangla-green'
                  : 'border-gray-200 hover:border-bangla-green/50 text-gray-600'
              }`}
            >
              <s.icon className="h-6 w-6 mb-2" />
              <span className="text-sm font-medium">{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Steps */}
      <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
        {steps.map((step, index) => (
          <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            
            {/* Icon Marker */}
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 ${
              activeStep >= index ? 'bg-bangla-green text-white' : 'bg-slate-300 text-slate-500'
            }`}>
              {activeStep > index ? <Check size={18} /> : <span>{index + 1}</span>}
            </div>

            {/* Content Card */}
            <div 
              className={`w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-xl shadow-md border border-gray-100 transition-all cursor-pointer ${
                activeStep === index ? 'ring-2 ring-bangla-green ring-offset-2' : 'hover:shadow-lg'
              }`}
              onClick={() => setActiveStep(index)}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">
                    {language === 'en' ? step.title : step.titleBangla}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-bangla-green font-bengali text-sm">
                      {language === 'en' ? step.titleBangla : step.title}
                    </p>
                  </div>
                </div>
                {activeStep === index && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {language === 'en' ? 'Active' : 'সক্রিয়'}
                </span>}
              </div>
              
              <div className="flex items-start gap-3 mb-4">
                  <p className="text-gray-600 text-sm leading-relaxed flex-1">
                    {language === 'en' ? step.content : step.contentBangla}
                  </p>
                  <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleContentAudio(index, `${step.titleBangla}. ${step.contentBangla}`);
                      }}
                      className={`px-3 py-1.5 rounded-full transition-colors flex items-center gap-1 text-xs font-medium border ${
                        playingStep === index 
                          ? 'bg-bangla-red/10 text-bangla-red border-bangla-red/20' 
                          : 'bg-gray-50 text-gray-600 hover:bg-bangla-green hover:text-white border-gray-200'
                      }`}
                      title={language === 'en' ? "Listen in Bangla" : "বাংলায় শুনুন"}
                    >
                      {playingStep === index ? <StopCircle size={14} /> : <Volume2 size={14} />}
                      {language === 'en' ? 'Listen' : 'শুনুন'}
                    </button>
              </div>

              {/* Dynamic Tip based on Segment */}
              <div className="bg-amber-50 border-l-4 border-amber-400 p-3 rounded-r-md">
                <div className="flex justify-between items-start gap-2">
                  <div className="flex-1">
                    <p className="text-xs text-amber-800 font-medium">
                      <span className="uppercase font-bold block text-[10px] text-amber-600 mb-1">
                        {language === 'en' ? 'Tip' : 'পরামর্শ'}:
                      </span>
                      {step.tips[segment]}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTipAudio(index, step.tips[segment]);
                    }}
                    className={`px-2 py-1.5 rounded-md transition-colors flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider shrink-0 ${
                      playingTipStep === index 
                        ? 'bg-amber-200 text-amber-800' 
                        : 'bg-white text-amber-600 border border-amber-200 hover:bg-amber-100'
                    }`}
                    title={language === 'en' ? "Listen to tip" : "পরামর্শ শুনুন"}
                  >
                     {playingTipStep === index ? <StopCircle size={12} /> : <Volume2 size={12} />}
                     {language === 'en' ? 'Listen' : 'শুনুন'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button 
          onClick={() => setActiveStep(prev => Math.min(prev + 1, steps.length - 1))}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-bangla-green hover:bg-emerald-700 transition-colors"
        >
          {language === 'en' ? 'Next Step' : 'পরবর্তী ধাপ'} <ChevronRight className="ml-2 h-5 w-5" />
        </button>
      </div>
    </div>
  );
};