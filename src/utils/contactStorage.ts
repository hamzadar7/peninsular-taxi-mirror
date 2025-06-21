
export interface ContactData {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  timestamp: string;
  status: 'new' | 'read';
}

export const saveContact = (contactData: Omit<ContactData, 'id' | 'timestamp' | 'status'>): void => {
  try {
    const contacts = getContacts();
    const newContact: ContactData = {
      ...contactData,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      status: 'new'
    };
    
    contacts.push(newContact);
    localStorage.setItem('taxi_contacts', JSON.stringify(contacts));
    console.log('Contact saved successfully:', newContact);
  } catch (error) {
    console.error('Error saving contact:', error);
    throw new Error('Failed to save contact');
  }
};

export const getContacts = (): ContactData[] => {
  try {
    const contacts = localStorage.getItem('taxi_contacts');
    return contacts ? JSON.parse(contacts) : [];
  } catch (error) {
    console.error('Error getting contacts:', error);
    return [];
  }
};

export const updateContactStatus = (contactId: string, status: 'new' | 'read'): void => {
  try {
    const contacts = getContacts();
    const contactIndex = contacts.findIndex(contact => contact.id === contactId);
    
    if (contactIndex !== -1) {
      contacts[contactIndex].status = status;
      localStorage.setItem('taxi_contacts', JSON.stringify(contacts));
      console.log('Contact status updated:', contactId, status);
    }
  } catch (error) {
    console.error('Error updating contact status:', error);
    throw new Error('Failed to update contact status');
  }
};
