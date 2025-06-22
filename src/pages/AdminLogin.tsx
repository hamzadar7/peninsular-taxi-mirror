
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('AdminLogin component mounted');
    console.log('Current location:', window.location.href);
    console.log('User agent:', navigator.userAgent);
    
    // Check if admin is already logged in
    const isLoggedIn = localStorage.getItem('admin_logged_in');
    console.log('Admin logged in status:', isLoggedIn);
    
    if (isLoggedIn === 'true') {
      console.log('Admin already logged in, redirecting to dashboard...');
      // Use window.location.href for more reliable navigation on mobile
      window.location.href = '/admin/dashboard';
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    console.log('Login attempt with:', { username: credentials.username });
    console.log('Device info:', {
      userAgent: navigator.userAgent,
      isMobile: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent),
      screenWidth: window.innerWidth,
      localStorage: typeof localStorage !== 'undefined'
    });
    
    try {
      // Add a small delay to ensure UI updates
      await new Promise(resolve => setTimeout(resolve, 100));
      
      if (credentials.username === "backoffice" && credentials.password === "G89x!h5qgj") {
        console.log('Login successful, setting localStorage...');
        
        // Ensure localStorage is available
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('admin_logged_in', 'true');
          console.log('localStorage set, value:', localStorage.getItem('admin_logged_in'));
        } else {
          console.error('localStorage not available');
          setError("Storage not available on this device");
          return;
        }
        
        // Use window.location.href for more reliable navigation on mobile
        console.log('Redirecting to dashboard...');
        window.location.href = '/admin/dashboard';
      } else {
        console.log('Invalid credentials');
        setError("Invalid credentials");
      }
    } catch (err) {
      console.error('Login error:', err);
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <img 
            src="/lovable-uploads/21e2b738-2d9a-4a6f-a974-5cab6cc47635.png" 
            alt="Capelsound Taxi" 
            className="h-16 w-auto mx-auto mb-4"
          />
          <CardTitle className="text-2xl">Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input 
                id="username"
                value={credentials.username}
                onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                disabled={isLoading}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password"
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                disabled={isLoading}
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button 
              type="submit" 
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
          
          {/* Debug info for mobile */}
          <div className="mt-4 text-xs text-gray-500 border-t pt-4">
            <p>Debug Info:</p>
            <p>Screen: {window.innerWidth}x{window.innerHeight}</p>
            <p>Mobile: {/Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? 'Yes' : 'No'}</p>
            <p>Storage: {typeof localStorage !== 'undefined' ? 'Available' : 'Not available'}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
