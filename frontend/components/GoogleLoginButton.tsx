"use client";

import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../lib/auth";
import { UserRole } from "../types";
import { useState } from "react";

export default function GoogleLoginButton({
  role,
  onError,
}: {
  role?: UserRole;
  onError?: (err: string) => void;
}) {
  const { loginWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);

  return (
    <div className="w-full flex flex-col items-center gap-3">
      <div className="w-full flex justify-center overflow-hidden">
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
            if (onError) onError("Google Sign-In was cancelled or failed.");
          }}
          theme="filled_black"
          shape="pill"
          width="320"
          text="continue_with"
        />
      </div>
      {loading && (
        <p className="text-xs text-stone-400 animate-pulse">Authenticating with Google...</p>
      )}
    </div>
  );
}
