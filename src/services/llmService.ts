export type LLMProvider = string;

export interface LLMConfig {
  provider: LLMProvider;
  apiKey: string;
  model?: string;
  maxTokens?: number;
}

export interface OptimizeUsage {
  prompt: number;
  completion: number;
  total: number;
}

export interface TokenizerResponse {
  tokens: number;
  words: number;
}

export interface OptimizeResponse {
  optimizedText: string;
  tokens: number;
  words: number;
  suggestions: string[];
  usage?: OptimizeUsage;
}

export interface UserTokenUsage {
  totalTokensUsed: number;
  tokenLimit: number;
}

const DEFAULT_MODEL_BY_PROVIDER: Record<LLMProvider, string> = {
  openai: "gpt-4o-mini",
  perplexity: "llama-3.1-sonar-small-128k-online",
  anthropic: "claude-instant",
  google: "gemini-pro",
  other: "generic",
};

class LLMService {
  private config: LLMConfig = {
    provider: "openai",
    apiKey: "",
    model: "gpt-4o-mini",
  };

  constructor() {
    this.loadConfig();
  }

  private loadConfig() {
    const savedProvider = localStorage.getItem("llm_provider") || "openai";
    const savedApiKey = localStorage.getItem(`${savedProvider}_key`);
    const savedModel =
      localStorage.getItem(`${savedProvider}_model`) ||
      DEFAULT_MODEL_BY_PROVIDER[savedProvider as LLMProvider];

    const defaultKeyFromEnv = import.meta.env.VITE_OPENAI_API_KEY || "";
    const defaultModelFromEnv =
      import.meta.env.VITE_DEFAULT_MODEL ||
      DEFAULT_MODEL_BY_PROVIDER[savedProvider as LLMProvider];

    this.config = {
      provider: savedProvider as LLMProvider,
      apiKey: savedApiKey || (savedProvider === "openai" ? defaultKeyFromEnv : ""),
      model: savedModel || (savedProvider === "openai" ? defaultModelFromEnv : ""),
    };
  }

  private parseJsonObject(content: string): any {
    const trimmed = content?.trim?.() || "";
    const fenceMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
    const candidate = fenceMatch ? fenceMatch[1] : trimmed;

    try {
      return JSON.parse(candidate);
    } catch {}

    const first = candidate.indexOf("{");
    const last = candidate.lastIndexOf("}");
    if (first !== -1 && last !== -1 && last > first) {
      try {
        return JSON.parse(candidate.slice(first, last + 1));
      } catch {}
    }
    throw new Error("Invalid JSON received from model");
  }

  setConfig(config: Partial<LLMConfig>) {
    this.config = { ...this.config, ...config };
    localStorage.setItem("llm_provider", this.config.provider);
    if (this.config.apiKey) {
      localStorage.setItem(`${this.config.provider}_key`, this.config.apiKey);
    }
    if (this.config.model) {
      localStorage.setItem(`${this.config.provider}_model`, this.config.model);
    }
  }

  getConfig(): LLMConfig {
    return { ...this.config };
  }

  async countTokens(text: string): Promise<TokenizerResponse> {
    const words = text.split(/\s+/).filter(Boolean).length;
    let tokenMultiplier = 1.3;

    switch (this.config.provider) {
      case "openai":
        tokenMultiplier = 1.3;
        break;
      case "perplexity":
        tokenMultiplier = 1.35;
        break;
      case "anthropic":
        tokenMultiplier = 1.25;
        break;
      case "google":
        tokenMultiplier = 1.2;
        break;
      default:
        tokenMultiplier = 1.3;
    }

    const tokens = Math.round(words * tokenMultiplier);
    return { tokens, words };
  }

  private extractWordLimit(raw: string): number | null {
    const text = (raw || "").toLowerCase();

    const pat1 = /\b(?:in|within|limit|about|around|approximately|~|approx)\s+(\d{1,4})\s+words?\b/;
    const m1 = text.match(pat1);
    if (m1 && m1[1]) return Math.max(50, Math.min(1200, Number(m1[1])));

    const pat2 = /\b(\d{1,4})\s+words?\b/;
    const m2 = text.match(pat2);
    if (m2 && m2[1]) return Math.max(50, Math.min(1200, Number(m2[1])));

    return null;
  }

  async optimizePrompt(text: string, targetTokens?: number): Promise<OptimizeResponse> {
    if (!this.config.apiKey) throw new Error("API key not set");

    const originalCount = await this.countTokens(text);
    const target = targetTokens || Math.max(Math.floor(originalCount.tokens * 0.7), 10);

    switch (this.config.provider) {
      case "openai":
        return this.optimizeWithOpenAI(text, target);
      case "perplexity":
        return this.optimizeWithPerplexity(text, target);
      case "anthropic":
        return this.optimizeWithAnthropic(text, target);
      case "google":
        return this.optimizeWithGoogle(text, target);
      default:
        return this.optimizeWithOpenAI(text, target);
    }
  }

  /** ✅ Fixed: Optimized prompt (short + 4 alternatives) */
  private async optimizeWithOpenAI(text: string, targetTokens: number): Promise<OptimizeResponse> {
    const model = (this.config.model || "gpt-4o-mini").trim();

    try {
      const res = await fetch("http://localhost:5000/api/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, model, temperature: 0.3, mode: "optimize" }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data?.error || `Backend error (${res.status})`);
      }

      // ✅ FIX: Handle backend response format correctly
      const optimizedText = data?.optimizedText || "";
      const suggestions = data?.suggestions || [];

      if (!optimizedText || optimizedText.trim() === "") {
        throw new Error("Model returned empty content");
      }

      const optimizedCount = await this.countTokens(optimizedText);

      return {
        optimizedText,
        tokens: optimizedCount.tokens,
        words: optimizedCount.words,
        suggestions,
      };
    } catch (error) {
      console.error("OpenAI optimization error:", error);
      throw error;
    }
  }

  /** ✅ Fixed: Generate detailed prompts (150–300 words + 4 variations) */
  async generateDetailedPrompt(text: string): Promise<OptimizeResponse> {
    if (!this.config.apiKey) throw new Error("API key not set");

    const model = (this.config.model || "gpt-4o-mini").trim();

    try {
      const res = await fetch("http://localhost:5000/api/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, model, temperature: 0.2, mode: "detailed" }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || `Backend error (${res.status})`);
      }

      // ✅ FIX: Handle backend response format
      const optimizedText = data?.optimizedText || "";
      const suggestions = data?.suggestions || [];

      if (!optimizedText || optimizedText.trim() === "") {
        console.warn("⚠️ Empty optimizedText from backend:", data);
        throw new Error("Model returned empty content");
      }

      const optimizedCount = await this.countTokens(optimizedText);

      return {
        optimizedText,
        tokens: optimizedCount.tokens,
        words: optimizedCount.words,
        suggestions: Array.isArray(suggestions) ? suggestions : [],
      };
    } catch (error) {
      console.error("Detailed prompt generation error:", error);
      throw error;
    }
  }

  private async optimizeWithPerplexity(text: string, targetTokens: number): Promise<OptimizeResponse> {
    const response = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${this.config.apiKey}` },
      body: JSON.stringify({
        model: this.config.model || "llama-3.1-sonar-small-128k-online",
        messages: [
          { role: "system", content: `You are an advanced Prompt Engineer. Return JSON with optimizedText and suggestions.` },
          { role: "user", content: text },
        ],
        temperature: 0.2,
        max_tokens: 700,
        response_format: { type: "json_object" },
      }),
    });

    const data = await response.json();
    if (data.error) throw new Error(data.error.message || "Error optimizing prompt");

    let result;
    try {
      result = JSON.parse(data.choices[0].message.content);
    } catch {
      throw new Error("Invalid response format from Perplexity");
    }

    const optimizedCount = await this.countTokens(result.optimizedText);
    return {
      optimizedText: result.optimizedText,
      tokens: optimizedCount.tokens,
      words: optimizedCount.words,
      suggestions: result.suggestions || [],
    };
  }

  private async optimizeWithAnthropic(text: string, targetTokens: number): Promise<OptimizeResponse> {
    const originalCount = await this.countTokens(text);
    return { 
      optimizedText: text, 
      tokens: originalCount.tokens, 
      words: originalCount.words, 
      suggestions: ["Anthropic integration pending"] 
    };
  }

  private async optimizeWithGoogle(text: string, targetTokens: number): Promise<OptimizeResponse> {
    const originalCount = await this.countTokens(text);
    return { 
      optimizedText: text, 
      tokens: originalCount.tokens, 
      words: originalCount.words, 
      suggestions: ["Google AI integration pending"] 
    };
  }

  async getUserTokenUsage(): Promise<UserTokenUsage> {
    return { totalTokensUsed: 0, tokenLimit: Number.POSITIVE_INFINITY };
  }

  async incrementUserTokens(): Promise<void> {
    // Implementation for token tracking
  }

  async setUserTokenLimit(): Promise<void> {
    // Implementation for setting token limits
  }
}

export const llmService = new LLMService();