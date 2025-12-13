import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Reservation } from './reservation.model';
import { ReservationApiService } from './reservation.service';

@Injectable({ providedIn: 'root' })
export class ReservationStoreService {
  private _list = new BehaviorSubject<Reservation[]>([]);
  readonly list$ = this._list.asObservable();

  constructor(private api: ReservationApiService) {}

  load(roomId?: string) {
    this.api.list(roomId).subscribe({
      next: (res) => this._list.next(res),
      error: () => this._list.next([]),
    });
  }

  create(payload: Partial<Reservation>): Observable<Reservation> {
    // Basic conflict check client-side: ensure start < end and no overlap with existing
    const start = new Date(payload.start as string);
    const end = new Date(payload.end as string);
    if (isNaN(start.getTime()) || isNaN(end.getTime()) || start >= end) {
      throw new Error('Invalid time range');
    }

    const existing = this._list.getValue();
    const overlap = existing.some((r) => {
      const rs = new Date(r.start);
      const re = new Date(r.end);
      return !(end <= rs || start >= re);
    });
    if (overlap) throw new Error('Conflict with existing reservation');

    const obs = this.api.create(payload);
    obs.subscribe({
      next: (r) => this._list.next([...this._list.getValue(), r]),
    });
    return obs;
  }
}
