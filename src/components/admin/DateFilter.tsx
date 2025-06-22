
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface DateFilterProps {
  dateFilter: string;
  setDateFilter: (date: string) => void;
}

export const DateFilter = ({ dateFilter, setDateFilter }: DateFilterProps) => {
  const today = new Date().toISOString().split('T')[0];

  return (
    <Card className="mb-3 md:mb-6">
      <CardContent className="p-2 sm:p-3 md:p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <label className="text-sm font-medium whitespace-nowrap">Filter by Date:</label>
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 flex-1">
            <Input 
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="flex-1 text-xs sm:text-sm"
            />
            <Button 
              variant="outline" 
              onClick={() => setDateFilter(today)}
              className="w-full sm:w-auto text-xs sm:text-sm"
            >
              Today
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setDateFilter('')}
              className="w-full sm:w-auto text-xs sm:text-sm"
            >
              All Dates
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
