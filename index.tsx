import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  MapPin, 
  Camera, 
  Mic, 
  Download, 
  ChevronDown, 
  Heart, 
  MessageCircle,
  User, 
  Bell,
  Search,
  Star, 
  Menu,
  X,
  Check,
  Zap,
  Music,
  Settings,
  ArrowLeft
} from 'lucide-react';

// --- Custom Icons & Assets ---

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const GooglePlayIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3.609 1.814L13.792 12 3.61 22.186c-.185.185-.366.054-.366-.192V2.006c0-.246.181-.377.365-.192zm10.926 10.95l5.98 5.98c.406.406.252 1.154-.355.98l-5.625-2.46-4.5-4.5 4.5-4.5 5.625-2.46c.607-.174.761.574.355.98l-5.98 5.98z"/>
  </svg>
);

const AppleIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 384 512" fill="currentColor">
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 46.9 89.2 80 88.8 25.5-.3 34.7-17.5 69.4-17.5 34.2 0 42.6 17.5 71 17.1 31.7-.3 67.4-58.3 80-88.9-56.6-21.2-60.5-79.8-60.1-85.5zM275 111c17.8-31.2 13.3-66.3 11.7-73.5-26.8 2-58.4 16.6-76.7 41.1-15.2 21.8-16.4 54.2-9.1 71.5 33.2 6.4 56.9-18.4 74.1-39.1z"/>
  </svg>
);

// Specific Icons from screenshots
const MouseIcon = () => <span className="text-2xl grayscale opacity-80">🐁</span>;
const CatFaceIcon = () => <span className="text-2xl">🐱</span>;
const YarnIcon = () => <span className="text-2xl grayscale opacity-80">🧶</span>;
const FoodIcon = () => <span className="text-2xl grayscale opacity-80">🍽️</span>;
const DogIcon = () => <span className="text-2xl grayscale opacity-80">🐕</span>;
const SleepIcon = () => <span className="text-2xl grayscale opacity-80">😴</span>;
const LoveIcon = () => <span className="text-2xl">🥰</span>;
const HappyIcon = () => <span className="text-2xl">😋</span>;
const WaveIcon = () => <span className="text-2xl grayscale opacity-80">👋</span>;
const CryIcon = () => <span className="text-2xl grayscale opacity-80">😫</span>;

// --- Components ---

const DownloadButtons = ({ light = false }: { light?: boolean }) => {
  const [isAndroidOpen, setIsAndroidOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsAndroidOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const btnClass = light 
    ? "bg-white text-slate-900 hover:bg-slate-50 border-b-4 border-slate-200 active:border-b-0 active:translate-y-1 shadow-xl"
    : "bg-slate-900 text-white hover:bg-slate-800 border-b-4 border-black active:border-b-0 active:translate-y-1 shadow-xl";

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center z-50">
      {/* Apple Button */}
      <button className={`${btnClass} px-6 py-3 rounded-2xl flex items-center gap-3 transition-all min-w-[200px]`}>
        <AppleIcon />
        <div className="text-left">
          <div className="text-[10px] font-bold uppercase opacity-60">Download on the</div>
          <div className="text-lg font-bold leading-none font-display">App Store</div>
        </div>
      </button>

      {/* Android Split Button */}
      <div className="relative" ref={dropdownRef}>
        <div className={`flex rounded-2xl transition-all ${btnClass} border-b-4`}>
          <button 
            className="px-6 py-3 flex items-center gap-3 rounded-l-2xl border-r border-white/10 min-w-[160px]"
            onClick={() => console.log("Google Play Clicked")}
          >
            <GooglePlayIcon />
            <div className="text-left">
              <div className="text-[10px] font-bold uppercase opacity-60">Get it on</div>
              <div className="text-lg font-bold leading-none font-display">Google Play</div>
            </div>
          </button>
          <button 
            className="px-4 rounded-r-2xl flex items-center justify-center hover:bg-white/10"
            onClick={() => setIsAndroidOpen(!isAndroidOpen)}
          >
            <ChevronDown size={20} className={`transition-transform ${isAndroidOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Dropdown */}
        {isAndroidOpen && (
          <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200 z-50">
            <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 text-slate-700 transition-colors group">
              <div className="w-8 h-8 bg-green-100 text-green-600 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <Download size={16} />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-slate-900">Download APK</div>
                <div className="text-[10px] text-slate-500">Direct Download (v2.4.0)</div>
              </div>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

const MockPhone = ({ children, className = "" }: { children?: React.ReactNode, className?: string }) => {
  return (
    <div className={`relative mx-auto border-slate-900 bg-slate-900 border-[12px] rounded-[3rem] h-[640px] w-[320px] shadow-2xl flex flex-col shrink-0 ${className}`}>
      <div className="w-[100px] h-[24px] bg-slate-900 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute z-20 pointer-events-none"></div>
      <div className="h-[32px] w-[4px] bg-slate-800 absolute -left-[16px] top-[80px] rounded-l-lg"></div>
      <div className="h-[46px] w-[4px] bg-slate-800 absolute -left-[16px] top-[130px] rounded-l-lg"></div>
      <div className="h-[46px] w-[4px] bg-slate-800 absolute -left-[16px] top-[190px] rounded-l-lg"></div>
      <div className="h-[64px] w-[4px] bg-slate-800 absolute -right-[16px] top-[150px] rounded-r-lg"></div>
      <div className="rounded-[2.2rem] overflow-hidden w-full h-full bg-white relative flex flex-col">
        {children}
      </div>
    </div>
  );
};

const StatusBar = ({ dark = false }) => (
  <div className={`h-12 w-full flex justify-between px-6 items-center text-xs font-bold z-30 pt-2 absolute top-0 left-0 right-0 ${dark ? 'text-slate-900' : 'text-white'}`}>
    <span>9:41</span>
    <div className="flex gap-1.5 items-center">
      <div className={`w-4 h-4 flex items-end gap-0.5`}>
        <div className={`w-1 h-1.5 rounded-[1px] ${dark ? 'bg-slate-900' : 'bg-white'}`}></div>
        <div className={`w-1 h-2.5 rounded-[1px] ${dark ? 'bg-slate-900' : 'bg-white'}`}></div>
        <div className={`w-1 h-3.5 rounded-[1px] ${dark ? 'bg-slate-900' : 'bg-white'}`}></div>
      </div>
      <div className={`w-5 h-3 border-2 rounded-[4px] relative ${dark ? 'border-slate-900' : 'border-white'}`}>
         <div className={`absolute inset-0.5 ${dark ? 'bg-slate-900' : 'bg-white'}`}></div>
      </div>
    </div>
  </div>
);

// --- Mock Screens ---

// 1. Login Screen (Image 1 style)
const LoginScreen = () => (
  <div className="w-full h-full bg-[#8B5CF6] relative overflow-hidden flex flex-col font-sans">
    <StatusBar />
    
    {/* Background Pattern */}
    <div className="absolute inset-0 opacity-20">
       <svg width="100%" height="100%">
         <pattern id="cat-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
           <path d="M20 40 Q30 20 40 40 L50 50 Q40 70 30 70 Q20 70 10 50 Z" fill="white" transform="rotate(-15 30 55)"/>
           <path d="M10 10 L20 30 L0 30 Z" fill="white" opacity="0.5"/> 
           <path d="M60 10 L65 25 L55 25 Z" fill="white" opacity="0.7" transform="rotate(45 60 20)"/>
         </pattern>
         <rect x="0" y="0" width="100%" height="100%" fill="url(#cat-pattern)" />
       </svg>
       {/* Gradient overlay */}
       <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#8B5CF6]/50 to-[#8B5CF6]"></div>
    </div>

    {/* Central Avatar */}
    <div className="flex-1 flex flex-col items-center justify-center z-10 -mt-10">
      <div className="w-32 h-32 bg-white rounded-full p-1 mb-12 shadow-[0_0_60px_rgba(139,92,246,0.6)] relative ring-4 ring-white/20">
        <div className="w-full h-full rounded-full bg-slate-100 overflow-hidden relative border-4 border-white">
           <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Misty&backgroundColor=b6e3f4" className="w-full h-full object-cover scale-110" />
           {/* Hat simulation */}
           <div className="absolute -top-2 -right-2 transform rotate-12 z-20 drop-shadow-lg">
              <div className="text-5xl">🎩</div>
           </div>
        </div>
      </div>
      
      {/* Google Login Button */}
      <button className="w-[80%] bg-white rounded-2xl py-4 px-4 flex items-center justify-center gap-3 shadow-[0_4px_0_#e2e8f0] hover:translate-y-1 hover:shadow-none transition-all border-b-4 border-[#bef264] group">
        <div className="group-hover:scale-110 transition-transform"><GoogleIcon /></div>
        <span className="text-[#8B5CF6] font-bold text-lg font-display">Login with Google</span>
      </button>
    </div>

    {/* Bottom Icon Bar */}
    <div className="bg-white/90 backdrop-blur-xl p-4 rounded-t-[2.5rem] flex gap-4 overflow-x-auto hide-scrollbar pb-8 absolute bottom-0 w-full z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
       {[
         { icon: <CatFaceIcon />, bg: 'bg-orange-100' },
         { icon: <MouseIcon />, bg: 'bg-slate-100' },
         { icon: <SleepIcon />, bg: 'bg-yellow-100' },
         { icon: <YarnIcon />, bg: 'bg-pink-100' },
         { icon: <DogIcon />, bg: 'bg-orange-100' },
         { icon: <FoodIcon />, bg: 'bg-slate-100' },
       ].map((item, i) => (
         <div key={i} className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm border-2 border-white`}>
            {item.icon}
         </div>
       ))}
       <div className="w-auto px-6 h-14 bg-[#8B5CF6] rounded-2xl flex items-center justify-center text-white font-bold text-sm shadow-sm flex-shrink-0 font-display border-b-4 border-[#7c3aed]">
         More
       </div>
    </div>
  </div>
);

// 2. Meaning/Icon Grid Screen (Image 2 style)
const MeaningScreen = () => (
  <div className="w-full h-full bg-slate-50 relative overflow-hidden flex flex-col font-sans">
    <StatusBar dark />
    
    {/* Header Search */}
    <div className="pt-14 px-4 pb-4 flex items-center gap-3 z-10 bg-slate-50 sticky top-0">
       <div className="flex-1 bg-white h-12 rounded-2xl shadow-sm flex items-center px-4 gap-2 border-b-4 border-slate-100">
         <Search className="text-slate-400" size={20} />
         <span className="text-slate-400 text-sm font-medium">Search actions...</span>
       </div>
       <button className="h-12 px-5 bg-[#8B5CF6] text-white font-bold rounded-2xl shadow-[0_4px_0_#7c3aed] active:shadow-none active:translate-y-1 transition-all font-display">
         Back
       </button>
    </div>

    <div className="flex-1 overflow-y-auto px-4 pb-8">
      {/* Section: Recents */}
      <div className="mb-6">
        <h3 className="font-bold text-slate-900 mb-3 px-1 font-display">Recents</h3>
        <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
           {[<CatFaceIcon />, <MouseIcon />, <SleepIcon />, <YarnIcon />, <DogIcon />, <FoodIcon />].map((icon, i) => (
             <div key={i} className="w-14 h-14 bg-white rounded-2xl shadow-sm border-b-4 border-slate-100 flex items-center justify-center flex-shrink-0 hover:bg-slate-50 transition-colors cursor-pointer">
                {icon}
             </div>
           ))}
        </div>
      </div>

      {/* Section: Friendly */}
      <div className="mb-6">
        <h3 className="font-bold text-slate-900 mb-3 px-1 font-display">Friendly</h3>
        <div className="grid grid-cols-4 gap-3">
           {[
             { icon: <CatFaceIcon />, label: "Friendly Call" },
             { icon: <SleepIcon />, label: "Comfortable" },
             { icon: <LoveIcon />, label: "Affectionate" },
             { icon: <HappyIcon />, label: "Satisfied" },
             { icon: <HappyIcon />, label: "Delicious" },
           ].map((item, i) => (
             <div key={i} className="aspect-square bg-white rounded-2xl shadow-sm border-b-4 border-slate-100 flex flex-col items-center justify-center p-1 gap-1 hover:-translate-y-1 transition-transform cursor-pointer">
                <div className="scale-125">{item.icon}</div>
                <span className="text-[8px] font-bold text-slate-500 text-center leading-tight">{item.label}</span>
             </div>
           ))}
        </div>
      </div>

      {/* Section: Attention */}
      <div className="mb-6">
        <h3 className="font-bold text-slate-900 mb-3 px-1 font-display">Attention</h3>
        <div className="grid grid-cols-4 gap-3">
           {[
             { icon: <WaveIcon />, label: "Greeting" },
             { icon: <FoodIcon />, label: "Food Request" },
             { icon: <YarnIcon />, label: "Play Invitaion" },
             { icon: <MouseIcon />, label: "Hunt Invitaion" },
             { icon: <CryIcon />, label: "Distressed" },
             { icon: <DogIcon />, label: "Finding Mom" },
           ].map((item, i) => (
             <div key={i} className="aspect-square bg-white rounded-2xl shadow-sm border-b-4 border-slate-100 flex flex-col items-center justify-center p-1 gap-1 hover:-translate-y-1 transition-transform cursor-pointer">
                <div className="scale-125">{item.icon}</div>
                <span className="text-[8px] font-bold text-slate-500 text-center leading-tight">{item.label}</span>
             </div>
           ))}
        </div>
      </div>
    </div>
  </div>
);

// 3. Profile Screen with Updated MeowPoints (Image 3 style)
const ProfileScreen = () => (
  <div className="w-full h-full bg-slate-50 relative overflow-hidden flex flex-col font-sans">
    <StatusBar dark />
    <div className="h-14 flex justify-between items-center px-4 pt-4 mt-2">
      <ArrowLeft className="text-slate-800 cursor-pointer hover:opacity-70" />
      <span className="font-display font-bold text-lg text-slate-800">Profile</span>
      <Settings className="text-slate-800 cursor-pointer hover:opacity-70" />
    </div>

    <div className="px-6 pt-6 pb-4 flex items-center gap-4">
      <div className="relative">
        <div className="w-20 h-20 rounded-full border-4 border-white shadow-md overflow-hidden bg-purple-100">
           <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Kitty&backgroundColor=c0aede" className="w-full h-full" />
        </div>
        {/* Edit Pencil */}
        <div className="absolute top-0 right-0 text-[#8B5CF6] cursor-pointer hover:scale-110 transition-transform">
           <div className="bg-white rounded-full p-1 shadow-sm border border-slate-100">
             <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
           </div>
        </div>
      </div>
      <div>
        <div className="flex items-center gap-2">
          <h2 className="font-bold text-2xl text-slate-900 font-display">yonghuming</h2>
        </div>
      </div>
    </div>

    {/* Meow Points Banner (Image 3 Style) */}
    <div className="px-4 mt-2">
      <div className="bg-[#bef264] h-20 rounded-[1.5rem] flex justify-between items-center px-4 relative shadow-[0_4px_0_#a3e635] hover:shadow-[0_2px_0_#a3e635] hover:translate-y-[2px] transition-all">
         <div className="flex items-center gap-3 z-10">
            <div className="w-10 h-10 bg-transparent rounded-xl flex items-center justify-center relative">
               {/* Logo simulation */}
               <Zap className="text-[#8B5CF6] fill-[#8B5CF6] absolute top-0 left-0" size={24} />
               <div className="absolute top-2 left-3 text-[#8B5CF6] opacity-50 scale-75">
                 <CatFaceIcon />
               </div>
            </div>
            <span className="font-bold text-slate-900 text-sm font-display">MeowPoints</span>
         </div>
         
         {/* Counter Pill + Button */}
         <div className="flex items-center bg-white pl-4 pr-1 py-1 rounded-full h-12 shadow-sm gap-3">
            <span className="font-display font-black text-2xl text-slate-900">100</span>
            <div className="w-10 h-10 bg-[#A855F7] rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-[0_2px_0_#7c3aed] active:translate-y-0.5 active:shadow-none transition-all cursor-pointer hover:bg-[#9333ea]">
              +
            </div>
         </div>
      </div>
    </div>

    {/* Shop Cards */}
    <div className="px-4 mt-6 grid grid-cols-2 gap-3">
      <div className="bg-white rounded-2xl p-4 border-2 border-[#8B5CF6] shadow-[0_4px_0_#8B5CF6] flex flex-col items-center active:translate-y-1 active:shadow-none transition-all cursor-pointer group">
        <span className="font-bold text-sm mb-1 text-slate-500 group-hover:text-slate-900">Weekly</span>
        <span className="font-display font-bold text-xl text-slate-900 mb-2">$7.99</span>
        <div className="w-full bg-[#8B5CF6] text-white text-center text-xs font-bold py-2 rounded-lg uppercase group-hover:bg-[#7c3aed]">Buy</div>
      </div>
      <div className="bg-white rounded-2xl p-4 border-2 border-[#8B5CF6] shadow-[0_4px_0_#8B5CF6] flex flex-col items-center relative overflow-hidden active:translate-y-1 active:shadow-none transition-all cursor-pointer group">
        <span className="font-bold text-sm mb-1 text-slate-500 group-hover:text-slate-900">Monthly</span>
        <div className="flex items-center gap-2 mb-2">
           <span className="text-xs text-slate-400 line-through">$29.99</span>
           <span className="font-display font-bold text-lg bg-[#bef264] px-1 rounded text-slate-900">$19.99</span>
        </div>
        <div className="w-full bg-[#8B5CF6] text-white text-center text-xs font-bold py-2 rounded-lg uppercase group-hover:bg-[#7c3aed]">Buy</div>
      </div>
    </div>

    {/* Tasks List */}
    <div className="mt-6 flex-1 bg-white mx-4 rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.05)] overflow-hidden border-t-4 border-[#8B5CF6] border-x-2 border-slate-100 relative">
       <div className="bg-[#8B5CF6] p-3 flex justify-between items-center">
         <div className="bg-black text-[#bef264] font-display font-bold text-lg px-3 py-1 transform -rotate-2 border-2 border-white shadow-lg relative z-10">
            MEOW!
         </div>
         <div className="flex gap-8 text-xs font-bold text-white/90 pr-4">
            <span className="text-white border-b-2 border-white">FREE</span>
            <span className="opacity-60 cursor-pointer hover:opacity-100">UPGRADE</span>
         </div>
       </div>
       <div className="divide-y divide-slate-50 overflow-y-auto max-h-[150px]">
          {["good good words", "good good words", "good good words", "good good words"].map((text, i) => (
            <div key={i} className="p-4 flex justify-between items-center hover:bg-slate-50 transition-colors">
               <span className="text-sm font-bold text-slate-600">{text}</span>
               <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <Check size={14} strokeWidth={3} />
               </div>
            </div>
          ))}
       </div>
    </div>
  </div>
);

// --- Main Page ---

const LandingPage = () => {
  const [activeScreen, setActiveScreen] = useState(0);
  const screens = [
    { component: <LoginScreen />, title: "Start Collecting", description: "Join the world's biggest cat collection game." },
    { component: <MeaningScreen />, title: "Understand Them", description: "AI-powered translator to know what they want." },
    { component: <ProfileScreen />, title: "Track & Level Up", description: "Earn MeowPoints and see your kitty history." },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveScreen((prev) => (prev + 1) % screens.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-lg border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#8B5CF6] rounded-lg flex items-center justify-center text-white">
                <CatFaceIcon />
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-slate-900">Mewt</span>
            </div>
            <div className="hidden md:flex gap-8 items-center">
              <button className="bg-slate-900 text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors">
                Get App
              </button>
            </div>
            <div className="md:hidden">
              <Menu size={24} />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 overflow-hidden">
        {/* Background Blobs */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-[#8B5CF6] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] bg-[#bef264] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            
            {/* Hero Text */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-[#8B5CF6] font-bold text-sm">
                ✨ The Pokémon GO for Real Cats
              </div>
              <h1 className="text-5xl lg:text-7xl font-display font-bold leading-tight mb-6 text-slate-900">
                Collect Cats.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#d946ef]">Speak Meow.</span>
              </h1>
              <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Spot neighborhood cats, snap photos to build your collection, and use our AI translator to understand what they're saying.
              </p>
              <div className="flex justify-center lg:justify-start">
                <DownloadButtons />
              </div>
              
              <div className="mt-10 flex items-center justify-center lg:justify-start gap-4 text-sm text-slate-500 font-medium">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                       <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i*123}`} className="w-full h-full" />
                    </div>
                  ))}
                </div>
                <div>
                  <span className="font-bold text-slate-900">10k+</span> Cat Collectors
                </div>
              </div>
            </div>

            {/* Hero Visual / Mockup Rotator */}
            <div className="flex-1 relative w-full max-w-[400px] lg:max-w-none flex justify-center">
               {/* Decorative rings */}
               <div className="absolute inset-0 bg-gradient-to-tr from-[#8B5CF6] to-[#bef264] rounded-full blur-3xl opacity-20 scale-90"></div>
               
               <div className="relative z-10 transition-all duration-500 ease-in-out transform">
                 <MockPhone>
                    {screens[activeScreen].component}
                 </MockPhone>
                 
                 {/* Feature Caption Floating */}
                 <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border-l-4 border-[#8B5CF6] max-w-[200px] animate-bounce-slow hidden sm:block">
                    <div className="flex items-center gap-2 mb-1">
                       <div className="w-2 h-2 rounded-full bg-[#bef264]"></div>
                       <span className="font-bold text-xs text-[#8B5CF6] uppercase tracking-wider">Live Demo</span>
                    </div>
                    <p className="font-display font-bold text-slate-900">{screens[activeScreen].title}</p>
                 </div>
               </div>

               {/* Screen Selector Dots */}
               <div className="absolute -right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 hidden xl:flex">
                  {screens.map((_, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setActiveScreen(idx)}
                      className={`w-3 h-3 rounded-full transition-all ${idx === activeScreen ? 'bg-[#8B5CF6] scale-125' : 'bg-slate-300 hover:bg-slate-400'}`}
                    />
                  ))}
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-display font-bold text-4xl text-slate-900 mb-4">Everything you need to be a <span className="text-[#8B5CF6]">Cat Master</span></h2>
            <p className="text-lg text-slate-600">Not just a map. It's a complete social network for feline enthusiasts.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-slate-50 rounded-3xl p-8 hover:bg-[#f5f3ff] transition-colors group border border-slate-100 hover:border-[#8B5CF6]/20">
              <div className="w-14 h-14 bg-[#8B5CF6] rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-purple-200">
                <MapPin size={28} />
              </div>
              <h3 className="font-display font-bold text-xl mb-3">Community Cat Map</h3>
              <p className="text-slate-600 leading-relaxed">
                Discover cats in your neighborhood. See where they hang out, their territories, and their favorite spots.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-slate-50 rounded-3xl p-8 hover:bg-[#f5f3ff] transition-colors group border border-slate-100 hover:border-[#8B5CF6]/20">
              <div className="w-14 h-14 bg-[#bef264] rounded-2xl flex items-center justify-center text-slate-900 mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-lime-200">
                <User size={28} />
              </div>
              <h3 className="font-display font-bold text-xl mb-3">Cat Recognition AI</h3>
              <p className="text-slate-600 leading-relaxed">
                Just snap a photo. Our AI identifies if it's a new cat or one already in the database. Track their history!
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-slate-50 rounded-3xl p-8 hover:bg-[#f5f3ff] transition-colors group border border-slate-100 hover:border-[#8B5CF6]/20">
              <div className="w-14 h-14 bg-pink-400 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-pink-200">
                <Mic size={28} />
              </div>
              <h3 className="font-display font-bold text-xl mb-3">Meow Translator</h3>
              <p className="text-slate-600 leading-relaxed">
                Hold the record button. We translate "Meow" into "Feed me", "Pet me", or "Leave me alone".
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section id="download" className="py-20 bg-[#8B5CF6] relative overflow-hidden">
         <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
               <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
            </svg>
         </div>
         
         <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <h2 className="font-display font-bold text-4xl lg:text-5xl text-white mb-6">Ready to start your collection?</h2>
            <p className="text-purple-100 text-xl mb-10">Join thousands of users mapping the feline world today.</p>
            <div className="flex justify-center">
               <DownloadButtons light />
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
         <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#bef264] rounded-lg flex items-center justify-center text-slate-900">
                <CatFaceIcon />
              </div>
              <span className="font-display font-bold text-xl text-white">Mewt</span>
            </div>
            <div className="flex gap-6 text-sm font-medium">
               <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
               <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
               <a href="#" className="hover:text-white transition-colors">Support</a>
            </div>
            <div className="text-xs opacity-60">
               © 2024 Mewt Inc. All rights reserved.
            </div>
         </div>
      </footer>
    </div>
  );
};

const root = createRoot(document.getElementById('root'));
root.render(<LandingPage />);