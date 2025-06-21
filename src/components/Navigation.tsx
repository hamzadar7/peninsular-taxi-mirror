
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "./ui/button";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const handleLinkClick = () => {
    setIsOpen(false);
    // Scroll to top when navigating
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Fleet", path: "/fleet" },
    { name: "Contact", path: "/contact" },
    { name: "Book Now", path: "/booking", highlight: true },
  ];

  return (
    <>
      {/* Top bar with phone and book now */}
      <div className="bg-yellow-400 text-black py-2 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <a 
              href="tel:+61408202034" 
              className="flex items-center space-x-2 hover:text-gray-700 transition-colors flex-1 justify-center border-r border-black"
            >
              <Phone className="h-4 w-4" />
              <span className="font-semibold">+61 408 202 034</span>
            </a>
            <Link 
              to="/booking" 
              onClick={handleLinkClick}
              className="flex-1 text-center font-semibold hover:text-gray-700 transition-colors"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="bg-white shadow-lg relative z-40">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2" onClick={handleLinkClick}>
              <img 
                src="/lovable-uploads/2af54b00-8ec9-4d76-9e2c-13f943f72fe2.png"
                alt="Capel Sound Taxi"
                className="h-12 w-auto"
              />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={handleLinkClick}
                  className={`text-gray-700 hover:text-yellow-500 font-medium transition-colors ${
                    location.pathname === item.path ? 'text-yellow-500 font-semibold' : ''
                  } ${item.highlight ? 'hidden' : ''}`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700 hover:text-yellow-500"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={handleLinkClick}
                    className={`text-gray-700 hover:text-yellow-500 font-medium transition-colors ${
                      location.pathname === item.path ? 'text-yellow-500 font-semibold' : ''
                    } ${item.highlight ? 'bg-yellow-400 text-black px-4 py-2 rounded font-semibold hover:bg-yellow-500' : ''}`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navigation;
