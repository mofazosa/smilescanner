import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const navItems = [
    { label: "Home", id: "home" },
    { label: "Scan", id: "scan" },
    { label: "Tips", id: "tips" },
    { label: "About", id: "about" },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <svg className="h-10 w-10 mr-3" viewBox="0 0 100 100" fill="none">
                {/* Circular teal background */}
                <circle cx="50" cy="50" r="45" fill="#14B8A6" stroke="#0F766E" strokeWidth="2"/>
                
                {/* White tooth shape */}
                <path d="M50 20 
                         C45 20 40 25 40 30
                         L40 45
                         C40 50 42 55 45 58
                         L48 62
                         C49 63 50 64 50 65
                         C50 64 51 63 52 62
                         L55 58
                         C58 55 60 50 60 45
                         L60 30
                         C60 25 55 20 50 20 Z" 
                      fill="white" stroke="#E5E7EB" strokeWidth="0.5"/>
                
                {/* Tooth details */}
                <path d="M45 35 L47 37 L53 37 L55 35" stroke="#E5E7EB" strokeWidth="0.5" fill="none"/>
                <circle cx="47" cy="40" r="1" fill="#E5E7EB"/>
                <circle cx="53" cy="40" r="1" fill="#E5E7EB"/>
                
                {/* Glowing text effect */}
                <defs>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge> 
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                {/* Smile Scan text with glow */}
                <text x="50" y="80" textAnchor="middle" fontSize="8" fill="#0F766E" filter="url(#glow)" fontWeight="bold">
                  SMILE
                </text>
                <text x="50" y="88" textAnchor="middle" fontSize="8" fill="#0F766E" filter="url(#glow)" fontWeight="bold">
                  SCAN
                </text>
              </svg>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-gray-500 hover:text-[#2563EB] px-3 py-2 text-sm font-medium transition-colors"
              >
                {item.label}
              </button>
            ))}
          </nav>
          
          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-gray-500 hover:text-[#2563EB] px-3 py-2 text-sm font-medium transition-colors text-left"
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
