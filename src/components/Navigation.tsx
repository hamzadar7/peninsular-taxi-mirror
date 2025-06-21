
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Phone, Menu, X } from "lucide-react";
import { useState } from "react";

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/booking", label: "Booking" },
    { href: "/fleet", label: "Fleet" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const handleBookNowClick = () => {
    navigate('/booking');
    // Scroll to booking form after navigation
    setTimeout(() => {
      const bookingForm = document.querySelector('#booking-form');
      if (bookingForm) {
        bookingForm.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <>
      {/* Top Blue Bar - Split between phone and book now - STICKY */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-12 flex sticky top-0 z-50 shadow-lg">
        <a 
          href="tel:+61408202034" 
          className="flex-1 flex items-center justify-center text-white hover:bg-white/10 transition-colors border-r border-white/20"
        >
          <Phone className="h-4 w-4 mr-2" />
          <span className="font-medium">+61 408 202 034</span>
        </a>
        <button 
          onClick={handleBookNowClick}
          className="flex-1 flex items-center justify-center bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-300"
        >
          Book Now
        </button>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white shadow-xl sticky top-12 z-40 border-b border-gray-100">
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

            {/* Mobile Discount Message - Only visible on mobile */}
            <div className="lg:hidden flex-1 mx-4">
              <button 
                onClick={handleBookNowClick}
                className="block text-center text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors bg-blue-50 rounded-lg px-3 py-2 w-full"
              >
                Up to 10% off Airport Pickups!
              </button>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => window.scrollTo(0, 0)}
                  className={cn(
                    "inline-flex items-center px-4 py-2 text-lg font-medium transition-all duration-300 rounded-lg",
                    location.pathname === item.href
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Phone Number - Desktop - Always visible */}
            <div className="hidden lg:flex items-center">
              <a 
                href="tel:+61408202034" 
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors text-lg font-medium bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100"
              >
                <Phone className="h-5 w-5" />
                +61 408 202 034
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors"
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
          <div className="px-4 pt-2 pb-3 space-y-1 bg-gray-50 border-t border-gray-200">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => {
                  setIsMenuOpen(false);
                  window.scrollTo(0, 0);
                }}
                className={cn(
                  "block px-4 py-3 rounded-lg text-base font-medium transition-colors",
                  location.pathname === item.href
                    ? "text-blue-600 bg-blue-100"
                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                )}
              >
                {item.label}
              </Link>
            ))}
            <a 
              href="tel:+61408202034" 
              className="flex items-center gap-2 px-4 py-3 rounded-lg text-base font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-100 transition-colors border-t border-gray-300 mt-3 pt-6"
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
