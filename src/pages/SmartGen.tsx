
// src/pages/SmartGen.tsx
// src/pages/SmartGen.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

import Header from "@/components/Header";
import SmarterPrompt from "@/components/SmarterPrompt";
import TokenUsageSection from "@/components/TokenUsageSection";
import AppNavigation from "@/components/AppNavigation";
import Footer from "@/components/Footer";

export default function SmartGenPage() {
  const { isAuthenticated, refreshQuota } = useAuth();
  const navigate = useNavigate();

  const handleSmartgenPromptGenerated = async (prompt: string) => {
    console.log("SmartGen: Prompt generated, refreshing quota...");
    try {
      await refreshQuota();
      console.log("SmartGen: Token count refreshed successfully");
    } catch (error) {
      console.error("SmartGen: Refresh failed", error);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="dark min-h-screen text-foreground" style={{ backgroundColor: "#030406" }}>
      <div className="container mx-auto px-4 py-6">
        <Header />

        <div className="mt-4 flex justify-center">
          <TokenUsageSection />
        </div>

        <div className="mt-6 text-center">
          <h2
            style={{
              fontFamily: "Inter, ui-sans-serif, system-ui",
              fontWeight: 600,
              fontSize: 32,
              lineHeight: "100%",
              color: "#ffffff",
              margin: 0,
            }}
          >
            What would you like to create today?
          </h2>
        </div>

        <div className="mt-4 flex justify-center">
          <AppNavigation />
        </div>

        <div className="mt-8 text-center">
          <h1 style={{ margin: 0 }}>
            <span style={{ fontFamily: "Inter", fontWeight: 600, fontSize: 32, color: "#ffffff" }}>
              Smartgen –
            </span>
            <span style={{ fontFamily: "Inter, ui-sans-serif, system-ui", fontWeight: 400, fontSize: 32, color: "#ffffff" }}>
              {" "}Get detailed prompts{" "}
            </span>
            <span style={{ fontFamily: '"DM Serif Text"', fontWeight: 400, fontStyle: "italic", fontSize: 32, color: "#ffffff" }}>
              for any topic.
            </span>
          </h1>
        </div>

        <div className="mt-6">
          <SmarterPrompt
            onPromptGenerated={handleSmartgenPromptGenerated}
            onUseInOptimizer={(text) => {
              navigate("/prompt-optimization", { state: { initialText: text } });
            }}
          />
        </div>
      </div>

      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
}