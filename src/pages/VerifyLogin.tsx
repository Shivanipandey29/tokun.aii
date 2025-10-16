

import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { ChevronLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext"; // 👈 import context

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function VerifyLogin() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { persistAuth } = useAuth(); // 👈 use shared persistAuth

  const email = (params.get("email") || "").trim();
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(50);

  useEffect(() => {
    if (!email) {
      toast({
        title: "Missing email",
        description: "Please go back and login again.",
        variant: "destructive",
      });
      navigate("/login", { replace: true });
    }
  }, [email, navigate]);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const t = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [secondsLeft]);

  const formatMMSS = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(
      2,
      "0"
    )}`;
// Inside VerifyLogin.tsx
const handleLoginVerify = async (e: React.FormEvent) => {
  e.preventDefault();
  if (otp.length !== 4) return;

  const T0 = performance.now();

  // ------------ LOG: INPUTS ------------
  console.groupCollapsed(
    "%c[LOGIN/VERIFY] → START",
    "color:#7c3aed;font-weight:700;"
  );
  console.log("[LOGIN/VERIFY] API_BASE:", API_BASE);
  console.log("[LOGIN/VERIFY] Email:", email);
  console.log("[LOGIN/VERIFY] OTP (len):", otp.length);

  setIsLoading(true);
  try {
    const url = `${API_BASE}/api/auth/login/verify`;
    const body = { email, otp };

    // ------------ LOG: REQUEST ------------
    console.groupCollapsed(
      "%c[LOGIN/VERIFY] → POST /api/auth/login/verify",
      "color:#2563eb;font-weight:700;"
    );
    console.log("[LOGIN/VERIFY] URL:", url);
    console.log("[LOGIN/VERIFY] Body:", body);
    console.groupEnd();

    const resp = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    // ------------ LOG: RESPONSE STATUS ------------
    console.groupCollapsed(
      "%c[LOGIN/VERIFY] ← RESPONSE",
      "color:#059669;font-weight:700;"
    );
    console.log("[LOGIN/VERIFY] Status:", resp.status, resp.statusText);

    // Read as text first to catch JSON parse issues
    const raw = await resp.text();
    console.log("[LOGIN/VERIFY] Raw body:", raw);

    let json: any = {};
    try {
      json = JSON.parse(raw);
    } catch (e) {
      console.warn("[LOGIN/VERIFY] JSON parse failed:", e);
    }

    console.log("[LOGIN/VERIFY] Parsed JSON:", json);
    console.groupEnd();

    if (!resp.ok || !json?.success) {
      const errMsg = json?.error || "Verification failed";
      console.error("[LOGIN/VERIFY] ❌ Error:", errMsg);
      throw new Error(errMsg);
    }

    // ------------ LOG: USER + ORG FROM SERVER ------------
    const rawUser = json.user1 || json.user || {};
    const org = json.organization || json.org || null;

    console.groupCollapsed(
      "%c[LOGIN/VERIFY] USER/ORG SNAPSHOT",
      "color:#0ea5e9;font-weight:700;"
    );
    console.log("[LOGIN/VERIFY] rawUser:", rawUser);
    console.log("[LOGIN/VERIFY] organization:", org);
    console.table({
      "rawUser.plan": rawUser?.plan,
      "rawUser.userType": rawUser?.userType,
      "rawUser.orgId": rawUser?.orgId,
      "rawUser.monthlyTokensCap": rawUser?.monthlyTokensCap,
      "rawUser.monthlyTokensUsed": rawUser?.monthlyTokensUsed,
    });
    if (org) {
      console.table({
        "org._id": org?._id,
        "org.plan": org?.plan,
        "org.billingCycle": org?.billingCycle,
        "org.currentPeriodEnd": org?.currentPeriodEnd,
        "org.orgPoolCap": org?.orgPoolCap,
        "org.orgPoolUsed": org?.orgPoolUsed,
        "org.orgExtraTokensRemaining": org?.orgExtraTokensRemaining,
      });
    }
    console.groupEnd();

    // ------------ LOG: MERGE STRATEGY ------------
    const mergedUser = org
      ? {
          ...rawUser,
          plan: org.plan ?? rawUser.plan,
          billingCycle: org.billingCycle ?? rawUser.billingCycle,
          currentPeriodEnd: org.currentPeriodEnd ?? rawUser.currentPeriodEnd,
          orgPoolCap: org.orgPoolCap,
          orgPoolUsed: org.orgPoolUsed,
          orgExtraTokensRemaining: org.orgExtraTokensRemaining ?? 0,
          orgId: rawUser.orgId ?? org._id,
        }
      : rawUser;

    console.groupCollapsed(
      "%c[LOGIN/VERIFY] MERGED USER (what we will persist)",
      "color:#f59e0b;font-weight:700;"
    );
    console.log(mergedUser);
    console.table({
      "merged.plan": mergedUser.plan,
      "merged.billingCycle": mergedUser.billingCycle,
      "merged.currentPeriodEnd": mergedUser.currentPeriodEnd,
      "merged.orgId": mergedUser.orgId,
      "merged.orgPoolCap": mergedUser.orgPoolCap,
      "merged.orgPoolUsed": mergedUser.orgPoolUsed,
      "merged.orgExtraTokensRemaining": mergedUser.orgExtraTokensRemaining,
      "merged.monthlyTokensCap": mergedUser.monthlyTokensCap,
      "merged.monthlyTokensUsed": mergedUser.monthlyTokensUsed,
    });
    console.groupEnd();

    // ------------ LOG: TOKEN PREVIEW ------------
    const tokenPreview = json?.token ? String(json.token).slice(0, 24) + "…" : "(none)";
    console.log("[LOGIN/VERIFY] token preview:", tokenPreview);

    // ------------ PERSIST ONCE ------------
    console.groupCollapsed(
      "%c[LOGIN/VERIFY] persistAuth()",
      "color:#ef4444;font-weight:700;"
    );
    persistAuth({ user: mergedUser, token: json.token });
    console.log("[LOGIN/VERIFY] persistAuth called with merged user & token.");
    console.groupEnd();

    // Verify what went to localStorage after React state settles
    setTimeout(() => {
      try {
        const stored = localStorage.getItem("tokun_user");
        const parsed = stored ? JSON.parse(stored) : null;
        console.groupCollapsed(
          "%c[LOGIN/VERIFY] localStorage check (tokun_user)",
          "color:#10b981;font-weight:700;"
        );
        console.log("raw:", stored);
        console.log("parsed:", parsed);
        console.table({
          "ls.plan": parsed?.plan,
          "ls.billingCycle": parsed?.billingCycle,
          "ls.currentPeriodEnd": parsed?.currentPeriodEnd,
          "ls.userType": parsed?.userType,
          "ls.orgId": parsed?.orgId,
          "ls.orgPoolCap": parsed?.orgPoolCap,
          "ls.orgPoolUsed": parsed?.orgPoolUsed,
          "ls.orgExtraTokensRemaining": parsed?.orgExtraTokensRemaining,
          "ls.monthlyTokensCap": parsed?.monthlyTokensCap,
          "ls.monthlyTokensUsed": parsed?.monthlyTokensUsed,
        });
        console.groupEnd();
      } catch (e) {
        console.warn("[LOGIN/VERIFY] localStorage parse error", e);
      }
    }, 0);

    toast({ title: "Success", description: "Welcome back! Redirecting..." });
    console.log(
      "%c[LOGIN/VERIFY] ✅ COMPLETE — navigating to /smartgen",
      "color:#22c55e;font-weight:700;"
    );
    navigate("/smartgen", { replace: true });
  } catch (err: any) {
    console.error("[LOGIN/VERIFY] ❌ Exception:", err?.message || err);
    toast({
      title: "Verification failed",
      description: err?.message || "Unknown error",
      variant: "destructive",
    });
  } finally {
    setIsLoading(false);
    const T1 = performance.now();
    console.log(
      `%c[LOGIN/VERIFY] ⏱️ finished in ${(T1 - T0).toFixed(1)}ms`,
      "color:#64748b;"
    );
    console.groupEnd(); // END START
  }
};

 

  const handleResend = async () => {
    try {
      const resp = await fetch(`${API_BASE}/api/auth/login/initiate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const json = await resp.json();
      if (!resp.ok || !json?.success)
        throw new Error(json?.error || "Failed to resend");
      toast({ title: "Code resent", description: "Check your inbox." });
      setSecondsLeft(50);
    } catch (err: any) {
      toast({
        title: "Could not resend",
        description: err?.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#030406] text-white flex font-inter">
      <aside className="hidden lg:block basis-[60%] relative" aria-hidden>
        <img
          src="/icons/signup.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      </aside>

      <main className="flex-1 lg:basis-[40%] min-h-screen flex items-center justify-center px-5 sm:px-8 md:px-10">
        <div className="w-full max-w-[520px]">
          <div className="mb-6">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white"
            >
              <ChevronLeft className="h-4 w-4" /> Back
            </Link>
          </div>

          <p className="text-[16px] font-normal text-white">
            Please enter the OTP sent to {email || "your email"}{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-[#1EAEDB] underline underline-offset-4"
            >
              Change
            </button>
          </p>

          <form onSubmit={handleLoginVerify} className="space-y-6 mt-4">
            <Input
              id="otp"
              type="text"
              inputMode="numeric"
              maxLength={4}
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value.replace(/\D/g, "").slice(0, 4))
              }
              required
              className="h-[50px] w-full md:w-[350px] rounded-[6px] bg-[#0F1520] border border-[#282C42] text-white text-center tracking-[8px]"
            />
            <Button
              type="submit"
              disabled={isLoading || otp.length !== 4}
              className="w-full md:w-[350px] h-[50px] rounded-[6px] text-[16px] text-white bg-gradient-to-r from-[#7D4DFF] via-[#A24BFF] to-[#FF2CC3]"
            >
              {isLoading ? "Verifying..." : "Verify"}
            </Button>
          </form>

          <div className="mt-4">
            {secondsLeft > 0 ? (
              <span>
                Not received your code?{" "}
                <span className="text-[#1EAEDB]">{formatMMSS(secondsLeft)}</span>
              </span>
            ) : (
              <button onClick={handleResend} className="text-[#1EAEDB] underline">
                Resend code
              </button>
            )}
          </div>

          <p className="mt-6 text-[16px]">
            Having trouble logging in? Contact us at{" "}
            <a
              href="mailto:support@tokun.ai"
              className="text-transparent bg-clip-text bg-gradient-to-r from-[#7D4DFF] via-[#A24BFF] to-[#FF2CC3] underline"
            >
              support@tokun.ai
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
