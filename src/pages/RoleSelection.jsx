import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Building2 } from 'lucide-react';

export default function RoleSelection() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50">
      <h1 className="text-4xl font-black text-slate-900 mb-12">SahyogConnect</h1>
      <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
        <div onClick={() => navigate('/ngo')} className="bg-white p-10 rounded-3xl border border-slate-200 shadow-sm hover:shadow-2xl hover:border-indigo-500 transition-all cursor-pointer group text-center">
          <Building2 size={40} className="mx-auto text-indigo-600 mb-4" />
          <h2 className="text-2xl font-bold">I am an NGO</h2>
          <p className="text-slate-500 mt-2 italic">"The Organizer"</p>
        </div>

        <div onClick={() => navigate('/interests')} className="bg-white p-10 rounded-3xl border border-slate-200 shadow-sm hover:shadow-2xl hover:border-emerald-500 transition-all cursor-pointer group text-center">
          <Heart size={40} className="mx-auto text-emerald-600 mb-4" />
          <h2 className="text-2xl font-bold">I am a Volunteer</h2>
          <p className="text-slate-500 mt-2 italic">"The Helper"</p>
        </div>
      </div>
    </div>
  );
}