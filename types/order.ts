export interface Order {
  id: string;
  audioUri: string;
  transcribedText: string;
  timestamp: string;
  staffName: string;
  duration: string;
  tableNumber?: number;
  guestCount?: number;
  status?: 'open' | 'closed';
}
