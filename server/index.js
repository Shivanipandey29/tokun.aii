// server/index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const cron = require("node-cron");
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

// Jobs
const { resetDuePeriods } = require("./utils/jobs/resetPeriods");
const { updateSubscriptionStatuses } = require("./utils/jobs/subscriptionStatusCron");

// Routes
const authRoutes = require("./routes/authRoutes");
const quotaRoutes = require("./routes/quotaRoute");
const smartgenRoutes = require("./routes/smartgenRoutes");
const savedCollectionRoutes = require("./routes/savedCollectionRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const promptRoutes = require("./routes/promptRoutes");
const orgMembers = require("./routes/orgMembers");
const purchaseRoutes = require("./routes/purchaseRoutes");
const llmProviderRoutes = require("./routes/llmproviderRoutes");
const promptoptimizerRoutes = require("./routes/promptoptimizerRoutes");
const promptreportRoutes = require("./routes/promptreportRoutes");
const bankAccountRoutes = require("./routes/bankAccounts");
const billingOrders = require("./routes/billingOrders");
const billingVerify = require("./routes/billingVerify");
const billingHistory = require("./routes/billingHistory");
const feedbackRoutes = require("./routes/feedback");
const cartRoute = require("./routes/cartRoute");
const promptCollab = require("./routes/promptCollab");
const pricingRoutes = require("./routes/pricing");

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ SmartGen LLM Optimization Route (with Self-Correction)
app.post("/api/optimize", async (req, res) => {
  const { text, model = "gpt-4o-mini", temperature = 0.2, mode = "optimize" } = req.body;

  if (!text || !text.trim()) {
    return res.status(400).json({ error: "Missing 'text' field" });
  }
  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: "Server misconfigured: missing OPENAI_API_KEY" });
  }

  console.log(`📩 Optimize request (${mode}) for:`, text.slice(0, 60));

  // 🧠 Select proper system prompt
  const systemPrompt =
    mode === "detailed"
      ? `
You are SmartGen — an expert multi-domain prompt engineer.
Your job is to reframe the user's request into a professional **AI instruction prompt**, not execute it.

🎯 GOAL:
- Begin with a role statement like "You are..." or "Act as..."
- Describe context, tone, and output format.
- Produce 300-500 words total.
- NEVER output the final answer.

Return STRICT JSON ONLY:
{
  "optimizedText": "the AI prompt (300-500 words)",
  "suggestions": ["alt1","alt2","alt3","alt4"]
}`
      : `
You are an AGGRESSIVE TEXT OPTIMIZATION EXPERT. Your ONLY job is to MAXIMIZE token reduction while PERFECTLY PRESERVING core content and meaning.

🎯 SPECIAL RULE FOR "YOU ARE..." / "ACT AS..." PROMPTS:
- If input starts with "You are..." or "Act as..." KEEP THIS EXACT STRUCTURE in output and suggestions
- PRESERVE the role statement exactly as written
- Only optimize the content after the role statement
- NEVER remove or change the opening phrase

🎯 AGGRESSIVE OPTIMIZATION RULES:
- PRESERVE 100% of original meaning, facts, and context
- REDUCE word count by 40-60% (much more aggressive)
- REMOVE all redundant phrases and filler words
- COMBINE multiple sentences into single, dense statements
- USE maximum conciseness without losing meaning
- REPLACE long phrases with shorter equivalents
- MAINTAIN original tone and intent
- NEVER add new information
- NEVER change core facts or message

🎯 AGGRESSIVE TOKEN REDUCTION STRATEGIES:

🔹 FOR "YOU ARE..." PROMPTS:
   Input: "You are an experienced technical writer tasked with creating a comprehensive tutorial aimed at beginners..."
   Output: "You are an experienced technical writer creating comprehensive beginner tutorials..."
   → Keep "You are..." intact, optimize only the task description

🔹 FOR DESCRIPTIVE/NARRATIVE TEXT:
   Input: "Education is one of the most powerful tools for personal and social transformation. It not only provides knowledge and skills but also shapes our character, values, and way of thinking."
   Output: "Education transforms individuals and society by building knowledge, skills, and values."
   → Condense while keeping all key points

🔹 FOR QUESTIONS:
   Input: "what is your name?"
   Output: "Tell me your name?"

🔹 FOR STORIES:
   Input: "One sunny morning, Riya decided to go for a walk in the park near her house where she often spent her weekends relaxing and enjoying nature."
   Output: "One sunny morning, Riya walked in her local park. She rescued a trapped puppy, gave it water, and it followed her home."
   → Same story, 30% fewer words

🔹 FOR INSTRUCTIONS/REQUESTS:
   Input: "You are a marketing strategist tasked with developing a comprehensive marketing strategy for a new product launch in the competitive tech industry."
   Output: "Develop a comprehensive marketing plan for a tech gadget targeting young professionals."
   → More direct, 40% fewer words

🔹 FOR DIRECT REQUESTS:
   Input: "tell me the weather of pune"
   Output: "Current weather in Pune"

🔹 FOR PERSONAL INFO:
   Input: "my name is xyz i wlive in pune i live also in mumbai , i love cooking i like playing cricket , i hate negative people"
   Output: "I'm XYZ from Pune and Mumbai. I enjoy cooking and cricket. I prefer positive people."
   → Corrected, preserved all info, 40% fewer words

🔹 FOR TECHNOLOGY CONTENT:
   Input: "Technology has become an inseparable part of human life, transforming the way we live, work, and communicate. From smartphones and computers to artificial intelligence and robotics, every aspect of modern society is influenced by technological innovation."
   Output: "Technology is integral to human life, transforming how we live, work, and communicate. Smartphones to AI influence every aspect of society."
   → Aggressive reduction while preserving meaning

🎯 AGGRESSIVE OPTIMIZATION TECHNIQUES:
1. ELIMINATE obvious statements and filler words
2. COMBINE related ideas into single powerful sentences
3. REPLACE passive voice with active voice
4. USE stronger, more concise verbs
5. REMOVE redundant adjectives and adverbs
6. SIMPLIFY complex sentence structures
7. MERGE multiple examples into unified statements
8. CUT introductory phrases that don't add value

🎯 TOKEN REDUCTION TARGETS:
- Short paragraphs (50-100 words): 50-60% reduction
- Medium paragraphs (100-200 words): 45-55% reduction  
- Long paragraphs (200+ words): 40-50% reduction
- Always preserve 100% of core meaning and facts

🎯 SUGGESTIONS REQUIREMENTS:
- Provide 3 HIGHLY OPTIMIZED alternative versions
- Each should be 40-60% shorter than original
- All must preserve identical core content
- For "You are..." / "Act as..." prompts: KEEP the exact opening structure in all suggestions
- Use different sentence structures and phrasing
- Maintain readability despite high compression
- Ensure suggestions are comprehensive and similar in length to main optimizedText

Return STRICT JSON ONLY:
{
  "optimizedText": "the aggressively optimized version with maximum token reduction",
  "suggestions": [
    "comprehensive alternative optimized version 1 with similar length and detail",
    "comprehensive alternative optimized version 2 with similar length and detail", 
    "comprehensive alternative optimized version 3 with similar length and detail"
  ]
}`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model,
        temperature,
        max_tokens: 1200,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: text },
        ],
        response_format: { type: "json_object" },
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error("❌ OpenAI API Error:", data);
      return res.status(response.status).json({ error: data?.error?.message || "OpenAI error" });
    }

    const content = data?.choices?.[0]?.message?.content?.trim?.() || "";

    if (!content) {
      console.error("⚠️ Empty response from model:", data);
      return res.status(502).json({
        error: "Empty content from model",
        fallback: { optimizedText: text, suggestions: [] },
      });
    }

    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch {
      console.warn("⚠️ Invalid JSON returned. Wrapping raw content.");
      parsed = { optimizedText: content, suggestions: [] };
    }

    // 🔍 Calculate metrics for OPTIMIZE mode
    if (mode === "optimize") {
      const originalWords = text.split(/\s+/).length;
      const optimizedWords = parsed.optimizedText.split(/\s+/).length;
      const reduction = Math.round(((originalWords - optimizedWords) / originalWords) * 100);
      
      console.log(`✅ Optimization successful. Word reduction: ${originalWords} → ${optimizedWords} (${reduction}%)`);

      // Add reduction metrics
      parsed.metrics = {
        originalWordCount: originalWords,
        optimizedWordCount: optimizedWords,
        reductionPercentage: reduction
      };

      // SPECIAL PROCESSING FOR "YOU ARE..." / "ACT AS..." PROMPTS
      const isRolePrompt = text.toLowerCase().startsWith("you are") || text.toLowerCase().startsWith("act as");
      
      if (isRolePrompt) {
        console.log("🔍 Detected role prompt - ensuring structure preservation");
        
        // Extract the exact opening phrase from original text
        const openingMatch = text.match(/^(you are|act as)[^.!?]*/i);
        const exactOpening = openingMatch ? openingMatch[0] : null;

        if (exactOpening) {
          // Ensure main output keeps the exact opening structure
          const hasCorrectOpening = parsed.optimizedText.toLowerCase().startsWith("you are") || 
                                   parsed.optimizedText.toLowerCase().startsWith("act as");
          
          if (!hasCorrectOpening) {
            // Remove any existing incorrect opening and add the exact one
            const cleanedText = parsed.optimizedText.replace(/^(you are|act as)[^.!?]*/i, '').trim();
            parsed.optimizedText = `${exactOpening} ${cleanedText}`;
          }

          // Ensure suggestions keep the exact opening structure
          if (parsed.suggestions && Array.isArray(parsed.suggestions)) {
            parsed.suggestions = parsed.suggestions.map(suggestion => {
              const suggestionHasOpening = suggestion.toLowerCase().startsWith("you are") || 
                                         suggestion.toLowerCase().startsWith("act as");
              
              if (!suggestionHasOpening) {
                const cleanedSuggestion = suggestion.replace(/^(you are|act as)[^.!?]*/i, '').trim();
                return `${exactOpening} ${cleanedSuggestion}`;
              }
              return suggestion;
            });
          }
        }
      }

      // Post-process to ensure suggestions are proper length and format
      if (parsed.suggestions && Array.isArray(parsed.suggestions)) {
        parsed.suggestions = parsed.suggestions.map(suggestion => {
          // If suggestion is too short, enhance it
          const mainLength = parsed.optimizedText.length;
          if (suggestion.length < mainLength * 0.3) {
            return suggestion + " - Comprehensive approach";
          }
          return suggestion;
        });
        
        // 🔥 NEW: Remove duplicates and similar suggestions FIRST
        const uniqueSuggestions = [];
        parsed.suggestions.forEach(suggestion => {
          // Check if suggestion is too similar to optimizedText
          const isTooSimilar = suggestion.includes(parsed.optimizedText) && 
                               suggestion.length < parsed.optimizedText.length * 1.5;
          
          // Check if suggestion is duplicate
          const isDuplicate = uniqueSuggestions.some(existing => 
            existing.toLowerCase() === suggestion.toLowerCase() ||
            existing.replace(/\s+/g, ' ') === suggestion.replace(/\s+/g, ' ')
          );
          
          if (!isTooSimilar && !isDuplicate) {
            uniqueSuggestions.push(suggestion);
          }
        });
        
        parsed.suggestions = uniqueSuggestions;
        
        // 🔥 NEW: Ensure we have exactly 3 UNIQUE suggestions
        while (parsed.suggestions.length < 3) {
          const uniqueAlternatives = [
            "Alternative phrasing with same meaning",
            "Different structure preserving core content", 
            "Reworded version maintaining original intent"
          ];
          
          const uniqueSuggestion = parsed.optimizedText + " - " + uniqueAlternatives[parsed.suggestions.length];
          
          if (!parsed.suggestions.includes(uniqueSuggestion)) {
            parsed.suggestions.push(uniqueSuggestion);
          } else {
            parsed.suggestions.push(uniqueSuggestion + " (Variation)");
          }
        }
        
        // Final duplicate removal
        parsed.suggestions = [...new Set(parsed.suggestions)];
      }
    } // 
    // 🔍 Detect if it mistakenly generated an answer (not a prompt) - only for detailed mode
    if (mode === "detailed") {
      const looksLikeExecution =
        /(?:^|\b)(develop|create|design|write|generate|explain|plan|analyze|summarize|conduct)\b/i.test(
          parsed?.optimizedText || ""
        ) &&
        !parsed?.optimizedText?.toLowerCase().includes("you are") &&
        !parsed?.optimizedText?.toLowerCase().includes("act as");

      // 🔁 Self-correction step for detailed mode only
      if (looksLikeExecution) {
        console.log("🔁 Model produced an answer instead of a prompt → retrying...");

        const retryPrompt = `
You mistakenly created a *final answer* instead of an *AI instruction prompt*.
Rewrite it into a single instruction starting with "You are..." or "Act as...".
Return JSON ONLY:
{"optimizedText":"rewritten prompt","suggestions":["alt1","alt2","alt3","alt4"]}
`;

        const retryResponse = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model,
            temperature: 0.2,
            max_tokens: 500,
            messages: [
              { role: "system", content: retryPrompt },
              { role: "user", content: parsed?.optimizedText || content },
            ],
            response_format: { type: "json_object" },
          }),
        });

        const retryData = await retryResponse.json();
        const retryContent = retryData?.choices?.[0]?.message?.content?.trim?.() || "";

        if (!retryContent) {
          console.error("⚠️ Retry also returned empty content");
          return res.status(502).json({
            error: "Model retry failed",
            fallback: parsed,
          });
        }

        let retryParsed;
        try {
          retryParsed = JSON.parse(retryContent);
        } catch {
          retryParsed = { optimizedText: retryContent, suggestions: [] };
        }

        console.log("✅ Self-correction successful.");
        return res.json(retryParsed);
      }
    }

    console.log("✅ Optimization successful. Mode:", mode, "Suggestions:", parsed.suggestions?.length || 0);
    return res.json(parsed);
  } catch (err) {
    console.error("🔥 Optimize route failed:", err);
    return res.status(500).json({ error: "Failed to contact OpenAI" });
  }
});

// Health check
app.get("/health", (_req, res) => res.json({ ok: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/org/members", orgMembers);
app.use("/api/quota", quotaRoutes);
app.use("/api/smartgen", smartgenRoutes);
app.use("/api/saved-collections", savedCollectionRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/prompt", promptRoutes);
app.use("/api/purchase", purchaseRoutes);
app.use("/api/llm-provider", llmProviderRoutes);
app.use("/api/promptoptimizer", promptoptimizerRoutes);
app.use("/api/promptreport", promptreportRoutes);
app.use("/api/bankaccount", bankAccountRoutes);
app.use("/api/routes/pricing", pricingRoutes);
app.use("/api/plans/subscribe/order", billingOrders);
app.use("/api/plans/subscribe/verify", billingVerify);
app.use("/api/plans/subscribe/history", billingHistory);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/cart", cartRoute);
app.use("/api/prompt-collab", promptCollab);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "sample.html"));
});

// ✅ Crons
cron.schedule("5 * * * *", async () => {
  try {
    await resetDuePeriods();
  } catch (e) {
    console.error("resetDuePeriods failed", e);
  }
});

cron.schedule("* * * * *", async () => {
  try {
    await updateSubscriptionStatuses();
  } catch (e) {
    console.error("status cron failed", e);
  }
});

// ✅ DB + Server
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;

if (!MONGO_URI) {
  console.error("❌ Missing MONGO_URI / MONGODB_URI in .env");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, ssl: true })
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  });

console.log("daily quota reset");