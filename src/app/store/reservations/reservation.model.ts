export interface Reservation {
  id: string;
  roomId: string;
  userId: string;
  title: string;
  start: string; // ISO
  end: string; // ISO
}
