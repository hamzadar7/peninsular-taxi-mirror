
import { ReactNode, useEffect } from "react";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  useEffect(() => {
    // Add mobile viewport meta tag if not present
    let viewportMeta = document.querySelector('meta[name="viewport"]');
    if (!viewportMeta) {
      viewportMeta = document.createElement('meta');
      viewportMeta.setAttribute('name', 'viewport');
      document.head.appendChild(viewportMeta);
    }
    viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');

    // Add admin-specific CSS variables and styles
    document.documentElement.style.setProperty('--admin-safe-area-top', 'env(safe-area-inset-top, 0px)');
    document.documentElement.style.setProperty('--admin-safe-area-bottom', 'env(safe-area-inset-bottom, 0px)');
    
    // Force hardware acceleration on mobile
    document.body.style.transform = 'translateZ(0)';
    document.body.style.backfaceVisibility = 'hidden';
    
    return () => {
      // Cleanup on unmount
      document.body.style.transform = '';
      document.body.style.backfaceVisibility = '';
    };
  }, []);

  return (
    <div className="admin-layout-container">
      {/* Mobile Debug Info - only visible in development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-0 left-0 z-[9999] bg-red-500 text-white text-xs p-1 opacity-75">
          Mobile Debug: {window.innerWidth}x{window.innerHeight}
        </div>
      )}
      
      <div className="admin-content-wrapper min-h-screen bg-gray-50 w-full overflow-x-hidden">
        <div className="admin-main-content w-full h-full relative">
          {children}
        </div>
      </div>

      <style>{`
        .admin-layout-container {
          position: relative;
          width: 100%;
          min-height: 100vh;
          margin: 0;
          padding: 0;
          overflow-x: hidden;
          -webkit-overflow-scrolling: touch;
          isolation: isolate;
        }
        
        .admin-content-wrapper {
          position: relative;
          z-index: 1;
          padding-top: var(--admin-safe-area-top);
          padding-bottom: var(--admin-safe-area-bottom);
        }

        .admin-main-content {
          transform: translateZ(0);
          backface-visibility: hidden;
        }

        /* Mobile-specific optimizations */
        @media (max-width: 768px) {
          .admin-layout-container {
            font-size: 14px;
            line-height: 1.4;
          }
          
          .admin-content-wrapper {
            padding-left: 8px;
            padding-right: 8px;
          }
        }

        /* Prevent any inherited navigation styles */
        .admin-layout-container * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};

export default AdminLayout;
