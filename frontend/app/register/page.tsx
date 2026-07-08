"use client";
import { useState } from "react";
import { useAuth } from "@/lib/auth";

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
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-16 p-6 border rounded bg-white space-y-4">
      <h1 className="text-2xl font-semibold">Register</h1>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <input name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
      <input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
      <select name="role" value={form.role} onChange={handleChange} className="w-full border rounded px-3 py-2">
        <option value="seeker">Job Seeker</option>
        <option value="recruiter">Recruiter</option>
      </select>
      <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded">Create account</button>
    </form>
  );
}