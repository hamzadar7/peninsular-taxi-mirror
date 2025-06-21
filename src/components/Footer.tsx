
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <img 
              src="/lovable-uploads/21e2b738-2d9a-4a6f-a974-5cab6cc47635.png" 
              alt="Capelsound Taxi" 
              className="h-12 w-auto mb-6 filter brightness-0 invert"
            />
            <img 
              src="/lovable-uploads/970b8594-2676-4fdb-9e29-e55000364416.png" 
              alt="ASIC Registered" 
              className="h-8 w-auto mb-6"
            />
            <p className="text-gray-300 text-sm leading-relaxed">
              Revolutionary taxi service platform on the Mornington Peninsula. AI-powered dispatch, real-time tracking, and seamless booking experience.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Platform</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">Dashboard</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">Smart Services</Link></li>
              <li><Link to="/booking" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">Book Ride</Link></li>
              <li><Link to="/fleet" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">Fleet Management</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">About Platform</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">Support</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Smart Services</h4>
            <ul className="space-y-3 text-sm">
              <li className="text-gray-300 flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>AI Airport Transfers</li>
              <li className="text-gray-300 flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>Corporate Solutions</li>
              <li className="text-gray-300 flex items-center"><span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>Hotel Integrations</li>
              <li className="text-gray-300 flex items-center"><span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>Event Management</li>
              <li className="text-gray-300 flex items-center"><span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>Wine Tour Packages</li>
              <li className="text-gray-300 flex items-center"><span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>Medical Transport</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">Connect</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="tel:+61408202034" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">📞</span>
                  +61 408 202 034
                </a>
              </li>
              <li className="text-gray-300 flex items-center">
                <span className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mr-3">✉️</span>
                contact@capelsoundtaxi.com.au
              </li>
              <li className="text-gray-300 flex items-center">
                <span className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mr-3">📍</span>
                Capel Sound VIC 3940
              </li>
              <li className="text-gray-300 flex items-center">
                <span className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mr-3">🕒</span>
                24/7 AI Service
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gradient-to-r from-gray-700 via-blue-800 to-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Capelsound Taxi Platform. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <span className="text-xs text-gray-500">Powered by AI</span>
              <span className="text-xs text-gray-500">•</span>
              <span className="text-xs text-gray-500">Real-time Tracking</span>
              <span className="text-xs text-gray-500">•</span>
              <span className="text-xs text-gray-500">Smart Dispatch</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
