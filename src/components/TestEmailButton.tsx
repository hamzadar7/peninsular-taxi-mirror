
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
      console.log('Starting email delivery test with verified sender...');
      await sendTestOTP(testEmail, testName);
      
      toast({
        title: "✅ Email Sent Successfully!",
        description: `OTP email sent from contact@capelsoundtaxi.com.au to ${testEmail}. Check your inbox!`,
      });
      
      console.log('Test email sent successfully with verified sender');
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
      <h3 className="text-lg font-bold text-green-800 mb-4">📧 Email Delivery Test</h3>
      <p className="text-green-700 mb-4 text-sm">
        Test our email system using verified sender: <strong>contact@capelsoundtaxi.com.au</strong>
        <br />This should deliver directly to your inbox without spam issues.
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
        {isSending ? 'Sending Test Email...' : 'Test Email Delivery'}
      </Button>
      
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
        <p className="text-sm text-blue-800 font-medium">
          ✅ <strong>Email Configuration Updated:</strong>
        </p>
        <ul className="text-sm text-blue-700 mt-2 ml-4 list-disc space-y-1">
          <li>Using verified sender: <strong>contact@capelsoundtaxi.com.au</strong></li>
          <li>Professional HTML email template for better deliverability</li>
          <li>Added email headers to avoid spam filters</li>
          <li>Test OTP will be: <strong>123456</strong></li>
        </ul>
      </div>
      
      <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
        <p className="text-xs text-green-700">
          <strong>Why this will work better:</strong> We're now using your verified domain email 
          (contact@capelsoundtaxi.com.au) which is properly authenticated with SMTP2GO. This should 
          significantly improve inbox delivery rates and reduce spam filtering.
        </p>
      </div>
    </div>
  );
};

export default TestEmailButton;
