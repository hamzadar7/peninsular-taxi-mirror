
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Phone, Menu, X } from "lucide-react";
import { useState } from "react";

const Navigation = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/booking", label: "Booking" },
    { href: "/fleet", label: "Fleet" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      {/* Top Yellow Bar - Split between phone and book now */}
      <div className="bg-yellow-400 h-12 flex">
        <a 
          href="tel:+61408202034" 
          className="flex-1 flex items-center justify-center text-black hover:bg-yellow-500 transition-colors border-r border-yellow-600"
        >
          <Phone className="h-4 w-4 mr-2" />
          <span className="font-medium">+61 408 202 034</span>
        </a>
        <Link 
          to="/booking" 
          className="flex-1 flex items-center justify-center bg-black text-yellow-400 font-medium hover:bg-gray-800 transition-colors"
        >
          Book Now
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="bg-black shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0">
                <img 
                  src="/lovable-uploads/21e2b738-2d9a-4a6f-a974-5cab6cc47635.png" 
                  alt="Capelsound Taxi" 
                  className="h-16 w-auto"
                />
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "inline-flex items-center px-3 py-2 text-lg font-medium transition-colors",
                    location.pathname === item.href
                      ? "text-yellow-400"
                      : "text-white hover:text-yellow-400"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Phone Number - Desktop */}
            <div className="hidden lg:flex items-center">
              <a 
                href="tel:+61408202034" 
                className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors text-lg font-medium"
              >
                <Phone className="h-5 w-5" />
                +61 408 202 034
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-yellow-400 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-400"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={cn(
          "lg:hidden transition-all duration-300 ease-in-out",
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        )}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-900 border-t border-gray-700">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium transition-colors",
                  location.pathname === item.href
                    ? "text-yellow-400 bg-yellow-400/10"
                    : "text-white hover:text-yellow-400 hover:bg-white/5"
                )}
              >
                {item.label}
              </Link>
            ))}
            <a 
              href="tel:+61408202034" 
              className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10 transition-colors border-t border-gray-700 mt-3 pt-3"
            >
              <Phone className="h-5 w-5" />
              +61 408 202 034
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
