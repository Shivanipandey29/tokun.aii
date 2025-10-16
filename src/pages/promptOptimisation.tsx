// // // src/pages/PromptOptimization.tsx
// // import { useEffect, useState } from "react";
// // import { useLocation, useNavigate } from "react-router-dom";
// // import { useAuth } from "@/contexts/AuthContext";

// // import Header from "@/components/Header";
// // import PromptInput from "@/components/PromptInput";
// // import SuggestionsPanel from "@/components/SuggestionsPanel";
// // import TokenCircle from "@/components/TokenCircle";
// // import ApiKeyModal from "@/components/ApiKeyModal";
// // import TokenUsageSection from "@/components/TokenUsageSection";
// // import LLMSelector from "@/components/LLMSelector";
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Button } from "@/components/ui/button";
// // import { ArrowRight, Sparkles } from "lucide-react";
// // import { toast } from "@/components/ui/use-toast";
// // import { llmService } from "@/services/llmService";
// // // src/pages/PromptOptimization.tsx
// // import AppNavigation from "@/components/AppNavigation"; // ⬅️ add this

// // type NavState = { initialText?: string } | null;

// // const isExtensionContext = typeof chrome !== "undefined" && chrome.storage && chrome.storage.local;
// // const getChromeStorage = (key: string, def: any): Promise<any> =>
// //   new Promise((resolve) => {
// //     if (isExtensionContext) {
// //       chrome.storage.local.get([key], (res) => resolve(res[key] !== undefined ? res[key] : def));
// //     } else {
// //       const v = localStorage.getItem(key);
// //       resolve(v !== null ? JSON.parse(v) : def);
// //     }
// //   });
// // const setChromeStorage = (key: string, value: any) => {
// //   if (isExtensionContext) chrome.storage.local.set({ [key]: value });
// //   else localStorage.setItem(key, JSON.stringify(value));
// // };

// // export default function PromptOptimizationPage() {
// //   const { isAuthenticated } = useAuth();
// //   const navigate = useNavigate();
// //   const location = useLocation();
// //   const navState = (location.state as NavState) || null;

// //   const [apiKeyModalOpen, setApiKeyModalOpen] = useState(false);
// //   const [isKeySet, setIsKeySet] = useState(false);
// //   const [tokenLimit, setTokenLimit] = useState(100000);
// //   const [totalTokensUsed, setTotalTokensUsed] = useState(0);

// //   const [promptText] = useState(navState?.initialText || "");
// //   const [originalTokens, setOriginalTokens] = useState(0);
// //   const [originalWords, setOriginalWords] = useState(0);
// //   const [optimizedText, setOptimizedText] = useState("");
// //   const [optimizedTokens, setOptimizedTokens] = useState(0);
// //   const [optimizedWords, setOptimizedWords] = useState(0);
// //   const [suggestions, setSuggestions] = useState<string[]>([]);

// //   useEffect(() => {
// //     if (!isAuthenticated) navigate("/login");
// //   }, [isAuthenticated, navigate]);

// //   useEffect(() => {
// //     const cfg = llmService.getConfig();
// //     setIsKeySet(!!cfg.apiKey);
// //     if (!cfg.apiKey) setApiKeyModalOpen(true);

// //     (async () => {
// //       const savedTokens = await getChromeStorage("total_tokens_used", 0);
// //       setTotalTokensUsed(Number(savedTokens));
// //       const savedLimit = await getChromeStorage("token_limit", 100000);
// //       setTokenLimit(Number(savedLimit));
// //     })();
// //   }, []);

// //   useEffect(() => {
// //     const remaining = tokenLimit - totalTokensUsed;
// //     if (remaining <= 10000 && remaining > 0) {
// //       toast({
// //         title: "Token Limit Warning",
// //         description: `You have only ${remaining.toLocaleString()} tokens left in your allocation`,
// //         variant: "destructive",
// //       });
// //     }
// //   }, [totalTokensUsed, tokenLimit]);

// //   const handleTokensChange = (tokens: number, words: number) => {
// //     setOriginalTokens(tokens);
// //     setOriginalWords(words);
// //   };

// //   // change signature to accept usage
// // const handleOptimize = (
// //   text: string,
// //   tokens: number,
// //   words: number,
// //   newSuggestions: string[],
// //   usage?: { prompt: number; completion: number; total: number }
// // ) => {
// //   setOptimizedText(text);
// //   setOptimizedWords(words);
// //   setSuggestions(newSuggestions);

// //   // Use real OpenAI counts (fallback to heuristics if missing)
// //   const orig = (usage?.prompt ?? originalTokens) || 0;
// //   const opt  = (usage?.completion ?? tokens) || 0;

// //   setOriginalTokens(orig);
// //   setOptimizedTokens(opt);

// //   const billed = usage?.total ?? (orig + opt); // or your previous logic
// //   const newTotal = totalTokensUsed + billed;
// //   setTotalTokensUsed(newTotal);
// //   setChromeStorage("total_tokens_used", newTotal);

// //   const reduction = Math.max(0, orig - opt);
// //   const percentReduction = orig > 0 ? Math.round((reduction / orig) * 100) : 0;

// //   toast({
// //     title: "Prompt Optimized",
// //     description: `Reduced by ${reduction} tokens (${percentReduction}%)`,
// //   });
// // };

// // // ensure you pass the new handler to <PromptInput onOptimize={handleOptimize} ... />


// //   const onSetApi = () => setApiKeyModalOpen(true);
// //   const onAdjustLimit = () => {
// //     const newLimit = parseInt(prompt("Enter new token limit:", tokenLimit.toString()) || String(tokenLimit));
// //     if (!isNaN(newLimit) && newLimit > 0) {
// //       setTokenLimit(newLimit);
// //       setChromeStorage("token_limit", newLimit);
// //       toast({ title: "Token limit updated", description: `New limit: ${newLimit.toLocaleString()} tokens` });
// //     }
// //   };
// //   const onResetCount = () => {
// //     if (confirm("Reset total token count?")) {
// //       setTotalTokensUsed(0);
// //       setChromeStorage("total_tokens_used", 0);
// //       toast({ title: "Token count reset", description: "Total token count has been reset to zero" });
// //     }
// //   };

// //   if (!isAuthenticated) return null;

// //   return (
// //     <div className="dark min-h-screen text-foreground" style={{ backgroundColor: "#030406" }}>
// //       <div className="container mx-auto px-4 py-6">
// //         <Header />
                    
// //         {/* Centered title + centered token usage */}
// //         <div className="mt-8 text-center">
// //              <div className="flex justify-center">
// //             <TokenUsageSection totalTokensUsed={totalTokensUsed} tokenLimit={tokenLimit} />
// //           </div>
// //            <h2
// //     style={{
// //       fontFamily: "Inter",
// //       fontWeight: 600, // Semi Bold
// //       fontStyle: "normal",
// //       fontSize: 32,
// //       lineHeight: "100%",
// //       letterSpacing: 0,
// //       color: "#ffffff",
// //       marginTop: 12,
// //       marginBottom: 8,
// //     }}
// //   >
// //     Prompt Optimization Dashboard
// //   </h2>
// //            <p
// //     style={{
// //       fontFamily: "Gilroy",
// //       fontWeight: 500, // Medium
// //       fontStyle: "medium",
// //       fontSize: 14,
// //       lineHeight: "100%",
// //       letterSpacing: 0,
// //       color: "#ffffff",
// //       marginBottom: 6,
// //     }}
// //   >
// //     Reduce token usage while preserving meaning across multiple LLMs
// //   </p>

// //           {/* Center TokenUsageSection */}
// //           <p
// //     style={{
// //       fontFamily: "Gilroy",
// //       fontWeight: 500, // Medium
// //       fontStyle: "medium",
// //       fontSize: 16,
// //       lineHeight: "100%",
// //       letterSpacing: 0,
// //       color: "#ffffff",
// //     }}
// //   >
// //     Multi-LLM Prompt Optimizer
// //   </p>
// //         </div>

// // <div className="mt-4 flex justify-center">
// //   <AppNavigation />
// // </div>
// // {/* <div className="mt-4 flex justify-end">
// //   <LLMSelector className="w-full max-w-xs" />
// // </div> */}

// //         {/* Main grid */}
// //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
// //           {/* Main panel */}
// //           <div className="lg:col-span-2 space-y-8">
// //            <Card className="bg-transparent border-none shadow-none">
             
// //               <CardContent className="pt-6">
// //                 <PromptInput
// //                   onTokensChange={handleTokensChange}
// //                   onOptimize={handleOptimize}
// //                   initialText={promptText}
// //                 />

              

            
// //               </CardContent>
// //             </Card>

// //             <div className="hidden lg:block">
// //               <SuggestionsPanel
// //                 suggestions={suggestions}
// //                 originalTokens={originalTokens}
// //                 optimizedTokens={optimizedTokens}
// //               />
// //             </div>
// //           </div>

// //           {/* Side panel */}
// //           <div className="space-y-8">
// //             <Card className="bg-[#121213] border-none shadow-lg py-6 hover:shadow-tokun/10 transition-shadow">
// //               <CardHeader className="pb-2">
// //                 <CardTitle className="text-lg text-center text-tokun"></CardTitle>
// //               </CardHeader>
// //               <CardContent>
// //                 <TokenCircle   originalTokens={originalTokens}
// //   optimizedTokens={optimizedTokens}
// //   optimizedWords={optimizedWords} 
// //   />
// //               </CardContent>
// //             </Card>

// //             <Card className="border-none shadow-lg w-full" style={{ backgroundColor: "#121213" }}>
// //               <CardHeader className="pb-2">
// //                 <CardTitle className="text-center text-white text-xl font-semibold">Quick Actions</CardTitle>
// //               </CardHeader>
// //               <CardContent className="space-y-3 flex flex-col items-center">
// //                 {[
// //                   isKeySet ? "Update API Settings" : "Set API Settings",
// //                   "Adjust Token Limit",
// //                   "Reset Token Count",
// //                 ].map((text, index) => (
// //                   <Button
// //                     key={index}
// //                     className="w-full max-w-[500px] h-[50px] rounded-[16px] border border-[#282829] bg-transparent text-white justify-start pl-5 hover:bg-white/5"
// //                     variant="ghost"
// //                     onClick={() => {
// //                       if (index === 0) onSetApi();
// //                       else if (index === 1) onAdjustLimit();
// //                       else onResetCount();
// //                     }}
// //                   >
// //                     {text}
// //                   </Button>
// //                 ))}
// //               </CardContent>
// //             </Card>

// //             <div className="block lg:hidden">
// //               <SuggestionsPanel
// //                 suggestions={suggestions}
// //                 originalTokens={originalTokens}
// //                 optimizedTokens={optimizedTokens}
// //               />
// //             </div>
// //           </div>
// //         </div>

// //         <footer className="py-8 mt-8 text-center text-sm text-muted-foreground">
// //           <p>© 2025 TOKUN. All rights reserved.</p>
// //         </footer>
// //       </div>

// //       <ApiKeyModal open={apiKeyModalOpen} onOpenChange={setApiKeyModalOpen} onSave={() => setIsKeySet(true)} />
// //     </div>
// //   );
// // }

// // src/pages/PromptOptimization.tsx
// import { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useAuth } from "@/contexts/AuthContext";

// import Header from "@/components/Header";
// import PromptInput from "@/components/PromptInput";
// import SuggestionsPanel from "@/components/SuggestionsPanel";
// import TokenCircle from "@/components/TokenCircle";
// import ApiKeyModal from "@/components/ApiKeyModal";
// import TokenUsageSection from "@/components/TokenUsageSection";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// // src/pages/PromptOptimization.tsx
// import AppNavigation from "@/components/AppNavigation"; // ⬅️ add this
// import { llmService } from "@/services/llmService";

// type NavState = { initialText?: string } | null;

// const isExtensionContext = typeof chrome !== "undefined" && chrome.storage && chrome.storage.local;
// const getChromeStorage = (key: string, def: any): Promise<any> =>
//   new Promise((resolve) => {
//     if (isExtensionContext) {
//       chrome.storage.local.get([key], (res) => resolve(res[key] !== undefined ? res[key] : def));
//     } else {
//       const v = localStorage.getItem(key);
//       resolve(v !== null ? JSON.parse(v) : def);
//     }
//   });
// const setChromeStorage = (key: string, value: any) => {
//   if (isExtensionContext) chrome.storage.local.set({ [key]: value });
//   else localStorage.setItem(key, JSON.stringify(value));
// };

// export default function PromptOptimizationPage() {
//   const { isAuthenticated } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const navState = (location.state as NavState) || null;

//   const [apiKeyModalOpen, setApiKeyModalOpen] = useState(false);
//   const [isKeySet, setIsKeySet] = useState(false);
//   const [tokenLimit, setTokenLimit] = useState(100000);
//   const [totalTokensUsed, setTotalTokensUsed] = useState(0);

//   const [promptText] = useState(navState?.initialText || "");
//   const [originalTokens, setOriginalTokens] = useState(0);
//   const [originalWords, setOriginalWords] = useState(0);
//   const [optimizedText, setOptimizedText] = useState("");
//   const [optimizedTokens, setOptimizedTokens] = useState(0);
//   const [optimizedWords, setOptimizedWords] = useState(0);
//   const [suggestions, setSuggestions] = useState<string[]>([]);

//   useEffect(() => {
//     if (!isAuthenticated) navigate("/login");
//   }, [isAuthenticated, navigate]);

//   useEffect(() => {
//     const cfg = llmService.getConfig();
//     setIsKeySet(!!cfg.apiKey);
//     if (!cfg.apiKey) setApiKeyModalOpen(true);

//     (async () => {
//       const savedTokens = await getChromeStorage("total_tokens_used", 0);
//       setTotalTokensUsed(Number(savedTokens));
//       const savedLimit = await getChromeStorage("token_limit", 100000);
//       setTokenLimit(Number(savedLimit));
//     })();
//   }, []);

//   // Removed: token warning toast (kept logic if you want to hook a center toast instead)
//   useEffect(() => {
//     const remaining = tokenLimit - totalTokensUsed;
//     if (remaining <= 10000 && remaining > 0) {
//       // no toast
//     }
//   }, [totalTokensUsed, tokenLimit]);

//   const handleTokensChange = (tokens: number, words: number) => {
//     setOriginalTokens(tokens);
//     setOriginalWords(words);
//   };

//   // change signature to accept usage
//   const handleOptimize = (
//     text: string,
//     tokens: number,
//     words: number,
//     newSuggestions: string[],
//     usage?: { prompt: number; completion: number; total: number }
//   ) => {
//     setOptimizedText(text);
//     setOptimizedWords(words);
//     setSuggestions(newSuggestions);

//     // Use real OpenAI counts (fallback to heuristics if missing)
//     const orig = (usage?.prompt ?? originalTokens) || 0;
//     const opt = (usage?.completion ?? tokens) || 0;

//     setOriginalTokens(orig);
//     setOptimizedTokens(opt);

//     const billed = usage?.total ?? (orig + opt);
//     const newTotal = totalTokensUsed + billed;
//     setTotalTokensUsed(newTotal);
//     setChromeStorage("total_tokens_used", newTotal);

//     // Removed: success toast about reduction
//   };

//   const onSetApi = () => setApiKeyModalOpen(true);

//   const onAdjustLimit = () => {
//     const newLimit = parseInt(prompt("Enter new token limit:", tokenLimit.toString()) || String(tokenLimit));
//     if (!isNaN(newLimit) && newLimit > 0) {
//       setTokenLimit(newLimit);
//       setChromeStorage("token_limit", newLimit);
//       // Removed: toast "Token limit updated"
//     }
//   };

//   const onResetCount = () => {
//     if (confirm("Reset total token count?")) {
//       setTotalTokensUsed(0);
//       setChromeStorage("total_tokens_used", 0);
//       // Removed: toast "Token count reset"
//     }
//   };

//   if (!isAuthenticated) return null;

//   return (
//     <div className="dark min-h-screen text-foreground" style={{ backgroundColor: "#030406" }}>
//       <div className="container mx-auto px-4 py-6">
//         <Header />

//         {/* Centered title + centered token usage */}
//         <div className="mt-8 text-center">
//           <div className="flex justify-center">
//             <TokenUsageSection totalTokensUsed={totalTokensUsed} tokenLimit={tokenLimit} />
//           </div>
//           <h2
//             style={{
//               fontFamily: "Inter",
//               fontWeight: 600,
//               fontStyle: "normal",
//               fontSize: 32,
//               lineHeight: "100%",
//               letterSpacing: 0,
//               color: "#ffffff",
//               marginTop: 12,
//               marginBottom: 8,
//             }}
//           >
//             Prompt Optimization Dashboard
//           </h2>
//           <p
//             style={{
//               fontFamily: "Gilroy",
//               fontWeight: 500,
//               fontStyle: "medium",
//               fontSize: 14,
//               lineHeight: "100%",
//               letterSpacing: 0,
//               color: "#ffffff",
//               marginBottom: 6,
//             }}
//           >
//             Reduce token usage while preserving meaning across multiple LLMs
//           </p>

//           <p
//             style={{
//               fontFamily: "Gilroy",
//               fontWeight: 500,
//               fontStyle: "medium",
//               fontSize: 16,
//               lineHeight: "100%",
//               letterSpacing: 0,
//               color: "#ffffff",
//             }}
//           >
//             Multi-LLM Prompt Optimizer
//           </p>
//         </div>

//         <div className="mt-4 flex justify-center">
//           <AppNavigation />
//         </div>

//         {/* Main grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
//           {/* Main panel */}
//           <div className="lg:col-span-2 space-y-8">
//             <Card className="bg-transparent border-none shadow-none">
//               <CardContent className="pt-6">
//                 <PromptInput
//                   onTokensChange={handleTokensChange}
//                   onOptimize={handleOptimize}
//                   initialText={promptText}
//                 />
//               </CardContent>
//             </Card>

//             <div className="hidden lg:block">
//               <SuggestionsPanel
//                 suggestions={suggestions}
//                 originalTokens={originalTokens}
//                 optimizedTokens={optimizedTokens}
//               />
//             </div>
//           </div>

//           {/* Side panel */}
//           <div className="space-y-8">
//             <Card className="bg-[#121213] border-none shadow-lg py-6 hover:shadow-tokun/10 transition-shadow">
//               <CardHeader className="pb-2">
//                 <CardTitle className="text-lg text-center text-tokun"></CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <TokenCircle
//                   originalTokens={originalTokens}
//                   optimizedTokens={optimizedTokens}
//                   optimizedWords={optimizedWords}
//                 />
//               </CardContent>
//             </Card>

//             <Card className="border-none shadow-lg w-full" style={{ backgroundColor: "#121213" }}>
//               <CardHeader className="pb-2">
//                 <CardTitle className="text-center text-white text-xl font-semibold">Quick Actions</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-3 flex flex-col items-center">
//                 {[
//                   isKeySet ? "Update API Settings" : "Set API Settings",
//                   "Adjust Token Limit",
//                   "Reset Token Count",
//                 ].map((text, index) => (
//                   <Button
//                     key={index}
//                     className="w-full max-w-[500px] h-[50px] rounded-[16px] border border-[#282829] bg-transparent text-white justify-start pl-5 hover:bg-white/5"
//                     variant="ghost"
//                     onClick={() => {
//                       if (index === 0) onSetApi();
//                       else if (index === 1) onAdjustLimit();
//                       else onResetCount();
//                     }}
//                   >
//                     {text}
//                   </Button>
//                 ))}
//               </CardContent>
//             </Card>

//             <div className="block lg:hidden">
//               <SuggestionsPanel
//                 suggestions={suggestions}
//                 originalTokens={originalTokens}
//                 optimizedTokens={optimizedTokens}
//               />
//             </div>
//           </div>
//         </div>

//         <footer className="py-8 mt-8 text-center text-sm text-muted-foreground">
//           <p>© 2025 TOKUN. All rights reserved.</p>
//         </footer>
//       </div>

//       <ApiKeyModal open={apiKeyModalOpen} onOpenChange={setApiKeyModalOpen} onSave={() => setIsKeySet(true)} />
//     </div>
//   );
// }


// src/pages/PromptOptimization.tsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { usePrompt } from "@/contexts/PromptContext"; 

import Header from "@/components/Header";
import PromptInput from "@/components/PromptInput";
import SuggestionsPanel from "@/components/SuggestionsPanel";
import TokenCircle from "@/components/TokenCircle";
import ApiKeyModal from "@/components/ApiKeyModal";
import TokenUsageSection from "@/components/TokenUsageSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// src/pages/PromptOptimization.tsx
import AppNavigation from "@/components/AppNavigation"; // ⬅️ add this
import { llmService } from "@/services/llmService";

type NavState = { initialText?: string } | null;

const isExtensionContext = typeof chrome !== "undefined" && chrome.storage && chrome.storage.local;
const getChromeStorage = (key: string, def: any): Promise<any> =>
  new Promise((resolve) => {
    if (isExtensionContext) {
      chrome.storage.local.get([key], (res) => resolve(res[key] !== undefined ? res[key] : def));
    } else {
      const v = localStorage.getItem(key);
      resolve(v !== null ? JSON.parse(v) : def);
    }
  });
const setChromeStorage = (key: string, value: any) => {
  if (isExtensionContext) chrome.storage.local.set({ [key]: value });
  else localStorage.setItem(key, JSON.stringify(value));
};

export default function PromptOptimizationPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const navState = (location.state as NavState) || null;

const [isLoading, setIsLoading] = useState(true); // Add loading state

const { userPrompt, detailedPrompt, setUserPrompt, setDetailedPrompt, clearPrompts } = usePrompt();
const [apiKeyModalOpen, setApiKeyModalOpen] = useState(false);
const [isKeySet, setIsKeySet] = useState(false);
const [tokenLimit, setTokenLimit] = useState(100000);
const [totalTokensUsed, setTotalTokensUsed] = useState(0);

const [promptText, setPromptText] = useState("");
const [originalTokens, setOriginalTokens] = useState(0);
const [originalWords, setOriginalWords] = useState(0);
const [optimizedText, setOptimizedText] = useState("");
const [optimizedTokens, setOptimizedTokens] = useState(0);
const [optimizedWords, setOptimizedWords] = useState(0);
const [suggestions, setSuggestions] = useState<string[]>([]);
const [optimizerInput, setOptimizerInput] = useState("");

useEffect(() => {
  setIsLoading(false); // Set loading to false after auth check
  if (!isAuthenticated) navigate("/login");

  const cfg = llmService.getConfig();
  setIsKeySet(!!cfg.apiKey);
  if (!cfg.apiKey) setApiKeyModalOpen(true);

  (async () => {
    // Restore persisted states
    const savedOptimizerInput = await getChromeStorage("optimizerInput", "");
    const savedOptimizedText = await getChromeStorage("optimizedText", "");
    const savedOriginalTokens = await getChromeStorage("originalTokens", 0);
    const savedOptimizedTokens = await getChromeStorage("optimizedTokens", 0);
    const savedSuggestions = await getChromeStorage("suggestions", []);
    const savedTotalTokensUsed = await getChromeStorage("total_tokens_used", 0);
    const savedTokenLimit = await getChromeStorage("token_limit", 100000);

    setOptimizerInput(savedOptimizerInput);
    setOptimizedText(savedOptimizedText);
    setOriginalTokens(savedOriginalTokens);
    setOptimizedTokens(savedOptimizedTokens);
    setSuggestions(savedSuggestions);
    setTotalTokensUsed(savedTotalTokensUsed);
    setTokenLimit(savedTokenLimit);

    // Sync with navigation state only if present and no prior input
    if (navState?.initialText && !savedOptimizerInput) {
      setOptimizerInput(navState.initialText);
      await setChromeStorage("optimizerInput", navState.initialText);
    }
  })();
}, [isAuthenticated, navigate, navState]);

// Add clear functionality
const handleClear = () => {
  setOptimizerInput("");
  setOptimizedText("");
  setOriginalTokens(0);
  setOptimizedTokens(0);
  setSuggestions([]);
  setChromeStorage("optimizerInput", "");
  setChromeStorage("optimizedText", "");
  setChromeStorage("originalTokens", 0);
  setChromeStorage("optimizedTokens", 0);
  setChromeStorage("suggestions", []);
  clearPrompts(); // Optional: clear PromptContext if needed
};
  const handleTokensChange = (tokens: number, words: number) => {
    setOriginalTokens(tokens);
    setOriginalWords(words);
  };

  // change signature to accept usage
  const handleOptimize = (
    text: string,
    tokens: number,
    words: number,
    newSuggestions: string[],
    usage?: { prompt: number; completion: number; total: number }
  ) => {
    setDetailedPrompt(text);
    setOptimizedWords(words);
    setSuggestions(newSuggestions);

    // Use real OpenAI counts (fallback to heuristics if missing)
    const orig = (usage?.prompt ?? originalTokens) || 0;
    const opt = (usage?.completion ?? tokens) || 0;

    setOriginalTokens(orig);
    setOptimizedTokens(opt);

    const billed = usage?.total ?? (orig + opt);
    const newTotal = totalTokensUsed + billed;
    setTotalTokensUsed(newTotal);
    setChromeStorage("total_tokens_used", newTotal);

    // Removed: success toast about reduction
  };

  const onSetApi = () => setApiKeyModalOpen(true);

  const onAdjustLimit = () => {
    const newLimit = parseInt(prompt("Enter new token limit:", tokenLimit.toString()) || String(tokenLimit));
    if (!isNaN(newLimit) && newLimit > 0) {
      setTokenLimit(newLimit);
      setChromeStorage("token_limit", newLimit);
      // Removed: toast "Token limit updated"
    }
  };

  const onResetCount = () => {
    if (confirm("Reset total token count?")) {
      setTotalTokensUsed(0);
      setChromeStorage("total_tokens_used", 0);
      // Removed: toast "Token count reset"
    }
  };

  if (!isAuthenticated && !isLoading) return null;

  return (
    <div className="dark min-h-screen text-foreground" style={{ backgroundColor: "#030406" }}>
      <div className="container mx-auto px-4 py-6">
        <Header />

        {/* Centered title + centered token usage */}
        <div className="mt-8 text-center">
        <div className="flex justify-center">
          <TokenUsageSection totalTokensUsed={totalTokensUsed} tokenLimit={tokenLimit} />
        </div>

        <h2
          style={{
            fontFamily: "Inter",
            fontWeight: 600,
            fontStyle: "normal",
            fontSize: 32,
            lineHeight: "100%",
            letterSpacing: 0,
            color: "#ffffff",
            marginTop: 12,
            marginBottom: 8,
          }}
        >
          Prompt Optimization Dashboard
        </h2>
        <p
          style={{
            fontFamily: "Gilroy",
            fontWeight: 500,
            fontStyle: "medium",
            fontSize: 14,
            lineHeight: "100%",
            letterSpacing: 0,
            color: "#ffffff",
            marginBottom: 6,
          }}
        >
          Reduce token usage while preserving meaning across multiple LLMs
        </p>

        <p
          style={{
            fontFamily: "Gilroy",
            fontWeight: 500,
            fontStyle: "medium",
            fontSize: 16,
            lineHeight: "100%",
            letterSpacing: 0,
            color: "#ffffff",
          }}
        >
          Multi-LLM Prompt Optimizer
        </p>
        </div>

        <div className="mt-4 flex justify-center">
          <AppNavigation />
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Main panel */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="bg-transparent border-none shadow-none">
             <CardContent className="pt-6">
              <PromptInput
                 onTokensChange={handleTokensChange}
                 onOptimize={handleOptimize}
                 initialText={optimizerInput || ""}
                 onChange={(text) => setDetailedPrompt(text)} // Updated to manage local state
              />
          
            </CardContent>
            </Card>

            <div className="hidden lg:block">
              <SuggestionsPanel
                suggestions={suggestions}
                originalTokens={originalTokens}
                optimizedTokens={optimizedTokens}
              />
            </div>
          </div>

          {/* Side panel */}
          <div className="space-y-8">
            <Card className="bg-[#121213] border-none shadow-lg py-6 hover:shadow-tokun/10 transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-center text-tokun"></CardTitle>
              </CardHeader>
              <CardContent>
                <TokenCircle
                  originalTokens={originalTokens}
                  optimizedTokens={optimizedTokens}
                  optimizedWords={optimizedWords}
                />
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg w-full" style={{ backgroundColor: "#121213" }}>
              <CardHeader className="pb-2">
                <CardTitle className="text-center text-white text-xl font-semibold">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 flex flex-col items-center">
                {[
                  isKeySet ? "Update API Settings" : "Set API Settings",
                  "Adjust Token Limit",
                  "Reset Token Count",
                ].map((text, index) => (
                  <Button
                    key={index}
                    className="w-full max-w-[500px] h-[50px] rounded-[16px] border border-[#282829] bg-transparent text-white justify-start pl-5 hover:bg-white/5"
                    variant="ghost"
                    onClick={() => {
                      if (index === 0) onSetApi();
                      else if (index === 1) onAdjustLimit();
                      else onResetCount();
                    }}
                  >
                    {text}
                  </Button>
                ))}
              </CardContent>
            </Card>

            <div className="block lg:hidden">
              <SuggestionsPanel
                suggestions={suggestions}
                originalTokens={originalTokens}
                optimizedTokens={optimizedTokens}
              />
            </div>
          </div>
        </div>

        <footer className="py-8 mt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 TOKUN. All rights reserved.</p>
        </footer>
      </div>

      <ApiKeyModal open={apiKeyModalOpen} onOpenChange={setApiKeyModalOpen} onSave={() => setIsKeySet(true)} />
    </div>
  );
}