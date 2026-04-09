import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, PenTool, MessageSquarePlus, UserCircle, Zap } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function Sidebar() {
  const navItems = [
    { name: 'Overall Performance', path: '/', icon: LayoutDashboard },
    { name: 'Proposal Performance', path: '/proposals', icon: FileText },
    { name: 'Proposal Writing', path: '/write', icon: PenTool },
    { name: 'Client Lead Gen', path: '/leads', icon: MessageSquarePlus },
    { name: 'Customize Details', path: '/profile', icon: UserCircle },
  ];

  return (
    <aside className="w-64 border-r border-[#1e293b] bg-[#030712] flex flex-col h-full shrink-0">
      <div className="h-16 flex items-center px-6 border-b border-[#1e293b]">
        <div className="flex items-center gap-2 text-white font-bold text-lg tracking-wide">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          Upwork AI
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative overflow-hidden",
                isActive 
                  ? "text-white bg-[#1e293b]/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] border border-[#334155]/50" 
                  : "text-slate-400 hover:text-slate-100 hover:bg-[#0f172a]"
              )
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-r-full shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                )}
                <item.icon className={cn("w-5 h-5 transition-colors", isActive ? "text-blue-400" : "text-slate-500 group-hover:text-slate-300")} />
                {item.name}
              </>
            )}
          </NavLink>
        ))}
      </div>
      
      <div className="p-4 border-t border-[#1e293b]">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-[#0f172a] border border-[#1e293b]">
          <div className="w-9 h-9 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0 border border-indigo-500/30">
            <UserCircle className="w-5 h-5 text-indigo-400" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-white">Shahid R.</span>
            <span className="text-xs text-slate-400">Pro Strategist</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
