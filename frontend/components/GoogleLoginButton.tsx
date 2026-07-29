"use client";

import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "../lib/auth";
import { UserRole } from "../types";
import { useState } from "react";
import { apiFetch } from "../lib/api";

export default function GoogleLoginButton({
  role,
  onError,
}: {
  role?: UserRole;
  onError?: (err: string) => void;
}) {
  const { loginWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);
  const [popupBlocked, setPopupBlocked] = useState(false);

  const directGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      try {
        const data = await apiFetch<{ token: string; user: any }>("/users/google-login", {
          method: "POST",
          body: JSON.stringify({
            credential: tokenResponse.access_token,
            role,
          }),
        });
        if (typeof window !== "undefined") {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          window.location.href = data.user.role === "recruiter" ? "/recruiter" : "/seeker";
        }
      } catch (err) {
        if (onError) onError((err as Error).message || "Google authentication failed.");
      } finally {
        setLoading(false);
      }
    },
    onError: () => {
      if (onError) onError("Google Sign-In failed or was blocked by browser settings.");
    },
  });

  return (
    <div className="w-full flex flex-col items-center gap-2">
      <div className="w-full flex justify-center">
        <GoogleLogin
          onSuccess={async (credentialResponse) => {
            if (credentialResponse.credential) {
              setLoading(true);
              try {
                await loginWithGoogle(credentialResponse.credential, role);
              } catch (err) {
                if (onError) onError((err as Error).message || "Google authentication failed.");
              } finally {
                setLoading(false);
              }
            }
          }}
          onError={() => {
            setPopupBlocked(true);
            if (onError)
              onError(
                "Google popup was blocked by your browser. Click 'Direct Google Login' below.",
              );
          }}
          useOneTap={false}
          auto_select={false}
          theme="filled_black"
          shape="rectangular"
          width="340"
          text="continue_with"
        />
      </div>

      {popupBlocked && (
        <button
          type="button"
          onClick={() => directGoogleLogin()}
          className="w-full max-w-[340px] py-2 px-3 text-xs rounded-lg border border-orange-800/60 bg-stone-900 text-orange-300 hover:bg-stone-800 transition-colors flex items-center justify-center gap-2"
        >
          <span>Popup blocked? Click for Direct Google Login</span>
        </button>
      )}

      {loading && (
        <p className="text-xs text-orange-400 animate-pulse">Authenticating with Google...</p>
      )}
    </div>
  );
}
