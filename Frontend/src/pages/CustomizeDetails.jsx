import React, { useState } from 'react';
import { UserCircle, Save, Plus, Trash2, Link as LinkIcon, FolderKanban } from 'lucide-react';
import { cn } from '../lib/utils';

export default function CustomizeDetails() {
  const [isSaving, setIsSaving] = useState(false);
  const [profile, setProfile] = useState({
    fullName: 'Shahid R.',
    title: 'Senior Full Stack Developer & UI/UX Expert',
    bio: 'I am a specialized frontend and full-stack developer with 5+ years of experience building modern web apps. I excel in React, Node, Tailwind, and creating dynamic, responsive UIs that convert.',
  });

  const [projects, setProjects] = useState([
    { id: 1, name: 'SaaS Analytics Dashboard', description: 'Built a high-performance analytics dashboard using React, Recharts, and Express.', tech: 'React, Node, Tailwind' },
    { id: 2, name: 'E-commerce Platform', description: 'Scaled a Shopify-like platform to handle 10k+ daily users.', tech: 'Next.js, MongoDB' }
  ]);

  const [links, setLinks] = useState([
    { id: 1, name: 'Portfolio', url: 'https://myportfolio.com' },
    { id: 2, name: 'GitHub', url: 'https://github.com/ShahidR' }
  ]);

  const inputClass = "w-full bg-[#0f172a] text-white border border-[#334155] rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors placeholder:text-slate-500";
  const labelClass = "block text-sm font-medium text-slate-400 mb-1.5";

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };

  return (
    <div className="space-y-6 pb-12 h-full overflow-y-auto pr-2 custom-scrollbar">
      <div className="flex items-center justify-between sticky top-0 bg-[#0a0f1c]/90 backdrop-blur-md z-10 py-4 -my-4 border-b border-[#1e293b] mb-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-2">
            <UserCircle className="w-8 h-8 text-amber-500" />
            Customize My Details
          </h1>
          <p className="text-slate-400 mt-1">Information used as context by the AI Proposal Writer</p>
        </div>
        <button 
          onClick={handleSave}
          className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)] active:scale-95 flex items-center gap-2"
        >
          {isSaving ? <span className="animate-pulse">Saving...</span> : <><Save className="w-4 h-4" /> Save Profile</>}
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Core Details */}
        <div className="xl:col-span-1 space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4">
            <h2 className="text-xl font-bold text-white pb-3 border-b border-[#334155]">Core Identity</h2>
            
            <div>
              <label className={labelClass}>Full Name</label>
              <input 
                type="text" 
                value={profile.fullName} 
                onChange={e => setProfile({...profile, fullName: e.target.value})} 
                className={inputClass} 
              />
            </div>
            
            <div>
              <label className={labelClass}>Professional Title</label>
              <input 
                type="text" 
                value={profile.title} 
                onChange={e => setProfile({...profile, title: e.target.value})} 
                className={inputClass} 
              />
            </div>
            
            <div>
              <label className={labelClass}>Bio / Summary</label>
              <textarea 
                rows={6}
                value={profile.bio} 
                onChange={e => setProfile({...profile, bio: e.target.value})} 
                className={cn(inputClass, "resize-none")} 
              />
            </div>
          </div>
        </div>

        {/* Projects & Links */}
        <div className="xl:col-span-2 space-y-6">
          
          <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4">
             <div className="flex items-center justify-between pb-3 border-b border-[#334155]">
               <h2 className="text-xl font-bold text-white flex items-center gap-2">
                 <FolderKanban className="w-5 h-5 text-indigo-400" />
                 Projects Context
               </h2>
               <button 
                  onClick={() => setProjects([...projects, { id: Date.now(), name: '', description: '', tech: '' }])}
                  className="text-sm font-medium text-indigo-400 hover:text-indigo-300 flex items-center gap-1 bg-indigo-500/10 px-3 py-1.5 rounded-lg"
               >
                 <Plus className="w-4 h-4" /> Add Project
               </button>
             </div>

             <div className="space-y-4">
                {projects.map((proj, idx) => (
                  <div key={proj.id} className="bg-[#0f172a] border border-[#334155] rounded-xl p-4 relative group">
                    <button 
                      onClick={() => setProjects(projects.filter(p => p.id !== proj.id))}
                      className="absolute top-4 right-4 text-slate-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                         <label className={cn(labelClass, "text-xs")}>Project Name</label>
                         <input type="text" value={proj.name} onChange={e => {
                           const newProj = [...projects];
                           newProj[idx].name = e.target.value;
                           setProjects(newProj);
                         }} className={cn(inputClass, "py-1.5 text-sm")} />
                      </div>
                      <div>
                         <label className={cn(labelClass, "text-xs")}>Technologies Used</label>
                         <input type="text" value={proj.tech} onChange={e => {
                           const newProj = [...projects];
                           newProj[idx].tech = e.target.value;
                           setProjects(newProj);
                         }} className={cn(inputClass, "py-1.5 text-sm")} />
                      </div>
                      <div className="md:col-span-2">
                         <label className={cn(labelClass, "text-xs")}>Description / Impact</label>
                         <textarea rows={2} value={proj.description} onChange={e => {
                           const newProj = [...projects];
                           newProj[idx].description = e.target.value;
                           setProjects(newProj);
                         }} className={cn(inputClass, "py-1.5 text-sm resize-none")} />
                      </div>
                    </div>
                  </div>
                ))}
             </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4">
             <div className="flex items-center justify-between pb-3 border-b border-[#334155]">
               <h2 className="text-xl font-bold text-white flex items-center gap-2">
                 <LinkIcon className="w-5 h-5 text-blue-400" />
                 Portfolio & Social Links
               </h2>
               <button 
                  onClick={() => setLinks([...links, { id: Date.now(), name: '', url: '' }])}
                  className="text-sm font-medium text-blue-400 hover:text-blue-300 flex items-center gap-1 bg-blue-500/10 px-3 py-1.5 rounded-lg"
               >
                 <Plus className="w-4 h-4" /> Add Link
               </button>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {links.map((link, idx) => (
                  <div key={link.id} className="bg-[#0f172a] border border-[#334155] rounded-xl p-4 flex gap-3 relative group">
                    <button 
                      onClick={() => setLinks(links.filter(l => l.id !== link.id))}
                      className="absolute top-2 right-2 text-slate-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <div className="flex-1 space-y-3">
                      <div>
                        <label className={cn(labelClass, "text-xs")}>Link Label</label>
                        <input type="text" value={link.name} onChange={e => {
                          const newLinks = [...links];
                          newLinks[idx].name = e.target.value;
                          setLinks(newLinks);
                        }} className={cn(inputClass, "py-1.5 text-sm")} placeholder="e.g. GitHub" />
                      </div>
                      <div>
                        <label className={cn(labelClass, "text-xs")}>URL</label>
                        <input type="url" value={link.url} onChange={e => {
                          const newLinks = [...links];
                          newLinks[idx].url = e.target.value;
                          setLinks(newLinks);
                        }} className={cn(inputClass, "py-1.5 text-sm")} placeholder="https://" />
                      </div>
                    </div>
                  </div>
                ))}
             </div>
          </div>

        </div>

      </div>
    </div>
  );
}
