
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
        description: `Professional email sent from Capel Sound Taxi <contact@capelsoundtaxi.com.au> to ${testEmail}. Check your INBOX!`,
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
        Test our professional email system using <strong>Capel Sound Taxi &lt;contact@capelsoundtaxi.com.au&gt;</strong>. 
        This should now deliver directly to your <strong>INBOX</strong> with enhanced deliverability.
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
        {isSending ? 'Sending Enhanced Inbox Test...' : 'Test Enhanced Inbox Delivery'}
      </Button>
      
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
        <p className="text-xs text-blue-800 font-medium">
          🎯 <strong>Enhanced Inbox Optimization:</strong>
        </p>
        <ul className="text-xs text-blue-700 mt-1 ml-4 list-disc">
          <li>Professional sender: Capel Sound Taxi &lt;contact@capelsoundtaxi.com.au&gt; ✓</li>
          <li>Enhanced email headers and authentication ✓</li>
          <li>All tracking completely disabled ✓</li>
          <li>Professional business content ✓</li>
          <li>Test OTP will be: <strong>123456</strong></li>
        </ul>
      </div>
      
      <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
        <p className="text-sm text-red-800 font-bold mb-2">
          🚨 CRITICAL: Domain Authentication REQUIRED for Inbox Delivery
        </p>
        <p className="text-xs text-red-700 mb-2">
          Your emails are going to SPAM because these DNS records are missing from your GoDaddy domain:
        </p>
        <div className="text-xs text-red-700 space-y-2">
          <div className="bg-red-100 p-2 rounded">
            <strong>1. SPF Record (TXT):</strong><br/>
            <code className="bg-red-200 px-1 rounded">v=spf1 include:smtp2go.com ~all</code>
          </div>
          <div className="bg-red-100 p-2 rounded">
            <strong>2. DKIM:</strong><br/>
            Contact SMTP2Go support to set up DKIM for capelsoundtaxi.com.au
          </div>
          <div className="bg-red-100 p-2 rounded">
            <strong>3. DMARC Record (TXT):</strong><br/>
            <code className="bg-red-200 px-1 rounded">v=DMARC1; p=quarantine; rua=mailto:contact@capelsoundtaxi.com.au</code>
          </div>
        </div>
        <div className="mt-3 p-2 bg-yellow-100 border border-yellow-300 rounded">
          <p className="text-xs text-yellow-800 font-bold">
            ⚠️ Without these DNS records, ALL emails will continue going to SPAM regardless of content quality!
          </p>
        </div>
      </div>
      
      <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-md">
        <p className="text-xs text-gray-700">
          <strong>Why emails went to inbox before:</strong> Your previous setup likely used a different email service 
          with pre-configured domain authentication, or was sending from a well-established domain with existing reputation.
        </p>
      </div>
    </div>
  );
};

export default TestEmailButton;
