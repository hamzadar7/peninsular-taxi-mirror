
import React, { Component, ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

class AdminErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Admin Error Boundary caught an error:', error, errorInfo);
    this.setState({ error, errorInfo });
    
    // Log additional debug info for mobile issues
    console.error('Mobile debug info:', {
      userAgent: navigator.userAgent,
      screenSize: `${window.screen.width}x${window.screen.height}`,
      viewportSize: `${window.innerWidth}x${window.innerHeight}`,
      isSecureContext: window.isSecureContext,
      protocol: window.location.protocol,
      origin: window.location.origin
    });
  }

  handleReload = () => {
    // Clear any cached auth state before reload
    try {
      sessionStorage.clear();
      localStorage.removeItem('admin_session_backup');
      localStorage.removeItem('admin_session_backup_expiry');
    } catch (e) {
      console.warn('Storage cleanup failed:', e);
    }
    window.location.reload();
  };

  handleGoBack = () => {
    // Clear auth state and go to login
    try {
      sessionStorage.clear();
      localStorage.removeItem('admin_session_backup');
      localStorage.removeItem('admin_session_backup_expiry');
    } catch (e) {
      console.warn('Storage cleanup failed:', e);
    }
    window.location.replace('/admin');
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center p-4">
          <Card className="w-full max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="text-red-600 text-center">
                Admin Panel Error
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-700 text-center">
                Something went wrong in the admin panel. This might be a mobile compatibility issue.
              </p>
              
              {this.state.error && (
                <div className="bg-red-50 p-3 rounded text-xs text-red-800 overflow-auto max-h-32">
                  <strong>Error:</strong> {this.state.error.message}
                </div>
              )}

              <div className="flex flex-col space-y-2">
                <Button 
                  onClick={this.handleReload}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Reload Page
                </Button>
                <Button 
                  onClick={this.handleGoBack}
                  variant="outline"
                  className="w-full"
                >
                  Go Back to Login
                </Button>
              </div>

              <div className="text-xs text-gray-500 text-center space-y-1">
                <p><strong>Device Info:</strong></p>
                <p>Screen: {window.screen.width}x{window.screen.height}</p>
                <p>Viewport: {window.innerWidth}x{window.innerHeight}</p>
                <p>Secure: {window.isSecureContext ? 'Yes' : 'No'}</p>
                <p>Protocol: {window.location.protocol}</p>
                <p>User Agent: {navigator.userAgent.slice(0, 50)}...</p>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default AdminErrorBoundary;
