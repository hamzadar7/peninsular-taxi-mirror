
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAdminAuth } from "@/hooks/useAdminAuth";

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const { login, isLoading, error, isAuthenticated } = useAdminAuth();

  useEffect(() => {
    console.log('AdminLogin component mounted');
    
    // If already authenticated, redirect to dashboard
    if (isAuthenticated) {
      console.log('User already authenticated, redirecting...');
      window.location.href = '/admin/dashboard';
    }
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login form submitted');
    
    try {
      const result = await login(credentials.username, credentials.password);
      console.log('Login result:', result);
      
      if (!result.success) {
        console.error('Login failed:', result.error);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="admin-login-container min-h-screen w-full bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="w-full shadow-lg">
          <CardHeader className="text-center space-y-4 p-6">
            <img 
              src="/lovable-uploads/21e2b738-2d9a-4a6f-a974-5cab6cc47635.png" 
              alt="Capelsound Taxi" 
              className="h-16 w-auto mx-auto"
            />
            <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-6 pt-0">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input 
                  id="username"
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                  disabled={isLoading}
                  required
                  autoComplete="username"
                  className="w-full"
                  placeholder="Enter username"
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
                  autoComplete="current-password"
                  className="w-full"
                  placeholder="Enter password"
                />
              </div>
              {error && (
                <div className="bg-red-50 border border-red-200 rounded p-3">
                  <p className="text-red-600 text-sm text-center">{error}</p>
                </div>
              )}
              <Button 
                type="submit" 
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
            
            {/* Debug info in development */}
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-4 p-2 bg-gray-100 rounded text-xs">
                <p>Debug Info:</p>
                <p>Screen: {window.screen.width}x{window.screen.height}</p>
                <p>Viewport: {window.innerWidth}x{window.innerHeight}</p>
                <p>Secure Context: {window.isSecureContext ? 'Yes' : 'No'}</p>
                <p>Protocol: {window.location.protocol}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;
