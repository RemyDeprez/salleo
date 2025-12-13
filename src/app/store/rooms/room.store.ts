import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Room } from './room.model';
import { RoomApiService } from './room.service';
import { UserStoreService } from '../users/user.store';

@Injectable({ providedIn: 'root' })
export class RoomStoreService {
  private _list = new BehaviorSubject<Room[]>([]);
  readonly list$ = this._list.asObservable();

  constructor(private api: RoomApiService, private userStore: UserStoreService) {}

  load() {
    this.api
      .list()
      .subscribe({ next: (r) => this._list.next(r), error: () => this._list.next([]) });
  }

  create(payload: Partial<Room>): Observable<Room> {
    // enforce free plan limit: 5 rooms
    const current = this.userStore.snapshot;
    const isPro = current?.plan === 'pro';
    const existingCount = this._list.getValue().filter((r) => r.ownerId === current?.id).length;
    if (!isPro && existingCount >= 5) {
      throw new Error('Limite de 5 salles atteinte pour le plan gratuit');
    }

    const obs = this.api.create(payload);
    obs.subscribe({ next: (room) => this._list.next([...this._list.getValue(), room]) });
    return obs;
  }
}
