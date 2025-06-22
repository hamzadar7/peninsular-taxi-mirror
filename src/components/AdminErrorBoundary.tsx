
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
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoBack = () => {
    window.history.back();
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
                  Go Back
                </Button>
              </div>

              <div className="text-xs text-gray-500 text-center">
                <p>Device Info:</p>
                <p>Screen: {window.screen.width}x{window.screen.height}</p>
                <p>Viewport: {window.innerWidth}x{window.innerHeight}</p>
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
