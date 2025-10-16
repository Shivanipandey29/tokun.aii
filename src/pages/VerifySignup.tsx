import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { ChevronLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function VerifySignup() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
   const { persistAuth } = useAuth();
  const email = (params.get("email") || "").trim();
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(50);

  useEffect(() => {
    if (!email) {
      toast({ title: "Missing email", description: "Please go back and signup again.", variant: "destructive" });
      navigate("/signup", { replace: true });
    }
  }, [email, navigate]);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const t = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [secondsLeft]);

  const formatMMSS = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

 

  // const handleSignupVerify = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (otp.length !== 4) return;

  //   setIsLoading(true);
  //   try {
  //     const resp = await fetch(`${API_BASE}/api/auth/signup/verify`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ email, otp }),
  //     });
  //     const json = await resp.json();
  //     if (!resp.ok || !json?.success) throw new Error(json?.error || "Verification failed");

  //   persistAuth(json);  // ✅ updates state + localStorage
  //     toast({ title: "Success", description: "Signup complete. Redirecting..." });
  //     navigate("/smartgen", { replace: true });
  //   } catch (err: any) {
  //     toast({ title: "Verification failed", description: err?.message, variant: "destructive" });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // const handleResend = async () => {
  //   try {
  //     const resp = await fetch(`${API_BASE}/api/auth/signup/initiate`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ email }),
  //     });
  //     const json = await resp.json();
  //     if (!resp.ok || !json?.success) throw new Error(json?.error || "Failed to resend");
  //     toast({ title: "Code resent", description: "Check your inbox." });
  //     setSecondsLeft(50);
  //   } catch (err: any) {
  //     toast({ title: "Could not resend", description: err?.message, variant: "destructive" });
  //   }
  // };


// inside VerifySignup component

const handleSignupVerify = async (e: React.FormEvent) => {
  e.preventDefault();
  if (otp.length !== 4) return;

  setIsLoading(true);
  try {
    const body = { email, otp };
    console.log("[VERIFY] POST body →", body);

    const resp = await fetch(`${API_BASE}/api/auth/signup/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const json = await resp.json();
    console.log("[VERIFY] Response status:", resp.status);
    console.log("[VERIFY] Response json:", json);

    if (!resp.ok || !json?.success) throw new Error(json?.error || "Verification failed");

    // Persist auth (token + user + org etc.)
    persistAuth(json);

    // ✅ Mark first-time admin for SmartGen
if (json?.user?.role === "Admin" || json?.user?.userType === "Admin") {
  localStorage.setItem("showAddMemberPopup", "true");
}
    toast({ title: "Success", description: "Signup complete. Redirecting..." });
    navigate("/smartgen", { replace: true });
  } catch (err: any) {
    console.error("[VERIFY] Error:", err);
    toast({ title: "Verification failed", description: err?.message, variant: "destructive" });
  } finally {
    setIsLoading(false);
  }
};

const handleResend = async () => {
  try {
    const body = { email };
    console.log("[RESEND] POST body →", body);

    const resp = await fetch(`${API_BASE}/api/auth/signup/initiate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const json = await resp.json();
    console.log("[RESEND] Response status:", resp.status);
    console.log("[RESEND] Response json:", json);

    if (!resp.ok || !json?.success) throw new Error(json?.error || "Failed to resend");
    toast({ title: "Code resent", description: "Check your inbox." });
    setSecondsLeft(50);
  } catch (err: any) {
    console.error("[RESEND] Error:", err);
    toast({ title: "Could not resend", description: err?.message, variant: "destructive" });
  }
};


















  return (
    <div className="min-h-screen w-full bg-[#030406] text-white flex font-inter">
      <aside className="hidden lg:block basis-[60%] relative" aria-hidden>
        <img src="/icons/signup.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
      </aside>

      <main className="flex-1 lg:basis-[40%] min-h-screen flex items-center justify-center px-5 sm:px-8 md:px-10">
        <div className="w-full max-w-[520px]">
          <div className="mb-6">
            <Link to="/signup" className="inline-flex items-center gap-2 text-white/70 hover:text-white">
              <ChevronLeft className="h-4 w-4" /> Back
            </Link>
          </div>

          <p className="text-[16px] font-normal text-white">
            Please enter the OTP sent to {email || "your email"}{" "}
            <button onClick={() => navigate("/signup")} className="text-[#1EAEDB] underline underline-offset-4">
              Change
            </button>
          </p>

          <div className="mt-4" />
          <label htmlFor="otp" className="block text-[16px] text-white/80 mb-2">OTP</label>

          <form onSubmit={handleSignupVerify} className="space-y-6">
            <Input
              id="otp"
              type="text"
              inputMode="numeric"
              maxLength={4}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 4))}
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
              <span>Not received your code? <span className="text-[#1EAEDB]">{formatMMSS(secondsLeft)}</span></span>
            ) : (
              <button onClick={handleResend} className="text-[#1EAEDB] underline">Resend code</button>
            )}
          </div>

          <p className="mt-6 text-[16px]">
            Having trouble logging in? Contact us at{" "}
            <a href="mailto:support@tokun.ai" className="text-transparent bg-clip-text bg-gradient-to-r from-[#7D4DFF] via-[#A24BFF] to-[#FF2CC3] underline">
              support@tokun.ai
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
