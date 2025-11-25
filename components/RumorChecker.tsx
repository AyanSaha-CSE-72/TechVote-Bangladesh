import React, { useState, useRef } from 'react';
import { AlertCircle, CheckCircle, HelpCircle, ShieldAlert, Loader2, Send, Shield, Image as ImageIcon, X, Video, ScanLine } from 'lucide-react';
import { analyzeRumor } from '../services/geminiService';
import { RumorAnalysisResult, Language } from '../types';

interface RumorCheckerProps {
  language: Language;
}

export const RumorChecker: React.FC<RumorCheckerProps> = ({ language }) => {
  const [input, setInput] = useState('');
  const [category, setCategory] = useState('General');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RumorAnalysisResult | null>(null);
  
  // File upload state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const t = {
    title: language === 'en' ? 'Rumor Checker' : 'গুজব যাচাই কেন্দ্র',
    subtitle: language === 'en' ? 'Verify Misinformation' : 'ভুল তথ্য যাচাই করুন',
    desc: language === 'en' 
      ? 'Unsure about something you saw on social media? Paste it here for an AI-assisted analysis.'
      : 'সোশ্যাল মিডিয়ায় যা দেখেছেন তা নিয়ে নিশ্চিত নন? এআই বিশ্লেষণের জন্য এখানে পেস্ট করুন।',
    labelCategory: language === 'en' ? 'Category' : 'বিভাগ',
    labelInput: language === 'en' ? 'Text to Analyze' : 'যাচাই করার জন্য টেক্সট',
    placeholder: language === 'en' ? 'Paste the post, message, or claim here...' : 'পোস্ট, বার্তা বা দাবি এখানে পেস্ট করুন...',
    btnAnalyze: language === 'en' ? 'Check Now' : 'যাচাই করুন',
    btnLoading: language === 'en' ? 'Analyzing...' : 'বিশ্লেষণ করা হচ্ছে...',
    uploadBtn: language === 'en' ? 'Upload Image/Video' : 'ছবি বা ভিডিও আপলোড',
    resultSummary: language === 'en' ? 'Analysis Summary' : 'বিশ্লেষণ সারাংশ',
    resultQuestions: language === 'en' ? 'Critical Questions to Ask' : 'গুরুত্বপূর্ণ প্রশ্ন',
    resultSafety: language === 'en' ? 'Safety Tip' : 'নিরাপত্তা টিপ',
    disclaimer: language === 'en' 
      ? '* This tool helps you think critically. It is not an official verdict from the Election Commission.'
      : '* এই টুলটি আপনাকে সমালোচনামূলকভাবে চিন্তা করতে সাহায্য করে। এটি নির্বাচন কমিশনের আনুষ্ঠানিক রায় নয়।',
    featuresTitle: language === 'en' ? 'Scanner Features:' : 'স্ক্যানার ফিচার:',
    features: language === 'en' ? [
        "Feature that allows you to take a picture and have it analyzed.",
        "Supports text analysis or image/video analysis.",
        "Perform fact analysis to increase productivity."
    ] : [
        "ছবি তুলে বা আপলোড করে বিশ্লেষণ করার সুবিধা।",
        "টেক্সট বা ছবি/ভিডিও বিশ্লেষণের মাধ্যমে যাচাই।",
        "সত্যতা যাচাইয়ের (Fact Analysis) মাধ্যমে সচেতনতা বৃদ্ধি।"
    ]
  };

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

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result as string;
        // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
        const base64Data = base64String.split(',')[1];
        resolve(base64Data);
      };
      reader.onerror = error => reject(error);
    });
  };

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() && !selectedFile) return;

    setLoading(true);
    setResult(null);
    
    try {
      let mediaData = undefined;
      if (selectedFile) {
        const base64Data = await fileToBase64(selectedFile);
        mediaData = {
          data: base64Data,
          mimeType: selectedFile.type
        };
      }

      const data = await analyzeRumor(input, category, mediaData);
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    "Voting Process (ভোট প্রক্রিয়া)",
    "Candidate Info (প্রার্থী তথ্য)",
    "Election Date/Rules (নির্বাচনের তারিখ/নিয়ম)",
    "Security & Safety (নিরাপত্তা)",
    "Other (অন্যান্য)"
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h2>
        <h3 className="text-xl text-bangla-green font-bengali">{t.subtitle}</h3>
        <p className="text-gray-600 mt-2">
          {t.desc}
        </p>
      </div>

      {/* Feature Info Block */}
      <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg mb-6 shadow-sm">
        <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2 text-sm uppercase tracking-wide">
          <ScanLine size={16}/> {t.featuresTitle}
        </h4>
        <ul className="list-disc pl-5 space-y-1 text-sm text-blue-800">
           {t.features.map((f, i) => <li key={i}>{f}</li>)}
        </ul>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <form onSubmit={handleCheck} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              {t.labelCategory}
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-bangla-green focus:ring focus:ring-bangla-green focus:ring-opacity-50 py-2 px-3 border text-gray-900 bg-white"
            >
              {categories.map(c => <option key={c} value={c} className="text-gray-900">{c}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              {t.labelInput}
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={4}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-bangla-green focus:ring focus:ring-bangla-green focus:ring-opacity-50 py-2 px-3 border text-gray-900 placeholder-gray-500 bg-white"
              placeholder={t.placeholder}
            />
          </div>

          {/* Media Upload Section */}
          <div>
             <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*,video/*"
                className="hidden"
              />
              {!selectedFile ? (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 text-sm text-bangla-green hover:bg-green-50 px-3 py-4 rounded-md transition-colors border-2 border-dashed border-bangla-green/40 w-full justify-center hover:border-bangla-green bg-white"
                >
                  <ImageIcon size={20} />
                  {t.uploadBtn}
                </button>
                   ) : (
                <div className="relative mt-2 border border-gray-200 rounded-md p-2 bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-gray-700 truncate max-w-[200px]">
                      {selectedFile.name}
                    </span>
                    <button
                      type="button"
                      onClick={clearFile}
                      className="text-red-500 hover:bg-red-50 p-1 rounded-full"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  {selectedFile.type.startsWith('image/') ? (
                    <img 
                      src={previewUrl!} 
                      alt="Preview" 
                      className="h-40 object-contain mx-auto rounded-md shadow-sm bg-white"
                    />
                  ) : (
                    <div className="h-40 flex items-center justify-center bg-gray-200 rounded-md">
                      <Video size={40} className="text-gray-500" />
                    </div>
                  )}
                </div>
              )}
          </div>

          <button
            type="submit"
            disabled={loading || (!input.trim() && !selectedFile)}
            className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-bangla-green hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bangla-green disabled:opacity-50 transition-all font-medium"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                {t.btnLoading}
              </>
            ) : (
              <>
                <Send className="-ml-1 mr-2 h-5 w-5" />
                {t.btnAnalyze}
              </>
            )}
          </button>
        </form>
      </div>

      {result && (
        <div className="mt-8 animate-fade-in">
          <div className={`rounded-xl shadow-md overflow-hidden border-t-4 ${
            result.isHarmful ? 'border-red-500' : 'border-blue-500'
          } bg-white`}>
            
            {/* Header */}
            <div className="p-6 bg-slate-50 border-b border-gray-100">
              <div className="flex items-center gap-3">
                {result.status === 'Likely Misleading' && <ShieldAlert className="text-red-500 h-8 w-8" />}
                {result.status === 'Likely Accurate' && <CheckCircle className="text-green-500 h-8 w-8" />}
                {result.status === 'Unverifiable' && <HelpCircle className="text-orange-500 h-8 w-8" />}
                {result.status === 'Needs Expert Review' && <AlertCircle className="text-yellow-500 h-8 w-8" />}
                
                <div>
                  <h4 className="text-lg font-bold text-gray-900">{result.status}</h4>
                  <p className="text-sm text-gray-500">AI Assessment Guidance</p>
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-6 space-y-6">
              <div>
                <h5 className="font-semibold text-gray-900 mb-2">{t.resultSummary}</h5>
                <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{result.summary}</p>
              </div>

              <div>
                <h5 className="font-semibold text-gray-900 mb-2">{t.resultQuestions}</h5>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  {result.keyQuestions.map((q, i) => (
                    <li key={i}>{q}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <div className="flex items-start">
                  <Shield className="text-bangla-green h-5 w-5 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h5 className="font-semibold text-bangla-green text-sm">{t.resultSafety}</h5>
                    <p className="text-sm text-teal-800 mt-1">{result.safetyTip}</p>
                  </div>
                </div>
              </div>

              <div className="text-xs text-gray-400 text-center pt-2">
                {t.disclaimer}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
      
