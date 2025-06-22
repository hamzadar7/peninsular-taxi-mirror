
import { ReactNode } from "react";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <div className="w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
