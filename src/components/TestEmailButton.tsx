
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
      console.log('Starting email delivery test...');
      await sendTestOTP(testEmail, testName);
      
      toast({
        title: "✅ Email Sent Successfully!",
        description: `Email sent from Capel Sound Taxi to ${testEmail}. Check your inbox!`,
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
      <h3 className="text-lg font-bold text-blue-800 mb-4">📧 Email Delivery Test</h3>
      <p className="text-blue-700 mb-4 text-sm">
        Test our email system using <strong>Capel Sound Taxi</strong> sender. 
        This will help us verify if emails are reaching your inbox properly.
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
        {isSending ? 'Sending Test Email...' : 'Test Email Delivery'}
      </Button>
      
      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
        <p className="text-sm text-yellow-800 font-medium">
          💡 <strong>Troubleshooting Email Delivery:</strong>
        </p>
        <ul className="text-sm text-yellow-700 mt-2 ml-4 list-disc space-y-1">
          <li>Check your spam/junk folder if email doesn't arrive in inbox</li>
          <li>Add contact@capelsoundtaxi.com.au to your contacts</li>
          <li>Mark emails as "Not Spam" if they appear in spam folder</li>
          <li>Test OTP will be: <strong>123456</strong></li>
        </ul>
      </div>
      
      <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-md">
        <p className="text-xs text-gray-700">
          <strong>Why emails might go to spam:</strong> Email providers have become stricter. 
          If emails reach spam initially, marking them as "Not Spam" will help train your email provider 
          to deliver future emails to your inbox.
        </p>
      </div>
    </div>
  );
};

export default TestEmailButton;
