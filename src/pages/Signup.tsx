// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { useAuth } from "@/contexts/AuthContext";
// import { toast } from "@/components/ui/use-toast";
// import { ChevronLeft, User, Briefcase } from "lucide-react"; // Added icons

// const Signup = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [companyName, setCompanyName] = useState(""); // For Organization
//   const [businessEmail, setBusinessEmail] = useState(""); // For Organization
//   const [isLoading, setIsLoading] = useState(false);
//   const [isIndividual, setIsIndividual] = useState(true); // Toggle state for Individual / Organization
//   const { signup } = useAuth(); 
//   const navigate = useNavigate();

//   const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";




//   //signup integration 
// const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();

//   if (isIndividual && (!name || !email)) {
//     toast({
//       title: "Missing details",
//       description: "Please enter your full name and email.",
//       variant: "destructive",
//     });
//     return;
//   }

//   if (!isIndividual && (!companyName || !businessEmail)) {
//     toast({
//       title: "Missing details",
//       description: "Please enter your company name and business email.",
//       variant: "destructive",
//     });
//     return;
//   }

//   setIsLoading(true);
//   try {
//     // Build request body according to backend spec
//     const body = isIndividual
//       ? {
//           name,               // full name of individual
//           email,              // individual email
//           userType: "IND",    // userType must be IND
//           orgName: null,      // no orgName for IND
//         }
//       : {
//           name: companyName,        // backend expects "name" → use companyName
//           email: businessEmail,     // business email
//           userType: "ORG",          // org flow
//           orgName: companyName,     // backend expects orgName too
//         };

//     const res = await fetch(`${API_BASE}/api/auth/signup/initiate`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(body),
//     });

//     const data = await res.json();
//      console.log("data is " , data)
//     if (!res.ok || !data?.success) {
//       throw new Error(data?.error || "Could not send OTP. Please try again.");
//     }



//     toast({
//       title: "OTP sent",
//       description: "We emailed you a 4-digit code. Enter it to finish signup.",
//     });

//     // Navigate to verify page with proper query params
//   navigate(`/verify-signup?email=${encodeURIComponent(body.email)}&name=${encodeURIComponent(body.name)}`);

//   } catch (err: any) {
//     toast({
//       title: "Signup failed",
//       description: err?.message || "Unexpected error. Please try again.",
//       variant: "destructive",
//     });
//   } finally {
//     setIsLoading(false);
//   }
// };


//   return (
//     <div className="min-h-screen w-full bg-[#030406] text-white flex font-inter">
//       <aside className="hidden lg:block basis-[60%] relative" aria-hidden>
//         <img src="/icons/signup.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
//       </aside>

//       <main className="flex-1 lg:basis-[40%] min-h-screen flex items-center justify-center px-5 sm:px-8 md:px-10">
//         <div className="w-full max-w-[520px]">
//           {/* Back Button */}
//           <div className="mb-6">
//             <Link to="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white">
//               <ChevronLeft className="h-4 w-4" />
//               Back
//             </Link>
//           </div>

//           {/* Header Section */}
//           <h1 className="text-[36px] leading-[1] font-normal text-[#FFFFFF]">
//             Create Account
//           </h1>
//           <p className="mt-2 text-[20px] leading-[1] tracking-[0] font-normal text-white">
//             Already have an account?{" "}
//             <Link to="/login" className="font-medium text-[20px] leading-[1] tracking-[0] text-[#1EAEDB] hover:underline">
//               Sign In
//             </Link>
//           </p>

//           {/* Pill Toggle for Individual / Organization */}
          

//           {/* Social Row */}
//           <div className="mt-6 flex items-center gap-10">
//             {[ 
//               { src: "/icons/go.png", alt: "Google" },
//               { src: "/icons/microsoft.png", alt: "Microsoft" },
//               { src: "/icons/facebook.png", alt: "Facebook" },
//               { src: "/icons/apple.png", alt: "Apple" }
//             ].map((p) => (
//               <button
//                 key={p.alt}
//                 type="button"
//                 className="h-12 w-12 rounded-full bg-white flex items-center justify-center shadow-sm hover:opacity-90 transition"
//                 aria-label={`Continue with ${p.alt}`}
//               >
//                 <img src={p.src} alt="" className="h-6 w-6" />
//               </button>
//             ))}
//           </div>
// <div className="my-6 flex items-center gap-4"> <div className="h-px flex-1 bg-[#282C42]" /> <div className="h-[30px] w-[30px] rounded-full border border-[#282C42] text-[#FFFFFF] text-[12px] flex items-center justify-center"> OR </div> <div className="h-px flex-1 bg-[#282C42]" /> </div>
            
// {/* pill */}



//           {/* Form */}
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="mt-6 flex gap-4">
//             <button
//               onClick={() => setIsIndividual(true)}
//               className={`${
//                 isIndividual ? "bg-gradient-to-r from-[#7D4DFF] via-[#A24BFF] to-[#FF2CC3]" : "bg-[#17171A]"
//               } w-[169px] h-[40px] rounded-full text-white flex items-center justify-center gap-5 transition`}
//               style={{
//                 paddingTop: "10.5px",
//                 paddingRight: "14px",
//                 paddingBottom: "10.5px",
//                 paddingLeft: "14px",
//                 opacity: 1,
//               }}
//             >
//               <User className="h-5 w-5" />
//               Individual
//             </button>
//             <button
//               onClick={() => setIsIndividual(false)}
//               className={`${
//                 !isIndividual ? "bg-gradient-to-r from-[#7D4DFF] via-[#A24BFF] to-[#FF2CC3]" : "bg-[#17171A]"
//               } w-[169px] h-[40px] rounded-full text-white flex items-center justify-center gap-5 transition`}
//               style={{
//                 paddingTop: "10.5px",
//                 paddingRight: "14px",
//                 paddingBottom: "10.5px",
//                 paddingLeft: "14px",
//                 opacity: 1,
//               }}
//             >
//               <Briefcase className="h-5 w-5" />
//               Organization
//             </button>
//           </div>




//             {isIndividual ? (
//               <>
//                 <div className="space-y-2">
//                   <label htmlFor="name" className="text-sm text-white/80">Full Name</label>
//                   <Input
//                     id="name"
//                     type="text"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     required
//                     className="h-[50px] w-full md:w-[350px] rounded-[6px] bg-[#0F1520] border border-[#282C42] text-white focus-visible:ring-0 focus-visible:outline-none focus:border-[#7D4DFF]/60"
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <label htmlFor="email" className="text-sm text-white/80">Email</label>
//                   <Input
//                     id="email"
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                     className="h-[50px] w-full md:w-[350px] rounded-[6px] bg-[#0F1520] border border-[#282C42] text-white focus-visible:ring-0 focus-visible:outline-none focus:border-[#7D4DFF]/60"
//                   />
//                 </div>
//               </>
//             ) : (
//               <>
//                 <div className="space-y-2">
//                   <label htmlFor="companyName" className="text-sm text-white/80">Company Name</label>
//                   <Input
//                     id="companyName"
//                     type="text"
//                     value={companyName}
//                     onChange={(e) => setCompanyName(e.target.value)}
//                     required
//                     className="h-[50px] w-full md:w-[350px] rounded-[6px] bg-[#0F1520] border border-[#282C42] text-white focus-visible:ring-0 focus-visible:outline-none focus:border-[#7D4DFF]/60"
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <label htmlFor="businessEmail" className="text-sm text-white/80">Business Email</label>
//                   <Input
//                     id="businessEmail"
//                     type="email"
//                     value={businessEmail}
//                     onChange={(e) => setBusinessEmail(e.target.value)}
//                     required
//                     className="h-[50px] w-full md:w-[350px] rounded-[6px] bg-[#0F1520] border border-[#282C42] text-white focus-visible:ring-0 focus-visible:outline-none focus:border-[#7D4DFF]/60"
//                   />
//                 </div>
//               </>
//             )}

//             <Button
//               type="submit"
//               className="w-full md:w-[350px] h-[50px] rounded-[6px] text-[16px] font-normal text-[#FFFFFF] text-center bg-gradient-to-r from-[#7D4DFF] via-[#A24BFF] to-[#FF2CC3] hover:opacity-90"
//             >
//               {isLoading ? "Creating..." : "Continue"}
//             </Button>
//           </form>

//           <p className="mt-6 text-[16px] font-normal text-[#FFFFFF]">
//             Having trouble logging in? Contact us at{" "}
//             <a href="mailto:support@tokun.ai" className="text-transparent bg-clip-text bg-gradient-to-r from-[#7D4DFF] via-[#A24BFF] to-[#FF2CC3] underline underline-offset-4">
//               support@tokun.ai
//             </a>
//           </p>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Signup;




import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";
import { ChevronLeft, User, Briefcase } from "lucide-react";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isIndividual, setIsIndividual] = useState(true);
  const { signup } = useAuth(); // keep if you use elsewhere
  const navigate = useNavigate();

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
  console.log("[ENV] API_BASE =", API_BASE);

  // signup integration
  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (isLoading) return;

  //   // normalize inputs
  //   const nameTrim = name.trim();
  //   const emailNorm = email.trim().toLowerCase();
  //   const companyTrim = companyName.trim();
  //   const businessNorm = businessEmail.trim().toLowerCase();

  //   if (isIndividual && (!nameTrim || !emailNorm)) {
  //     toast({
  //       title: "Missing details",
  //       description: "Please enter your full name and email.",
  //       variant: "destructive",
  //     });
  //     return;
  //   }

  //   if (!isIndividual && (!companyTrim || !businessNorm)) {
  //     toast({
  //       title: "Missing details",
  //       description: "Please enter your company name and business email.",
  //       variant: "destructive",
  //     });
  //     return;
  //   }

  //   setIsLoading(true);
  //   try {
  //     const body = isIndividual
  //       ? {
  //           name: nameTrim,
  //           email: emailNorm,
  //           userType: "IND",
  //           orgName: null,
  //         }
  //       : {
  //           name: companyTrim,      // backend expects "name" → company name for ORG
  //           email: businessNorm,    // business email
  //           userType: "ORG",
  //           orgName: companyTrim,   // backend expects orgName too
  //         };

  //     const url = `${API_BASE}/api/auth/signup/initiate`;
  //     console.log("[SIGNUP] Flow =", isIndividual ? "IND" : "ORG");
  //     console.log("[SIGNUP] POST", url);
  //     console.log("[SIGNUP] Body →", body);

  //     const res = await fetch(url, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(body),
  //     });

  //     const data = await res.json();
  //     console.log("[SIGNUP] Response", res.status, data);

  //     if (!res.ok || !data?.success) {
  //       throw new Error(data?.error || "Could not send OTP. Please try again.");
  //     }

  //     toast({
  //       title: "OTP sent",
  //       description: "We emailed you a 4-digit code. Enter it to finish signup.",
  //     });

  //     const navEmail = isIndividual ? emailNorm : businessNorm;
  //     const navName = isIndividual ? nameTrim : companyTrim;
  //     const navTo = `/verify-signup?email=${encodeURIComponent(navEmail)}&name=${encodeURIComponent(navName)}`;
  //     console.log("[SIGNUP] Navigate →", navTo);
  //     navigate(navTo);
  //   } catch (err: any) {
  //     console.error("[SIGNUP] Error", err);
  //     toast({
  //       title: "Signup failed",
  //       description: err?.message || "Unexpected error. Please try again.",
  //       variant: "destructive",
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };



//   const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();
//   if (isLoading) return;

//   // normalize inputs
//   const nameTrim = name.trim();
//   const emailNorm = email.trim().toLowerCase();
//   const companyTrim = companyName.trim();
//   const businessNorm = businessEmail.trim().toLowerCase();

//   if (isIndividual && (!nameTrim || !emailNorm)) {
//     toast({
//       title: "Missing details",
//       description: "Please enter your full name and email.",
//       variant: "destructive",
//     });
//     return;
//   }

//   if (!isIndividual && (!companyTrim || !businessNorm)) {
//     toast({
//       title: "Missing details",
//       description: "Please enter your company name and business email.",
//       variant: "destructive",
//     });
//     return;
//   }

//   setIsLoading(true);
//   const body = isIndividual
//     ? { name: nameTrim, email: emailNorm, userType: "IND", orgName: null }
//     : { name: companyTrim, email: businessNorm, userType: "ORG", orgName: companyTrim };

//   const url = `${API_BASE}/api/auth/signup/initiate`;

//   console.groupCollapsed("%c[SIGNUP] → initiate", "color:#8ab4f8");
//   console.log("POST", url);
//   console.log("Request body:", body);

//   try {
//     const res = await fetch(url, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(body),
//     });

//     const data = await res.json();
//     console.log("Status:", res.status);
//     console.log("Response JSON:", data);

//     if (!res.ok || !data?.success) {
//       throw new Error(data?.error || "Could not send OTP. Please try again.");
//     }

//     // Show OTP in dev to verify end-to-end
//     if (data.otp) {
//       console.log("%c[DEV ONLY] OTP:", "color:#34d399;font-weight:bold", data.otp);
//     }

//     toast({
//       title: "OTP sent",
//       description: "We emailed you a 4-digit code. Enter it to finish signup.",
//     });

//     const navEmail = isIndividual ? emailNorm : businessNorm;
//     const navName = isIndividual ? nameTrim : companyTrim;
//     const navTo = `/verify-signup?email=${encodeURIComponent(navEmail)}&name=${encodeURIComponent(navName)}`;
//     console.log("Navigate →", navTo);
//     console.groupEnd();

//     navigate(navTo);
//   } catch (err: any) {
//     console.error("[SIGNUP] Error:", err);
//     toast({
//       title: "Signup failed",
//       description: err?.message || "Unexpected error. Please try again.",
//       variant: "destructive",
//     });
//     console.groupEnd();
//   } finally {
//     setIsLoading(false);
//   }
// };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (isLoading) return;

  const nameTrim = name.trim();
  const emailNorm = email.trim().toLowerCase();
  const companyTrim = companyName.trim();
  const businessNorm = businessEmail.trim().toLowerCase();

  if (isIndividual && (!nameTrim || !emailNorm)) {
    toast({ title: "Missing details", description: "Please enter your full name and email.", variant: "destructive" });
    return;
  }
  if (!isIndividual && (!companyTrim || !businessNorm)) {
    toast({ title: "Missing details", description: "Please enter your company name and business email.", variant: "destructive" });
    return;
  }

  setIsLoading(true);

  const body = isIndividual
    ? { name: nameTrim, email: emailNorm, userType: "IND", orgName: null }
    : { name: companyTrim, email: businessNorm, userType: "ORG", orgName: companyTrim };

  const url = `${API_BASE}/api/auth/signup/initiate`;
  const debug = localStorage.getItem("DEBUG_HTTP") === "1";
  const t0 = performance.now();

  console.groupCollapsed("%c[SIGNUP] → initiate", "color:#8ab4f8");
  console.log("POST", url);
  console.log("Request body:", body);

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      credentials: "include",
    });

    const raw = await res.text(); // read raw first (useful if server returns HTML on errors)
    let data: any = {};
    try { data = JSON.parse(raw); } catch { /* non-JSON response */ }

    const t1 = performance.now();

    console.log("Status:", res.status, res.ok ? "(OK)" : "(ERR)");
    if (debug) {
      console.log("Raw response:", raw);
      console.log("Parsed JSON:", data);
      console.log(`Network time: ${(t1 - t0).toFixed(1)} ms`);
      console.log("x-request-id:", res.headers.get("x-request-id"));
    } else {
      console.log("Parsed JSON:", data);
    }

    if (!res.ok || !data?.success) {
      throw new Error(data?.error || "Could not send OTP. Please try again.");
    }

    // Dev helper: show OTP in console & toast if present
    if (data.otp) {
      console.log("%c[DEV ONLY] OTP:", "color:#34d399;font-weight:bold", data.otp);
      toast({ title: "Dev OTP", description: `Code: ${data.otp}` });
    }

    toast({
      title: "OTP sent",
      description: isIndividual
        ? "We emailed you a 4-digit code. Enter it to finish signup."
        : "We emailed your business email a 4-digit code. Enter it to create your organization.",
    });

    // Build navigation params
    const navEmail = isIndividual ? emailNorm : businessNorm;
    const navName  = isIndividual ? nameTrim : companyTrim;
    const navType  = isIndividual ? "IND" : "ORG";
    const q = new URLSearchParams({
      email: navEmail,
      name: navName,
      userType: navType,
      ...(navType === "ORG" ? { orgName: companyTrim } : {}),
    }).toString();

    // If backend told us the next step, carry it forward too
    if (data.next) {
      console.log("Next step:", data.next);
    }

    const navTo = `/verify-signup?${q}`;
    console.log("Navigate →", navTo);
    console.groupEnd();
    navigate(navTo);
  } catch (err: any) {
    console.error("[SIGNUP] Error:", err);
    toast({
      title: "Signup failed",
      description: err?.message || "Unexpected error. Please try again.",
      variant: "destructive",
    });
    console.groupEnd();
  } finally {
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
          {/* Back Button */}
          <div className="mb-6">
            <Link to="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white">
              <ChevronLeft className="h-4 w-4" />
              Back
            </Link>
          </div>

          {/* Header Section */}
          <h1 className="text-[36px] leading-[1] font-normal text-[#FFFFFF]">Create Account</h1>
          <p className="mt-2 text-[20px] leading-[1] tracking-[0] font-normal text-white">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-[20px] leading-[1] tracking-[0] text-[#1EAEDB] hover:underline">
              Sign In
            </Link>
          </p>

          {/* Social Row */}
          <div className="mt-6 flex items-center gap-10">
            {[
              { src: "/icons/go.png", alt: "Google" },
              { src: "/icons/microsoft.png", alt: "Microsoft" },
              { src: "/icons/facebook.png", alt: "Facebook" },
              { src: "/icons/apple.png", alt: "Apple" },
            ].map((p) => (
              <button
                key={p.alt}
                type="button"
                className="h-12 w-12 rounded-full bg-white flex items-center justify-center shadow-sm hover:opacity-90 transition"
                aria-label={`Continue with ${p.alt}`}
              >
                <img src={p.src} alt="" className="h-6 w-6" />
              </button>
            ))}
          </div>

          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-[#282C42]" />
            <div className="h-[30px] w-[30px] rounded-full border border-[#282C42] text-[#FFFFFF] text-[12px] flex items-center justify-center">
              OR
            </div>
            <div className="h-px flex-1 bg-[#282C42]" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Pill Toggle (now non-submitting) */}
            <div className="mt-6 flex gap-4">
              <button
                type="button" /* important: avoid accidental submit */
                onClick={() => setIsIndividual(true)}
                aria-pressed={isIndividual}
                className={`${isIndividual ? "bg-gradient-to-r from-[#7D4DFF] via-[#A24BFF] to-[#FF2CC3]" : "bg-[#17171A]"} w-[169px] h-[40px] rounded-full text-white flex items-center justify-center gap-5 transition`}
                style={{ paddingTop: "10.5px", paddingRight: "14px", paddingBottom: "10.5px", paddingLeft: "14px", opacity: 1 }}
              >
                <User className="h-5 w-5" />
                Individual
              </button>
              <button
                type="button" /* important: avoid accidental submit */
                onClick={() => setIsIndividual(false)}
                aria-pressed={!isIndividual}
                className={`${!isIndividual ? "bg-gradient-to-r from-[#7D4DFF] via-[#A24BFF] to-[#FF2CC3]" : "bg-[#17171A]"} w-[169px] h-[40px] rounded-full text-white flex items-center justify-center gap-5 transition`}
                style={{ paddingTop: "10.5px", paddingRight: "14px", paddingBottom: "10.5px", paddingLeft: "14px", opacity: 1 }}
              >
                <Briefcase className="h-5 w-5" />
                Organization
              </button>
            </div>

            {isIndividual ? (
              <>
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm text-white/80">Full Name</label>
                  <Input
                    id="name"
                    type="text"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="h-[50px] w-full md:w-[350px] rounded-[6px] bg-[#0F1520] border border-[#282C42] text-white focus-visible:ring-0 focus-visible:outline-none focus:border-[#7D4DFF]/60"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm text-white/80">Email</label>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-[50px] w-full md:w-[350px] rounded-[6px] bg-[#0F1520] border border-[#282C42] text-white focus-visible:ring-0 focus-visible:outline-none focus:border-[#7D4DFF]/60"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <label htmlFor="companyName" className="text-sm text-white/80">Company Name</label>
                  <Input
                    id="companyName"
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                    className="h-[50px] w-full md:w-[350px] rounded-[6px] bg-[#0F1520] border border-[#282C42] text-white focus-visible:ring-0 focus-visible:outline-none focus:border-[#7D4DFF]/60"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="businessEmail" className="text-sm text-white/80">Business Email</label>
                  <Input
                    id="businessEmail"
                    type="email"
                    autoComplete="email"
                    value={businessEmail}
                    onChange={(e) => setBusinessEmail(e.target.value)}
                    required
                    className="h-[50px] w-full md:w-[350px] rounded-[6px] bg-[#0F1520] border border-[#282C42] text-white focus-visible:ring-0 focus-visible:outline-none focus:border-[#7D4DFF]/60"
                  />
                </div>
              </>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full md:w-[350px] h-[50px] rounded-[6px] text-[16px] font-normal text-[#FFFFFF] text-center bg-gradient-to-r from-[#7D4DFF] via-[#A24BFF] to-[#FF2CC3] hover:opacity-90 disabled:opacity-50"
            >
              {isLoading ? "Creating..." : "Continue"}
            </Button>
          </form>

          <p className="mt-6 text-[16px] font-normal text-[#FFFFFF]">
            Having trouble logging in? Contact us at{" "}
            <a href="mailto:support@tokun.ai" className="text-transparent bg-clip-text bg-gradient-to-r from-[#7D4DFF] via-[#A24BFF] to-[#FF2CC3] underline underline-offset-4">
              support@tokun.ai
            </a>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Signup;










