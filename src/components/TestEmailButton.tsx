
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
      console.log('Starting test email send...');
      await sendTestOTP(testEmail, testName);
      
      toast({
        title: "✅ Email Sent Successfully!",
        description: `Professional email sent from contact@capelsoundtaxi.com.au to ${testEmail}. Check your INBOX (not spam)!`,
      });
      
      console.log('Test email sent successfully');
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
    <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-6 mb-6 shadow-sm">
      <h3 className="text-lg font-bold text-blue-800 mb-4">📧 Professional Email Delivery Test</h3>
      <p className="text-blue-700 mb-4 text-sm">
        Test our professional email system using <strong>contact@capelsoundtaxi.com.au</strong>. 
        This should now deliver directly to your <strong>INBOX</strong> with proper authentication and anti-spam measures.
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
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold"
      >
        {isSending ? 'Sending Professional Email...' : 'Send Professional Email Test'}
      </Button>
      
      <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
        <p className="text-xs text-green-800 font-medium">
          ✅ <strong>Anti-Spam Configuration:</strong>
        </p>
        <ul className="text-xs text-green-700 mt-1 ml-4 list-disc">
          <li>Verified sender: contact@capelsoundtaxi.com.au ✓</li>
          <li>Professional content with no spam triggers ✓</li>
          <li>Proper email headers and authentication ✓</li>
          <li>Business-appropriate formatting ✓</li>
          <li>Test OTP will be: <strong>123456</strong></li>
        </ul>
      </div>
    </div>
  );
};

export default TestEmailButton;
