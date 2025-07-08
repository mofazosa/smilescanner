export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <svg className="h-8 w-8 mr-2" viewBox="0 0 100 100" fill="none">
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
                  <filter id="glow2">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge> 
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                {/* Smile Scan text with glow */}
                <text x="50" y="80" textAnchor="middle" fontSize="8" fill="#0F766E" filter="url(#glow2)" fontWeight="bold">
                  SMILE
                </text>
                <text x="50" y="88" textAnchor="middle" fontSize="8" fill="#0F766E" filter="url(#glow2)" fontWeight="bold">
                  SCAN
                </text>
              </svg>
              <span className="text-xl font-bold">SmileScan</span>
            </div>
            <p className="text-gray-400 mb-4">
              Promoting dental health education through accessible technology and comprehensive resources.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button 
                  onClick={() => scrollToSection('home')}
                  className="hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('scan')}
                  className="hover:text-white transition-colors"
                >
                  Scan
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('tips')}
                  className="hover:text-white transition-colors"
                >
                  Tips
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="hover:text-white transition-colors"
                >
                  About
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button 
                  onClick={() => scrollToSection('tips')}
                  className="hover:text-white transition-colors"
                >
                  Dental Health Tips
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="hover:text-white transition-colors"
                >
                  Educational Materials
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="hover:text-white transition-colors"
                >
                  Professional Resources
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="hover:text-white transition-colors"
                >
                  Contact Support
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 SmileScan. Educational project for dental health awareness. Not for medical use.</p>
        </div>
      </div>
    </footer>
  );
}
