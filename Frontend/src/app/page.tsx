import Link from "next/link";
import { Activity, Shield, Stethoscope, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 bg-white border-b border-slate-200">
        <div className="flex items-center gap-2">
          <Activity className="w-8 h-8 text-blue-600" />
          <span className="text-2xl font-bold tracking-tight text-slate-900">
            MediSuite <span className="text-blue-600">AI</span>
          </span>
        </div>
        <div className="flex gap-4">
          <Link href="/login" className="px-4 py-2 font-medium text-slate-600 hover:text-blue-600 transition">
            Log in
          </Link>
          <Link href="/register" className="px-5 py-2 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition shadow-md">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-8 py-20 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
          </span>
          AI-Powered Diagnosis Support Now Live
        </div>
        
        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
          Modern Healthcare <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            Enhanced by Intelligence
          </span>
        </h1>
        
        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          MediSuite AI streamlines clinical workflows, providing real-time data analysis and intelligent patient management tools for modern healthcare professionals.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/register" className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition flex items-center justify-center gap-2 text-lg shadow-lg shadow-blue-200">
            Start Free Consultation <ArrowRight className="w-5 h-5" />
          </Link>
          <button className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 font-semibold border border-slate-200 rounded-xl hover:bg-slate-50 transition text-lg">
            View Demo
          </button>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-24 text-left">
          <div className="p-8 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6">
              <Stethoscope className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">AI Diagnostics</h3>
            <p className="text-slate-600">Advanced algorithms to help identify patterns and support clinical decisions.</p>
          </div>

          <div className="p-8 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center mb-6">
              <Shield className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Secure Privacy</h3>
            <p className="text-slate-600">HIPAA-compliant data encryption ensuring patient records stay confidential.</p>
          </div>

          <div className="p-8 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center mb-6">
              <Activity className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Real-time Insights</h3>
            <p className="text-slate-600">Instant dashboard updates on patient metrics and clinic performance.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 py-10 border-t border-slate-200 text-center text-slate-500 text-sm">
        &copy; {new Date().getFullYear()} MediSuite AI. All rights reserved.
      </footer>
    </div>
  );
}
