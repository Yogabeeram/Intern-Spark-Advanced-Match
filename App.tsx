
import React, { useState, useMemo } from 'react';
import { Internship, UserProfile, EducationLevel, WorkMode } from './types';
import { INITIAL_INTERNSHIPS } from './constants';
import Input from './components/Input';
import InternshipCard from './components/InternshipCard';

const App: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    edu: '',
    loc: '',
    mode: 'Any',
    skills: '',
    goals: '',
    languages: ''
  });

  const [matches, setMatches] = useState<Internship[]>(INITIAL_INTERNSHIPS);
  const [isSearching, setIsSearching] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const calculateMatches = () => {
    if (!profile.name.trim() || !profile.skills.trim()) {
      alert("Please fill in your name and skills to get recommendations!");
      return;
    }

    setIsSearching(true);
    
    // Simulate processing delay for "AI feel"
    setTimeout(() => {
      const scored = INITIAL_INTERNSHIPS.map(job => {
        let score = 0;
        const userSkills = profile.skills.toLowerCase().split(',').map(s => s.trim());
        const jobSkills = job.skills.toLowerCase().split(',').map(s => s.trim());
        
        // 1. Skill & Goal Alignment (Weight: 40)
        let skillHits = 0;
        jobSkills.forEach(js => {
          if (userSkills.some(us => us.includes(js) || js.includes(us))) skillHits++;
        });
        score += (skillHits / jobSkills.length) * 30;
        
        if (profile.goals && job.title.toLowerCase().includes(profile.goals.toLowerCase())) {
          score += 10;
        }

        // 2. Mode Preference (Weight: 20)
        if (profile.mode === 'Any' || profile.mode === job.mode) {
          score += 20;
        }

        // 3. Education Match (Weight: 20)
        if (profile.edu === job.edu) {
          score += 20;
        }

        // 4. Location Match (Weight: 20)
        if (profile.loc.toLowerCase() === job.loc.toLowerCase() || job.mode === 'Online') {
          score += 20;
        }

        return { ...job, finalScore: Math.round(score) };
      });

      setMatches(scored.sort((a, b) => (b.finalScore || 0) - (a.finalScore || 0)));
      setIsSearching(false);
    }, 600);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <i className="fa-solid fa-bolt-lightning"></i>
            </div>
            <h1 className="text-xl font-black text-slate-800 tracking-tight uppercase">
              Intern<span className="text-blue-600">Spark</span>
            </h1>
          </div>
          <div className="hidden md:flex gap-6 text-sm font-semibold text-slate-500">
            <a href="#" className="text-blue-600">Home</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Find Jobs</a>
            <a href="#" className="hover:text-blue-600 transition-colors">My Profile</a>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar */}
          <aside className="lg:col-span-4 xl:col-span-3">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <i className="fa-solid fa-id-card text-blue-600 text-lg"></i>
                <h2 className="text-lg font-bold text-slate-800">Your Profile</h2>
              </div>

              <div className="space-y-1">
                <Input 
                  label="Full Name" 
                  name="name"
                  value={profile.name}
                  onChange={handleInputChange}
                  placeholder="e.g. John Doe"
                />
                
                <Input 
                  label="Education" 
                  type="select"
                  name="edu"
                  value={profile.edu}
                  onChange={handleInputChange}
                  options={[
                    { value: '', label: 'Select Education' },
                    { value: '12th Pass', label: '12th Pass' },
                    { value: 'Diploma', label: 'Diploma' },
                    { value: 'Under Graduate', label: 'Under Graduate' },
                    { value: 'Graduate', label: 'Graduate' }
                  ]}
                />

                <Input 
                  label="Work Preference" 
                  type="select"
                  name="mode"
                  value={profile.mode}
                  onChange={handleInputChange}
                  options={[
                    { value: 'Any', label: 'Any (Remote/Office)' },
                    { value: 'Online', label: 'Remote / Online' },
                    { value: 'Offline', label: 'Office / Offline' }
                  ]}
                />

                <Input 
                  label="Current Location" 
                  name="loc"
                  value={profile.loc}
                  onChange={handleInputChange}
                  placeholder="e.g. Delhi, Mumbai"
                />

                <Input 
                  label="Languages" 
                  name="languages"
                  value={profile.languages}
                  onChange={handleInputChange}
                  placeholder="e.g. English, Hindi"
                />

                <Input 
                  label="Career Goals" 
                  name="goals"
                  value={profile.goals}
                  onChange={handleInputChange}
                  placeholder="e.g. Web Developer"
                />

                <Input 
                  label="Skills" 
                  type="textarea"
                  name="skills"
                  value={profile.skills}
                  onChange={handleInputChange}
                  placeholder="React, Python, SQL, etc. (comma separated)"
                />

                <button 
                  onClick={calculateMatches}
                  disabled={isSearching}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-blue-100 mt-4 flex items-center justify-center gap-2"
                >
                  {isSearching ? (
                    <i className="fa-solid fa-circle-notch animate-spin"></i>
                  ) : (
                    <i className="fa-solid fa-magnifying-glass"></i>
                  )}
                  Find Best Matches
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-8 xl:col-span-9">
            <div className="mb-8">
              <h2 className="text-2xl font-black text-slate-800">
                {profile.name ? `Recommendations for ${profile.name}` : "Available Internships"}
              </h2>
              <p className="text-slate-500 font-medium">
                {matches.length} matches found based on your profile
              </p>
            </div>

            {isSearching ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-64 bg-slate-200 rounded-3xl"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {matches.map(job => (
                  <InternshipCard key={job.id} job={job} />
                ))}
              </div>
            )}
            
            {!isSearching && matches.length === 0 && (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                  <i className="fa-solid fa-face-frown text-3xl"></i>
                </div>
                <h3 className="text-xl font-bold text-slate-700">No matches found</h3>
                <p className="text-slate-500">Try broadening your skills or changing your work preference.</p>
              </div>
            )}
          </main>
        </div>
      </div>
      
      {/* Footer Decoration */}
      <footer className="py-10 border-t border-slate-200 mt-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest">
            Made with <i className="fa-solid fa-heart text-red-400 mx-1"></i> for future leaders
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
