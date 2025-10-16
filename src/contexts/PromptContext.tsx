// import React, { createContext, useContext, useState, useEffect } from "react";
 
// interface PromptState {
//   userPrompt: string;
//   detailedPrompt: string;
//   setUserPrompt: (prompt: string) => void;
//   setDetailedPrompt: (prompt: string) => void;
//   clearPrompts: () => void;
// }
 
// const PromptContext = createContext<PromptState | undefined>(undefined);
 
// export const PromptProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [userPrompt, setUserPrompt] = useState<string>(
//     localStorage.getItem("userPrompt") || ""
//   );
//   const [detailedPrompt, setDetailedPrompt] = useState<string>(
//     localStorage.getItem("detailedPrompt") || ""
//   );
 
//   useEffect(() => {
//     localStorage.setItem("userPrompt", userPrompt);
//   }, [userPrompt]);
 
//   useEffect(() => {
//     localStorage.setItem("detailedPrompt", detailedPrompt);
//   }, [detailedPrompt]);
 
//   const clearPrompts = () => {
//     setUserPrompt("");
//     setDetailedPrompt("");
//     localStorage.removeItem("userPrompt");
//     localStorage.removeItem("detailedPrompt");
//   };
 
//   return (
//     <PromptContext.Provider value={{ userPrompt, detailedPrompt, setUserPrompt, setDetailedPrompt, clearPrompts }}>
//       {children}
//     </PromptContext.Provider>
//   );
// };
 
// export const usePrompt = () => {
//   const context = useContext(PromptContext);
//   if (context === undefined) {
//     throw new Error("usePrompt must be used within a PromptProvider");
//   }
//   return context;
// };


import React, { createContext, useContext, useState } from "react";
 
interface PromptState {
  userPrompt: string;
  detailedPrompt: string;
  setUserPrompt: (prompt: string) => void;
  setDetailedPrompt: (prompt: string) => void;
  clearPrompts: () => void;
}
 
const PromptContext = createContext<PromptState | undefined>(undefined);
 
export const PromptProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userPrompt, setUserPromptState] = useState<string>(
    localStorage.getItem("userPrompt") || ""
  );
  const [detailedPrompt, setDetailedPromptState] = useState<string>(
    localStorage.getItem("detailedPrompt") || ""
  );
 
  // ⚡ Immediate and consistent sync to localStorage
  const setUserPrompt = (prompt: string) => {
    setUserPromptState(prompt);
    if (prompt.trim() === "") {
      localStorage.removeItem("userPrompt");
    } else {
      localStorage.setItem("userPrompt", prompt);
    }
  };
 
  const setDetailedPrompt = (prompt: string) => {
    setDetailedPromptState(prompt);
    if (prompt.trim() === "") {
      localStorage.removeItem("detailedPrompt");
    } else {
      localStorage.setItem("detailedPrompt", prompt);
    }
  };
 
  // 🧹 Used by SmartGen’s “Clear” and by manual input clearing
  const clearPrompts = () => {
    setUserPromptState("");
    setDetailedPromptState("");
    localStorage.removeItem("userPrompt");
    localStorage.removeItem("detailedPrompt");
  };
 
  return (
    <PromptContext.Provider
      value={{
        userPrompt,
        detailedPrompt,
        setUserPrompt,
        setDetailedPrompt,
        clearPrompts,
      }}
    >
      {children}
    </PromptContext.Provider>
  );
};
 
export const usePrompt = () => {
  const context = useContext(PromptContext);
  if (!context) {
    throw new Error("usePrompt must be used within a PromptProvider");
  }
  return context;
};