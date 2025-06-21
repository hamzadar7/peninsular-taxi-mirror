
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Phone } from "lucide-react";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/booking", label: "Booking" },
    { href: "/fleet", label: "Fleet" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="bg-black shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <img 
                src="/lovable-uploads/8e35e4d9-5f00-4c00-83a9-272cfe437b5a.png" 
                alt="Capel Sound Taxi" 
                className="h-12 w-auto"
              />
            </Link>
          </div>
          
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors",
                  location.pathname === item.href
                    ? "text-yellow-400"
                    : "text-white hover:text-yellow-400"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center">
            <a 
              href="tel:+61408202034" 
              className="inline-flex items-center gap-2 px-4 py-2 text-yellow-400 hover:text-yellow-300 transition-colors text-sm font-medium"
            >
              <Phone className="h-4 w-4" />
              +61 408 202 034
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
