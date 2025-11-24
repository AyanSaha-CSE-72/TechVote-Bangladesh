import React, { useState, useRef } from 'react';
import { Send, Lock, Upload, X, MapPin, User, Image as ImageIcon, Video, Building2, Search } from 'lucide-react';
import { Language } from '../types';

interface CommunityReportProps {
  language: Language;
}

// Hierarchical data: Division -> District -> Seats (Full 300 Seats)
const ELECTION_DATA: Record<string, Record<string, string[]>> = {
  'Rangpur Division': {
    'Panchagarh': ['Panchagarh-1 (1)', 'Panchagarh-2 (2)'],
    'Thakurgaon': ['Thakurgaon-1 (3)', 'Thakurgaon-2 (4)', 'Thakurgaon-3 (5)'],
    'Dinajpur': ['Dinajpur-1 (6)', 'Dinajpur-2 (7)', 'Dinajpur-3 (8)', 'Dinajpur-4 (9)', 'Dinajpur-5 (10)', 'Dinajpur-6 (11)'],
    'Nilphamari': ['Nilphamari-1 (12)', 'Nilphamari-2 (13)', 'Nilphamari-3 (14)', 'Nilphamari-4 (15)'],
    'Lalmonirhat': ['Lalmonirhat-1 (16)', 'Lalmonirhat-2 (17)', 'Lalmonirhat-3 (18)'],
    'Rangpur': ['Rangpur-1 (19)', 'Rangpur-2 (20)', 'Rangpur-3 (21)', 'Rangpur-4 (22)', 'Rangpur-5 (23)', 'Rangpur-6 (24)'],
    'Kurigram': ['Kurigram-1 (25)', 'Kurigram-2 (26)', 'Kurigram-3 (27)', 'Kurigram-4 (28)'],
    'Gaibandha': ['Gaibandha-1 (29)', 'Gaibandha-2 (30)', 'Gaibandha-3 (31)', 'Gaibandha-4 (32)', 'Gaibandha-5 (33)']
  },
  'Rajshahi Division': {
    'Joypurhat': ['Joypurhat-1 (34)', 'Joypurhat-2 (35)'],
    'Bogura': ['Bogura-1 (36)', 'Bogura-2 (37)', 'Bogura-3 (38)', 'Bogura-4 (39)', 'Bogura-5 (40)', 'Bogura-6 (41)', 'Bogura-7 (42)'],
    'Chapainawabganj': ['Chapainawabganj-1 (43)', 'Chapainawabganj-2 (44)', 'Chapainawabganj-3 (45)'],
    'Naogaon': ['Naogaon-1 (46)', 'Naogaon-2 (47)', 'Naogaon-3 (48)', 'Naogaon-4 (49)', 'Naogaon-5 (50)', 'Naogaon-6 (51)'],
    'Rajshahi': ['Rajshahi-1 (52)', 'Rajshahi-2 (53)', 'Rajshahi-3 (54)', 'Rajshahi-4 (55)', 'Rajshahi-5 (56)', 'Rajshahi-6 (57)'],
    'Natore': ['Natore-1 (58)', 'Natore-2 (59)', 'Natore-3 (60)', 'Natore-4 (61)'],
    'Sirajganj': ['Sirajganj-1 (62)', 'Sirajganj-2 (63)', 'Sirajganj-3 (64)', 'Sirajganj-4 (65)', 'Sirajganj-5 (66)', 'Sirajganj-6 (67)'],
    'Pabna': ['Pabna-1 (68)', 'Pabna-2 (69)', 'Pabna-3 (70)', 'Pabna-4 (71)', 'Pabna-5 (72)']
  },
  'Khulna Division': {
    'Meherpur': ['Meherpur-1 (73)', 'Meherpur-2 (74)'],
    'Kushtia': ['Kushtia-1 (75)', 'Kushtia-2 (76)', 'Kushtia-3 (77)', 'Kushtia-4 (78)'],
    'Chuadanga': ['Chuadanga-1 (79)', 'Chuadanga-2 (80)'],
    'Jhenaidah': ['Jhenaidah-1 (81)', 'Jhenaidah-2 (82)', 'Jhenaidah-3 (83)', 'Jhenaidah-4 (84)'],
    'Jashore': ['Jashore-1 (85)', 'Jashore-2 (86)', 'Jashore-3 (87)', 'Jashore-4 (88)', 'Jashore-5 (89)', 'Jashore-6 (90)'],
    'Magura': ['Magura-1 (91)', 'Magura-2 (92)'],
    'Narail': ['Narail-1 (93)', 'Narail-2 (94)'],
    'Bagerhat': ['Bagerhat-1 (95)', 'Bagerhat-2 (96)', 'Bagerhat-3 (97)', 'Bagerhat-4 (98)'],
    'Khulna': ['Khulna-1 (99)', 'Khulna-2 (100)', 'Khulna-3 (101)', 'Khulna-4 (102)', 'Khulna-5 (103)', 'Khulna-6 (104)'],
    'Satkhira': ['Satkhira-1 (105)', 'Satkhira-2 (106)', 'Satkhira-3 (107)', 'Satkhira-4 (108)']
  },
  'Barishal Division': {
    'Barguna': ['Barguna-1 (109)', 'Barguna-2 (110)'],
    'Patuakhali': ['Patuakhali-1 (111)', 'Patuakhali-2 (112)', 'Patuakhali-3 (113)', 'Patuakhali-4 (114)'],
    'Bhola': ['Bhola-1 (115)', 'Bhola-2 (116)', 'Bhola-3 (117)', 'Bhola-4 (118)'],
    'Barishal': ['Barishal-1 (119)', 'Barishal-2 (120)', 'Barishal-3 (121)', 'Barishal-4 (122)', 'Barishal-5 (123)', 'Barishal-6 (124)'],
    'Jhalokati': ['Jhalokati-1 (125)', 'Jhalokati-2 (126)'],
    'Pirojpur': ['Pirojpur-1 (127)', 'Pirojpur-2 (128)', 'Pirojpur-3 (129)']
  },
  'Dhaka Division': {
    'Tangail': ['Tangail-1 (130)', 'Tangail-2 (131)', 'Tangail-3 (132)', 'Tangail-4 (133)', 'Tangail-5 (134)', 'Tangail-6 (135)', 'Tangail-7 (136)', 'Tangail-8 (137)'],
    'Kishoreganj': ['Kishoreganj-1 (138)', 'Kishoreganj-2 (139)', 'Kishoreganj-3 (140)', 'Kishoreganj-4 (141)', 'Kishoreganj-5 (142)', 'Kishoreganj-6 (143)'],
    'Manikganj': ['Manikganj-1 (144)', 'Manikganj-2 (145)', 'Manikganj-3 (146)'],
    'Munshiganj': ['Munshiganj-1 (147)', 'Munshiganj-2 (148)', 'Munshiganj-3 (149)'],
    'Dhaka': ['Dhaka-1 (150)', 'Dhaka-2 (151)', 'Dhaka-3 (152)', 'Dhaka-4 (153)', 'Dhaka-5 (154)', 'Dhaka-6 (155)', 'Dhaka-7 (156)', 'Dhaka-8 (157)', 'Dhaka-9 (158)', 'Dhaka-10 (159)', 'Dhaka-11 (160)', 'Dhaka-12 (161)', 'Dhaka-13 (162)', 'Dhaka-14 (163)', 'Dhaka-15 (164)', 'Dhaka-16 (165)', 'Dhaka-17 (166)', 'Dhaka-18 (167)', 'Dhaka-19 (168)', 'Dhaka-20 (169)'],
    'Gazipur': ['Gazipur-1 (170)', 'Gazipur-2 (171)', 'Gazipur-3 (172)', 'Gazipur-4 (173)', 'Gazipur-5 (174)'],
    'Narsingdi': ['Narsingdi-1 (175)', 'Narsingdi-2 (176)', 'Narsingdi-3 (177)', 'Narsingdi-4 (178)', 'Narsingdi-5 (179)'],
    'Narayanganj': ['Narayanganj-1 (180)', 'Narayanganj-2 (181)', 'Narayanganj-3 (182)', 'Narayanganj-4 (183)', 'Narayanganj-5 (184)'],
    'Rajbari': ['Rajbari-1 (185)', 'Rajbari-2 (186)'],
    'Faridpur': ['Faridpur-1 (187)', 'Faridpur-2 (188)', 'Faridpur-3 (189)', 'Faridpur-4 (190)'],
    'Gopalganj': ['Gopalganj-1 (191)', 'Gopalganj-2 (192)', 'Gopalganj-3 (193)'],
    'Madaripur': ['Madaripur-1 (194)', 'Madaripur-2 (195)', 'Madaripur-3 (196)'],
    'Shariatpur': ['Shariatpur-1 (197)', 'Shariatpur-2 (198)', 'Shariatpur-3 (199)']
  },
  'Mymensingh Division': {
    'Jamalpur': ['Jamalpur-1 (200)', 'Jamalpur-2 (201)', 'Jamalpur-3 (202)', 'Jamalpur-4 (203)', 'Jamalpur-5 (204)'],
    'Sherpur': ['Sherpur-1 (205)', 'Sherpur-2 (206)', 'Sherpur-3 (207)'],
    'Mymensingh': ['Mymensingh-1 (208)', 'Mymensingh-2 (209)', 'Mymensingh-3 (210)', 'Mymensingh-4 (211)', 'Mymensingh-5 (212)', 'Mymensingh-6 (213)', 'Mymensingh-7 (214)', 'Mymensingh-8 (215)', 'Mymensingh-9 (216)', 'Mymensingh-10 (217)', 'Mymensingh-11 (218)'],
    'Netrokona': ['Netrokona-1 (219)', 'Netrokona-2 (220)', 'Netrokona-3 (221)', 'Netrokona-4 (222)', 'Netrokona-5 (223)']
  },
  'Sylhet Division': {
    'Sunamganj': ['Sunamganj-1 (224)', 'Sunamganj-2 (225)', 'Sunamganj-3 (226)', 'Sunamganj-4 (227)', 'Sunamganj-5 (228)'],
    'Sylhet': ['Sylhet-1 (229)', 'Sylhet-2 (230)', 'Sylhet-3 (231)', 'Sylhet-4 (232)', 'Sylhet-5 (233)', 'Sylhet-6 (234)'],
    'Moulvibazar': ['Moulvibazar-1 (235)', 'Moulvibazar-2 (236)', 'Moulvibazar-3 (237)', 'Moulvibazar-4 (238)'],
    'Habiganj': ['Habiganj-1 (239)', 'Habiganj-2 (240)', 'Habiganj-3 (241)', 'Habiganj-4 (242)']
  },
  'Chattogram Division': {
    'Brahmanbaria': ['Brahmanbaria-1 (243)', 'Brahmanbaria-2 (244)', 'Brahmanbaria-3 (245)', 'Brahmanbaria-4 (246)', 'Brahmanbaria-5 (247)', 'Brahmanbaria-6 (248)'],
    'Cumilla': ['Cumilla-1 (249)', 'Cumilla-2 (250)', 'Cumilla-3 (251)', 'Cumilla-4 (252)', 'Cumilla-5 (253)', 'Cumilla-6 (254)', 'Cumilla-7 (255)', 'Cumilla-8 (256)', 'Cumilla-9 (257)', 'Cumilla-10 (258)', 'Cumilla-11 (259)'],
    'Chandpur': ['Chandpur-1 (260)', 'Chandpur-2 (261)', 'Chandpur-3 (262)', 'Chandpur-4 (263)', 'Chandpur-5 (264)'],
    'Lakshmipur': ['Lakshmipur-1 (265)', 'Lakshmipur-2 (266)', 'Lakshmipur-3 (267)', 'Lakshmipur-4 (268)'],
    'Noakhali': ['Noakhali-1 (269)', 'Noakhali-2 (270)', 'Noakhali-3 (271)', 'Noakhali-4 (272)', 'Noakhali-5 (273)', 'Noakhali-6 (274)'],
    'Feni': ['Feni-1 (275)', 'Feni-2 (276)', 'Feni-3 (277)'],
    'Chattogram': ['Chattogram-1 (278)', 'Chattogram-2 (279)', 'Chattogram-3 (280)', 'Chattogram-4 (281)', 'Chattogram-5 (282)', 'Chattogram-6 (283)', 'Chattogram-7 (284)', 'Chattogram-8 (285)', 'Chattogram-9 (286)', 'Chattogram-10 (287)', 'Chattogram-11 (288)', 'Chattogram-12 (289)', 'Chattogram-13 (290)', 'Chattogram-14 (291)', 'Chattogram-15 (292)', 'Chattogram-16 (293)'],
    'Cox\'s Bazar': ['Cox\'s Bazar-1 (294)', 'Cox\'s Bazar-2 (295)', 'Cox\'s Bazar-3 (296)', 'Cox\'s Bazar-4 (297)'],
    'Khagrachhari': ['Khagrachhari (298)'],
    'Rangamati': ['Rangamati (299)'],
    'Bandarban': ['Bandarban (300)']
  }
};

export const CommunityReport: React.FC<CommunityReportProps> = ({ language }) => {
  const [submitted, setSubmitted] = useState(false);
  
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedSeat, setSelectedSeat] = useState('');
  
  const [reporterRole, setReporterRole] = useState('General Citizen');
  const [reportType, setReportType] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const t = {
    title: language === 'en' ? 'Anonymous Election Observation' : 'বেনামী নির্বাচনী পর্যবেক্ষণ',
    subtitle: language === 'en' 
      ? 'Report incidents or observations from your constituency. Your identity remains hidden.'
      : 'আপনার নির্বাচনী এলাকার ঘটনা বা পর্যবেক্ষণ রিপোর্ট করুন। আপনার পরিচয় গোপন থাকবে।',
    successTitle: language === 'en' ? 'Report Logged' : 'রিপোর্ট গ্রহণ করা হয়েছে',
    successMsg: language === 'en' 
      ? 'Thank you. Your anonymous report has been categorized by district and will help in aggregating election data.'
      : 'ধন্যবাদ। আপনার বেনামী রিপোর্টটি জেলা অনুযায়ী তালিকাভুক্ত করা হয়েছে এবং এটি নির্বাচনী তথ্য বিশ্লেষণে সাহায্য করবে।',
    btnAgain: language === 'en' ? 'Submit another report' : 'আরেকটি রিপোর্ট জমা দিন',
    
    labelRole: language === 'en' ? 'Reporting As (Anonymous)' : 'রিপোর্টার এর ধরণ (বেনামী)',
    
    labelDivision: language === 'en' ? 'Division' : 'বিভাগ',
    labelDistrict: language === 'en' ? 'District' : 'জেলা',
    labelSeat: language === 'en' ? 'Parliamentary Seat' : 'সংসদীয় আসন',
    
    placeholderDivision: language === 'en' ? 'Search or Select Division...' : 'বিভাগ খুঁজুন বা নির্বাচন করুন...',
    placeholderDistrict: language === 'en' ? 'Search or Select District...' : 'জেলা খুঁজুন বা নির্বাচন করুন...',
    placeholderSeat: language === 'en' ? 'Search or Select Seat...' : 'আসন খুঁজুন বা নির্বাচন করুন...',
    
    labelType: language === 'en' ? 'Incident Type' : 'ঘটনার ধরণ',
    labelDesc: language === 'en' ? 'Description & Evidence' : 'বিবরণ এবং প্রমাণ',
    placeholderDesc: language === 'en' ? 'Describe what happened...' : 'কী ঘটেছে তা বর্ণনা করুন...',
    
    labelUpload: language === 'en' ? 'Attach Photo/Video' : 'ছবি/ভিডিও যুক্ত করুন',
    
    privacyNote: language === 'en' 
      ? 'This report is strictly anonymous. Data is used for statistical analysis of election integrity.'
      : 'এই রিপোর্ট সম্পূর্ণ বেনামী। তথ্য শুধুমাত্র নির্বাচনী স্বচ্ছতার পরিসংখ্যানগত বিশ্লেষণের জন্য ব্যবহৃত হয়।',
    btnSubmit: language === 'en' ? 'Submit Secure Report' : 'নিরাপদ রিপোর্ট জমা দিন',
  };

  const roles = language === 'en' 
    ? ['General Citizen', 'Teacher / Instructor', 'Student', 'Election Official', 'Journalist']
    : ['সাধারণ নাগরিক', 'শিক্ষক / প্রশিক্ষক', 'ছাত্র', 'নির্বাচনী কর্মকর্তা', 'সাংবাদিক'];

  const reportTypes = language === 'en' 
    ? ['Vote Rigging / Irregularity', 'Violence / Harassment', 'Fake News Distribution', 'Code of Conduct Violation']
    : ['ভোট কারচুপি / অনিয়ম', 'সহিংসতা / হয়রানি', 'ভুয়া খবর প্রচার', 'আচরণবিধি লঙ্ঘন'];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      division: selectedDivision,
      district: selectedDistrict,
      seat: selectedSeat,
      role: reporterRole,
      type: reportType,
      hasMedia: !!selectedFile
    });
    setSubmitted(true);
  };

  // Validation helpers
  const isValidDivision = (div: string) => Object.keys(ELECTION_DATA).includes(div);
  const isValidDistrict = (div: string, dist: string) => div && ELECTION_DATA[div] && Object.keys(ELECTION_DATA[div]).includes(dist);

  if (submitted) {
    return (
      <div className="max-w-md mx-auto py-16 px-4 text-center animate-fade-in">
        <div className="bg-green-100 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
          <Send className="text-green-600 h-10 w-10" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{t.successTitle}</h3>
        <p className="text-gray-600">
          {t.successMsg}
        </p>
        <button 
          onClick={() => {
            setSubmitted(false);
            setSelectedFile(null);
            setPreviewUrl(null);
            setReportType('');
            setSelectedDivision('');
            setSelectedDistrict('');
            setSelectedSeat('');
          }}
          className="mt-6 text-bangla-green font-medium hover:underline flex items-center justify-center w-full gap-2"
        >
          {t.btnAgain}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="inline-block p-3 bg-indigo-100 rounded-full mb-4">
          <User className="h-8 w-8 text-indigo-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">{t.title}</h2>
        <p className="text-gray-600 mt-2 text-sm max-w-lg mx-auto">
          {t.subtitle}
        </p>
      </div>

      <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-bangla-green/10 to-transparent p-4 border-b border-gray-100 flex items-center gap-2">
           <Lock className="h-4 w-4 text-bangla-green" />
           <span className="text-sm font-semibold text-bangla-green uppercase tracking-wider">
             {language === 'en' ? 'Secure & Encrypted' : 'নিরাপদ ও এনক্রিপটেড'}
           </span>
        </div>

        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
          
          {/* Identity */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">{t.labelRole}</label>
            <select
              value={reporterRole}
              onChange={(e) => setReporterRole(e.target.value)}
              className="w-full rounded-lg border-gray-300 bg-gray-50 shadow-sm focus:border-bangla-green focus:ring focus:ring-bangla-green focus:ring-opacity-50 py-2.5 px-3 border transition-colors text-gray-900"
            >
              {roles.map(r => <option key={r} value={r} className="text-gray-900">{r}</option>)}
            </select>
          </div>

          {/* Location Hierarchy: Division -> District -> Seat */}
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 space-y-4">
             <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-2 border-b border-gray-200 pb-2">
               <Building2 size={16} className="text-bangla-green"/>
               {language === 'en' ? 'Location Details' : 'অবস্থানের বিবরণ'}
             </h4>
             
             {/* 1. Division Searchable Input */}
             <div>
               <label className="block text-xs font-bold text-gray-700 mb-1">{t.labelDivision}</label>
               <div className="relative">
                 <input
                   list="division-list"
                   value={selectedDivision}
                   onChange={(e) => {
                     setSelectedDivision(e.target.value);
                     setSelectedDistrict('');
                     setSelectedSeat('');
                   }}
                   placeholder={t.placeholderDivision}
                   className="w-full rounded-md border-gray-300 bg-white shadow-sm focus:border-bangla-green focus:ring focus:ring-bangla-green focus:ring-opacity-50 py-2 px-3 pl-9 border text-gray-900 placeholder:text-gray-400"
                   required
                 />
                 <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                 <datalist id="division-list">
                   {Object.keys(ELECTION_DATA).map(div => <option key={div} value={div} />)}
                 </datalist>
               </div>
             </div>

             {/* 2. District Searchable Input */}
             <div className={`transition-all duration-300 ${!isValidDivision(selectedDivision) ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
               <label className="block text-xs font-bold text-gray-700 mb-1">{t.labelDistrict}</label>
               <div className="relative">
                 <input 
                   list="district-list"
                   value={selectedDistrict}
                   onChange={(e) => {
                     setSelectedDistrict(e.target.value);
                     setSelectedSeat('');
                   }}
                   disabled={!isValidDivision(selectedDivision)}
                   placeholder={t.placeholderDistrict}
                   className="w-full rounded-md border-gray-300 bg-white shadow-sm focus:border-bangla-green focus:ring focus:ring-bangla-green focus:ring-opacity-50 py-2 px-3 pl-9 border text-gray-900 disabled:bg-gray-100 placeholder:text-gray-400"
                   required
                 />
                 <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                 <datalist id="district-list">
                   {isValidDivision(selectedDivision) && Object.keys(ELECTION_DATA[selectedDivision]).map(dist => (
                     <option key={dist} value={dist} />
                   ))}
                 </datalist>
               </div>
             </div>

             {/* 3. Seat Searchable Input */}
             <div className={`transition-all duration-300 ${!isValidDistrict(selectedDivision, selectedDistrict) ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
               <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1">
                 <MapPin size={12} /> {t.labelSeat}
               </label>
               <div className="relative">
                 <input 
                   list="seat-list"
                   value={selectedSeat}
                   onChange={(e) => setSelectedSeat(e.target.value)}
                   disabled={!isValidDistrict(selectedDivision, selectedDistrict)}
                   placeholder={t.placeholderSeat}
                   className="w-full rounded-md border-gray-300 bg-white shadow-sm focus:border-bangla-green focus:ring focus:ring-bangla-green focus:ring-opacity-50 py-2 px-3 pl-9 border text-gray-900 disabled:bg-gray-100 placeholder:text-gray-400"
                   required
                 />
                 <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                 <datalist id="seat-list">
                   {isValidDistrict(selectedDivision, selectedDistrict) && ELECTION_DATA[selectedDivision][selectedDistrict].map(seat => (
                     <option key={seat} value={seat} />
                   ))}
                 </datalist>
               </div>
             </div>
          </div>

          <hr className="border-gray-100" />

          {/* Incident Details */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">{t.labelType}</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {reportTypes.map((opt) => {
                const isSelected = reportType === opt;
                return (
                  <label 
                    key={opt} 
                    className={`relative flex items-start p-3 border rounded-lg cursor-pointer transition-all ${
                      isSelected 
                        ? 'bg-green-50 border-bangla-green ring-1 ring-bangla-green' 
                        : 'hover:bg-gray-50 border-gray-300'
                    }`}
                  >
                    <div className="flex items-center h-5">
                      <input
                        id={opt}
                        name="report-type"
                        type="radio"
                        value={opt}
                        checked={isSelected}
                        onChange={() => setReportType(opt)}
                        className="focus:ring-bangla-green h-4 w-4 text-bangla-green border-gray-300"
                        required
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <span className={`font-medium block ${isSelected ? 'text-bangla-green' : 'text-gray-900'}`}>
                        {opt}
                      </span>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Description & File Upload */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              {t.labelDesc}
            </label>
            <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-bangla-green focus-within:border-transparent bg-white">
              <textarea
                name="description"
                rows={4}
                className="w-full border-none focus:ring-0 p-3 bg-white resize-none text-gray-900 placeholder-gray-500"
                placeholder={t.placeholderDesc}
              />
              
              {/* Media Preview Area */}
              {selectedFile && (
                <div className="px-3 pb-3">
                   <div className="relative inline-block bg-gray-100 rounded-lg p-2 border border-gray-200 shadow-sm">
                     <button
                       type="button"
                       onClick={clearFile}
                       className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors z-10"
                     >
                       <X size={12} />
                     </button>
                     <div className="flex items-center gap-2">
                       {selectedFile.type.startsWith('image/') ? (
                         <img src={previewUrl!} alt="Preview" className="h-16 w-16 object-cover rounded bg-white" />
                       ) : (
                         <div className="h-16 w-16 bg-gray-200 flex items-center justify-center rounded">
                           <Video size={24} className="text-gray-500"/>
                         </div>
                       )}
                       <div className="text-xs text-gray-700 font-medium max-w-[150px] truncate px-2">
                         {selectedFile.name}
                       </div>
                     </div>
                   </div>
                </div>
              )}

              {/* Upload Toolbar */}
              <div className="bg-gray-50 px-3 py-2 border-t border-gray-200 flex items-center justify-between">
                 <div className="flex items-center gap-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*,video/*"
                      className="hidden"
                    />
                    <button 
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-1.5 text-xs font-medium text-gray-700 hover:text-bangla-green bg-white hover:bg-green-50 px-3 py-1.5 rounded border border-gray-300 transition-colors shadow-sm"
                    >
                      <Upload size={14} />
                      {t.labelUpload}
                    </button>
                 </div>
                 <span className="text-[10px] text-gray-500 uppercase tracking-wide font-bold">
                   Evidence
                 </span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg flex items-start border border-blue-100">
            <Lock className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
            <p className="text-xs text-blue-900 leading-relaxed font-medium">
              {t.privacyNote}
            </p>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-4 px-4 border border-transparent rounded-lg shadow-md text-base font-bold text-white bg-bangla-green hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bangla-green transition-all"
          >
            {t.btnSubmit}
          </button>
        </form>
      </div>
    </div>
  );
};