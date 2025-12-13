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
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
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
      this.roomStore.create(payload).subscribe({
        next: () => this.form.reset(),
        error: (e) => alert('Erreur: ' + (e?.message || e)),
      });
    } catch (err: any) {
      alert('Erreur: ' + err.message);
    }
  }
}
