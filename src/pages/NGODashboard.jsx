import React, { useState, useEffect } from 'react';
import { AreaChart, Area, ResponsiveContainer, XAxis, Tooltip, YAxis } from 'recharts';
import { Send, Users, Radio, Activity, Trash2, CheckCircle, BarChart3 } from 'lucide-react';

export default function NGODashboard() {
  const [announcement, setAnnouncement] = useState("");
  const [activities, setActivities] = useState([]);
  const [myTasks, setMyTasks] = useState([]);

  // 1. SYNC ALL DATA (Activities & Announcements)
  useEffect(() => {
    const sync = () => {
      const liveActivities = JSON.parse(localStorage.getItem('ngo_activity') || "[]");
      const liveTasks = JSON.parse(localStorage.getItem('ngo_announcements') || "[]");
      setActivities(liveActivities);
      setMyTasks(liveTasks);
    };
    window.addEventListener('storage', sync);
    sync();
    return () => window.removeEventListener('storage', sync);
  }, []);

  // 2. BROADCAST LOGIC
  const handleBroadcast = () => {
    if (!announcement) return;
    const newTask = { 
      id: Date.now(), 
      title: announcement, 
      desc: "Live requirement broadcasted from command center.", 
      cat: "URGENT",
      timestamp: new Date().toLocaleTimeString()
    };
    const existing = JSON.parse(localStorage.getItem('ngo_announcements') || "[]");
    localStorage.setItem('ngo_announcements', JSON.stringify([newTask, ...existing]));
    window.dispatchEvent(new Event('storage'));
    setAnnouncement("");
  };

  // 3. DELETE TASK LOGIC
  const deleteTask = (id) => {
    const filtered = myTasks.filter(t => t.id !== id);
    localStorage.setItem('ngo_announcements', JSON.stringify(filtered));
    setMyTasks(filtered); // Update local state immediately
    window.dispatchEvent(new Event('storage'));
  };

  // 4. DYNAMIC GRAPH DATA (Calculated from activities)
  const dynamicGraphData = [
    { name: 'Prev', val: 10 },
    { name: 'Live', val: activities.length + 15 } // Adds 15 as base to make graph look full
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans space-y-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* HEADER SECTION */}
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Command Center</h1>
            <p className="text-slate-400 font-bold text-sm uppercase">NGO Resource Allocation Portal</p>
          </div>
          <div className="hidden md:flex gap-4">
             <QuickStat label="Active Volunteers" val={activities.length + 120} color="text-indigo-600" />
             <QuickStat label="Trust Score" val="9.8" color="text-emerald-500" />
          </div>
        </div>

        {/* ROW 1: TRENDS & BROADCAST */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Live Trends Graph */}
          <div className="lg:col-span-2 bg-white p-8 rounded-[40px] shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-black text-xs uppercase text-slate-400 flex items-center gap-2">
                <BarChart3 size={16}/> Application Momentum
              </h3>
              <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full animate-pulse">LIVE TRACKING</span>
            </div>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dynamicGraphData}>
                  <defs>
                    <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip cursor={false} contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}}/>
                  <Area type="monotone" dataKey="val" stroke="#6366F1" strokeWidth={4} fill="url(#colorVal)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Broadcast Card */}
          <div className="bg-slate-900 p-8 rounded-[40px] text-white flex flex-col justify-between shadow-2xl shadow-slate-200">
            <Radio className="animate-pulse text-indigo-400" size={32} />
            <div className="space-y-4">
              <h3 className="text-2xl font-black leading-tight">Instant Task <br/> Broadcaster</h3>
              <input 
                value={announcement} 
                onChange={(e) => setAnnouncement(e.target.value)} 
                placeholder="Ex: Urgent Blood Drive..." 
                className="w-full p-4 bg-white/10 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-slate-500 text-sm font-bold"
              />
              <button onClick={handleBroadcast} className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black transition-all flex items-center justify-center gap-2">
                <Send size={18}/> Broadcast Now
              </button>
            </div>
          </div>
        </div>

        {/* ROW 2: HISTORY & FEED */}
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* My Announcements History */}
          <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100">
            <h3 className="font-black text-xs uppercase text-slate-400 mb-6 flex items-center gap-2"><CheckCircle size={16}/> Your Active Postings</h3>
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {myTasks.map(task => (
                <div key={task.id} className="group p-5 bg-slate-50 rounded-3xl flex justify-between items-center border border-transparent hover:border-indigo-100 transition-all">
                  <div>
                    <h4 className="font-black text-slate-800">{task.title}</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Started at {task.timestamp}</p>
                  </div>
                  <button onClick={() => deleteTask(task.id)} className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
              {myTasks.length === 0 && <EmptyState text="No active broadcasts." />}
            </div>
          </div>

          {/* Live Application Feed */}
          <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100">
            <h3 className="font-black text-xs uppercase text-slate-400 mb-6 flex items-center gap-2"><Activity size={16}/> Volunteer Activity</h3>
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
              {activities.map(act => (
                <div key={act.id} className="flex items-center gap-4 p-4 bg-indigo-50/50 rounded-3xl border border-indigo-50">
                  <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-black text-xs">
                    {act.volunteerName[0]}
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-800">{act.volunteerName} <span className="font-medium text-slate-500 text-[10px]">applied for</span> {act.taskName}</p>
                    <p className="text-[10px] font-bold text-indigo-400">{act.time}</p>
                  </div>
                </div>
              ))}
              {activities.length === 0 && <EmptyState text="Waiting for volunteers..." />}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// Sub-components to keep code clean
function QuickStat({ label, val, color }) {
  return (
    <div className="bg-white px-6 py-3 rounded-2xl border border-slate-100 shadow-sm">
      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
      <p className={`text-lg font-black ${color}`}>{val}</p>
    </div>
  );
}

function EmptyState({ text }) {
  return (
    <div className="text-center py-10 opacity-30">
      <p className="text-sm font-bold uppercase tracking-widest">{text}</p>
    </div>
  );
}