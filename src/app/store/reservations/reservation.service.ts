import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reservation } from './reservation.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReservationApiService {
  constructor(private http: HttpClient) {}

  list(roomId?: string): Observable<Reservation[]> {
    const url = roomId ? `/api/rooms/${roomId}/reservations` : '/api/reservations';
    return this.http.get<Reservation[]>(url);
  }

  create(payload: Partial<Reservation>): Observable<Reservation> {
    return this.http.post<Reservation>('/api/reservations', payload);
  }
}
