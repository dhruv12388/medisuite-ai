"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserPlus, Loader2, Mail, Lock, CheckCircle2 } from 'lucide-react';
import axios from 'axios';

// Direct API connection to your FastAPI backend
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000', 
});

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Sending data to your FastAPI /register endpoint
      await api.post('/register', { email, password });
      setSuccess(true);
      
      // Wait 2 seconds so the user sees the success message, then go to login
      setTimeout(() => {
        router.push('/login');
      }, 2000);
      
    } catch (err: any) {
      const message = err.response?.data?.detail || "Registration failed. Try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-100">
        
        {/* Header Section */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="p-4 bg-blue-50 rounded-full mb-4">
            <UserPlus className="text-blue-600" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Get Started</h1>
          <p className="text-slate-500 mt-2 text-sm">Create your MediSuite AI account</p>
        </div>

        {/* Success / Error Messages */}
        {success && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg flex items-center gap-3">
            <CheckCircle2 size={20} />
            <p className="text-sm font-medium">Account created! Redirecting to login...</p>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm font-medium">
            {error}
          </div>
        )}

        {/* Form Section */}
        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="email" 
                required
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="password" 
                required
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading || success}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-200 transition-all flex justify-center items-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Create Account"}
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-slate-600">
          Already have an account?{' '}
          <button 
            onClick={() => router.push('/login')} 
            className="text-blue-600 font-bold hover:underline"
          >
            Log In
          </button>
        </p>
      </div>
    </div>
  );
}