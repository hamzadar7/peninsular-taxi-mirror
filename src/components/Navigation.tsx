
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Phone } from "lucide-react";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/fleet", label: "Fleet" },
    { href: "/booking", label: "Book Now" },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <img 
                src="/lovable-uploads/8e35e4d9-5f00-4c00-83a9-272cfe437b5a.png" 
                alt="Capel Sound Taxi" 
                className="h-8 w-auto"
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
                    ? "border-b-2 border-blue-500 text-gray-900"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center">
            <a 
              href="tel:0411000000" 
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              <Phone className="h-4 w-4" />
              0411 000 000
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
