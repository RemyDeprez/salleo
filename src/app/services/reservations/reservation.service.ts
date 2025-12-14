import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reservation } from './reservation.model';
import { Observable } from 'rxjs';
import { apiUrl } from '../../config/api.config';

@Injectable({ providedIn: 'root' })
export class ReservationApiService {
  constructor(private readonly http: HttpClient) {}

  list(roomId?: string): Observable<Reservation[]> {
    const path = roomId ? `/api/rooms/${roomId}/reservations` : '/api/reservations';
    return this.http.get<Reservation[]>(apiUrl(path));
  }

  create(payload: Partial<Reservation>): Observable<Reservation> {
    return this.http.post<Reservation>(apiUrl('/api/reservations'), payload);
  }
}
