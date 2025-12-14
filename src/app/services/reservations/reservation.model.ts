export interface Reservation {
  id: string;
  roomId: string;
  title: string;
  start: string;
  end: string;
  userId?: string;
}
