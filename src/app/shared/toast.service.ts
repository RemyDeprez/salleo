import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export type ToastType = 'success' | 'error';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly subject = new Subject<{ text: string; type: ToastType }>();
  readonly toasts$ = this.subject.asObservable();

  show(text: string, type: ToastType = 'success') {
    this.subject.next({ text, type });
  }
}
