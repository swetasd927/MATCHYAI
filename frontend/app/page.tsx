import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center px-6 py-32 animate-fade-in">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-8">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
        </span>
        AI-Powered Job Matching
      </div>
      
      <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight mb-6">
        Hire smarter.<br/>
        <span className="text-gradient">Match instantly.</span>
      </h1>
      
      <p className="text-lg text-slate-400 max-w-xl mb-10 leading-relaxed">
        Upload your resume once and let our semantic search engine find the perfect role. 
        Recruiters, find your top candidates in milliseconds.
      </p>
      
      <div className="flex gap-4 items-center">
        <Link href="/register" className="px-8 py-3.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-all shadow-[0_0_20px_rgba(79,70,229,0.4)] hover-lift">
          Start Matching
        </Link>
        <Link href="/login" className="px-8 py-3.5 rounded-full border border-slate-700 hover:bg-slate-800 text-slate-300 font-medium transition-all hover-lift">
          Sign In
        </Link>
      </div>
    </div>
  );
}