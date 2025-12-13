import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Reservation } from '../store/reservations/reservation.model';
import { ReservationStoreService } from '../store/reservations/reservation.store';
import { RoomStoreService } from '../store/rooms/room.store';
import { Room } from '../store/rooms/room.model';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div>
      <h3>Réservations</h3>

      <div class="row" style="align-items:center; gap:12px; margin-bottom:12px;">
        <label class="muted"
          >Filtrer par salle
          <select #roomSelect (change)="onRoomChange(roomSelect.value)">
            <option value="">Toutes</option>
            <option *ngFor="let room of rooms$ | async" [value]="room.id">{{ room.name }}</option>
          </select>
        </label>
      </div>

      <form [formGroup]="form" (ngSubmit)="create()">
        <input formControlName="title" placeholder="Titre" />
        <input formControlName="start" type="datetime-local" />
        <input formControlName="end" type="datetime-local" />
        <button type="submit" [disabled]="form.invalid">Créer</button>
      </form>

      <ul>
        <li *ngFor="let r of reservations$ | async">{{ r.title }} — {{ r.start }} → {{ r.end }}</li>
      </ul>
    </div>
  `,
})
export class ReservationsComponent implements OnInit {
  form!: FormGroup;

  reservations$!: Observable<Reservation[]>;
  rooms$!: Observable<Room[]>;

  constructor(
    private fb: FormBuilder,
    private store: ReservationStoreService,
    private roomStore: RoomStoreService
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.roomStore.load();
    this.rooms$ = this.roomStore.list$;
    this.store.load();
    this.reservations$ = this.store.list$;
  }

  create() {
    if (this.form.invalid) return;
    const v = this.form.value;
    const payload: Partial<Reservation> = {
      title: v.title,
      start: new Date(v.start).toISOString(),
      end: new Date(v.end).toISOString(),
    };
    try {
      this.store.create(payload).subscribe({
        next: () => this.form.reset(),
        error: (err) => alert('Erreur: ' + (err?.message || err)),
      });
    } catch (err: any) {
      alert('Erreur: ' + err.message);
    }
  }

  onRoomChange(roomId?: string) {
    this.store.load(roomId || undefined);
  }
}
