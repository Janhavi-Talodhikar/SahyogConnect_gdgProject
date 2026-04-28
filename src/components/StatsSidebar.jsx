import React from 'react';
import { Trophy, Clock, Target } from 'lucide-react';

export default function StatsSidebar({ xp, hours, acceptedCount }) {
  const progressPercent = (xp / 1000) * 100;
  
  return (
    <aside className="lg:w-80 flex-shrink-0 space-y-6">
      <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 mb-6 text-amber-500 font-black text-sm uppercase">
          <Trophy size={20} /> Impact Stats
        </div>
        <div className="mb-6">
          <div className="flex justify-between text-[10px] font-black mb-2 uppercase text-slate-400">
            <span>{xp >= 1000 ? "Level 5" : "Level 4"}</span>
            <span className="text-indigo-600">{xp} / 1000 XP</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="bg-indigo-600 h-full transition-all duration-700 rounded-full"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
        <div className="space-y-3">
          <StatItem icon={<Clock size={16} className="text-indigo-600"/>} label={`${hours} Hours Total`} />
          <StatItem icon={<Target size={16} className="text-emerald-600"/>} label={`${acceptedCount} NGOs Helped`} />
        </div>
      </div>
    </aside>
  );
}

// A tiny "Atom" component used only inside this file
function StatItem({ icon, label }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl">
      {icon}
      <span className="text-xs font-bold">{label}</span>
    </div>
  );
}