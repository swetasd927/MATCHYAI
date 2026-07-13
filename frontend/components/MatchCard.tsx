import { Match } from "../types";

export default function MatchCard({ match }: { match: Match }) {
  return (
    <div className="p-6 glass-card hover-lift space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg text-white">{match.name || "Unnamed Candidate"}</h3>
          <p className="text-sm text-slate-400 mt-1 line-clamp-1">{match.experience[0] || "No experience listed"}</p>
        </div>
        <div className="flex flex-col items-end">
          <span className={`text-xl font-bold ${match.matchPercentage > 75 ? "text-green-400" : match.matchPercentage > 50 ? "text-yellow-400" : "text-red-400"}`}>
            {match.matchPercentage}%
          </span>
          <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Match</span>
        </div>
      </div>
      
      <div className="w-full bg-slate-800 rounded-full h-1.5 mb-4">
        <div 
          className={`h-1.5 rounded-full ${match.matchPercentage > 75 ? "bg-green-500" : match.matchPercentage > 50 ? "bg-yellow-500" : "bg-red-500"}`} 
          style={{ width: `${match.matchPercentage}%` }}
        ></div>
      </div>
      
      <div>
        <div className="flex flex-wrap gap-2">
          {match.skills.slice(0, 6).map(skill => (
            <span key={skill} className="px-2.5 py-1 text-xs font-medium bg-slate-800/80 text-slate-300 rounded-full border border-slate-700">
              {skill}
            </span>
          ))}
          {match.skills.length > 6 && <span className="text-xs text-slate-500 self-center">+{match.skills.length - 6} more</span>}
        </div>
      </div>
    </div>
  );
}