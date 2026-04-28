import React from 'react';
import { MapPin, Star, CheckCircle } from 'lucide-react';

export default function TaskCard({ task, isMatch, onAccept }) {
  return (
    <div className={`group bg-white p-8 rounded-[32px] border-2 transition-all hover:shadow-xl ${isMatch ? "border-indigo-500 ring-4 ring-indigo-50" : "border-transparent shadow-sm"}`}>
      <div className="flex justify-between items-start mb-4">
        <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase ${isMatch ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500"}`}>
          {task.cat}
        </span>
        {isMatch && <Star className="text-amber-400 fill-amber-400" size={16} />}
      </div>
      <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-600 transition-colors">{task.title}</h3>
      <p className="text-slate-500 text-sm line-clamp-2">{task.desc}</p>
      <button 
        onClick={() => onAccept(task.title)}
        className="w-full mt-8 py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-indigo-600 transition-all"
      >
        Accept Opportunity
      </button>
    </div>
  );
}