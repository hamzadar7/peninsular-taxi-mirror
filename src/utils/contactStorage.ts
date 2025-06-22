
export interface ContactData {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  timestamp: string;
  status: 'new' | 'read';
  deviceInfo?: string;
}

const STORAGE_KEY = 'taxi_contacts';
const BACKUP_KEY = 'taxi_contacts_backup';

// Enhanced localStorage operations with error handling
const safeGetItem = (key: string): string | null => {
  try {
    const item = localStorage.getItem(key);
    console.log(`Retrieved contacts from ${key}:`, item ? JSON.parse(item) : null);
    return item;
  } catch (error) {
    console.error(`Error getting ${key} from localStorage:`, error);
    return null;
  }
};

const safeSetItem = (key: string, value: string): boolean => {
  try {
    localStorage.setItem(key, value);
    console.log(`Saved contacts to ${key}:`, JSON.parse(value));
    return true;
  } catch (error) {
    console.error(`Error saving to ${key}:`, error);
    return false;
  }
};

export const saveContact = (contactData: Omit<ContactData, 'id' | 'timestamp' | 'status'>): ContactData => {
  const contact: ContactData = {
    ...contactData,
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
    status: 'new',
    deviceInfo: navigator.userAgent.includes('Mobile') ? 'mobile' : 'desktop'
  };

  try {
    const existingContacts = getContacts();
    const updatedContacts = [...existingContacts, contact];
    
    // Save to primary storage
    const primarySaved = safeSetItem(STORAGE_KEY, JSON.stringify(updatedContacts));
    
    // Save backup
    safeSetItem(BACKUP_KEY, JSON.stringify(updatedContacts));
    
    if (!primarySaved) {
      throw new Error('Failed to save contact to primary storage');
    }
    
    console.log('Contact saved successfully:', contact);
    console.log('Total contacts in storage:', updatedContacts.length);
    
    // Trigger storage event for cross-tab synchronization
    window.dispatchEvent(new StorageEvent('storage', {
      key: STORAGE_KEY,
      newValue: JSON.stringify(updatedContacts),
      storageArea: localStorage
    }));
    
    return contact;
  } catch (error) {
    console.error('Error saving contact:', error);
    throw new Error('Failed to save contact');
  }
};

export const getContacts = (): ContactData[] => {
  try {
    // Try primary storage first
    let contactsData = safeGetItem(STORAGE_KEY);
    
    // If primary fails, try backup
    if (!contactsData) {
      console.warn('Primary contacts storage failed, trying backup...');
      contactsData = safeGetItem(BACKUP_KEY);
    }
    
    if (!contactsData) {
      console.log('No contacts found in storage');
      return [];
    }
    
    const parsed = JSON.parse(contactsData);
    const contacts = Array.isArray(parsed) ? parsed : [];
    
    console.log('Retrieved contacts from storage:', contacts);
    console.log('Total contacts found:', contacts.length);
    
    // Validate contact structure
    const validContacts = contacts.filter(contact => 
      contact && 
      typeof contact === 'object' && 
      contact.id && 
      contact.name && 
      contact.email
    );
    
    if (validContacts.length !== contacts.length) {
      console.warn(`Filtered out ${contacts.length - validContacts.length} invalid contacts`);
    }
    
    return validContacts;
  } catch (error) {
    console.error('Error getting contacts:', error);
    return [];
  }
};

export const updateContactStatus = (id: string, status: ContactData['status']): void => {
  try {
    const contacts = getContacts();
    const contactIndex = contacts.findIndex(c => c.id === id);
    
    if (contactIndex === -1) {
      throw new Error(`Contact with id ${id} not found`);
    }
    
    contacts[contactIndex].status = status;
    
    // Save to both primary and backup
    const primarySaved = safeSetItem(STORAGE_KEY, JSON.stringify(contacts));
    safeSetItem(BACKUP_KEY, JSON.stringify(contacts));
    
    if (!primarySaved) {
      throw new Error('Failed to update contact in primary storage');
    }
    
    console.log('Contact status updated:', id, status);
    
    // Trigger storage event
    window.dispatchEvent(new StorageEvent('storage', {
      key: STORAGE_KEY,
      newValue: JSON.stringify(contacts),
      storageArea: localStorage
    }));
    
  } catch (error) {
    console.error('Error updating contact status:', error);
    throw new Error('Failed to update contact status');
  }
};

// Function to clear all contacts (for debugging)
export const clearAllContacts = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(BACKUP_KEY);
    console.log('All contacts cleared');
  } catch (error) {
    console.error('Error clearing contacts:', error);
  }
};

// Function to get storage info for debugging
export const getContactStorageInfo = () => {
  return {
    primary: safeGetItem(STORAGE_KEY),
    backup: safeGetItem(BACKUP_KEY),
    userAgent: navigator.userAgent,
    isMobile: navigator.userAgent.includes('Mobile'),
    storageAvailable: typeof(Storage) !== "undefined"
  };
};
