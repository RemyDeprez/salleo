export interface Room {
  id: string;
  name: string;
  description?: string;
  isPublic?: boolean;
  ownerId?: string;
}
