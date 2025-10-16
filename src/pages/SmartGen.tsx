// // src/pages/SmartGen.tsx
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "@/contexts/AuthContext";
// // import MemberModal from "@/pages/Admin"; // or wherever it's exported
// // import { MemberModal } from "@/pages/Admin";

// import Header from "@/components/Header";
// import SmarterPrompt from "@/components/SmarterPrompt";
// import TokenUsageSection from "@/components/TokenUsageSection";
// import AppNavigation from "@/components/AppNavigation";
// import Footer from "@/components/Footer";
// // Extension-safe storage helpers (same pattern as your Index page)
// const isExtensionContext =
//   typeof chrome !== "undefined" && chrome.storage && chrome.storage.local;

// const getChromeStorage = (key: string, defaultValue: any): Promise<any> => {
//   return new Promise((resolve) => {
//     if (isExtensionContext) {
//       chrome.storage.local.get([key], (result) => {
//         resolve(result[key] !== undefined ? result[key] : defaultValue);
//       });
//     } else {
//       const value = localStorage.getItem(key);
//       resolve(value !== null ? JSON.parse(value) : defaultValue);
//     }
//   });
// };

// const setChromeStorage = (key: string, value: any): void => {
//   if (isExtensionContext) {
//     chrome.storage.local.set({ [key]: value });
//   } else {
//     localStorage.setItem(key, JSON.stringify(value));
//   }
// };

// export default function SmartGenPage() {
//   const { isAuthenticated } = useAuth();
//   const navigate = useNavigate();
//   console.log("after successfull" , isAuthenticated)
//   // Token usage state (to show in TokenUsageSection)
//   const [totalTokensUsed, setTotalTokensUsed] = useState(0);
//   const [tokenLimit, setTokenLimit] = useState(100000);
    
//   useEffect(() => {
//     (async () => {
//       const savedTokens = await getChromeStorage("total_tokens_used", 0);
//       setTotalTokensUsed(Number(savedTokens));

//       const savedLimit = await getChromeStorage("token_limit", 100000);
//       setTokenLimit(Number(savedLimit));
//     })();
//   }, []);





//   const [showAddMemberModal, setShowAddMemberModal] = useState(false);

// useEffect(() => {
//   const shouldShow = localStorage.getItem("showAddMemberPopup") === "true";
//   if (shouldShow) {
//     setShowAddMemberModal(true);
//   }
// }, []);


// const handleCloseModal = () => {
//   setShowAddMemberModal(false);
//   localStorage.removeItem("showAddMemberPopup");
// };


//   // When Smartgen generates a detailed prompt, add its token cost
//   const handleSmartgenPromptGenerated = (prompt: string) => {
//     const generatedTokens = Math.ceil(prompt.length / 4);
//     const newTotal = totalTokensUsed + generatedTokens;
//     setTotalTokensUsed(newTotal);
//     setChromeStorage("total_tokens_used", newTotal);
//   };

//   if (!isAuthenticated) return null;

//   return (
//     <div className="dark min-h-screen text-foreground" style={{ backgroundColor: "#030406" }}>
//       <div className="container mx-auto px-4 py-6">
//         <Header />



//          <div className="mt-4 flex justify-center">
//           <TokenUsageSection totalTokensUsed={totalTokensUsed} tokenLimit={tokenLimit} />
//           {/* <TokenUsageSection /> */}

//         </div>



//     <div className="mt-6 text-center">
//           <h2
//             style={{
//               fontFamily: "Inter, ui-sans-serif, system-ui",
//               fontWeight: 600, // Semi Bold
//               fontStyle: "normal",
//               fontSize: 32,
//               lineHeight: "100%",
//               letterSpacing: 0,
//               color: "#ffffff",
//               margin: 0,
//             }}
//           >
//             What would you like to create today?
//           </h2>
//         </div>


//         {/* App Navigation */}
//         <div className="mt-4 flex justify-center">
//           <AppNavigation />
//         </div>

//         {/* The line you requested BETWEEN nav and token usage */}
         

//         {/* Centered Token Usage (below the line above) */}
        
//         {/* Smartgen tagline + editor */}
//         <div className="mt-8 text-center">
//           <h1 style={{ margin: 0 }}>
//             <span
//               style={{
//                 fontFamily: "Inter",
//                 fontWeight: 600, // Semi Bold
//                 fontStyle: "normal",
//                 fontSize: 32,
//                 lineHeight: "100%",
//                 letterSpacing: 0,
//                 color: "#ffffff",
//               }}
//             >
//               Smartgen –{" "}
//             </span>
//             <span
//               style={{
//                 fontFamily: "Inter, ui-sans-serif, system-ui",
//                 fontWeight: 400, // Regular
//                 fontStyle: "normal",
//                 fontSize: 32,
//                 lineHeight: "100%",
//                 letterSpacing: 0,
//                 color: "#ffffff",
//               }}
//             >
//               Get detailed prompts{" "}
//             </span>
//             <span
//               style={{
//                 fontFamily: '"DM Serif Text"',
//                 fontWeight: 400,
//                 fontStyle: "italic",
//                 fontSize: 32,
//                 lineHeight: "100%",
//                 letterSpacing: 0,
//                 color: "#ffffff",
//               }}
//             >
//             for any topic.
//             </span>
//           </h1>
//         </div>


//         <div className="mt-6">
//           <SmarterPrompt
//             onPromptGenerated={handleSmartgenPromptGenerated}
//             onUseInOptimizer={(text) => {
//               // pass generated text to the optimizer page
//               navigate("/prompt-optimization", { state: { initialText: text } });
//             }}
//           />
//         </div>
//       </div>
//         <div className="mt-20">
   

//         <Footer />
        
//       </div>
//     </div>
//   );
// }








// src/pages/SmartGen.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

import Header from "@/components/Header";
import SmarterPrompt from "@/components/SmarterPrompt";
import TokenUsageSection from "@/components/TokenUsageSection";
import AppNavigation from "@/components/AppNavigation";
import Footer from "@/components/Footer";
// Extension-safe storage helpers (same pattern as your Index page)
const isExtensionContext =
  typeof chrome !== "undefined" && chrome.storage && chrome.storage.local;

const getChromeStorage = (key: string, defaultValue: any): Promise<any> => {
  return new Promise((resolve) => {
    if (isExtensionContext) {
      chrome.storage.local.get([key], (result) => {
        resolve(result[key] !== undefined ? result[key] : defaultValue);
      });
    } else {
      const value = localStorage.getItem(key);
      resolve(value !== null ? JSON.parse(value) : defaultValue);
    }
  });
};

const setChromeStorage = (key: string, value: any): void => {
  if (isExtensionContext) {
    chrome.storage.local.set({ [key]: value });
  } else {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export default function SmartGenPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  console.log("after successfull" , isAuthenticated)
  // Token usage state (to show in TokenUsageSection)
  const [totalTokensUsed, setTotalTokensUsed] = useState(0);
  const [tokenLimit, setTokenLimit] = useState(100000);

  useEffect(() => {
    (async () => {
      const savedTokens = await getChromeStorage("total_tokens_used", 0);
      setTotalTokensUsed(Number(savedTokens));

      const savedLimit = await getChromeStorage("token_limit", 100000);
      setTokenLimit(Number(savedLimit));
    })();
  }, []);

  // When Smartgen generates a detailed prompt, add its token cost
  const handleSmartgenPromptGenerated = (prompt: string) => {
    const generatedTokens = Math.ceil(prompt.length / 4);
    const newTotal = totalTokensUsed + generatedTokens;
    setTotalTokensUsed(newTotal);
    setChromeStorage("total_tokens_used", newTotal);
  };

  if (!isAuthenticated) return null;

  return (
    <div className="dark min-h-screen text-foreground" style={{ backgroundColor: "#030406" }}>
      <div className="container mx-auto px-4 py-6">
        <Header />



         <div className="mt-4 flex justify-center">
          <TokenUsageSection totalTokensUsed={totalTokensUsed} tokenLimit={tokenLimit} />
          {/* <TokenUsageSection /> */}

        </div>

    <div className="mt-6 text-center">
          <h2
            style={{
              fontFamily: "Inter, ui-sans-serif, system-ui",
              fontWeight: 600, // Semi Bold
              fontStyle: "normal",
              fontSize: 32,
              lineHeight: "100%",
              letterSpacing: 0,
              color: "#ffffff",
              margin: 0,
            }}
          >
            What would you like to create today?
          </h2>
        </div>


        {/* App Navigation */}
        <div className="mt-4 flex justify-center">
          <AppNavigation />
        </div>

        {/* The line you requested BETWEEN nav and token usage */}
         

        {/* Centered Token Usage (below the line above) */}
        
        {/* Smartgen tagline + editor */}
        <div className="mt-8 text-center">
          <h1 style={{ margin: 0 }}>
            <span
              style={{
                fontFamily: "Inter",
                fontWeight: 600, // Semi Bold
                fontStyle: "normal",
                fontSize: 32,
                lineHeight: "100%",
                letterSpacing: 0,
                color: "#ffffff",
              }}
            >
              Smartgen –{" "}
            </span>
            <span
              style={{
                fontFamily: "Inter, ui-sans-serif, system-ui",
                fontWeight: 400, // Regular
                fontStyle: "normal",
                fontSize: 32,
                lineHeight: "100%",
                letterSpacing: 0,
                color: "#ffffff",
              }}
            >
              Get detailed prompts{" "}
            </span>
            <span
              style={{
                fontFamily: '"DM Serif Text"',
                fontWeight: 400,
                fontStyle: "italic",
                fontSize: 32,
                lineHeight: "100%",
                letterSpacing: 0,
                color: "#ffffff",
              }}
            >
            for any topic.
            </span>
          </h1>
        </div>


        <div className="mt-6">
          <SmarterPrompt
            onPromptGenerated={handleSmartgenPromptGenerated}
            onUseInOptimizer={(text) => {
              // pass generated text to the optimizer page
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
