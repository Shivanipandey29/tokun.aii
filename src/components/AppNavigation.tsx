import { useNavigate, useLocation } from "react-router-dom";

interface AppNavigationProps {
  onSectionChange?: (section: string) => void;
  activeSection?: string; // make optional
}

const AppNavigation = ({ activeSection, onSectionChange }: AppNavigationProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: "smartgen",            label: "Smartgen",           ext: "svg" },
    { id: "prompt-optimization", label: "Prompt Optimiser",   ext: "svg" },
    { id: "prompt-marketplace",  label: "Prompt Marketplace", badge: "New", ext: "png" },
    { id: "prompt-library",      label: "Prompt Library",     ext: "png" },
  ];

  // Map paths -> tab ids
  const pathToId = (pathname: string) => {
    if (pathname.startsWith("/prompt-marketplace")) return "prompt-marketplace";
    if (pathname.startsWith("/prompt-library")) return "prompt-library";
    if (pathname.startsWith("/prompt-optimization")) return "prompt-optimization";
    return "smartgen";
  };

  const currentActive = activeSection ?? pathToId(location.pathname);

const handleSectionClick = (section: any) => {
  if (section.id === "prompt-library") {
    navigate("/prompt-library");
  } else if (section.id === "prompt-marketplace") {
    navigate("/prompt-marketplace");
  } else if (section.id === "prompt-optimization") {
    // ✅ open on its own page
    navigate("/prompt-optimization");
  } else if (section.id === "smartgen") {
    navigate("/smartgen");
  }
};


  const gradientStyle = {
    background: "linear-gradient(90deg, #FF14EF 0%, #1A73E8 100%)",
    boxShadow: "0px 0px 20px 5px #170F1F",
  };

  return (
    <div className="flex justify-center px-4 py-6 bg-black">
      <nav
        className="flex items-center justify-between w-[700px] h-[86px] bg-black rounded-[200px] px-2"
        style={{ boxShadow: "0px 0px 20px 5px #170F1F" }}
      >
        {navItems.map((section) => {
          const isActive = currentActive === section.id;
          const isSmartgen = section.id === "smartgen";
          return (
            <button
              key={section.id}
              onClick={() => handleSectionClick(section)}
              className={`relative flex flex-col items-center justify-center text-sm font-medium transition-all h-[76px] px-6
                ${isActive ? "text-white" : "text-gray-400 hover:text-white hover:bg-white/5"}
                ${
                  isActive && isSmartgen
                    ? "rounded-tl-[200px] rounded-bl-[200px]"
                    : isActive
                    ? "rounded-none"
                    : "rounded-full"
                }`}
              style={{
                width: isActive && isSmartgen ? "175px" : "160px",
                height: "86px",
                ...(isActive ? gradientStyle : {}),
              }}
            >
              {section.badge && (
                <span
                  className="absolute -top-3 right-2 text-[10px] font-semibold text-white px-2 py-0.5"
                  style={{
                    borderRadius: "6px",
                    background: "linear-gradient(270.19deg, #1A73E8 0.16%, #FF14EF 99.84%)",
                    boxShadow: "0px 0px 12px 2px #170F1F",
                  }}
                >
                  {section.badge}
                </span>
              )}
              <img src={`/icons/${section.id}.${section.ext}`} alt={section.label} className="w-5 h-5 mb-1" />
              <span>{section.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default AppNavigation;
