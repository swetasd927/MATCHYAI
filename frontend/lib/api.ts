const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";//fallback

export async function apiFetch<T>(path: string, options: RequestInit = {}):Promise<T>{
    const token = typeof window !=="undefined" ? localStorage.getItem("token") : null;
   
   const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      ...(options.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const data = await res.json();
  if(!res.ok) throw new Error(data.message || "Request failed");
  return data as T;    
}