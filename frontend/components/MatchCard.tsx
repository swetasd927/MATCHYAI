import { Match } from "@/types";

export default function MatchCard({ match }: { match: Match }) {
  return (
    <div className="p-4 border rounded bg-white space-y-1">
      <div className="flex justify-between items-center">
        <p className="font-semibold">{match.name || "Unnamed Candidate"}</p>
        <span className="text-sm font-bold text-indigo-600">{match.matchPercentage}% match</span>
      </div>
      <p className="text-sm text-gray-500">{match.skills.join(", ")}</p>
    </div>
  );
}