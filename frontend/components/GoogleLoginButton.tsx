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
            if (onError) onError("Google Sign-In popup was blocked or closed. Please allow popups for this site.");
          }}
          useOneTap={false}
          theme="filled_black"
          shape="rectangular"
          width="340"
          text="continue_with"
        />
      </div>
      {loading && (
        <p className="text-xs text-orange-400 animate-pulse">Authenticating with Google...</p>
      )}
    </div>
  );
}
