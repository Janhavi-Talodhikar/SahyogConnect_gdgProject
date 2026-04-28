import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Trophy, Clock, Target, Star, Medal, Download, CheckCircle } from 'lucide-react';
import { allTasks as initialTasks } from '../services/taskServices';

export default function VolunteerDashboard() {
  const location = useLocation();
  const userInterests = location.state?.userInterests || [];
  
  const [tasks, setTasks] = useState([]);
  const [xp, setXp] = useState(750);
  const [hours, setHours] = useState(24);

  // 1. SMART SORTING & MATCHING LOGIC
  useEffect(() => {
    const syncAndSort = () => {
      const announcements = JSON.parse(localStorage.getItem('ngo_announcements') || "[]");
      const combined = [...announcements, ...initialTasks];

      const processed = combined.map(task => {
        const isMatch = userInterests.includes(task.cat);
        // Calculate a fake but realistic match percentage
        const matchPercent = isMatch 
          ? Math.floor(Math.random() * (99 - 90 + 1) + 90) 
          : Math.floor(Math.random() * (85 - 70 + 1) + 70);
        
        return { ...task, isMatch, matchPercent };
      });

      // Sort: Matches first, then by percentage
      const sorted = processed.sort((a, b) => b.matchPercent - a.matchPercent);
      setTasks(sorted);
    };

    window.addEventListener('storage', syncAndSort);
    syncAndSort();
    return () => window.removeEventListener('storage', syncAndSort);
  }, [userInterests]);

  const handleAccept = (title) => {
    setXp(p => Math.min(p + 50, 1000));
    setHours(p => p + 2);
    
    const activity = { id: Date.now(), taskName: title, volunteerName: "John Doe", time: new Date().toLocaleTimeString() };
    const existing = JSON.parse(localStorage.getItem('ngo_activity') || "[]");
    localStorage.setItem('ngo_activity', JSON.stringify([activity, ...existing]));
    window.dispatchEvent(new Event('storage'));
    
    alert(`Success! NGO notified for ${title}`);
  };

  const handleDownloadCertificate = () => {
    if (xp < 1000) {
      alert(`Reach 1000 XP to unlock your official SahyogConnect Certificate! (Current: ${xp})`);
      return;
    }
    alert("Generating your Volunteer Excellence Certificate... PDF Download Started!");
    // In a real app, you'd use a library like jspdf here.
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 grid lg:grid-cols-12 gap-8 font-sans">
      
      {/* Sidebar: Profile & Achievements */}
      <aside className="lg:col-span-4 space-y-6">
        <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 text-center">
          <div className="w-24 h-24 bg-indigo-100 rounded-full mx-auto mb-4 overflow-hidden border-4 border-white shadow-md">
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${xp}`} alt="avatar" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">John Doe</h2>
          <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mt-1">
            {xp >= 1000 ? "Verified Elite Volunteer" : "Silver Tier Volunteer"}
          </p>
          
          <div className="mt-8 text-left">
            <div className="flex justify-between text-[10px] font-black uppercase text-slate-400 mb-2">
              <span>Level 4 Progress</span>
              <span className={xp >= 1000 ? "text-emerald-500" : "text-indigo-600"}>{xp}/1000 XP</span>
            </div>
            <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-1000 ${xp >= 1000 ? "bg-emerald-500" : "bg-indigo-600"}`} 
                style={{ width: `${(xp/1000)*100}%` }}
              ></div>
            </div>
          </div>

          {/* Certificate Button */}
          <button 
            onClick={handleDownloadCertificate}
            className={`w-full mt-8 py-4 rounded-2xl font-black text-xs flex items-center justify-center gap-2 transition-all shadow-lg 
              ${xp >= 1000 
                ? "bg-emerald-600 text-white shadow-emerald-100 hover:bg-emerald-700" 
                : "bg-slate-100 text-slate-400 cursor-not-allowed"}`}
          >
            <Download size={16} /> 
            {xp >= 1000 ? "Download Certificate" : "Unlock Certificate at 1000 XP"}
          </button>
          
          <div className="grid grid-cols-2 gap-3 mt-6">
            <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100">
              <Clock size={18} className="mx-auto mb-1 text-indigo-600" />
              <p className="text-lg font-black text-slate-900">{hours}h</p>
              <p className="text-[8px] font-bold text-slate-400 uppercase">Tracked</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100">
              <Trophy size={18} className="mx-auto mb-1 text-amber-500" />
              <p className="text-lg font-black text-slate-900">12</p>
              <p className="text-[8px] font-bold text-slate-400 uppercase">Badges</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 p-8 rounded-[40px] text-white">
          <h3 className="text-xs font-black uppercase tracking-widest mb-6 flex items-center gap-2">
            <Medal size={16} className="text-indigo-400" /> Achievements
          </h3>
          <div className="space-y-3">
            {['Social Impact Hero', 'Nature Guardian', 'Community Pillar'].map(b => (
              <div key={b} className="flex items-center gap-3 bg-white/5 p-3 rounded-2xl text-xs font-bold border border-white/5">
                <Star size={14} className="text-amber-400 fill-amber-400" /> {b}
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Feed */}
      <main className="lg:col-span-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Personalized Feed</h1>
          <div className="px-4 py-2 bg-indigo-50 rounded-xl border border-indigo-100">
            <p className="text-[10px] font-bold text-indigo-600">Preferences: {userInterests.join(", ")}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {tasks.map(task => (
            <div key={task.id} className={`bg-white p-8 rounded-[32px] border-2 transition-all group relative overflow-hidden ${task.isMatch ? "border-indigo-500 shadow-indigo-50 shadow-xl" : "border-transparent shadow-sm hover:shadow-md"}`}>
              
              {/* Match Badge */}
              <div className={`absolute top-0 right-0 px-4 py-1 rounded-bl-2xl font-black text-[10px] uppercase ${task.isMatch ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-400"}`}>
                {task.matchPercent}% Match
              </div>

              <span className={`px-3 py-1 text-[10px] font-black uppercase rounded-lg mb-4 inline-block ${task.isMatch ? "bg-indigo-50 text-indigo-600" : "bg-slate-50 text-slate-400"}`}>
                {task.cat}
              </span>
              
              <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-600 transition-colors">{task.title}</h3>
              <p className="text-slate-500 text-sm mb-6 leading-relaxed">{task.desc}</p>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase">
                  <CheckCircle size={12} className="text-emerald-500" /> Verified NGO
                </div>
              </div>

              <button 
                onClick={() => handleAccept(task.title)} 
                className={`w-full py-4 rounded-2xl font-black transition-all active:scale-95 ${task.isMatch ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100" : "bg-slate-900 text-white hover:bg-indigo-600"}`}
              >
                Accept Opportunity
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}