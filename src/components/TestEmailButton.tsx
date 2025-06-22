
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { sendTestOTP } from "@/utils/emailService";
import { useToast } from "@/hooks/use-toast";

const TestEmailButton = () => {
  const [testEmail, setTestEmail] = useState('');
  const [testName, setTestName] = useState('');
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const handleTestEmail = async () => {
    if (!testEmail.trim() || !testName.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter both email and name for the test.",
        variant: "destructive"
      });
      return;
    }

    setIsSending(true);
    try {
      console.log('Starting inbox delivery test...');
      await sendTestOTP(testEmail, testName);
      
      toast({
        title: "✅ Email Sent Successfully!",
        description: `Professional email sent from contact@capelsoundtaxi.com.au to ${testEmail}. Check your INBOX!`,
      });
      
      console.log('Test email sent successfully - should arrive in inbox');
    } catch (error) {
      console.error('Test email failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to send test email';
      
      toast({
        title: "❌ Email Failed",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6 mb-6 shadow-sm">
      <h3 className="text-lg font-bold text-green-800 mb-4">📧 Inbox Delivery Test</h3>
      <p className="text-green-700 mb-4 text-sm">
        Test our professional email system using <strong>contact@capelsoundtaxi.com.au</strong>. 
        This should now deliver directly to your <strong>INBOX</strong> with optimized deliverability.
      </p>
      
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <Label htmlFor="testEmail" className="text-sm font-medium">Test Email</Label>
          <Input
            id="testEmail"
            type="email"
            value={testEmail}
            onChange={(e) => setTestEmail(e.target.value)}
            placeholder="Enter your email"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="testName" className="text-sm font-medium">Test Name</Label>
          <Input
            id="testName"
            type="text"
            value={testName}
            onChange={(e) => setTestName(e.target.value)}
            placeholder="Enter your name"
            className="mt-1"
          />
        </div>
      </div>
      
      <Button
        onClick={handleTestEmail}
        disabled={isSending}
        className="bg-green-600 hover:bg-green-700 text-white font-semibold"
      >
        {isSending ? 'Sending Inbox Test Email...' : 'Test Inbox Delivery'}
      </Button>
      
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
        <p className="text-xs text-blue-800 font-medium">
          🎯 <strong>Inbox Optimization Enabled:</strong>
        </p>
        <ul className="text-xs text-blue-700 mt-1 ml-4 list-disc">
          <li>Professional sender: contact@capelsoundtaxi.com.au ✓</li>
          <li>Inbox-optimized content and headers ✓</li>
          <li>All tracking disabled for better deliverability ✓</li>
          <li>Proper email authentication required (see below) ✓</li>
          <li>Test OTP will be: <strong>123456</strong></li>
        </ul>
      </div>
      
      <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-md">
        <p className="text-sm text-orange-800 font-bold mb-2">
          ⚠️ Important: Domain Authentication Required
        </p>
        <p className="text-xs text-orange-700 mb-2">
          To ensure emails reach the inbox, you MUST add these DNS records to your GoDaddy domain:
        </p>
        <div className="text-xs text-orange-700 space-y-1">
          <div><strong>1. SPF Record:</strong> TXT record with value: <code className="bg-orange-100 px-1 rounded">v=spf1 include:smtp2go.com ~all</code></div>
          <div><strong>2. DKIM:</strong> Contact SMTP2Go support to set up DKIM for capelsoundtaxi.com.au</div>
          <div><strong>3. DMARC:</strong> TXT record with value: <code className="bg-orange-100 px-1 rounded">v=DMARC1; p=quarantine; rua=mailto:contact@capelsoundtaxi.com.au</code></div>
        </div>
      </div>
    </div>
  );
};

export default TestEmailButton;
