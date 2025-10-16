// src/pages/PromptLibraryPage.tsx
import { useState, useRef, type CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search, ArrowLeft, Eye, Sparkles, TrendingUp, Image as ImageIcon, Video,
  DollarSign, GraduationCap, Palette, FileText, BadgeDollarSign, Users,
  Plane, FlaskConical, Code2, BarChart3, LifeBuoy, Rocket, HeartPulse, Briefcase, Copy, Download, Star
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import Header from "@/components/Header";
import TokenUsageSection from "@/components/TokenUsageSection";
import { useUserTokenUsage } from "@/hooks/useUserTokenUsage";
import Footer from "@/components/Footer";
import AppNavigation from "@/components/AppNavigation";
/* Shared constants */
const GRADIENT = "linear-gradient(270deg, #1A73E8 0%, #FF14EF 100%)";
type Prompt = {
  id: number;
  title: string;
  description: string;
  category: string;          // must match your category ids (e.g. "Code", "Design", etc.)
  tags: string[];
  uses: number;
  rating?: number;
  prompt: string;
  imageUrl?: string;          // will be filled by withImages()
};

const categoriesData = [
  { id: "All", icon: Sparkles },
  { id: "Marketing", icon: TrendingUp },
  { id: "Content", icon: ImageIcon },
  { id: "Social Media", icon: Video },
  { id: "Business", icon: DollarSign },
  { id: "Creative", icon: Sparkles },
  { id: "Education", icon: GraduationCap },
  { id: "Finance", icon: BarChart3 },
  { id: "Productivity", icon: Rocket },
  { id: "Health", icon: HeartPulse },
  { id: "Design", icon: Palette },
  { id: "Writing", icon: FileText },
  { id: "Sales", icon: BadgeDollarSign },
  { id: "HR", icon: Users },
  { id: "Travel", icon: Plane },
  { id: "Research", icon: FlaskConical },
  { id: "Code", icon: Code2 },
  { id: "Data", icon: BarChart3 },
  { id: "Support", icon: LifeBuoy },
  { id: "Enterprise", icon: Briefcase },
];

/* Category scroller (can stay outside the page component) */
const CategoriesScroller: React.FC<{
  selectedCategory: string;
  setSelectedCategory: (c: string) => void;
}> = ({ selectedCategory, setSelectedCategory }) => {
  const railRef = useRef<HTMLDivElement>(null);
  const slide = (dir: "left" | "right") =>
    railRef.current?.scrollBy({ left: dir === "left" ? -260 : 260, behavior: "smooth" });

  return (
    <div className="w-full flex items-center justify-center gap-3">
      <button
        onClick={() => slide("left")}
        className="shrink-0 rounded-full grid place-items-center text-white"
        style={{ background: GRADIENT, width: 50, height: 50, borderRadius: "200px" }}
        aria-label="Scroll categories left"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <div className="relative w-full max-w-[1200px] overflow-hidden">
        <div ref={railRef} className="flex items-center gap-3 overflow-x-auto scroll-smooth px-1 no-scrollbar">
          {categoriesData.map(({ id, icon: Icon }) => {
            const isAll = id === "All";
            const isActive = selectedCategory === id;
            const pillWidth = isAll ? "109.525px" : "185.628px";
            const baseStyle: CSSProperties = isActive
              ? { width: pillWidth, background: GRADIENT, color: "#FFFFFF" }
              : { width: pillWidth, background: "#17171A", color: "rgba(255,255,255,0.85)" };

            return (
              <button
                key={id}
                onClick={() => setSelectedCategory(id)}
                aria-pressed={isActive}
                className={[
                  "flex items-center justify-center gap-[10px] h-[50px] rounded-[200px]",
                  "text-sm font-medium whitespace-nowrap transition-colors",
                  isActive ? "ring-1 ring-white/15" : "hover:bg-white/5"
                ].join(" ")}
                style={{ padding: "15px 30px", ...baseStyle }}
              >
                <Icon className="h-4 w-4" />
                <span>{id}</span>
              </button>
            );
          })}
        </div>
      </div>

      <button
        onClick={() => slide("right")}
        className="shrink-0 rounded-full grid place-items-center text-white"
        style={{ background: GRADIENT, width: 50, height: 50, borderRadius: "200px" }}
        aria-label="Scroll categories right"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
};

const PromptLibraryPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { totalTokensUsed, tokenLimit } = useUserTokenUsage();

  /* ⬇️ move hooks INSIDE the component */
  const [liked, setLiked] = useState<Set<number>>(new Set());
  const toggleLike = (id: number) =>
    setLiked(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  // Use pl1..pl4 from /public/icons
const mockImages = ["/icons/pl1.png", "/icons/pl2.png", "/icons/pl3.png", "/icons/pl4.png"];

const prompts: Prompt[] = [
  {
    id: 1,
    title: "React Component Generator",
    description: "Generate clean, reusable React components with TypeScript and modern patterns",
    category: "Code",
    tags: ["React", "TypeScript", "Components"],
    uses: 1200,
    rating: 4.8,
    prompt:
      "Create a reusable React component with TypeScript that follows best practices for [component type]. Include proper props interface, error handling, and accessibility features.",
  },
  {
    id: 2,
    title: "Brand Logo Design Brief",
    description: "Create comprehensive design briefs for stunning logo creation",
    category: "Design",
    tags: ["Logo", "Branding", "Creative"],
    uses: 890,
    rating: 4.7,
    prompt:
      "Design a comprehensive logo brief for [brand name] in [industry]. Include target audience, brand values, color preferences, style guidelines, and competitive analysis.",
  },
  {
    id: 3,
    title: "Content Marketing Strategy",
    description: "Develop comprehensive content marketing strategies that drive growth",
    category: "Marketing",
    tags: ["Content", "SEO", "Calendar"],
    uses: 1234,
    rating: 4.7,
    prompt:
      "Create a content marketing strategy for [industry/niche]. Include content calendar, distribution channels, SEO optimization, and performance metrics.",
  },
  {
    id: 4,
    title: "Business Plan Generator",
    description: "Generate comprehensive business plans and growth strategies",
    category: "Business",
    tags: ["Strategy", "Finance", "Roadmap"],
    uses: 760,
    rating: 4.6,
    prompt:
      "Create a detailed business plan for [business idea] including market analysis, financial projections, marketing strategy, and growth milestones for the next 3 years.",
  },
];

const withImages = (arr: Prompt[]): Prompt[] =>
  arr.map((p, i) => ({ ...p, imageUrl: mockImages[i % mockImages.length] }));

const promptsWithImages: Prompt[] = withImages(prompts);



const filteredPrompts: Prompt[] = promptsWithImages.filter((p) => {
  const q = searchQuery.toLowerCase();
  const matchesSearch =
    p.title.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q) ||
    p.tags.some((t) => t.toLowerCase().includes(q));
  const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
  return matchesSearch && matchesCategory;
});


  const copyToClipboard = (text: string, title: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied to clipboard", description: `"${title}" prompt has been copied successfully` });
  };

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      {/* Header + back */}
     {/* Header + Token usage aligned on the same row */}
<div className="container mx-auto px-6 py-8">
  <Header />
</div>
    {/* keep the usage card flush with top of header */}
      <div className="container mx-auto px-6 -mt-8">
  <div className="flex justify-center items-start">
    <div className="self-start">
      <TokenUsageSection
        totalTokensUsed={totalTokensUsed}
        tokenLimit={tokenLimit}
      />
    </div>
  </div>
</div>


      <div className="container mx-auto px-6 pb-16">
        {/* Token usage */}
        {/* <TokenUsageSection totalTokensUsed={totalTokensUsed} tokenLimit={tokenLimit} /> */}
        
        {/* Heading + subtext (same font spec as marketplace) */}
        <div className="flex flex-col items-center text-center mb-8">
          <h1
            style={{
              fontFamily: "Inter",
              fontWeight: 400,
              fontStyle: "normal",
              fontSize: "32px",
              lineHeight: "100%",
              letterSpacing: "0%",
              textAlign: "center",
            }}
            className="text-white"
          >
            Prompt Library
          </h1>
          <p
            style={{
              fontFamily: "Inter",
              fontWeight: 500,
              fontStyle: "normal",
              fontSize: "14px",
              lineHeight: "100%",
              letterSpacing: "0%",
              textAlign: "center",
            }}
            className="mt-3 text-white/80 max-w-[520px] leading-tight"
          >
            Discover and use premium AI prompts created by experts from around the world. Transform your ideas into
            reality with our curated collection.
          </p>
        </div>



            <div className="flex flex-col items-center">
  <AppNavigation
    activeSection="prompt-library"
    onSectionChange={(section) => console.log("Section changed:", section)}
  />
  {/* gap below the nav */}
  <div className="mt-6" />
</div>

        {/* Search */}
        <div className="space-y-8 mb-12">
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <div
              className="flex items-center w-full sm:w-[700px] h-[50px] rounded-[200px] overflow-hidden"
              style={{ backgroundColor: "#121213", border: "1px solid #282829" }}
            >
              <Search className="h-5 w-5 text-white/40 ml-4" />
              <input
                placeholder="Search premium prompts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="ml-3 flex-1 bg-transparent outline-none text-white placeholder:text-white/40 text-sm md:text-base"
              />
              <button
                className="text-white font-medium"
                style={{
                  width: "100px",
                  height: "40px",
                  borderRadius: "200px",
                  background: "linear-gradient(90deg, #FF14EF 0%, #1A73E8 100%)",
                  marginRight: "5px",
                }}
              >
                Search
              </button>
            </div>
          </div>

          {/* Categories */}
          <CategoriesScroller selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredPrompts.map((prompt) => (
      <Card
  key={prompt.id}
  className="overflow-hidden"
  style={{
    width: 306,
    height: 500,
    borderRadius: 30,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    background: "#1C1C1C",
    fontFamily: "Inter, sans-serif",
  }}
>
  <CardContent className="p-4 h-full flex flex-col">
    {/* Media */}
    <div
      className="relative w-full overflow-hidden group"
      style={{
        width: 270,
        height: 220,
        borderRadius: 16,
        backgroundColor: "#0B0B0B",
        margin: "0 auto",
      }}
    >
      <img
        src={prompt.imageUrl}
        alt={prompt.title}
        className="w-full h-full object-cover rounded-[16px]"
      />

      <div
        className="absolute top-3 left-3 px-3 py-1 text-[11px] font-semibold text-white rounded-full"
        style={{ background: GRADIENT }}
      >
        {prompt.category.toUpperCase()}
      </div>

      <div className="absolute top-3 right-3">
        <div className="flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-medium text-white bg-black/50 border border-white/30 backdrop-blur-sm">
          <Download className="h-3.5 w-3.5" />
          {prompt.uses} USES
        </div>
      </div>
    </div>

    {/* Text */}
    <div className="mt-4">
      <h3 className="text-[18px] leading-snug font-semibold text-white">
        {prompt.title}
      </h3>
      <p className="mt-2 text-[13px] leading-relaxed text-white/70">
        {prompt.description}
      </p>
    </div>

    {/* Push tags to bottom */}
    <div className="mt-auto">
      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {prompt.tags?.map((tag: string) => (
          <span
            key={tag}
            className="px-3 py-1 text-[12px] rounded-full border border-white/15 text-white/85 bg-white/[0.06]"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Footer row */}
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => toggleLike(prompt.id)}
          className="w-10 h-10 rounded-full grid place-items-center"
          style={{ background: "#333335" }}
          aria-label="Like"
        >
          {liked.has(prompt.id) ? (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-pink-500"
            >
              <path d="M12 21s-6.7-4.35-9.33-7.07A5.91 5.91 0 0 1 3 5.64a5.4 5.4 0 0 1 7.64 0L12 6.99l1.36-1.35a5.4 5.4 0 0 1 7.64 7.64C18.7 16.65 12 21 12 21z" />
            </svg>
          ) : (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              className="text-white/85"
            >
              <path
                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78L12 21l8.84-8.61a5.5 5.5 0 0 0 0-7.78z"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          )}
        </button>

        <button
          className="flex-1 h-10 rounded-full text-white text-[13px] font-medium"
          style={{ background: "#333335" }}
        >
          Use Prompt
        </button>

        <button
          onClick={() => copyToClipboard(prompt.prompt, prompt.title)}
          className="flex-1 h-10 rounded-full text-white text-[13px] font-medium inline-flex items-center justify-center gap-2"
          style={{ background: GRADIENT }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <rect
              x="9"
              y="9"
              width="11"
              height="11"
              rx="2"
              stroke="currentColor"
              strokeWidth="2"
            />
            <rect
              x="4"
              y="4"
              width="11"
              height="11"
              rx="2"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
          Copy
        </button>
      </div>
    </div>
  </CardContent>
</Card>

          ))}
        </div>

        {/* Empty state */}
        {filteredPrompts.length === 0 && (
          <div className="text-center py-16">
            <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "24px", lineHeight: "100%", textAlign: "center" }} className="text-white">
              {`Showing 0 premium prompts in ${selectedCategory || "All"}`}
            </p>
            <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "16px", lineHeight: "100%", textAlign: "center" }} className="mt-3 text-white/80">
              No prompts found matching your criteria.
            </p>
            <button
              type="button"
              onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
              className="mx-auto mt-6 text-white"
              style={{ width: "160px", height: "50px", borderRadius: "10px", border: "1px solid #FFFFFF", background: "transparent" }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
};

export default PromptLibraryPage;
