import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RoomApiService } from '../../services/rooms/room.service';
import { Room } from '../../services/rooms/room.model';
import { Observable } from 'rxjs';

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

  constructor(private readonly fb: FormBuilder, private readonly roomApi: RoomApiService) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      isPublic: [false],
    });
  }

  ngOnInit(): void {
    this.rooms$ = this.roomApi.list();
  }

  create() {
    if (this.form.invalid) return;
    const v = this.form.value;
    const payload: Partial<Room> = {
      name: v.name as string,
      description: v.description as string,
      isPublic: !!v.isPublic,
      ownerId: undefined,
    };
    try {
      this.roomApi.create(payload).subscribe({
        next: () => this.form.reset(),
        error: (e) => alert('Erreur: ' + (e?.message || e)),
      });
    } catch (err: any) {
      alert('Erreur: ' + err.message);
    }
  }
}
