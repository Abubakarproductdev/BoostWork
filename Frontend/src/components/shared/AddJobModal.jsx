import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useJobContext } from '../../context/JobContext';
import { cn } from '../../lib/utils';

export default function AddJobModal({ isOpen, onClose }) {
  const { addJob } = useJobContext();
  const [formData, setFormData] = useState({
    title: '',
    budget: '',
    connectsCost: '',
    status: 'no_response',
    clientRate: '',
    clientRegion: '',
    isClientVerified: false,
    amountSpent: '',
    clientAge: '',
    clientStars: '',
    description: '',
    proposal: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    addJob({
      ...formData,
      connectsCost: parseInt(formData.connectsCost) || 0,
      clientStars: parseFloat(formData.clientStars) || 0,
      completed: true,
      appliedAt: new Date().toISOString()
    });
    onClose();
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const inputClass = "w-full bg-[#0f172a] text-white border border-[#334155] rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors placeholder:text-slate-500";
  const labelClass = "block text-sm font-medium text-slate-400 mb-1.5";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-[#030712]/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#1e293b] rounded-2xl shadow-2xl border border-[#334155] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#334155] bg-[#0f172a]">
          <h2 className="text-xl font-bold text-white tracking-tight">Add New Job Application</h2>
          <button 
            onClick={onClose}
            className="p-2 -mr-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
          <form id="add-job-form" onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className={labelClass}>Job Title</label>
                <input required type="text" name="title" value={formData.title} onChange={handleChange} className={inputClass} placeholder="e.g. Full Stack Developer needed..." />
              </div>

              <div>
                <label className={labelClass}>Connects Cost</label>
                <input required type="number" name="connectsCost" value={formData.connectsCost} onChange={handleChange} className={inputClass} placeholder="e.g. 16" />
              </div>

              <div>
                <label className={labelClass}>Response Status</label>
                <select name="status" value={formData.status} onChange={handleChange} className={cn(inputClass, "appearance-none cursor-pointer")}>
                  <option value="no_response">No Response Yet (Blue)</option>
                  <option value="response">Got Response (Green)</option>
                  <option value="view">Client Viewed Only (Red)</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Job Budget</label>
                <input type="text" name="budget" value={formData.budget} onChange={handleChange} className={inputClass} placeholder="e.g. $50/hr or $1500" />
              </div>

              <div>
                <label className={labelClass}>Client Location / Region</label>
                <input type="text" name="clientRegion" value={formData.clientRegion} onChange={handleChange} className={inputClass} placeholder="e.g. United States" />
              </div>

              <div>
                <label className={labelClass}>Client Avg. Rate</label>
                <input type="text" name="clientRate" value={formData.clientRate} onChange={handleChange} className={inputClass} placeholder="e.g. $45/hr avg" />
              </div>

              <div>
                <label className={labelClass}>Client Amount Spent</label>
                <input type="text" name="amountSpent" value={formData.amountSpent} onChange={handleChange} className={inputClass} placeholder="e.g. $10k+" />
              </div>

              <div>
                <label className={labelClass}>Client History / Age</label>
                <input type="text" name="clientAge" value={formData.clientAge} onChange={handleChange} className={inputClass} placeholder="e.g. 2 years ago" />
              </div>

              <div>
                <label className={labelClass}>Client Stars (0-5)</label>
                <input type="number" step="0.1" min="0" max="5" name="clientStars" value={formData.clientStars} onChange={handleChange} className={inputClass} placeholder="e.g. 4.8" />
              </div>

              <div className="md:col-span-2 flex items-center mt-2 p-4 bg-[#0f172a] rounded-xl border border-[#334155]">
                <input 
                  type="checkbox" 
                  id="isClientVerified" 
                  name="isClientVerified" 
                  checked={formData.isClientVerified} 
                  onChange={handleChange} 
                  className="w-5 h-5 rounded border-[#334155] bg-[#1e293b] text-blue-500 focus:ring-blue-500/50"
                />
                <label htmlFor="isClientVerified" className="ml-3 text-white font-medium cursor-pointer">
                  Client Payment is Verified
                </label>
              </div>

              <div className="md:col-span-2">
                <label className={labelClass}>Full Job Description</label>
                <textarea required name="description" value={formData.description} onChange={handleChange} rows={5} className={cn(inputClass, "resize-y")} placeholder="Paste the job description here..." />
              </div>

              <div className="md:col-span-2">
                <label className={labelClass}>My Submitted Proposal</label>
                <textarea required name="proposal" value={formData.proposal} onChange={handleChange} rows={4} className={cn(inputClass, "resize-y")} placeholder="Paste your submitted proposal..." />
              </div>

            </div>
          </form>
        </div>

        <div className="p-4 border-t border-[#334155] bg-[#0f172a] flex justify-end gap-3">
          <button 
            type="button" 
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            form="add-job-form"
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl font-medium transition-colors shadow-lg shadow-blue-500/20"
          >
            Add Job
          </button>
        </div>
      </div>
    </div>
  );
}
