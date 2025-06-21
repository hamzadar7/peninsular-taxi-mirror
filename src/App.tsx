
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Fleet from "./pages/Fleet";
import Booking from "./pages/Booking";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  useEffect(() => {
    // Add structured data for SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Capel Sound Taxi",
      "image": "https://capelsoundtaxi.com/lovable-uploads/21e2b738-2d9a-4a6f-a974-5cab6cc47635.png",
      "telephone": "+61408202034",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Capel Sound",
        "addressLocality": "Capel Sound",
        "addressRegion": "VIC",
        "postalCode": "3940",
        "addressCountry": "AU"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "-38.3665",
        "longitude": "144.8444"
      },
      "url": "https://capelsoundtaxi.com",
      "sameAs": [],
      "openingHours": "Mo-Su 00:00-23:59",
      "priceRange": "$$",
      "description": "Professional taxi service on Mornington Peninsula. Airport transfers, corporate travel, hotel transfers. Available 24/7.",
      "serviceArea": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": "-38.3665",
          "longitude": "144.8444"
        },
        "geoRadius": "50000"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Taxi Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Airport Transfers"
            }
          },
          {
            "@type": "Offer", 
            "itemOffered": {
              "@type": "Service",
              "name": "Corporate Travel"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service", 
              "name": "Hotel Transfers"
            }
          }
        ]
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    // Add meta tags for better SEO
    const metaTags = [
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'author', content: 'Capel Sound Taxi' },
      { name: 'robots', content: 'index, follow' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Capel Sound Taxi' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'geo.region', content: 'AU-VIC' },
      { name: 'geo.placename', content: 'Mornington Peninsula' },
      { name: 'geo.position', content: '-38.3665;144.8444' },
      { name: 'ICBM', content: '-38.3665, 144.8444' }
    ];

    metaTags.forEach(tag => {
      const meta = document.createElement('meta');
      if (tag.name) meta.name = tag.name;
      if (tag.property) meta.setAttribute('property', tag.property);
      meta.content = tag.content;
      document.head.appendChild(meta);
    });

    return () => {
      document.head.removeChild(script);
      metaTags.forEach(() => {
        const metas = document.head.querySelectorAll('meta');
        metas.forEach(meta => {
          if (metaTags.some(tag => 
            (tag.name && meta.name === tag.name) || 
            (tag.property && meta.getAttribute('property') === tag.property)
          )) {
            document.head.removeChild(meta);
          }
        });
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/*" element={
          <>
            <Navigation />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/fleet" element={<Fleet />} />
                <Route path="/booking" element={<Booking />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </main>
            <Footer />
            <WhatsAppButton />
          </>
        } />
      </Routes>
    </div>
  );
}

export default App;
