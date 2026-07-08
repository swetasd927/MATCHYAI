import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center px-6 py-24">
      <h1 className="text-4xl font-bold mb-4">MatchyAI</h1>
      <p className="text-gray-600 max-w-md mb-8">
        Upload your resume once, get matched with the right jobs using AI-powered semantic search.
      </p>
      <div className="flex gap-4">
        <Link href="/login" className="px-5 py-2 rounded bg-indigo-600 text-white">Login</Link>
        <Link href="/register" className="px-5 py-2 rounded border border-indigo-600 text-indigo-600">Register</Link>
      </div>
    </div>
  );
}