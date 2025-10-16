




import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
console.log("[ENV] API_BASE =", API_BASE);

const Login = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // const handleRequestOtp = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!email || isLoading) return;

  //   const emailNorm = email.trim().toLowerCase();

  //   setIsLoading(true);
  //   try {
  //     const url = `${API_BASE}/api/auth/login/initiate`;
  //     console.log("[LOGIN] POST", url, { email: emailNorm });

  //     const res = await fetch(url, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ email: emailNorm }),
  //     });

  //     const data = await res.json();
  //     console.log("[LOGIN] Response", res.status, data);

  //     if (!res.ok || !data?.success) {
  //       throw new Error(data?.error || "Could not send OTP. Please try again.");
  //     }

  //     toast({ title: "OTP sent", description: "Check your inbox for the 4-digit code." });

  //     const navTo = `/verify-login?email=${encodeURIComponent(emailNorm)}`;
  //     console.log("[LOGIN] Navigate →", navTo);
  //     navigate(navTo);
  //   } catch (err: any) {
  //     console.error("[LOGIN] Error", err);
  //     toast({
  //       title: "Login failed",
  //       description: err?.message || "Unexpected error. Please try again.",
  //       variant: "destructive",
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };


  const handleRequestOtp = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!email || isLoading) return;

  const emailNorm = email.trim().toLowerCase();

  setIsLoading(true);
  const t0 = performance.now();
  try {
    const url = `${API_BASE}/api/auth/login/initiate`;
    const body = { email: emailNorm };

    console.log("[LOGIN] → POST", url);
    console.log("[LOGIN] → body", body);

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    console.log("[LOGIN] ← status:", res.status);
    console.log("[LOGIN] ← json:", data);

    if (!res.ok || !data?.success) {
      throw new Error(data?.error || "Could not send OTP. Please try again.");
    }

    toast({ title: "OTP sent", description: "Check your inbox for the 4-digit code." });

    const navTo = `/verify-login?email=${encodeURIComponent(emailNorm)}`;
    console.log("[LOGIN] navigate →", navTo);
    navigate(navTo);
  } catch (err: any) {
    console.error("[LOGIN] error:", err);
    toast({
      title: "Login failed",
      description: err?.message || "Unexpected error. Please try again.",
      variant: "destructive",
    });
  } finally {
    const t1 = performance.now();
    console.log(`[LOGIN] completed in ${(t1 - t0).toFixed(1)}ms`);
    setIsLoading(false);
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
            <Link to="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white">Back</Link>
          </div>

          <h1 className="text-[36px] leading-[1] font-normal text-white">Sign In</h1>
          <p className="mt-2 text-[20px] font-normal text-white">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-[#1EAEDB] hover:underline">Create one</Link>
          </p>

          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-[#282C42]" />
            <div className="h-[30px] w-[30px] rounded-full border border-[#282C42] text-[#FFFFFF] text-[12px] flex items-center justify-center">
              OR
            </div>
            <div className="h-px flex-1 bg-[#282C42]" />
          </div>

          <form onSubmit={handleRequestOtp} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm text-white/80">Email</label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="
                  h-[50px] w-full md:w-[350px]
                  rounded-[6px] bg-[#0F1520]
                  border border-[#282C42] text-white
                  focus-visible:ring-0 focus:border-[#7D4DFF]/60
                "
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !email}
              className="
                w-full md:w-[350px] h-[50px] rounded-[6px]
                text-[16px] font-normal text-white
                bg-gradient-to-r from-[#7D4DFF] via-[#A24BFF] to-[#FF2CC3] hover:opacity-90
                disabled:opacity-50
              "
            >
              {isLoading ? "Sending..." : "Request OTP"}
            </button>
          </form>

          <p className="mt-6 text-[16px] font-normal text-white">
            Having trouble logging in? Contact us at{" "}
            <a
              href="mailto:support@tokun.ai"
              className="text-transparent bg-clip-text bg-gradient-to-r from-[#7D4DFF] via-[#A24BFF] to-[#FF2CC3] underline underline-offset-4"
            >
              support@tokun.ai
            </a>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Login;
