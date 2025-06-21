
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Clock } from "lucide-react";

interface DateTimeSectionProps {
  date: string;
  time: string;
  onInputChange: (field: string, value: string) => void;
}

const DateTimeSection = ({ date, time, onInputChange }: DateTimeSectionProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="date" className="text-base font-semibold">Pickup Date *</Label>
        <div className="relative">
          <Calendar className="absolute left-3 top-4 h-4 w-4 text-gray-400" />
          <Input 
            id="date"
            type="date"
            className="pl-10 h-12"
            value={date}
            onChange={(e) => onInputChange('date', e.target.value)}
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="time" className="text-base font-semibold">Pickup Time *</Label>
        <div className="relative">
          <Clock className="absolute left-3 top-4 h-4 w-4 text-gray-400" />
          <Input 
            id="time"
            type="time"
            className="pl-10 h-12"
            value={time}
            onChange={(e) => onInputChange('time', e.target.value)}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default DateTimeSection;
