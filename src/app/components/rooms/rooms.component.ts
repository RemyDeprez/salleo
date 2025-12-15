import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RoomApiService } from '../../services/rooms/room.service';
import { Room } from '../../services/rooms/room.model';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent implements OnInit, OnDestroy {
  form!: any;

  rooms$!: Observable<Room[]>;

  // Pagination state (client-side)
  rooms: Room[] = [];
  pagedRooms: Room[] = [];
  pageSize = 10;
  currentPage = 1;
  totalPages = 1;
  private readonly sub = new Subscription();

  constructor(
    private readonly fb: FormBuilder,
    private readonly roomApi: RoomApiService,
    private readonly cd: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      isPublic: [false],
    });
  }

  ngOnInit(): void {
    this.loadRooms();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private loadRooms(): void {
    this.sub.add(
      this.roomApi.list().subscribe({
        next: (rooms) => {
          this.rooms = rooms || [];
          this.totalPages = Math.max(1, Math.ceil(this.rooms.length / this.pageSize));
          this.setPage(1);
          // ensure view updates even if change detection wasn't triggered
          try {
            this.cd.detectChanges();
          } catch {}
        },
        error: () => {
          this.rooms = [];
          this.pagedRooms = [];
          this.totalPages = 1;
          try {
            this.cd.detectChanges();
          } catch {}
        },
      })
    );
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
        next: () => {
          this.form.reset();
          // refresh list so pagination updates
          this.loadRooms();
        },
        error: (e) => alert('Erreur: ' + (e?.message || e)),
      });
    } catch (err: any) {
      alert('Erreur: ' + err.message);
    }
  }

  private setPage(page: number) {
    if (this.totalPages <= 0) {
      this.pagedRooms = [];
      this.currentPage = 1;
      return;
    }
    this.currentPage = Math.min(Math.max(1, page), this.totalPages);
    const start = (this.currentPage - 1) * this.pageSize;
    this.pagedRooms = this.rooms.slice(start, start + this.pageSize);
  }

  prev() {
    this.setPage(this.currentPage - 1);
  }

  next() {
    this.setPage(this.currentPage + 1);
  }

  goTo(page: number) {
    this.setPage(page);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  get visiblePages(): number[] {
    const maxButtons = 5;
    if (this.totalPages <= maxButtons) return this.pages;

    const half = Math.floor(maxButtons / 2);
    let start = this.currentPage - half;
    let end = start + maxButtons - 1;

    if (start < 1) {
      start = 1;
      end = start + maxButtons - 1;
    }

    if (end > this.totalPages) {
      end = this.totalPages;
      start = end - (maxButtons - 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  get firstVisible(): number {
    return this.visiblePages.length ? this.visiblePages[0] : 1;
  }

  get lastVisible(): number {
    const v = this.visiblePages;
    return v.length ? v.at(-1) ?? this.totalPages : this.totalPages;
  }

  get startIndex(): number {
    return this.rooms.length === 0 ? 0 : (this.currentPage - 1) * this.pageSize + 1;
  }

  get endIndex(): number {
    return Math.min(this.currentPage * this.pageSize, this.rooms.length);
  }
}
