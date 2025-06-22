
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const handleBookNowClick = () => {
    navigate('/booking');
    // Scroll to booking form after navigation
    setTimeout(() => {
      const bookingForm = document.querySelector('#booking-form');
      if (bookingForm) {
        bookingForm.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleLinkClick = (path: string) => {
    navigate(path);
    // Scroll to top after navigation
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  return (
    <footer className="bg-black text-white py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <img 
              src="/lovable-uploads/21e2b738-2d9a-4a6f-a974-5cab6cc47635.png" 
              alt="Capelsound Taxi" 
              className="h-12 w-auto mb-4"
            />
            <div className="mb-4">
              <img 
                src="/lovable-uploads/970b8594-2676-4fdb-9e29-e55000364416.png" 
                alt="ASIC Registered" 
                className="h-8 w-auto mb-1"
              />
              <p className="text-gray-400 text-xs">Registered Business Name</p>
            </div>
            <p className="text-gray-400 text-sm">
              Reliable taxi service on the Mornington Peninsula. Professional drivers, clean vehicles, and 24/7 availability.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-yellow-400">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => handleLinkClick('/')} className="text-gray-400 hover:text-white transition-colors text-left">Home</button></li>
              <li><button onClick={() => handleLinkClick('/services')} className="text-gray-400 hover:text-white transition-colors text-left">Services</button></li>
              <li><button onClick={handleBookNowClick} className="text-gray-400 hover:text-white transition-colors text-left">Book Now</button></li>
              <li><button onClick={() => handleLinkClick('/fleet')} className="text-gray-400 hover:text-white transition-colors text-left">Our Fleet</button></li>
              <li><button onClick={() => handleLinkClick('/about')} className="text-gray-400 hover:text-white transition-colors text-left">About Us</button></li>
              <li><button onClick={() => handleLinkClick('/contact')} className="text-gray-400 hover:text-white transition-colors text-left">Contact</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-yellow-400">Services</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-400">Airport Transfers</li>
              <li className="text-gray-400">Corporate Travel</li>
              <li className="text-gray-400">Hotel Transfers</li>
              <li className="text-gray-400">Weddings</li>
              <li className="text-gray-400">Wine Tours</li>
              <li className="text-gray-400">Medical Appointments</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-yellow-400">Contact Info</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="tel:+61408202034" className="text-gray-400 hover:text-white transition-colors">
                  📞 +61 408 202 034
                </a>
              </li>
              <li className="text-gray-400">✉️ contact@capelsoundtaxi.com.au</li>
              <li className="text-gray-400">📍 Capel Sound VIC 3940</li>
              <li className="text-gray-400">🕒 24/7 Service</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Capelsound Taxi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
