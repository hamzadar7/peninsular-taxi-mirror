
import { ReactNode, useEffect } from "react";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  useEffect(() => {
    console.log('AdminLayout mounting...');
    
    // Simple viewport setup
    let viewportMeta = document.querySelector('meta[name="viewport"]');
    if (!viewportMeta) {
      viewportMeta = document.createElement('meta');
      viewportMeta.setAttribute('name', 'viewport');
      document.head.appendChild(viewportMeta);
    }
    viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0, user-scalable=no');

    return () => {
      console.log('AdminLayout unmounting...');
    };
  }, []);

  return (
    <div className="admin-layout-container min-h-screen bg-gray-50 w-full">
      {/* Debug info for development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-0 left-0 z-50 bg-blue-500 text-white text-xs p-1 opacity-75">
          Admin Debug: {window.innerWidth}x{window.innerHeight}
        </div>
      )}
      
      <div className="admin-content-wrapper w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
