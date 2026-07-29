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

  const contentType = res.headers.get("content-type");
  let data: any;
  if (contentType && contentType.includes("application/json")) {
    data = await res.json();
  } else {
    const text = await res.text();
    if (!res.ok) {
      throw new Error(`Server returned error (${res.status}): ${res.statusText || text.slice(0, 100)}`);
    }
    try {
      data = JSON.parse(text);
    } catch {
      throw new Error(`Unexpected non-JSON response from server (${res.status})`);
    }
  }

  if (!res.ok) throw new Error(data?.message || "Request failed");
  return data as T;
}