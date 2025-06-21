
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ContactInfoSectionProps {
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  onInputChange: (field: string, value: string) => void;
}

const ContactInfoSection = ({ contactName, contactPhone, contactEmail, onInputChange }: ContactInfoSectionProps) => {
  return (
    <>
      {/* Full Name and Phone Number */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-base font-semibold">Full Name *</Label>
          <Input 
            id="name"
            placeholder="Your full name"
            value={contactName}
            onChange={(e) => onInputChange('contactName', e.target.value)}
            required
            className="h-12"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-base font-semibold">Phone Number *</Label>
          <Input 
            id="phone"
            type="tel"
            placeholder="+61 XXX XXX XXX"
            value={contactPhone}
            onChange={(e) => onInputChange('contactPhone', e.target.value)}
            required
            className="h-12"
          />
        </div>
      </div>

      {/* Email Address */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-base font-semibold">Email Address *</Label>
        <Input 
          id="email"
          type="email"
          placeholder="your.email@example.com"
          value={contactEmail}
          onChange={(e) => onInputChange('contactEmail', e.target.value)}
          required
          className="h-12"
        />
      </div>
    </>
  );
};

export default ContactInfoSection;
