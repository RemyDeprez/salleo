import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ToastService, ToastType } from './toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-wrap">
      <div *ngFor="let t of toasts" class="toast" [class.error]="t.type === 'error'">
        {{ t.text }}
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        position: fixed;
        top: 16px;
        right: 16px;
        z-index: 1200;
      }
      .toast-wrap {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .toast {
        background: rgba(0, 0, 0, 0.8);
        color: #fff;
        padding: 8px 12px;
        border-radius: 6px;
        min-width: 160px;
      }
      .toast.error {
        background: #b00020;
      }
    `,
  ],
})
export class ToastComponent implements OnInit, OnDestroy {
  toasts: Array<{ text: string; type: ToastType; id: number }> = [];
  private sub = new Subscription();

  constructor(private readonly toast: ToastService) {}

  ngOnInit(): void {
    this.sub = this.toast.toasts$.subscribe((t) => {
      const id = Date.now() + Math.floor(Math.random() * 1000);
      this.toasts.push({ ...t, id });
      setTimeout(() => {
        this.toasts = this.toasts.filter((x) => x.id !== id);
      }, 5000);
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
