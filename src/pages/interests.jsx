import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';

export default function Interests() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);

  const fields = [
    "Education", "Environment", "Healthcare", "Animal Welfare", 
    "Tech Support", "Food Drive", "Old Age Care", "Disaster Relief"
  ];

  const toggleInterest = (name) => {
    if (selected.includes(name)) {
      setSelected(selected.filter(item => item !== name));
    } else {
      setSelected([...selected, name]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 font-sans">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-3xl font-black mb-2 text-slate-900">What are you passionate about?</h1>
        <p className="text-slate-500 mb-10">We'll show you tasks matching your interests first.</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {fields.map((field) => (
            <button
              key={field}
              onClick={() => toggleInterest(field)}
              className={`p-4 rounded-2xl border-2 transition-all font-bold flex items-center justify-center gap-2 ${
                selected.includes(field)
                ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
              }`}
            >
              {field}
              {selected.includes(field) && <CheckCircle2 size={18} />}
            </button>
          ))}
        </div>

        <button 
          onClick={() => navigate('/volunteer', { state: { userInterests: selected } })}
          disabled={selected.length === 0}
          className={`w-full py-4 rounded-2xl font-black text-lg transition-all ${
            selected.length > 0 ? "bg-slate-900 text-white" : "bg-slate-200 text-slate-400 cursor-not-allowed"
          }`}
        >
          Finish Setup ({selected.length})
        </button>
      </div>
    </div>
  );
}