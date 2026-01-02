
import React from 'react';
import { Internship } from '../types';

interface InternshipCardProps {
  job: Internship;
}

const InternshipCard: React.FC<InternshipCardProps> = ({ job }) => {
  const scoreColor = job.finalScore && job.finalScore > 70 ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700';

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all relative overflow-hidden group">
      <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${scoreColor}`}>
        {job.finalScore ?? 0}% Match
      </div>
      
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-blue-600 font-bold text-xl border border-slate-100">
          {job.company[0]}
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-800 pr-20">{job.title}</h3>
          <p className="text-sm text-slate-500 font-medium">{job.company}</p>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <i className="fa-solid fa-location-dot w-4 text-slate-400"></i>
          <span>{job.loc}</span>
          <span className={`ml-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase ${job.mode === 'Online' ? 'bg-sky-50 text-sky-600' : 'bg-amber-50 text-amber-600'}`}>
            {job.mode}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <i className="fa-solid fa-graduation-cap w-4 text-slate-400"></i>
          <span>Requires {job.edu}</span>
        </div>
        <p className="text-sm text-slate-600 line-clamp-2 italic">
          "{job.description}"
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {job.skills.split(',').map(skill => (
          <span key={skill} className="bg-slate-100 text-slate-600 px-2 py-1 rounded-md text-[11px] font-semibold">
            {skill.trim()}
          </span>
        ))}
      </div>

      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors text-sm shadow-lg shadow-blue-100">
        Apply Now
      </button>
    </div>
  );
};

export default InternshipCard;
