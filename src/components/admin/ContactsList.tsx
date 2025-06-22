
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, CheckCircle } from "lucide-react";
import { ContactCard } from "./ContactCard";

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

interface ContactsListProps {
  filteredContacts: ContactData[];
  onMarkContactAsRead: (contactId: string) => void;
}

export const ContactsList = ({ filteredContacts, onMarkContactAsRead }: ContactsListProps) => {
  const newContacts = filteredContacts.filter(c => c.status === 'new');
  const readContacts = filteredContacts.filter(c => c.status === 'read');

  return (
    <div className="space-y-3 md:space-y-6">
      {/* New Messages */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-base sm:text-lg">
            <MessageSquare className="h-4 w-4 mr-2 text-blue-500" />
            New Messages ({newContacts.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {newContacts.map(contact => (
              <ContactCard
                key={contact.id}
                contact={contact}
                onMarkAsRead={() => onMarkContactAsRead(contact.id)}
                showMarkAsRead={true}
              />
            ))}
            {newContacts.length === 0 && (
              <p className="text-gray-500 text-center py-8 text-sm">No new messages for selected date</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Read Messages */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-base sm:text-lg">
            <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
            Read Messages ({readContacts.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {readContacts.map(contact => (
              <ContactCard
                key={contact.id}
                contact={contact}
                showMarkAsRead={false}
              />
            ))}
            {readContacts.length === 0 && (
              <p className="text-gray-500 text-center py-8 text-sm">No read messages for selected date</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
