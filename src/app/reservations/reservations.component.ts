import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Reservation } from '../services/reservations/reservation.model';
import { ReservationApiService } from '../services/reservations/reservation.service';
import { RoomApiService } from '../services/rooms/room.service';
import { Room } from '../services/rooms/room.model';
import { ToastComponent } from '../shared/toast.component';
import { ToastService } from '../shared/toast.service';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastComponent],
  template: `
    <div>
      <app-toast></app-toast>
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
    private readonly fb: FormBuilder,
    private readonly reservationApi: ReservationApiService,
    private readonly roomApi: RoomApiService,
    private readonly toast: ToastService
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.rooms$ = this.roomApi.list();
    this.reservations$ = this.reservationApi.list();
  }

  create() {
    if (this.form.invalid) return;
    const payload = this.buildPayload(this.form.value);
    this.reservationApi.create(payload).subscribe({
      next: () => {
        this.form.reset();
        this.toast.show('Réservation créée.', 'success');
      },
      error: (err) => this.handleError(err),
    });
  }

  private buildPayload(v: any): Partial<Reservation> {
    return {
      title: v.title,
      start: new Date(v.start).toISOString(),
      end: new Date(v.end).toISOString(),
    };
  }

  private handleError(err: any) {
    const message = err?.message ?? (typeof err === 'string' ? err : JSON.stringify(err));
    console.error(err);
    this.toast.show('Erreur: ' + message, 'error');
  }

  onRoomChange(roomId?: string) {
    this.reservations$ = this.reservationApi.list(roomId || undefined);
  }
}
