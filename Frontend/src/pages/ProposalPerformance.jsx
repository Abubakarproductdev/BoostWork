import React, { useState } from 'react';
import { useJobContext } from '../context/JobContext';
import { cn } from '../lib/utils';
import { CheckCircle2, Circle, Clock, Zap } from 'lucide-react';
import AddJobModal from '../components/shared/AddJobModal';
import JobDetailModal from '../components/shared/JobDetailModal';

export default function ProposalPerformance() {
  const { jobs } = useJobContext();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const getStatusColor = (status) => {
    switch(status) {
      case 'response': return 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]';
      case 'no_response': return 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]';
      case 'view': return 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.6)]';
      default: return 'bg-slate-500';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'response': return 'Responded';
      case 'no_response': return 'No Response';
      case 'view': return 'Viewed Only';
      default: return 'Unknown';
    }
  };

  const truncateTitle = (title) => {
    const words = title.split(' ');
    if (words.length <= 3) return title;
    return words.slice(0, 3).join(' ') + '...';
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Proposal Performance</h1>
          <p className="text-slate-400 mt-1">Track and manage your submitted proposals</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-[0_0_20px_rgba(59,130,246,0.4)] active:scale-95 flex items-center gap-2"
        >
          <Zap className="w-4 h-4" />
          <span>Add Job</span>
        </button>
      </div>

      <div className="glass-panel rounded-2xl flex-1 overflow-hidden flex flex-col border border-white/10">
        <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-[#1e293b] bg-[#0f172a]/80 text-xs font-semibold text-slate-400 uppercase tracking-wider">
          <div className="col-span-1 text-center">Status</div>
          <div className="col-span-5">Job Title</div>
          <div className="col-span-2 text-center">Connects</div>
          <div className="col-span-2 text-center">Completion</div>
          <div className="col-span-2 text-right">Applied</div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          {jobs.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-500">
              <p>No jobs added yet.</p>
            </div>
          ) : (
            jobs.map(job => (
              <div 
                key={job.id} 
                onClick={() => setSelectedJob(job)}
                className="grid grid-cols-12 gap-4 px-4 py-4 items-center rounded-xl hover:bg-[#1e293b]/60 cursor-pointer transition-colors border border-transparent hover:border-[#334155]/50 group"
              >
                <div className="col-span-1 flex justify-center">
                  <div className="relative group/tooltip">
                    <div className={cn("w-3.5 h-3.5 rounded-full transition-all duration-300", getStatusColor(job.status))} />
                    <div className="absolute left-1/2 -top-8 -translate-x-1/2 bg-[#0f172a] text-xs text-white px-2 py-1 rounded border border-[#334155] opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                      {getStatusText(job.status)}
                    </div>
                  </div>
                </div>
                
                <div className="col-span-5 font-medium text-slate-200 group-hover:text-white transition-colors">
                  {truncateTitle(job.title)}
                </div>
                
                <div className="col-span-2 flex justify-center">
                   <div className="bg-[#1e293b] px-3 py-1 rounded-full text-sm font-medium text-blue-400 border border-blue-500/20">
                     {job.connectsCost}
                   </div>
                </div>
                
                <div className="col-span-2 flex justify-center items-center gap-2">
                  {job.completed ? (
                    <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full text-xs font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Completed
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full text-xs font-semibold">
                      <Circle className="w-3.5 h-3.5 border border-amber-400 border-dashed rounded-full" />
                      Incomplete
                    </div>
                  )}
                </div>
                
                <div className="col-span-2 text-right text-sm text-slate-400 flex items-center justify-end gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {new Date(job.appliedAt).toLocaleDateString()}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <AddJobModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      <JobDetailModal job={selectedJob} onClose={() => setSelectedJob(null)} />
    </div>
  );
}
