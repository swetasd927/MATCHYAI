"use client";
import { useState } from "react";
import { useAuth } from "../../lib/auth";

export default function RegisterPage() {
  const { register } = useAuth();
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", password: "", role: "seeker" as "seeker" | "recruiter",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await register(form);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="flex items-center justify-center py-16 animate-fade-in">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-8 glass-card space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-white">Create an account</h1>
          <p className="text-slate-400 text-sm">Join MatchyAI to find your perfect match</p>
        </div>
        
        {error && <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">{error}</div>}
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-300">First Name</label>
            <input name="firstName" placeholder="John" value={form.firstName} onChange={handleChange} required className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-300">Last Name</label>
            <input name="lastName" placeholder="Doe" value={form.lastName} onChange={handleChange} required className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-300">Email Address</label>
            <input name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-300">Password</label>
            <input name="password" type="password" placeholder="••••••••" value={form.password} onChange={handleChange} required className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-300">I am a...</label>
            <div className="relative">
              <select name="role" value={form.role} onChange={handleChange} className="w-full appearance-none bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer">
                <option value="seeker">Job Seeker</option>
                <option value="recruiter">Recruiter</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>
        </div>
        
        <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2.5 rounded-lg transition-all shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:shadow-[0_0_20px_rgba(79,70,229,0.5)]">
          Create Account
        </button>
      </form>
    </div>
  );
}