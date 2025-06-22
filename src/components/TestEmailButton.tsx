
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
        title: "Test Email Sent Successfully! 📧",
        description: `Production-ready OTP email sent to ${testEmail}. Check your INBOX first, then spam folder if needed.`,
      });
      
      console.log('Test email sent successfully');
    } catch (error) {
      console.error('Test email failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to send test email';
      
      toast({
        title: "Test Email Failed",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6 mb-6 shadow-sm">
      <h3 className="text-lg font-bold text-green-800 mb-4">🚀 Production Email System Test</h3>
      <p className="text-green-700 mb-4 text-sm">
        Test the production-ready email delivery system with enhanced authentication headers and inbox optimization. 
        This will send a test OTP (123456) to your email with improved deliverability.
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
        {isSending ? 'Sending Production Test Email...' : 'Send Production Test Email'}
      </Button>
      
      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
        <p className="text-xs text-yellow-800 font-medium">
          ✅ <strong>Production Settings Applied:</strong>
        </p>
        <ul className="text-xs text-yellow-700 mt-1 ml-4 list-disc">
          <li>Enhanced email authentication headers</li>
          <li>Proper sender name: "Capel Sound Taxi"</li>
          <li>Inbox-optimized email structure</li>
          <li>Test OTP will be: <strong>123456</strong></li>
        </ul>
      </div>
    </div>
  );
};

export default TestEmailButton;
