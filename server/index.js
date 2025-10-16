// // server/index.js
// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const path = require("path");
// const cron = require("node-cron");
// const { resetDuePeriods } = require("./utils/jobs/resetPeriods");
// const { updateSubscriptionStatuses } = require("./utils/jobs/subscriptionStatusCron");


// const authRoutes = require("./routes/authRoutes");
// const quotaRoutes = require("./routes/quotaRoute");
// const smartgenRoutes = require("./routes/smartgenRoutes");
// const savedCollectionRoutes=require("./routes/savedCollectionRoutes");
// const categoryRoutes=require("./routes/categoryRoutes");
// const promptRoutes= require("./routes/promptRoutes");
// const orgMembers= require("./routes/orgMembers");

// const purchaseRoutes= require("./routes/purchaseRoutes");
// const llmProviderRoutes = require("./routes/llmproviderRoutes");
// const promptoptimizerRoutes=require("./routes/promptoptimizerRoutes");
// const promptreportRoutes=require("./routes/promptreportRoutes");
// const bankAccountRoutes=require("./routes/bankAccounts");

// //plan purchase
// const billingOrders=require("./routes/billingOrders");
// const billingVerify=require("./routes/billingVerify");

// const billingHistory=require("./routes/billingHistory");
// const feedbackRoutes = require("./routes/feedback");

// const cartRoute=require("./routes/cartRoute");
// const promptCollab=require("./routes/promptCollab");


// const pricingRoutes=require("./routes/pricing");
 




// const app = express();
// app.use(cors({
//   origin: "http://localhost:5173", // ✅ not "*"
//   credentials: true,               // ✅ allow cookies/headers
// }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));        // for application/x-www-form-urlencoded

// // Health
// app.get("/health", (_req, res) => res.json({ ok: true }));
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/org/members",orgMembers);
// app.use("/api/quota",quotaRoutes);
// app.use("/api/smartgen",smartgenRoutes);
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// app.use("/api/saved-collections", savedCollectionRoutes);
// app.use("/api/category",categoryRoutes);
// app.use("/api/prompt",promptRoutes);
// app.use("/api/purchase",purchaseRoutes);
// app.use("/api/llm-provider", llmProviderRoutes);
// app.use("/api/promptoptimizer", promptoptimizerRoutes);
// app.use("/api/promptreport", promptreportRoutes);
// app.use("/api/bankaccount", bankAccountRoutes);


// app.use("/api/routes/pricing", pricingRoutes);
// //app.use(require("./routes/orgMembers"));
// //app.use(require("./routes/orgMembersReassign"));
// //app.use(require("./routes/orgMembersRevoke"));
// //app.use(require("./routes/orgExtraTokens"));


// app.use("/api/plans/subscribe/order",billingOrders);

// app.use("/api/plans/subscribe/verify",billingVerify)

// app.use("/api/plans/subscribe/history",billingHistory);

// app.use("/api/feedback", feedbackRoutes);

// app.use("/api/cart",cartRoute);

// app.use("/api/prompt-collab/",promptCollab);




// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "sample.html"));
// });



// // ✅ Schedule the cron after everything is initialized
// cron.schedule("5 * * * *", async () => {
//   try {
//     await resetDuePeriods();
//   } catch (e) {
//     console.error("resetDuePeriods failed", e);
//   }
// });

// // run every minute (for testing); in prod, hourly is fine
// cron.schedule("* * * * *", async () => {
//   try { await updateSubscriptionStatuses(); } catch (e) { console.error("status cron failed", e); }
// });

// const PORT = process.env.PORT || 5000; 
// const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;

// if (!MONGO_URI) {
//   console.error("❌ Missing MONGO_URI / MONGODB_URI in .env");
//   process.exit(1);
// }

// mongoose
//   .connect(MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     ssl:true,
//   })
//   .then(() => {
//     console.log("✅ MongoDB connected");
//     app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
//   })
//   .catch((err) => {
//     console.error("❌ MongoDB connection failed:", err);
//     process.exit(1);
//   });
// // After successful mongoose.connect(...)
// console.log("daily quota reset");




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

// ✅ Proxy route for LLM optimization
// ✅ Proxy route for LLM optimization — Final Version
app.post("/api/optimize", async (req, res) => {
  const { text, model = "gpt-4o-mini", temperature = 0.2, mode = "optimize" } = req.body;

  if (!text || text.trim() === "") {
    return res.status(400).json({ error: "Missing 'text' field" });
  }
  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: "Server misconfigured: missing OPENAI_API_KEY" });
  }

  console.log(`📩 Optimize request (${mode}) for:`, text.slice(0, 60));

  let systemPrompt = "";
  if (mode === "detailed") {
    systemPrompt = `
      You are an expert prompt engineer.
      Write a DETAILED, well-structured, professional prompt based on the user's topic.
      Return STRICT JSON ONLY:
      {"optimizedText": "detailed optimized prompt","suggestions":["alt1","alt2","alt3","alt4"]}

      - 'optimizedText' should be a full, detailed prompt (150–300 words) with context, style, and structure.
      - 'suggestions' should contain 4 strong alternative prompt phrasings.
      - Do NOT include markdown code fences or explanations.
    `;
  } else {
    systemPrompt = `
      You are an expert prompt optimizer.
      Return STRICT JSON ONLY:
      {"optimizedText": "optimized short version","suggestions":["alt1","alt2","alt3","alt4"]}

      - optimizedText: improved, shorter version of the user's prompt
      - suggestions: 4 alternative versions with different styles
      - NO markdown, code fences, or explanations
    `;
  }

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
        max_tokens: 800,
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

    const content = data?.choices?.[0]?.message?.content;
    if (!content || !content.trim()) {
      return res.status(502).json({ error: "Model returned empty content" });
    }

    return res.json(data);
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

// ✅ DB + server
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
