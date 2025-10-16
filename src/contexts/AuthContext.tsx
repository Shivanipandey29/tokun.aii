// import React, { createContext, useContext, useMemo, useState, useEffect } from "react";

// interface User { 
//   id: string; 
//   email: string; 
//   name?: string; 
//   userType?: string;
//   role?: string;
//   orgId?: string | null;
//   plan?: string;
//   dailyTokensRemaining?: number;
// }

// interface AuthContextType {
//   user: User | null;
//   token: string | null;
//   isAuthenticated: boolean;
//   isReady: boolean;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const useAuth = () => {
//   const c = useContext(AuthContext);
//   if (!c) throw new Error("useAuth must be used within AuthProvider");
//   return c;
// };

// // AuthProvider.tsx
// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [token, setToken] = useState<string | null>(null);
//   const [isReady, setIsReady] = useState(false);

//   // Hydrate on mount
//   useEffect(() => {
//     const storedUser = localStorage.getItem("tokun_user");
//     const storedToken = localStorage.getItem("token");

//     if (storedUser) {
//       try { setUser(JSON.parse(storedUser)); } catch {}
//     }
//     if (storedToken) setToken(storedToken);

//     setIsReady(true);
//   }, []);

//   // 🔥 New: persistAuth available via context
//   const persistAuth = (payload: any) => {
//     if (payload?.user) {
//       setUser(payload.user);  // update state
//       localStorage.setItem("tokun_user", JSON.stringify(payload.user));
//     }
//     if (payload?.token) {
//       setToken(payload.token); // update state
//       localStorage.setItem("token", payload.token);
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     setToken(null);
//     localStorage.removeItem("tokun_user");
//     localStorage.removeItem("token");
//   };

//   const value = useMemo<AuthContextType & { persistAuth: typeof persistAuth }>(
//     () => ({
//       user,
//       token,
//       isAuthenticated: !!user && !!token,
//       isReady,
//       logout,
//       persistAuth, // expose it
//     }),
//     [user, token, isReady]
//   );

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };


// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useMemo, useState, useEffect } from "react";

interface User {
  id: string;
  email: string;
  name?: string;
  userType?: string;           // "IND" | "ORG"
  role?: string;               // "Owner" | "Member"
  orgId?: string | null;
  plan?: string;
  billingCycle?: "monthly" | "yearly";
  currentPeriodEnd?: string | null;

  // IND caps
  monthlyTokensCap?: number;
  monthlyTokensUsed?: number;

  // ORG caps
  orgPoolCap?: number;
  orgPoolUsed?: number;
  orgExtraTokensRemaining?: number;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isReady: boolean;
  logout: () => void;
  persistAuth: (payload: { user?: Partial<User>; token?: string }) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const c = useContext(AuthContext);
  if (!c) throw new Error("useAuth must be used within AuthProvider");
  return c;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("tokun_user");
      const storedToken = localStorage.getItem("token");
      if (storedUser) setUser(JSON.parse(storedUser));
      if (storedToken) setToken(storedToken);
    } catch {}
    setIsReady(true);
  }, []);

  const persistAuth: AuthContextType["persistAuth"] = (payload) => {
    // Deep-merge onto existing user, so org fields are never lost
    if (payload?.user) {
      setUser((prev) => {
        const merged: User = { ...(prev || {}), ...(payload.user as User) };
        localStorage.setItem("tokun_user", JSON.stringify(merged));
        return merged;
      });
    }
    if (payload?.token) {
      setToken(payload.token);
      localStorage.setItem("token", payload.token);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("tokun_user");
    localStorage.removeItem("token");
  };

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: !!user && !!token,
      isReady,
      logout,
      persistAuth,
    }),
    [user, token, isReady]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
