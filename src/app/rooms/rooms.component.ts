import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RoomStoreService } from '../store/rooms/room.store';
import { Room } from '../store/rooms/room.model';
import { Observable } from 'rxjs';
import { UserStoreService } from '../store/users/user.store';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="rooms-page">
      <header class="rooms-header">
        <div>
          <h2>Salles</h2>
          <p class="muted">Gérez vos salles ici</p>
        </div>
        <div *ngIf="user$ | async as user" class="user-info muted">
          Connecté en tant que <strong>{{ user.name }}</strong> — Plan: {{ user.plan || 'free' }}
        </div>
      </header>

      <section class="rooms-actions neo-card">
        <form [formGroup]="form" (ngSubmit)="create()" class="row">
          <input formControlName="name" placeholder="Nom de la salle" />
          <input formControlName="description" placeholder="Description (optionnelle)" />
          <label class="muted"><input type="checkbox" formControlName="isPublic" /> Publique</label>
          <button class="btn-neo" type="submit" [disabled]="form.invalid">Créer</button>
        </form>
      </section>

      <section class="rooms-list">
        <div *ngIf="rooms$ | async as rooms">
          <p *ngIf="rooms.length === 0" class="muted">Aucune salle trouvée.</p>
          <ul>
            <li *ngFor="let r of rooms" class="neo-card">
              <div class="row" style="justify-content:space-between;align-items:center;">
                <div>
                  <div class="neo-title">{{ r.name }}</div>
                  <div class="muted">{{ r.description }}</div>
                </div>
                <div class="muted">{{ r.isPublic ? 'Publique' : 'Privée' }}</div>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  `,
  styles: [
    `
      .rooms-page {
        padding: 20px;
      }
    `,
    `
      .rooms-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 14px;
      }
    `,
    `
      .rooms-actions {
        margin-bottom: 16px;
        padding: 12px;
      }
    `,
    `
      .rooms-list ul {
        list-style: none;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
    `,
    `
      .rooms-list li {
        padding: 12px;
      }
    `,
    `
      .user-info {
        text-align: right;
      }
    `,
    `
      .row {
        display: flex;
        gap: 12px;
        align-items: center;
      }
    `,
    `
      input[placeholder] {
        padding: 10px;
        border-radius: 8px;
        border: 1px solid rgba(0, 0, 0, 0.08);
      }
    `,
  ],
})
export class RoomsComponent implements OnInit {
  form!: any;

  rooms$!: Observable<Room[]>;
  user$!: Observable<any>;

  constructor(
    private fb: FormBuilder,
    private roomStore: RoomStoreService,
    private userStore: UserStoreService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      isPublic: [false],
    });
    this.user$ = this.userStore.current$;
  }

  ngOnInit(): void {
    this.roomStore.load();
    this.rooms$ = this.roomStore.list$;
  }

  create() {
    if (this.form.invalid) return;
    const v = this.form.value;
    const payload: Partial<Room> = {
      name: v.name as string,
      description: v.description as string,
      isPublic: !!v.isPublic,
      ownerId: this.userStore.snapshot?.id ?? undefined,
    };
    try {
      this.roomStore
        .create(payload)
        .subscribe({
          next: () => this.form.reset(),
          error: (e) => alert('Erreur: ' + (e?.message || e)),
        });
    } catch (err: any) {
      alert('Erreur: ' + err.message);
    }
  }
}
