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
  ArrowLeft,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  Navigation,
  Plus
} from 'lucide-react';

// --- Custom Icons & Assets ---

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

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

// 1. Map Screen (Image 1 - Core Logic)
const MapScreen = () => (
  <div className="w-full h-full bg-[#e5f0f9] relative overflow-hidden flex flex-col font-sans">
    <StatusBar dark />
    
    {/* CSS Map Background */}
    <div className="absolute inset-0 z-0">
        <div className="w-full h-full opacity-30" style={{
            backgroundImage: 'linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)',
            backgroundSize: '40px 40px'
        }}></div>
        {/* Mock Streets */}
        <div className="absolute top-[30%] left-0 w-full h-6 bg-white rotate-6"></div>
        <div className="absolute top-0 left-[60%] w-6 h-full bg-white -rotate-12"></div>
        <div className="absolute top-[60%] left-0 w-full h-8 bg-white -rotate-3"></div>
        
        {/* Map POIs */}
        <div className="absolute top-[20%] left-[20%] text-slate-400 font-bold text-[10px]">Aquarium of the Bay</div>
        <div className="absolute top-[50%] right-[10%] text-slate-400 font-bold text-[10px]">Lafayette Park</div>
        
        {/* Map Pins - Cats */}
        {/* Pin 1 */}
        <div className="absolute top-[35%] left-[40%] flex flex-col items-center animate-bounce-slow">
            <div className="relative">
                <div className="absolute -top-3 -right-3 bg-slate-900 text-[#bef264] text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-white z-20">100</div>
                <div className="w-16 h-16 rounded-2xl border-4 border-white shadow-lg overflow-hidden relative z-10 bg-orange-100">
                    <img src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80" className="w-full h-full object-cover" />
                </div>
            </div>
            <div className="w-2 h-2 bg-slate-400 rounded-full mt-1"></div>
        </div>

        {/* Pin 2 */}
        <div className="absolute top-[25%] right-[20%] flex flex-col items-center" style={{animationDelay: '1s'}}>
            <div className="relative">
                <div className="absolute -top-3 -right-3 bg-white text-slate-900 text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-slate-100 z-20 shadow-sm">3</div>
                <div className="w-14 h-14 rounded-2xl border-4 border-white shadow-lg overflow-hidden relative z-10 bg-blue-100">
                    <img src="https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80" className="w-full h-full object-cover" />
                </div>
            </div>
            <div className="w-2 h-2 bg-slate-400 rounded-full mt-1"></div>
        </div>

         {/* Pin 3 */}
         <div className="absolute bottom-[30%] left-[20%] flex flex-col items-center" style={{animationDelay: '0.5s'}}>
            <div className="relative">
                <div className="absolute -top-3 -left-2 bg-white text-slate-900 text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-slate-100 z-20 shadow-sm">3</div>
                <div className="w-12 h-12 rounded-2xl border-4 border-white shadow-lg overflow-hidden relative z-10 bg-pink-100">
                    <img src="https://images.unsplash.com/photo-1495360019602-e05980bf543a?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80" className="w-full h-full object-cover" />
                </div>
            </div>
            <div className="w-2 h-2 bg-slate-400 rounded-full mt-1"></div>
        </div>

        {/* Pin 4 */}
        <div className="absolute top-[45%] right-[5%] flex flex-col items-center" style={{animationDelay: '1.5s'}}>
            <div className="relative">
                <div className="absolute -top-3 -left-3 bg-white text-slate-900 text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-slate-100 z-20 shadow-sm">99</div>
                <div className="w-14 h-14 rounded-2xl border-4 border-white shadow-lg overflow-hidden relative z-10 bg-purple-100">
                    <img src="https://images.unsplash.com/photo-1529778873920-4da4926a7071?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80" className="w-full h-full object-cover" />
                </div>
            </div>
             <div className="w-2 h-2 bg-slate-400 rounded-full mt-1"></div>
        </div>
        
        {/* User Location */}
        <div className="absolute bottom-[20%] right-[30%]">
             <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center animate-pulse">
                <div className="w-4 h-4 bg-green-500 border-2 border-white rounded-full shadow-sm"></div>
             </div>
        </div>
    </div>

    {/* Header Controls */}
    <div className="relative z-20 pt-12 px-4 flex justify-between items-start">
        <div className="flex gap-2 items-center">
            <div className="w-12 h-12 rounded-full border-2 border-[#8B5CF6] p-0.5 bg-white">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" className="w-full h-full rounded-full bg-slate-100" />
            </div>
            <div className="bg-slate-800 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                My Meows
            </div>
        </div>
        <div className="relative">
            <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-white shadow-lg">
                <Bell size={20} />
            </div>
            <div className="absolute -top-1 -right-1 bg-[#bef264] text-slate-900 text-[10px] font-bold px-1.5 rounded-full border border-slate-900">14</div>
        </div>
    </div>

    {/* Bottom Controls */}
    <div className="absolute bottom-6 left-0 w-full px-6 flex justify-between items-end z-20">
        <div className="w-14 h-14 bg-slate-800 rounded-full flex items-center justify-center text-[#bef264] border-4 border-slate-700 shadow-xl">
             <Camera size={24} />
        </div>
        
        <div className="relative mb-2">
            <div className="w-24 h-24 bg-[#8B5CF6] rounded-[2rem] flex flex-col items-center justify-center shadow-[0_8px_0_#7c3aed] active:translate-y-1 active:shadow-none transition-all cursor-pointer border-4 border-white transform rotate-3 hover:rotate-0">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mb-1">
                    <Plus size={24} className="text-white" strokeWidth={3} />
                </div>
                <span className="text-white font-black font-display text-lg tracking-wide">MEOW!</span>
                {/* Speech Bubble Tail */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-t-[14px] border-t-[#7c3aed] border-r-[10px] border-r-transparent"></div>
            </div>
        </div>

        <div className="w-14 h-14 bg-slate-800 rounded-full flex items-center justify-center text-[#bef264] border-4 border-slate-700 shadow-xl">
            <div className="text-2xl"><CatFaceIcon /></div>
        </div>
    </div>
  </div>
);

// 2. Chat/Translator Screen (Image 2 style)
const ChatScreen = () => (
  <div className="w-full h-full bg-slate-900 relative overflow-hidden flex flex-col font-sans">
    <StatusBar />
    
    {/* Full Screen Cat Image Background */}
    <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1513245543132-31f507417b26?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60"></div>
    </div>

    {/* Header */}
    <div className="relative z-10 pt-12 px-4 flex items-center gap-2">
        <ArrowLeft className="text-white" />
    </div>

    {/* Chat Area */}
    <div className="relative z-10 flex-1 flex flex-col justify-end px-4 pb-20 gap-4">
        
        {/* Cat Bubble 1 */}
        <div className="flex gap-2 items-end opacity-60">
            <div className="w-8 h-8 rounded-full border border-white overflow-hidden bg-white">
                 <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Kitty" />
            </div>
            <div className="bg-white/20 backdrop-blur-md text-white text-xs px-3 py-2 rounded-2xl rounded-bl-none">
                Who are you?
            </div>
        </div>

        {/* System Message */}
        <div className="self-center bg-white/10 backdrop-blur-md text-white/80 text-[10px] px-3 py-1 rounded-full my-2">
            Interval &ge; 5s will create a new session
        </div>

        {/* Cat Bubble 2 */}
        <div className="flex gap-2 items-end">
             <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-[#bef264] flex items-center justify-center">
                 <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Kitty" className="scale-110" />
            </div>
            <div className="bg-white text-slate-900 text-sm font-bold px-4 py-3 rounded-2xl rounded-bl-none shadow-lg max-w-[200px]">
                Where's my mom? I want my mom! 😿
            </div>
             <div className="w-6 h-6 bg-[#8B5CF6] rounded-full flex items-center justify-center shadow-md">
                <Music size={12} className="text-white" />
            </div>
        </div>
        
        {/* Audio Visualizer */}
        <div className="mt-2 bg-black/60 backdrop-blur-xl rounded-2xl p-3 flex items-center gap-3 border border-white/10">
             <div className="w-10 h-10 rounded-full bg-slate-800 overflow-hidden border border-white/20">
                 <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Kitty" />
             </div>
             <div className="flex-1 flex items-center gap-0.5 h-8 justify-center">
                 {[...Array(20)].map((_, i) => (
                     <div key={i} className="w-1 bg-[#bef264] rounded-full animate-pulse" style={{
                         height: `${Math.random() * 100}%`,
                         animationDelay: `${i * 0.05}s`
                     }}></div>
                 ))}
             </div>
             <div className="text-[10px] font-bold text-white bg-slate-700 px-2 py-1 rounded-lg">
                 Deep Mewting...
             </div>
        </div>

        {/* Translation Label */}
        <div className="flex justify-between items-center mt-2">
            <div className="flex gap-2 items-center bg-[#8B5CF6]/20 backdrop-blur-md px-3 py-1 rounded-lg border border-[#8B5CF6]/50">
                <Zap size={12} className="text-[#8B5CF6]" fill="#8B5CF6"/>
                <span className="text-xs font-bold text-[#8B5CF6]">Deep Mewt</span>
            </div>
            <div className="w-8 h-8 bg-[#8B5CF6] rounded-full flex items-center justify-center text-white">
                <Camera size={14} />
            </div>
        </div>

        {/* Bottom Icons */}
         <div className="bg-white rounded-2xl p-2 flex justify-between items-center shadow-lg">
           {[<CatFaceIcon />, <MouseIcon />, <SleepIcon />, <YarnIcon />, <DogIcon />, <FoodIcon />].map((icon, i) => (
             <div key={i} className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
                {icon}
             </div>
           ))}
           <div className="px-3 py-1 bg-[#8B5CF6] text-white text-xs font-bold rounded-lg">More</div>
        </div>

    </div>
  </div>
);


// --- Webpage Sections ---

const RescueSection = () => {
    return (
        <section className="py-20 bg-slate-50 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    
                    {/* Membership Card Visual */}
                    <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-[#bef264] to-[#8B5CF6] rounded-[2rem] opacity-30 blur-2xl"></div>
                        <div className="bg-gradient-to-br from-[#bef264] to-[#a3e635] rounded-[2rem] p-8 shadow-2xl relative overflow-hidden border-4 border-white/50 aspect-[1.6/1] flex flex-col justify-between transform hover:scale-[1.02] transition-transform duration-500">
                             {/* Decorative Elements */}
                             <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/20 rounded-full blur-2xl"></div>
                             <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-[#8B5CF6]/20 rounded-full blur-2xl"></div>
                             
                             <div className="relative z-10 flex justify-between items-start">
                                 <div className="bg-white/90 backdrop-blur-sm p-3 rounded-2xl shadow-sm inline-flex items-center gap-2">
                                     <Heart className="text-red-500 fill-red-500" size={20} />
                                     <span className="font-display font-bold text-slate-900">Rescue Member</span>
                                 </div>
                                 <div className="text-slate-900 font-black text-4xl opacity-20">#0421</div>
                             </div>
                             
                             <div className="relative z-10">
                                 <h3 className="text-slate-900 font-display font-black text-3xl mb-2">Stray Cat Guardian</h3>
                                 <p className="text-slate-800 font-medium mb-6 max-w-xs">Help track, feed, and rescue neighborhood cats. Every scan contributes to the community database.</p>
                                 
                                 <div className="flex items-center justify-between bg-white rounded-xl p-2 pl-4 shadow-lg">
                                     <div className="flex flex-col">
                                         <span className="text-[10px] font-bold text-slate-400 uppercase">Donation Points</span>
                                         <span className="text-2xl font-black text-slate-900">1,250</span>
                                     </div>
                                     <button className="bg-[#8B5CF6] text-white w-12 h-12 rounded-lg flex items-center justify-center shadow-md hover:bg-[#7c3aed] transition-colors">
                                         <Plus size={24} strokeWidth={3} />
                                     </button>
                                 </div>
                             </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div>
                        <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-green-100 border border-green-200 text-green-700 font-bold text-sm">
                            ❤️ Community Rescue
                        </div>
                        <h2 className="font-display font-bold text-4xl lg:text-5xl text-slate-900 mb-6">
                            Every <span className="text-[#8B5CF6]">Meow</span> Counts.
                        </h2>
                        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                            Join our rescue program. Use Mewt to identify stray cats, log their locations for rescue organizations, and contribute to their well-being.
                        </p>
                        
                        {/* Rescue Stories Feed */}
                        <div className="space-y-4">
                            <h4 className="font-bold text-slate-900 flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                                Latest Rescue Stories
                            </h4>
                            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex gap-4 hover:shadow-md transition-shadow cursor-pointer">
                                <div className="w-20 h-20 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0">
                                    <img src="https://images.unsplash.com/photo-1511044568932-338cba0fb803?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="font-bold text-slate-900">Found "Ginger"</span>
                                        <span className="text-xs text-slate-400">2h ago</span>
                                    </div>
                                    <p className="text-sm text-slate-600 line-clamp-2">Thanks to the Mewt community map, we located Ginger near the park entrance and reunited him with his owner!</p>
                                </div>
                            </div>
                             <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex gap-4 hover:shadow-md transition-shadow cursor-pointer">
                                <div className="w-20 h-20 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0">
                                    <img src="https://images.unsplash.com/photo-1519052537078-e6302a4968d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="font-bold text-slate-900">New Shelter Partner</span>
                                        <span className="text-xs text-slate-400">1d ago</span>
                                    </div>
                                    <p className="text-sm text-slate-600 line-clamp-2">We have officially partnered with the SF SPCA to share data on stray cat colonies.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};


// --- Main Page ---

const LandingPage = () => {
  const [activeScreen, setActiveScreen] = useState(0);
  const screens = [
    { component: <MapScreen />, title: "Explore the Map", description: "Discover neighborhood cats and build your collection." },
    { component: <ChatScreen />, title: "Talk to Cats", description: "Translate meows into human speech instantly." },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveScreen((prev) => (prev + 1) % screens.length);
    }, 5000); // Slower rotation
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
            <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
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
            <div className="flex-1 relative w-full max-w-[400px] lg:max-w-none flex justify-center order-1 lg:order-2">
               {/* Decorative rings */}
               <div className="absolute inset-0 bg-gradient-to-tr from-[#8B5CF6] to-[#bef264] rounded-full blur-3xl opacity-20 scale-90"></div>
               
               <div className="relative z-10 transition-all duration-500 ease-in-out transform hover:scale-[1.02] cursor-pointer" onClick={() => setActiveScreen((prev) => (prev + 1) % screens.length)}>
                 <MockPhone>
                    {screens[activeScreen].component}
                 </MockPhone>
                 
                 {/* Feature Caption Floating */}
                 <div className="absolute top-1/2 -left-8 -translate-y-1/2 lg:-left-12 lg:top-auto lg:bottom-20 bg-white p-4 rounded-2xl shadow-xl border-l-4 border-[#bef264] max-w-[200px] animate-bounce-slow hidden sm:block">
                    <div className="flex items-center gap-2 mb-1">
                       <div className="w-2 h-2 rounded-full bg-[#bef264]"></div>
                       <span className="font-bold text-xs text-[#8B5CF6] uppercase tracking-wider">Now Playing</span>
                    </div>
                    <p className="font-display font-bold text-slate-900">{screens[activeScreen].title}</p>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rescue Section (New) */}
      <RescueSection />

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
               <a href="#" className="hover:text-white transition-colors">Privacy</a>
               <a href="#" className="hover:text-white transition-colors">Terms</a>
               <a href="#" className="hover:text-white transition-colors">Support</a>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#8B5CF6] hover:text-white transition-colors">
                    <Instagram size={20} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#8B5CF6] hover:text-white transition-colors">
                    <Twitter size={20} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#8B5CF6] hover:text-white transition-colors">
                    <TikTokIcon />
                </a>
            </div>
            
            <div className="text-xs opacity-60">
               © 2024 Mewt Inc.
            </div>
         </div>
      </footer>
    </div>
  );
};

const root = createRoot(document.getElementById('root'));
root.render(<LandingPage />);