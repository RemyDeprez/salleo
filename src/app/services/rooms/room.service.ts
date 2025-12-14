import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Room } from './room.model';
import { Observable } from 'rxjs';
import { apiUrl } from '../../config/api.config';

@Injectable({ providedIn: 'root' })
export class RoomApiService {
  constructor(private readonly http: HttpClient) {}

  list(): Observable<Room[]> {
    return this.http.get<Room[]>(apiUrl('/api/rooms'));
  }

  create(payload: Partial<Room>): Observable<Room> {
    return this.http.post<Room>(apiUrl('/api/rooms'), payload);
  }
}
