// // // // // import { useState, useEffect, useRef } from "react";
// // // // // import { Button } from "@/components/ui/button";
// // // // // import { Textarea } from "@/components/ui/textarea";
// // // // // import { toast } from "@/components/ui/use-toast";
// // // // // import { Wand2, Copy, Download, ExternalLink, BookOpen, Paperclip, Send } from "lucide-react";
// // // // // import ModalComponent from '@/components/ModalComponent'; 
// // // // // // SmarterPrompt.tsx
// // // // // import { saveItem } from "@/lib/savedCollections";
// // // // // import { useNavigate } from "react-router-dom";
// // // // // import { llmService } from "@/services/llmService";
// // // // // interface SmarterPromptProps {
// // // // //   onPromptGenerated?: (prompt: string) => void;
// // // // //   onUseInOptimizer?: (prompt: string) => void;
// // // // // }
// // // // // const GRADIENT = "linear-gradient(270.19deg, #1A73E8 0.16%, #FF14EF 99.84%)";

// // // // // const CARD_FRAME =
// // // // //   "w-full max-w-[1000px] rounded-[30px] border border-[#282829] bg-[#121213] overflow-hidden";
// // // // // const CARD_HEIGHT = "min-h-[160px] md:h-[200px]";

// // // // // /** Single idea tile sized per spec */
// // // // //  /** ONE tile */
// // // // // const IdeaTile = ({
// // // // //   idea,
// // // // //   active = false,
// // // // //   onClick,
// // // // //   isFirst,
// // // // //   isLast,
// // // // // }: {
// // // // //   idea: { img: string; title: string; text: string };
// // // // //   active?: boolean;
// // // // //   onClick: () => void;
// // // // //   isFirst?: boolean;
// // // // //   isLast?: boolean;
// // // // // }) => {
// // // // //   return (
// // // // //     <button
// // // // //       onClick={onClick}
// // // // //       className={[
// // // // //         "h-[110px] w-[262.5px] shrink-0",
// // // // //         "bg-[#121213]",
// // // // //         "flex items-center gap-3",
// // // // //         "px-5", // left/right padding inside each tile
// // // // //         active ? "bg-white/5" : "hover:bg-white/7",
// // // // //       ].join(" ")}
// // // // //       aria-label={idea.title}
// // // // //       title={idea.title}
// // // // //     >
// // // // //       {/* icon */}
// // // // //       <img src={idea.img} alt="" className="h-6 w-6 object-contain" />

// // // // //       {/* text block */}
// // // // //       <div className="flex flex-col items-start">
// // // // //         <div className="text-white font-semibold leading-[1.1] text-[15px]">
// // // // //           {idea.title}
// // // // //         </div>
// // // // //         <div className="text-white/80 text-[12px] leading-[1.2] mt-[6px]">
// // // // //           {idea.text}
// // // // //         </div>
// // // // //       </div>
// // // // //     </button>
// // // // //   );
// // // // // };

// // // // // /** STRIP that looks exactly like the screenshot */
// // // // // /** STRIP same shape/size as input (used after detailedPrompt exists) */
// // // // // const IdeasStrip = ({
// // // // //   exampleIdeas,
// // // // //   activeIndex,
// // // // //   setActiveIndex,
// // // // //   handleExampleClick,
// // // // // }: {
// // // // //   exampleIdeas: { img: string; title: string; text: string }[];
// // // // //   activeIndex: number;
// // // // //   setActiveIndex: (n: number) => void;
// // // // //   handleExampleClick: (idea: any) => void;
// // // // // }) => {
// // // // //   return (
// // // // //     <div className="mx-auto w-full px-4 font-inter">
// // // // //       {/* frame: responsive width, max 1047.5px, height 110px, r=20 */}
// // // // //       <div className="mx-auto w-full max-w-[1047.5px] h-[110px] rounded-[20px] border border-[#282829] bg-[#121213] overflow-hidden">
// // // // //         {/* small screens: horizontal scroll (hidden scrollbar); md+: fixed grid */}
// // // // //         <div className="h-full overflow-x-auto md:overflow-visible no-scrollbar snap-x snap-mandatory">
// // // // //           {/* keep 4 columns; on very small screens ensure min content width so tiles don't squish */}
// // // // //           <div className="grid grid-cols-[repeat(4,minmax(0,1fr))] h-full min-w-[1040px] md:min-w-0 md:grid-cols-4">
// // // // //             {exampleIdeas.map((idea, idx) => (
// // // // //               <button
// // // // //                 key={idx}
// // // // //                 onClick={() => {
// // // // //                   handleExampleClick(idea);
// // // // //                   setActiveIndex(idx);
// // // // //                 }}
// // // // //                 className={[
// // // // //                   "relative h-[110px] w-full text-left",
// // // // //                   "flex items-center gap-3 px-5 snap-start",
// // // // //                   idx !== 0 ? "border-l border-[#282829]" : "",
// // // // //                   idx === activeIndex ? "bg-white/5" : "hover:bg-white/7",
// // // // //                 ].join(" ")}
// // // // //                 aria-label={idea.title}
// // // // //                 title={idea.title}
// // // // //               >
// // // // //                 <img src={idea.img} alt="" className="h-6 w-6 object-contain" />
// // // // //                 <div className="flex flex-col items-start">
// // // // //                   <div className="text-white font-semibold leading-[1.1] text-[15px]">
// // // // //                     {idea.title}
// // // // //                   </div>
// // // // //                   <div className="text-white/80 text-[12px] leading-[1.2] mt-[6px]">
// // // // //                     {idea.text}
// // // // //                   </div>
// // // // //                 </div>
// // // // //               </button>
// // // // //             ))}
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };



// // // // // const SmarterPrompt = ({ onPromptGenerated, onUseInOptimizer }: SmarterPromptProps) => {
// // // // //   const [isGenerating, setIsGenerating] = useState(false);
// // // // //   const [userPrompt, setUserPrompt] = useState("");
// // // // //   const [detailedPrompt, setDetailedPrompt] = useState("");
// // // // //   const [isListening, setIsListening] = useState(false);
// // // // //   const [activeIndex, setActiveIndex] = useState(0);
// // // // //   const [suggestions, setSuggestions] = useState<string[]>([]);
// // // // //    // put this near your other state hooks in SmarterPrompt
// // // // // const [activeAction, setActiveAction] = useState<"copy" | "download" | "save" | "open" | null>(null);
 
// // // // //     const [speechSupported, setSpeechSupported] = useState(false);
// // // // //   const [tokenEfficiencyScore, setTokenEfficiencyScore] = useState(0);
// // // // //   const recognitionRef = useRef<any>(null);
// // // // //      // REMOVE this old handler
// // // // // // const handleSave = () => { console.log('Saved'); setIsModalOpen(true); };

// // // // // // keep your existing:


// // // // // const [isModalOpen, setIsModalOpen] = useState(false);
// // // // // const navigate = useNavigate();
// // // // // const saveBtnRef = useRef<HTMLButtonElement | null>(null);
// // // // // const openSaveModal = () => setIsModalOpen(true);

// // // // // // in SmarterPrompt.tsx
// // // // // // in SmarterPrompt.tsx
// // // // // const handleSaveFromModal = (payload?: { title?: string; type?: string; category?: string }) => {
// // // // //   const finalTitle = payload?.title?.trim() || userPrompt || "Untitled";
// // // // //   const finalDesc  = detailedPrompt || "No result yet";
// // // // //   const finalType  = (payload?.type as any) || "smartgen";
// // // // //   const finalCategory = (payload?.category ?? "All Saved").trim(); // 👈 use All Saved

// // // // //   saveItem({
// // // // //     title: finalTitle,
// // // // //     prompt: finalDesc,
// // // // //     type: finalType,
// // // // //     category: finalCategory,           // 👈 no more "Saved" hardcode
// // // // //   });

// // // // //   setIsModalOpen(false);
// // // // //   toast({
// // // // //     title: "Saved to Collections",
// // // // //     description: `Saved to ${finalType === "smartgen" ? "Smartgen" : finalType} › ${finalCategory}.`,
// // // // //   });
// // // // // };





// // // // // const openSaveDropdown = () => setIsModalOpen(true);

// // // // //   // idea images
// // // // //   const exampleIdeas = [
// // // // //     { text: "Help me create a marketing strategy", img: "/icons/i1.png", title: "Marketing Strategy" },
// // // // //     { text: "Write a technical tutorial for beginners", img: "/icons/i2.png", title: "Technical Tutorial" },
// // // // //     { text: "Analyze competitor pricing models", img: "/icons/i3.png", title: "Pricing Models" },
// // // // //     { text: "Design a user onboarding flow", img: "/icons/i4.png", title: "Design" },
// // // // //   ];

// // // // //   /** speech setup */
// // // // //   useEffect(() => {
// // // // //     if (typeof window !== "undefined") {
// // // // //       const SpeechRecognition =
// // // // //         (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
// // // // //       if (SpeechRecognition) {
// // // // //         setSpeechSupported(true);
// // // // //         recognitionRef.current = new SpeechRecognition();
// // // // //         recognitionRef.current.continuous = false;
// // // // //         recognitionRef.current.interimResults = false;
// // // // //         recognitionRef.current.lang = "en-US";

// // // // //         recognitionRef.current.onresult = (event: any) => {
// // // // //           const transcript = event.results[0][0].transcript;
// // // // //           setUserPrompt((prev) => prev + (prev ? " " : "") + transcript);
// // // // //           setIsListening(false);
// // // // //         };
// // // // //         recognitionRef.current.onerror = () => {
// // // // //           setIsListening(false);
// // // // //           toast({
// // // // //             title: "Speech recognition failed",
// // // // //             description: "Please try again or use text input",
// // // // //             variant: "destructive",
// // // // //           });
// // // // //         };
// // // // //         recognitionRef.current.onend = () => setIsListening(false);
// // // // //       }
// // // // //     }
// // // // //   }, []);

// // // // //   const startListening = () => {
// // // // //     if (recognitionRef.current && speechSupported) {
// // // // //       setIsListening(true);
// // // // //       recognitionRef.current.start();
// // // // //     }
// // // // //   };
// // // // //   const stopListening = () => {
// // // // //     if (recognitionRef.current) {
// // // // //       recognitionRef.current.stop();
// // // // //       setIsListening(false);
// // // // //     }
// // // // //   };



// // // // // // save for save collection

// // // // //   const handleSave = () => {
// // // // //     // Your save logic here
// // // // //     console.log('Saved');
// // // // //     setIsModalOpen(true); // Close the modal after saving
// // // // //   };





// // // // //   const handleExampleClick = (idea: any) => setUserPrompt(idea.text);

// // // // //  const generateDetailedPrompt = async () => {
// // // // //   const promptToProcess = userPrompt.trim();
// // // // //   if (!promptToProcess) {
// // // // //     toast({ title: "No prompt provided", description: "Please enter a prompt first", variant: "destructive" });
// // // // //     return;
// // // // //   }
// // // // //   setIsGenerating(true);


// // // // //     try {
// // // // //     const result = await llmService.generateDetailedPrompt(promptToProcess);


// // // // //     setDetailedPrompt(result.optimizedText);
// // // // //     setSuggestions(result.suggestions || []);

// // // // //     const originalTokens = Math.ceil(promptToProcess.length / 4);
// // // // //     const efficiencyScore = Math.min(
// // // // //       95,
// // // // //       Math.max(60, 100 - Math.round(((result.tokens - originalTokens) / originalTokens) * 50))
// // // // //     );
// // // // //     setTokenEfficiencyScore(efficiencyScore);

// // // // //     onPromptGenerated?.(result.optimizedText);
// // // // //     toast({ title: "Detailed Prompt Generated!", description: "Your detailed prompt is ready" });
// // // // //   } catch (err: any) {
// // // // //     console.error(err);
// // // // //     toast({ title: "Error", description: err.message || "Failed to generate prompt", variant: "destructive" });
// // // // //   } finally {
// // // // //     setIsGenerating(false);
// // // // //   }
// // // // // };



// // // // //   const createDetailedPrompt = (original: string): string => {
// // // // //     const lowerOriginal = original.toLowerCase();
// // // // //     if (lowerOriginal.includes("barber shop") || lowerOriginal.includes("barbershop")) {
// // // // //       return `Research the Market – Understand local demand, competition, and customer needs.

// // // // // Create a Business Plan – Define services, pricing, budget, and revenue goals.

// // // // // `;
// // // // //     }
// // // // //     if (lowerOriginal.includes("cafe") || lowerOriginal.includes("coffee")) {
// // // // //       return `Market Research – Analyze local coffee market, customer preferences, and competition.

// // // // // Business Planning – Create comprehensive business plan with financial projections and timelines.

// // // // // Location Selection – Choose high-traffic area with good visibility and accessibility.

// // // // // Licensing & Permits – Obtain food service license, business registration, and health permits.

// // // // // `;
// // // // //     }
// // // // //     if (lowerOriginal.includes("marketing strategy")) {
// // // // //       return `Target Audience Analysis – Define customer personas, demographics, and behavior patterns.

// // // // // Competitive Research – Analyze competitors' strategies, positioning, and market share.

// // // // // Brand Positioning – Establish unique value proposition and brand messaging framework.

// // // // // .`;
// // // // //     }
// // // // //     if (lowerOriginal.includes("technical tutorial")) {
// // // // //       return `Learning Objectives – Define clear, measurable goals for tutorial completion.

// // // // // Prerequisites – List required knowledge, tools, and software needed.

// // // // // Tutorial Structure – Create logical step-by-step progression with clear sections.

// // // // // .`;
// // // // //     }
// // // // //     if (lowerOriginal.includes("business") || lowerOriginal.includes("startup") || lowerOriginal.includes("company")) {
// // // // //       return `Market Research – Analyze target market, customer needs, and industry trends.

// // // // // Business Model – Define value proposition, revenue streams, and cost structure.
// // // // // .

// // // // // `;
// // // // //     }
// // // // //     const topic = original.replace(/give me|create|develop|help me|write/gi, "").trim();
// // // // //     return `Key Analysis – Conduct thorough research and understand core requirements for ${topic}.

// // // // // Strategic Planning – Develop comprehensive approach with clear objectives and timelines.

// // // // // `;
// // // // //   };

// // // // //   const copyToClipboard = (text: string, type: string) => {
// // // // //     navigator.clipboard.writeText(text);
// // // // //     toast({ title: "Copied to clipboard", description: `${type} has been copied successfully` });
// // // // //   };
// // // // //   const downloadPrompt = () => {
// // // // //     const element = document.createElement("a");
// // // // //     const file = new Blob([detailedPrompt], { type: "text/plain" });
// // // // //     element.href = URL.createObjectURL(file);
// // // // //     element.download = "detailed-prompt.txt";
// // // // //     document.body.appendChild(element);
// // // // //     element.click();
// // // // //     document.body.removeChild(element);
// // // // //     toast({ title: "Download started", description: "Your prompt has been downloaded as a text file" });
// // // // //   };
// // // // //   const saveToLibrary = () => {
// // // // //     const savedPrompts = JSON.parse(localStorage.getItem("saved_prompts") || "[]");
// // // // //     const newPrompt = {
// // // // //       id: Date.now(),
// // // // //       title: userPrompt.substring(0, 50) + (userPrompt.length > 50 ? "..." : ""),
// // // // //       original: userPrompt,
// // // // //       enhanced: detailedPrompt,
// // // // //       timestamp: new Date().toISOString(),
// // // // //       tokenEfficiency: tokenEfficiencyScore,
// // // // //     };
// // // // //     savedPrompts.push(newPrompt);
// // // // //     localStorage.setItem("saved_prompts", JSON.stringify(savedPrompts));
// // // // //     toast({ title: "Saved to library", description: "Your prompt has been saved to your personal library" });
// // // // //   };
// // // // //   const openInChatGPT = () => {
// // // // //     const encodedPrompt = encodeURIComponent(detailedPrompt);
// // // // //     window.open(`https://chat.openai.com/?prompt=${encodedPrompt}`, "_blank");
// // // // //   };
// // // // //    const tokenCount = (text: string) => Math.ceil(text.length / 4);

// // // // //   return (
// // // // //     <div className="space-y-6">
     
// // // // //       {/* When a detailed prompt exists, show the Ideas strip BELOW your existing heading */}
// // // // //       {detailedPrompt && (
// // // // //         <IdeasStrip
// // // // //           exampleIdeas={exampleIdeas}
// // // // //           activeIndex={activeIndex}
// // // // //           setActiveIndex={setActiveIndex}
// // // // //           handleExampleClick={handleExampleClick}
// // // // //         />
// // // // //       )}

// // // // //       {/* MAIN WRAPPER — auto enlarges when detailed content is present */}
// // // // //       <div className="mx-auto w-full max-w-[1050px] rounded-[36px] bg-[#121213] overflow-visible px-0">
// // // // //         {/* INPUT card (stays where it is) */}
// // // // //         <div className="flex justify-center px-4 pt-4 md:pt-6">
// // // // //           <div className="relative w-full max-w-[1000px] min-h-[200px] md:h-[200px] rounded-[30px] bg-[#121213] border border-[#282829] text-white overflow-hidden">
// // // // //             <div className="h-full flex">
// // // // //               <div className="w-12" />
// // // // //               <div className="flex-1 pr-14 pl-2 py-4">
// // // // //                 <Textarea
// // // // //                   value={userPrompt}
// // // // //                   onChange={(e) => setUserPrompt(e.target.value)}
// // // // //                   placeholder="Write a technical tutorial for beginners"
// // // // //                   className="w-full h-full bg-transparent border-none resize-none text-white placeholder-white/70 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-base leading-relaxed"
// // // // //                 />
// // // // //               </div>
// // // // //               <div className="w-12" />
// // // // //             </div>

// // // // //             {/* Bottom-left: paperclip */}
// // // // //             <div className="absolute bottom-3 left-3">
// // // // //               <input
// // // // //                 type="file"
// // // // //                 id="file-upload"
// // // // //                 className="hidden"
// // // // //                 onChange={(e) => {
// // // // //                   const file = e.target.files?.[0];
// // // // //                   if (file) toast({ title: "File attached", description: `Selected file: ${file.name}` });
// // // // //                 }}
// // // // //               />
// // // // //               <label htmlFor="file-upload" className="cursor-pointer">
// // // // //                 <div className="h-8 w-8 grid place-items-center rounded-full bg-white/10 text-white hover:bg-white/15">
// // // // //                   <Paperclip className="h-5 w-5" />
// // // // //                 </div>
// // // // //               </label>
// // // // //             </div>

// // // // //             {/* Bottom-right: Clear / Mic / Send */}
// // // // //             <div className="absolute bottom-3 right-3 flex items-center gap-2">
// // // // //               {/* Clear pill */}
// // // // //               <button
// // // // //                 onClick={() => setUserPrompt("")}
// // // // //                 className="h-9 w-[63px] rounded-[40px] flex items-center justify-center text-white text-sm"
// // // // //                 style={{ background: "#2C2C2C" }}
// // // // //                 title="Clear"
// // // // //                 aria-label="Clear"
// // // // //               >
// // // // //                 Clear
// // // // //               </button>

// // // // //               {/* Mic */}
// // // // //               {speechSupported && (
// // // // //                 <button
// // // // //                   onClick={isListening ? stopListening : startListening}
// // // // //                   className="relative h-9 w-9 rounded-full grid place-items-center overflow-visible"
// // // // //                   style={{ background: "#2C2C2C" }}
// // // // //                   title={isListening ? "Stop voice input" : "Start voice input"}
// // // // //                   aria-label="Microphone"
// // // // //                 >
// // // // //                   {isListening && (
// // // // //                     <>
// // // // //                       <span
// // // // //                         className="absolute inset-0 rounded-full opacity-60 animate-ping"
// // // // //                         style={{ background: "linear-gradient(270.19deg, #1A73E8 0.16%, #FF14EF 99.84%)" }}
// // // // //                       />
// // // // //                       <span
// // // // //                         className="absolute inset-0 rounded-full opacity-40 animate-ping"
// // // // //                         style={{ background: "linear-gradient(270.19deg, #1A73E8 0.16%, #FF14EF 99.84%)", animationDelay: "0.4s" }}
// // // // //                       />
// // // // //                     </>
// // // // //                   )}
// // // // //                   <img src="/icons/mic.png" alt="Mic" className={`h-4 w-4 ${isListening ? "animate-pulse" : ""}`} />
// // // // //                 </button>
// // // // //               )}

// // // // //               {/* Generate */}
// // // // //               <Button
// // // // //                 onClick={generateDetailedPrompt}
// // // // //                 disabled={isGenerating || !userPrompt.trim()}
// // // // //                 size="sm"
// // // // //                 className="h-8 w-8 p-0 rounded-full bg-[linear-gradient(270.19deg,#1A73E8_0.16%,#FF14EF_99.84%)] text-white hover:opacity-90 disabled:opacity-50"
// // // // //                 title="Generate"
// // // // //               >
// // // // //                 {isGenerating ? <Wand2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
// // // // //               </Button>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>

// // // // //         {/* IDEAS inside wrapper — only BEFORE generation */}
// // // // //        {/* IDEAS inside wrapper — ONLY BEFORE generation */}
// // // // // {/* IDEAS inside wrapper — ONLY BEFORE generation */}
// // // // // {/* IDEAS inside wrapper — ONLY BEFORE generation */}
// // // // // {/* IDEAS inside wrapper — ONLY BEFORE generation */}
// // // // // {/* IDEAS inside wrapper — ONLY BEFORE generation */}
// // // // // {/* IDEAS inside wrapper — ONLY BEFORE generation */}
// // // // // {!detailedPrompt && (
// // // // //   <div className="flex justify-center px-4 -mt-px pb-4 md:pb-6">
// // // // //     <div className="relative w-full max-w-[1000px] h-[200px] rounded-[30px] bg-[#121213] border border-[#282829] text-white overflow-hidden">
// // // // //       <div className="grid grid-cols-4 h-full">
// // // // //         {exampleIdeas.map((idea, index) => {
// // // // //           const isActive = index === activeIndex;
// // // // //           return (
// // // // //             <button
// // // // //               key={index}
// // // // //               onClick={() => {
// // // // //                 handleExampleClick(idea);
// // // // //                 setActiveIndex(index);
// // // // //               }}
// // // // //               className={[
// // // // //                 "relative h-full w-full text-left",
// // // // //                 // lowered a bit to feel centered vertically
// // // // //                 "flex flex-col items-start justify-start px-6 pt-8 pb-4",
// // // // //                 index !== 0 ? "border-l border-[#282829]" : "",
// // // // //                 isActive ? "bg-white/5" : "hover:bg-white/7",
// // // // //               ].join(" ")}
// // // // //             >
// // // // //               {/* image pinned to top-left */}
// // // // //               <img src={idea.img} alt={idea.title} className="h-6 w-6 mb-2" />

// // // // //               {/* title: Inter, 15px */}
// // // // //               <div
// // // // //                 className="text-white font-semibold leading-[1.1] text-[15px]"
// // // // //                 style={{ fontFamily: "Inter" }}
// // // // //               >
// // // // //                 {idea.title}
// // // // //               </div>

// // // // //               {/* desc: Inter, 15px */}
// // // // //               <div
// // // // //                 className="text-white/70 text-[15px] leading-[1.2] mt-[6px]"
// // // // //                 style={{ fontFamily: "Inter" }}
// // // // //               >
// // // // //                 {idea.text}
// // // // //               </div>
// // // // //             </button>
// // // // //           );
// // // // //         })}
// // // // //       </div>
// // // // //     </div>
// // // // //   </div>
// // // // // )}







// // // // //         {/* DETAILED PROMPT AREA — inside the SAME main wrapper; width EXACTLY 1000px */}
// // // // //        {detailedPrompt && (
// // // // //   <div className="px-4 pb-6">
// // // // //     <div className="mx-auto w-full max-w-[1000px]">
// // // // //       <div className="text-center my-6">
// // // // //         <h3 className="text-white font-semibold text-xl md:text-2xl">Detailed Prompt</h3>
// // // // //       </div>

// // // // //       <div className={`${CARD_FRAME} relative p-4 md:p-5`}>
// // // // //         {/* Content: keep readable on small screens */}
// // // // //         <div className="text-white/90 text-sm leading-relaxed md:pr-[8rem] whitespace-pre-line">
// // // // //           {detailedPrompt}
// // // // //         </div>

// // // // //         {/* Actions: row on small (static), floating on md+ */}
// // // // //              {/* Actions: row on small (static), floating on md+ */}
// // // // // <div className="mt-4 md:mt-0 md:absolute md:bottom-4 md:right-4 flex flex-wrap gap-2">

// // // // // <button
// // // // //   ref={saveBtnRef}
// // // // //   // toggle open/close so the bg updates immediately
// // // // //   onClick={() => setIsModalOpen((v) => !v)}
// // // // //   aria-pressed={isModalOpen}
// // // // //   title="Save"
// // // // //   aria-label="Save"
// // // // //   className="w-10 h-10 rounded-full flex items-center justify-center transition-colors border"
// // // // //   style={{
// // // // //     background: isModalOpen ? GRADIENT : "#252525",
// // // // //     borderColor: "#333335",
// // // // //   }}
// // // // // >
// // // // //   <img src="/icons/cop.png" alt="Save" className="w-5 h-5 object-contain" />
// // // // // </button>

// // // // //   <button
// // // // //     onClick={() => {
// // // // //       setActiveAction("copy");
// // // // //       copyToClipboard(detailedPrompt, "Prompt");
// // // // //     }}
// // // // //     aria-pressed={activeAction === "copy"}
// // // // //     className="h-9 w-9 rounded-full flex items-center justify-center transition-colors"
// // // // //     style={{
// // // // //       background:
// // // // //         activeAction === "copy"
// // // // //           ? "linear-gradient(270.19deg, #1A73E8 0.16%, #FF14EF 99.84%)"
// // // // //           : "#252525",
// // // // //     }}
// // // // //     title="Copy"
// // // // //   >
// // // // //     <Copy className="h-4 w-4 text-white" />
// // // // //   </button>

// // // // //   <button
// // // // //     onClick={() => {
// // // // //       setActiveAction("download");
// // // // //       downloadPrompt();
// // // // //     }}
// // // // //     aria-pressed={activeAction === "download"}
// // // // //     className="h-9 w-9 rounded-full flex items-center justify-center transition-colors"
// // // // //     style={{
// // // // //       background:
// // // // //         activeAction === "download"
// // // // //           ? "linear-gradient(270.19deg, #1A73E8 0.16%, #FF14EF 99.84%)"
// // // // //           : "#252525",
// // // // //     }}
// // // // //     title="Download"
// // // // //   >
// // // // //     <Download className="h-4 w-4 text-white" />
// // // // //   </button>



// // // // //   <button
// // // // //     onClick={() => {
// // // // //       setActiveAction("open");
// // // // //       openInChatGPT();
// // // // //     }}
// // // // //     aria-pressed={activeAction === "open"}
// // // // //     className="h-9 w-9 rounded-full flex items-center justify-center transition-colors"
// // // // //     style={{
// // // // //       background:
// // // // //         activeAction === "open"
// // // // //           ? "linear-gradient(270.19deg, #1A73E8 0.16%, #FF14EF 99.84%)"
// // // // //           : "#252525",
// // // // //     }}
// // // // //     title="Open in ChatGPT"
// // // // //   >
// // // // //     <ExternalLink className="h-4 w-4 text-white" />
// // // // //   </button>
// // // // // </div>

// // // // //       </div>

// // // // //       {/* Token chips with labels, dark bg, gradient text */}
// // // // //     {/* Token chips with very small gaps */}
// // // // // <div className="mt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-2">
// // // // //   {/* Original Length */}
// // // // //   <div className="flex flex-col items-center shrink-0">
// // // // //     <div
// // // // //       className="mb-0.5 text-white/70"
// // // // //       style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "12px", lineHeight: "100%" }}
// // // // //     >
// // // // //       Original Length
// // // // //     </div>
// // // // //     <div className="px-3 py-[6px] rounded-full bg-[#252525] leading-none">
// // // // //       <span
// // // // //         style={{
// // // // //           background: "linear-gradient(90deg, #FF14EF 0%, #1A73E8 100%)",
// // // // //           WebkitBackgroundClip: "text",
// // // // //           backgroundClip: "text",
// // // // //           color: "transparent",
// // // // //           fontFamily: "Inter",
// // // // //           fontWeight: 400,
// // // // //         }}
// // // // //       >
// // // // //         {tokenCount(userPrompt)} Tokens
// // // // //       </span>
// // // // //     </div>
// // // // //   </div>

// // // // //   {/* Efficiency Score / Needs improvement text */}
// // // // //   <div className="flex flex-col items-center shrink-0">
// // // // //     <div
// // // // //       className="mb-0.5 text-white/70"
// // // // //       style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "12px", lineHeight: "100%" }}
// // // // //     >
// // // // //       Efficiency Score
// // // // //     </div>
// // // // //     <div className="px-3 py-[6px] rounded-full bg-[#252525] leading-none">
// // // // //       <span
// // // // //         style={{
// // // // //           background: "linear-gradient(90deg, #FF14EF 0%, #1A73E8 100%)",
// // // // //           WebkitBackgroundClip: "text",
// // // // //           backgroundClip: "text",
// // // // //           color: "transparent",
// // // // //           fontFamily: "Inter",
// // // // //           fontWeight: 400,
// // // // //         }}
// // // // //       >
// // // // //         {tokenEfficiencyScore}% needs improvement
// // // // //       </span>
// // // // //     </div>
// // // // //   </div>

// // // // //   {/* Detailed Length */}
// // // // //   <div className="flex flex-col items-center shrink-0">
// // // // //     <div
// // // // //       className="mb-0.5 text-white/70"
// // // // //       style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "12px", lineHeight: "100%" }}
// // // // //     >
// // // // //       Detailed Length
// // // // //     </div>
// // // // //     <div className="px-3 py-[6px] rounded-full bg-[#252525] leading-none">
// // // // //       <span
// // // // //         style={{
// // // // //           background: "linear-gradient(90deg, #FF14EF 0%, #1A73E8 100%)",
// // // // //           WebkitBackgroundClip: "text",
// // // // //           backgroundClip: "text",
// // // // //           color: "transparent",
// // // // //           fontFamily: "Inter",
// // // // //           fontWeight: 400,
// // // // //         }}
// // // // //       >
// // // // //         {tokenCount(detailedPrompt)} Tokens
// // // // //       </span>
// // // // //     </div>
// // // // //   </div>
// // // // // </div>

// // // // //     </div>
// // // // //   </div>
// // // // // )}

// // // // //       </div>

// // // // //       {/* Generating state */}
// // // // //       {isGenerating && (
// // // // //         <div className="text-center text-muted-foreground mb-4">
// // // // //           <div className="flex items-center justify-center gap-2 mb-2">
// // // // //             <div className="w-2 h-2 bg-tokun rounded-full animate-bounce"></div>
// // // // //             <div className="w-2 h-2 bg-tokun rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
// // // // //             <div className="w-2 h-2 bg-tokun rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
// // // // //           </div>
// // // // //           <p>Creating detailed prompt...</p>
// // // // //         </div>
// // // // //       )}

// // // // // <ModalComponent
// // // // //   isOpen={isModalOpen}
// // // // //   onClose={() => setIsModalOpen(false)}
// // // // //   onSave={handleSaveFromModal}
// // // // //   anchorRef={saveBtnRef}
// // // // // />



// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default SmarterPrompt;





// // // // // //integration code 

// // // // // import { useState, useEffect, useRef } from "react";
// // // // // import { Button } from "@/components/ui/button";
// // // // // import { Textarea } from "@/components/ui/textarea";
// // // // // import { toast } from "@/components/ui/use-toast";
// // // // // import { Wand2, Copy, Download, ExternalLink, Paperclip, Send } from "lucide-react";
// // // // // import ModalComponent from "@/components/ModalComponent";
// // // // // import { saveItem } from "@/lib/savedCollections";
// // // // // import { useNavigate } from "react-router-dom";
// // // // // import { llmService } from "@/services/llmService";
// // // // // import { useAuth } from "@/contexts/AuthContext"; // ✅ NEW

// // // // // interface SmarterPromptProps {
// // // // //   onPromptGenerated?: (prompt: string) => void;
// // // // //   onUseInOptimizer?: (prompt: string) => void;
// // // // // }

// // // // // const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000"; // ✅ NEW
// // // // // const GRADIENT = "linear-gradient(270.19deg, #1A73E8 0.16%, #FF14EF 99.84%)";
// // // // // const CARD_FRAME =
// // // // //   "w-full max-w-[1000px] rounded-[30px] border border-[#282829] bg-[#121213] overflow-hidden";

// // // // // const IdeasStrip = ({
// // // // //   exampleIdeas,
// // // // //   activeIndex,
// // // // //   setActiveIndex,
// // // // //   handleExampleClick,
// // // // // }: {
// // // // //   exampleIdeas: { img: string; title: string; text: string }[];
// // // // //   activeIndex: number;
// // // // //   setActiveIndex: (n: number) => void;
// // // // //   handleExampleClick: (idea: any) => void;
// // // // // }) => {
// // // // //   return (
// // // // //     <div className="mx-auto w-full px-4 font-inter">
// // // // //       <div className="mx-auto w-full max-w-[1047.5px] h-[110px] rounded-[20px] border border-[#282829] bg-[#121213] overflow-hidden">
// // // // //         <div className="h-full overflow-x-auto md:overflow-visible no-scrollbar snap-x snap-mandatory">
// // // // //           <div className="grid grid-cols-[repeat(4,minmax(0,1fr))] h-full min-w-[1040px] md:min-w-0 md:grid-cols-4">
// // // // //             {exampleIdeas.map((idea, idx) => (
// // // // //               <button
// // // // //                 key={idx}
// // // // //                 onClick={() => {
// // // // //                   handleExampleClick(idea);
// // // // //                   setActiveIndex(idx);
// // // // //                 }}
// // // // //                 className={[
// // // // //                   "relative h-[110px] w-full text-left",
// // // // //                   "flex items-center gap-3 px-5 snap-start",
// // // // //                   idx !== 0 ? "border-l border-[#282829]" : "",
// // // // //                   idx === activeIndex ? "bg-white/5" : "hover:bg-white/7",
// // // // //                 ].join(" ")}
// // // // //                 aria-label={idea.title}
// // // // //                 title={idea.title}
// // // // //               >
// // // // //                 <img src={idea.img} alt="" className="h-6 w-6 object-contain" />
// // // // //                 <div className="flex flex-col items-start">
// // // // //                   <div className="text-white font-semibold leading-[1.1] text-[15px]">
// // // // //                     {idea.title}
// // // // //                   </div>
// // // // //                   <div className="text-white/80 text-[12px] leading-[1.2] mt-[6px]">
// // // // //                     {idea.text}
// // // // //                   </div>
// // // // //                 </div>
// // // // //               </button>
// // // // //             ))}
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // const SmarterPrompt = ({ onPromptGenerated, onUseInOptimizer }: SmarterPromptProps) => {
// // // // //   const [isGenerating, setIsGenerating] = useState(false);
// // // // //   const [userPrompt, setUserPrompt] = useState("");
// // // // //   const [detailedPrompt, setDetailedPrompt] = useState("");
// // // // //   const [isListening, setIsListening] = useState(false);
// // // // //   const [activeIndex, setActiveIndex] = useState(0);
// // // // //   const [suggestions, setSuggestions] = useState<string[]>([]);
// // // // //   const [activeAction, setActiveAction] = useState<"copy" | "download" | "save" | "open" | null>(null);
// // // // //   const [speechSupported, setSpeechSupported] = useState(false);
// // // // //   const [tokenEfficiencyScore, setTokenEfficiencyScore] = useState(0);
// // // // //   const [files, setFiles] = useState<File[]>([]); // ✅ NEW (multiple attachments)

// // // // //   const recognitionRef = useRef<any>(null);
// // // // //   const [isModalOpen, setIsModalOpen] = useState(false);
// // // // //   const navigate = useNavigate();
// // // // //   const saveBtnRef = useRef<HTMLButtonElement | null>(null);

// // // // //   // ✅ NEW: get token + user + persistAuth from AuthContext
// // // // //   const { token, user, persistAuth } = useAuth() as any;

// // // // //   const openSaveModal = () => setIsModalOpen(true);

// // // // //   const handleSaveFromModal = (payload?: { title?: string; type?: string; category?: string }) => {
// // // // //     const finalTitle = payload?.title?.trim() || userPrompt || "Untitled";
// // // // //     const finalDesc = detailedPrompt || "No result yet";
// // // // //     const finalType = (payload?.type as any) || "smartgen";
// // // // //     const finalCategory = (payload?.category ?? "All Saved").trim();

// // // // //     saveItem({
// // // // //       title: finalTitle,
// // // // //       prompt: finalDesc,
// // // // //       type: finalType,
// // // // //       category: finalCategory,
// // // // //     });

// // // // //     setIsModalOpen(false);
// // // // //     toast({
// // // // //       title: "Saved to Collections",
// // // // //       description: `Saved to ${finalType === "smartgen" ? "Smartgen" : finalType} › ${finalCategory}.`,
// // // // //     });
// // // // //   };

// // // // //   const exampleIdeas = [
// // // // //     { text: "Help me create a marketing strategy", img: "/icons/i1.png", title: "Marketing Strategy" },
// // // // //     { text: "Write a technical tutorial for beginners", img: "/icons/i2.png", title: "Technical Tutorial" },
// // // // //     { text: "Analyze competitor pricing models", img: "/icons/i3.png", title: "Pricing Models" },
// // // // //     { text: "Design a user onboarding flow", img: "/icons/i4.png", title: "Design" },
// // // // //   ];

// // // // //   /** speech setup */
// // // // //   useEffect(() => {
// // // // //     if (typeof window !== "undefined") {
// // // // //       const SpeechRecognition =
// // // // //         (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
// // // // //       if (SpeechRecognition) {
// // // // //         setSpeechSupported(true);
// // // // //         recognitionRef.current = new SpeechRecognition();
// // // // //         recognitionRef.current.continuous = false;
// // // // //         recognitionRef.current.interimResults = false;
// // // // //         recognitionRef.current.lang = "en-US";

// // // // //         recognitionRef.current.onresult = (event: any) => {
// // // // //           const transcript = event.results[0][0].transcript;
// // // // //           setUserPrompt((prev) => prev + (prev ? " " : "") + transcript);
// // // // //           setIsListening(false);
// // // // //         };
// // // // //         recognitionRef.current.onerror = () => {
// // // // //           setIsListening(false);
// // // // //           toast({
// // // // //             title: "Speech recognition failed",
// // // // //             description: "Please try again or use text input",
// // // // //             variant: "destructive",
// // // // //           });
// // // // //         };
// // // // //         recognitionRef.current.onend = () => setIsListening(false);
// // // // //       }
// // // // //     }
// // // // //   }, []);

// // // // //   const startListening = () => {
// // // // //     if (recognitionRef.current && speechSupported) {
// // // // //       setIsListening(true);
// // // // //       recognitionRef.current.start();
// // // // //     }
// // // // //   };
// // // // //   const stopListening = () => {
// // // // //     if (recognitionRef.current) {
// // // // //       recognitionRef.current.stop();
// // // // //       setIsListening(false);
// // // // //     }
// // // // //   };

// // // // //   const handleExampleClick = (idea: any) => setUserPrompt(idea.text);

// // // // //   // ✅ NEW: central save function that hits your Express API
// // // // //      const saveSmartgenToBackend = async ({
// // // // //   inputPrompt,
// // // // //   detailedPrompt,
// // // // //   tokensUsed,
// // // // // }: {
// // // // //   inputPrompt: string;
// // // // //   detailedPrompt: string;
// // // // //   tokensUsed: number;
// // // // // }) => {
// // // // //   try {
// // // // //     // 🚧 guard: backend requires positive number
// // // // //     const safeTokens = Math.max(1, Number.isFinite(tokensUsed) ? tokensUsed : 0);

// // // // //     const fd = new FormData();
// // // // //     fd.append("inputPrompt", inputPrompt);
// // // // //     fd.append("detailedPrompt", detailedPrompt);
// // // // //     fd.append("tokensUsed", String(safeTokens));
// // // // //     for (const f of files) fd.append("attachments", f); // field name MUST be "attachments"

// // // // //     // Make sure API_BASE has no trailing slash
// // // // //     const base = API_BASE.replace(/\/+$/, "");
// // // // //     const res = await fetch(`${base}/api/smartgen`, {
// // // // //       method: "POST",
// // // // //       headers: token ? { Authorization: `Bearer ${token}` } : undefined, // must be Bearer
// // // // //       body: fd, // don't set Content-Type manually for FormData
// // // // //       // credentials is fine to keep; not required for Bearer
// // // // //       credentials: "include",
// // // // //     });

// // // // //     const text = await res.text();
// // // // //     let data: any = {};
// // // // //     try { data = JSON.parse(text); } catch { /* not JSON */ }

// // // // //     // 👉 Deep diagnostics to console
// // // // //     console.log("[Smartgen -> status]", res.status, res.statusText);
// // // // //     console.log("[Smartgen -> raw body]", text);

// // // // //     if (!res.ok) {
// // // // //       const errCode = data?.error || `http_${res.status}`;
// // // // //       throw new Error(errCode);
// // // // //     }

// // // // //     // Optionally sync remaining tokens
// // // // //     if (typeof data?.dailyTokensRemaining === "number" && user && persistAuth) {
// // // // //       persistAuth({ user: { ...user, dailyTokensRemaining: data.dailyTokensRemaining } });
// // // // //     }

// // // // //     toast({
// // // // //       title: "Smartgen saved",
// // // // //       description:
// // // // //         typeof data?.dailyTokensRemaining === "number"
// // // // //           ? `Daily tokens remaining: ${data.dailyTokensRemaining}`
// // // // //           : "Saved successfully.",
// // // // //     });

// // // // //     return data?.item;
// // // // //   } catch (e: any) {
// // // // //     console.error("[Smartgen -> API error]", e);
// // // // //     toast({
// // // // //       title: "Save failed",
// // // // //       description: e?.message || "Unable to save Smartgen",
// // // // //       variant: "destructive",
// // // // //     });
// // // // //     return null;
// // // // //   }
// // // // // };


// // // // //   const generateDetailedPrompt = async () => {
// // // // //     const promptToProcess = userPrompt.trim();
// // // // //     if (!promptToProcess) {
// // // // //       toast({
// // // // //         title: "No prompt provided",
// // // // //         description: "Please enter a prompt first",
// // // // //         variant: "destructive",
// // // // //       });
// // // // //       return;
// // // // //     }
// // // // //     setIsGenerating(true);

// // // // //     try {
// // // // //       const result = await llmService.generateDetailedPrompt(promptToProcess);

// // // // //       setDetailedPrompt(result.optimizedText);
// // // // //       setSuggestions(result.suggestions || []);

// // // // //       const originalTokens = Math.ceil(promptToProcess.length / 4);
// // // // //       // Prefer precise usage if your llmService supplies it
// // // // //       const tokensUsed =
// // // // //         (result?.usage?.total as number | undefined) ??
// // // // //         // or approximate from counts if usage is missing
// // // // //         originalTokens + Math.ceil((result?.optimizedText?.length || 0) / 4);

// // // // //       const efficiencyScore = Math.min(
// // // // //         95,
// // // // //         Math.max(
// // // // //           60,
// // // // //           100 -
// // // // //             Math.round(
// // // // //               (((result?.tokens ?? Math.ceil((result?.optimizedText?.length || 0) / 4)) - originalTokens) /
// // // // //                 Math.max(originalTokens, 1)) *
// // // // //                 50
// // // // //             )
// // // // //         )
// // // // //       );
// // // // //       setTokenEfficiencyScore(efficiencyScore);

// // // // //       onPromptGenerated?.(result.optimizedText);
// // // // //       toast({ title: "Detailed Prompt Generated!", description: "Your detailed prompt is ready" });

// // // // //       // ✅ Save to backend immediately so you can verify in console + DB
// // // // //       const saved = await saveSmartgenToBackend({
// // // // //         inputPrompt: promptToProcess,
// // // // //         detailedPrompt: result.optimizedText,
// // // // //         tokensUsed,
// // // // //       });
// // // // //       if (saved) console.log("✅ Saved Smartgen item:", saved);
// // // // //     } catch (err: any) {
// // // // //       console.error(err);
// // // // //       toast({
// // // // //         title: "Error",
// // // // //         description: err.message || "Failed to generate prompt",
// // // // //         variant: "destructive",
// // // // //       });
// // // // //     } finally {
// // // // //       setIsGenerating(false);
// // // // //     }
// // // // //   };

// // // // //   const copyToClipboard = (text: string, type: string) => {
// // // // //     navigator.clipboard.writeText(text);
// // // // //     toast({ title: "Copied to clipboard", description: `${type} has been copied successfully` });
// // // // //   };
// // // // //   const downloadPrompt = () => {
// // // // //     const element = document.createElement("a");
// // // // //     const file = new Blob([detailedPrompt], { type: "text/plain" });
// // // // //     element.href = URL.createObjectURL(file);
// // // // //     element.download = "detailed-prompt.txt";
// // // // //     document.body.appendChild(element);
// // // // //     element.click();
// // // // //     document.body.removeChild(element);
// // // // //     toast({ title: "Download started", description: "Your prompt has been downloaded as a text file" });
// // // // //   };
// // // // //   const tokenCount = (text: string) => Math.ceil(text.length / 4);

// // // // //   return (
// // // // //     <div className="space-y-6">
// // // // //       {detailedPrompt && (
// // // // //         <IdeasStrip
// // // // //           exampleIdeas={exampleIdeas}
// // // // //           activeIndex={activeIndex}
// // // // //           setActiveIndex={setActiveIndex}
// // // // //           handleExampleClick={handleExampleClick}
// // // // //         />
// // // // //       )}

// // // // //       <div className="mx-auto w-full max-w-[1050px] rounded-[36px] bg-[#121213] overflow-visible px-0">
// // // // //         <div className="flex justify-center px-4 pt-4 md:pt-6">
// // // // //           <div className="relative w-full max-w-[1000px] min-h-[200px] md:h-[200px] rounded-[30px] bg-[#121213] border border-[#282829] text-white overflow-hidden">
// // // // //             <div className="h-full flex">
// // // // //               <div className="w-12" />
// // // // //               <div className="flex-1 pr-14 pl-2 py-4">
// // // // //                 <Textarea
// // // // //                   value={userPrompt}
// // // // //                   onChange={(e) => setUserPrompt(e.target.value)}
// // // // //                   placeholder="Write a technical tutorial for beginners"
// // // // //                   className="w-full h-full bg-transparent border-none resize-none text-white placeholder-white/70 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-base leading-relaxed"
// // // // //                 />
// // // // //               </div>
// // // // //               <div className="w-12" />
// // // // //             </div>

// // // // //             {/* Bottom-left: attachments */}
// // // // //             <div className="absolute bottom-3 left-3">
// // // // //               <input
// // // // //                 type="file"
// // // // //                 id="file-upload"
// // // // //                 className="hidden"
// // // // //                 multiple // ✅ allow multiple
// // // // //                 onChange={(e) => {
// // // // //                   const selected = Array.from(e.target.files || []);
// // // // //                   setFiles(selected); // ✅ keep in state
// // // // //                   if (selected.length) {
// // // // //                     toast({
// // // // //                       title: "Files attached",
// // // // //                       description: `${selected.length} file(s) selected`,
// // // // //                     });
// // // // //                   }
// // // // //                 }}
// // // // //               />
// // // // //               <label htmlFor="file-upload" className="cursor-pointer">
// // // // //                 <div className="h-8 w-8 grid place-items-center rounded-full bg-white/10 text-white hover:bg-white/15">
// // // // //                   <Paperclip className="h-5 w-5" />
// // // // //                 </div>
// // // // //               </label>
// // // // //             </div>

// // // // //             {/* Bottom-right controls */}
// // // // //             <div className="absolute bottom-3 right-3 flex items-center gap-2">
// // // // //               <button
// // // // //                 onClick={() => setUserPrompt("")}
// // // // //                 className="h-9 w-[63px] rounded-[40px] flex items-center justify-center text-white text-sm"
// // // // //                 style={{ background: "#2C2C2C" }}
// // // // //                 title="Clear"
// // // // //                 aria-label="Clear"
// // // // //               >
// // // // //                 Clear
// // // // //               </button>

// // // // //               {speechSupported && (
// // // // //                 <button
// // // // //                   onClick={isListening ? () => recognitionRef.current?.stop() : () => recognitionRef.current?.start()}
// // // // //                   className="relative h-9 w-9 rounded-full grid place-items-center overflow-visible"
// // // // //                   style={{ background: "#2C2C2C" }}
// // // // //                   title={isListening ? "Stop voice input" : "Start voice input"}
// // // // //                   aria-label="Microphone"
// // // // //                 >
// // // // //                   {isListening && (
// // // // //                     <>
// // // // //                       <span
// // // // //                         className="absolute inset-0 rounded-full opacity-60 animate-ping"
// // // // //                         style={{ background: GRADIENT }}
// // // // //                       />
// // // // //                       <span
// // // // //                         className="absolute inset-0 rounded-full opacity-40 animate-ping"
// // // // //                         style={{ background: GRADIENT, animationDelay: "0.4s" }}
// // // // //                       />
// // // // //                     </>
// // // // //                   )}
// // // // //                   <img src="/icons/mic.png" alt="Mic" className={`h-4 w-4 ${isListening ? "animate-pulse" : ""}`} />
// // // // //                 </button>
// // // // //               )}

// // // // //               <Button
// // // // //                 onClick={generateDetailedPrompt}
// // // // //                 disabled={isGenerating || !userPrompt.trim()}
// // // // //                 size="sm"
// // // // //                 className="h-8 w-8 p-0 rounded-full bg-[linear-gradient(270.19deg,#1A73E8_0.16%,#FF14EF_99.84%)] text-white hover:opacity-90 disabled:opacity-50"
// // // // //                 title="Generate"
// // // // //               >
// // // // //                 {isGenerating ? <Wand2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
// // // // //               </Button>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>

// // // // //         {!detailedPrompt && (
// // // // //           <div className="flex justify-center px-4 -mt-px pb-4 md:pb-6">
// // // // //             <div className="relative w-full max-w-[1000px] h-[200px] rounded-[30px] bg-[#121213] border border-[#282829] text-white overflow-hidden">
// // // // //               <div className="grid grid-cols-4 h-full">
// // // // //                 {exampleIdeas.map((idea, index) => {
// // // // //                   const isActive = index === activeIndex;
// // // // //                   return (
// // // // //                     <button
// // // // //                       key={index}
// // // // //                       onClick={() => {
// // // // //                         handleExampleClick(idea);
// // // // //                         setActiveIndex(index);
// // // // //                       }}
// // // // //                       className={[
// // // // //                         "relative h-full w-full text-left",
// // // // //                         "flex flex-col items-start justify-start px-6 pt-8 pb-4",
// // // // //                         index !== 0 ? "border-l border-[#282829]" : "",
// // // // //                         isActive ? "bg-white/5" : "hover:bg-white/7",
// // // // //                       ].join(" ")}
// // // // //                     >
// // // // //                       <img src={idea.img} alt={idea.title} className="h-6 w-6 mb-2" />
// // // // //                       <div className="text-white font-semibold leading-[1.1] text-[15px]" style={{ fontFamily: "Inter" }}>
// // // // //                         {idea.title}
// // // // //                       </div>
// // // // //                       <div className="text-white/70 text-[15px] leading-[1.2] mt-[6px]" style={{ fontFamily: "Inter" }}>
// // // // //                         {idea.text}
// // // // //                       </div>
// // // // //                     </button>
// // // // //                   );
// // // // //                 })}
// // // // //               </div>
// // // // //             </div>
// // // // //           </div>
// // // // //         )}

// // // // //         {detailedPrompt && (
// // // // //           <div className="px-4 pb-6">
// // // // //             <div className="mx-auto w-full max-w-[1000px]">
// // // // //               <div className="text-center my-6">
// // // // //                 <h3 className="text-white font-semibold text-xl md:text-2xl">Detailed Prompt</h3>
// // // // //               </div>

// // // // //               <div className={`${CARD_FRAME} relative p-4 md:p-5`}>
// // // // //                 <div className="text-white/90 text-sm leading-relaxed md:pr-[8rem] whitespace-pre-line">
// // // // //                   {detailedPrompt}
// // // // //                 </div>

// // // // //                 <div className="mt-4 md:mt-0 md:absolute md:bottom-4 md:right-4 flex flex-wrap gap-2">
// // // // //                   <button
// // // // //                     ref={saveBtnRef}
// // // // //                     onClick={() => setIsModalOpen((v) => !v)}
// // // // //                     aria-pressed={isModalOpen}
// // // // //                     title="Save"
// // // // //                     aria-label="Save"
// // // // //                     className="w-10 h-10 rounded-full flex items-center justify-center transition-colors border"
// // // // //                     style={{ background: isModalOpen ? GRADIENT : "#252525", borderColor: "#333335" }}
// // // // //                   >
// // // // //                     <img src="/icons/cop.png" alt="Save" className="w-5 h-5 object-contain" />
// // // // //                   </button>

// // // // //                   <button
// // // // //                     onClick={() => {
// // // // //                       setActiveAction("copy");
// // // // //                       copyToClipboard(detailedPrompt, "Prompt");
// // // // //                     }}
// // // // //                     aria-pressed={activeAction === "copy"}
// // // // //                     className="h-9 w-9 rounded-full flex items-center justify-center transition-colors"
// // // // //                     style={{ background: activeAction === "copy" ? GRADIENT : "#252525" }}
// // // // //                     title="Copy"
// // // // //                   >
// // // // //                     <Copy className="h-4 w-4 text-white" />
// // // // //                   </button>

// // // // //                   <button
// // // // //                     onClick={() => {
// // // // //                       setActiveAction("download");
// // // // //                       downloadPrompt();
// // // // //                     }}
// // // // //                     aria-pressed={activeAction === "download"}
// // // // //                     className="h-9 w-9 rounded-full flex items-center justify-center transition-colors"
// // // // //                     style={{ background: activeAction === "download" ? GRADIENT : "#252525" }}
// // // // //                     title="Download"
// // // // //                   >
// // // // //                     <Download className="h-4 w-4 text-white" />
// // // // //                   </button>

// // // // //                   <button
// // // // //                     onClick={() => {
// // // // //                       setActiveAction("open");
// // // // //                       const encodedPrompt = encodeURIComponent(detailedPrompt);
// // // // //                       window.open(`https://chat.openai.com/?prompt=${encodedPrompt}`, "_blank");
// // // // //                     }}
// // // // //                     aria-pressed={activeAction === "open"}
// // // // //                     className="h-9 w-9 rounded-full flex items-center justify-center transition-colors"
// // // // //                     style={{ background: activeAction === "open" ? GRADIENT : "#252525" }}
// // // // //                     title="Open in ChatGPT"
// // // // //                   >
// // // // //                     <ExternalLink className="h-4 w-4 text-white" />
// // // // //                   </button>
// // // // //                 </div>
// // // // //               </div>

// // // // //               <div className="mt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-2">
// // // // //                 <div className="flex flex-col items-center shrink-0">
// // // // //                   <div className="mb-0.5 text-white/70" style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "12px", lineHeight: "100%" }}>
// // // // //                     Original Length
// // // // //                   </div>
// // // // //                   <div className="px-3 py-[6px] rounded-full bg-[#252525] leading-none">
// // // // //                     <span
// // // // //                       style={{
// // // // //                         background: "linear-gradient(90deg, #FF14EF 0%, #1A73E8 100%)",
// // // // //                         WebkitBackgroundClip: "text",
// // // // //                         backgroundClip: "text",
// // // // //                         color: "transparent",
// // // // //                         fontFamily: "Inter",
// // // // //                         fontWeight: 400,
// // // // //                       }}
// // // // //                     >
// // // // //                       {Math.ceil(userPrompt.length / 4)} Tokens
// // // // //                     </span>
// // // // //                   </div>
// // // // //                 </div>

// // // // //                 <div className="flex flex-col items-center shrink-0">
// // // // //                   <div className="mb-0.5 text-white/70" style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "12px", lineHeight: "100%" }}>
// // // // //                     Efficiency Score
// // // // //                   </div>
// // // // //                   <div className="px-3 py-[6px] rounded-full bg-[#252525] leading-none">
// // // // //                     <span
// // // // //                       style={{
// // // // //                         background: "linear-gradient(90deg, #FF14EF 0%, #1A73E8 100%)",
// // // // //                         WebkitBackgroundClip: "text",
// // // // //                         backgroundClip: "text",
// // // // //                         color: "transparent",
// // // // //                         fontFamily: "Inter",
// // // // //                         fontWeight: 400,
// // // // //                       }}
// // // // //                     >
// // // // //                       {tokenEfficiencyScore}% needs improvement
// // // // //                     </span>
// // // // //                   </div>
// // // // //                 </div>

// // // // //                 <div className="flex flex-col items-center shrink-0">
// // // // //                   <div className="mb-0.5 text-white/70" style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "12px", lineHeight: "100%" }}>
// // // // //                     Detailed Length
// // // // //                   </div>
// // // // //                   <div className="px-3 py-[6px] rounded-full bg-[#252525] leading-none">
// // // // //                     <span
// // // // //                       style={{
// // // // //                         background: "linear-gradient(90deg, #FF14EF 0%, #1A73E8 100%)",
// // // // //                         WebkitBackgroundClip: "text",
// // // // //                         backgroundClip: "text",
// // // // //                         color: "transparent",
// // // // //                         fontFamily: "Inter",
// // // // //                         fontWeight: 400,
// // // // //                       }}
// // // // //                     >
// // // // //                       {Math.ceil(detailedPrompt.length / 4)} Tokens
// // // // //                     </span>
// // // // //                   </div>
// // // // //                 </div>
// // // // //               </div>
// // // // //             </div>
// // // // //           </div>
// // // // //         )}
// // // // //       </div>

// // // // //       {isGenerating && (
// // // // //         <div className="text-center text-muted-foreground mb-4">
// // // // //           <div className="flex items-center justify-center gap-2 mb-2">
// // // // //             <div className="w-2 h-2 bg-tokun rounded-full animate-bounce"></div>
// // // // //             <div className="w-2 h-2 bg-tokun rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
// // // // //             <div className="w-2 h-2 bg-tokun rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
// // // // //           </div>
// // // // //           <p>Creating detailed prompt...</p>
// // // // //         </div>
// // // // //       )}

// // // // //       <ModalComponent
// // // // //         isOpen={isModalOpen}
// // // // //         onClose={() => setIsModalOpen(false)}
// // // // //         onSave={handleSaveFromModal}
// // // // //         anchorRef={saveBtnRef}
// // // // //       />
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default SmarterPrompt;

// // // // //afterv put


// // // // // src/components/SmarterPrompt.tsx
// // // // import { useState, useEffect, useRef } from "react";
// // // // import { Button } from "@/components/ui/button";
// // // // import { Textarea } from "@/components/ui/textarea";
// // // // import { toast } from "@/components/ui/use-toast";
// // // // import { Wand2, Copy, Download, ExternalLink, Paperclip, Send } from "lucide-react";
// // // // import ModalComponent from "@/components/ModalComponent";
// // // // import { saveItem } from "@/lib/savedCollections";
// // // // import { useNavigate } from "react-router-dom";
// // // // import { llmService } from "@/services/llmService";
// // // // import { useAuth } from "@/contexts/AuthContext";

// // // // interface SmarterPromptProps {
// // // //   onPromptGenerated?: (prompt: string) => void;
// // // //   onUseInOptimizer?: (prompt: string) => void;
// // // //   /** If parent already created Smartgen and knows the id, pass it here */
// // // //   smartgenId?: string;
// // // // }

// // // // const API_BASE = (import.meta as any).env?.VITE_API_URL || "http://localhost:5000";
// // // // const GRADIENT = "linear-gradient(270.19deg, #1A73E8 0.16%, #FF14EF 99.84%)";
// // // // const CARD_FRAME =
// // // //   "w-full max-w-[1000px] rounded-[30px] border border-[#282829] bg-[#121213] overflow-hidden";

// // // // const IdeasStrip = ({
// // // //   exampleIdeas,
// // // //   activeIndex,
// // // //   setActiveIndex,
// // // //   handleExampleClick,
// // // // }: {
// // // //   exampleIdeas: { img: string; title: string; text: string }[];
// // // //   activeIndex: number;
// // // //   setActiveIndex: (n: number) => void;
// // // //   handleExampleClick: (idea: any) => void;
// // // // }) => {
// // // //   return (
// // // //     <div className="mx-auto w-full px-4 font-inter">
// // // //       <div className="mx-auto w-full max-w-[1047.5px] h-[110px] rounded-[20px] border border-[#282829] bg-[#121213] overflow-hidden">
// // // //         <div className="h-full overflow-x-auto md:overflow-visible no-scrollbar snap-x snap-mandatory">
// // // //           <div className="grid grid-cols-[repeat(4,minmax(0,1fr))] h-full min-w-[1040px] md:min-w-0 md:grid-cols-4">
// // // //             {exampleIdeas.map((idea, idx) => (
// // // //               <button
// // // //                 key={idx}
// // // //                 onClick={() => {
// // // //                   handleExampleClick(idea);
// // // //                   setActiveIndex(idx);
// // // //                 }}
// // // //                 className={[
// // // //                   "relative h-[110px] w-full text-left",
// // // //                   "flex items-center gap-3 px-5 snap-start",
// // // //                   idx !== 0 ? "border-l border-[#282829]" : "",
// // // //                   idx === activeIndex ? "bg-white/5" : "hover:bg-white/7",
// // // //                 ].join(" ")}
// // // //                 aria-label={idea.title}
// // // //                 title={idea.title}
// // // //               >
// // // //                 <img src={idea.img} alt="" className="h-6 w-6 object-contain" />
// // // //                 <div className="flex flex-col items-start">
// // // //                   <div className="text-white font-semibold leading-[1.1] text-[15px]">
// // // //                     {idea.title}
// // // //                   </div>
// // // //                   <div className="text-white/80 text-[12px] leading-[1.2] mt-[6px]">
// // // //                     {idea.text}
// // // //                   </div>
// // // //                 </div>
// // // //               </button>
// // // //             ))}
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // const SmarterPrompt = ({ onPromptGenerated, onUseInOptimizer, smartgenId: smartgenIdProp }: SmarterPromptProps) => {
// // // //   const [isGenerating, setIsGenerating] = useState(false);
// // // //   const [userPrompt, setUserPrompt] = useState("");
// // // //   const [detailedPrompt, setDetailedPrompt] = useState("");
// // // //   const [isListening, setIsListening] = useState(false);
// // // //   const [activeIndex, setActiveIndex] = useState(0);
// // // //   const [suggestions, setSuggestions] = useState<string[]>([]);
// // // //   const [activeAction, setActiveAction] = useState<"copy" | "download" | "save" | "open" | null>(null);
// // // //   const [speechSupported, setSpeechSupported] = useState(false);
// // // //   const [tokenEfficiencyScore, setTokenEfficiencyScore] = useState(0);
// // // //   const [files, setFiles] = useState<File[]>([]);
// // // //   const [smartgenId, setSmartgenId] = useState<string | undefined>(smartgenIdProp); // 👈 will cache POST-created id

// // // //   const recognitionRef = useRef<any>(null);
// // // //   const [isModalOpen, setIsModalOpen] = useState(false);
// // // //   const navigate = useNavigate();
// // // //   const saveBtnRef = useRef<HTMLButtonElement | null>(null);

// // // //   const { token, user, persistAuth } = useAuth() as any;

// // // //   useEffect(() => {
// // // //     // if parent later provides/changes id, sync it
// // // //     if (smartgenIdProp && smartgenIdProp !== smartgenId) {
// // // //       setSmartgenId(smartgenIdProp);
// // // //     }
// // // //   }, [smartgenIdProp]);

// // // //   const openSaveModal = () => setIsModalOpen(true);

// // // // //   const handleSaveFromModal = (payload?: { title?: string; type?: string; category?: string }) => {
// // // // //     const finalTitle = payload?.title?.trim() || userPrompt || "Untitled";
// // // // //     const finalDesc = detailedPrompt || "No result yet";
// // // // //     const finalType = (payload?.type as any) || "smartgen";
// // // // //     const finalCategory = (payload?.category ?? "").trim();

// // // // //     saveItem({
// // // // //       title: finalTitle,
// // // // //       prompt: finalDesc,
// // // // //       type: finalType,
// // // // //       category: finalCategory,
// // // // //     });

// // // // //     setIsModalOpen(false);
// // // // //   toast({
// // // // //     title: "Saved to Collections",
// // // // //     description: `Saved to ${finalType === "smartgen" ? "Smartgen" : finalType}${finalCategory ? ` › ${finalCategory}` : ""}.`,
// // // // //   });
// // // // // };



// // // // const handleSaveFromModal = async (payload?: {
// // // //   title?: string;
// // // //   type?: string;
// // // //   category?: string;
// // // //   quick?: boolean;
// // // // }) => {
// // // //   const finalTitle = (payload?.title ?? "").trim() || (userPrompt || "Untitled").trim();
// // // //   const isQuick = !!payload?.quick;

// // // //   try {
// // // //     // 1) Hit server
// // // //     const serverResp = await saveSmartgenToServer({
// // // //       collectionTitle: isQuick ? undefined : finalTitle, // quick → directItems; create → collection
// // // //       name: finalTitle, // keep a readable label on the item
// // // //     });

// // // //     if (serverResp?.success) {
// // // //       toast({
// // // //         title: "Saved",
// // // //         description: isQuick
// // // //           ? "Added to All Saved (direct items)."
// // // //           : `Created/updated collection “${finalTitle}”.`,
// // // //       });
// // // //     } else {
// // // //       // If server didn't respond success (rare), still mirror locally so UI feels responsive
// // // //       saveItem({
// // // //         title: finalTitle,
// // // //         prompt: detailedPrompt || "No result yet",
// // // //         type: "smartgen",
// // // //         category: isQuick ? "All Saved" : finalTitle,
// // // //       });
// // // //       toast({
// // // //         title: "Saved locally",
// // // //         description: "Could not confirm server save, mirrored to local.",
// // // //       });
// // // //     }
// // // //   } catch (e: any) {
// // // //     // On failure, mirror to local as fallback so the user doesn’t lose the action
// // // //     saveItem({
// // // //       title: finalTitle,
// // // //       prompt: detailedPrompt || "No result yet",
// // // //       type: "smartgen",
// // // //       category: isQuick ? "All Saved" : finalTitle,
// // // //     });
// // // //     toast({
// // // //       title: "Saved locally",
// // // //       description: e?.message || "Server save failed; mirrored to local storage.",
// // // //     });
// // // //   } finally {
// // // //     setIsModalOpen(false);
// // // //   }
// // // // };














// // // //   const exampleIdeas = [
// // // //     { text: "Help me create a marketing strategy", img: "/icons/i1.png", title: "Marketing Strategy" },
// // // //     { text: "Write a technical tutorial for beginners", img: "/icons/i2.png", title: "Technical Tutorial" },
// // // //     { text: "Analyze competitor pricing models", img: "/icons/i3.png", title: "Pricing Models" },
// // // //     { text: "Design a user onboarding flow", img: "/icons/i4.png", title: "Design" },
// // // //   ];

// // // //   /** speech setup */
// // // //   useEffect(() => {
// // // //     if (typeof window !== "undefined") {
// // // //       const SpeechRecognition =
// // // //         (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
// // // //       if (SpeechRecognition) {
// // // //         setSpeechSupported(true);
// // // //         recognitionRef.current = new SpeechRecognition();
// // // //         recognitionRef.current.continuous = false;
// // // //         recognitionRef.current.interimResults = false;
// // // //         recognitionRef.current.lang = "en-US";

// // // //         recognitionRef.current.onresult = (event: any) => {
// // // //           const transcript = event.results[0][0].transcript;
// // // //           setUserPrompt((prev) => prev + (prev ? " " : "") + transcript);
// // // //           setIsListening(false);
// // // //         };
// // // //         recognitionRef.current.onerror = () => {
// // // //           setIsListening(false);
// // // //           toast({
// // // //             title: "Speech recognition failed",
// // // //             description: "Please try again or use text input",
// // // //             variant: "destructive",
// // // //           });
// // // //         };
// // // //         recognitionRef.current.onend = () => setIsListening(false);
// // // //       }
// // // //     }
// // // //   }, []);

// // // //   const startListening = () => {
// // // //     if (recognitionRef.current && speechSupported) {
// // // //       setIsListening(true);
// // // //       recognitionRef.current.start();
// // // //     }
// // // //   };
// // // //   const stopListening = () => {
// // // //     if (recognitionRef.current) {
// // // //       recognitionRef.current.stop();
// // // //       setIsListening(false);
// // // //     }
// // // //   };

// // // //   const handleExampleClick = (idea: any) => setUserPrompt(idea.text);

// // // //   /** ─────────────────────────────
// // // //    *  API HELPERS (POST + PUT)
// // // //    *  ────────────────────────────*/
// // // //   const logFormData = (fd: FormData) => {
// // // //     // browsers don't show FormData content directly, iterate:
// // // //     const preview: Record<string, any[]> = {};
    
// // // //     for (const [k, v] of fd.entries()) {
// // // //       if (!preview[k]) preview[k] = [];
// // // //       if (v instanceof File) {
// // // //         preview[k].push({ fileName: v.name, size: v.size, type: v.type });
// // // //       } else {
// // // //         preview[k].push(v);
// // // //       }
// // // //     }
// // // //     console.log("[Smartgen -> FormData]", preview);
// // // //   };

// // // //   const postCreateSmartgen = async ({
// // // //     inputPrompt,
// // // //     detailedPrompt,
// // // //     tokensUsed,
// // // //   }: {
// // // //     inputPrompt: string;
// // // //     detailedPrompt: string;
// // // //     tokensUsed: number;
// // // //   }) => {
// // // //     const safeTokens = Math.max(1, Number.isFinite(tokensUsed) ? tokensUsed : 0);
// // // //     const fd = new FormData();
// // // //     fd.append("inputPrompt", inputPrompt);
// // // //     fd.append("detailedPrompt", detailedPrompt);
// // // //     fd.append("tokensUsed", String(safeTokens));
// // // //     for (const f of files) fd.append("attachments", f);

// // // //     const base = API_BASE.replace(/\/+$/, "");
// // // //     const url = `${base}/api/smartgen`;
// // // //     console.log("🔵 POST create URL:", url);
// // // //     console.log("🔵 Auth header:", token ? "Bearer present ✅" : "❌ missing");
// // // //     logFormData(fd);

// // // //     const res = await fetch(url, {
// // // //       method: "POST",
// // // //       headers: token ? { Authorization: `Bearer ${token}` } : undefined,
// // // //       body: fd,
// // // //       credentials: "include",
// // // //     });

// // // //     const raw = await res.text();
// // // //     console.log("🔵 POST status:", res.status, res.statusText);
// // // //     console.log("🔵 POST raw body:", raw);

// // // //     const data = (() => {
// // // //       try {
// // // //         return JSON.parse(raw);
// // // //       } catch {
// // // //         return {};
// // // //       }
// // // //     })();

// // // //     if (!res.ok) throw new Error(data?.error || `http_${res.status}`);

// // // //     if (typeof data?.dailyTokensRemaining === "number" && user && persistAuth) {
// // // //       persistAuth({ user: { ...user, dailyTokensRemaining: data.dailyTokensRemaining } });
// // // //     }

// // // //     toast({
// // // //       title: "Smartgen created",
// // // //       description:
// // // //         typeof data?.dailyTokensRemaining === "number"
// // // //           ? `Daily tokens remaining: ${data.dailyTokensRemaining}`
// // // //           : "Created successfully.",
// // // //     });

// // // //     // Expect backend to return { item: { id: ... } }
// // // //     const newId = data?.item?.id || data?.item?._id;
// // // //     if (newId) setSmartgenId(newId);
// // // //     return data?.item;
// // // //   };

// // // //  const putUpdateSmartgen = async ({
// // // //   id,
// // // //   inputPrompt,
// // // //   detailedPrompt,
// // // //   tokensUsed,
// // // // }: {
// // // //   id: string;
// // // //   inputPrompt: string;
// // // //   detailedPrompt: string;
// // // //   tokensUsed: number;
// // // // }) => {
// // // //   const safeTokens = Math.max(1, Number.isFinite(tokensUsed) ? tokensUsed : 0);
// // // //   const fd = new FormData();
// // // //   fd.append("inputPrompt", inputPrompt);
// // // //   fd.append("detailedPrompt", detailedPrompt);
// // // //   fd.append("tokensUsed", String(safeTokens));
// // // //   for (const f of files) fd.append("attachments", f);

// // // //   const base = API_BASE.replace(/\/+$/, "");
// // // //   const url = `${base}/api/smartgen/${id}`;
// // // //   const res = await fetch(url, {
// // // //     method: "PUT",
// // // //     headers: token ? { Authorization: `Bearer ${token}` } : undefined,
// // // //     body: fd,
// // // //     credentials: "include",
// // // //   });

// // // //   const raw = await res.text();
// // // //   const data = (() => {
// // // //     try { return JSON.parse(raw); } catch { return {}; }
// // // //   })();

// // // //   if (!res.ok) throw new Error(data?.error || `http_${res.status}`);

// // // //   if (typeof data?.dailyTokensRemaining === "number" && user && persistAuth) {
// // // //     persistAuth({ user: { ...user, dailyTokensRemaining: data.dailyTokensRemaining } });
// // // //   }

// // // //   toast({ title: "Smartgen updated", description: "Updated successfully." });

// // // //   // ⬇️ Refresh local state with latest id
// // // //   const newId = data?.item?.id || data?.item?._id;
// // // //   if (newId) setSmartgenId(newId);

// // // //   return data?.item;
// // // // };


// // // //   /** Upsert: if we have id -> PUT; else -> POST then cache id */
// // // //   const upsertSmartgen = async (payload: {
// // // //     inputPrompt: string;
// // // //     detailedPrompt: string;
// // // //     tokensUsed: number;
// // // //   }) => {
// // // //     try {
// // // //       if (smartgenId) {
// // // //         // console.log("↪ Using PUT (already have smartgenId):", smartgenId);
// // // //         const updated = await putUpdateSmartgen({ id: smartgenId, ...payload });
// // // //         console.log("✅ PUT updated item:", updated);
// // // //         return updated;
// // // //       } else {
// // // //         console.log("↪ Using POST (no smartgenId yet) …");
// // // //         const created = await postCreateSmartgen(payload);
// // // //         console.log("✅ POST created item:", created);
// // // //         return created;
// // // //       }
// // // //     } catch (e: any) {
// // // //       console.error("[Smartgen upsert error]", e);
// // // //       toast({
// // // //         title: "Save failed",
// // // //         description: e?.message || "Unable to save Smartgen",
// // // //         variant: "destructive",
// // // //       });
// // // //       return null;
// // // //     }
// // // //   };


// // // // /** POST /api/saved */
// // // // const saveSmartgenToServer = async ({
// // // //   collectionTitle,
// // // //   name,
// // // // }: {
// // // //   collectionTitle?: string;
// // // //   name: string;
// // // // }) => {
// // // //   if (!token) {
// // // //     toast({ title: "Not signed in", description: "Please login to save.", variant: "destructive" });
// // // //     return null;
// // // //   }
// // // //   if (!smartgenId) {
// // // //     // Guard: make sure we have an id. If user opened Save before generating, block.
// // // //     toast({
// // // //       title: "Nothing to save yet",
// // // //       description: "Generate a Smartgen first, then try saving.",
// // // //       variant: "destructive",
// // // //     });
// // // //     return null;
// // // //   }

// // // //   const base = API_BASE.replace(/\/+$/, "");
// // // //   const url = `${base}/api/saved`;

// // // //   const payload = {
// // // //     section: "smartgen",           // ← required by your route
// // // //     refId: smartgenId,             // ← Smartgen._id
// // // //     collectionTitle: collectionTitle?.trim() || undefined, // undefined → goes to directItems
// // // //     name: name?.trim() || undefined,                        // optional label
// // // //   };

// // // //   const res = await fetch(url, {
// // // //     method: "POST",
// // // //     headers: {
// // // //       Authorization: `Bearer ${token}`,
// // // //       "Content-Type": "application/json",
// // // //     },
// // // //     body: JSON.stringify(payload),
// // // //     credentials: "include",
// // // //   });

// // // //   const raw = await res.text();
// // // //   let data: any = {};
// // // //   try { data = JSON.parse(raw); } catch {}

// // // //   if (!res.ok) {
// // // //     const msg =
// // // //       data?.error === "invalid_section" ? "Invalid section"
// // // //       : data?.error === "invalid_refId" ? "Invalid reference id"
// // // //       : data?.error || `http_${res.status}`;
// // // //     throw new Error(msg);
// // // //   }

// // // //   return data; // { success: true, savedCollection }
// // // // };


















// // // //   /** Generate + save (PUT or POST) */
// // // //   const generateDetailedPrompt = async () => {
// // // //     const promptToProcess = userPrompt.trim();
// // // //     if (!promptToProcess) {
// // // //       toast({
// // // //         title: "No prompt provided",
// // // //         description: "Please enter a prompt first",
// // // //         variant: "destructive",
// // // //       });
// // // //       return;
// // // //     }
// // // //     setIsGenerating(true);

// // // //     try {
// // // //       const result = await llmService.generateDetailedPrompt(promptToProcess);

// // // //       setDetailedPrompt(result.optimizedText);
// // // //       setSuggestions(result.suggestions || []);

// // // //       const originalTokens = Math.ceil(promptToProcess.length / 4);
// // // //       const tokensUsed =
// // // //         (result?.usage?.total as number | undefined) ??
// // // //         originalTokens + Math.ceil((result?.optimizedText?.length || 0) / 4);

// // // //       const efficiencyScore = Math.min(
// // // //         95,
// // // //         Math.max(
// // // //           60,
// // // //           100 -
// // // //             Math.round(
// // // //               (((result?.tokens ?? Math.ceil((result?.optimizedText?.length || 0) / 4)) - originalTokens) /
// // // //                 Math.max(originalTokens, 1)) *
// // // //                 50
// // // //             )
// // // //         )
// // // //       );
// // // //       setTokenEfficiencyScore(efficiencyScore);

// // // //       onPromptGenerated?.(result.optimizedText);
// // // //       toast({ title: "Detailed Prompt Generated!", description: "Your detailed prompt is ready" });

// // // //       // ⬇️ Save (PUT if we already have an id; otherwise POST then cache id)
// // // //       const saved = await upsertSmartgen({
// // // //         inputPrompt: promptToProcess,
// // // //         detailedPrompt: result.optimizedText,
// // // //         tokensUsed,
// // // //       });
// // // //       if (saved) console.log("💾 Upsert success:", saved);
// // // //     } catch (err: any) {
// // // //       console.error(err);
// // // //       toast({
// // // //         title: "Error",
// // // //         description: err.message || "Failed to generate prompt",
// // // //         variant: "destructive",
// // // //       });
// // // //     } finally {
// // // //       setIsGenerating(false);
// // // //     }
// // // //   };

// // // //   const copyToClipboard = (text: string, type: string) => {
// // // //     navigator.clipboard.writeText(text);
// // // //     toast({ title: "Copied to clipboard", description: `${type} has been copied successfully` });
// // // //   };
// // // //   const downloadPrompt = () => {
// // // //     const element = document.createElement("a");
// // // //     const file = new Blob([detailedPrompt], { type: "text/plain" });
// // // //     element.href = URL.createObjectURL(file);
// // // //     element.download = "detailed-prompt.txt";
// // // //     document.body.appendChild(element);
// // // //     element.click();
// // // //     document.body.removeChild(element);
// // // //     toast({ title: "Download started", description: "Your prompt has been downloaded as a text file" });
// // // //   };

// // // //   return (
// // // //     <div className="space-y-6">
// // // //       {/* just to see which path we’ll take */}
    

// // // //       {detailedPrompt && (
// // // //         <IdeasStrip
// // // //           exampleIdeas={exampleIdeas}
// // // //           activeIndex={activeIndex}
// // // //           setActiveIndex={setActiveIndex}
// // // //           handleExampleClick={handleExampleClick}
// // // //         />
// // // //       )}

// // // //       <div className="mx-auto w-full max-w-[1050px] rounded-[36px] bg-[#121213] overflow-visible px-0">
// // // //         <div className="flex justify-center px-4 pt-4 md:pt-6">
// // // //           <div className="relative w-full max-w-[1000px] min-h-[200px] md:h-[200px] rounded-[30px] bg-[#121213] border border-[#282829] text-white overflow-hidden">
// // // //             <div className="h-full flex">
// // // //               <div className="w-12" />
// // // //               <div className="flex-1 pr-14 pl-2 py-4">
// // // //                 <Textarea
// // // //                   value={userPrompt}
// // // //                   onChange={(e) => setUserPrompt(e.target.value)}
// // // //                   placeholder="Write a technical tutorial for beginners"
// // // //                   className="w-full h-full bg-transparent border-none resize-none text-white placeholder-white/70 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-base leading-relaxed"
// // // //                 />
// // // //               </div>
// // // //               <div className="w-12" />
// // // //             </div>

// // // //             {/* Bottom-left: attachments */}
// // // //             <div className="absolute bottom-3 left-3">
// // // //               <input
// // // //                 type="file"
// // // //                 id="file-upload"
// // // //                 className="hidden"
// // // //                 multiple
// // // //                 onChange={(e) => {
// // // //                   const selected = Array.from(e.target.files || []);
// // // //                   setFiles(selected);
// // // //                   console.log("📎 Selected files:", selected.map(f => ({ name: f.name, size: f.size, type: f.type })));
// // // //                   if (selected.length) {
// // // //                     toast({
// // // //                       title: "Files attached",
// // // //                       description: `${selected.length} file(s) selected`,
// // // //                     });
// // // //                   }
// // // //                 }}
// // // //               />
// // // //               <label htmlFor="file-upload" className="cursor-pointer">
// // // //                 <div className="h-8 w-8 grid place-items-center rounded-full bg-white/10 text-white hover:bg-white/15">
// // // //                   <Paperclip className="h-5 w-5" />
// // // //                 </div>
// // // //               </label>
// // // //             </div>

// // // //             {/* Bottom-right controls */}
// // // //             <div className="absolute bottom-3 right-3 flex items-center gap-2">
// // // //               <button
// // // //                 onClick={() => setUserPrompt("")}
// // // //                 className="h-9 w-[63px] rounded-[40px] flex items-center justify-center text-white text-sm"
// // // //                 style={{ background: "#2C2C2C" }}
// // // //                 title="Clear"
// // // //                 aria-label="Clear"
// // // //               >
// // // //                 Clear
// // // //               </button>

// // // //               {speechSupported && (
// // // //                 <button
// // // //                   onClick={isListening ? () => recognitionRef.current?.stop() : () => recognitionRef.current?.start()}
// // // //                   className="relative h-9 w-9 rounded-full grid place-items-center overflow-visible"
// // // //                   style={{ background: "#2C2C2C" }}
// // // //                   title={isListening ? "Stop voice input" : "Start voice input"}
// // // //                   aria-label="Microphone"
// // // //                 >
// // // //                   {isListening && (
// // // //                     <>
// // // //                       <span className="absolute inset-0 rounded-full opacity-60 animate-ping" style={{ background: GRADIENT }} />
// // // //                       <span className="absolute inset-0 rounded-full opacity-40 animate-ping" style={{ background: GRADIENT, animationDelay: "0.4s" }} />
// // // //                     </>
// // // //                   )}
// // // //                   <img src="/icons/mic.png" alt="Mic" className={`h-4 w-4 ${isListening ? "animate-pulse" : ""}`} />
// // // //                 </button>
// // // //               )}

// // // //               <Button
// // // //                 onClick={generateDetailedPrompt}
// // // //                 disabled={isGenerating || !userPrompt.trim()}
// // // //                 size="sm"
// // // //                 className="h-8 w-8 p-0 rounded-full bg-[linear-gradient(270.19deg,#1A73E8_0.16%,#FF14EF_99.84%)] text-white hover:opacity-90 disabled:opacity-50"
// // // //                 title="Generate"
// // // //               >
// // // //                 {isGenerating ? <Wand2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
// // // //               </Button>
// // // //             </div>
// // // //           </div>
// // // //         </div>

// // // //         {!detailedPrompt && (
// // // //           <div className="flex justify-center px-4 -mt-px pb-4 md:pb-6">
// // // //             <div className="relative w-full max-w-[1000px] h-[200px] rounded-[30px] bg-[#121213] border border-[#282829] text-white overflow-hidden">
// // // //               <div className="grid grid-cols-4 h-full">
// // // //                 {exampleIdeas.map((idea, index) => {
// // // //                   const isActive = index === activeIndex;
// // // //                   return (
// // // //                     <button
// // // //                       key={index}
// // // //                       onClick={() => {
// // // //                         handleExampleClick(idea);
// // // //                         setActiveIndex(index);
// // // //                       }}
// // // //                       className={[
// // // //                         "relative h-full w-full text-left",
// // // //                         "flex flex-col items-start justify-start px-6 pt-8 pb-4",
// // // //                         index !== 0 ? "border-l border-[#282829]" : "",
// // // //                         isActive ? "bg-white/5" : "hover:bg-white/7",
// // // //                       ].join(" ")}
// // // //                     >
// // // //                       <img src={idea.img} alt={idea.title} className="h-6 w-6 mb-2" />
// // // //                       <div className="text-white font-semibold leading-[1.1] text-[15px]" style={{ fontFamily: "Inter" }}>
// // // //                         {idea.title}
// // // //                       </div>
// // // //                       <div className="text-white/70 text-[15px] leading-[1.2] mt-[6px]" style={{ fontFamily: "Inter" }}>
// // // //                         {idea.text}
// // // //                       </div>
// // // //                     </button>
// // // //                   );
// // // //                 })}
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         )}

// // // //         {detailedPrompt && (
// // // //           <div className="px-4 pb-6">
// // // //             <div className="mx-auto w-full max-w-[1000px]">
// // // //               <div className="text-center my-6">
// // // //                 <h3 className="text-white font-semibold text-xl md:text-2xl">Detailed Prompt</h3>
// // // //               </div>

// // // //               <div className={`${CARD_FRAME} relative p-4 md:p-5`}>
// // // //                 <div className="text-white/90 text-sm leading-relaxed md:pr-[8rem] whitespace-pre-line">
// // // //                   {detailedPrompt}
// // // //                 </div>

// // // //                 <div className="mt-4 md:mt-0 md:absolute md:bottom-4 md:right-4 flex flex-wrap gap-2">
// // // //                   <button
// // // //                     ref={saveBtnRef}
// // // //                     onClick={() => setIsModalOpen((v) => !v)}
// // // //                     aria-pressed={isModalOpen}
// // // //                     title="Save"
// // // //                     aria-label="Save"
// // // //                     className="w-10 h-10 rounded-full flex items-center justify-center transition-colors border"
// // // //                     style={{ background: isModalOpen ? GRADIENT : "#252525", borderColor: "#333335" }}
// // // //                   >
// // // //                     <img src="/icons/cop.png" alt="Save" className="w-5 h-5 object-contain" />
// // // //                   </button>

// // // //                   <button
// // // //                     onClick={() => {
// // // //                       setActiveAction("copy");
// // // //                       copyToClipboard(detailedPrompt, "Prompt");
// // // //                     }}
// // // //                     aria-pressed={activeAction === "copy"}
// // // //                     className="h-9 w-9 rounded-full flex items-center justify-center transition-colors"
// // // //                     style={{ background: activeAction === "copy" ? GRADIENT : "#252525" }}
// // // //                     title="Copy"
// // // //                   >
// // // //                     <Copy className="h-4 w-4 text-white" />
// // // //                   </button>

// // // //                   <button
// // // //                     onClick={() => {
// // // //                       setActiveAction("download");
// // // //                       downloadPrompt();
// // // //                     }}
// // // //                     aria-pressed={activeAction === "download"}
// // // //                     className="h-9 w-9 rounded-full flex items-center justify-center transition-colors"
// // // //                     style={{ background: activeAction === "download" ? GRADIENT : "#252525" }}
// // // //                     title="Download"
// // // //                   >
// // // //                     <Download className="h-4 w-4 text-white" />
// // // //                   </button>

// // // //                   <button
// // // //                     onClick={() => {
// // // //                       setActiveAction("open");
// // // //                       const encodedPrompt = encodeURIComponent(detailedPrompt);
// // // //                       window.open(`https://chat.openai.com/?prompt=${encodedPrompt}`, "_blank");
// // // //                     }}
// // // //                     aria-pressed={activeAction === "open"}
// // // //                     className="h-9 w-9 rounded-full flex items-center justify-center transition-colors"
// // // //                     style={{ background: activeAction === "open" ? GRADIENT : "#252525" }}
// // // //                     title="Open in ChatGPT"
// // // //                   >
// // // //                     <ExternalLink className="h-4 w-4 text-white" />
// // // //                   </button>
// // // //                 </div>
// // // //               </div>

// // // //               <div className="mt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-2">
// // // //                 <div className="flex flex-col items-center shrink-0">
// // // //                   <div className="mb-0.5 text-white/70" style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "12px", lineHeight: "100%" }}>
// // // //                     Original Length
// // // //                   </div>
// // // //                   <div className="px-3 py-[6px] rounded-full bg-[#252525] leading-none">
// // // //                     <span
// // // //                       style={{
// // // //                         background: "linear-gradient(90deg, #FF14EF 0%, #1A73E8 100%)",
// // // //                         WebkitBackgroundClip: "text",
// // // //                         backgroundClip: "text",
// // // //                         color: "transparent",
// // // //                         fontFamily: "Inter",
// // // //                         fontWeight: 400,
// // // //                       }}
// // // //                     >
// // // //                       {Math.ceil(userPrompt.length / 4)} Tokens
// // // //                     </span>
// // // //                   </div>
// // // //                 </div>

// // // //                 <div className="flex flex-col items-center shrink-0">
// // // //                   <div className="mb-0.5 text-white/70" style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "12px", lineHeight: "100%" }}>
// // // //                     Efficiency Score
// // // //                   </div>
// // // //                   <div className="px-3 py-[6px] rounded-full bg-[#252525] leading-none">
// // // //                     <span
// // // //                       style={{
// // // //                         background: "linear-gradient(90deg, #FF14EF 0%, #1A73E8 100%)",
// // // //                         WebkitBackgroundClip: "text",
// // // //                         backgroundClip: "text",
// // // //                         color: "transparent",
// // // //                         fontFamily: "Inter",
// // // //                         fontWeight: 400,
// // // //                       }}
// // // //                     >
// // // //                       {tokenEfficiencyScore}% needs improvement
// // // //                     </span>
// // // //                   </div>
// // // //                 </div>

// // // //                 <div className="flex flex-col items-center shrink-0">
// // // //                   <div className="mb-0.5 text-white/70" style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "12px", lineHeight: "100%" }}>
// // // //                     Detailed Length
// // // //                   </div>
// // // //                   <div className="px-3 py-[6px] rounded-full bg-[#252525] leading-none">
// // // //                     <span
// // // //                       style={{
// // // //                         background: "linear-gradient(90deg, #FF14EF 0%, #1A73E8 100%)",
// // // //                         WebkitBackgroundClip: "text",
// // // //                         backgroundClip: "text",
// // // //                         color: "transparent",
// // // //                         fontFamily: "Inter",
// // // //                         fontWeight: 400,
// // // //                       }}
// // // //                     >
// // // //                       {Math.ceil(detailedPrompt.length / 4)} Tokens
// // // //                     </span>
// // // //                   </div>
// // // //                 </div>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         )}
// // // //       </div>

// // // //       {isGenerating && (
// // // //         <div className="text-center text-muted-foreground mb-4">
// // // //           <div className="flex items-center justify-center gap-2 mb-2">
// // // //             <div className="w-2 h-2 bg-tokun rounded-full animate-bounce"></div>
// // // //             <div className="w-2 h-2 bg-tokun rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
// // // //             <div className="w-2 h-2 bg-tokun rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
// // // //           </div>
// // // //           <p>Creating detailed prompt...</p>
// // // //         </div>
// // // //       )}

// // // //       <ModalComponent
// // // //         isOpen={isModalOpen}
// // // //         onClose={() => setIsModalOpen(false)}
// // // //         onSave={handleSaveFromModal}
// // // //         anchorRef={saveBtnRef}
// // // //       />
// // // //     </div>
// // // //   );
// // // // };

// // // // export default SmarterPrompt;


// // import { useState, useEffect, useRef } from "react";
// // import { Button } from "@/components/ui/button";
// // import { Textarea } from "@/components/ui/textarea";
// // import { toast } from "@/components/ui/use-toast";
// // import { Wand2, Copy, Download, ExternalLink, Paperclip, Send } from "lucide-react";
// // import ModalComponent from "@/components/ModalComponent";
// // import { saveItem } from "@/lib/savedCollections";
// // import { llmService } from "@/services/llmService";
// // import { useAuth } from "@/contexts/AuthContext";

// // interface SmarterPromptProps {
// //   onPromptGenerated?: (prompt: string) => void;
// //   onUseInOptimizer?: (prompt: string) => void;
// //   /** If parent already created Smartgen and knows the id, pass it here */
// //   smartgenId?: string;
// // }

// // const API_BASE = (import.meta as any).env?.VITE_API_URL || "http://localhost:5000";
// // const GRADIENT = "linear-gradient(270.19deg, #1A73E8 0.16%, #FF14EF 99.84%)";
// // const CARD_FRAME =
// //   "w-full max-w-[1000px] rounded-[30px] border border-[#282829] bg-[#121213] overflow-hidden";

// // const IdeasStrip = ({
// //   exampleIdeas,
// //   activeIndex,
// //   setActiveIndex,
// //   handleExampleClick,
// // }: {
// //   exampleIdeas: { img: string; title: string; text: string }[];
// //   activeIndex: number;
// //   setActiveIndex: (n: number) => void;
// //   handleExampleClick: (idea: any) => void;
// // }) => {
// //   return (
// //     <div className="mx-auto w-full px-4 font-inter">
// //       <div className="mx-auto w-full max-w-[1047.5px] h-[110px] rounded-[20px] border border-[#282829] bg-[#121213] overflow-hidden">
// //         <div className="h-full overflow-x-auto md:overflow-visible no-scrollbar snap-x snap-mandatory">
// //           <div className="grid grid-cols-[repeat(4,minmax(0,1fr))] h-full min-w-[1040px] md:min-w-0 md:grid-cols-4">
// //             {exampleIdeas.map((idea, idx) => (
// //               <button
// //                 key={idx}
// //                 onClick={() => {
// //                   handleExampleClick(idea);
// //                   setActiveIndex(idx);
// //                 }}
// //                 className={[
// //                   "relative h-[110px] w-full text-left",
// //                   "flex items-center gap-3 px-5 snap-start",
// //                   idx !== 0 ? "border-l border-[#282829]" : "",
// //                   idx === activeIndex ? "bg-white/5" : "hover:bg-white/7",
// //                 ].join(" ")}
// //                 aria-label={idea.title}
// //                 title={idea.title}
// //               >
// //                 <img src={idea.img} alt="" className="h-6 w-6 object-contain" />
// //                 <div className="flex flex-col items-start">
// //                   <div className="text-white font-semibold leading-[1.1] text-[15px]">
// //                     {idea.title}
// //                   </div>
// //                   <div className="text-white/80 text-[12px] leading-[1.2] mt-[6px]">
// //                     {idea.text}
// //                   </div>
// //                 </div>
// //               </button>
// //             ))}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // const SmarterPrompt = ({
// //   onPromptGenerated,
// //   onUseInOptimizer,
// //   smartgenId: smartgenIdProp,
// // }: SmarterPromptProps) => {
// //   const [isGenerating, setIsGenerating] = useState(false);
// //   const [userPrompt, setUserPrompt] = useState("");
// //   const [detailedPrompt, setDetailedPrompt] = useState("");
// //   const [activeIndex, setActiveIndex] = useState(0);
// //   const [activeAction, setActiveAction] = useState<"copy" | "download" | "save" | "open" | null>(null);
// //   const [tokenEfficiencyScore, setTokenEfficiencyScore] = useState(0);
// //   const [files, setFiles] = useState<File[]>([]);
// //   const [smartgenId, setSmartgenId] = useState<string | undefined>(smartgenIdProp); // cache POST-created id

// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const saveBtnRef = useRef<HTMLButtonElement | null>(null);

// //   const { token, user, persistAuth } = useAuth() as any;

// //   useEffect(() => {
// //     // if parent later provides/changes id, sync it
// //     if (smartgenIdProp && smartgenIdProp !== smartgenId) {
// //       setSmartgenId(smartgenIdProp);
// //     }
// //   }, [smartgenIdProp]);

// //   const exampleIdeas = [
// //     { text: "Help me create a marketing strategy", img: "/icons/i1.png", title: "Marketing Strategy" },
// //     { text: "Write a technical tutorial for beginners", img: "/icons/i2.png", title: "Technical Tutorial" },
// //     { text: "Analyze competitor pricing models", img: "/icons/i3.png", title: "Pricing Models" },
// //     { text: "Design a user onboarding flow", img: "/icons/i4.png", title: "Design" },
// //   ];

// //   const handleExampleClick = (idea: any) => setUserPrompt(idea.text);

// //   /** ─────────────────────────────
// //    *  API HELPERS (POST + PUT)
// //    *  ────────────────────────────*/
// //   const logFormData = (fd: FormData) => {
// //     const preview: Record<string, any[]> = {};
// //     for (const [k, v] of fd.entries()) {
// //       if (!preview[k]) preview[k] = [];
// //       if (v instanceof File) {
// //         preview[k].push({ fileName: v.name, size: v.size, type: v.type });
// //       } else {
// //         preview[k].push(v);
// //       }
// //     }
// //     console.log("[Smartgen -> FormData]", preview);
// //   };

// //   const postCreateSmartgen = async ({
// //     inputPrompt,
// //     detailedPrompt,
// //     tokensUsed,
// //   }: {
// //     inputPrompt: string;
// //     detailedPrompt: string;
// //     tokensUsed: number;
// //   }) => {
// //     const safeTokens = Math.max(1, Number.isFinite(tokensUsed) ? tokensUsed : 0);
// //     const fd = new FormData();
// //     fd.append("inputPrompt", inputPrompt);
// //     fd.append("detailedPrompt", detailedPrompt);
// //     fd.append("tokensUsed", String(safeTokens));
// //     for (const f of files) fd.append("attachments", f);

// //     const base = API_BASE.replace(/\/+$/, "");
// //     const url = `${base}/api/smartgen`;
// //     console.log("🔵 POST create URL:", url);
// //     console.log("🔵 Auth header:", token ? "Bearer present ✅" : "❌ missing");
// //     logFormData(fd);

// //     const res = await fetch(url, {
// //       method: "POST",
// //       headers: token ? { Authorization: `Bearer ${token}` } : undefined,
// //       body: fd,
// //       credentials: "include",
// //     });

// //     const raw = await res.text();
// //     console.log("🔵 POST status:", res.status, res.statusText);
// //     console.log("🔵 POST raw body:", raw);

// //     const data = (() => {
// //       try {
// //         return JSON.parse(raw);
// //       } catch {
// //         return {};
// //       }
// //     })();

// //     if (!res.ok) throw new Error(data?.error || `http_${res.status}`);

// //     if (typeof data?.dailyTokensRemaining === "number" && user && persistAuth) {
// //       persistAuth({ user: { ...user, dailyTokensRemaining: data.dailyTokensRemaining } });
// //     }

// //     toast({
// //       title: "Smartgen created",
// //       description:
// //         typeof data?.dailyTokensRemaining === "number"
// //           ? `Daily tokens remaining: ${data.dailyTokensRemaining}`
// //           : "Created successfully.",
// //     });

// //     const newId = data?.item?.id || data?.item?._id;
// //     if (newId) setSmartgenId(newId);
// //     return data?.item;
// //   };

// //   const putUpdateSmartgen = async ({
// //     id,
// //     inputPrompt,
// //     detailedPrompt,
// //     tokensUsed,
// //   }: {
// //     id: string;
// //     inputPrompt: string;
// //     detailedPrompt: string;
// //     tokensUsed: number;
// //   }) => {
// //     const safeTokens = Math.max(1, Number.isFinite(tokensUsed) ? tokensUsed : 0);
// //     const fd = new FormData();
// //     fd.append("inputPrompt", inputPrompt);
// //     fd.append("detailedPrompt", detailedPrompt);
// //     fd.append("tokensUsed", String(safeTokens));
// //     for (const f of files) fd.append("attachments", f);

// //     const base = API_BASE.replace(/\/+$/, "");
// //     const url = `${base}/api/smartgen/${id}`;
// //     const res = await fetch(url, {
// //       method: "PUT",
// //       headers: token ? { Authorization: `Bearer ${token}` } : undefined,
// //       body: fd,
// //       credentials: "include",
// //     });

// //     const raw = await res.text();
// //     const data = (() => {
// //       try {
// //         return JSON.parse(raw);
// //       } catch {
// //         return {};
// //       }
// //     })();

// //     if (!res.ok) throw new Error(data?.error || `http_${res.status}`);

// //     if (typeof data?.dailyTokensRemaining === "number" && user && persistAuth) {
// //       persistAuth({ user: { ...user, dailyTokensRemaining: data.dailyTokensRemaining } });
// //     }

// //     toast({ title: "Smartgen updated", description: "Updated successfully." });

// //     const newId = data?.item?.id || data?.item?._id;
// //     if (newId) setSmartgenId(newId);

// //     return data?.item;
// //   };

// //   /** Upsert: if we have id -> PUT; else -> POST then cache id */
// //   const upsertSmartgen = async (payload: {
// //     inputPrompt: string;
// //     detailedPrompt: string;
// //     tokensUsed: number;
// //   }) => {
// //     try {
// //       if (smartgenId) {
// //         const updated = await putUpdateSmartgen({ id: smartgenId, ...payload });
// //         console.log("✅ PUT updated item:", updated);
// //         return updated;
// //       } else {
// //         console.log("↪ Using POST (no smartgenId yet) …");
// //         const created = await postCreateSmartgen(payload);
// //         console.log("✅ POST created item:", created);
// //         return created;
// //       }
// //     } catch (e: any) {
// //       console.error("[Smartgen upsert error]", e);
// //       toast({
// //         title: "Save failed",
// //         description: e?.message || "Unable to save Smartgen",
// //         variant: "destructive",
// //       });
// //       return null;
// //     }
// //   };

// //   /** POST /api/saved-collections (Smartgen section) */
// //   const saveSmartgenToServer = async ({
// //     collectionTitle,
// //     name,
// //   }: {
// //     collectionTitle?: string;
// //     name: string;
// //   }) => {
// //     if (!token) {
// //       toast({ title: "Not signed in", description: "Please login to save.", variant: "destructive" });
// //       return null;
// //     }
// //     if (!smartgenId) {
// //       toast({
// //         title: "Nothing to save yet",
// //         description: "Generate a Smartgen first, then try saving.",
// //         variant: "destructive",
// //       });
// //       return null;
// //     }

// //     const base = API_BASE.replace(/\/+$/, "");
// //     // 🔴 IMPORTANT: match your router mount path
// //     const url = `${base}/api/saved-collections`;

// //     const payload = {
// //       section: "smartgen",
// //       refId: smartgenId,
// //       collectionTitle: collectionTitle?.trim() || undefined, // undefined → directItems (All Saved)
// //       name: name?.trim() || undefined,
// //     };

// //     const res = await fetch(url, {
// //       method: "POST",
// //       headers: {
// //         Authorization: `Bearer ${token}`,
// //         "Content-Type": "application/json",
// //       },
// //       body: JSON.stringify(payload),
// //       credentials: "include",
// //     });

// //     const raw = await res.text();
// //     let data: any = {};
// //     try {
// //       data = JSON.parse(raw);
// //     } catch {}

// //     if (!res.ok) {
// //       const msg =
// //         data?.error === "invalid_section" ? "Invalid section"
// //         : data?.error === "invalid_refId" ? "Invalid reference id"
// //         : data?.error || `http_${res.status}`;
// //       throw new Error(msg);
// //     }

// //     return data; // { success: true, savedCollection }
// //   };







// // //    const extractWordLimit = (s: string): number | undefined => {
// // //   const text = (s || "").toLowerCase();
// // //   // matches: "in 100 words", "within 80 words", "max 120 words", "limit 90 words"
// // //   const m = text.match(/\b(?:in|within|max|limit|around)\s+(\d{2,3})\s+words?\b/);
// // //   if (m) {
// // //     const n = parseInt(m[1], 10);
// // //     if (Number.isFinite(n) && n >= 20 && n <= 400) return n;
// // //   }
// // //   return undefined;
// // // };

// // //   /** Generate + save (PUT or POST) */
// // //   const generateDetailedPrompt = async () => {
// // //     const promptToProcess = userPrompt.trim();
// // //     if (!promptToProcess) {
// // //       toast({
// // //         title: "No prompt provided",
// // //         description: "Please enter a prompt first",
// // //         variant: "destructive",
// // //       });
// // //       return;
// // //     }
// // //     setIsGenerating(true);

// // //     try {
// // //       const result = await llmService.generateDetailedPrompt(promptToProcess);

// // //       setDetailedPrompt(result.optimizedText);

// // //       const originalTokens = Math.ceil(promptToProcess.length / 4);
// // //       const tokensUsed =
// // //         (result?.usage?.total as number | undefined) ??
// // //         originalTokens + Math.ceil((result?.optimizedText?.length || 0) / 4);

// // //       const efficiencyScore = Math.min(
// // //         95,
// // //         Math.max(
// // //           60,
// // //           100 -
// // //             Math.round(
// // //               (((result?.tokens ?? Math.ceil((result?.optimizedText?.length || 0) / 4)) - originalTokens) /
// // //                 Math.max(originalTokens, 1)) *
// // //                 50
// // //             )
// // //         )
// // //       );
// // //       setTokenEfficiencyScore(efficiencyScore);

// // //       onPromptGenerated?.(result.optimizedText);
// // //       toast({ title: "Detailed Prompt Generated!", description: "Your detailed prompt is ready" });

// // //       // Save (PUT if id exists; otherwise POST and cache id)
// // //       const saved = await upsertSmartgen({
// // //         inputPrompt: promptToProcess,
// // //         detailedPrompt: result.optimizedText,
// // //         tokensUsed,
// // //       });
// // //       if (saved) console.log("💾 Upsert success:", saved);
// // //     } catch (err: any) {
// // //       console.error(err);
// // //       toast({
// // //         title: "Error",
// // //         description: err.message || "Failed to generate prompt",
// // //         variant: "destructive",
// // //       });
// // //     } finally {
// // //       setIsGenerating(false);
// // //     }
// // //   };




// //    // ...imports stay the same...

// // // helper: extract a desired word cap from the user's text (e.g., "in 100 words")
// // const extractWordLimit = (s: string): number | undefined => {
// //   const text = (s || "").toLowerCase();
// //   // matches: "in 100 words", "within 80 words", "max 120 words", "limit 90 words"
// //   const m = text.match(/\b(?:in|within|max|limit|around)\s+(\d{2,3})\s+words?\b/);
// //   if (m) {
// //     const n = parseInt(m[1], 10);
// //     if (Number.isFinite(n) && n >= 20 && n <= 400) return n;
// //   }
// //   return undefined;
// // };

// // // ... inside the component ...

// // const generateDetailedPrompt = async () => {
// //   const promptToProcess = userPrompt.trim();
// //   if (!promptToProcess) {
// //     toast({
// //       title: "No prompt provided",
// //       description: "Please enter a prompt first",
// //       variant: "destructive",
// //     });
// //     return;
// //   }
// //   setIsGenerating(true);

// //   try {
// //     // detect user-requested cap, else default will be 120 words in service
// //     const requestedCap = extractWordLimit(promptToProcess);

// //     const result = await llmService.generateDetailedPrompt(promptToProcess, {
// //       maxWords: requestedCap, // can be undefined; service defaults to 120
// //     });

// //     setDetailedPrompt(result.optimizedText);

// //     const originalTokens = Math.ceil(promptToProcess.length / 4);
// //     const tokensUsed =
// //       (result?.usage?.total as number | undefined) ??
// //       originalTokens + Math.ceil((result?.optimizedText?.length || 0) / 4);

// //     // quicker heuristic score unchanged
// //     const efficiencyScore = Math.min(
// //       95,
// //       Math.max(
// //         60,
// //         100 -
// //           Math.round(
// //             (((result?.tokens ?? Math.ceil((result?.optimizedText?.length || 0) / 4)) - originalTokens) /
// //               Math.max(originalTokens, 1)) *
// //               50
// //           )
// //       )
// //     );
// //     setTokenEfficiencyScore(efficiencyScore);

// //     onPromptGenerated?.(result.optimizedText);
// //     toast({
// //       title: "Detailed Prompt Generated!",
// //       description: requestedCap
// //         ? `Kept within ~${requestedCap} words.`
// //         : "Kept concise for speed.",
// //     });

// //     // Save (PUT if id exists; otherwise POST and cache id)
// //     const saved = await upsertSmartgen({
// //       inputPrompt: promptToProcess,
// //       detailedPrompt: result.optimizedText,
// //       tokensUsed,
// //     });
// //     if (saved) console.log("💾 Upsert success:", saved);
// //   } catch (err: any) {
// //     console.error(err);
// //     toast({
// //       title: "Error",
// //       description: err.message || "Failed to generate prompt",
// //       variant: "destructive",
// //     });
// //   } finally {
// //     setIsGenerating(false);
// //   }
// // };













// //   const copyToClipboard = (text: string, label: string) => {
// //     navigator.clipboard.writeText(text);
// //     toast({ title: "Copied to clipboard", description: `${label} has been copied successfully` });
// //   };

// //   const downloadPrompt = () => {
// //     const element = document.createElement("a");
// //     const file = new Blob([detailedPrompt], { type: "text/plain" });
// //     element.href = URL.createObjectURL(file);
// //     element.download = "detailed-prompt.txt";
// //     document.body.appendChild(element);
// //     element.click();
// //     document.body.removeChild(element);
// //     toast({ title: "Download started", description: "Your prompt has been downloaded as a text file" });
// //   };

// //   // called by ModalComponent when user clicks "Create" or "All Saved"
// //   const handleSaveFromModal = async (payload?: {
// //     title?: string;
// //     type?: string;
// //     category?: string;
// //     quick?: boolean;
// //   }) => {
// //     const finalTitle = (payload?.title ?? "").trim() || (userPrompt || "Untitled").trim();
// //     const isQuick = !!payload?.quick;

// //     try {
// //       // Hit server: quick → directItems; create → collection
// //       const serverResp = await saveSmartgenToServer({
// //         collectionTitle: isQuick ? undefined : finalTitle,
// //         name: finalTitle,
// //       });

// //       if (serverResp?.success) {
// //         toast({
// //           title: "Saved",
// //           description: isQuick
// //             ? "Added to All Saved (Smartgen)."
// //             : `Created/updated collection “${finalTitle}”.`,
// //         });
// //       } else {
// //         // mirror locally if server didn't confirm success
// //         saveItem({
// //           title: finalTitle,
// //           prompt: detailedPrompt || "No result yet",
// //           type: "smartgen",
// //           category: isQuick ? "All Saved" : finalTitle,
// //         });
// //         toast({
// //           title: "Saved locally",
// //           description: "Could not confirm server save, mirrored to local.",
// //         });
// //       }
// //     } catch (e: any) {
// //       // On failure, mirror to local as fallback
// //       saveItem({
// //         title: finalTitle,
// //         prompt: detailedPrompt || "No result yet",
// //         type: "smartgen",
// //         category: isQuick ? "All Saved" : finalTitle,
// //       });
// //       toast({
// //         title: "Saved locally",
// //         description: e?.message || "Server save failed; mirrored to local storage.",
// //       });
// //     } finally {
// //       setIsModalOpen(false);
// //     }
// //   };

// //   return (
// //     <div className="space-y-6">
// //       {detailedPrompt && (
// //         <IdeasStrip
// //           exampleIdeas={exampleIdeas}
// //           activeIndex={activeIndex}
// //           setActiveIndex={setActiveIndex}
// //           handleExampleClick={handleExampleClick}
// //         />
// //       )}

// //       <div className="mx-auto w-full max-w-[1050px] rounded-[36px] bg-[#121213] overflow-visible px-0">
// //         <div className="flex justify-center px-4 pt-4 md:pt-6">
// //           <div className="relative w-full max-w-[1000px] min-h-[200px] md:h-[200px] rounded-[30px] bg-[#121213] border border-[#282829] text-white overflow-hidden">
// //             <div className="h-full flex">
// //               <div className="w-12" />
// //               <div className="flex-1 pr-14 pl-2 py-4">
// //                 <Textarea
// //                   value={userPrompt}
// //                   onChange={(e) => setUserPrompt(e.target.value)}
// //                   placeholder="Write a technical tutorial for beginners"
// //                   className="w-full h-full bg-transparent border-none resize-none text-white placeholder-white/70 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-base leading-relaxed"
// //                 />
// //               </div>
// //               <div className="w-12" />
// //             </div>

// //             {/* Bottom-left: attachments */}
// //             <div className="absolute bottom-3 left-3">
// //               <input
// //                 type="file"
// //                 id="file-upload"
// //                 className="hidden"
// //                 multiple
// //                 onChange={(e) => {
// //                   const selected = Array.from(e.target.files || []);
// //                   setFiles(selected);
// //                   console.log(
// //                     "📎 Selected files:",
// //                     selected.map((f) => ({ name: f.name, size: f.size, type: f.type }))
// //                   );
// //                   if (selected.length) {
// //                     toast({ title: "Files attached", description: `${selected.length} file(s) selected` });
// //                   }
// //                 }}
// //               />
// //               <label htmlFor="file-upload" className="cursor-pointer">
// //                 <div className="h-8 w-8 grid place-items-center rounded-full bg-white/10 text-white hover:bg-white/15">
// //                   <Paperclip className="h-5 w-5" />
// //                 </div>
// //               </label>
// //             </div>

// //             {/* Bottom-right controls */}
// //             <div className="absolute bottom-3 right-3 flex items-center gap-2">
// //               <button
// //                 onClick={() => setUserPrompt("")}
// //                 className="h-9 w-[63px] rounded-[40px] flex items-center justify-center text-white text-sm"
// //                 style={{ background: "#2C2C2C" }}
// //                 title="Clear"
// //                 aria-label="Clear"
// //               >
// //                 Clear
// //               </button>

// //               <Button
// //                 onClick={generateDetailedPrompt}
// //                 disabled={isGenerating || !userPrompt.trim()}
// //                 size="sm"
// //                 className="h-8 w-8 p-0 rounded-full bg-[linear-gradient(270.19deg,#1A73E8_0.16%,#FF14EF_99.84%)] text-white hover:opacity-90 disabled:opacity-50"
// //                 title="Generate"
// //               >
// //                 {isGenerating ? <Wand2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
// //               </Button>
// //             </div>
// //           </div>
// //         </div>

// //         {!detailedPrompt && (
// //           <div className="flex justify-center px-4 -mt-px pb-4 md:pb-6">
// //             <div className="relative w-full max-w-[1000px] h-[200px] rounded-[30px] bg-[#121213] border border-[#282829] text-white overflow-hidden">
// //               <div className="grid grid-cols-4 h-full">
// //                 {exampleIdeas.map((idea, index) => {
// //                   const isActive = index === activeIndex;
// //                   return (
// //                     <button
// //                       key={index}
// //                       onClick={() => {
// //                         handleExampleClick(idea);
// //                         setActiveIndex(index);
// //                       }}
// //                       className={[
// //                         "relative h-full w-full text-left",
// //                         "flex flex-col items-start justify-start px-6 pt-8 pb-4",
// //                         index !== 0 ? "border-l border-[#282829]" : "",
// //                         isActive ? "bg-white/5" : "hover:bg-white/7",
// //                       ].join(" ")}
// //                     >
// //                       <img src={idea.img} alt={idea.title} className="h-6 w-6 mb-2" />
// //                       <div className="text-white font-semibold leading-[1.1] text-[15px]" style={{ fontFamily: "Inter" }}>
// //                         {idea.title}
// //                       </div>
// //                       <div className="text-white/70 text-[15px] leading-[1.2] mt-[6px]" style={{ fontFamily: "Inter" }}>
// //                         {idea.text}
// //                       </div>
// //                     </button>
// //                   );
// //                 })}
// //               </div>
// //             </div>
// //           </div>
// //         )}

// //         {detailedPrompt && (
// //           <div className="px-4 pb-6">
// //             <div className="mx-auto w-full max-w-[1000px]">
// //               <div className="text-center my-6">
// //                 <h3 className="text-white font-semibold text-xl md:text-2xl">Detailed Prompt</h3>
// //               </div>

// //               <div className={`${CARD_FRAME} relative p-4 md:p-5`}>
// //                 <div className="text-white/90 text-sm leading-relaxed md:pr-[8rem] whitespace-pre-line">
// //                   {detailedPrompt}
// //                 </div>

// //                 <div className="mt-4 md:mt-0 md:absolute md:bottom-4 md:right-4 flex flex-wrap gap-2">
// //                   {/* Save (cop.png) → opens anchored dropdown */}
// //                   <button
// //                     ref={saveBtnRef}
// //                     onClick={() => setIsModalOpen((v) => !v)}
// //                     aria-pressed={isModalOpen}
// //                     title="Save"
// //                     aria-label="Save"
// //                     className="w-10 h-10 rounded-full flex items-center justify-center transition-colors border"
// //                     style={{ background: isModalOpen ? GRADIENT : "#252525", borderColor: "#333335" }}
// //                   >
// //                     <img src="/icons/cop.png" alt="Save" className="w-5 h-5 object-contain" />
// //                   </button>

// //                   <button
// //                     onClick={() => {
// //                       setActiveAction("copy");
// //                       copyToClipboard(detailedPrompt, "Prompt");
// //                     }}
// //                     aria-pressed={activeAction === "copy"}
// //                     className="h-9 w-9 rounded-full flex items-center justify-center transition-colors"
// //                     style={{ background: activeAction === "copy" ? GRADIENT : "#252525" }}
// //                     title="Copy"
// //                   >
// //                     <Copy className="h-4 w-4 text-white" />
// //                   </button>

// //                   <button
// //                     onClick={() => {
// //                       setActiveAction("download");
// //                       downloadPrompt();
// //                     }}
// //                     aria-pressed={activeAction === "download"}
// //                     className="h-9 w-9 rounded-full flex items-center justify-center transition-colors"
// //                     style={{ background: activeAction === "download" ? GRADIENT : "#252525" }}
// //                     title="Download"
// //                   >
// //                     <Download className="h-4 w-4 text-white" />
// //                   </button>

// //                   <button
// //                     onClick={() => {
// //                       setActiveAction("open");
// //                       const encodedPrompt = encodeURIComponent(detailedPrompt);
// //                       window.open(`https://chat.openai.com/?prompt=${encodedPrompt}`, "_blank");
// //                     }}
// //                     aria-pressed={activeAction === "open"}
// //                     className="h-9 w-9 rounded-full flex items-center justify-center transition-colors"
// //                     style={{ background: activeAction === "open" ? GRADIENT : "#252525" }}
// //                     title="Open in ChatGPT"
// //                   >
// //                     <ExternalLink className="h-4 w-4 text-white" />
// //                   </button>
// //                 </div>
// //               </div>

// //               {/* token chips */}
// //               <div className="mt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-2">
// //                 <div className="flex flex-col items-center shrink-0">
// //                   <div
// //                     className="mb-0.5 text-white/70"
// //                     style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "12px", lineHeight: "100%" }}
// //                   >
// //                     Original Length
// //                   </div>
// //                   <div className="px-3 py-[6px] rounded-full bg-[#252525] leading-none">
// //                     <span
// //                       style={{
// //                         background: "linear-gradient(90deg, #FF14EF 0%, #1A73E8 100%)",
// //                         WebkitBackgroundClip: "text",
// //                         backgroundClip: "text",
// //                         color: "transparent",
// //                         fontFamily: "Inter",
// //                         fontWeight: 400,
// //                       }}
// //                     >
// //                       {Math.ceil(userPrompt.length / 4)} Tokens
// //                     </span>
// //                   </div>
// //                 </div>

// //                 <div className="flex flex-col items-center shrink-0">
// //                   <div
// //                     className="mb-0.5 text-white/70"
// //                     style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "12px", lineHeight: "100%" }}
// //                   >
// //                     Efficiency Score
// //                   </div>
// //                   <div className="px-3 py-[6px] rounded-full bg-[#252525] leading-none">
// //                     <span
// //                       style={{
// //                         background: "linear-gradient(90deg, #FF14EF 0%, #1A73E8 100%)",
// //                         WebkitBackgroundClip: "text",
// //                         backgroundClip: "text",
// //                         color: "transparent",
// //                         fontFamily: "Inter",
// //                         fontWeight: 400,
// //                       }}
// //                     >
// //                       {tokenEfficiencyScore}% needs improvement
// //                     </span>
// //                   </div>
// //                 </div>

// //                 <div className="flex flex-col items-center shrink-0">
// //                   <div
// //                     className="mb-0.5 text-white/70"
// //                     style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "12px", lineHeight: "100%" }}
// //                   >
// //                     Detailed Length
// //                   </div>
// //                   <div className="px-3 py-[6px] rounded-full bg-[#252525] leading-none">
// //                     <span
// //                       style={{
// //                         background: "linear-gradient(90deg, #FF14EF 0%, #1A73E8 100%)",
// //                         WebkitBackgroundClip: "text",
// //                         backgroundClip: "text",
// //                         color: "transparent",
// //                         fontFamily: "Inter",
// //                         fontWeight: 400,
// //                       }}
// //                     >
// //                       {Math.ceil(detailedPrompt.length / 4)} Tokens
// //                     </span>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </div>

// //       {isGenerating && (
// //         <div className="text-center text-muted-foreground mb-4">
// //           <div className="flex items-center justify-center gap-2 mb-2">
// //             <div className="w-2 h-2 bg-tokun rounded-full animate-bounce"></div>
// //             <div className="w-2 h-2 bg-tokun rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
// //             <div className="w-2 h-2 bg-tokun rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
// //           </div>
// //           <p>Creating detailed prompt...</p>
// //         </div>
// //       )}

// //       <ModalComponent
// //         isOpen={isModalOpen}
// //         onClose={() => setIsModalOpen(false)}
// //         onSave={handleSaveFromModal}
// //         anchorRef={saveBtnRef}
// //       />
// //     </div>
// //   );
// // };

// // export default SmarterPrompt;



// // src/components/SmarterPrompt.tsx
// import { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { toast } from "@/components/ui/use-toast";
// import {
//   Wand2,
//   Copy,
//   Download,
//   ExternalLink,
//   Paperclip,
//   Send,
//   Sparkles,
//   History
// } from "lucide-react";
// import ModalComponent from "@/components/ModalComponent";
// import { saveItem } from "@/lib/savedCollections";
// import { llmService } from "@/services/llmService";
// import { useAuth } from "@/contexts/AuthContext";

// interface SmarterPromptProps {
//   onPromptGenerated?: (prompt: string) => void;
//   onUseInOptimizer?: (prompt: string) => void;
//   /** If parent already created Smartgen and knows the id, pass it here */
//   smartgenId?: string;
// }

// const API_BASE = (import.meta as any).env?.VITE_API_URL || "http://localhost:5000";
// const GRADIENT =
//   "linear-gradient(270.19deg, #1A73E8 0.16%, #FF14EF 99.84%)";
// const CARD_FRAME =
//   "w-full max-w-[1000px] rounded-[30px] border border-[#282829] bg-[#121213] overflow-hidden";

// const IdeasStrip = ({
//   exampleIdeas,
//   activeIndex,
//   setActiveIndex,
//   handleExampleClick,
// }: {
//   exampleIdeas: { img: string; title: string; text: string }[];
//   activeIndex: number;
//   setActiveIndex: (n: number) => void;
//   handleExampleClick: (idea: any) => void;
// }) => {
//   return (
//     <div className="mx-auto w-full px-4 font-inter">
//       <div className="mx-auto w-full max-w-[1047.5px] h-[110px] rounded-[20px] border border-[#282829] bg-[#121213] overflow-hidden">
//         <div className="h-full overflow-x-auto md:overflow-visible no-scrollbar snap-x snap-mandatory">
//           <div className="grid grid-cols-[repeat(4,minmax(0,1fr))] h-full min-w-[1040px] md:min-w-0 md:grid-cols-4">
//             {exampleIdeas.map((idea, idx) => (
//               <button
//                 key={idx}
//                 onClick={() => {
//                   handleExampleClick(idea);
//                   setActiveIndex(idx);
//                 }}
//                 className={[
//                   "relative h-[110px] w-full text-left",
//                   "flex items-center gap-3 px-5 snap-start",
//                   idx !== 0 ? "border-l border-[#282829]" : "",
//                   idx === activeIndex ? "bg-white/5" : "hover:bg-white/7",
//                 ].join(" ")}
//                 aria-label={idea.title}
//                 title={idea.title}
//               >
//                 <img src={idea.img} alt="" className="h-6 w-6 object-contain" />
//                 <div className="flex flex-col items-start">
//                   <div className="text-white font-semibold leading-[1.1] text-[15px]">
//                     {idea.title}
//                   </div>
//                   <div className="text-white/80 text-[12px] leading-[1.2] mt-[6px]">
//                     {idea.text}
//                   </div>
//                 </div>
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const SmarterPrompt = ({
//   onPromptGenerated,
//   onUseInOptimizer,
//   smartgenId: smartgenIdProp,
// }: SmarterPromptProps) => {
//   const navigate = useNavigate();



// // at top of SmarterPrompt file


// // inside component:


// const sendTOptimizer = async () => {
//   if (!detailedPrompt?.trim()) return;
//   // optional: also copy to clipboard
//   try { await navigator.clipboard.writeText(detailedPrompt); } catch {}

//   navigate("/prompt-optimization", {
//     state: { initialText: detailedPrompt }, // <-- this feeds the next page
//     replace: false,
//   });
// };


// // const goToSmartgenHistory = () => {
// //   navigate("/smartgen-history"); // make sure you have a <Route path="/smartgen-history" .../>
// // };



// const goToSmartgenHistory = () => {
//   // opens /history and selects the Smartgen tab
//   navigate("/history?tab=smartgen", { replace: false });
// };





//   // main state
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [userPrompt, setUserPrompt] = useState("");
//   const [detailedPrompt, setDetailedPrompt] = useState("");
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [activeAction, setActiveAction] =
//     useState<"copy" | "download" | "save" | "open" | null>(null);
//   const [tokenEfficiencyScore, setTokenEfficiencyScore] = useState(0);
//   const [files, setFiles] = useState<File[]>([]);
//   const [smartgenId, setSmartgenId] = useState<string | undefined>(
//     smartgenIdProp
//   );

//   // save modal
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const saveBtnRef = useRef<HTMLButtonElement | null>(null);

//   // auth
//   const { token, user, persistAuth } = useAuth() as any;

//   // ---------- MIC (speech-to-text) ----------
//   const recognitionRef = useRef<any>(null);
//   const [speechSupported, setSpeechSupported] = useState(false);
//   const [isListening, setIsListening] = useState(false);

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const SpeechRecognition =
//         (window as any).SpeechRecognition ||
//         (window as any).webkitSpeechRecognition;
//       if (SpeechRecognition) {
//         setSpeechSupported(true);
//         const rec = new SpeechRecognition();
//         rec.continuous = false;
//         rec.interimResults = false;
//         rec.lang = "en-US";

//         rec.onresult = (event: any) => {
//           try {
//             const transcript = event.results[0][0].transcript;
//             setUserPrompt((prev) => (prev ? prev + " " : "") + transcript);
//           } catch {}
//           setIsListening(false);
//         };
//         rec.onerror = () => {
//           setIsListening(false);
//           toast({
//             title: "Speech recognition failed",
//             description: "Please try again or use text input",
//             variant: "destructive",
//           });
//         };
//         rec.onend = () => setIsListening(false);
//         recognitionRef.current = rec;
//       }
//     }
//   }, []);

//   const startListening = () => {
//     if (recognitionRef.current && speechSupported) {
//       setIsListening(true);
//       try {
//         recognitionRef.current.start();
//       } catch {
//         setIsListening(false);
//       }
//     }
//   };
//   const stopListening = () => {
//     try {
//       recognitionRef.current?.stop();
//     } finally {
//       setIsListening(false);
//     }
//   };
//   // -----------------------------------------

//   useEffect(() => {
//     if (smartgenIdProp && smartgenIdProp !== smartgenId) {
//       setSmartgenId(smartgenIdProp);
//     }
//   }, [smartgenIdProp]);

//   const exampleIdeas = [
//     {
//       text: "Help me create a marketing strategy",
//       img: "/icons/i1.png",
//       title: "Marketing Strategy",
//     },
//     {
//       text: "Write a technical tutorial for beginners",
//       img: "/icons/i2.png",
//       title: "Technical Tutorial",
//     },
//     {
//       text: "Analyze competitor pricing models",
//       img: "/icons/i3.png",
//       title: "Pricing Models",
//     },
//     { text: "Design a user onboarding flow", img: "/icons/i4.png", title: "Design" },
//   ];

//   const handleExampleClick = (idea: any) => setUserPrompt(idea.text);

//   // ---- server helpers (unchanged logic, condensed logs) ----
//   const logFormData = (fd: FormData) => {
//     const preview: Record<string, any[]> = {};
//     for (const [k, v] of fd.entries()) {
//       if (!preview[k]) preview[k] = [];
//       if (v instanceof File)
//         preview[k].push({ fileName: v.name, size: v.size, type: v.type });
//       else preview[k].push(v);
//     }
//     console.log("[Smartgen -> FormData]", preview);
//   };
// const postCreateSmartgen = async ({
//   inputPrompt,
//   detailedPrompt,
//   tokensUsed,
// }: {
//   inputPrompt: string;
//   detailedPrompt: string;
//   tokensUsed: number;
// }) => {
//   const safeTokens = Math.max(1, Number.isFinite(tokensUsed) ? tokensUsed : 0);
//   const fd = new FormData();
//   fd.append("inputPrompt", inputPrompt);
//   fd.append("detailedPrompt", detailedPrompt);
//   fd.append("tokensUsed", String(safeTokens));
//   for (const f of files) fd.append("attachments", f);

//   const base = API_BASE.replace(/\/+$/, "");
//   const url = `${base}/api/smartgen`;

//   const res = await fetch(url, {
//     method: "POST",
//     headers: token ? { Authorization: `Bearer ${token}` } : undefined,
//     body: fd,
//     credentials: "include",
//   });

//   const raw = await res.text();
//   let data: any = {};
//   try { data = JSON.parse(raw); } catch {}

//   if (!res.ok) {
//     // map common server errors to nicer messages
//    const code = data?.error || `http_${res.status}`;
// const nice =
//   code === "plan_required" ? "Plan required. Please purchase a plan."
// : code === "subscription_inactive" ? "Your subscription is inactive."
// : code === "org_subscription_inactive" ? "Your organization’s subscription is inactive."
// : code === "member_cap_exceeded" ? "Your member token cap is exhausted."
// : code === "org_pool_exhausted" ? "Organization token pool is exhausted."
// : code === "token_quota_exceeded" ? "Monthly token quota exceeded."
// : code === "insufficient_quota" ? "Insufficient token quota."
// : code === "invalid_user_type" ? "Your account type cannot use Smartgen."
// : code;

//   }

//   // Optional UI hint: if server includes daily tokens, show it; otherwise generic success
//   const newId = data?.item?.id || data?.item?._id;
//   if (newId) setSmartgenId(newId);

//   const hasDaily = typeof data?.dailyTokensRemaining === "number";
//   toast({
//     title: "Smartgen created",
//     description: hasDaily
//       ? `Daily tokens remaining: ${data.dailyTokensRemaining}`
//       : "Created successfully.",
//   });

//   // Only update auth if backend returned anything quota-related
//   if (user && persistAuth) {
//     const patch: any = { user: { ...user } };
//     if (hasDaily) patch.user.dailyTokensRemaining = data.dailyTokensRemaining;
//     // Keep future-friendly: if server later adds monthly, this won’t break
//     if (typeof data?.monthlyTokensRemaining === "number") {
//       patch.user.monthlyTokensRemaining = data.monthlyTokensRemaining;
//     }
//     if (data?.plan) patch.user.plan = data.plan;
//     if (hasDaily || typeof data?.monthlyTokensRemaining === "number" || data?.plan) {
//       persistAuth(patch);
//     }
//   }

//   return data?.item;
// };
//   // const postCreateSmartgen = async ({
//   //   inputPrompt,
//   //   detailedPrompt,
//   //   tokensUsed,
//   // }: {
//   //   inputPrompt: string;
//   //   detailedPrompt: string;
//   //   tokensUsed: number;
//   // }) => {
//   //   const safeTokens = Math.max(1, Number.isFinite(tokensUsed) ? tokensUsed : 0);
//   //   const fd = new FormData();
//   //   fd.append("inputPrompt", inputPrompt);
//   //   fd.append("detailedPrompt", detailedPrompt);
//   //   fd.append("tokensUsed", String(safeTokens));
//   //   for (const f of files) fd.append("attachments", f);

//   //   const base = API_BASE.replace(/\/+$/, "");
//   //   const url = `${base}/api/smartgen`;
//   //   console.log("🔵 POST create URL:", url);
//   //   console.log("🔵 Auth header:", token ? "Bearer present ✅" : "❌ missing");
//   //   logFormData(fd);

//   //   const res = await fetch(url, {
//   //     method: "POST",
//   //     headers: token ? { Authorization: `Bearer ${token}` } : undefined,
//   //     body: fd,
//   //     credentials: "include",
//   //   });

//   //   const raw = await res.text();
//   //   console.log("🔵 POST status:", res.status, res.statusText);
//   //   console.log("🔵 POST raw body:", raw);

//   //   const data = (() => {
//   //     try {
//   //       return JSON.parse(raw);
//   //     } catch {
//   //       return {};
//   //     }
//   //   })();

//   //   if (!res.ok) throw new Error(data?.error || `http_${res.status}`);

//   //   if (
//   //     typeof data?.dailyTokensRemaining === "number" &&
//   //     user &&
//   //     persistAuth
//   //   ) {
//   //     persistAuth({
//   //       user: { ...user, dailyTokensRemaining: data.dailyTokensRemaining },
//   //     });
//   //   }

//   //   toast({
//   //     title: "Smartgen created",
//   //     description:
//   //       typeof data?.dailyTokensRemaining === "number"
//   //         ? `Daily tokens remaining: ${data.dailyTokensRemaining}`
//   //         : "Created successfully.",
//   //   });

//   //   const newId = data?.item?.id || data?.item?._id;
//   //   if (newId) setSmartgenId(newId);
//   //   return data?.item;
//   // };

//   // const putUpdateSmartgen = async ({
//   //   id,
//   //   inputPrompt,
//   //   detailedPrompt,
//   //   tokensUsed,
//   // }: {
//   //   id: string;
//   //   inputPrompt: string;
//   //   detailedPrompt: string;
//   //   tokensUsed: number;
//   // }) => {
//   //   const safeTokens = Math.max(1, Number.isFinite(tokensUsed) ? tokensUsed : 0);
//   //   const fd = new FormData();
//   //   fd.append("inputPrompt", inputPrompt);
//   //   fd.append("detailedPrompt", detailedPrompt);
//   //   fd.append("tokensUsed", String(safeTokens));
//   //   for (const f of files) fd.append("attachments", f);

//   //   const base = API_BASE.replace(/\/+$/, "");
//   //   const url = `${base}/api/smartgen/${id}`;
//   //   const res = await fetch(url, {
//   //     method: "PUT",
//   //     headers: token ? { Authorization: `Bearer ${token}` } : undefined,
//   //     body: fd,
//   //     credentials: "include",
//   //   });

//   //   const raw = await res.text();
//   //   const data = (() => {
//   //     try {
//   //       return JSON.parse(raw);
//   //     } catch {
//   //       return {};
//   //     }
//   //   })();

//   //   if (!res.ok) throw new Error(data?.error || `http_${res.status}`);

//   //   if (
//   //     typeof data?.dailyTokensRemaining === "number" &&
//   //     user &&
//   //     persistAuth
//   //   ) {
//   //     persistAuth({
//   //       user: { ...user, dailyTokensRemaining: data.dailyTokensRemaining },
//   //     });
//   //   }

//   //   toast({ title: "Smartgen updated", description: "Updated successfully." });

//   //   const newId = data?.item?.id || data?.item?._id;
//   //   if (newId) setSmartgenId(newId);

//   //   return data?.item;
//   // };



//   const putUpdateSmartgen = async ({
//   id,
//   inputPrompt,
//   detailedPrompt,
//   tokensUsed,
// }: {
//   id: string;
//   inputPrompt: string;
//   detailedPrompt: string;
//   tokensUsed: number;
// }) => {
//   const safeTokens = Math.max(1, Number.isFinite(tokensUsed) ? tokensUsed : 0);
//   const fd = new FormData();
//   fd.append("inputPrompt", inputPrompt);
//   fd.append("detailedPrompt", detailedPrompt);
//   fd.append("tokensUsed", String(safeTokens));
//   for (const f of files) fd.append("attachments", f);

//   const base = API_BASE.replace(/\/+$/, "");
//   const url = `${base}/api/smartgen/${id}`;

//   const res = await fetch(url, {
//     method: "PUT",
//     headers: token ? { Authorization: `Bearer ${token}` } : undefined,
//     body: fd,
//     credentials: "include",
//   });

//   const raw = await res.text();
//   let data: any = {};
//   try { data = JSON.parse(raw); } catch {}

//   if (!res.ok) {
//     const code = data?.error || `http_${res.status}`;
//     const nice =
//       code === "insufficient_quota" ? "Insufficient token quota."
//       : code === "not proper plan purchased" ? "Plan required. Please purchase a plan."
//       : code === "smartgen_not_found_or_access_denied" ? "Not found or access denied."
//       : code;
//     throw new Error(nice);
//   }

//   const hasDaily = typeof data?.dailyTokensRemaining === "number";
//   toast({
//     title: "Smartgen updated",
//     description: hasDaily
//       ? `Daily tokens remaining: ${data.dailyTokensRemaining}`
//       : "Updated successfully.",
//   });

//   // Update auth quotas only if present
//   if (user && persistAuth) {
//     const patch: any = { user: { ...user } };
//     if (hasDaily) patch.user.dailyTokensRemaining = data.dailyTokensRemaining;
//     if (typeof data?.monthlyTokensRemaining === "number") {
//       patch.user.monthlyTokensRemaining = data.monthlyTokensRemaining;
//     }
//     if (data?.plan) patch.user.plan = data.plan;
//     if (hasDaily || typeof data?.monthlyTokensRemaining === "number" || data?.plan) {
//       persistAuth(patch);
//     }
//   }

//   const newId = data?.item?.id || data?.item?._id;
//   if (newId) setSmartgenId(newId);

//   return data?.item;
// };

//   const upsertSmartgen = async (payload: {
//     inputPrompt: string;
//     detailedPrompt: string;
//     tokensUsed: number;
//   }) => {
//     try {
//       if (smartgenId) {
//         const updated = await putUpdateSmartgen({ id: smartgenId, ...payload });
//         console.log("✅ PUT updated item:", updated);
//         return updated;
//       } else {
//         console.log("↪ Using POST (no smartgenId yet) …");
//         const created = await postCreateSmartgen(payload);
//         console.log("✅ POST created item:", created);
//         return created;
//       }
//     } catch (e: any) {
//       console.error("[Smartgen upsert error]", e);
//       toast({
//         title: "Save failed",
//         description: e?.message || "Unable to save Smartgen",
//         variant: "destructive",
//       });
//       return null;
//     }
//   };

//   const saveSmartgenToServer = async ({
//     collectionTitle,
//     name,
//   }: {
//     collectionTitle?: string;
//     name: string;
//   }) => {
//     if (!token) {
//       toast({
//         title: "Not signed in",
//         description: "Please login to save.",
//         variant: "destructive",
//       });
//       return null;
//     }
//     if (!smartgenId) {
//       toast({
//         title: "Nothing to save yet",
//         description: "Generate a Smartgen first, then try saving.",
//         variant: "destructive",
//       });
//       return null;
//     }

//     const base = API_BASE.replace(/\/+$/, "");
//     const url = `${base}/api/saved-collections`;

//     const payload = {
//       section: "smartgen",
//       refId: smartgenId,
//       collectionTitle: collectionTitle?.trim() || undefined,
//       name: name?.trim() || undefined,
//     };

//     const res = await fetch(url, {
//       method: "POST",
//       headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//       credentials: "include",
//     });

//     const raw = await res.text();
//     let data: any = {};
//     try {
//       data = JSON.parse(raw);
//     } catch {}

//     if (!res.ok) {
//       const msg =
//         data?.error === "invalid_section"
//           ? "Invalid section"
//           : data?.error === "invalid_refId"
//           ? "Invalid reference id"
//           : data?.error || `http_${res.status}`;
//       throw new Error(msg);
//     }

//     return data;
//   };

//   /** Generate detailed prompt (fast llmService) + upsert */
//   const generateDetailedPrompt = async () => {
//     const promptToProcess = userPrompt.trim();
//     if (!promptToProcess) {
//       toast({
//         title: "No prompt provided",
//         description: "Please enter a prompt first",
//         variant: "destructive",
//       });
//       return;
//     }
//     setIsGenerating(true);

//     try {
//       const result = await llmService.generateDetailedPrompt(promptToProcess);

//       setDetailedPrompt(result.optimizedText);

//       const originalTokens = Math.ceil(promptToProcess.length / 4);
//       const tokensUsed =
//         originalTokens +
//         Math.ceil((result?.optimizedText?.length || 0) / 4);

//       const efficiencyScore = Math.min(
//         95,
//         Math.max(
//           60,
//           100 -
//             Math.round(
//               (((result?.tokens ??
//                 Math.ceil((result?.optimizedText?.length || 0) / 4)) -
//                 originalTokens) /
//                 Math.max(originalTokens, 1)) *
//                 50
//             )
//         )
//       );
//       setTokenEfficiencyScore(efficiencyScore);

//       onPromptGenerated?.(result.optimizedText);
//       toast({
//         title: "Detailed Prompt Generated!",
//         description: "Your detailed prompt is ready",
//       });

//       const saved = await upsertSmartgen({
//         inputPrompt: promptToProcess,
//         detailedPrompt: result.optimizedText,
//         tokensUsed,
//       });
//       if (saved) console.log("💾 Upsert success:", saved);
//     } catch (err: any) {
//   console.error(err);
//   const msg =
//     err?.code === "llm_timeout" || err?.message === "llm_timeout"
//       ? "The AI request took too long. Please try again, or shorten the prompt."
//       : err?.message || "Failed to generate prompt";
//   toast({ title: "Error", description: msg, variant: "destructive" });
// } finally {
//   setIsGenerating(false);
// }

//   };

//   const copyToClipboard = (text: string, label: string) => {
//     navigator.clipboard.writeText(text);
//     toast({
//       title: "Copied to clipboard",
//       description: `${label} has been copied successfully`,
//     });
//   };

//   const downloadPrompt = () => {
//     const element = document.createElement("a");
//     const file = new Blob([detailedPrompt], { type: "text/plain" });
//     element.href = URL.createObjectURL(file);
//     element.download = "detailed-prompt.txt";
//     document.body.appendChild(element);
//     element.click();
//     document.body.removeChild(element);
//     toast({
//       title: "Download started",
//       description: "Your prompt has been downloaded as a text file",
//     });
//   };

//   // send detailed prompt to Prompt Optimizer
//   const sendToOptimizer = async () => {
//     if (!detailedPrompt.trim()) {
//       toast({
//         title: "No detailed prompt",
//         description: "Generate a detailed prompt first.",
//         variant: "destructive",
//       });
//       return;
//     }
//     await navigator.clipboard.writeText(detailedPrompt);
//     toast({
//       title: "Copied",
//       description: "Detailed prompt copied and opening Prompt Optimizer…",
//     });
//     navigate("/prompt-optimization", { state: { initialText: detailedPrompt } });
//   };

//   return (
//     <div className="space-y-6">
//       {detailedPrompt && (
//         <IdeasStrip
//           exampleIdeas={exampleIdeas}
//           activeIndex={activeIndex}
//           setActiveIndex={setActiveIndex}
//           handleExampleClick={handleExampleClick}
//         />
//       )}

//       <div className="mx-auto w-full max-w-[1050px] rounded-[36px] bg-[#121213] overflow-visible px-0">
//         <div className="flex justify-center px-4 pt-4 md:pt-6">
//           <div className="relative w-full max-w-[1000px] min-h-[200px] md:h-[200px] rounded-[30px] bg-[#121213] border border-[#282829] text-white overflow-hidden">
//             <div className="h-full flex">
//               <div className="w-12" />
//               <div className="flex-1 pr-14 pl-2 py-4">
//                 <Textarea
//                   value={userPrompt}
//                   onChange={(e) => setUserPrompt(e.target.value)}
//                   placeholder="Write a technical tutorial for beginners"
//                   className="w-full h-full bg-transparent border-none resize-none text-white placeholder-white/70 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-base leading-relaxed"
//                 />
//               </div>
//               <div className="w-12" />
//             </div>

//             {/* Bottom-left: attachments */}
//             <div className="absolute bottom-3 left-3">
//               <input
//                 type="file"
//                 id="file-upload"
//                 className="hidden"
//                 multiple
//                 onChange={(e) => {
//                   const selected = Array.from(e.target.files || []);
//                   setFiles(selected);
//                   console.log(
//                     "📎 Selected files:",
//                     selected.map((f) => ({
//                       name: f.name,
//                       size: f.size,
//                       type: f.type,
//                     }))
//                   );
//                   if (selected.length) {
//                     toast({
//                       title: "Files attached",
//                       description: `${selected.length} file(s) selected`,
//                     });
//                   }
//                 }}
//               />
//               <label htmlFor="file-upload" className="cursor-pointer">
//                 <div className="h-8 w-8 grid place-items-center rounded-full bg-white/10 text-white hover:bg-white/15">
//                   <Paperclip className="h-5 w-5" />
//                 </div>
//               </label>
//             </div>

//             {/* Bottom-right controls (Clear, Mic, Generate) */}
// {/* Bottom-right controls (Mic, History, Clear*, Generate) */}
// <div className="absolute bottom-3 right-3 flex items-center gap-2">

//   {/* Mic */}
//   {speechSupported && (
//     <button
//       onClick={isListening ? stopListening : startListening}
//       className="relative h-9 w-9 rounded-full grid place-items-center overflow-visible border border-[#333335] text-white transition-all duration-300"
//       style={{ background: "#2C2C2C" }}
//       onMouseEnter={(e) =>
//         (e.currentTarget.style.backgroundImage =
//           "linear-gradient(270.19deg, #1A73E8 0.16%, #FF14EF 99.84%)")
//       }
//       onMouseLeave={(e) => {
//         e.currentTarget.style.backgroundImage = "";
//         e.currentTarget.style.background = "#2C2C2C";
//       }}
//       title={isListening ? "Stop voice input" : "Start voice input"}
//       aria-label="Microphone"
//     >
//       {isListening && (
//         <>
//           <span
//             className="absolute inset-0 rounded-full opacity-60 animate-ping"
//             style={{ background: "linear-gradient(270.19deg, #1A73E8 0.16%, #FF14EF 99.84%)" }}
//           />
//           <span
//             className="absolute inset-0 rounded-full opacity-40 animate-ping"
//             style={{ background: "linear-gradient(270.19deg, #1A73E8 0.16%, #FF14EF 99.84%)", animationDelay: "0.4s" }}
//           />
//         </>
//       )}
//       <img
//         src="/icons/mic.png"
//         alt="Mic"
//         className={`h-4 w-4 ${isListening ? "animate-pulse" : ""}`}
//       />
//     </button>
//   )}

//   {/* Prompt History (between Mic and Clear) */}
//   <button
//     onClick={goToSmartgenHistory}
//     className="h-9 px-3 rounded-full flex items-center gap-2 border border-[#333335] text-white transition-all duration-300"
//     style={{ background: "#2C2C2C" }}
//     onMouseEnter={(e) =>
//       (e.currentTarget.style.backgroundImage =
//         "linear-gradient(270.19deg, #1A73E8 0.16%, #FF14EF 99.84%)")
//     }
//     onMouseLeave={(e) => {
//       e.currentTarget.style.backgroundImage = "";
//       e.currentTarget.style.background = "#2C2C2C";
//     }}
//     title="Prompt history"
//     aria-label="Prompt history"
//   >
//     <History className="h-4 w-4" />
//     <span className="text-sm">Smartgen History</span>
//   </button>

//   {/* Clear — only visible AFTER detailed prompt is generated */}
//   {Boolean(detailedPrompt.trim()) && (
//     <button
//       onClick={() => setUserPrompt("")}
//       className="h-9 px-4 rounded-full flex items-center justify-center text-white text-sm border border-[#333335] transition-all duration-300"
//       style={{ background: "#2C2C2C" }}
//       onMouseEnter={(e) =>
//         (e.currentTarget.style.backgroundImage =
//           "linear-gradient(270.19deg, #1A73E8 0.16%, #FF14EF 99.84%)")
//       }
//       onMouseLeave={(e) => {
//         e.currentTarget.style.backgroundImage = "";
//         e.currentTarget.style.background = "#2C2C2C";
//       }}
//       title="Clear"
//       aria-label="Clear"
//     >
//       Clear
//     </button>
//   )}

//   {/* Generate — gradient on hover (not by default) */}
//   <button
//     onClick={generateDetailedPrompt}
//     disabled={isGenerating || !userPrompt.trim()}
//     className="h-9 w-9 rounded-full grid place-items-center text-white border border-[#333335] transition-all duration-300 disabled:opacity-50"
//     style={{ background: "#2C2C2C" }}
//     onMouseEnter={(e) =>
//       (e.currentTarget.style.backgroundImage =
//         "linear-gradient(270.19deg, #1A73E8 0.16%, #FF14EF 99.84%)")
//     }
//     onMouseLeave={(e) => {
//       e.currentTarget.style.backgroundImage = "";
//       e.currentTarget.style.background = "#2C2C2C";
//     }}
//     title="Generate"
//     aria-label="Generate"
//   >
//     {isGenerating ? (
//       <Wand2 className="h-4 w-4 animate-spin" />
//     ) : (
//       <Send className="h-4 w-4" />
//     )}
//   </button>
// </div>

//           </div>
//         </div>

//         {!detailedPrompt && (
//           <div className="flex justify-center px-4 -mt-px pb-4 md:pb-6">
//             <div className="relative w-full max-w-[1000px] h-[200px] rounded-[30px] bg-[#121213] border border-[#282829] text-white overflow-hidden">
//               <div className="grid grid-cols-4 h-full">
//                 {exampleIdeas.map((idea, index) => {
//                   const isActive = index === activeIndex;
//                   return (
//                     <button
//                       key={index}
//                       onClick={() => {
//                         handleExampleClick(idea);
//                         setActiveIndex(index);
//                       }}
//                       className={[
//                         "relative h-full w-full text-left",
//                         "flex flex-col items-start justify-start px-6 pt-8 pb-4",
//                         index !== 0 ? "border-l border-[#282829]" : "",
//                         isActive ? "bg-white/5" : "hover:bg-white/7",
//                       ].join(" ")}
//                     >
//                       <img
//                         src={idea.img}
//                         alt={idea.title}
//                         className="h-6 w-6 mb-2"
//                       />
//                       <div
//                         className="text-white font-semibold leading-[1.1] text-[15px]"
//                         style={{ fontFamily: "Inter" }}
//                       >
//                         {idea.title}
//                       </div>
//                       <div
//                         className="text-white/70 text-[15px] leading-[1.2] mt-[6px]"
//                         style={{ fontFamily: "Inter" }}
//                       >
//                         {idea.text}
//                       </div>
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>
//         )}

//         {detailedPrompt && (
//           <div className="px-4 pb-6">
//             <div className="mx-auto w-full max-w-[1000px]">
//               <div className="text-center my-6">
//                 <h3 className="text-white font-semibold text-xl md:text-2xl">
//                   Detailed Prompt
//                 </h3>
//               </div>

//               <div className={`${CARD_FRAME} relative p-4 md:p-5`}>
//        <div className="text-white/90 text-sm leading-relaxed whitespace-pre-line pr-4 md:pr-[12rem] pb-24 md:pb-22">
//   {detailedPrompt}
// </div>



//                 {/* Actions (bottom-right): Optimize (left of Save), Save, Copy, Download, Open */}
//                 {/* Actions (bottom-right): Optimise, Save, Copy, Download, Open */}
// <div className="mt-6 md:mt-0 md:absolute md:bottom-4 md:right-4 flex items-center gap-3">
//   {/* Optimise → navigate to Prompt Optimizer */}
// <button
//   onClick={sendTOptimizer}
//   className="h-10 px-4 rounded-full flex items-center gap-2 border border-[#333335] text-white transition-all duration-300"
//   style={{
//     background: "#252525", // default dark bg
//   }}
//   onMouseEnter={(e) =>
//     (e.currentTarget.style.backgroundImage =
//       "linear-gradient(270.19deg, #1A73E8 0.16%, #FF14EF 99.84%)")
//   }
//   onMouseLeave={(e) => {
//     e.currentTarget.style.backgroundImage = "";
//     e.currentTarget.style.background = "#252525";
//   }}
//   title="Optimise in Prompt Optimizer"
//   aria-label="Optimise in Prompt Optimizer"
// >
//    <Sparkles className="h-4 w-4" />
//   <span className="text-sm font-inter">Optimise</span>
// </button>


//   {/* Save (cop.png) */}
//   <button
//     ref={saveBtnRef}
//     onClick={() => setIsModalOpen((v) => !v)}
//     aria-pressed={isModalOpen}
//     title="Save"
//     aria-label="Save"
//     className="w-10 h-10 rounded-full flex items-center justify-center transition-colors border"
//     style={{ background: isModalOpen ? GRADIENT : "#252525", borderColor: "#333335" }}
//   >
//     <img src="/icons/cop.png" alt="Save" className="w-5 h-5 object-contain" />
//   </button>

//   <button
//     onClick={() => { setActiveAction("copy"); copyToClipboard(detailedPrompt, "Prompt"); }}
//     aria-pressed={activeAction === "copy"}
//     className="h-9 w-9 rounded-full flex items-center justify-center transition-colors"
//     style={{ background: activeAction === "copy" ? GRADIENT : "#252525" }}
//     title="Copy"
//   >
//     <Copy className="h-4 w-4 text-white" />
//   </button>

//   <button
//     onClick={() => { setActiveAction("download"); downloadPrompt(); }}
//     aria-pressed={activeAction === "download"}
//     className="h-9 w-9 rounded-full flex items-center justify-center transition-colors"
//     style={{ background: activeAction === "download" ? GRADIENT : "#252525" }}
//     title="Download"
//   >
//     <Download className="h-4 w-4 text-white" />
//   </button>

//   <button
//     onClick={() => {
//       setActiveAction("open");
//       const encodedPrompt = encodeURIComponent(detailedPrompt);
//       window.open(`https://chat.openai.com/?prompt=${encodedPrompt}`, "_blank");
//     }}
//     aria-pressed={activeAction === "open"}
//     className="h-9 w-9 rounded-full flex items-center justify-center transition-colors"
//     style={{ background: activeAction === "open" ? GRADIENT : "#252525" }}
//     title="Open in ChatGPT"
//   >
//     <ExternalLink className="h-4 w-4 text-white" />
//   </button>
// </div>

//               </div>

//               {/* chips (kept) */}
//               {/* <div className="mt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-2">
//                 <div className="flex flex-col items-center shrink-0">
//                   <div
//                     className="mb-0.5 text-white/70"
//                     style={{
//                       fontFamily: "Inter",
//                       fontWeight: 400,
//                       fontSize: "12px",
//                       lineHeight: "100%",
//                     }}
//                   >
//                     Original Length
//                   </div>
//                   <div className="px-3 py-[6px] rounded-full bg-[#252525] leading-none">
//                     <span
//                       style={{
//                         background:
//                           "linear-gradient(90deg, #FF14EF 0%, #1A73E8 100%)",
//                         WebkitBackgroundClip: "text",
//                         backgroundClip: "text",
//                         color: "transparent",
//                         fontFamily: "Inter",
//                         fontWeight: 400,
//                       }}
//                     >
//                       {Math.ceil(userPrompt.length / 4)} Tokens
//                     </span>
//                   </div>
//                 </div>

//                 <div className="flex flex-col items-center shrink-0">
//                   <div
//                     className="mb-0.5 text-white/70"
//                     style={{
//                       fontFamily: "Inter",
//                       fontWeight: 400,
//                       fontSize: "12px",
//                       lineHeight: "100%",
//                     }}
//                   >
//                     Efficiency Score
//                   </div>
//                   <div className="px-3 py-[6px] rounded-full bg-[#252525] leading-none">
//                     <span
//                       style={{
//                         background:
//                           "linear-gradient(90deg, #FF14EF 0%, #1A73E8 100%)",
//                         WebkitBackgroundClip: "text",
//                         backgroundClip: "text",
//                         color: "transparent",
//                         fontFamily: "Inter",
//                         fontWeight: 400,
//                       }}
//                     >
//                       {tokenEfficiencyScore}% needs improvement
//                     </span>
//                   </div>
//                 </div>

//                 <div className="flex flex-col items-center shrink-0">
//                   <div
//                     className="mb-0.5 text-white/70"
//                     style={{
//                       fontFamily: "Inter",
//                       fontWeight: 400,
//                       fontSize: "12px",
//                       lineHeight: "100%",
//                     }}
//                   >
//                     Detailed Length
//                   </div>
//                   <div className="px-3 py-[6px] rounded-full bg-[#252525] leading-none">
//                     <span
//                       style={{
//                         background:
//                           "linear-gradient(90deg, #FF14EF 0%, #1A73E8 100%)",
//                         WebkitBackgroundClip: "text",
//                         backgroundClip: "text",
//                         color: "transparent",
//                         fontFamily: "Inter",
//                         fontWeight: 400,
//                       }}
//                     >
//                       {Math.ceil(detailedPrompt.length / 4)} Tokens
//                     </span>
//                   </div>
//                 </div>
//               </div> */}
//             </div>
//           </div>
//         )}
//       </div>

//       {isGenerating && (
//         <div className="text-center text-muted-foreground mb-4">
//           <div className="flex items-center justify-center gap-2 mb-2">
//             <div className="w-2 h-2 bg-tokun rounded-full animate-bounce"></div>
//             <div
//               className="w-2 h-2 bg-tokun rounded-full animate-bounce"
//               style={{ animationDelay: "0.1s" }}
//             ></div>
//             <div
//               className="w-2 h-2 bg-tokun rounded-full animate-bounce"
//               style={{ animationDelay: "0.2s" }}
//             ></div>
//           </div>
//           <p>Creating detailed prompt...</p>
//         </div>
//       )}

//       <ModalComponent
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onSave={async (payload) => {
//           const finalTitle =
//             (payload?.title ?? "").trim() ||
//             (userPrompt || "Untitled").trim();
//           const isQuick = !!payload?.quick;

//           try {
//             const serverResp = await saveSmartgenToServer({
//               collectionTitle: isQuick ? undefined : finalTitle,
//               name: finalTitle,
//             });

//             if (serverResp?.success) {
//               toast({
//                 title: "Saved",
//                 description: isQuick
//                   ? "Added to All Saved (Smartgen)."
//                   : `Created/updated collection “${finalTitle}”.`,
//               });
//             } else {
//               saveItem({
//                 title: finalTitle,
//                 prompt: detailedPrompt || "No result yet",
//                 type: "smartgen",
//                 category: isQuick ? "All Saved" : finalTitle,
//               });
//               toast({
//                 title: "Saved locally",
//                 description:
//                   "Could not confirm server save, mirrored to local.",
//               });
//             }
//           } catch (e: any) {
//             saveItem({
//               title: finalTitle,
//               prompt: detailedPrompt || "No result yet",
//               type: "smartgen",
//               category: isQuick ? "All Saved" : finalTitle,
//             });
//             toast({
//               title: "Saved locally",
//               description:
//                 e?.message ||
//                 "Server save failed; mirrored to local storage.",
//             });
//           } finally {
//             setIsModalOpen(false);
//           }
//         }}
//         anchorRef={saveBtnRef}
//       />
//     </div>
//   );
// };

// export default SmarterPrompt;


// src/components/SmarterPrompt.tsx
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { usePrompt } from "@/contexts/PromptContext";
import {
  Wand2,
  Copy,
  Download,
  ExternalLink,
  Paperclip,
  Send,
  Sparkles,
  History
} from "lucide-react";
import ModalComponent from "@/components/ModalComponent";
import { saveItem } from "@/lib/savedCollections";
import { llmService } from "@/services/llmService";
import { useAuth } from "@/contexts/AuthContext";

interface SmarterPromptProps {
  onPromptGenerated?: (prompt: string) => void;
  onUseInOptimizer?: (prompt: string) => void;
  /** If parent already created Smartgen and knows the id, pass it here */
  smartgenId?: string;
}

const API_BASE = (import.meta as any).env?.VITE_API_URL || "http://localhost:5000";
const GRADIENT =
  "linear-gradient(270.19deg, #1A73E8 0.16%, #FF14EF 99.84%)";
const CARD_FRAME =
  "w-full max-w-[1000px] rounded-[30px] border border-[#282829] bg-[#121213] overflow-hidden";

const IdeasStrip = ({
  exampleIdeas,
  activeIndex,
  setActiveIndex,
  handleExampleClick,
}: {
  exampleIdeas: { img: string; title: string; text: string }[];
  activeIndex: number;
  setActiveIndex: (n: number) => void;
  handleExampleClick: (idea: any) => void;
}) => {
  return (
    <div className="mx-auto w-full px-4 font-inter">
      <div className="mx-auto w-full max-w-[1047.5px] h-[110px] rounded-[20px] border border-[#282829] bg-[#121213] overflow-hidden">
        <div className="h-full overflow-x-auto md:overflow-visible no-scrollbar snap-x snap-mandatory">
          <div className="grid grid-cols-[repeat(4,minmax(0,1fr))] h-full min-w-[1040px] md:min-w-0 md:grid-cols-4">
            {exampleIdeas.map((idea, idx) => (
              <button
                key={idx}
                onClick={() => {
                  handleExampleClick(idea);
                  setActiveIndex(idx);
                }}
                className={[
                  "relative h-[110px] w-full text-left",
                  "flex items-center gap-3 px-5 snap-start",
                  idx !== 0 ? "border-l border-[#282829]" : "",
                  idx === activeIndex ? "bg-white/5" : "hover:bg-white/7",
                ].join(" ")}
                aria-label={idea.title}
                title={idea.title}
              >
                <img src={idea.img} alt="" className="h-6 w-6 object-contain" />
                <div className="flex flex-col items-start">
                  <div className="text-white font-semibold leading-[1.1] text-[15px]">
                    {idea.title}
                  </div>
                  <div className="text-white/80 text-[12px] leading-[1.2] mt-[6px]">
                    {idea.text}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const SmarterPrompt = ({
  onPromptGenerated,
  onUseInOptimizer,
  smartgenId: smartgenIdProp,
}: SmarterPromptProps) => {
  const navigate = useNavigate();



// at top of SmarterPrompt file


// inside component:


const sendTOptimizer = async () => {
  if (!detailedPrompt?.trim()) return;
  // optional: also copy to clipboard
  try { await navigator.clipboard.writeText(detailedPrompt); } catch {}

  navigate("/prompt-optimization", {
    state: { initialText: detailedPrompt }, // <-- this feeds the next page
    replace: false,
  });
};


// const goToSmartgenHistory = () => {
//   navigate("/smartgen-history"); // make sure you have a <Route path="/smartgen-history" .../>
// };



const goToSmartgenHistory = () => {
  // opens /history and selects the Smartgen tab
  navigate("/history?tab=smartgen", { replace: false });
};





  // main state
  const [isGenerating, setIsGenerating] = useState(false);
  const {userPrompt, setUserPrompt, detailedPrompt, setDetailedPrompt, clearPrompts } = usePrompt();
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeAction, setActiveAction] =
    useState<"copy" | "download" | "save" | "open" | null>(null);
  const [tokenEfficiencyScore, setTokenEfficiencyScore] = useState(0);
  const [files, setFiles] = useState<File[]>([]);
  const [smartgenId, setSmartgenId] = useState<string | undefined>(
    smartgenIdProp
  );

  // save modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const saveBtnRef = useRef<HTMLButtonElement | null>(null);

  // auth
  const { token, user, persistAuth } = useAuth() as any;

  // ---------- MIC (speech-to-text) ----------
  const recognitionRef = useRef<any>(null);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [isListening, setIsListening] = useState(false);
   
    const [isEditingDetailed, setIsEditingDetailed] = useState(false);
const [editablePrompt, setEditablePrompt] = useState("");



  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        setSpeechSupported(true);
        const rec = new SpeechRecognition();
        rec.continuous = false;
        rec.interimResults = false;
        rec.lang = "en-US";

        rec.onresult = (event: any) => {
          try {
            const transcript = event.results[0][0].transcript;
            setUserPrompt(userPrompt ? userPrompt + " " + transcript : transcript);
          } catch {}
          setIsListening(false);
        };
        rec.onerror = () => {
          setIsListening(false);
          toast({
            title: "Speech recognition failed",
            description: "Please try again or use text input",
            variant: "destructive",
          });
        };
        rec.onend = () => setIsListening(false);
        recognitionRef.current = rec;
      }
    }
  }, []);

  const startListening = () => {
    if (recognitionRef.current && speechSupported) {
      setIsListening(true);
      try {
        recognitionRef.current.start();
      } catch {
        setIsListening(false);
      }
    }
  };
  const stopListening = () => {
    try {
      recognitionRef.current?.stop();
    } finally {
      setIsListening(false);
    }
  };
  // -----------------------------------------

  useEffect(() => {
    if (smartgenIdProp && smartgenIdProp !== smartgenId) {
      setSmartgenId(smartgenIdProp);
    }
  }, [smartgenIdProp]);

  const exampleIdeas = [
    {
      text: "Help me create a marketing strategy",
      img: "/icons/i1.png",
      title: "Marketing Strategy",
    },
    {
      text: "Write a technical tutorial for beginners",
      img: "/icons/i2.png",
      title: "Technical Tutorial",
    },
    {
      text: "Analyze competitor pricing models",
      img: "/icons/i3.png",
      title: "Pricing Models",
    },
    { text: "Design a user onboarding flow", img: "/icons/i4.png", title: "Design" },
  ];

  const handleExampleClick = (idea: any) => setUserPrompt(idea.text);

  // ---- server helpers (unchanged logic, condensed logs) ----
  const logFormData = (fd: FormData) => {
    const preview: Record<string, any[]> = {};
    for (const [k, v] of fd.entries()) {
      if (!preview[k]) preview[k] = [];
      if (v instanceof File)
        preview[k].push({ fileName: v.name, size: v.size, type: v.type });
      else preview[k].push(v);
    }
    console.log("[Smartgen -> FormData]", preview);
  };
const postCreateSmartgen = async ({
  inputPrompt,
  detailedPrompt,
  tokensUsed,
}: {
  inputPrompt: string;
  detailedPrompt: string;
  tokensUsed: number;
}) => {
  const safeTokens = Math.max(1, Number.isFinite(tokensUsed) ? tokensUsed : 0);
  const fd = new FormData();
  fd.append("inputPrompt", inputPrompt);
  fd.append("detailedPrompt", detailedPrompt);
  fd.append("tokensUsed", String(safeTokens));
  for (const f of files) fd.append("attachments", f);

  const base = API_BASE.replace(/\/+$/, "");
  const url = `${base}/api/smartgen`;

  const res = await fetch(url, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    body: fd,
    credentials: "include",
  });

  const raw = await res.text();
  let data: any = {};
  try { data = JSON.parse(raw); } catch {}

  if (!res.ok) {
    // map common server errors to nicer messages
   const code = data?.error || `http_${res.status}`;
const nice =
  code === "plan_required" ? "Plan required. Please purchase a plan."
: code === "subscription_inactive" ? "Your subscription is inactive."
: code === "org_subscription_inactive" ? "Your organization’s subscription is inactive."
: code === "member_cap_exceeded" ? "Your member token cap is exhausted."
: code === "org_pool_exhausted" ? "Organization token pool is exhausted."
: code === "token_quota_exceeded" ? "Monthly token quota exceeded."
: code === "insufficient_quota" ? "Insufficient token quota."
: code === "invalid_user_type" ? "Your account type cannot use Smartgen."
: code;

  }

  // Optional UI hint: if server includes daily tokens, show it; otherwise generic success
  const newId = data?.item?.id || data?.item?._id;
  if (newId) setSmartgenId(newId);

  const hasDaily = typeof data?.dailyTokensRemaining === "number";
  toast({
    title: "Smartgen created",
    description: hasDaily
      ? `Daily tokens remaining: ${data.dailyTokensRemaining}`
      : "Created successfully.",
  });

  // Only update auth if backend returned anything quota-related
  if (user && persistAuth) {
    const patch: any = { user: { ...user } };
    if (hasDaily) patch.user.dailyTokensRemaining = data.dailyTokensRemaining;
    // Keep future-friendly: if server later adds monthly, this won’t break
    if (typeof data?.monthlyTokensRemaining === "number") {
      patch.user.monthlyTokensRemaining = data.monthlyTokensRemaining;
    }
    if (data?.plan) patch.user.plan = data.plan;
    if (hasDaily || typeof data?.monthlyTokensRemaining === "number" || data?.plan) {
      persistAuth(patch);
    }
  }

  return data?.item;
};
  // const postCreateSmartgen = async ({
  //   inputPrompt,
  //   detailedPrompt,
  //   tokensUsed,
  // }: {
  //   inputPrompt: string;
  //   detailedPrompt: string;
  //   tokensUsed: number;
  // }) => {
  //   const safeTokens = Math.max(1, Number.isFinite(tokensUsed) ? tokensUsed : 0);
  //   const fd = new FormData();
  //   fd.append("inputPrompt", inputPrompt);
  //   fd.append("detailedPrompt", detailedPrompt);
  //   fd.append("tokensUsed", String(safeTokens));
  //   for (const f of files) fd.append("attachments", f);

  //   const base = API_BASE.replace(/\/+$/, "");
  //   const url = `${base}/api/smartgen`;
  //   console.log("🔵 POST create URL:", url);
  //   console.log("🔵 Auth header:", token ? "Bearer present ✅" : "❌ missing");
  //   logFormData(fd);

  //   const res = await fetch(url, {
  //     method: "POST",
  //     headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  //     body: fd,
  //     credentials: "include",
  //   });

  //   const raw = await res.text();
  //   console.log("🔵 POST status:", res.status, res.statusText);
  //   console.log("🔵 POST raw body:", raw);

  //   const data = (() => {
  //     try {
  //       return JSON.parse(raw);
  //     } catch {
  //       return {};
  //     }
  //   })();

  //   if (!res.ok) throw new Error(data?.error || `http_${res.status}`);

  //   if (
  //     typeof data?.dailyTokensRemaining === "number" &&
  //     user &&
  //     persistAuth
  //   ) {
  //     persistAuth({
  //       user: { ...user, dailyTokensRemaining: data.dailyTokensRemaining },
  //     });
  //   }

  //   toast({
  //     title: "Smartgen created",
  //     description:
  //       typeof data?.dailyTokensRemaining === "number"
  //         ? `Daily tokens remaining: ${data.dailyTokensRemaining}`
  //         : "Created successfully.",
  //   });

  //   const newId = data?.item?.id || data?.item?._id;
  //   if (newId) setSmartgenId(newId);
  //   return data?.item;
  // };

  // const putUpdateSmartgen = async ({
  //   id,
  //   inputPrompt,
  //   detailedPrompt,
  //   tokensUsed,
  // }: {
  //   id: string;
  //   inputPrompt: string;
  //   detailedPrompt: string;
  //   tokensUsed: number;
  // }) => {
  //   const safeTokens = Math.max(1, Number.isFinite(tokensUsed) ? tokensUsed : 0);
  //   const fd = new FormData();
  //   fd.append("inputPrompt", inputPrompt);
  //   fd.append("detailedPrompt", detailedPrompt);
  //   fd.append("tokensUsed", String(safeTokens));
  //   for (const f of files) fd.append("attachments", f);

  //   const base = API_BASE.replace(/\/+$/, "");
  //   const url = `${base}/api/smartgen/${id}`;
  //   const res = await fetch(url, {
  //     method: "PUT",
  //     headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  //     body: fd,
  //     credentials: "include",
  //   });

  //   const raw = await res.text();
  //   const data = (() => {
  //     try {
  //       return JSON.parse(raw);
  //     } catch {
  //       return {};
  //     }
  //   })();

  //   if (!res.ok) throw new Error(data?.error || `http_${res.status}`);

  //   if (
  //     typeof data?.dailyTokensRemaining === "number" &&
  //     user &&
  //     persistAuth
  //   ) {
  //     persistAuth({
  //       user: { ...user, dailyTokensRemaining: data.dailyTokensRemaining },
  //     });
  //   }

  //   toast({ title: "Smartgen updated", description: "Updated successfully." });

  //   const newId = data?.item?.id || data?.item?._id;
  //   if (newId) setSmartgenId(newId);

  //   return data?.item;
  // };



  const putUpdateSmartgen = async ({
  id,
  inputPrompt,
  detailedPrompt,
  tokensUsed,
}: {
  id: string;
  inputPrompt: string;
  detailedPrompt: string;
  tokensUsed: number;
}) => {
  const safeTokens = Math.max(1, Number.isFinite(tokensUsed) ? tokensUsed : 0);
  const fd = new FormData();
  fd.append("inputPrompt", inputPrompt);
  fd.append("detailedPrompt", detailedPrompt);
  fd.append("tokensUsed", String(safeTokens));
  for (const f of files) fd.append("attachments", f);

  const base = API_BASE.replace(/\/+$/, "");
  const url = `${base}/api/smartgen/${id}`;

  const res = await fetch(url, {
    method: "PUT",
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    body: fd,
    credentials: "include",
  });

  const raw = await res.text();
  let data: any = {};
  try { data = JSON.parse(raw); } catch {}

  if (!res.ok) {
    const code = data?.error || `http_${res.status}`;
    const nice =
      code === "insufficient_quota" ? "Insufficient token quota."
      : code === "not proper plan purchased" ? "Plan required. Please purchase a plan."
      : code === "smartgen_not_found_or_access_denied" ? "Not found or access denied."
      : code;
    throw new Error(nice);
  }

  const hasDaily = typeof data?.dailyTokensRemaining === "number";
  toast({
    title: "Smartgen updated",
    description: hasDaily
      ? `Daily tokens remaining: ${data.dailyTokensRemaining}`
      : "Updated successfully.",
  });

  // Update auth quotas only if present
  if (user && persistAuth) {
    const patch: any = { user: { ...user } };
    if (hasDaily) patch.user.dailyTokensRemaining = data.dailyTokensRemaining;
    if (typeof data?.monthlyTokensRemaining === "number") {
      patch.user.monthlyTokensRemaining = data.monthlyTokensRemaining;
    }
    if (data?.plan) patch.user.plan = data.plan;
    if (hasDaily || typeof data?.monthlyTokensRemaining === "number" || data?.plan) {
      persistAuth(patch);
    }
  }

  const newId = data?.item?.id || data?.item?._id;
  if (newId) setSmartgenId(newId);

  return data?.item;
};

  const upsertSmartgen = async (payload: {
    inputPrompt: string;
    detailedPrompt: string;
    tokensUsed: number;
  }) => {
    try {
      if (smartgenId) {
        const updated = await putUpdateSmartgen({ id: smartgenId, ...payload });
        console.log("✅ PUT updated item:", updated);
        return updated;
      } else {
        console.log("↪ Using POST (no smartgenId yet) …");
        const created = await postCreateSmartgen(payload);
        console.log("✅ POST created item:", created);
        return created;
      }
    } catch (e: any) {
      console.error("[Smartgen upsert error]", e);
      toast({
        title: "Save failed",
        description: e?.message || "Unable to save Smartgen",
        variant: "destructive",
      });
      return null;
    }
  };

  const saveSmartgenToServer = async ({
    collectionTitle,
    name,
  }: {
    collectionTitle?: string;
    name: string;
  }) => {
    if (!token) {
      toast({
        title: "Not signed in",
        description: "Please login to save.",
        variant: "destructive",
      });
      return null;
    }
    if (!smartgenId) {
      toast({
        title: "Nothing to save yet",
        description: "Generate a Smartgen first, then try saving.",
        variant: "destructive",
      });
      return null;
    }

    const base = API_BASE.replace(/\/+$/, "");
    const url = `${base}/api/saved-collections`;

    const payload = {
      section: "smartgen",
      refId: smartgenId,
      collectionTitle: collectionTitle?.trim() || undefined,
      name: name?.trim() || undefined,
    };

    const res = await fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "include",
    });

    const raw = await res.text();
    let data: any = {};
    try {
      data = JSON.parse(raw);
    } catch {}

    if (!res.ok) {
      const msg =
        data?.error === "invalid_section"
          ? "Invalid section"
          : data?.error === "invalid_refId"
          ? "Invalid reference id"
          : data?.error || `http_${res.status}`;
      throw new Error(msg);
    }

    return data;
  };

  /** Generate detailed prompt (fast llmService) + upsert */
  const generateDetailedPrompt = async () => {
    const promptToProcess = userPrompt.trim();
    if (!promptToProcess) {
      toast({
        title: "No prompt provided",
        description: "Please enter a prompt first",
        variant: "destructive",
      });
      return;
    }
    setIsGenerating(true);

    try {
      const result = await llmService.generateDetailedPrompt(promptToProcess);

      setDetailedPrompt(result.optimizedText);

      const originalTokens = Math.ceil(promptToProcess.length / 4);
      const tokensUsed =
        originalTokens +
        Math.ceil((result?.optimizedText?.length || 0) / 4);

      const efficiencyScore = Math.min(
        95,
        Math.max(
          60,
          100 -
            Math.round(
              (((result?.tokens ??
                Math.ceil((result?.optimizedText?.length || 0) / 4)) -
                originalTokens) /
                Math.max(originalTokens, 1)) *
                50
            )
        )
      );
      setTokenEfficiencyScore(efficiencyScore);

      onPromptGenerated?.(result.optimizedText);
      toast({
        title: "Detailed Prompt Generated!",
        description: "Your detailed prompt is ready",
      });

      const saved = await upsertSmartgen({
        inputPrompt: promptToProcess,
        detailedPrompt: result.optimizedText,
        tokensUsed,
      });
      if (saved) console.log("💾 Upsert success:", saved);
    } catch (err: any) {
  console.error(err);
  const msg =
    err?.code === "llm_timeout" || err?.message === "llm_timeout"
      ? "The AI request took too long. Please try again, or shorten the prompt."
      : err?.message || "Failed to generate prompt";
  toast({ title: "Error", description: msg, variant: "destructive" });
} finally {
  setIsGenerating(false);
}

  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: `${label} has been copied successfully`,
    });
  };

  const downloadPrompt = () => {
    const element = document.createElement("a");
    const file = new Blob([detailedPrompt], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "detailed-prompt.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast({
      title: "Download started",
      description: "Your prompt has been downloaded as a text file",
    });
  };

    // send detailed prompt to Prompt Optimizer
  const sendToOptimizer = async () => {
      if (!detailedPrompt?.trim()) {
       toast({
         title: "No detailed prompt",
         description: "Generate a detailed prompt first.",
         variant: "destructive",
      });
      return;
    }
    try {
      await navigator.clipboard.writeText(detailedPrompt);
        toast({
             title: "Copied",
      description: "Detailed prompt copied and opening Prompt Optimizer…",
    });
    navigate("/prompt-optimization", {
      state: { initialText: detailedPrompt },
      replace: false,
    });
    setDetailedPrompt(detailedPrompt); // Explicitly sync with context
  } catch (e) {
    console.error("Clipboard error:", e);
    toast({
      title: "Error",
      description: "Failed to copy to clipboard, but opening Prompt Optimizer…",
      variant: "destructive",
    });
    navigate("/prompt-optimization", {
      state: { initialText: detailedPrompt },
      replace: false,
    });
    setDetailedPrompt(detailedPrompt); // Ensure context is updated
  }
};

  return (
    <div className="space-y-6">
      {detailedPrompt && (
        <IdeasStrip
          exampleIdeas={exampleIdeas}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          handleExampleClick={handleExampleClick}
        />
      )}

      <div className="mx-auto w-full max-w-[1050px] rounded-[36px] bg-[#121213] overflow-visible px-0">
        <div className="flex justify-center px-4 pt-4 md:pt-6">
          <div className="relative w-full max-w-[1000px] min-h-[200px] md:h-[200px] rounded-[30px] bg-[#121213] border border-[#282829] text-white overflow-hidden">
            <div className="h-full flex">
              <div className="w-12" />
              <div className="flex-1 pr-14 pl-2 py-4">
                <Textarea
                  value={userPrompt}
                  onChange={(e) => setUserPrompt(e.target.value)}
                  placeholder="Write a technical tutorial for beginners"
                  className="w-full h-full bg-transparent border-none resize-none text-white placeholder-white/70 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-base leading-relaxed"
                />
              </div>
              <div className="w-12" />
            </div>

            {/* Bottom-left: attachments */}
            <div className="absolute bottom-3 left-3">
              <input
                type="file"
                id="file-upload"
                className="hidden"
                multiple
                onChange={(e) => {
                  const selected = Array.from(e.target.files || []);
                  setFiles(selected);
                  console.log(
                    "📎 Selected files:",
                    selected.map((f) => ({
                      name: f.name,
                      size: f.size,
                      type: f.type,
                    }))
                  );
                  if (selected.length) {
                    toast({
                      title: "Files attached",
                      description: `${selected.length} file(s) selected`,
                    });
                  }
                }}
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="h-8 w-8 grid place-items-center rounded-full bg-white/10 text-white hover:bg-white/15">
                  <Paperclip className="h-5 w-5" />
                </div>
              </label>
            </div>

            {/* Bottom-right controls (Clear, Mic, Generate) */}
{/* Bottom-right controls (Mic, History, Clear*, Generate) */}
<div className="absolute bottom-3 right-3 flex items-center gap-2">

  {/* Mic */}
  {speechSupported && (
    <button
      onClick={isListening ? stopListening : startListening}
      className="relative h-9 w-9 rounded-full grid place-items-center overflow-visible border border-[#333335] text-white transition-all duration-300"
      style={{ background: "#2C2C2C" }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.backgroundImage =
          "linear-gradient(270.19deg, #1A73E8 0.16%, #FF14EF 99.84%)")
      }
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundImage = "";
        e.currentTarget.style.background = "#2C2C2C";
      }}
      title={isListening ? "Stop voice input" : "Start voice input"}
      aria-label="Microphone"
    >
      {isListening && (
        <>
          <span
            className="absolute inset-0 rounded-full opacity-60 animate-ping"
            style={{ background: "linear-gradient(270.19deg, #1A73E8 0.16%, #FF14EF 99.84%)" }}
          />
          <span
            className="absolute inset-0 rounded-full opacity-40 animate-ping"
            style={{ background: "linear-gradient(270.19deg, #1A73E8 0.16%, #FF14EF 99.84%)", animationDelay: "0.4s" }}
          />
        </>
      )}
      <img
        src="/icons/mic.png"
        alt="Mic"
        className={`h-4 w-4 ${isListening ? "animate-pulse" : ""}`}
      />
    </button>
  )}

  {/* Prompt History (between Mic and Clear) */}
  <button
    onClick={goToSmartgenHistory}
    className="h-9 px-3 rounded-full flex items-center gap-2 border border-[#333335] text-white transition-all duration-300"
    style={{ background: "#2C2C2C" }}
    onMouseEnter={(e) =>
      (e.currentTarget.style.backgroundImage =
        "linear-gradient(270.19deg, #1A73E8 0.16%, #FF14EF 99.84%)")
    }
    onMouseLeave={(e) => {
      e.currentTarget.style.backgroundImage = "";
      e.currentTarget.style.background = "#2C2C2C";
    }}
    title="Prompt history"
    aria-label="Prompt history"
  >
    <History className="h-4 w-4" />
    <span className="text-sm">Smartgen History</span>
  </button>

  {/* Clear — only visible AFTER detailed prompt is generated */}
  {Boolean(detailedPrompt.trim()) && (
    <button
      onClick={() => clearPrompts()}
      className="h-9 px-4 rounded-full flex items-center justify-center text-white text-sm border border-[#333335] transition-all duration-300"
      style={{ background: "#2C2C2C" }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.backgroundImage =
          "linear-gradient(270.19deg, #1A73E8 0.16%, #FF14EF 99.84%)")
      }
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundImage = "";
        e.currentTarget.style.background = "#2C2C2C";
      }}
      title="Clear"
      aria-label="Clear"
    >
      Clear
    </button>
  )}

  {/* Generate — gradient on hover (not by default) */}
<button
  onClick={generateDetailedPrompt}
  disabled={isGenerating || !userPrompt.trim()}
  className="w-[131px] h-[40px] flex items-center justify-center gap-[10px] 
             rounded-[8px] px-[20px] py-[11.5px] 
             text-white text-sm font-medium 
             bg-gradient-to-r from-[#FF14EF] to-[#1A73E8] 
             transition-all duration-300 hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
>
  {isGenerating ? "Generating..." : "Generate"}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
  </svg>
</button>

</div>

          </div>
        </div>

        {!detailedPrompt && (
          <div className="flex justify-center px-4 -mt-px pb-4 md:pb-6">
            <div className="relative w-full max-w-[1000px] h-[200px] rounded-[30px] bg-[#121213] border border-[#282829] text-white overflow-hidden">
              <div className="grid grid-cols-4 h-full">
                {exampleIdeas.map((idea, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        handleExampleClick(idea);
                        setActiveIndex(index);
                      }}
                      className={[
                        "relative h-full w-full text-left",
                        "flex flex-col items-start justify-start px-6 pt-8 pb-4",
                        index !== 0 ? "border-l border-[#282829]" : "",
                        isActive ? "bg-white/5" : "hover:bg-white/7",
                      ].join(" ")}
                    >
                      <img
                        src={idea.img}
                        alt={idea.title}
                        className="h-6 w-6 mb-2"
                      />
                      <div
                        className="text-white font-semibold leading-[1.1] text-[15px]"
                        style={{ fontFamily: "Inter" }}
                      >
                        {idea.title}
                      </div>
                      <div
                        className="text-white/70 text-[15px] leading-[1.2] mt-[6px]"
                        style={{ fontFamily: "Inter" }}
                      >
                        {idea.text}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {detailedPrompt && (
          <div className="px-4 pb-6">
            <div className="mx-auto w-full max-w-[1000px]">
              <div className="text-center my-6">
                <h3 className="text-white font-semibold text-xl md:text-2xl">
                  Detailed Prompt
                </h3>
              </div>

              <div className={`${CARD_FRAME} relative p-4 md:p-5`}>
     <div className="relative text-white/90 text-sm leading-relaxed pr-4 md:pr-[12rem] pb-24 md:pb-22">
  {isEditingDetailed ? (
    <Textarea
      value={editablePrompt}
      onChange={(e) => setEditablePrompt(e.target.value)}
      className="w-full min-h-[200px] bg-[#1a1a1a] border border-[#333] text-white resize-vertical p-3 rounded-md"
    />
  ) : (
    <div className="whitespace-pre-line">{detailedPrompt}</div>
  )}
</div>




                {/* Actions (bottom-right): Optimize (left of Save), Save, Copy, Download, Open */}
                {/* Actions (bottom-right): Optimise, Save, Copy, Download, Open */}
<div className="mt-6 md:mt-0 md:absolute md:bottom-4 md:right-4 flex items-center gap-3">
  {/* Optimise → navigate to Prompt Optimizer */}
<button
  onClick={sendTOptimizer}
  className="h-10 px-4 rounded-full flex items-center gap-2 border border-[#333335] text-white transition-all duration-300"
  style={{
    background: "#252525", // default dark bg
  }}
  onMouseEnter={(e) =>
    (e.currentTarget.style.backgroundImage =
      "linear-gradient(270.19deg, #1A73E8 0.16%, #FF14EF 99.84%)")
  }
  onMouseLeave={(e) => {
    e.currentTarget.style.backgroundImage = "";
    e.currentTarget.style.background = "#252525";
  }}
  title="Optimise in Prompt Optimizer"
  aria-label="Optimise in Prompt Optimizer"
>
   <Sparkles className="h-4 w-4" />
  <span className="text-sm font-inter">Optimise</span>
</button>

 {!isEditingDetailed && (
  <button
    onClick={() => {
      setEditablePrompt(detailedPrompt);
      setIsEditingDetailed(true);
    }}
    className="h-10 px-4 rounded-full flex items-center gap-2 border border-[#333335] text-white transition-all duration-300"
    style={{ background: "#252525" }}
  >
    ✏️ Edit
  </button>
)}

{isEditingDetailed && (
  <>
    <button
      onClick={() => setIsEditingDetailed(false)}
      className="h-10 px-4 rounded-full flex items-center gap-2 border border-[#333335] text-white transition-all duration-300"
      style={{ background: "#252525" }}
    >
      ❌ Cancel
    </button>

    <button
      onClick={async () => {
        try {
          setIsGenerating(true);
          const result = await llmService.generateDetailedPrompt(editablePrompt);
          setDetailedPrompt(result.optimizedText);
          setIsEditingDetailed(false);
          toast({
            title: "Regenerated!",
            description: "Detailed prompt regenerated from your edited version.",
          });

          await upsertSmartgen({
            inputPrompt: userPrompt,
            detailedPrompt: result.optimizedText,
            tokensUsed: Math.ceil(result.optimizedText.length / 4),
          });
        } catch (e: any) {
          toast({
            title: "Error",
            description: e?.message || "Failed to regenerate prompt",
            variant: "destructive",
          });
        } finally {
          setIsGenerating(false);
        }
      }}
      className="h-10 px-4 rounded-full flex items-center gap-2 border border-[#333335] text-white transition-all duration-300"
      style={{
        background: "linear-gradient(270.19deg, #1A73E8 0.16%, #FF14EF 99.84%)",
      }}
    >
      🔄 Regenerate
    </button>
  </>
)}

  {/* Save (cop.png) */}
  <button
    ref={saveBtnRef}
    onClick={() => setIsModalOpen((v) => !v)}
    aria-pressed={isModalOpen}
    title="Save"
    aria-label="Save"
    className="w-10 h-10 rounded-full flex items-center justify-center transition-colors border"
    style={{ background: isModalOpen ? GRADIENT : "#252525", borderColor: "#333335" }}
  >
    <img src="/icons/cop.png" alt="Save" className="w-5 h-5 object-contain" />
  </button>

  <button
    onClick={() => { setActiveAction("copy"); copyToClipboard(detailedPrompt, "Prompt"); }}
    aria-pressed={activeAction === "copy"}
    className="h-9 w-9 rounded-full flex items-center justify-center transition-colors"
    style={{ background: activeAction === "copy" ? GRADIENT : "#252525" }}
    title="Copy"
  >
    <Copy className="h-4 w-4 text-white" />
  </button>

  <button
    onClick={() => { setActiveAction("download"); downloadPrompt(); }}
    aria-pressed={activeAction === "download"}
    className="h-9 w-9 rounded-full flex items-center justify-center transition-colors"
    style={{ background: activeAction === "download" ? GRADIENT : "#252525" }}
    title="Download"
  >
    <Download className="h-4 w-4 text-white" />
  </button>

  <button
    onClick={() => {
      setActiveAction("open");
      const encodedPrompt = encodeURIComponent(detailedPrompt);
      window.open(`https://chat.openai.com/?prompt=${encodedPrompt}`, "_blank");
    }}
    aria-pressed={activeAction === "open"}
    className="h-9 w-9 rounded-full flex items-center justify-center transition-colors"
    style={{ background: activeAction === "open" ? GRADIENT : "#252525" }}
    title="Open in ChatGPT"
  >
    <ExternalLink className="h-4 w-4 text-white" />
  </button>
</div>

              </div>

              {/* chips (kept) */}
              {/* <div className="mt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-2">
                <div className="flex flex-col items-center shrink-0">
                  <div
                    className="mb-0.5 text-white/70"
                    style={{
                      fontFamily: "Inter",
                      fontWeight: 400,
                      fontSize: "12px",
                      lineHeight: "100%",
                    }}
                  >
                    Original Length
                  </div>
                  <div className="px-3 py-[6px] rounded-full bg-[#252525] leading-none">
                    <span
                      style={{
                        background:
                          "linear-gradient(90deg, #FF14EF 0%, #1A73E8 100%)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        color: "transparent",
                        fontFamily: "Inter",
                        fontWeight: 400,
                      }}
                    >
                      {Math.ceil(userPrompt.length / 4)} Tokens
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-center shrink-0">
                  <div
                    className="mb-0.5 text-white/70"
                    style={{
                      fontFamily: "Inter",
                      fontWeight: 400,
                      fontSize: "12px",
                      lineHeight: "100%",
                    }}
                  >
                    Efficiency Score
                  </div>
                  <div className="px-3 py-[6px] rounded-full bg-[#252525] leading-none">
                    <span
                      style={{
                        background:
                          "linear-gradient(90deg, #FF14EF 0%, #1A73E8 100%)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        color: "transparent",
                        fontFamily: "Inter",
                        fontWeight: 400,
                      }}
                    >
                      {tokenEfficiencyScore}% needs improvement
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-center shrink-0">
                  <div
                    className="mb-0.5 text-white/70"
                    style={{
                      fontFamily: "Inter",
                      fontWeight: 400,
                      fontSize: "12px",
                      lineHeight: "100%",
                    }}
                  >
                    Detailed Length
                  </div>
                  <div className="px-3 py-[6px] rounded-full bg-[#252525] leading-none">
                    <span
                      style={{
                        background:
                          "linear-gradient(90deg, #FF14EF 0%, #1A73E8 100%)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        color: "transparent",
                        fontFamily: "Inter",
                        fontWeight: 400,
                      }}
                    >
                      {Math.ceil(detailedPrompt.length / 4)} Tokens
                    </span>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        )}
      </div>

      {isGenerating && (
        <div className="text-center text-muted-foreground mb-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-2 h-2 bg-tokun rounded-full animate-bounce"></div>
            <div
              className="w-2 h-2 bg-tokun rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-2 h-2 bg-tokun rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
          <p>Creating detailed prompt...</p>
        </div>
      )}

      <ModalComponent
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={async (payload) => {
          const finalTitle =
            (payload?.title ?? "").trim() ||
            (userPrompt || "Untitled").trim();
          const isQuick = !!payload?.quick;

          try {
            const serverResp = await saveSmartgenToServer({
              collectionTitle: isQuick ? undefined : finalTitle,
              name: finalTitle,
            });

            if (serverResp?.success) {
              toast({
                title: "Saved",
                description: isQuick
                  ? "Added to All Saved (Smartgen)."
                  : `Created/updated collection “${finalTitle}”.`,
              });
            } else {
              saveItem({
                title: finalTitle,
                prompt: detailedPrompt || "No result yet",
                type: "smartgen",
                category: isQuick ? "All Saved" : finalTitle,
              });
              toast({
                title: "Saved locally",
                description:
                  "Could not confirm server save, mirrored to local.",
              });
            }
          } catch (e: any) {
            saveItem({
              title: finalTitle,
              prompt: detailedPrompt || "No result yet",
              type: "smartgen",
              category: isQuick ? "All Saved" : finalTitle,
            });
            toast({
              title: "Saved locally",
              description:
                e?.message ||
                "Server save failed; mirrored to local storage.",
            });
          } finally {
            setIsModalOpen(false);
          }
        }}
        anchorRef={saveBtnRef}
      />
    </div>
  );
};

export default SmarterPrompt;