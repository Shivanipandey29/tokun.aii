// // // // // // src/pages/historyDetail.tsx
// // // // // import React, { useMemo, useState } from "react";
// // // // // import { Dialog, DialogContent } from "@/components/ui/dialog";
// // // // // import { Download, Image as ImageIcon, Video, Check, AlertCircle } from "lucide-react";

// // // // // export interface MarketplacePrompt {
// // // // //   id: number | string;
// // // // //   title: string;
// // // // //   description: string;
// // // // //   price: number;
// // // // //   rating?: number;
// // // // //   downloads: number;
// // // // //   category: string;
// // // // //   videoUrl?: string;
// // // // //   imageUrl?: string;
// // // // //   fullPrompt?: string;
// // // // // }

// // // // // interface DetailsPromptProps {
// // // // //   open: boolean;
// // // // //   onOpenChange: (open: boolean) => void;
// // // // //   prompt: MarketplacePrompt | null;
// // // // //   owned?: boolean;
// // // // //   onPurchase?: (prompt: MarketplacePrompt) => void; // kept for API compat
// // // // //   showImages?: boolean;
// // // // // }

// // // // // const STAR_ACTIVE = "#FF14EF";

// // // // // export default function DetailsPrompt({
// // // // //   open,
// // // // //   onOpenChange,
// // // // //   prompt,
// // // // //   owned = false,
// // // // //   showImages = false,
// // // // // }: DetailsPromptProps) {
// // // // //   const [reportOpen, setReportOpen] = useState(false);
// // // // //   const [userRating, setUserRating] = useState<number>(0);
// // // // //   const [hoverRating, setHoverRating] = useState<number>(0);

// // // // //   const media = useMemo(() => {
// // // // //     if (!prompt) return null;
// // // // //     return showImages
// // // // //       ? ({ type: "image", url: prompt.imageUrl || "" } as const)
// // // // //       : ({ type: "video", url: prompt.videoUrl || "" } as const);
// // // // //   }, [prompt, showImages]);

// // // // //   if (!prompt) return null;

// // // // //   const currentStars = hoverRating || userRating;

// // // // //   return (
// // // // //     <>
// // // // //       <Dialog open={open} onOpenChange={onOpenChange}>
// // // // //         <DialogContent
// // // // //           className="
// // // // //             bg-[#17171A] text-white p-0 border-none
// // // // //             w-[min(96vw,1400px)]
// // // // //             max-h-[95vh]
// // // // //             rounded-3xl md:rounded-[40px]
// // // // //             overflow-hidden flex flex-col
// // // // //             [&>button.absolute.right-4.top-4]:hidden
// // // // //             [&>button:has(svg[class*='lucide-x'])]:hidden
// // // // //           "
// // // // //         >
// // // // //           {/* MEDIA (no title overlay) */}
// // // // //           <div
// // // // //             className="
// // // // //               relative mx-auto
// // // // //               w-[calc(100%-3rem)] max-w-[1100px]
// // // // //               aspect-[3/2]
// // // // //               bg-[#333335]
// // // // //               overflow-hidden
// // // // //               rounded-[18px] md:rounded-[22px]
// // // // //               mt-5
// // // // //               shrink-0
// // // // //             "
// // // // //           >
// // // // //             <div className="absolute top-4 left-4 z-10">
// // // // //               <span className="px-3 py-1 text-[12px] font-semibold rounded-full text-black bg-white">
// // // // //                 {prompt.category.toUpperCase()}
// // // // //               </span>
// // // // //             </div>

// // // // //             <div className="absolute top-4 right-4 z-10">
// // // // //               <span className="px-3 py-1 text-[12px] font-semibold rounded-full text-black bg-white">
// // // // //                 PURCHASE TO UNLOCK
// // // // //               </span>
// // // // //             </div>

// // // // //             <div className="absolute inset-0">
// // // // //               {media?.type === "image" ? (
// // // // //                 <img src={media.url} alt="" className="w-full h-full object-cover" />
// // // // //               ) : (
// // // // //                 <video
// // // // //                   src={media?.url}
// // // // //                   className="w-full h-full object-cover"
// // // // //                   loop
// // // // //                   muted
// // // // //                   autoPlay
// // // // //                   playsInline
// // // // //                 />
// // // // //               )}
// // // // //             </div>

// // // // //             {/* Type hint */}
// // // // //             <div className="absolute bottom-3 left-4 flex items-center gap-2 text-sm text-white/80">
// // // // //               {media?.type === "image" ? <ImageIcon className="h-5 w-5" /> : <Video className="h-5 w-5" />}
// // // // //               <span className="uppercase tracking-wide">{media?.type}</span>
// // // // //             </div>
// // // // //           </div>

// // // // //           {/* DETAILS */}
// // // // //           <div
// // // // //             className="
// // // // //               px-8 md:px-10
// // // // //               pt-5 md:pt-6
// // // // //               pb-7 md:pb-9
// // // // //               min-h-0 flex-1 overflow-y-auto no-scrollbar
// // // // //             "
// // // // //           >
// // // // //             {/* Title row */}
// // // // //             <div className="grid grid-cols-[1fr_auto] items-start gap-4 mt-2">
// // // // //               <h2 className="font-semibold text-[24px] leading-snug tracking-tight [font-family:Inter,ui-sans-serif,system-ui]">
// // // // //                 {prompt.title}
// // // // //               </h2>
// // // // //               <span
// // // // //                 className="flex items-center justify-center rounded-full justify-self-end"
// // // // //                 style={{ backgroundColor: "#333335", width: 40, height: 40 }}
// // // // //                 aria-hidden
// // // // //               >
// // // // //                 <img src="/icons/cop1.png" alt="" className="w-5 h-5 object-contain" />
// // // // //               </span>
// // // // //             </div>

// // // // //             {/* BANNER PILL */}
// // // // //             <div
// // // // //               className="
// // // // //                 mt-4
// // // // //                 bg-[#333335]
// // // // //                 border border-white/10
// // // // //                 rounded-[12px]
// // // // //                 px-4 md:px-5 py-3
// // // // //                 flex items-center justify-between gap-4
// // // // //               "
// // // // //             >
// // // // //               <div className="flex items-center gap-4 min-w-0">
// // // // //                 <img
// // // // //                   src="/icons/dtlogo.svg"
// // // // //                   onError={(e) => {
// // // // //                     const img = e.currentTarget as HTMLImageElement & { dataset: any };
// // // // //                     if (!img.dataset.fallback) {
// // // // //                       img.dataset.fallback = "1";
// // // // //                       img.src = "/icons/dtlogo.png";
// // // // //                     }
// // // // //                   }}
// // // // //                   alt="DT Logo"
// // // // //                   className="shrink-0 object-contain"
// // // // //                   style={{ height: 32, width: "auto" }}
// // // // //                 />
// // // // //                 <div className="min-w-0">
// // // // //                   <div className="truncate text-[18px] leading-snug [font-family:Inter,ui-sans-serif,system-ui]">
// // // // //                     Power Your Storefronts with Auto-Generated Descriptions
// // // // //                   </div>
// // // // //                   <div className="text-white/70 truncate text-[13px] mt-2 leading-snug [font-family:Inter,ui-sans-serif,system-ui]">
// // // // //                     Generate compelling product descriptions that convert visitors into customers
// // // // //                   </div>
// // // // //                 </div>
// // // // //               </div>

// // // // //               {/* Right: rating number ABOVE stars */}
// // // // //               <div className="flex flex-col items-center gap-1 shrink-0">
// // // // //                 <span className="text-[13px] font-semibold leading-none">
// // // // //                   {(prompt.rating ?? 0).toFixed(2)}
// // // // //                 </span>
// // // // //                 <div className="flex items-center gap-[4px] leading-none">
// // // // //                   {[...Array(5)].map((_, i) => (
// // // // //                     <svg key={i} width="16" height="16" viewBox="0 0 24 24" aria-hidden>
// // // // //                       <path
// // // // //                         d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
// // // // //                         fill="#FFFFFF"
// // // // //                       />
// // // // //                     </svg>
// // // // //                   ))}
// // // // //                 </div>
// // // // //               </div>
// // // // //             </div>

// // // // //             {/* Description */}
// // // // //             <p className="mt-4 text-white/80 text-[16px] leading-relaxed [font-family:Inter,ui-sans-serif,system-ui]">
// // // // //               {prompt.description}
// // // // //             </p>

// // // // //             {/* Divider above rating */}
// // // // //             <div className="border-t border-white/10 mt-6 mb-4" />

// // // // //             {/* Rate your experience */}
// // // // //             <div>
// // // // //               <div className="text-white/90 text-[14px] mb-2">Rate your experience</div>
// // // // //               <div className="flex items-center gap-2">
// // // // //                 {[1, 2, 3, 4, 5].map((i) => (
// // // // //                   <button
// // // // //                     key={i}
// // // // //                     type="button"
// // // // //                     aria-label={`Rate ${i} star${i > 1 ? "s" : ""}`}
// // // // //                     onMouseEnter={() => setHoverRating(i)}
// // // // //                     onMouseLeave={() => setHoverRating(0)}
// // // // //                     onClick={() => setUserRating(i)}
// // // // //                     className="p-1"
// // // // //                   >
// // // // //                     <svg width="28" height="28" viewBox="0 0 24 24">
// // // // //                       <path
// // // // //                         d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
// // // // //                         fill={i <= currentStars ? STAR_ACTIVE : "none"}
// // // // //                         stroke={i <= currentStars ? STAR_ACTIVE : "#FFFFFF"}
// // // // //                         strokeWidth="1.6"
// // // // //                       />
// // // // //                     </svg>
// // // // //                   </button>
// // // // //                 ))}
// // // // //               </div>
// // // // //             </div>

// // // // //             {/* Separator */}
// // // // //             <div className="border-t border-white/10 mt-6 mb-5" />

// // // // //             {/* STATS + REPORT button */}
// // // // //             <div className="flex items-center justify-end gap-4">
// // // // //               <div className="flex items-center gap-3">
// // // // //                 <div className="flex items-center gap-2 bg-[#333335] rounded-full px-4 py-2">
// // // // //                   <Download className="h-5 w-5" />
// // // // //                   <span className="text-base leading-none">{prompt.downloads}</span>
// // // // //                 </div>
// // // // //                 <div className="flex items-center gap-2 bg-[#333335] rounded-full px-4 py-2">
// // // // //                   <span className="text-base leading-none">${prompt.price.toFixed(2)}</span>
// // // // //                 </div>
// // // // //               </div>

// // // // //               <button
// // // // //                 className="
// // // // //                   px-8 h-12 rounded-full text-white text-base font-medium leading-none
// // // // //                   bg-gradient-to-r from-[#5A3FFF] to-[#FF14EF]
// // // // //                   transition-all
// // // // //                 "
// // // // //                 onClick={() => setReportOpen(true)}
// // // // //               >
// // // // //                 Report Resource
// // // // //               </button>
// // // // //             </div>
// // // // //           </div>
// // // // //         </DialogContent>
// // // // //       </Dialog>

// // // // //       {/* REPORT RESOURCE POPUP */}
// // // // //       <ReportResourceDialog open={reportOpen} onOpenChange={setReportOpen} />
// // // // //     </>
// // // // //   );
// // // // // }

// // // // // /* ---------------- Report dialog ---------------- */
// // // // // function ReportResourceDialog({
// // // // //   open,
// // // // //   onOpenChange,
// // // // // }: {
// // // // //   open: boolean;
// // // // //   onOpenChange: (v: boolean) => void;
// // // // // }) {
// // // // //   const [title, setTitle] = useState("");
// // // // //   const [url, setUrl] = useState("");
// // // // //   const [category, setCategory] = useState("");
// // // // //   const [tags, setTags] = useState("");
// // // // //   const [reason, setReason] = useState("");
// // // // //   const [desc, setDesc] = useState("");
// // // // //   const [steps, setSteps] = useState("");
// // // // //   const [agree, setAgree] = useState(false);
// // // // //   const [files, setFiles] = useState<File[]>([]);
// // // // //   const [touchedUrl, setTouchedUrl] = useState(false);

// // // // //   const isValidUrl = (() => {
// // // // //     try {
// // // // //       if (!url) return false;
// // // // //       const u = new URL(url);
// // // // //       return !!u.protocol && !!u.host;
// // // // //     } catch {
// // // // //       return false;
// // // // //     }
// // // // //   })();

// // // // //   function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
// // // // //     const list = e.target.files ? Array.from(e.target.files).slice(0, 5) : [];
// // // // //     setFiles(list);
// // // // //   }

// // // // //   function submit(e: React.FormEvent) {
// // // // //     e.preventDefault();
// // // // //     if (!isValidUrl || !agree) return;
// // // // //     onOpenChange(false);
// // // // //   }

// // // // //   return (
// // // // //     <Dialog open={open} onOpenChange={onOpenChange}>
// // // // //       <DialogContent
// // // // //         className="
// // // // //           bg-[#17171A] text-white border border-white/10
// // // // //           w-[min(96vw,520px)]
// // // // //           max-h-[95vh]
// // // // //           rounded-2xl p-0 overflow-hidden
// // // // //         "
// // // // //       >
// // // // //         {/* hide scrollbars on the form container */}
// // // // //         <form className="p-5 sm:p-6 overflow-y-auto no-scrollbar max-h-[95vh]" onSubmit={submit}>
// // // // //           <h3 className="text-lg font-semibold mb-1">Report a Resource</h3>
// // // // //           <p className="text-white/70 text-sm mb-5">
// // // // //             Flag broken, outdated, inappropriate, or otherwise problematic resources.
// // // // //           </p>

// // // // //           {/* Title */}
// // // // //           <label className="block text-sm mb-1">Resource Title</label>
// // // // //           <input
// // // // //             type="text"
// // // // //             className="w-full h-11 rounded-xl bg-transparent border border-white/15 px-3 mb-4 outline-none"
// // // // //             placeholder="e.g., Intro to UX Research"
// // // // //             value={title}
// // // // //             onChange={(e) => setTitle(e.target.value)}
// // // // //           />

// // // // //           {/* URL */}
// // // // //           <label className="block text-sm mb-1">Resource URL</label>
// // // // //           <div className="relative">
// // // // //             <input
// // // // //               type="url"
// // // // //               className={`w-full h-11 rounded-xl bg-transparent border px-3 outline-none ${
// // // // //                 touchedUrl && !isValidUrl ? "border-red-500/70 pr-10" : "border-white/15"
// // // // //               }`}
// // // // //               placeholder="https://example.com/article"
// // // // //               value={url}
// // // // //               onChange={(e) => setUrl(e.target.value)}
// // // // //               onBlur={() => setTouchedUrl(true)}
// // // // //             />
// // // // //             {touchedUrl && !isValidUrl && (
// // // // //               <>
// // // // //                 <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-red-400 h-5 w-5" />
// // // // //                 <div className="text-red-400 text-xs mt-1">Please enter valid url</div>
// // // // //               </>
// // // // //             )}
// // // // //           </div>

// // // // //           {/* Category */}
// // // // //           <div className="mt-4">
// // // // //             <label className="block text-sm mb-1">Category</label>
// // // // //             <div className="h-11 rounded-xl px-3 flex items-center border border-white/15 bg-[#17171A]">
// // // // //               <select
// // // // //                 className="bg-[#17171A] text-white/90 w-full outline-none"
// // // // //                 value={category}
// // // // //                 onChange={(e) => setCategory(e.target.value)}
// // // // //               >
// // // // //                 <option value="">Select a category</option>
// // // // //                 <option value="design">Design</option>
// // // // //                 <option value="development">Development</option>
// // // // //                 <option value="marketing">Marketing</option>
// // // // //                 <option value="other">Other</option>
// // // // //               </select>
// // // // //             </div>
// // // // //           </div>

// // // // //           {/* Tags */}
// // // // //           <div className="mt-4">
// // // // //             <label className="block text-sm mb-1">
// // // // //               Tags <span className="text-white/50 text-xs">(comma separated)</span>
// // // // //             </label>
// // // // //             <input
// // // // //               type="text"
// // // // //               className="w-full h-11 rounded-xl bg-transparent border border-white/15 px-3 outline-none"
// // // // //               placeholder="ui/ux, research, prototyping"
// // // // //               value={tags}
// // // // //               onChange={(e) => setTags(e.target.value)}
// // // // //             />
// // // // //           </div>

// // // // //           {/* Reason */}
// // // // //           <div className="mt-4">
// // // // //             <label className="block text-sm mb-1">Reason for Report</label>
// // // // //             <div className="h-11 rounded-xl px-3 flex items-center border border-white/15 bg-[#17171A]">
// // // // //               <select
// // // // //                 className="bg-[#17171A] text-white/90 w-full outline-none"
// // // // //                 value={reason}
// // // // //                 onChange={(e) => setReason(e.target.value)}
// // // // //               >
// // // // //                 <option value="">Choose reason</option>
// // // // //                 <option value="broken">Broken link / media</option>
// // // // //                 <option value="outdated">Outdated</option>
// // // // //                 <option value="inappropriate">Inappropriate</option>
// // // // //                 <option value="other">Other</option>
// // // // //               </select>
// // // // //             </div>
// // // // //           </div>

// // // // //           {/* Describe */}
// // // // //           <div className="mt-4">
// // // // //             <label className="block text-sm mb-1">Describe the issue</label>
// // // // //             <textarea
// // // // //               rows={4}
// // // // //               className="w-full rounded-xl bg-transparent border border-white/15 px-3 py-2 outline-none"
// // // // //               placeholder="What is wrong with this resource? Include key details."
// // // // //               value={desc}
// // // // //               onChange={(e) => setDesc(e.target.value)}
// // // // //             />
// // // // //           </div>

// // // // //           {/* Steps (optional) */}
// // // // //           <div className="mt-4">
// // // // //             <label className="block text-sm mb-1">
// // // // //               Steps to reproduce <span className="text-white/50 text-xs">(optional)</span>
// // // // //             </label>
// // // // //             <textarea
// // // // //               rows={3}
// // // // //               className="w-full rounded-xl bg-transparent border border-white/15 px-3 py-2 outline-none"
// // // // //               placeholder={"1) Open the page  2) Click play  3) Video fails to load"}
// // // // //               value={steps}
// // // // //               onChange={(e) => setSteps(e.target.value)}
// // // // //             />
// // // // //           </div>

// // // // //           {/* Attach screenshots */}
// // // // //           <div className="mt-4">
// // // // //             <label className="block text-sm mb-1">
// // // // //               Attach screenshots <span className="text-white/50 text-xs">(optional)</span>
// // // // //             </label>
// // // // //             <label
// // // // //               className="
// // // // //                 w-full h-28 rounded-xl border border-dashed border-white/20
// // // // //                 grid place-items-center text-white/60 cursor-pointer
// // // // //               "
// // // // //             >
// // // // //               <input
// // // // //                 type="file"
// // // // //                 multiple
// // // // //                 accept="image/png,image/jpeg,application/pdf"
// // // // //                 className="hidden"
// // // // //                 onChange={onFileChange}
// // // // //               />
// // // // //               {files.length === 0 ? "Add up to 5 files" : `${files.length} file(s) selected`}
// // // // //             </label>
// // // // //             <div className="text-xs text-white/50 mt-2">Up to 5 files. PNG/JPG/PDF.</div>
// // // // //           </div>

// // // // //           {/* Agree */}
// // // // //           <label className="flex items-start gap-3 mt-4 text-sm">
// // // // //             <input
// // // // //               type="checkbox"
// // // // //               className="mt-0.5"
// // // // //               checked={agree}
// // // // //               onChange={(e) => setAgree(e.target.checked)}
// // // // //             />
// // // // //             <span className="text-white/80">
// // // // //               I agree that this report complies with the Community Guidelines and Privacy Policy.
// // // // //             </span>
// // // // //           </label>

// // // // //           {/* Footer actions */}
// // // // //           <div className="flex justify-end gap-3 mt-6">
// // // // //             <button
// // // // //               type="button"
// // // // //               className="h-10 px-4 rounded-xl bg-white/10 border border-white/15"
// // // // //               onClick={() => onOpenChange(false)}
// // // // //             >
// // // // //               Cancel
// // // // //             </button>
// // // // //             <button
// // // // //               type="submit"
// // // // //               className="
// // // // //                 h-10 px-5 rounded-xl text-white
// // // // //                 bg-gradient-to-r from-[#5A3FFF] to-[#FF14EF]
// // // // //                 disabled:opacity-60
// // // // //               "
// // // // //               disabled={!isValidUrl || !agree}
// // // // //             >
// // // // //               Submit
// // // // //             </button>
// // // // //           </div>
// // // // //         </form>
// // // // //       </DialogContent>
// // // // //     </Dialog>
// // // // //   );
// // // // // }


// // // // // src/pages/historyDetail.tsx
// // // // import React, { useEffect, useMemo, useState } from "react";
// // // // import { Dialog, DialogContent } from "@/components/ui/dialog";
// // // // import { Download, Image as ImageIcon, Video, AlertCircle, Loader2 } from "lucide-react";
// // // // import { useAuth } from "@/contexts/AuthContext";
// // // // import { toast } from "@/components/ui/use-toast";

// // // // export interface MarketplacePrompt {
// // // //   id: number | string;
// // // //   title: string;
// // // //   description: string;
// // // //   price: number;
// // // //   rating?: number;
// // // //   downloads: number;
// // // //   category: string;
// // // //   videoUrl?: string;
// // // //   imageUrl?: string;
// // // //   fullPrompt?: string;
// // // // }

// // // // interface DetailsPromptProps {
// // // //   open: boolean;
// // // //   onOpenChange: (open: boolean) => void;
// // // //   prompt: MarketplacePrompt | null;
// // // //   owned?: boolean;
// // // //   onPurchase?: (prompt: MarketplacePrompt) => void; // kept for API compat
// // // //   showImages?: boolean;
// // // // }

// // // // const STAR_ACTIVE = "#FF14EF";
// // // // const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// // // // export default function DetailsPrompt({
// // // //   open,
// // // //   onOpenChange,
// // // //   prompt,
// // // //   owned = false,
// // // //   showImages = false,
// // // // }: DetailsPromptProps) {
// // // //   const [reportOpen, setReportOpen] = useState(false);
// // // //   const [userRating, setUserRating] = useState<number>(0);
// // // //   const [hoverRating, setHoverRating] = useState<number>(0);

// // // //   const media = useMemo(() => {
// // // //     if (!prompt) return null;
// // // //     return showImages
// // // //       ? ({ type: "image", url: prompt.imageUrl || "" } as const)
// // // //       : ({ type: "video", url: prompt.videoUrl || "" } as const);
// // // //   }, [prompt, showImages]);

// // // //   if (!prompt) return null;

// // // //   const currentStars = hoverRating || userRating;

// // // //   return (
// // // //     <>
// // // //       <Dialog open={open} onOpenChange={onOpenChange}>
// // // //         <DialogContent
// // // //           className="
// // // //             bg-[#17171A] text-white p-0 border-none
// // // //             w-[min(96vw,1400px)]
// // // //             max-h-[95vh]
// // // //             rounded-3xl md:rounded-[40px]
// // // //             overflow-hidden flex flex-col
// // // //             [&>button.absolute.right-4.top-4]:hidden
// // // //             [&>button:has(svg[class*='lucide-x'])]:hidden
// // // //           "
// // // //         >
// // // //           {/* MEDIA (no title overlay) */}
// // // //           <div
// // // //             className="
// // // //               relative mx-auto
// // // //               w-[calc(100%-3rem)] max-w-[1100px]
// // // //               aspect-[3/2]
// // // //               bg-[#333335]
// // // //               overflow-hidden
// // // //               rounded-[18px] md:rounded-[22px]
// // // //               mt-5
// // // //               shrink-0
// // // //             "
// // // //           >
// // // //             <div className="absolute top-4 left-4 z-10">
// // // //               <span className="px-3 py-1 text-[12px] font-semibold rounded-full text-black bg-white">
// // // //                 {prompt.category.toUpperCase()}
// // // //               </span>
// // // //             </div>

// // // //             <div className="absolute top-4 right-4 z-10">
// // // //               <span className="px-3 py-1 text-[12px] font-semibold rounded-full text-black bg-white">
// // // //                 PURCHASE TO UNLOCK
// // // //               </span>
// // // //             </div>

// // // //             <div className="absolute inset-0">
// // // //               {media?.type === "image" ? (
// // // //                 <img src={media.url} alt="" className="w-full h-full object-cover" />
// // // //               ) : (
// // // //                 <video
// // // //                   src={media?.url}
// // // //                   className="w-full h-full object-cover"
// // // //                   loop
// // // //                   muted
// // // //                   autoPlay
// // // //                   playsInline
// // // //                 />
// // // //               )}
// // // //             </div>

// // // //             {/* Type hint */}
// // // //             <div className="absolute bottom-3 left-4 flex items-center gap-2 text-sm text-white/80">
// // // //               {media?.type === "image" ? <ImageIcon className="h-5 w-5" /> : <Video className="h-5 w-5" />}
// // // //               <span className="uppercase tracking-wide">{media?.type}</span>
// // // //             </div>
// // // //           </div>

// // // //           {/* DETAILS */}
// // // //           <div
// // // //             className="
// // // //               px-8 md:px-10
// // // //               pt-5 md:pt-6
// // // //               pb-7 md:pb-9
// // // //               min-h-0 flex-1 overflow-y-auto no-scrollbar
// // // //             "
// // // //           >
// // // //             {/* Title row */}
// // // //             <div className="grid grid-cols-[1fr_auto] items-start gap-4 mt-2">
// // // //               <h2 className="font-semibold text-[24px] leading-snug tracking-tight [font-family:Inter,ui-sans-serif,system-ui]">
// // // //                 {prompt.title}
// // // //               </h2>
// // // //               <span
// // // //                 className="flex items-center justify-center rounded-full justify-self-end"
// // // //                 style={{ backgroundColor: "#333335", width: 40, height: 40 }}
// // // //                 aria-hidden
// // // //               >
// // // //                 <img src="/icons/cop1.png" alt="" className="w-5 h-5 object-contain" />
// // // //               </span>
// // // //             </div>

// // // //             {/* BANNER PILL */}
// // // //             <div
// // // //               className="
// // // //                 mt-4
// // // //                 bg-[#333335]
// // // //                 border border-white/10
// // // //                 rounded-[12px]
// // // //                 px-4 md:px-5 py-3
// // // //                 flex items-center justify-between gap-4
// // // //               "
// // // //             >
// // // //               <div className="flex items-center gap-4 min-w-0">
// // // //                 <img
// // // //                   src="/icons/dtlogo.svg"
// // // //                   onError={(e) => {
// // // //                     const img = e.currentTarget as HTMLImageElement & { dataset: any };
// // // //                     if (!img.dataset.fallback) {
// // // //                       img.dataset.fallback = "1";
// // // //                       img.src = "/icons/dtlogo.png";
// // // //                     }
// // // //                   }}
// // // //                   alt="DT Logo"
// // // //                   className="shrink-0 object-contain"
// // // //                   style={{ height: 32, width: "auto" }}
// // // //                 />
// // // //                 <div className="min-w-0">
// // // //                   <div className="truncate text-[18px] leading-snug [font-family:Inter,ui-sans-serif,system-ui]">
// // // //                     Power Your Storefronts with Auto-Generated Descriptions
// // // //                   </div>
// // // //                   <div className="text-white/70 truncate text-[13px] mt-2 leading-snug [font-family:Inter,ui-sans-serif,system-ui]">
// // // //                     Generate compelling product descriptions that convert visitors into customers
// // // //                   </div>
// // // //                 </div>
// // // //               </div>

// // // //               {/* Right: rating number ABOVE stars */}
// // // //               <div className="flex flex-col items-center gap-1 shrink-0">
// // // //                 <span className="text-[13px] font-semibold leading-none">
// // // //                   {(prompt.rating ?? 0).toFixed(2)}
// // // //                 </span>
// // // //                 <div className="flex items-center gap-[4px] leading-none">
// // // //                   {[...Array(5)].map((_, i) => (
// // // //                     <svg key={i} width="16" height="16" viewBox="0 0 24 24" aria-hidden>
// // // //                       <path
// // // //                         d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
// // // //                         fill="#FFFFFF"
// // // //                       />
// // // //                     </svg>
// // // //                   ))}
// // // //                 </div>
// // // //               </div>
// // // //             </div>

// // // //             {/* Description */}
// // // //             <p className="mt-4 text-white/80 text-[16px] leading-relaxed [font-family:Inter,ui-sans-serif,system-ui]">
// // // //               {prompt.description}
// // // //             </p>

// // // //             {/* Divider above rating */}
// // // //             <div className="border-t border-white/10 mt-6 mb-4" />

// // // //             {/* Rate your experience */}
// // // //             <div>
// // // //               <div className="text-white/90 text-[14px] mb-2">Rate your experience</div>
// // // //               <div className="flex items-center gap-2">
// // // //                 {[1, 2, 3, 4, 5].map((i) => (
// // // //                   <button
// // // //                     key={i}
// // // //                     type="button"
// // // //                     aria-label={`Rate ${i} star${i > 1 ? "s" : ""}`}
// // // //                     onMouseEnter={() => setHoverRating(i)}
// // // //                     onMouseLeave={() => setHoverRating(0)}
// // // //                     onClick={() => setUserRating(i)}
// // // //                     className="p-1"
// // // //                   >
// // // //                     <svg width="28" height="28" viewBox="0 0 24 24">
// // // //                       <path
// // // //                         d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
// // // //                         fill={i <= currentStars ? STAR_ACTIVE : "none"}
// // // //                         stroke={i <= currentStars ? STAR_ACTIVE : "#FFFFFF"}
// // // //                         strokeWidth="1.6"
// // // //                       />
// // // //                     </svg>
// // // //                   </button>
// // // //                 ))}
// // // //               </div>
// // // //             </div>

// // // //             {/* Separator */}
// // // //             <div className="border-t border-white/10 mt-6 mb-5" />

// // // //             {/* STATS + REPORT button */}
// // // //             <div className="flex items-center justify-end gap-4">
// // // //               <div className="flex items-center gap-3">
// // // //                 <div className="flex items-center gap-2 bg-[#333335] rounded-full px-4 py-2">
// // // //                   <Download className="h-5 w-5" />
// // // //                   <span className="text-base leading-none">{prompt.downloads}</span>
// // // //                 </div>
// // // //                 <div className="flex items-center gap-2 bg-[#333335] rounded-full px-4 py-2">
// // // //                   <span className="text-base leading-none">${prompt.price.toFixed(2)}</span>
// // // //                 </div>
// // // //               </div>

// // // //               <button
// // // //                 className="
// // // //                   px-8 h-12 rounded-full text-white text-base font-medium leading-none
// // // //                   bg-gradient-to-r from-[#5A3FFF] to-[#FF14EF]
// // // //                   transition-all
// // // //                 "
// // // //                 onClick={() => setReportOpen(true)}
// // // //               >
// // // //                 Report Resource
// // // //               </button>
// // // //             </div>
// // // //           </div>
// // // //         </DialogContent>
// // // //       </Dialog>

// // // //       {/* REPORT RESOURCE POPUP */}
// // // //       <ReportResourceDialog
// // // //         open={reportOpen}
// // // //         onOpenChange={setReportOpen}
// // // //         promptId={String(prompt.id)}
// // // //          promptTitle={prompt.title}
// // // //       />
// // // //     </>
// // // //   );
// // // // }

// // // // /* ---------------- Report dialog (Create-only, API integrated) ---------------- */
// // // // // import React, { useEffect, useState } from "react";
// // // // // import { Dialog, DialogContent } from "@/components/ui/dialog";
// // // // // import { AlertCircle, Loader2 } from "lucide-react";
// // // // // import { useAuth } from "@/contexts/AuthContext";
// // // // // import { toast } from "@/components/ui/use-toast";

// // // // // const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// // // // type ReportDialogProps = {
// // // //   open: boolean;
// // // //   onOpenChange: (v: boolean) => void;
// // // //   promptId: string;
// // // //   promptTitle?: string; // kept for context only (not rendered)
// // // // };

// // // // export function ReportResourceDialog({
// // // //   open,
// // // //   onOpenChange,
// // // //   promptId,
// // // //   promptTitle, // not shown in UI
// // // // }: ReportDialogProps) {
// // // //   const { token } = useAuth();

// // // //   // form state
// // // //   const [title, setTitle] = useState("");
// // // //   const [url, setUrl] = useState("");
// // // //   const [category, setCategory] = useState(""); // category name (server looks it up)
// // // //   const [tags, setTags] = useState("");
// // // //   const [reason, setReason] = useState("");
// // // //   const [desc, setDesc] = useState("");
// // // //   const [steps, setSteps] = useState("");
// // // //   const [agree, setAgree] = useState(false);
// // // //   const [files, setFiles] = useState<File[]>([]);
// // // //   const [touchedUrl, setTouchedUrl] = useState(false);

// // // //   // categories
// // // //   const [categories, setCategories] = useState<{ name: string; _id: string }[]>([]);
// // // //   const [loadingCats, setLoadingCats] = useState(false);

// // // //   // submitting
// // // //   const [submitting, setSubmitting] = useState(false);

// // // //   const isValidUrl = (() => {
// // // //     try {
// // // //       if (!url) return false;
// // // //       const u = new URL(url);
// // // //       return !!u.protocol && !!u.host;
// // // //     } catch {
// // // //       return false;
// // // //     }
// // // //   })();

// // // //   function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
// // // //     const list = e.target.files ? Array.from(e.target.files).slice(0, 5) : [];
// // // //     setFiles(list);
// // // //   }

// // // //   // Load categories when dialog opens
// // // //   useEffect(() => {
// // // //     if (!open) return;
// // // //     (async () => {
// // // //       try {
// // // //         setLoadingCats(true);
// // // //         const r = await fetch(`${API_BASE}/api/category`, {
// // // //           method: "GET",
// // // //           credentials: "include",
// // // //         });
// // // //         const data = await r.json();
// // // //         if (data?.success) setCategories(data.categories || []);
// // // //       } catch (e) {
// // // //         console.error(e);
// // // //         toast({ title: "Failed to load categories", description: "Please try again." });
// // // //       } finally {
// // // //         setLoadingCats(false);
// // // //       }
// // // //     })();
// // // //   }, [open]);

// // // //   async function submit(e: React.FormEvent) {
// // // //     e.preventDefault();
// // // //     if (!token) {
// // // //       toast({ title: "Please log in", description: "You must be logged in to report a resource." });
// // // //       return;
// // // //     }
// // // //     if (!promptId) {
// // // //       toast({ title: "Missing prompt", description: "Prompt ID is required." });
// // // //       return;
// // // //     }
// // // //     if (!reason || !category) {
// // // //       toast({ title: "Missing fields", description: "Select a category and reason." });
// // // //       return;
// // // //     }
// // // //     if (!isValidUrl || !agree) return;

// // // //     try {
// // // //       setSubmitting(true);

// // // //       const form = new FormData();
// // // //       form.append("prompt", promptId);
// // // //       if (title) form.append("resourceTitle", title);
// // // //       form.append("resourceURL", url);
// // // //       form.append("category", category); // server will Category.findOne({ name: category })

// // // //       // tags -> JSON string array
// // // //       const tagsArr = tags
// // // //         .split(",")
// // // //         .map((t) => t.trim())
// // // //         .filter(Boolean);
// // // //       form.append("tags", JSON.stringify(tagsArr));

// // // //       form.append("reason", reason);
// // // //       if (desc) form.append("description", desc);
// // // //       if (steps) form.append("stepsToReproduce", steps);

// // // //       files.forEach((f) => form.append("screenshots", f));

// // // //       const r = await fetch(`${API_BASE}/api/promptreport`, {
// // // //         method: "POST",
// // // //         headers: { Authorization: `Bearer ${token}` },
// // // //         body: form,
// // // //         credentials: "include",
// // // //       });

// // // //       const data = await r.json();
// // // //       if (!r.ok || !data?.success) {
// // // //         throw new Error(data?.error || "submit_failed");
// // // //       }

// // // //       toast({ title: "Report submitted", description: "Thanks for your feedback!" });

// // // //       // reset form + close dialog
// // // //       setTitle("");
// // // //       setUrl("");
// // // //       setCategory("");
// // // //       setTags("");
// // // //       setReason("");
// // // //       setDesc("");
// // // //       setSteps("");
// // // //       setFiles([]);
// // // //       setAgree(false);
// // // //       onOpenChange(false);
// // // //     } catch (err: any) {
// // // //       console.error(err);
// // // //       toast({
// // // //         title: "Could not submit report",
// // // //         description: err?.message || "Something went wrong.",
// // // //       });
// // // //     } finally {
// // // //       setSubmitting(false);
// // // //     }
// // // //   }

// // // //   return (
// // // //     <Dialog open={open} onOpenChange={onOpenChange}>
// // // //       <DialogContent
// // // //         className="
// // // //           bg-[#17171A] text-white border border-white/10
// // // //           w-[min(96vw,640px)]
// // // //           max-h-[95vh]
// // // //           rounded-2xl p-0 overflow-hidden
// // // //         "
// // // //       >
// // // //         {/* Create report (single column) */}
// // // //         <form className="p-5 sm:p-6 overflow-y-auto no-scrollbar max-h-[95vh]" onSubmit={submit}>
// // // //           <h3 className="text-lg font-semibold mb-1">Report a Resource</h3>
// // // //           <p className="text-white/70 text-sm mb-5">
// // // //             Flag broken, outdated, inappropriate, or otherwise problematic resources.
// // // //           </p>

// // // //           {/* (Prompt title intentionally NOT rendered) */}

// // // //           {/* Title */}
// // // //           <label className="block text-sm mb-1">Resource Title</label>
// // // //           <input
// // // //             type="text"
// // // //             className="w-full h-11 rounded-xl bg-transparent border border-white/15 px-3 mb-4 outline-none"
// // // //             placeholder="e.g., Intro to UX Research"
// // // //             value={title}
// // // //             onChange={(e) => setTitle(e.target.value)}
// // // //           />

// // // //           {/* URL */}
// // // //           <label className="block text-sm mb-1">Resource URL</label>
// // // //           <div className="relative">
// // // //             <input
// // // //               type="url"
// // // //               className={`w-full h-11 rounded-xl bg-transparent border px-3 outline-none ${
// // // //                 touchedUrl && !isValidUrl ? "border-red-500/70 pr-10" : "border-white/15"
// // // //               }`}
// // // //               placeholder="https://example.com/article"
// // // //               value={url}
// // // //               onChange={(e) => setUrl(e.target.value)}
// // // //               onBlur={() => setTouchedUrl(true)}
// // // //             />
// // // //             {touchedUrl && !isValidUrl && (
// // // //               <>
// // // //                 <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-red-400 h-5 w-5" />
// // // //                 <div className="text-red-400 text-xs mt-1">Please enter valid url</div>
// // // //               </>
// // // //             )}
// // // //           </div>

// // // //           {/* Category */}
// // // //           <div className="mt-4">
// // // //             <label className="block text-sm mb-1">Category</label>
// // // //             <div className="h-11 rounded-xl px-3 flex items-center border border-white/15 bg-[#17171A]">
// // // //               <select
// // // //                 className="bg-[#17171A] text-white/90 w-full outline-none"
// // // //                 value={category}
// // // //                 onChange={(e) => setCategory(e.target.value)}
// // // //                 disabled={loadingCats}
// // // //               >
// // // //                 <option value="">{loadingCats ? "Loading categories..." : "Select a category"}</option>
// // // //                 {categories.map((c) => (
// // // //                   <option key={c._id} value={c.name}>
// // // //                     {c.name}
// // // //                   </option>
// // // //                 ))}
// // // //               </select>
// // // //             </div>
// // // //           </div>

// // // //           {/* Tags */}
// // // //           <div className="mt-4">
// // // //             <label className="block text-sm mb-1">
// // // //               Tags <span className="text-white/50 text-xs">(comma separated)</span>
// // // //             </label>
// // // //             <input
// // // //               type="text"
// // // //               className="w-full h-11 rounded-xl bg-transparent border border-white/15 px-3 outline-none"
// // // //               placeholder="ui/ux, research, prototyping"
// // // //               value={tags}
// // // //               onChange={(e) => setTags(e.target.value)}
// // // //             />
// // // //           </div>

// // // //           {/* Reason */}
// // // //           <div className="mt-4">
// // // //             <label className="block text-sm mb-1">Reason for Report</label>
// // // //             <div className="h-11 rounded-xl px-3 flex items-center border border-white/15 bg-[#17171A]">
// // // //               <select
// // // //                 className="bg-[#17171A] text-white/90 w-full outline-none"
// // // //                 value={reason}
// // // //                 onChange={(e) => setReason(e.target.value)}
// // // //               >
// // // //                 <option value="">Choose reason</option>
// // // //                 <option value="broken">Broken link / media</option>
// // // //                 <option value="outdated">Outdated</option>
// // // //                 <option value="inappropriate">Inappropriate</option>
// // // //                 <option value="other">Other</option>
// // // //               </select>
// // // //             </div>
// // // //           </div>

// // // //           {/* Describe */}
// // // //           <div className="mt-4">
// // // //             <label className="block text-sm mb-1">Describe the issue</label>
// // // //             <textarea
// // // //               rows={4}
// // // //               className="w-full rounded-xl bg-transparent border border-white/15 px-3 py-2 outline-none"
// // // //               placeholder="What is wrong with this resource? Include key details."
// // // //               value={desc}
// // // //               onChange={(e) => setDesc(e.target.value)}
// // // //             />
// // // //           </div>

// // // //           {/* Steps (optional) */}
// // // //           <div className="mt-4">
// // // //             <label className="block text-sm mb-1">
// // // //               Steps to reproduce <span className="text-white/50 text-xs">(optional)</span>
// // // //             </label>
// // // //             <textarea
// // // //               rows={3}
// // // //               className="w-full rounded-xl bg-transparent border border-white/15 px-3 py-2 outline-none"
// // // //               placeholder={"1) Open the page  2) Click play  3) Video fails to load"}
// // // //               value={steps}
// // // //               onChange={(e) => setSteps(e.target.value)}
// // // //             />
// // // //           </div>

// // // //           {/* Attach screenshots */}
// // // //           <div className="mt-4">
// // // //             <label className="block text-sm mb-1">
// // // //               Attach screenshots <span className="text-white/50 text-xs">(optional)</span>
// // // //             </label>
// // // //             <label
// // // //               className="
// // // //                 w-full h-28 rounded-xl border border-dashed border-white/20
// // // //                 grid place-items-center text-white/60 cursor-pointer
// // // //               "
// // // //             >
// // // //               <input
// // // //                 type="file"
// // // //                 multiple
// // // //                 accept="image/png,image/jpeg,application/pdf"
// // // //                 className="hidden"
// // // //                 onChange={onFileChange}
// // // //               />
// // // //               {files.length === 0 ? "Add up to 5 files" : `${files.length} file(s) selected`}
// // // //             </label>
// // // //             <div className="text-xs text-white/50 mt-2">Up to 5 files. PNG/JPG/PDF.</div>
// // // //           </div>

// // // //           {/* Agree */}
// // // //           <label className="flex items-start gap-3 mt-4 text-sm">
// // // //             <input
// // // //               type="checkbox"
// // // //               className="mt-0.5"
// // // //               checked={agree}
// // // //               onChange={(e) => setAgree(e.target.checked)}
// // // //             />
// // // //             <span className="text-white/80">
// // // //               I agree that this report complies with the Community Guidelines and Privacy Policy.
// // // //             </span>
// // // //           </label>

// // // //           {/* Actions */}
// // // //           <div className="flex justify-end gap-3 mt-6">
// // // //             <button
// // // //               type="button"
// // // //               className="h-10 px-4 rounded-xl bg-white/10 border border-white/15"
// // // //               onClick={() => onOpenChange(false)}
// // // //               disabled={submitting}
// // // //             >
// // // //               Cancel
// // // //             </button>
// // // //             <button
// // // //               type="submit"
// // // //               className="
// // // //                 h-10 px-5 rounded-xl text-white
// // // //                 bg-gradient-to-r from-[#5A3FFF] to-[#FF14EF]
// // // //                 disabled:opacity-60 flex items-center gap-2
// // // //               "
// // // //               disabled={!isValidUrl || !agree || !reason || !category || submitting}
// // // //             >
// // // //               {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
// // // //               Submit
// // // //             </button>
// // // //           </div>
// // // //         </form>
// // // //       </DialogContent>
// // // //     </Dialog>
// // // //   );
// // // // }



// // // // // src/pages/historyDetail.tsx
// // // // import React, { useEffect, useMemo, useRef, useState } from "react";
// // // // import { Dialog, DialogContent } from "@/components/ui/dialog";
// // // // import {
// // // //   Image as ImageIcon,
// // // //   Video,
// // // //   AlertCircle,
// // // //   Loader2,
// // // //   Camera,
// // // //   X,
// // // // } from "lucide-react";
// // // // import { useAuth } from "@/contexts/AuthContext";
// // // // import { toast } from "@/components/ui/use-toast";

// // // // export interface MarketplacePrompt {
// // // //   id: number | string;
// // // //   title: string;
// // // //   description: string;
// // // //   price: number;
// // // //   rating?: number;
// // // //   downloads: number;
// // // //   category: string;
// // // //   videoUrl?: string;
// // // //   imageUrl?: string;
// // // //   fullPrompt?: string;
// // // // }

// // // // interface DetailsPromptProps {
// // // //   open: boolean;
// // // //   onOpenChange: (open: boolean) => void;
// // // //   prompt: MarketplacePrompt | null;
// // // //   owned?: boolean;
// // // //   onPurchase?: (prompt: MarketplacePrompt) => void; // kept for API compat
// // // //   showImages?: boolean;
// // // // }

// // // // const STAR_ACTIVE = "#FF14EF";
// // // // const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// // // // export default function DetailsPrompt({
// // // //   open,
// // // //   onOpenChange,
// // // //   prompt,
// // // //   owned = false,
// // // //   showImages = false,
// // // // }: DetailsPromptProps) {
// // // //   const [reportOpen, setReportOpen] = useState(false);

// // // //   // ⭐ rating state
// // // //   const [userRating, setUserRating] = useState<number>(0);
// // // //   const [hoverRating, setHoverRating] = useState<number>(0);

// // // //   // 📝 testimonial state
// // // //   const [reviewText, setReviewText] = useState("");
// // // //   const [submittingReview, setSubmittingReview] = useState(false);
// // // //   const fileInputRef = useRef<HTMLInputElement | null>(null);
// // // //   const [photos, setPhotos] = useState<File[]>([]);
// // // //   const maxChars = 1000;

// // // //   const media = useMemo(() => {
// // // //     if (!prompt) return null;
// // // //     return showImages
// // // //       ? ({ type: "image", url: prompt.imageUrl || "" } as const)
// // // //       : ({ type: "video", url: prompt.videoUrl || "" } as const);
// // // //   }, [prompt, showImages]);

// // // //   if (!prompt) return null;

// // // //   const currentStars = hoverRating || userRating;

// // // //   const onPickPhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // //     const f = e.target.files ? Array.from(e.target.files) : [];
// // // //     // keep to 6 photos to stay lightweight
// // // //     setPhotos((prev) => [...prev, ...f].slice(0, 6));
// // // //   };

// // // //   const removePhotoAt = (i: number) => {
// // // //     setPhotos((prev) => prev.filter((_, idx) => idx !== i));
// // // //   };

// // // //   const clearReview = () => {
// // // //     setReviewText("");
// // // //     setPhotos([]);
// // // //   };

// // // //   const handleSubmitReview = async () => {
// // // //     // stub only — you’ll wire this to your API later
// // // //     const len = reviewText.trim().length;
// // // //     if (userRating === 0) {
// // // //       toast({ title: "Add a rating", description: "Please select 1–5 stars." });
// // // //       return;
// // // //     }
// // // //     if (len < 10 || len > maxChars) {
// // // //       toast({
// // // //         title: "Review length",
// // // //         description: "Please write between 10 and 1000 characters.",
// // // //         variant: "destructive",
// // // //       });
// // // //       return;
// // // //     }

// // // //     try {
// // // //       setSubmittingReview(true);
// // // //       // TODO: POST to your testimonials endpoint with:
// // // //       // { promptId: prompt.id, rating: userRating, text: reviewText, photos }
// // // //       await new Promise((r) => setTimeout(r, 600));
// // // //       toast({ title: "Submitted", description: "Thanks for your feedback!" });
// // // //       clearReview();
// // // //       setUserRating(0);
// // // //     } finally {
// // // //       setSubmittingReview(false);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <>
// // // //       <Dialog open={open} onOpenChange={onOpenChange}>
// // // //         <DialogContent
// // // //           className="
// // // //             bg-[#17171A] text-white p-0 border-none
// // // //             w-[min(96vw,1400px)]
// // // //             max-h-[95vh]
// // // //             rounded-3xl md:rounded-[40px]
// // // //             overflow-hidden flex flex-col
// // // //             [&>button.absolute.right-4.top-4]:hidden
// // // //             [&>button:has(svg[class*='lucide-x'])]:hidden
// // // //           "
// // // //         >
// // // //           {/* MEDIA */}
// // // //           <div
// // // //             className="
// // // //               relative mx-auto
// // // //               w-[calc(100%-3rem)] max-w-[1100px]
// // // //               aspect-[3/2]
// // // //               bg-[#333335]
// // // //               overflow-hidden
// // // //               rounded-[18px] md:rounded-[22px]
// // // //               mt-5
// // // //               shrink-0
// // // //             "
// // // //           >
// // // //             <div className="absolute top-4 left-4 z-10">
// // // //               <span className="px-3 py-1 text-[12px] font-semibold rounded-full text-black bg-white">
// // // //                 {prompt.category.toUpperCase()}
// // // //               </span>
// // // //             </div>

// // // //             <div className="absolute top-4 right-4 z-10">
// // // //               <span className="px-3 py-1 text-[12px] font-semibold rounded-full text-black bg-white">
// // // //                 PURCHASE TO UNLOCK
// // // //               </span>
// // // //             </div>

// // // //             <div className="absolute inset-0">
// // // //               {media?.type === "image" ? (
// // // //                 <img src={media.url} alt="" className="w-full h-full object-cover" />
// // // //               ) : (
// // // //                 <video
// // // //                   src={media?.url}
// // // //                   className="w-full h-full object-cover"
// // // //                   loop
// // // //                   muted
// // // //                   autoPlay
// // // //                   playsInline
// // // //                 />
// // // //               )}
// // // //             </div>

// // // //             {/* Type hint */}
// // // //             <div className="absolute bottom-3 left-4 flex items-center gap-2 text-sm text-white/80">
// // // //               {media?.type === "image" ? (
// // // //                 <ImageIcon className="h-5 w-5" />
// // // //               ) : (
// // // //                 <Video className="h-5 w-5" />
// // // //               )}
// // // //               <span className="uppercase tracking-wide">{media?.type}</span>
// // // //             </div>
// // // //           </div>

// // // //           {/* DETAILS */}
// // // //           <div
// // // //             className="
// // // //               px-8 md:px-10
// // // //               pt-5 md:pt-6
// // // //               pb-7 md:pb-9
// // // //               min-h-0 flex-1 overflow-y-auto no-scrollbar
// // // //             "
// // // //           >
// // // //             {/* Title row */}
// // // //             <div className="grid grid-cols-[1fr_auto] items-start gap-4 mt-2">
// // // //               <h2 className="font-semibold text-[24px] leading-snug tracking-tight [font-family:Inter,ui-sans-serif,system-ui]">
// // // //                 {prompt.title}
// // // //               </h2>
// // // //               <span
// // // //                 className="flex items-center justify-center rounded-full justify-self-end"
// // // //                 style={{ backgroundColor: "#333335", width: 40, height: 40 }}
// // // //                 aria-hidden
// // // //               >
// // // //                 <img src="/icons/cop1.png" alt="" className="w-5 h-5 object-contain" />
// // // //               </span>
// // // //             </div>

// // // //             {/* BANNER PILL */}
// // // //             <div
// // // //               className="
// // // //                 mt-4
// // // //                 bg-[#333335]
// // // //                 border border-white/10
// // // //                 rounded-[12px]
// // // //                 px-4 md:px-5 py-3
// // // //                 flex items-center justify-between gap-4
// // // //               "
// // // //             >
// // // //               <div className="flex items-center gap-4 min-w-0">
// // // //                 <img
// // // //                   src="/icons/dtlogo.svg"
// // // //                   onError={(e) => {
// // // //                     const img = e.currentTarget as HTMLImageElement & { dataset: any };
// // // //                     if (!img.dataset.fallback) {
// // // //                       img.dataset.fallback = "1";
// // // //                       img.src = "/icons/dtlogo.png";
// // // //                     }
// // // //                   }}
// // // //                   alt="DT Logo"
// // // //                   className="shrink-0 object-contain"
// // // //                   style={{ height: 32, width: "auto" }}
// // // //                 />
// // // //                 <div className="min-w-0">
// // // //                   <div className="truncate text-[18px] leading-snug [font-family:Inter,ui-sans-serif,system-ui]">
// // // //                     Power Your Storefronts with Auto-Generated Descriptions
// // // //                   </div>
// // // //                   <div className="text-white/70 truncate text-[13px] mt-2 leading-snug [font-family:Inter,ui-sans-serif,system-ui]">
// // // //                     Generate compelling product descriptions that convert visitors into customers
// // // //                   </div>
// // // //                 </div>
// // // //               </div>

// // // //               {/* Right: rating number ABOVE stars */}
// // // //               <div className="flex flex-col items-center gap-1 shrink-0">
// // // //                 <span className="text-[13px] font-semibold leading-none">
// // // //                   {(prompt.rating ?? 0).toFixed(2)}
// // // //                 </span>
// // // //                 <div className="flex items-center gap-[4px] leading-none">
// // // //                   {[...Array(5)].map((_, i) => (
// // // //                     <svg key={i} width="16" height="16" viewBox="0 0 24 24" aria-hidden>
// // // //                       <path
// // // //                         d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
// // // //                         fill="#FFFFFF"
// // // //                       />
// // // //                     </svg>
// // // //                   ))}
// // // //                 </div>
// // // //               </div>
// // // //             </div>

// // // //             {/* Description */}
// // // //             <p className="mt-4 text-white/80 text-[16px] leading-relaxed [font-family:Inter,ui-sans-serif,system-ui]">
// // // //               {prompt.description}
// // // //             </p>

// // // //             {/* Divider above rating */}
// // // //             <div className="border-t border-white/10 mt-6 mb-4" />

// // // //             {/* Rate your experience */}
// // // //             <div>
// // // //               <div className="text-white/90 text-[14px] mb-2">Share your feedback</div>
// // // //               <div className="flex items-center gap-2">
// // // //                 {[1, 2, 3, 4, 5].map((i) => (
// // // //                   <button
// // // //                     key={i}
// // // //                     type="button"
// // // //                     aria-label={`Rate ${i} star${i > 1 ? "s" : ""}`}
// // // //                     onMouseEnter={() => setHoverRating(i)}
// // // //                     onMouseLeave={() => setHoverRating(0)}
// // // //                     onClick={() => setUserRating(i)}
// // // //                     className="p-1"
// // // //                   >
// // // //                     <svg width="28" height="28" viewBox="0 0 24 24">
// // // //                       <path
// // // //                         d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
// // // //                         fill={i <= currentStars ? STAR_ACTIVE : "none"}
// // // //                         stroke={i <= currentStars ? STAR_ACTIVE : "#FFFFFF"}
// // // //                         strokeWidth="1.6"
// // // //                       />
// // // //                     </svg>
// // // //                   </button>
// // // //                 ))}
// // // //               </div>
// // // //             </div>

// // // //             {/* Review input (testimonial) */}
// // // //     {/* Review input (testimonial) */}
// // // // <div className="mt-6">
// // // //   <div
// // // //     className="text-[14px] mb-2"
// // // //     style={{ color: "#ffffff" }}  // exact white
// // // //   >
// // // //     Review <span className="text-white/50 text-xs">(required — 10 to {maxChars} characters)</span>
// // // //   </div>

// // // //   <div className="relative">
// // // //     <textarea
// // // //       rows={5}
// // // //       maxLength={maxChars}
// // // //       className="w-full rounded-xl bg-transparent border border-white/15 px-3 py-3 outline-none text-[14px] text-white/90 placeholder:text-white/40"
// // // //       placeholder="Tell us what you liked, what could be improved, or how you used the prompt."
// // // //       value={reviewText}
// // // //       onChange={(e) => setReviewText(e.target.value)}
// // // //     />

// // // //     {/* bottom-left tray: previews FIRST, then camera (so previews appear to the LEFT of camera) */}
// // // //     <div
// // // //       className="absolute left-3 bottom-3 flex items-center gap-2 overflow-x-auto"
// // // //       style={{ maxWidth: "70%" }}
// // // //     >
// // // //       {photos.map((file, i) => {
// // // //         const url = URL.createObjectURL(file);
// // // //         return (
// // // //           <div
// // // //             key={`${file.name}-${i}`}
// // // //             className="relative w-10 h-10 rounded-md overflow-hidden border border-white/15 shrink-0"
// // // //             title={file.name}
// // // //           >
// // // //             <img src={url} alt="" className="w-full h-full object-cover" />
// // // //             <button
// // // //               type="button"
// // // //               onClick={() => removePhotoAt(i)}
// // // //               className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-black/80 grid place-items-center"
// // // //               aria-label="Remove photo"
// // // //             >
// // // //               <X className="w-3 h-3" />
// // // //             </button>
// // // //           </div>
// // // //         );
// // // //       })}

// // // //       {/* Camera button (stays on the right of the preview row) */}
// // // //       <input
// // // //         ref={fileInputRef}
// // // //         type="file"
// // // //         accept="image/*"
// // // //         multiple
// // // //         className="hidden"
// // // //         onChange={onPickPhotos}
// // // //       />
// // // //       <button
// // // //         type="button"
// // // //         onClick={() => fileInputRef.current?.click()}
// // // //         className="w-10 h-10 rounded-lg bg-[#2F2F2F] grid place-items-center hover:bg-[#3A3A3A] shrink-0"
// // // //         title="Add photos"
// // // //       >
// // // //         <Camera className="h-5 w-5" />
// // // //       </button>
// // // //     </div>

// // // //     {/* Clear button — only when there is text */}
// // // //     {reviewText.trim().length > 0 && (
// // // //       <button
// // // //         type="button"
// // // //         onClick={clearReview}
// // // //         className="absolute right-3 bottom-3 h-9 px-4 rounded-[10px] bg-[#2F2F2F] text-white text-sm hover:bg-[#3A3A3A]"
// // // //       >
// // // //         Clear
// // // //       </button>
// // // //     )}
// // // //   </div>

// // // //   {/* Char counter */}
// // // //   <div className="mt-2 text-right text-xs text-white/50">
// // // //     {reviewText.length}/{maxChars}
// // // //   </div>
// // // // </div>


// // // //             {/* Separator */}
// // // //             <div className="border-t border-white/10 mt-6 mb-5" />

// // // //             {/* Bottom actions: Report Resource + Submit (no download/price pills) */}
// // // //           {/* Bottom actions: Report Resource + Submit */}
// // // // <div className="flex items-center justify-end gap-3">
// // // //   <button
// // // //     className="
// // // //       px-6 h-12 rounded-full text-white text-base font-medium leading-none
// // // //       bg-gradient-to-r from-[#5A3FFF] to-[#FF14EF]
// // // //       transition-all
// // // //     "
// // // //     onClick={() => setReportOpen(true)}
// // // //   >
// // // //     Report Resource
// // // //   </button>

// // // //   <button
// // // //     className="
// // // //       px-6 h-12 rounded-[10px] text-white text-base font-medium leading-none
// // // //       bg-white/10 border border-white/15 hover:bg-white/15
// // // //       transition-colors disabled:opacity-60
// // // //     "
// // // //     onClick={handleSubmitReview}
// // // //     disabled={submittingReview}
// // // //   >
// // // //     {submittingReview ? <Loader2 className="h-4 w-4 animate-spin" /> : "Submit"}
// // // //   </button>
// // // // </div>

// // // //           </div>
// // // //         </DialogContent>
// // // //       </Dialog>

// // // //       {/* REPORT RESOURCE POPUP (unchanged) */}
// // // //       <ReportResourceDialog
// // // //         open={reportOpen}
// // // //         onOpenChange={setReportOpen}
// // // //         promptId={String(prompt.id)}
// // // //         promptTitle={prompt.title}
// // // //       />
// // // //     </>
// // // //   );
// // // // }

// // // // /* ---------------- Report dialog (Create-only, API integrated) ---------------- */

// // // // type ReportDialogProps = {
// // // //   open: boolean;
// // // //   onOpenChange: (v: boolean) => void;
// // // //   promptId: string;
// // // //   promptTitle?: string; // kept for context only (not rendered)
// // // // };

// // // // export function ReportResourceDialog({
// // // //   open,
// // // //   onOpenChange,
// // // //   promptId,
// // // //   promptTitle, // not shown in UI
// // // // }: ReportDialogProps) {
// // // //   const { token } = useAuth();

// // // //   // form state
// // // //   const [title, setTitle] = useState("");
// // // //   const [url, setUrl] = useState("");
// // // //   const [category, setCategory] = useState(""); // category name (server looks it up)
// // // //   const [tags, setTags] = useState("");
// // // //   const [reason, setReason] = useState("");
// // // //   const [desc, setDesc] = useState("");
// // // //   const [steps, setSteps] = useState("");
// // // //   const [agree, setAgree] = useState(false);
// // // //   const [files, setFiles] = useState<File[]>([]);
// // // //   const [touchedUrl, setTouchedUrl] = useState(false);

// // // //   // categories
// // // //   const [categories, setCategories] = useState<{ name: string; _id: string }[]>([]);
// // // //   const [loadingCats, setLoadingCats] = useState(false);

// // // //   // submitting
// // // //   const [submitting, setSubmitting] = useState(false);

// // // //   const isValidUrl = (() => {
// // // //     try {
// // // //       if (!url) return false;
// // // //       const u = new URL(url);
// // // //       return !!u.protocol && !!u.host;
// // // //     } catch {
// // // //       return false;
// // // //     }
// // // //   })();

// // // //   function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
// // // //     const list = e.target.files ? Array.from(e.target.files).slice(0, 5) : [];
// // // //     setFiles(list);
// // // //   }

// // // //   // Load categories when dialog opens
// // // //   useEffect(() => {
// // // //     if (!open) return;
// // // //     (async () => {
// // // //       try {
// // // //         setLoadingCats(true);
// // // //         const r = await fetch(`${API_BASE}/api/category`, {
// // // //           method: "GET",
// // // //           credentials: "include",
// // // //         });
// // // //         const data = await r.json();
// // // //         if (data?.success) setCategories(data.categories || []);
// // // //       } catch (e) {
// // // //         console.error(e);
// // // //         toast({ title: "Failed to load categories", description: "Please try again." });
// // // //       } finally {
// // // //         setLoadingCats(false);
// // // //       }
// // // //     })();
// // // //   }, [open]);

// // // //   async function submit(e: React.FormEvent) {
// // // //     e.preventDefault();
// // // //     if (!token) {
// // // //       toast({ title: "Please log in", description: "You must be logged in to report a resource." });
// // // //       return;
// // // //     }
// // // //     if (!promptId) {
// // // //       toast({ title: "Missing prompt", description: "Prompt ID is required." });
// // // //       return;
// // // //     }
// // // //     if (!reason || !category) {
// // // //       toast({ title: "Missing fields", description: "Select a category and reason." });
// // // //       return;
// // // //     }
// // // //     if (!isValidUrl || !agree) return;

// // // //     try {
// // // //       setSubmitting(true);

// // // //       const form = new FormData();
// // // //       form.append("prompt", promptId);
// // // //       if (title) form.append("resourceTitle", title);
// // // //       form.append("resourceURL", url);
// // // //       form.append("category", category); // server will Category.findOne({ name: category })

// // // //       // tags -> JSON string array
// // // //       const tagsArr = tags
// // // //         .split(",")
// // // //         .map((t) => t.trim())
// // // //         .filter(Boolean);
// // // //       form.append("tags", JSON.stringify(tagsArr));

// // // //       form.append("reason", reason);
// // // //       if (desc) form.append("description", desc);
// // // //       if (steps) form.append("stepsToReproduce", steps);

// // // //       files.forEach((f) => form.append("screenshots", f));

// // // //       const r = await fetch(`${API_BASE}/api/promptreport`, {
// // // //         method: "POST",
// // // //         headers: { Authorization: `Bearer ${token}` },
// // // //         body: form,
// // // //         credentials: "include",
// // // //       });

// // // //       const data = await r.json();
// // // //       if (!r.ok || !data?.success) {
// // // //         throw new Error(data?.error || "submit_failed");
// // // //       }

// // // //       toast({ title: "Report submitted", description: "Thanks for your feedback!" });

// // // //       // reset form + close dialog
// // // //       setTitle("");
// // // //       setUrl("");
// // // //       setCategory("");
// // // //       setTags("");
// // // //       setReason("");
// // // //       setDesc("");
// // // //       setSteps("");
// // // //       setFiles([]);
// // // //       setAgree(false);
// // // //       onOpenChange(false);
// // // //     } catch (err: any) {
// // // //       console.error(err);
// // // //       toast({
// // // //         title: "Could not submit report",
// // // //         description: err?.message || "Something went wrong.",
// // // //       });
// // // //     } finally {
// // // //       setSubmitting(false);
// // // //     }
// // // //   }

// // // //   return (
// // // //     <Dialog open={open} onOpenChange={onOpenChange}>
// // // //       <DialogContent
// // // //         className="
// // // //           bg-[#17171A] text-white border border-white/10
// // // //           w-[min(96vw,640px)]
// // // //           max-h-[95vh]
// // // //           rounded-2xl p-0 overflow-hidden
// // // //         "
// // // //       >
// // // //         {/* Create report (single column) */}
// // // //         <form className="p-5 sm:p-6 overflow-y-auto no-scrollbar max-h-[95vh]" onSubmit={submit}>
// // // //           <h3 className="text-lg font-semibold mb-1">Report a Resource</h3>
// // // //           <p className="text-white/70 text-sm mb-5">
// // // //             Flag broken, outdated, inappropriate, or otherwise problematic resources.
// // // //           </p>

// // // //           {/* Title */}
// // // //           <label className="block text-sm mb-1">Resource Title</label>
// // // //           <input
// // // //             type="text"
// // // //             className="w-full h-11 rounded-xl bg-transparent border border-white/15 px-3 mb-4 outline-none"
// // // //             placeholder="e.g., Intro to UX Research"
// // // //             value={title}
// // // //             onChange={(e) => setTitle(e.target.value)}
// // // //           />

// // // //           {/* URL */}
// // // //           <label className="block text-sm mb-1">Resource URL</label>
// // // //           <div className="relative">
// // // //             <input
// // // //               type="url"
// // // //               className={`w-full h-11 rounded-xl bg-transparent border px-3 outline-none ${
// // // //                 touchedUrl && !isValidUrl ? "border-red-500/70 pr-10" : "border-white/15"
// // // //               }`}
// // // //               placeholder="https://example.com/article"
// // // //               value={url}
// // // //               onChange={(e) => setUrl(e.target.value)}
// // // //               onBlur={() => setTouchedUrl(true)}
// // // //             />
// // // //             {touchedUrl && !isValidUrl && (
// // // //               <>
// // // //                 <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-red-400 h-5 w-5" />
// // // //                 <div className="text-red-400 text-xs mt-1">Please enter valid url</div>
// // // //               </>
// // // //             )}
// // // //           </div>

// // // //           {/* Category */}
// // // //           <div className="mt-4">
// // // //             <label className="block text-sm mb-1">Category</label>
// // // //             <div className="h-11 rounded-xl px-3 flex items-center border border-white/15 bg-[#17171A]">
// // // //               <select
// // // //                 className="bg-[#17171A] text-white/90 w-full outline-none"
// // // //                 value={category}
// // // //                 onChange={(e) => setCategory(e.target.value)}
// // // //                 disabled={loadingCats}
// // // //               >
// // // //                 <option value="">{loadingCats ? "Loading categories..." : "Select a category"}</option>
// // // //                 {categories.map((c) => (
// // // //                   <option key={c._id} value={c.name}>
// // // //                     {c.name}
// // // //                   </option>
// // // //                 ))}
// // // //               </select>
// // // //             </div>
// // // //           </div>

// // // //           {/* Tags */}
// // // //           <div className="mt-4">
// // // //             <label className="block text-sm mb-1">
// // // //               Tags <span className="text-white/50 text-xs">(comma separated)</span>
// // // //             </label>
// // // //             <input
// // // //               type="text"
// // // //               className="w-full h-11 rounded-xl bg-transparent border border-white/15 px-3 outline-none"
// // // //               placeholder="ui/ux, research, prototyping"
// // // //               value={tags}
// // // //               onChange={(e) => setTags(e.target.value)}
// // // //             />
// // // //           </div>

// // // //           {/* Reason */}
// // // //           <div className="mt-4">
// // // //             <label className="block text-sm mb-1">Reason for Report</label>
// // // //             <div className="h-11 rounded-xl px-3 flex items-center border border-white/15 bg-[#17171A]">
// // // //               <select
// // // //                 className="bg-[#17171A] text-white/90 w-full outline-none"
// // // //                 value={reason}
// // // //                 onChange={(e) => setReason(e.target.value)}
// // // //               >
// // // //                 <option value="">Choose reason</option>
// // // //                 <option value="broken">Broken link / media</option>
// // // //                 <option value="outdated">Outdated</option>
// // // //                 <option value="inappropriate">Inappropriate</option>
// // // //                 <option value="other">Other</option>
// // // //               </select>
// // // //             </div>
// // // //           </div>

// // // //           {/* Describe */}
// // // //           <div className="mt-4">
// // // //             <label className="block text-sm mb-1">Describe the issue</label>
// // // //             <textarea
// // // //               rows={4}
// // // //               className="w-full rounded-xl bg-transparent border border-white/15 px-3 py-2 outline-none"
// // // //               placeholder="What is wrong with this resource? Include key details."
// // // //               value={desc}
// // // //               onChange={(e) => setDesc(e.target.value)}
// // // //             />
// // // //           </div>

// // // //           {/* Steps (optional) */}
// // // //           <div className="mt-4">
// // // //             <label className="block text-sm mb-1">
// // // //               Steps to reproduce <span className="text-white/50 text-xs">(optional)</span>
// // // //             </label>
// // // //             <textarea
// // // //               rows={3}
// // // //               className="w-full rounded-xl bg-transparent border border-white/15 px-3 py-2 outline-none"
// // // //               placeholder={"1) Open the page  2) Click play  3) Video fails to load"}
// // // //               value={steps}
// // // //               onChange={(e) => setSteps(e.target.value)}
// // // //             />
// // // //           </div>

// // // //           {/* Attach screenshots */}
// // // //           <div className="mt-4">
// // // //             <label className="block text-sm mb-1">
// // // //               Attach screenshots <span className="text-white/50 text-xs">(optional)</span>
// // // //             </label>
// // // //             <label
// // // //               className="
// // // //                 w-full h-28 rounded-xl border border-dashed border-white/20
// // // //                 grid place-items-center text-white/60 cursor-pointer
// // // //               "
// // // //             >
// // // //               <input
// // // //                 type="file"
// // // //                 multiple
// // // //                 accept="image/png,image/jpeg,application/pdf"
// // // //                 className="hidden"
// // // //                 onChange={onFileChange}
// // // //               />
// // // //               {files.length === 0 ? "Add up to 5 files" : `${files.length} file(s) selected`}
// // // //             </label>
// // // //             <div className="text-xs text-white/50 mt-2">Up to 5 files. PNG/JPG/PDF.</div>
// // // //           </div>

// // // //           {/* Agree */}
// // // //           <label className="flex items-start gap-3 mt-4 text-sm">
// // // //             <input
// // // //               type="checkbox"
// // // //               className="mt-0.5"
// // // //               checked={agree}
// // // //               onChange={(e) => setAgree(e.target.checked)}
// // // //             />
// // // //             <span className="text-white/80">
// // // //               I agree that this report complies with the Community Guidelines and Privacy Policy.
// // // //             </span>
// // // //           </label>

// // // //           {/* Actions */}
// // // //           <div className="flex justify-end gap-3 mt-6">
// // // //             <button
// // // //               type="button"
// // // //               className="h-10 px-4 rounded-xl bg-white/10 border border-white/15"
// // // //               onClick={() => onOpenChange(false)}
// // // //               disabled={submitting}
// // // //             >
// // // //               Cancel
// // // //             </button>
// // // //             <button
// // // //               type="submit"
// // // //               className="
// // // //                 h-10 px-5 rounded-xl text-white
// // // //                 bg-gradient-to-r from-[#5A3FFF] to-[#FF14EF]
// // // //                 disabled:opacity-60 flex items-center gap-2
// // // //               "
// // // //               disabled={!isValidUrl || !agree || !reason || !category || submitting}
// // // //             >
// // // //               {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
// // // //               Submit
// // // //             </button>
// // // //           </div>
// // // //         </form>
// // // //       </DialogContent>
// // // //     </Dialog>
// // // //   );
// // // // }




// // // // src/pages/historyDetail.tsx
// // // import React, { useEffect, useMemo, useRef, useState } from "react";
// // // import { Dialog, DialogContent } from "@/components/ui/dialog";
// // // import {
// // //   Image as ImageIcon,
// // //   Video,
// // //   AlertCircle,
// // //   Loader2,
// // //   Camera,
// // //   X,
// // // } from "lucide-react";
// // // import { useAuth } from "@/contexts/AuthContext";
// // // import { toast } from "@/components/ui/use-toast";

// // // export interface MarketplacePrompt {
// // //   id: number | string;
// // //   title: string;
// // //   description: string;
// // //   price: number;
// // //   rating?: number;
// // //   downloads: number;
// // //   category: string;
// // //   videoUrl?: string;
// // //   imageUrl?: string;
// // //   fullPrompt?: string;
// // // }

// // // interface DetailsPromptProps {
// // //   open: boolean;
// // //   onOpenChange: (open: boolean) => void;
// // //   prompt: MarketplacePrompt | null;
// // //   owned?: boolean;
// // //   onPurchase?: (prompt: MarketplacePrompt) => void; // kept for API compat
// // //   showImages?: boolean;
// // // }

// // // const STAR_ACTIVE = "#FF14EF";
// // // const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// // // export default function DetailsPrompt({
// // //   open,
// // //   onOpenChange,
// // //   prompt,
// // //   owned = false,
// // //   showImages = false,
// // // }: DetailsPromptProps) {
// // //   const [reportOpen, setReportOpen] = useState(false);
// // //   const [userRating, setUserRating] = useState<number>(0);
// // //   const [hoverRating, setHoverRating] = useState<number>(0);

// // //   const { token } = useAuth();

// // //   // ✅ SAFE: prompt can be null on the first render
// // //   const [avgRating, setAvgRating] = useState<number>(prompt?.rating ?? 0);

// // //   // ✅ keep avg in sync when prompt arrives/changes
// // //   useEffect(() => {
// // //     setAvgRating(prompt?.rating ?? 0);
// // //   }, [prompt?.id, prompt?.rating]);

// // //   async function handleRate(value: number) {
// // //     if (!prompt) return; // ✅ guard; cannot rate without a prompt
// // //     setUserRating(value);
// // //     try {
// // //       console.log("[RATE] Sending POST /api/prompt/:id/rate", {
// // //         endpoint: `${API_BASE}/api/prompt/${prompt.id}/rate`,
// // //         promptId: String(prompt.id),
// // //         rating: value,
// // //       });

// // //       const res = await fetch(`${API_BASE}/api/prompt/${prompt.id}/rate`, {
// // //         method: "POST",
// // //         headers: {
// // //           "Content-Type": "application/json",
// // //           ...(token ? { Authorization: `Bearer ${token}` } : {}),
// // //         },
// // //         credentials: "include",
// // //         body: JSON.stringify({ rating: value }),
// // //       });

// // //       const data = await res.json().catch(() => ({}));
// // //       console.log("[RATE] Response", { status: res.status, ok: res.ok, body: data });

// // //       if (res.ok && data?.success) {
// // //         if (typeof data.averageRating === "number") setAvgRating(data.averageRating);
// // //         console.log("%c[SUCCESS] Rating saved successfully", "color:#22c55e;font-weight:600");
// // //       } else {
// // //         console.error("[RATE] Failed to save rating", data?.error || "unknown_error");
// // //       }
// // //     } catch (err) {
// // //       console.error("[RATE] Exception while saving rating", err);
// // //     }
// // //   }















// // //   // --- Review / testimonial state ---
// // //   const [reviewText, setReviewText] = useState("");
// // //   const maxChars = 1000;
// // //   const fileInputRef = useRef<HTMLInputElement | null>(null);
// // //   const [photos, setPhotos] = useState<File[]>([]);
// // //   const [submittingReview, setSubmittingReview] = useState(false);

// // //   const onPickPhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
// // //     const list = e.target.files ? Array.from(e.target.files) : [];
// // //     if (!list.length) return;
// // //     setPhotos((prev) => [...prev, ...list].slice(0, 5)); // cap at 5
// // //   };

// // //   const removePhotoAt = (idx: number) => {
// // //     setPhotos((prev) => prev.filter((_, i) => i !== idx));
// // //   };

// // //   const clearReview = () => setReviewText("");

// // //   const handleSubmitReview = async () => {
// // //     if (reviewText.trim().length < 10) {
// // //       toast({ title: "Review too short", description: "Minimum 10 characters." });
// // //       return;
// // //     }
// // //     try {
// // //       setSubmittingReview(true);
// // //       // TODO: integrate with your testimonial API
// // //       toast({ title: "Submitted", description: "Thanks for your feedback!" });
// // //       setReviewText("");
// // //       setPhotos([]);
// // //     } finally {
// // //       setSubmittingReview(false);
// // //     }
// // //   };

// // //   const media = useMemo(() => {
// // //     if (!prompt) return null;
// // //     return showImages
// // //       ? ({ type: "image", url: prompt.imageUrl || "" } as const)
// // //       : ({ type: "video", url: prompt.videoUrl || "" } as const);
// // //   }, [prompt, showImages]);

// // //   if (!prompt) return null;

// // //   const currentStars = hoverRating || userRating;

// // //   return (
// // //     <>
// // //       <Dialog open={open} onOpenChange={onOpenChange}>
// // //         <DialogContent
// // //           className="
// // //             bg-[#17171A] text-white p-0 border-none
// // //             w-[min(96vw,1400px)]
// // //             max-h-[95vh]
// // //             rounded-3xl md:rounded-[40px]
// // //             overflow-hidden flex flex-col
// // //             [&>button.absolute.right-4.top-4]:hidden
// // //             [&>button:has(svg[class*='lucide-x'])]:hidden
// // //           "
// // //         >
// // //           {/* MEDIA */}
// // //           <div
// // //             className="
// // //               relative mx-auto
// // //               w-[calc(100%-3rem)] max-w-[1100px]
// // //               aspect-[3/2]
// // //               bg-[#333335]
// // //               overflow-hidden
// // //               rounded-[18px] md:rounded-[22px]
// // //               mt-5
// // //               shrink-0
// // //             "
// // //           >
// // //             <div className="absolute top-4 left-4 z-10">
// // //               <span className="px-3 py-1 text-[12px] font-semibold rounded-full text-black bg-white">
// // //                 {prompt.category.toUpperCase()}
// // //               </span>
// // //             </div>

// // //             <div className="absolute top-4 right-4 z-10">
// // //               <span className="px-3 py-1 text-[12px] font-semibold rounded-full text-black bg-white">
// // //                 PURCHASE TO UNLOCK
// // //               </span>
// // //             </div>

// // //             <div className="absolute inset-0">
// // //               {media?.type === "image" ? (
// // //                 <img src={media.url} alt="" className="w-full h-full object-cover" />
// // //               ) : (
// // //                 <video
// // //                   src={media?.url}
// // //                   className="w-full h-full object-cover"
// // //                   loop
// // //                   muted
// // //                   autoPlay
// // //                   playsInline
// // //                 />
// // //               )}
// // //             </div>

// // //             {/* Type hint */}
// // //             <div className="absolute bottom-3 left-4 flex items-center gap-2 text-sm text-white/80">
// // //               {media?.type === "image" ? <ImageIcon className="h-5 w-5" /> : <Video className="h-5 w-5" />}
// // //               <span className="uppercase tracking-wide">{media?.type}</span>
// // //             </div>
// // //           </div>

// // //           {/* DETAILS */}
// // //           <div
// // //             className="
// // //               px-8 md:px-10
// // //               pt-5 md:pt-6
// // //               pb-7 md:pb-9
// // //               min-h-0 flex-1 overflow-y-auto no-scrollbar
// // //             "
// // //           >
// // //             {/* Title row */}
// // //             <div className="grid grid-cols-[1fr_auto] items-start gap-4 mt-2">
// // //               <h2 className="font-semibold text-[24px] leading-snug tracking-tight [font-family:Inter,ui-sans-serif,system-ui]">
// // //                 {prompt.title}
// // //               </h2>
// // //               <span
// // //                 className="flex items-center justify-center rounded-full justify-self-end"
// // //                 style={{ backgroundColor: "#333335", width: 40, height: 40 }}
// // //                 aria-hidden
// // //               >
// // //                 <img src="/icons/cop1.png" alt="" className="w-5 h-5 object-contain" />
// // //               </span>
// // //             </div>

// // //             {/* Banner pill */}
// // //             <div
// // //               className="
// // //                 mt-4
// // //                 bg-[#333335]
// // //                 border border-white/10
// // //                 rounded-[12px]
// // //                 px-4 md:px-5 py-3
// // //                 flex items-center justify-between gap-4
// // //               "
// // //             >
// // //               <div className="flex items-center gap-4 min-w-0">
// // //                 <img
// // //                   src="/icons/dtlogo.svg"
// // //                   onError={(e) => {
// // //                     const img = e.currentTarget as HTMLImageElement & { dataset: any };
// // //                     if (!img.dataset.fallback) {
// // //                       img.dataset.fallback = "1";
// // //                       img.src = "/icons/dtlogo.png";
// // //                     }
// // //                   }}
// // //                   alt="DT Logo"
// // //                   className="shrink-0 object-contain"
// // //                   style={{ height: 32, width: "auto" }}
// // //                 />
// // //                 <div className="min-w-0">
// // //                   <div className="truncate text-[18px] leading-snug [font-family:Inter,ui-sans-serif,system-ui]">
// // //                     Power Your Storefronts with Auto-Generated Descriptions
// // //                   </div>
// // //                   <div className="text-white/70 truncate text-[13px] mt-2 leading-snug [font-family:Inter,ui-sans-serif,system-ui]">
// // //                     Generate compelling product descriptions that convert visitors into customers
// // //                   </div>
// // //                 </div>
// // //               </div>

// // //               {/* Right: number + static stars */}
// // //               <div className="flex flex-col items-center gap-1 shrink-0">
// // //               <span className="text-[13px] font-semibold leading-none">
// // //   {avgRating.toFixed(2)}
// // //   </span>
// // //                 <div className="flex items-center gap-[4px] leading-none">
// // //                   {[...Array(5)].map((_, i) => (
// // //                     <svg key={i} width="16" height="16" viewBox="0 0 24 24" aria-hidden>
// // //                       <path
// // //                         d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
// // //                         fill="#FFFFFF"
// // //                       />
// // //                     </svg>
// // //                   ))}
// // //                 </div>
// // //               </div>
// // //             </div>

// // //             {/* Description */}
// // //             <p className="mt-4 text-white/80 text-[16px] leading-relaxed [font-family:Inter,ui-sans-serif,system-ui]">
// // //               {prompt.description}
// // //             </p>

// // //             {/* Divider above rating */}
// // //             <div className="border-t border-white/10 mt-6 mb-4" />

// // //             {/* Rate your experience */}
// // //             <div>
// // //               <div className="text-white/90 text-[14px] mb-2">Rate your experience</div>
// // //               <div className="flex items-center gap-2">
// // //                 {[1, 2, 3, 4, 5].map((i) => (
// // //                   <button
// // //                     key={i}
// // //                     type="button"
// // //                     aria-label={`Rate ${i} star${i > 1 ? "s" : ""}`}
// // //                     onMouseEnter={() => setHoverRating(i)}
// // //                     onMouseLeave={() => setHoverRating(0)}
// // //                     onClick={() => handleRate(i)}
// // //                     className="p-1"
// // //                   >
// // //                     <svg width="28" height="28" viewBox="0 0 24 24">
// // //                       <path
// // //                         d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
// // //                         fill={i <= currentStars ? STAR_ACTIVE : "none"}
// // //                         stroke={i <= currentStars ? STAR_ACTIVE : "#FFFFFF"}
// // //                         strokeWidth="1.6"
// // //                       />
// // //                     </svg>
// // //                   </button>
// // //                 ))}
// // //               </div>
// // //             </div>

// // //             {/* Separator */}
// // //             <div className="border-t border-white/10 mt-6 mb-5" />

// // //             {/* Review (testimonial) */}
// // //             <div className="mt-6 ">
// // //             <div className="text-[14px] mb-2 text-white">
// // //   Review <span className="text-white text-xs">(required — 10 to {maxChars} characters)</span>
// // // </div>


// // //               {/* Textarea */}
// // //               <div className="relative">
// // //                 <textarea
// // //                   rows={5}
// // //                   maxLength={maxChars}
// // //                   className="w-full rounded-xl bg-transparent border border-white/15 px-3 py-3 outline-none text-[14px] text-white/90 placeholder:text-white/40"
// // //                   placeholder="Tell us what you liked, what could be improved, or how you used the prompt."
// // //                   value={reviewText}
// // //                   onChange={(e) => setReviewText(e.target.value)}
// // //                 />

// // //                 {/* Clear — only if there is text */}
// // //                 {reviewText.trim().length > 0 && (
// // //                   <button
// // //                     type="button"
// // //                     onClick={clearReview}
// // //                     className="absolute right-3 bottom-3 h-9 px-4 rounded-[10px] bg-[#2F2F2F] text-white text-sm hover:bg-[#3A3A3A]"
// // //                   >
// // //                     Clear
// // //                   </button>
// // //                 )}
// // //               </div>

// // //               {/* Camera + Thumbnails OUTSIDE the input, camera aligned to textarea left */}
// // //                {/* Camera + Thumbnails OUTSIDE the input, thumbnails LEFT of camera (smaller) */}
// // // <div className="mt-3 flex items-center gap-3">
// // //   {/* Thumbnails first (smaller 64x64) */}
// // //   <div className="flex items-center gap-2 overflow-x-auto">
// // //     {photos.map((file, i) => {
// // //       const url = URL.createObjectURL(file);
// // //       return (
// // //         <div
// // //           key={`${file.name}-${i}`}
// // //           className="relative w-16 h-16 rounded-md overflow-hidden border border-white/15 shrink-0"
// // //           title={file.name}
// // //         >
// // //           <img src={url} alt="" className="w-full h-full object-cover" />
// // //           <button
// // //             type="button"
// // //             onClick={() => removePhotoAt(i)}
// // //             className="absolute z-10 top-1 right-1 w-5 h-5 rounded-full bg-black/80 text-white grid place-items-center ring-1 ring-white/30 hover:bg-black"
// // //             aria-label="Remove photo"
// // //           >
// // //             <X className="w-3 h-3" />
// // //           </button>
// // //         </div>
// // //       );
// // //     })}
// // //   </div>

// // //   {/* Camera button */}
// // //   <div className="shrink-0">
// // //     <input
// // //       ref={fileInputRef}
// // //       type="file"
// // //       accept="image/*"
// // //       multiple
// // //       className="hidden"
// // //       onChange={onPickPhotos}
// // //     />
// // //     <button
// // //       type="button"
// // //       onClick={() => fileInputRef.current?.click()}
// // //       className="w-11 h-11 rounded-lg bg-[#2F2F2F] grid place-items-center hover:bg-[#3A3A3A]"
// // //       title="Add photos"
// // //     >
// // //       <Camera className="h-5 w-5" />
// // //     </button>
// // //   </div>
// // // </div>


// // //               {/* Char counter */}
          
// // //             </div>

// // //             {/* Bottom actions: Report Resource (plain text) + Submit */}
// // //             <div className="mt-6 flex items-center justify-end gap-4">
// // //             <button
// // //   type="button"
// // //   className="text-white text-base hover:opacity-90"
// // //   onClick={() => setReportOpen(true)}
// // // >
// // //   Report Resource
// // // </button>


// // //               <button
// // //                 className="
// // //                   px-6 h-12 rounded-[10px] text-white text-base font-medium leading-none
// // //                   bg-white/10 border border-white/15 hover:bg-white/15
// // //                   transition-colors disabled:opacity-60
// // //                 "
// // //                 onClick={handleSubmitReview}
// // //                 disabled={submittingReview}
// // //               >
// // //                 {submittingReview ? <Loader2 className="h-4 w-4 animate-spin" /> : "Submit"}
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </DialogContent>
// // //       </Dialog>

// // //       {/* REPORT RESOURCE POPUP (kept, API intact) */}
// // //       <ReportResourceDialog
// // //         open={reportOpen}
// // //         onOpenChange={setReportOpen}
// // //         promptId={String(prompt.id)}
// // //         promptTitle={prompt.title}
// // //       />
// // //     </>
// // //   );
// // // }

// // // /* ---------------- Report dialog (Create-only, API integrated) ---------------- */

// // // type ReportDialogProps = {
// // //   open: boolean;
// // //   onOpenChange: (v: boolean) => void;
// // //   promptId: string;
// // //   promptTitle?: string; // kept for context only (not rendered)
// // // };

// // // export function ReportResourceDialog({
// // //   open,
// // //   onOpenChange,
// // //   promptId,
// // //   promptTitle,
// // // }: ReportDialogProps) {
// // //   const { token } = useAuth();

// // //   // form state
// // //   const [title, setTitle] = useState("");
// // //   const [url, setUrl] = useState("");
// // //   const [category, setCategory] = useState("");
// // //   const [tags, setTags] = useState("");
// // //   const [reason, setReason] = useState("");
// // //   const [desc, setDesc] = useState("");
// // //   const [steps, setSteps] = useState("");
// // //   const [agree, setAgree] = useState(false);
// // //   const [files, setFiles] = useState<File[]>([]);
// // //   const [touchedUrl, setTouchedUrl] = useState(false);

// // //   // categories
// // //   const [categories, setCategories] = useState<{ name: string; _id: string }[]>([]);
// // //   const [loadingCats, setLoadingCats] = useState(false);

// // //   // submitting
// // //   const [submitting, setSubmitting] = useState(false);

// // //   const isValidUrl = (() => {
// // //     try {
// // //       if (!url) return false;
// // //       const u = new URL(url);
// // //       return !!u.protocol && !!u.host;
// // //     } catch {
// // //       return false;
// // //     }
// // //   })();

// // //   function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
// // //     const list = e.target.files ? Array.from(e.target.files).slice(0, 5) : [];
// // //     setFiles(list);
// // //   }

// // //   useEffect(() => {
// // //     if (!open) return;
// // //     (async () => {
// // //       try {
// // //         setLoadingCats(true);
// // //         const r = await fetch(`${API_BASE}/api/category`, {
// // //           method: "GET",
// // //           credentials: "include",
// // //         });
// // //         const data = await r.json();
// // //         if (data?.success) setCategories(data.categories || []);
// // //       } catch (e) {
// // //         console.error(e);
// // //         toast({ title: "Failed to load categories", description: "Please try again." });
// // //       } finally {
// // //         setLoadingCats(false);
// // //       }
// // //     })();
// // //   }, [open]);

// // //   async function submit(e: React.FormEvent) {
// // //     e.preventDefault();
// // //     if (!token) {
// // //       toast({ title: "Please log in", description: "You must be logged in to report a resource." });
// // //       return;
// // //     }
// // //     if (!promptId) {
// // //       toast({ title: "Missing prompt", description: "Prompt ID is required." });
// // //       return;
// // //     }
// // //     if (!reason || !category) {
// // //       toast({ title: "Missing fields", description: "Select a category and reason." });
// // //       return;
// // //     }
// // //     if (!isValidUrl || !agree) return;

// // //     try {
// // //       setSubmitting(true);

// // //       const form = new FormData();
// // //       form.append("prompt", promptId);
// // //       if (title) form.append("resourceTitle", title);
// // //       form.append("resourceURL", url);
// // //       form.append("category", category);

// // //       const tagsArr = tags
// // //         .split(",")
// // //         .map((t) => t.trim())
// // //         .filter(Boolean);
// // //       form.append("tags", JSON.stringify(tagsArr));

// // //       form.append("reason", reason);
// // //       if (desc) form.append("description", desc);
// // //       if (steps) form.append("stepsToReproduce", steps);

// // //       files.forEach((f) => form.append("screenshots", f));

// // //       const r = await fetch(`${API_BASE}/api/promptreport`, {
// // //         method: "POST",
// // //         headers: { Authorization: `Bearer ${token}` },
// // //         body: form,
// // //         credentials: "include",
// // //       });

// // //       const data = await r.json();
// // //       if (!r.ok || !data?.success) {
// // //         throw new Error(data?.error || "submit_failed");
// // //       }

// // //       toast({ title: "Report submitted", description: "Thanks for your feedback!" });

// // //       setTitle("");
// // //       setUrl("");
// // //       setCategory("");
// // //       setTags("");
// // //       setReason("");
// // //       setDesc("");
// // //       setSteps("");
// // //       setFiles([]);
// // //       setAgree(false);
// // //       onOpenChange(false);
// // //     } catch (err: any) {
// // //       console.error(err);
// // //       toast({
// // //         title: "Could not submit report",
// // //         description: err?.message || "Something went wrong.",
// // //       });
// // //     } finally {
// // //       setSubmitting(false);
// // //     }
// // //   }

// // //   return (
// // //     <Dialog open={open} onOpenChange={onOpenChange}>
// // //       <DialogContent
// // //         className="
// // //           bg-[#17171A] text-white border border-white/10
// // //           w-[min(96vw,640px)]
// // //           max-h-[95vh]
// // //           rounded-2xl p-0 overflow-hidden
// // //         "
// // //       >
// // //         <form className="p-5 sm:p-6 overflow-y-auto no-scrollbar max-h-[95vh]" onSubmit={submit}>
// // //           <h3 className="text-lg font-semibold mb-1">Report a Resource</h3>
// // //           <p className="text-white/70 text-sm mb-5">
// // //             Flag broken, outdated, inappropriate, or otherwise problematic resources.
// // //           </p>

// // //           <label className="block text-sm mb-1">Resource Title</label>
// // //           <input
// // //             type="text"
// // //             className="w-full h-11 rounded-xl bg-transparent border border-white/15 px-3 mb-4 outline-none"
// // //             placeholder="e.g., Intro to UX Research"
// // //             value={title}
// // //             onChange={(e) => setTitle(e.target.value)}
// // //           />

// // //           <label className="block text-sm mb-1">Resource URL</label>
// // //           <div className="relative">
// // //             <input
// // //               type="url"
// // //               className={`w-full h-11 rounded-xl bg-transparent border px-3 outline-none ${
// // //                 touchedUrl && !isValidUrl ? "border-red-500/70 pr-10" : "border-white/15"
// // //               }`}
// // //               placeholder="https://example.com/article"
// // //               value={url}
// // //               onChange={(e) => setUrl(e.target.value)}
// // //               onBlur={() => setTouchedUrl(true)}
// // //             />
// // //             {touchedUrl && !isValidUrl && (
// // //               <>
// // //                 <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-red-400 h-5 w-5" />
// // //                 <div className="text-red-400 text-xs mt-1">Please enter valid url</div>
// // //               </>
// // //             )}
// // //           </div>

// // //           <div className="mt-4">
// // //             <label className="block text-sm mb-1">Category</label>
// // //             <div className="h-11 rounded-xl px-3 flex items-center border border-white/15 bg-[#17171A]">
// // //               <select
// // //                 className="bg-[#17171A] text-white/90 w-full outline-none"
// // //                 value={category}
// // //                 onChange={(e) => setCategory(e.target.value)}
// // //                 disabled={loadingCats}
// // //               >
// // //                 <option value="">{loadingCats ? "Loading categories..." : "Select a category"}</option>
// // //                 {categories.map((c) => (
// // //                   <option key={c._id} value={c.name}>
// // //                     {c.name}
// // //                   </option>
// // //                 ))}
// // //               </select>
// // //             </div>
// // //           </div>

// // //           <div className="mt-4">
// // //             <label className="block text-sm mb-1">
// // //               Tags <span className="text-white/50 text-xs">(comma separated)</span>
// // //             </label>
// // //             <input
// // //               type="text"
// // //               className="w-full h-11 rounded-xl bg-transparent border border-white/15 px-3 outline-none"
// // //               placeholder="ui/ux, research, prototyping"
// // //               value={tags}
// // //               onChange={(e) => setTags(e.target.value)}
// // //             />
// // //           </div>

// // //           <div className="mt-4">
// // //             <label className="block text-sm mb-1">Reason for Report</label>
// // //             <div className="h-11 rounded-xl px-3 flex items-center border border-white/15 bg-[#17171A]">
// // //               <select
// // //                 className="bg-[#17171A] text-white/90 w-full outline-none"
// // //                 value={reason}
// // //                 onChange={(e) => setReason(e.target.value)}
// // //               >
// // //                 <option value="">Choose reason</option>
// // //                 <option value="broken">Broken link / media</option>
// // //                 <option value="outdated">Outdated</option>
// // //                 <option value="inappropriate">Inappropriate</option>
// // //                 <option value="other">Other</option>
// // //               </select>
// // //             </div>
// // //           </div>

// // //           <div className="mt-4">
// // //             <label className="block text-sm mb-1">Describe the issue</label>
// // //             <textarea
// // //               rows={4}
// // //               className="w-full rounded-xl bg-transparent border border-white/15 px-3 py-2 outline-none"
// // //               placeholder="What is wrong with this resource? Include key details."
// // //               value={desc}
// // //               onChange={(e) => setDesc(e.target.value)}
// // //             />
// // //           </div>

// // //           <div className="mt-4">
// // //             <label className="block text-sm mb-1">
// // //               Steps to reproduce <span className="text-white/50 text-xs">(optional)</span>
// // //             </label>
// // //             <textarea
// // //               rows={3}
// // //               className="w-full rounded-xl bg-transparent border border-white/15 px-3 py-2 outline-none"
// // //               placeholder={"1) Open the page  2) Click play  3) Video fails to load"}
// // //               value={steps}
// // //               onChange={(e) => setSteps(e.target.value)}
// // //             />
// // //           </div>

// // //           <div className="mt-4">
// // //             <label className="block text-sm mb-1">
// // //               Attach screenshots <span className="text-white/50 text-xs">(optional)</span>
// // //             </label>
// // //             <label
// // //               className="
// // //                 w-full h-28 rounded-xl border border-dashed border-white/20
// // //                 grid place-items-center text-white/60 cursor-pointer
// // //               "
// // //             >
// // //               <input
// // //                 type="file"
// // //                 multiple
// // //                 accept="image/png,image/jpeg,application/pdf"
// // //                 className="hidden"
// // //                 onChange={onFileChange}
// // //               />
// // //               {files.length === 0 ? "Add up to 5 files" : `${files.length} file(s) selected`}
// // //             </label>
// // //             <div className="text-xs text-white/50 mt-2">Up to 5 files. PNG/JPG/PDF.</div>
// // //           </div>

// // //           <label className="flex items-start gap-3 mt-4 text-sm">
// // //             <input
// // //               type="checkbox"
// // //               className="mt-0.5"
// // //               checked={agree}
// // //               onChange={(e) => setAgree(e.target.checked)}
// // //             />
// // //             <span className="text-white/80">
// // //               I agree that this report complies with the Community Guidelines and Privacy Policy.
// // //             </span>
// // //           </label>

// // //           <div className="flex justify-end gap-3 mt-6">
// // //             <button
// // //               type="button"
// // //               className="h-10 px-4 rounded-xl bg-white/10 border border-white/15"
// // //               onClick={() => onOpenChange(false)}
// // //               disabled={submitting}
// // //             >
// // //               Cancel
// // //             </button>
// // //             <button
// // //               type="submit"
// // //               className="
// // //                 h-10 px-5 rounded-xl text-white
// // //                 bg-gradient-to-r from-[#5A3FFF] to-[#FF14EF]
// // //                 disabled:opacity-60 flex items-center gap-2
// // //               "
// // //               disabled={!isValidUrl || !agree || !reason || !category || submitting}
// // //             >
// // //               {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
// // //               Submit
// // //             </button>
// // //           </div>
// // //         </form>
// // //       </DialogContent>
// // //     </Dialog>
// // //   );
// // // }


// // // src/pages/historyDetail.tsx
// // import React, { useEffect, useMemo, useRef, useState } from "react";
// // import { Dialog, DialogContent } from "@/components/ui/dialog";
// // import {
// //   Image as ImageIcon,
// //   Video,
// //   Loader2,
// //   AlertCircle,
// // } from "lucide-react";
// // import { RiShareForwardLine } from "react-icons/ri";
// // import RequestToBuyModal from "@/components/RequestToBuyModel";
// // import { useAuth } from "@/contexts/AuthContext";
// // import { toast } from "@/components/ui/use-toast";

// // /* ========= Types ========= */
// // export interface MarketplacePrompt {
// //   id: number | string;
// //   title: string;
// //   description: string;
// //   price: number;
// //   rating?: number;
// //   downloads: number;
// //   category: string;
// //   videoUrl?: string;
// //   imageUrl?: string;
// //   fullPrompt?: string;
// //   ownerEmail?: string; // used when TM needs to see org owner's email
// // }

// // interface DetailsPromptProps {
// //   open: boolean;
// //   onOpenChange: (open: boolean) => void;
// //   prompt: MarketplacePrompt | null;
// //   owned?: boolean;
// //   onPurchase?: (prompt: MarketplacePrompt) => void; // kept for API compatibility
// //   showImages?: boolean;
// // }

// // /* ========= Config ========= */
// // const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// // /* =========================================================================
// //    MAIN: History Detail (cleaned: no review/rating UI)
// //    ========================================================================= */
// // export default function DetailsPrompt({
// //   open,
// //   onOpenChange,
// //   prompt,
// //   owned = false,
// //   onPurchase,
// //   showImages = false,
// // }: DetailsPromptProps) {
// //   const { user } = useAuth();

// //   const isTeamMember = user?.userType === "TM";
// //   const isOrgOwnerAdmin =
// //     user?.userType === "ORG" && (user?.role === "Owner" || user?.role === "Admin");
// //   const isIND = user?.userType === "IND" || (!user?.userType && !isTeamMember); // fallback treat as IND

// //   // Invoice button rules
// //   const canDownloadInvoice = isIND || isOrgOwnerAdmin; // disabled for TM

// //   // Request modal
// //   const [showRequestModal, setShowRequestModal] = useState(false);

// //   // Media handling (video or image)
// //   const media = useMemo(() => {
// //     if (!prompt) return null;
// //     const hasVideo = !!prompt.videoUrl?.trim();
// //     const hasImage = !!prompt.imageUrl?.trim();

// //     if (showImages || !hasVideo) {
// //       return {
// //         type: "image" as const,
// //         url: hasImage ? prompt.imageUrl! : "/icons/fallback.png",
// //       };
// //     } else {
// //       return { type: "video" as const, url: prompt.videoUrl! };
// //     }
// //   }, [prompt, showImages]);

// //   if (!prompt) return null;

// //   /* =================== PDF (styled) =================== */
// //   async function handleDownloadInvoice() {
// //     if (!canDownloadInvoice) return;

// //     try {
// //       const { jsPDF } = await import("jspdf");

// //       const pdf = new jsPDF({ unit: "pt", format: "a4" });
// //       const pageW = pdf.internal.pageSize.getWidth();

// //       const brand = "Tokun.ai";
// //       const orderId = `ORD-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
// //       const purchaseDate = new Date().toLocaleString();
// //       const buyer = user?.email || user?.name || "Buyer";
// //       const title = prompt.title || "Prompt";
// //       const price = `₹${Number(prompt.price || 0).toLocaleString()}`;

// //       // Header bar
// //       pdf.setFillColor(23, 23, 26);
// //       pdf.rect(0, 0, pageW, 90, "F");
// //       pdf.setTextColor(255, 255, 255);
// //       pdf.setFontSize(20);
// //       pdf.text(brand, 40, 55);
// //       pdf.setFontSize(12);
// //       pdf.text("Invoice", pageW - 100, 55);

// //       // Card
// //       const cardX = 40;
// //       const cardY = 120;
// //       const cardW = pageW - 80;
// //       const cardH = 480;
// //       pdf.setDrawColor(230);
// //       pdf.roundedRect(cardX, cardY, cardW, cardH, 10, 10, "S");

// //       // Section titles
// //       pdf.setTextColor(0, 0, 0);
// //       pdf.setFontSize(16);
// //       pdf.text("Order Summary", cardX + 20, cardY + 30);

// //       // Lines
// //       pdf.setDrawColor(230);
// //       pdf.line(cardX + 20, cardY + 40, cardX + cardW - 20, cardY + 40);

// //       // Order details
// //       pdf.setFontSize(12);
// //       const left = cardX + 20;
// //       let y = cardY + 70;

// //       const row = (label: string, value: string) => {
// //         pdf.setFont(undefined, "bold");
// //         pdf.text(label, left, y);
// //         pdf.setFont(undefined, "normal");
// //         pdf.text(value, left + 160, y);
// //         y += 24;
// //       };

// //       row("Order ID:", orderId);
// //       row("Purchase Date:", purchaseDate);
// //       row("Buyer:", String(buyer));
// //       row("Item:", title);
// //       row("License:", "Single-seat perpetual use");
// //       row("Status:", "Paid");

// //       // Price summary box
// //       const boxY = cardY + cardH - 120;
// //       pdf.setDrawColor(230);
// //       pdf.roundedRect(left, boxY, cardW - 40, 90, 8, 8, "S");
// //       pdf.setFont(undefined, "bold");
// //       pdf.text("Payment Summary", left + 12, boxY + 22);
// //       pdf.setFont(undefined, "normal");

// //       const priceRow = (k: string, v: string, offsetY: number) => {
// //         pdf.text(k, left + 12, boxY + offsetY);
// //         pdf.text(v, left + (cardW - 40) - 12 - pdf.getTextWidth(v), boxY + offsetY);
// //       };

// //       priceRow("Subtotal:", price, 44);
// //       priceRow("Discount:", "₹0", 64);
// //       pdf.setFont(undefined, "bold");
// //       priceRow("Total:", price, 86);

// //       // Footer note
// //       pdf.setFontSize(10);
// //       pdf.setFont(undefined, "normal");
// //       pdf.setTextColor(120);
// //       pdf.text(
// //         "This is a system-generated invoice for your records. For support, contact support@tokun.ai",
// //         40,
// //         780
// //       );

// //       pdf.save(`invoice_${orderId}.pdf`);
// //     } catch (e) {
// //       console.error(e);
// //       toast({ title: "Could not create invoice", description: "Please try again." });
// //     }
// //   }

// //   return (
// //     <>
// //       <Dialog open={open} onOpenChange={onOpenChange}>
// //         <DialogContent
// //           className="
// //             bg-[#17171A] text-white p-0 border-none
// //             w-[min(96vw,1600px)]
// //             max-h-[96vh]
// //             rounded-3xl md:rounded-[40px]
// //             overflow-hidden flex flex-col
// //           "
// //         >
// //           {/* MEDIA */}
// //           <div
// //             className="
// //               relative mx-auto
// //               w-[calc(100%-3rem)] max-w-[1300px]
// //               aspect-[3/2]
// //               bg-[#333335]
// //               overflow-hidden
// //               rounded-[18px] md:rounded-[22px]
// //               mt-8
// //               shrink-0
// //             "
// //           >
// //             <span className="sr-only">{prompt.title}</span>

// //             <div className="absolute top-4 left-4 z-10">
// //               <span className="px-3 py-1 text-[12px] font-semibold rounded-full text-black bg-white">
// //                 {prompt.category.toUpperCase()}
// //               </span>
// //             </div>

// //             {!owned && (
// //               <div className="absolute top-4 right-4 z-10">
// //                 <span className="px-3 py-1 text-[12px] font-semibold rounded-full text-black bg-white">
// //                   PURCHASE TO UNLOCK
// //                 </span>
// //               </div>
// //             )}

// //             <div className="absolute inset-0">
// //               {media?.type === "image" ? (
// //                 <img
// //                   src={media.url}
// //                   alt={prompt.title}
// //                   className="w-full h-full object-cover"
// //                   onError={(e) => {
// //                     (e.currentTarget as HTMLImageElement).src = "/icons/fallback.png";
// //                   }}
// //                 />
// //               ) : (
// //                 <video
// //                   src={media?.url}
// //                   className="w-full h-full object-cover"
// //                   loop
// //                   muted
// //                   autoPlay
// //                   playsInline
// //                 />
// //               )}
// //             </div>

// //             {/* Type hint */}
// //             <div className="absolute bottom-3 left-4 flex items-center gap-2 text-sm text-white/80">
// //               {media?.type === "image" ? <ImageIcon className="h-5 w-5" /> : <Video className="h-5 w-5" />}
// //               <span className="uppercase tracking-wide">{media?.type}</span>
// //             </div>
// //           </div>

// //           {/* DETAILS */}
// //           <div
// //             className="
// //               px-12 md:px-14
// //               pt-8 md:pt-10
// //               pb-10 md:pb-12
// //               min-h-0 flex-1 overflow-y-auto no-scrollbar
// //             "
// //           >
// //             {/* Title row */}
// //             <div className="grid grid-cols-[1fr_auto] items-start gap-4 mt-2">
// //               <h2 className="font-semibold text-[24px] leading-snug tracking-tight">
// //                 {prompt.title}
// //               </h2>
// //               <span
// //                 className="flex items-center justify-center rounded-full justify-self-end"
// //                 style={{ backgroundColor: "#333335", width: 42, height: 42 }}
// //                 aria-hidden
// //               >
// //                 <img src="/icons/cop1.png" alt="" className="w-5 h-5 object-contain" />
// //               </span>
// //             </div>

// //             {/* Banner pill */}
// //             <div
// //               className="
// //                 mt-5
// //                 bg-[#333335]
// //                 border border-white/10
// //                 rounded-[12px]
// //                 px-5 md:px-6 py-4
// //                 flex items-center justify-between gap-4
// //               "
// //             >
// //               <div className="flex items-center gap-4 min-w-0">
// //                 <img
// //                   src="/icons/dtlogo.svg"
// //                   onError={(e) => {
// //                     const img = e.currentTarget as HTMLImageElement;
// //                     img.src = "/icons/dtlogo.png";
// //                   }}
// //                   alt="DT Logo"
// //                   className="shrink-0 object-contain h-8"
// //                 />
// //                 <div className="min-w-0">
// //                   <div className="truncate text-[17px] leading-snug font-medium">
// //                     Power Your Storefronts with Auto-Generated Descriptions
// //                   </div>
// //                   <div className="text-white/70 truncate text-[13px] mt-1 leading-snug">
// //                     Generate compelling product descriptions that convert visitors into customers
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* Right: rating number + static stars (kept visual, not interactive) */}
// //               <div className="flex flex-col items-center gap-1 shrink-0">
// //                 <span className="text-[13px] font-semibold leading-none">
// //                   {(prompt.rating ?? 0).toFixed(1)}
// //                 </span>
// //                 <div className="flex items-center gap-[3px] leading-none">
// //                   {[...Array(5)].map((_, i) => (
// //                     <svg key={i} width="15" height="15" viewBox="0 0 24 24" aria-hidden>
// //                       <path
// //                         d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
// //                         fill="#FFFFFF"
// //                       />
// //                     </svg>
// //                   ))}
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Description */}
// //             <p className="mt-5 text-white/80 text-[15px] leading-relaxed">
// //               {prompt.description}
// //             </p>

// //             {/* Divider */}
// //             <div className="border-t border-white/10 mt-6 mb-6" />

// //             {/* Price + Actions */}
// //             <div className="flex items-center justify-between flex-wrap gap-4">
// //               <div className="text-[20px] font-semibold text-white">
// //                 ₹{Number(prompt.price || 0).toLocaleString()}
// //               </div>

// //               <div className="flex items-center gap-4">
// //                 {/* Share */}
// //                 <button
// //                   className="flex items-center justify-center gap-2 text-white text-[14px] hover:text-[#FF14EF] transition-all"
// //                   onClick={() => setShowRequestModal(true)}
// //                 >
// //                   <RiShareForwardLine className="w-5 h-5" />
// //                   Share
// //                 </button>

// //                 {/* Download Invoice */}
// //                 <button
// //                   onClick={handleDownloadInvoice}
// //                   disabled={!canDownloadInvoice}
// //                   className={`
// //                     px-5 h-11 rounded-[8px] border border-white/10 text-[14px]
// //                     transition-all
// //                     ${canDownloadInvoice
// //                       ? "bg-[#1C1C1E] text-white hover:bg-gradient-to-r hover:from-[#5A3FFF] hover:to-[#FF14EF]"
// //                       : "bg-[#1C1C1E] text-white/50 cursor-not-allowed opacity-60"}
// //                   `}
// //                 >
// //                   Download Invoice
// //                 </button>
// //               </div>
// //             </div>

// //             {/* Bottom row: Report on the LEFT, actions are already on the right above */}
// //             <div className="mt-6 flex items-center justify-between">
// //               <ReportResourceTrigger promptId={String(prompt.id)} promptTitle={prompt.title} />
// //               <div /> {/* spacer to keep left alignment like the screenshot */}
// //             </div>
// //           </div>
// //         </DialogContent>
// //       </Dialog>

// //       {/* Request To Buy Modal */}
// //       {prompt && (
// //         <RequestToBuyModal
// //           open={showRequestModal}
// //           onOpenChange={setShowRequestModal}
// //           promptId={prompt?.id?.toString() || ""}
// //           promptTitle={prompt?.title || ""}
// //           price={prompt?.price || 0}
// //           thumbnail={prompt?.imageUrl || ""}
// //           userType={user?.userType === "TM" ? "TM" : "ORG"}
// //           role={user?.role || ""}
// //           ownerEmail={
// //             user?.userType === "TM" ? prompt?.ownerEmail || "" : ""
// //           }
// //         />
// //       )}
// //     </>
// //   );
// // }

// // /* =========================================================================
// //    Report Resource Trigger + Dialog (kept; trigger anchored left)
// //    ========================================================================= */
// // function ReportResourceTrigger({ promptId, promptTitle }: { promptId: string; promptTitle: string }) {
// //   const [open, setOpen] = useState(false);
// //   return (
// //     <>
// //       <button
// //         type="button"
// //         className="text-white text-base hover:opacity-90"
// //         onClick={() => setOpen(true)}
// //       >
// //         Report Resource
// //       </button>
// //       <ReportResourceDialog open={open} onOpenChange={setOpen} promptId={promptId} promptTitle={promptTitle} />
// //     </>
// //   );
// // }

// // type ReportDialogProps = {
// //   open: boolean;
// //   onOpenChange: (v: boolean) => void;
// //   promptId: string;
// //   promptTitle?: string;
// // };

// // export function ReportResourceDialog({
// //   open,
// //   onOpenChange,
// //   promptId,
// // }: ReportDialogProps) {
// //   const { token } = useAuth();

// //   // form state
// //   const [title, setTitle] = useState("");
// //   const [url, setUrl] = useState("");
// //   const [category, setCategory] = useState("");
// //   const [tags, setTags] = useState("");
// //   const [reason, setReason] = useState("");
// //   const [desc, setDesc] = useState("");
// //   const [steps, setSteps] = useState("");
// //   const [agree, setAgree] = useState(false);
// //   const [files, setFiles] = useState<File[]>([]);
// //   const [touchedUrl, setTouchedUrl] = useState(false);

// //   // categories
// //   const [categories, setCategories] = useState<{ name: string; _id: string }[]>([]);
// //   const [loadingCats, setLoadingCats] = useState(false);

// //   // submitting
// //   const [submitting, setSubmitting] = useState(false);

// //   const isValidUrl = (() => {
// //     try {
// //       if (!url) return false;
// //       const u = new URL(url);
// //       return !!u.protocol && !!u.host;
// //     } catch {
// //       return false;
// //     }
// //   })();

// //   function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
// //     const list = e.target.files ? Array.from(e.target.files).slice(0, 5) : [];
// //     setFiles(list);
// //   }

// //   useEffect(() => {
// //     if (!open) return;
// //     (async () => {
// //       try {
// //         setLoadingCats(true);
// //         const r = await fetch(`${API_BASE}/api/category`, {
// //           method: "GET",
// //           credentials: "include",
// //         });
// //         const data = await r.json();
// //         if (data?.success) setCategories(data.categories || []);
// //       } catch (e) {
// //         console.error(e);
// //         toast({ title: "Failed to load categories", description: "Please try again." });
// //       } finally {
// //         setLoadingCats(false);
// //       }
// //     })();
// //   }, [open]);

// //   async function submit(e: React.FormEvent) {
// //     e.preventDefault();
// //     if (!token) {
// //       toast({ title: "Please log in", description: "You must be logged in to report a resource." });
// //       return;
// //     }
// //     if (!promptId) {
// //       toast({ title: "Missing prompt", description: "Prompt ID is required." });
// //       return;
// //     }
// //     if (!reason || !category) {
// //       toast({ title: "Missing fields", description: "Select a category and reason." });
// //       return;
// //     }
// //     if (!isValidUrl || !agree) return;

// //     try {
// //       setSubmitting(true);

// //       const form = new FormData();
// //       form.append("prompt", promptId);
// //       if (title) form.append("resourceTitle", title);
// //       form.append("resourceURL", url);
// //       form.append("category", category);

// //       const tagsArr = tags
// //         .split(",")
// //         .map((t) => t.trim())
// //         .filter(Boolean);
// //       form.append("tags", JSON.stringify(tagsArr));

// //       form.append("reason", reason);
// //       if (desc) form.append("description", desc);
// //       if (steps) form.append("stepsToReproduce", steps);

// //       files.forEach((f) => form.append("screenshots", f));

// //       const r = await fetch(`${API_BASE}/api/promptreport`, {
// //         method: "POST",
// //         headers: { Authorization: `Bearer ${token}` },
// //         body: form,
// //         credentials: "include",
// //       });

// //       const data = await r.json();
// //       if (!r.ok || !data?.success) {
// //         throw new Error(data?.error || "submit_failed");
// //       }

// //       toast({ title: "Report submitted", description: "Thanks for your feedback!" });

// //       setTitle("");
// //       setUrl("");
// //       setCategory("");
// //       setTags("");
// //       setReason("");
// //       setDesc("");
// //       setSteps("");
// //       setFiles([]);
// //       setAgree(false);
// //       onOpenChange(false);
// //     } catch (err: any) {
// //       console.error(err);
// //       toast({
// //         title: "Could not submit report",
// //         description: err?.message || "Something went wrong.",
// //       });
// //     } finally {
// //       setSubmitting(false);
// //     }
// //   }

// //   return (
// //     <Dialog open={open} onOpenChange={onOpenChange}>
// //       <DialogContent
// //         className="
// //           bg-[#17171A] text-white border border-white/10
// //           w-[min(96vw,640px)]
// //           max-h-[95vh]
// //           rounded-2xl p-0 overflow-hidden
// //         "
// //       >
// //         <form className="p-5 sm:p-6 overflow-y-auto no-scrollbar max-h-[95vh]" onSubmit={submit}>
// //           <h3 className="text-lg font-semibold mb-1">Report a Resource</h3>
// //           <p className="text-white/70 text-sm mb-5">
// //             Flag broken, outdated, inappropriate, or otherwise problematic resources.
// //           </p>

// //           <label className="block text-sm mb-1">Resource Title</label>
// //           <input
// //             type="text"
// //             className="w-full h-11 rounded-xl bg-transparent border border-white/15 px-3 mb-4 outline-none"
// //             placeholder="e.g., Intro to UX Research"
// //             value={title}
// //             onChange={(e) => setTitle(e.target.value)}
// //           />

// //           <label className="block text-sm mb-1">Resource URL</label>
// //           <div className="relative">
// //             <input
// //               type="url"
// //               className={`w-full h-11 rounded-xl bg-transparent border px-3 outline-none ${
// //                 touchedUrl && !isValidUrl ? "border-red-500/70 pr-10" : "border-white/15"
// //               }`}
// //               placeholder="https://example.com/article"
// //               value={url}
// //               onChange={(e) => setUrl(e.target.value)}
// //               onBlur={() => setTouchedUrl(true)}
// //             />
// //             {touchedUrl && !isValidUrl && (
// //               <>
// //                 <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-red-400 h-5 w-5" />
// //                 <div className="text-red-400 text-xs mt-1">Please enter valid url</div>
// //               </>
// //             )}
// //           </div>

// //           <div className="mt-4">
// //             <label className="block text-sm mb-1">Category</label>
// //             <div className="h-11 rounded-xl px-3 flex items-center border border-white/15 bg-[#17171A]">
// //               <select
// //                 className="bg-[#17171A] text-white/90 w-full outline-none"
// //                 value={category}
// //                 onChange={(e) => setCategory(e.target.value)}
// //                 disabled={loadingCats}
// //               >
// //                 <option value="">{loadingCats ? "Loading categories..." : "Select a category"}</option>
// //                 {categories.map((c) => (
// //                   <option key={c._id} value={c.name}>
// //                     {c.name}
// //                   </option>
// //                 ))}
// //               </select>
// //             </div>
// //           </div>

// //           <div className="mt-4">
// //             <label className="block text-sm mb-1">
// //               Tags <span className="text-white/50 text-xs">(comma separated)</span>
// //             </label>
// //             <input
// //               type="text"
// //               className="w-full h-11 rounded-xl bg-transparent border border-white/15 px-3 outline-none"
// //               placeholder="ui/ux, research, prototyping"
// //               value={tags}
// //               onChange={(e) => setTags(e.target.value)}
// //             />
// //           </div>

// //           <div className="mt-4">
// //             <label className="block text-sm mb-1">Reason for Report</label>
// //             <div className="h-11 rounded-xl px-3 flex items-center border border-white/15 bg-[#17171A]">
// //               <select
// //                 className="bg-[#17171A] text-white/90 w-full outline-none"
// //                 value={reason}
// //                 onChange={(e) => setReason(e.target.value)}
// //               >
// //                 <option value="">Choose reason</option>
// //                 <option value="broken">Broken link / media</option>
// //                 <option value="outdated">Outdated</option>
// //                 <option value="inappropriate">Inappropriate</option>
// //                 <option value="other">Other</option>
// //               </select>
// //             </div>
// //           </div>

// //           <div className="mt-4">
// //             <label className="block text-sm mb-1">Describe the issue</label>
// //             <textarea
// //               rows={4}
// //               className="w-full rounded-xl bg-transparent border border-white/15 px-3 py-2 outline-none"
// //               placeholder="What is wrong with this resource? Include key details."
// //               value={desc}
// //               onChange={(e) => setDesc(e.target.value)}
// //             />
// //           </div>

// //           <div className="mt-4">
// //             <label className="block text-sm mb-1">
// //               Attach screenshots <span className="text-white/50 text-xs">(optional)</span>
// //             </label>
// //             <label
// //               className="
// //                 w-full h-28 rounded-xl border border-dashed border-white/20
// //                 grid place-items-center text-white/60 cursor-pointer
// //               "
// //             >
// //               <input
// //                 type="file"
// //                 multiple
// //                 accept="image/png,image/jpeg,application/pdf"
// //                 className="hidden"
// //                 onChange={onFileChange}
// //               />
// //               {files.length === 0 ? "Add up to 5 files" : `${files.length} file(s) selected`}
// //             </label>
// //             <div className="text-xs text-white/50 mt-2">Up to 5 files. PNG/JPG/PDF.</div>
// //           </div>

// //           <label className="flex items-start gap-3 mt-4 text-sm">
// //             <input
// //               type="checkbox"
// //               className="mt-0.5"
// //               checked={agree}
// //               onChange={(e) => setAgree(e.target.checked)}
// //             />
// //             <span className="text-white/80">
// //               I agree that this report complies with the Community Guidelines and Privacy Policy.
// //             </span>
// //           </label>

// //           <div className="flex justify-end gap-3 mt-6">
// //             <button
// //               type="button"
// //               className="h-10 px-4 rounded-xl bg-white/10 border border-white/15"
// //               onClick={() => onOpenChange(false)}
// //               disabled={submitting}
// //             >
// //               Cancel
// //             </button>
// //             <button
// //               type="submit"
// //               className="
// //                 h-10 px-5 rounded-xl text-white
// //                 bg-gradient-to-r from-[#5A3FFF] to-[#FF14EF]
// //                 disabled:opacity-60 flex items-center gap-2
// //               "
// //               disabled={!isValidUrl || !agree || !reason || !category || submitting}
// //             >
// //               {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
// //               Submit
// //             </button>
// //           </div>
// //         </form>
// //       </DialogContent>
// //     </Dialog>
// //   );
// // }


// // src/pages/historyDetail.tsx
// import React, { useEffect, useMemo, useState } from "react";
// import { Dialog, DialogContent } from "@/components/ui/dialog";
// import {
//   Image as ImageIcon,
//   Video,
//   AlertCircle,
//   Loader2,
//   Check,
// } from "lucide-react";
// import { RiShareForwardLine } from "react-icons/ri";
// import { AiOutlineStar, AiFillStar } from "react-icons/ai";
// import RequestToBuyModal from "@/components/RequestToBuyModel";
// import { useAuth } from "@/contexts/AuthContext";
// import { toast } from "@/components/ui/use-toast";

// /* ================== Types ================== */
// export interface MarketplacePrompt {
//   id: number | string;
//   title: string;
//   description: string;
//   price: number;
//   rating?: number;
//   downloads: number;
//   category: string;
//   videoUrl?: string;
//   imageUrl?: string;
//   fullPrompt?: string;
//   ownerEmail?: string; // used for TM to show owner
// }

// interface DetailsPromptProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   prompt: MarketplacePrompt | null;
//   owned?: boolean;
//   onPurchase?: (prompt: MarketplacePrompt) => void; // kept for compat
//   showImages?: boolean;
// }

// /* ================== Config ================== */
// const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// /* =========================================================================
//    MAIN: History Detail — matches screenshot (no price, aligned buttons)
//    ========================================================================= */
// export default function DetailsPrompt({
//   open,
//   onOpenChange,
//   prompt,
//   owned = false,
//   onPurchase,
//   showImages = false,
// }: DetailsPromptProps) {
//   const { user } = useAuth();

//   const isTM = user?.userType === "TM";
//   const isOrgOwnerAdmin =
//     user?.userType === "ORG" && (user?.role === "Owner" || user?.role === "Admin");
//   const isIND = user?.userType === "IND" || (!user?.userType && !isTM);
//   const canDownloadInvoice = isIND || isOrgOwnerAdmin; // disabled only for TM

//   // Share modal state
//   const [showRequestModal, setShowRequestModal] = useState(false);

//   // Feedback stars (interactive)
//   const [feedback, setFeedback] = useState<number>(0);
//   const [hover, setHover] = useState<number>(0);

//   // Media handling
//   const media = useMemo(() => {
//     if (!prompt) return null;
//     const hasVideo = !!prompt.videoUrl?.trim();
//     const hasImage = !!prompt.imageUrl?.trim();

//     if (showImages || !hasVideo) {
//       return {
//         type: "image" as const,
//         url: hasImage ? prompt.imageUrl! : "/icons/fallback.png",
//       };
//     } else {
//       return { type: "video" as const, url: prompt.videoUrl! };
//     }
//   }, [prompt, showImages]);

//   if (!prompt) return null;

//   /* =================== PDF (styled invoice) =================== */
//   async function handleDownloadInvoice() {
//     if (!canDownloadInvoice) return;

//     try {
//       // safer dynamic import (avoids bundler edge cases)
//       const jsPDFModule = await import("jspdf");
//       const jsPDF = jsPDFModule.jsPDF;

//       const pdf = new jsPDF({ unit: "pt", format: "a4" });
//       const pageW = pdf.internal.pageSize.getWidth();

//       const brand = "Tokun.ai";
//       const orderId = `ORD-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
//       const purchaseDate = new Date().toLocaleString();
//       const buyer = (user?.email || user?.name || "Buyer") as string;
//       const title = prompt.title || "Prompt";
//       const priceStr = `₹${Number(prompt.price || 0).toLocaleString()}`;

//       // Header bar
//       pdf.setFillColor(23, 23, 26);
//       pdf.rect(0, 0, pageW, 90, "F");
//       pdf.setTextColor(255, 255, 255);
//       pdf.setFontSize(20);
//       pdf.text(brand, 40, 55);
//       pdf.setFontSize(12);
//       pdf.text("Invoice", pageW - 100, 55);

//       // Card
//       const cardX = 40;
//       const cardY = 120;
//       const cardW = pageW - 80;
//       const cardH = 480;
//       pdf.setDrawColor(230);
//       pdf.roundedRect(cardX, cardY, cardW, cardH, 10, 10, "S");

//       // Title
//       pdf.setTextColor(0, 0, 0);
//       pdf.setFontSize(16);
//       pdf.setFont(undefined, "bold");
//       pdf.text("Order Summary", cardX + 20, cardY + 30);
//       pdf.setFont(undefined, "normal");

//       // Divider
//       pdf.setDrawColor(230);
//       pdf.line(cardX + 20, cardY + 40, cardX + cardW - 20, cardY + 40);

//       // Rows
//       pdf.setFontSize(12);
//       const left = cardX + 20;
//       let y = cardY + 70;
//       const row = (k: string, v: string) => {
//         pdf.setFont(undefined, "bold");
//         pdf.text(k, left, y);
//         pdf.setFont(undefined, "normal");
//         pdf.text(v, left + 170, y);
//         y += 24;
//       };

//       row("Order ID:", orderId);
//       row("Purchase Date:", purchaseDate);
//       row("Buyer:", buyer);
//       row("Item:", title);
//       row("License:", "Single-seat perpetual use");
//       row("Status:", "Paid");

//       // Payment summary
//       const boxY = cardY + cardH - 120;
//       pdf.setDrawColor(230);
//       pdf.roundedRect(left, boxY, cardW - 40, 90, 8, 8, "S");
//       pdf.setFont(undefined, "bold");
//       pdf.text("Payment Summary", left + 12, boxY + 22);
//       pdf.setFont(undefined, "normal");

//       const priceRow = (k: string, v: string, off: number) => {
//         pdf.text(k, left + 12, boxY + off);
//         pdf.text(v, left + (cardW - 40) - 12 - pdf.getTextWidth(v), boxY + off);
//       };

//       priceRow("Subtotal:", priceStr, 44);
//       priceRow("Discount:", "₹0", 64);
//       pdf.setFont(undefined, "bold");
//       priceRow("Total:", priceStr, 86);

//       // Footer
//       pdf.setFontSize(10);
//       pdf.setFont(undefined, "normal");
//       pdf.setTextColor(120);
//       pdf.text(
//         "This is a system-generated invoice. For support, contact support@tokun.ai",
//         40,
//         780
//       );

//       pdf.save(`invoice_${orderId}.pdf`);
//     } catch (e) {
//       console.error(e);
//       toast({ title: "Could not create invoice", description: "Please try again." });
//     }
//   }

//   /* =================== Feedback Submit (placeholder) =================== */
//   function handleSubmit() {
//     toast({
//       title: "Feedback submitted",
//       description: feedback ? `Thanks for rating ${feedback} star${feedback > 1 ? "s" : ""}!` : "Thanks for your feedback!",
//     });
//   }

//   return (
//     <>
//       <Dialog open={open} onOpenChange={onOpenChange}>
//         <DialogContent
//           className="
//             bg-[#17171A] text-white p-0 border-none
//             w-[min(96vw,1600px)]
//             max-h-[96vh]
//             rounded-3xl md:rounded-[40px]
//             overflow-hidden flex flex-col
//           "
//         >
//           {/* =================== MEDIA BANNER =================== */}
//           <div
//             className="
//               relative mx-auto
//               w-[calc(100%-3rem)] max-w-[1300px]
//               aspect-[3/2]
//               bg-[#333335]
//               overflow-hidden
//               rounded-[18px] md:rounded-[22px]
//               mt-8
//               shrink-0
//             "
//           >
//             {/* Top-left labels */}
//             <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
//               <span className="px-3 py-1 text-[12px] font-semibold rounded-full text-black bg-white">
//                 {prompt.category?.toUpperCase() || "MARKETING"}
//               </span>
//               <span className="px-3 py-1 text-[12px] font-semibold rounded-full text-black bg-white/80">
//                 ONE-TIME PURCHASE
//               </span>
//             </div>

//             {/* Top-right rating pill (static visual like screenshot) */}
//             <div className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-black/40 backdrop-blur px-2.5 py-1.5 rounded-full">
//               <span className="text-sm">★</span>
//               <span className="text-sm">{(prompt.rating ?? 4.9).toFixed(1)}</span>
//             </div>

//             {/* Media */}
//             <div className="absolute inset-0">
//               {media?.type === "image" ? (
//                 <img
//                   src={media.url}
//                   alt={prompt.title}
//                   className="w-full h-full object-cover"
//                   onError={(e) => ((e.currentTarget as HTMLImageElement).src = "/icons/fallback.png")}
//                 />
//               ) : (
//                 <video
//                   src={media?.url}
//                   className="w-full h-full object-cover"
//                   loop
//                   muted
//                   autoPlay
//                   playsInline
//                 />
//               )}
//             </div>

//             {/* Type hint */}
//             <div className="absolute bottom-3 left-4 flex items-center gap-2 text-sm text-white/80">
//               {media?.type === "image" ? <ImageIcon className="h-5 w-5" /> : <Video className="h-5 w-5" />}
//               <span className="uppercase tracking-wide">{media?.type}</span>
//             </div>
//           </div>

//           {/* =================== DETAILS =================== */}
//           <div
//             className="
//               px-12 md:px-14
//               pt-8 md:pt-10
//               pb-10 md:pb-12
//               min-h-0 flex-1 overflow-y-auto no-scrollbar
//             "
//           >
//             {/* Title row */}
//             <div className="grid grid-cols-[1fr_auto] items-start gap-4 mt-2">
//               <h2 className="font-semibold text-[26px] leading-snug tracking-tight">
//                 {prompt.title}
//               </h2>
//               <span
//                 className="flex items-center justify-center rounded-full justify-self-end"
//                 style={{ backgroundColor: "#333335", width: 42, height: 42 }}
//                 aria-hidden
//               >
//                 <img src="/icons/cop1.png" alt="" className="w-5 h-5 object-contain" />
//               </span>
//             </div>

//             {/* Subheader section (Developer Favourite + subtitle) */}
//             <div className="mt-6">
//               <div className="flex items-center gap-2 text-white/80 text-[14px]">
//                 <span className="inline-flex items-center gap-1 text-white">
//                   <img src="/icons/dtlogo.svg" onError={(e) => ((e.currentTarget as HTMLImageElement).src = "/icons/dtlogo.png")} className="h-4 w-4 object-contain" />
//                   Developer
//                 </span>
//                 <span>favourite</span>
//               </div>
//               <div className="mt-2 text-[18px] font-medium">
//                 Power Your Storefronts with Auto-Generated Descriptions
//               </div>
//               <div className="text-white/70 text-[14px] mt-1">
//                 Generate compelling product descriptions that convert visitors into customers
//               </div>

//               <p className="mt-5 text-white/80 text-[15px] leading-relaxed">
//                 Developer Favourite is an AI-powered e-commerce product description generator designed to make your
//                 products stand out. It helps boost visibility, attract more customers, and increase conversions effortlessly.
//                 Customize tone, style, and length to perfectly match your brand voice. Save time by automating product copy
//                 while keeping your catalog fresh and consistent. Turn every product into a guest favourite with descriptions that truly sell.
//               </p>
//             </div>

//             {/* Feature list — green circular tick items */}
//             <div className="mt-8 space-y-3">
//               {[
//                 "Lifetime access",
//                 "Instant download",
//                 "Pay once, use forever",
//               ].map((f) => (
//                 <div key={f} className="flex items-center gap-3 text-[14px]">
//                   <span className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
//                     <Check className="w-4 h-4 text-white" />
//                   </span>
//                   <span>{f}</span>
//                 </div>
//               ))}
//             </div>

//             {/* Divider */}
//             <div className="border-t border-white/10 mt-8" />

//             {/* Share your feedback — interactive stars */}
//             <div className="mt-6">
//               <div className="text-white/80 text-[14px] mb-2">Share your feedback</div>
//               <div className="flex items-center gap-2">
//                 {[1, 2, 3, 4, 5].map((i) => {
//                   const active = (hover || feedback) >= i;
//                   return (
//                     <button
//                       key={i}
//                       type="button"
//                       aria-label={`Rate ${i} star${i > 1 ? "s" : ""}`}
//                       onMouseEnter={() => setHover(i)}
//                       onMouseLeave={() => setHover(0)}
//                       onClick={() => setFeedback(i)}
//                       className="p-1"
//                     >
//                       {active ? (
//                         <AiFillStar size={24} className="text-[#FF14EF]" />
//                       ) : (
//                         <AiOutlineStar size={24} className="text-white" />
//                       )}
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* Bottom action bar: left = Report Resource, right = Share / Download Invoice / Submit */}
//             <div className="mt-8 flex items-center justify-between">
//               {/* Left: Report */}
//               <ReportResourceTrigger promptId={String(prompt.id)} promptTitle={prompt.title} />

//               {/* Right: Actions */}
//               <div className="flex items-center gap-4">
//                 {/* Share */}
//                 <button
//                   className="flex items-center justify-center gap-2 text-white text-[14px] hover:text-[#FF14EF] transition-all"
//                   onClick={() => setShowRequestModal(true)}
//                 >
//                   <RiShareForwardLine className="w-5 h-5" />
//                   Share
//                 </button>

//                 {/* Download Invoice */}
//                 <button
//                   onClick={handleDownloadInvoice}
//                   disabled={!canDownloadInvoice}
//                   className={`
//                     px-5 h-11 rounded-[8px] border border-white/10 text-[14px]
//                     transition-all
//                     ${canDownloadInvoice
//                       ? "bg-[#1C1C1E] text-white hover:bg-gradient-to-r hover:from-[#5A3FFF] hover:to-[#FF14EF]"
//                       : "bg-[#1C1C1E] text-white/50 cursor-not-allowed opacity-60"}
//                   `}
//                 >
//                   Download Invoice
//                 </button>

//                 {/* Submit */}
//                 <button
//                   onClick={handleSubmit}
//                   className="
//                     px-6 h-11 rounded-[8px] text-white text-[14px] font-medium
//                     bg-white/10 border border-white/15 hover:bg-white/15 transition-colors
//                   "
//                 >
//                   Submit
//                 </button>
//               </div>
//             </div>
//           </div>
//         </DialogContent>
//       </Dialog>

//       {/* Request To Buy Modal */}
//       {prompt && (
//         <RequestToBuyModal
//           open={showRequestModal}
//           onOpenChange={setShowRequestModal}
//           promptId={prompt?.id?.toString() || ""}
//           promptTitle={prompt?.title || ""}
//           price={prompt?.price || 0} // not shown here, but needed by modal props
//           thumbnail={prompt?.imageUrl || ""}
//           userType={user?.userType === "TM" ? "TM" : "ORG"}
//           role={user?.role || ""}
//           ownerEmail={user?.userType === "TM" ? prompt?.ownerEmail || "" : ""}
//         />
//       )}
//     </>
//   );
// }

// /* =========================================================================
//    Report Resource Trigger + Dialog (Create-only, API integrated)
//    ========================================================================= */
// function ReportResourceTrigger({ promptId, promptTitle }: { promptId: string; promptTitle: string }) {
//   const [open, setOpen] = useState(false);
//   return (
//     <>
//       <button
//         type="button"
//         className="text-white text-base hover:opacity-90"
//         onClick={() => setOpen(true)}
//       >
//         Report Resource
//       </button>
//       <ReportResourceDialog open={open} onOpenChange={setOpen} promptId={promptId} promptTitle={promptTitle} />
//     </>
//   );
// }

// type ReportDialogProps = {
//   open: boolean;
//   onOpenChange: (v: boolean) => void;
//   promptId: string;
//   promptTitle?: string; // for context only
// };

// export function ReportResourceDialog({
//   open,
//   onOpenChange,
//   promptId,
// }: ReportDialogProps) {
//   const { token } = useAuth();

//   // form state
//   const [title, setTitle] = useState("");
//   const [url, setUrl] = useState("");
//   const [category, setCategory] = useState("");
//   const [tags, setTags] = useState("");
//   const [reason, setReason] = useState("");
//   const [desc, setDesc] = useState("");
//   const [steps, setSteps] = useState("");
//   const [agree, setAgree] = useState(false);
//   const [files, setFiles] = useState<File[]>([]);
//   const [touchedUrl, setTouchedUrl] = useState(false);

//   // categories
//   const [categories, setCategories] = useState<{ name: string; _id: string }[]>([]);
//   const [loadingCats, setLoadingCats] = useState(false);

//   // submitting
//   const [submitting, setSubmitting] = useState(false);

//   const isValidUrl = (() => {
//     try {
//       if (!url) return false;
//       const u = new URL(url);
//       return !!u.protocol && !!u.host;
//     } catch {
//       return false;
//     }
//   })();

//   function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
//     const list = e.target.files ? Array.from(e.target.files).slice(0, 5) : [];
//     setFiles(list);
//   }

//   useEffect(() => {
//     if (!open) return;
//     (async () => {
//       try {
//         setLoadingCats(true);
//         const r = await fetch(`${API_BASE}/api/category`, {
//           method: "GET",
//           credentials: "include",
//         });
//         const data = await r.json();
//         if (data?.success) setCategories(data.categories || []);
//       } catch (e) {
//         console.error(e);
//         toast({ title: "Failed to load categories", description: "Please try again." });
//       } finally {
//         setLoadingCats(false);
//       }
//     })();
//   }, [open]);

//   async function submit(e: React.FormEvent) {
//     e.preventDefault();
//     if (!token) {
//       toast({ title: "Please log in", description: "You must be logged in to report a resource." });
//       return;
//     }
//     if (!promptId) {
//       toast({ title: "Missing prompt", description: "Prompt ID is required." });
//       return;
//     }
//     if (!reason || !category) {
//       toast({ title: "Missing fields", description: "Select a category and reason." });
//       return;
//     }
//     if (!isValidUrl || !agree) return;

//     try {
//       setSubmitting(true);

//       const form = new FormData();
//       form.append("prompt", promptId);
//       if (title) form.append("resourceTitle", title);
//       form.append("resourceURL", url);
//       form.append("category", category);

//       const tagsArr = tags
//         .split(",")
//         .map((t) => t.trim())
//         .filter(Boolean);
//       form.append("tags", JSON.stringify(tagsArr));

//       form.append("reason", reason);
//       if (desc) form.append("description", desc);
//       if (steps) form.append("stepsToReproduce", steps);

//       files.forEach((f) => form.append("screenshots", f));

//       const r = await fetch(`${API_BASE}/api/promptreport`, {
//         method: "POST",
//         headers: { Authorization: `Bearer ${token}` },
//         body: form,
//         credentials: "include",
//       });

//       const data = await r.json();
//       if (!r.ok || !data?.success) {
//         throw new Error(data?.error || "submit_failed");
//       }

//       toast({ title: "Report submitted", description: "Thanks for your feedback!" });

//       setTitle("");
//       setUrl("");
//       setCategory("");
//       setTags("");
//       setReason("");
//       setDesc("");
//       setSteps("");
//       setFiles([]);
//       setAgree(false);
//       onOpenChange(false);
//     } catch (err: any) {
//       console.error(err);
//       toast({
//         title: "Could not submit report",
//         description: err?.message || "Something went wrong.",
//       });
//     } finally {
//       setSubmitting(false);
//     }
//   }

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent
//         className="
//           bg-[#17171A] text-white border border-white/10
//           w-[min(96vw,640px)]
//           max-h-[95vh]
//           rounded-2xl p-0 overflow-hidden
//         "
//       >
//         <form className="p-5 sm:p-6 overflow-y-auto no-scrollbar max-h-[95vh]" onSubmit={submit}>
//           <h3 className="text-lg font-semibold mb-1">Report a Resource</h3>
//           <p className="text-white/70 text-sm mb-5">
//             Flag broken, outdated, inappropriate, or otherwise problematic resources.
//           </p>

//           <label className="block text-sm mb-1">Resource Title</label>
//           <input
//             type="text"
//             className="w-full h-11 rounded-xl bg-transparent border border-white/15 px-3 mb-4 outline-none"
//             placeholder="e.g., Intro to UX Research"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />

//           <label className="block text-sm mb-1">Resource URL</label>
//           <div className="relative">
//             <input
//               type="url"
//               className={`w-full h-11 rounded-xl bg-transparent border px-3 outline-none ${
//                 touchedUrl && !isValidUrl ? "border-red-500/70 pr-10" : "border-white/15"
//               }`}
//               placeholder="https://example.com/article"
//               value={url}
//               onChange={(e) => setUrl(e.target.value)}
//               onBlur={() => setTouchedUrl(true)}
//             />
//             {touchedUrl && !isValidUrl && (
//               <>
//                 <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-red-400 h-5 w-5" />
//                 <div className="text-red-400 text-xs mt-1">Please enter valid url</div>
//               </>
//             )}
//           </div>

//           <div className="mt-4">
//             <label className="block text-sm mb-1">Category</label>
//             <div className="h-11 rounded-xl px-3 flex items-center border border-white/15 bg-[#17171A]">
//               <select
//                 className="bg-[#17171A] text-white/90 w-full outline-none"
//                 value={category}
//                 onChange={(e) => setCategory(e.target.value)}
//                 disabled={loadingCats}
//               >
//                 <option value="">{loadingCats ? "Loading categories..." : "Select a category"}</option>
//                 {categories.map((c) => (
//                   <option key={c._id} value={c.name}>
//                     {c.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           <div className="mt-4">
//             <label className="block text-sm mb-1">
//               Tags <span className="text-white/50 text-xs">(comma separated)</span>
//             </label>
//             <input
//               type="text"
//               className="w-full h-11 rounded-xl bg-transparent border border-white/15 px-3 outline-none"
//               placeholder="ui/ux, research, prototyping"
//               value={tags}
//               onChange={(e) => setTags(e.target.value)}
//             />
//           </div>

//           <div className="mt-4">
//             <label className="block text-sm mb-1">Reason for Report</label>
//             <div className="h-11 rounded-xl px-3 flex items-center border border-white/15 bg-[#17171A]">
//               <select
//                 className="bg-[#17171A] text-white/90 w-full outline-none"
//                 value={reason}
//                 onChange={(e) => setReason(e.target.value)}
//               >
//                 <option value="">Choose reason</option>
//                 <option value="broken">Broken link / media</option>
//                 <option value="outdated">Outdated</option>
//                 <option value="inappropriate">Inappropriate</option>
//                 <option value="other">Other</option>
//               </select>
//             </div>
//           </div>

//           <div className="mt-4">
//             <label className="block text-sm mb-1">Describe the issue</label>
//             <textarea
//               rows={4}
//               className="w-full rounded-xl bg-transparent border border-white/15 px-3 py-2 outline-none"
//               placeholder="What is wrong with this resource? Include key details."
//               value={desc}
//               onChange={(e) => setDesc(e.target.value)}
//             />
//           </div>

//           <div className="mt-4">
//             <label className="block text-sm mb-1">
//               Attach screenshots <span className="text-white/50 text-xs">(optional)</span>
//             </label>
//             <label
//               className="
//                 w-full h-28 rounded-xl border border-dashed border-white/20
//                 grid place-items-center text-white/60 cursor-pointer
//               "
//             >
//               <input
//                 type="file"
//                 multiple
//                 accept="image/png,image/jpeg,application/pdf"
//                 className="hidden"
//                 onChange={onFileChange}
//               />
//               {files.length === 0 ? "Add up to 5 files" : `${files.length} file(s) selected`}
//             </label>
//             <div className="text-xs text-white/50 mt-2">Up to 5 files. PNG/JPG/PDF.</div>
//           </div>

//           <label className="flex items-start gap-3 mt-4 text-sm">
//             <input
//               type="checkbox"
//               className="mt-0.5"
//               checked={agree}
//               onChange={(e) => setAgree(e.target.checked)}
//             />
//             <span className="text-white/80">
//               I agree that this report complies with the Community Guidelines and Privacy Policy.
//             </span>
//           </label>

//           <div className="flex justify-end gap-3 mt-6">
//             <button
//               type="button"
//               className="h-10 px-4 rounded-xl bg-white/10 border border-white/15"
//               onClick={() => onOpenChange(false)}
//               disabled={submitting}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="
//                 h-10 px-5 rounded-xl text-white
//                 bg-gradient-to-r from-[#5A3FFF] to-[#FF14EF]
//                 disabled:opacity-60 flex items-center gap-2
//               "
//               disabled={!isValidUrl || !agree || !reason || !category || submitting}
//             >
//               {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
//               Submit
//             </button>
//           </div>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }





// src/pages/historyDetail.tsx
import React, { useEffect, useMemo, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Image as ImageIcon,
  Video,
  AlertCircle,
  Loader2,
  Check,
} from "lucide-react";
import { RiShareForwardLine } from "react-icons/ri";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import RequestToBuyModal from "@/components/RequestToBuyModel";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";

/* ================== Types ================== */
export interface MarketplacePrompt {
  id: number | string;
  title: string;
  description: string;
  price: number; // still used by modal props, not displayed here
  rating?: number;
  downloads: number;
  category: string; // e.g., "marketing" or similar domain label for the left badge
  videoUrl?: string;
  imageUrl?: string;
  fullPrompt?: string;
  ownerEmail?: string; // used for TM to show owner email in modal
}

interface DetailsPromptProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  prompt: MarketplacePrompt | null;
  owned?: boolean;
  onPurchase?: (prompt: MarketplacePrompt) => void; // kept for compat if needed later
  showImages?: boolean;
}

/* ================== Config ================== */
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

/* =========================================================================
   MAIN: History Detail — final polished version per your spec
   ========================================================================= */
export default function DetailsPrompt({
  open,
  onOpenChange,
  prompt,
  owned = false,
  onPurchase,
  showImages = false,
}: DetailsPromptProps) {
  const { user } = useAuth();

  const isTM = user?.userType === "TM";
  const isOrgOwnerAdmin =
    user?.userType === "ORG" && (user?.role === "Owner" || user?.role === "Admin");
  const isIND = user?.userType === "IND" || (!user?.userType && !isTM);
  const canDownloadInvoice = isIND || isOrgOwnerAdmin; // disabled only for TM

  // Share modal state
  const [showRequestModal, setShowRequestModal] = useState(false);

  // Feedback stars (interactive)
  const [feedback, setFeedback] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);

  // Media handling
  const media = useMemo(() => {
    if (!prompt) return null;
    const hasVideo = !!prompt.videoUrl?.trim();
    const hasImage = !!prompt.imageUrl?.trim();

    if (showImages || !hasVideo) {
      return {
        type: "image" as const,
        url: hasImage ? prompt.imageUrl! : "/icons/fallback.png",
      };
    } else {
      return { type: "video" as const, url: prompt.videoUrl! };
    }
  }, [prompt, showImages]);

  if (!prompt) return null;

  /* =================== PDF (styled invoice) =================== */
  async function handleDownloadInvoice() {
    if (!canDownloadInvoice) return;

    try {
      // Safer dynamic import for Vite/Next bundlers
      const jsPDFModule = await import("jspdf");
      const jsPDF = jsPDFModule.jsPDF;

      const pdf = new jsPDF({ unit: "pt", format: "a4" });
      const pageW = pdf.internal.pageSize.getWidth();

      const brand = "Tokun.ai";
      const orderId = `ORD-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
      const purchaseDate = new Date().toLocaleString();
      const buyer = (user?.email || user?.name || "Buyer") as string;
      const title = prompt.title || "Prompt";
      const priceStr = `₹${Number(prompt.price || 0).toLocaleString()}`;

      // Header bar
      pdf.setFillColor(23, 23, 26);
      pdf.rect(0, 0, pageW, 90, "F");
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(20);
      pdf.text(brand, 40, 55);
      pdf.setFontSize(12);
      pdf.text("Invoice", pageW - 100, 55);

      // Card
      const cardX = 40;
      const cardY = 120;
      const cardW = pageW - 80;
      const cardH = 480;
      pdf.setDrawColor(230);
      pdf.roundedRect(cardX, cardY, cardW, cardH, 10, 10, "S");

      // Title
      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(16);
      pdf.setFont(undefined, "bold");
      pdf.text("Order Summary", cardX + 20, cardY + 30);
      pdf.setFont(undefined, "normal");

      // Divider
      pdf.setDrawColor(230);
      pdf.line(cardX + 20, cardY + 40, cardX + cardW - 20, cardY + 40);

      // Rows
      pdf.setFontSize(12);
      const left = cardX + 20;
      let y = cardY + 70;
      const row = (k: string, v: string) => {
        pdf.setFont(undefined, "bold");
        pdf.text(k, left, y);
        pdf.setFont(undefined, "normal");
        pdf.text(v, left + 170, y);
        y += 24;
      };

      row("Order ID:", orderId);
      row("Purchase Date:", purchaseDate);
      row("Buyer:", buyer);
      row("Item:", title);
      row("License:", "Single-seat perpetual use");
      row("Status:", "Paid");

      // Payment summary
      const boxY = cardY + cardH - 120;
      pdf.setDrawColor(230);
      pdf.roundedRect(left, boxY, cardW - 40, 90, 8, 8, "S");
      pdf.setFont(undefined, "bold");
      pdf.text("Payment Summary", left + 12, boxY + 22);
      pdf.setFont(undefined, "normal");

      const priceRow = (k: string, v: string, off: number) => {
        pdf.text(k, left + 12, boxY + off);
        pdf.text(v, left + (cardW - 40) - 12 - pdf.getTextWidth(v), boxY + off);
      };

      priceRow("Subtotal:", priceStr, 44);
      priceRow("Discount:", "₹0", 64);
      pdf.setFont(undefined, "bold");
      priceRow("Total:", priceStr, 86);

      // Footer
      pdf.setFontSize(10);
      pdf.setFont(undefined, "normal");
      pdf.setTextColor(120);
      pdf.text(
        "This is a system-generated invoice. For support, contact support@tokun.ai",
        40,
        780
      );

      pdf.save(`invoice_${orderId}.pdf`);
    } catch (e) {
      console.error(e);
      toast({ title: "Could not create invoice", description: "Please try again." });
    }
  }

  /* =================== Feedback Submit (placeholder) =================== */
  function handleSubmit() {
    toast({
      title: "Feedback submitted",
      description: feedback
        ? `Thanks for rating ${feedback} star${feedback > 1 ? "s" : ""}!`
        : "Thanks for your feedback!",
    });
  }

  // Helper: show a single category badge (top-left). Use prompt.category if present; fallback to "MARKETING"
  const topLeftBadge = (prompt.category || "MARKETING").toUpperCase();

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className="
            bg-[#17171A] text-white p-0 border-none
            w-[min(96vw,1800px)]
            max-h-[96vh]
            rounded-3xl md:rounded-[40px]
            overflow-hidden flex flex-col
          "
        >
          {/* =================== MEDIA BANNER =================== */}
          <div
            className="
              relative mx-auto
              w-[calc(100%-3rem)] max-w-[1500px]
              aspect-[3/2]
              bg-[#333335]
              overflow-hidden
              rounded-[18px] md:rounded-[22px]
              mt-8
              shrink-0
            "
          >
            {/* Top-left single badge (category only) */}
            <div className="absolute top-4 left-4 z-10">
              <span className="px-3 py-1 text-[12px] font-semibold rounded-full text-black bg-white">
                {topLeftBadge}
              </span>
            </div>

            {/* (Removed) Top-right secondary badge per your request */}

            {/* Media */}
            <div className="absolute inset-0">
              {media?.type === "image" ? (
                <img
                  src={media.url}
                  alt={prompt.title}
                  className="w-full h-full object-cover"
                  onError={(e) => ((e.currentTarget as HTMLImageElement).src = "/icons/fallback.png")}
                />
              ) : (
                <video
                  src={media?.url}
                  className="w-full h-full object-cover"
                  loop
                  muted
                  autoPlay
                  playsInline
                />
              )}
            </div>

            {/* Type hint */}
            <div className="absolute bottom-3 left-4 flex items-center gap-2 text-sm text-white/80">
              {media?.type === "image" ? <ImageIcon className="h-5 w-5" /> : <Video className="h-5 w-5" />}
              <span className="uppercase tracking-wide">{media?.type}</span>
            </div>
          </div>

          {/* =================== DETAILS =================== */}
          <div
            className="
              px-12 md:px-14
              pt-8 md:pt-10
              pb-10 md:pb-12
              min-h-0 flex-1 overflow-y-auto no-scrollbar
            "
          >
            {/* Title row */}
            <div className="grid grid-cols-[1fr_auto] items-start gap-4 mt-2">
              <h2 className="font-semibold text-[26px] leading-snug tracking-tight">
                {prompt.title}
              </h2>
              <span
                className="flex items-center justify-center rounded-full justify-self-end"
                style={{ backgroundColor: "#333335", width: 42, height: 42 }}
                aria-hidden
              >
                <img src="/icons/cop1.png" alt="" className="w-5 h-5 object-contain" />
              </span>
            </div>

            {/* Developer Favourite block — prominent like before */}
          {/* Developer Favourite block — full width, 150px tall, minimal text */}
{/* Developer Favourite Banner — matches DetailsPrompt look */}
<div
  className="
    mt-8
    bg-[#333335]
    border border-white/10
    rounded-[12px]
    px-6 py-4
    flex items-center justify-between gap-4
    w-full
  "
  style={{ height: "100px" }}
>
  {/* Left: Logo + Text */}
  <div className="flex items-center gap-4 min-w-0">
    <img
      src="/icons/dtlogo.svg"
      onError={(e) => {
        const img = e.currentTarget as HTMLImageElement;
        img.src = "/icons/dtlogo.png";
      }}
      alt="DT Logo"
      className="shrink-0 object-contain h-10 w-10"
    />

    <div className="min-w-0">
      <div className="truncate text-[18px] leading-snug font-medium text-white">
        Power Your Storefronts with Auto-Generated Descriptions
      </div>
      <div className="text-white/70 truncate text-[13px] mt-1 leading-snug">
        Generate compelling product descriptions that convert visitors into customers
      </div>
    </div>
  </div>

  {/* Right: Static Rating */}
  <div className="flex flex-col items-center gap-1 shrink-0">
    <span className="text-[13px] font-semibold leading-none">4.9</span>
    <div className="flex items-center gap-[3px] leading-none">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="15" height="15" viewBox="0 0 24 24">
          <path
            d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
            fill="#FFFFFF"
          />
        </svg>
      ))}
    </div>
  </div>
</div>



            {/* Feature list — green circular tick items */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
    {["Lifetime access", "Instant download", "Pay once, use forever"].map((feature) => (
      <div key={feature} className="flex items-center gap-3 text-[15px] text-white/90">
        <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center">
          <Check className="w-4 h-4 text-white" />
        </div>
        <span>{feature}</span>
      </div>
    ))}
  </div>

            {/* Divider */}
            <div className="border-t border-white/10 mt-8" />

            {/* Share your feedback — interactive stars */}
            <div className="mt-6">
              <div className="text-white/85 text-[14px] mb-2">Share your feedback</div>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((i) => {
                  const active = (hover || feedback) >= i;
                  return (
                    <button
                      key={i}
                      type="button"
                      aria-label={`Rate ${i} star${i > 1 ? "s" : ""}`}
                      onMouseEnter={() => setHover(i)}
                      onMouseLeave={() => setHover(0)}
                      onClick={() => setFeedback(i)}
                      className="p-1"
                    >
                      {active ? (
                        <AiFillStar size={24} className="text-[#FF14EF]" />
                      ) : (
                        <AiOutlineStar size={24} className="text-white" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom action bar: left = Report Resource, right = Share / Download Invoice / Submit */}
            <div className="mt-8 flex items-center justify-between">
              {/* Left: Report */}
              <ReportResourceTrigger promptId={String(prompt.id)} promptTitle={prompt.title} />

              {/* Right: Actions */}
              <div className="flex items-center gap-4">
                {/* Share */}
                <button
                  className="flex items-center justify-center gap-2 text-white text-[14px] hover:text-[#FF14EF] transition-all"
                  onClick={() => setShowRequestModal(true)}
                >
                  <RiShareForwardLine className="w-5 h-5" />
                  Share
                </button>

                {/* Download Invoice */}
                <button
                  onClick={handleDownloadInvoice}
                  disabled={!canDownloadInvoice}
                  className={`
                    px-5 h-11 rounded-[8px] border border-white/10 text-[14px]
                    transition-all
                    ${canDownloadInvoice
                      ? "bg-[#1C1C1E] text-white hover:bg-gradient-to-r hover:from-[#5A3FFF] hover:to-[#FF14EF]"
                      : "bg-[#1C1C1E] text-white/50 cursor-not-allowed opacity-60"}
                  `}
                >
                  Download Invoice
                </button>

                {/* Submit */}
                <button
                  onClick={handleSubmit}
                  className="
                    px-6 h-11 rounded-[8px] text-white text-[14px] font-medium
                    bg-white/10 border border-white/15 hover:bg-white/15 transition-colors
                  "
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Request To Buy Modal */}
      {prompt && (
        <RequestToBuyModal
          open={showRequestModal}
          onOpenChange={setShowRequestModal}
          promptId={prompt?.id?.toString() || ""}
          promptTitle={prompt?.title || ""}
          price={prompt?.price || 0} // not shown in this page, required by modal props
          thumbnail={prompt?.imageUrl || ""}
          userType={user?.userType === "TM" ? "TM" : "ORG"}
          role={user?.role || ""}
          ownerEmail={user?.userType === "TM" ? prompt?.ownerEmail || "" : ""}
        />
      )}
    </>
  );
}

/* =========================================================================
   Report Resource Trigger + Dialog (Create-only, API integrated)
   ========================================================================= */
function ReportResourceTrigger({ promptId, promptTitle }: { promptId: string; promptTitle: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        className="text-white text-base hover:opacity-90"
        onClick={() => setOpen(true)}
      >
        Report Resource
      </button>
      <ReportResourceDialog open={open} onOpenChange={setOpen} promptId={promptId} promptTitle={promptTitle} />
    </>
  );
}

type ReportDialogProps = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  promptId: string;
  promptTitle?: string; // for context only
};

export function ReportResourceDialog({
  open,
  onOpenChange,
  promptId,
}: ReportDialogProps) {
  const { token } = useAuth();

  // form state
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [reason, setReason] = useState("");
  const [desc, setDesc] = useState("");
  const [steps, setSteps] = useState("");
  const [agree, setAgree] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [touchedUrl, setTouchedUrl] = useState(false);

  // categories
  const [categories, setCategories] = useState<{ name: string; _id: string }[]>([]);
  const [loadingCats, setLoadingCats] = useState(false);

  // submitting
  const [submitting, setSubmitting] = useState(false);

  const isValidUrl = (() => {
    try {
      if (!url) return false;
      const u = new URL(url);
      return !!u.protocol && !!u.host;
    } catch {
      return false;
    }
  })();

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const list = e.target.files ? Array.from(e.target.files).slice(0, 5) : [];
    setFiles(list);
  }

  useEffect(() => {
    if (!open) return;
    (async () => {
      try {
        setLoadingCats(true);
        const r = await fetch(`${API_BASE}/api/category`, {
          method: "GET",
          credentials: "include",
        });
        const data = await r.json();
        if (data?.success) setCategories(data.categories || []);
      } catch (e) {
        console.error(e);
        toast({ title: "Failed to load categories", description: "Please try again." });
      } finally {
        setLoadingCats(false);
      }
    })();
  }, [open]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) {
      toast({ title: "Please log in", description: "You must be logged in to report a resource." });
      return;
    }
    if (!promptId) {
      toast({ title: "Missing prompt", description: "Prompt ID is required." });
      return;
    }
    if (!reason || !category) {
      toast({ title: "Missing fields", description: "Select a category and reason." });
      return;
    }
    if (!isValidUrl || !agree) return;

    try {
      setSubmitting(true);

      const form = new FormData();
      form.append("prompt", promptId);
      if (title) form.append("resourceTitle", title);
      form.append("resourceURL", url);
      form.append("category", category);

      const tagsArr = tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
      form.append("tags", JSON.stringify(tagsArr));

      form.append("reason", reason);
      if (desc) form.append("description", desc);
      if (steps) form.append("stepsToReproduce", steps);

      files.forEach((f) => form.append("screenshots", f));

      const r = await fetch(`${API_BASE}/api/promptreport`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: form,
        credentials: "include",
      });

      const data = await r.json();
      if (!r.ok || !data?.success) {
        throw new Error(data?.error || "submit_failed");
      }

      toast({ title: "Report submitted", description: "Thanks for your feedback!" });

      setTitle("");
      setUrl("");
      setCategory("");
      setTags("");
      setReason("");
      setDesc("");
      setSteps("");
      setFiles([]);
      setAgree(false);
      onOpenChange(false);
    } catch (err: any) {
      console.error(err);
      toast({
        title: "Could not submit report",
        description: err?.message || "Something went wrong.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          bg-[#17171A] text-white border border-white/10
          w-[min(96vw,640px)]
          max-h-[95vh]
          rounded-2xl p-0 overflow-hidden
        "
      >
        <form className="p-5 sm:p-6 overflow-y-auto no-scrollbar max-h-[95vh]" onSubmit={submit}>
          <h3 className="text-lg font-semibold mb-1">Report a Resource</h3>
          <p className="text-white/70 text-sm mb-5">
            Flag broken, outdated, inappropriate, or otherwise problematic resources.
          </p>

          <label className="block text-sm mb-1">Resource Title</label>
          <input
            type="text"
            className="w-full h-11 rounded-xl bg-transparent border border-white/15 px-3 mb-4 outline-none"
            placeholder="e.g., Intro to UX Research"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label className="block text-sm mb-1">Resource URL</label>
          <div className="relative">
            <input
              type="url"
              className={`w-full h-11 rounded-xl bg-transparent border px-3 outline-none ${
                touchedUrl && !isValidUrl ? "border-red-500/70 pr-10" : "border-white/15"
              }`}
              placeholder="https://example.com/article"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onBlur={() => setTouchedUrl(true)}
            />
            {touchedUrl && !isValidUrl && (
              <>
                <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-red-400 h-5 w-5" />
                <div className="text-red-400 text-xs mt-1">Please enter valid url</div>
              </>
            )}
          </div>

          <div className="mt-4">
            <label className="block text-sm mb-1">Category</label>
            <div className="h-11 rounded-xl px-3 flex items-center border border-white/15 bg-[#17171A]">
              <select
                className="bg-[#17171A] text-white/90 w-full outline-none"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                disabled={loadingCats}
              >
                <option value="">{loadingCats ? "Loading categories..." : "Select a category"}</option>
                {categories.map((c) => (
                  <option key={c._id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm mb-1">
              Tags <span className="text-white/50 text-xs">(comma separated)</span>
            </label>
            <input
              type="text"
              className="w-full h-11 rounded-xl bg-transparent border border-white/15 px-3 outline-none"
              placeholder="ui/ux, research, prototyping"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm mb-1">Reason for Report</label>
            <div className="h-11 rounded-xl px-3 flex items-center border border-white/15 bg-[#17171A]">
              <select
                className="bg-[#17171A] text-white/90 w-full outline-none"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              >
                <option value="">Choose reason</option>
                <option value="broken">Broken link / media</option>
                <option value="outdated">Outdated</option>
                <option value="inappropriate">Inappropriate</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm mb-1">Describe the issue</label>
            <textarea
              rows={4}
              className="w-full rounded-xl bg-transparent border border-white/15 px-3 py-2 outline-none"
              placeholder="What is wrong with this resource? Include key details."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm mb-1">
              Attach screenshots <span className="text-white/50 text-xs">(optional)</span>
            </label>
            <label
              className="
                w-full h-28 rounded-xl border border-dashed border-white/20
                grid place-items-center text-white/60 cursor-pointer
              "
            >
              <input
                type="file"
                multiple
                accept="image/png,image/jpeg,application/pdf"
                className="hidden"
                onChange={onFileChange}
              />
              {files.length === 0 ? "Add up to 5 files" : `${files.length} file(s) selected`}
            </label>
            <div className="text-xs text-white/50 mt-2">Up to 5 files. PNG/JPG/PDF.</div>
          </div>

          <label className="flex items-start gap-3 mt-4 text-sm">
            <input
              type="checkbox"
              className="mt-0.5"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />
            <span className="text-white/80">
              I agree that this report complies with the Community Guidelines and Privacy Policy.
            </span>
          </label>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              className="h-10 px-4 rounded-xl bg-white/10 border border-white/15"
              onClick={() => onOpenChange(false)}
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="
                h-10 px-5 rounded-xl text-white
                bg-gradient-to-r from-[#5A3FFF] to-[#FF14EF]
                disabled:opacity-60 flex items-center gap-2
              "
              disabled={!isValidUrl || !agree || !reason || !category || submitting}
            >
              {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
              Submit
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
