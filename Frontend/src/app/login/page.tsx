"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  FileText, 
  ShieldCheck, 
  Settings, 
  LogOut, 
  Search, 
  Plus,
  Bell,
  User,
  Activity,
  ChevronRight,
  MessageSquare,
  UploadCloud,
  CheckCircle2
} from 'lucide-react';

export default function Dashboard() {
  const router = useRouter();
  const [userName] = useState('Medical Administrator');
  const [query, setQuery] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // Security Check
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      
      {/* --- SIDEBAR --- */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col sticky top-0 h-screen">
        <div className="p-6">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-xl tracking-tight">
            <ShieldCheck size={28} strokeWidth={2.5} />
            <span>MediSuite AI</span>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <NavItem icon={<LayoutDashboard size={20}/>} label="Overview" active />
          <NavItem icon={<FileText size={20}/>} label="Policy Analysis" />
          <NavItem icon={<Activity size={20}/>} label="Compliance Lab" />
          <NavItem icon={<MessageSquare size={20}/>} label="AI Assistant" />
          <div className="pt-4 pb-2 px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">System</div>
          <NavItem icon={<Settings size={20}/>} label="Settings" />
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-slate-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-200"
          >
            <LogOut size={20} />
            <span className="font-semibold text-sm">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 flex flex-col">
        
        {/* Top Navigation Bar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="relative w-1/3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search policies or HIPAA records..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none text-sm transition-all"
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-full relative transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="text-right">
                <p className="text-sm font-bold text-slate-900 leading-none">{userName}</p>
                <p className="text-[11px] text-blue-600 font-medium mt-1">Enterprise Access</p>
              </div>
              <div className="h-10 w-10 bg-slate-900 rounded-xl flex items-center justify-center text-white shadow-lg">
                <User size={20} />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8 max-w-7xl mx-auto w-full">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">System Overview</h1>
              <p className="text-slate-500 mt-1">Real-time AI analysis of your medical infrastructure.</p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-xl shadow-blue-200 transition-all active:scale-95">
              <Plus size={18} />
              New Policy Scan
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <StatCard label="Total Policies" value="2,481" trend="+12" color="blue" />
            <StatCard label="Compliance Rate" value="99.4%" trend="Stable" color="emerald" />
            <StatCard label="AI Actions Required" value="7" trend="High Priority" color="amber" />
          </div>

          {/* AI INTERACTION AREA */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            
            {/* Upload Section (2/5 columns) */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <UploadCloud className="text-blue-600" size={20} />
                    Document Engine
                  </h3>
                  <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-1 rounded uppercase tracking-wider">PDF Only</span>
                </div>
                
                <div 
                  className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center transition-all cursor-pointer
                    ${isUploading ? 'bg-blue-50 border-blue-400' : 'bg-slate-50 border-slate-200 hover:border-blue-300 hover:bg-white'}
                  `}
                  onClick={() => setIsUploading(!isUploading)}
                >
                  <div className={`p-4 rounded-full mb-4 ${isUploading ? 'bg-blue-100 text-blue-600' : 'bg-white text-slate-400 shadow-sm'}`}>
                    {isUploading ? <CheckCircle2 className="animate-bounce" size={32} /> : <Plus size={32} />}
                  </div>
                  <p className="text-sm font-bold text-slate-700">
                    {isUploading ? 'Document Received' : 'Drop medical policy here'}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">or click to browse files</p>
                </div>
                
                <button className="w-full mt-6 bg-slate-900 text-white py-3.5 rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-200">
                  Run AI Analysis
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* AI Assistant Chat (3/5 columns) */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[460px] overflow-hidden">
                <div className="p-5 border-b border-slate-100 bg-white flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 bg-emerald-500 rounded-full animate-pulse"></div>
                    <h3 className="text-lg font-bold">MediSuite AI Assistant</h3>
                  </div>
                  <span className="text-xs font-medium text-slate-400">GPT-4 Enabled</span>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
                  <div className="bg-white border border-slate-200 p-4 rounded-2xl rounded-tl-none shadow-sm max-w-[85%] text-sm leading-relaxed text-slate-700">
                    Welcome to the analysis suite. I have indexed your current policies. 
                    <strong className="block mt-2 text-blue-600">I found 3 sections that may conflict with the new 2026 HIPAA guidelines. Would you like me to highlight them?</strong>
                  </div>
                </div>

                <div className="p-4 bg-white border-t border-slate-100">
                  <div className="relative group">
                    <input 
                      type="text" 
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Ask about compliance, risks, or policy details..."
                      className="w-full pl-5 pr-14 py-4 bg-slate-100 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none text-sm transition-all"
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-md active:scale-95">
                      <Search size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

// --- UI HELPER COMPONENTS ---

function NavItem({ icon, label, active = false }: { icon: any, label: string, active?: boolean }) {
  return (
    <button className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all duration-200 group ${
      active ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
    }`}>
      <span className={`${active ? 'text-white' : 'text-slate-400 group-hover:text-blue-600'}`}>{icon}</span>
      <span className="font-bold text-sm">{label}</span>
      {active && <ChevronRight size={14} className="ml-auto opacity-50" />}
    </button>
  );
}

function StatCard({ label, value, trend, color }: any) {
  const colors: any = {
    blue: "text-blue-600 bg-blue-50",
    emerald: "text-emerald-600 bg-emerald-50",
    amber: "text-amber-600 bg-amber-50"
  };

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</p>
      <div className="flex items-end justify-between mt-3">
        <h3 className="text-4xl font-black text-slate-900 tracking-tight">{value}</h3>
        <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider ${colors[color]}`}>
          {trend}
        </span>
      </div>
    </div>
  );
}