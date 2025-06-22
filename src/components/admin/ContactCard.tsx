
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, CheckCircle } from "lucide-react";

interface ContactData {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  status: string;
  device_info: string | null;
  timestamp: string;
}

interface ContactCardProps {
  contact: ContactData;
  onMarkAsRead?: () => void;
  showMarkAsRead?: boolean;
}

export const ContactCard = ({ contact, onMarkAsRead, showMarkAsRead = false }: ContactCardProps) => {
  const borderColor = contact.status === 'new' ? 'border-blue-500' : 'border-green-500';
  const opacity = contact.status === 'read' ? 'opacity-75' : '';

  return (
    <Card className={`border-l-4 ${borderColor} ${opacity}`}>
      <CardContent className="p-3">
        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h4 className="font-semibold text-sm">{contact.name}</h4>
              <p className="text-xs text-gray-600 break-all">{contact.email}</p>
              {contact.phone && <p className="text-xs text-gray-600">{contact.phone}</p>}
              <p className="text-xs text-gray-500">
                {new Date(contact.timestamp).toLocaleString()}
              </p>
            </div>
            {showMarkAsRead && onMarkAsRead && (
              <Button
                onClick={onMarkAsRead}
                variant="outline"
                size="sm"
                className="text-xs"
              >
                <Eye className="h-3 w-3 mr-1" />
                Read
              </Button>
            )}
            {!showMarkAsRead && (
              <div className="text-xs text-gray-500 flex items-center">
                <CheckCircle className="h-3 w-3 mr-1" />
                Read
              </div>
            )}
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <p className="text-xs break-words">{contact.message}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
