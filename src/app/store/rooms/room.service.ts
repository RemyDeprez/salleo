import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Room } from './room.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RoomApiService {
  constructor(private http: HttpClient) {}

  list(): Observable<Room[]> {
    return this.http.get<Room[]>('/api/rooms');
  }

  create(payload: Partial<Room>): Observable<Room> {
    return this.http.post<Room>('/api/rooms', payload);
  }
}
