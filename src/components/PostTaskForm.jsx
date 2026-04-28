import React, { useState } from 'react';
import { Send, Image as ImageIcon, MapPin } from 'lucide-react';

export default function PostTaskForm({ onPost }) {
  const [title, setTitle] = useState("");

  return (
    <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm mb-8">
      <h2 className="text-xl font-black mb-6 text-slate-900">Create a Requirement</h2>
      <div className="space-y-4">
        <input 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-4 bg-slate-50 rounded-2xl border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" 
          placeholder="What do you need help with? (e.g. Food Drive)" 
        />
        <textarea 
          className="w-full p-4 bg-slate-50 rounded-2xl border-none ring-1 ring-slate-200 h-32 outline-none focus:ring-2 focus:ring-indigo-500" 
          placeholder="Describe the requirements..."
        ></textarea>
        
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-xl font-bold text-xs hover:bg-slate-200 transition-colors">
            <MapPin size={14} /> Add Location
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-xl font-bold text-xs hover:bg-slate-200 transition-colors">
            <ImageIcon size={14} /> Attach Image
          </button>
        </div>

        <button 
          onClick={() => { onPost(title); setTitle(""); }}
          className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
        >
          <Send size={18} /> Broadcast to Volunteers
        </button>
      </div>
    </div>
  );
}