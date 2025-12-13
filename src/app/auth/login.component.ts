import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="auth-viewport">
      <div class="auth-card">
        <div class="brand">
          <h1>Salleo</h1>
          <p class="subtitle">Accédez à vos salles et réservations</p>
        </div>

        <form [formGroup]="form" (ngSubmit)="submit()" novalidate>
          <div class="field">
            <input placeholder="Email" formControlName="email" type="email" />
            <div
              class="error"
              *ngIf="form.controls['email'].touched && form.controls['email'].invalid"
            >
              <small *ngIf="form.controls['email'].errors?.['required']">Email requis</small>
              <small *ngIf="form.controls['email'].errors?.['email']">Email invalide</small>
            </div>
          </div>

          <div class="field">
            <input placeholder="Mot de passe" formControlName="password" type="password" />
            <div
              class="error"
              *ngIf="form.controls['password'].touched && form.controls['password'].invalid"
            >
              <small *ngIf="form.controls['password'].errors?.['required']"
                >Mot de passe requis</small
              >
              <small *ngIf="form.controls['password'].errors?.['minlength']"
                >Min 6 caractères</small
              >
            </div>
          </div>

          <div class="actions">
            <button class="primary" type="submit" [disabled]="form.invalid">Se connecter</button>
            <button class="secondary" type="button" (click)="goRegister()">S'inscrire</button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [
    `
      .auth-viewport {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: radial-gradient(ellipse at top left, #081229 0%, #04101a 40%, #000000 100%);
        padding: 40px;
      }

      .auth-card {
        width: min(760px, 92%);
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.03), rgba(0, 0, 0, 0.25));
        border-radius: 18px;
        padding: 40px;
        box-shadow: 0 10px 40px rgba(2, 6, 23, 0.7), 0 0 30px rgba(79, 70, 229, 0.08) inset;
        border: 1px solid rgba(255, 255, 255, 0.04);
        backdrop-filter: blur(8px) saturate(120%);
        color: #e6eef8;
      }

      .brand h1 {
        margin: 0;
        font-size: 42px;
        letter-spacing: 1px;
        color: #b8d4ff;
        text-shadow: 0 2px 18px rgba(79, 70, 229, 0.25);
      }
      .brand .subtitle {
        margin-top: 6px;
        color: #9fb6d9;
        font-size: 14px;
      }

      form {
        margin-top: 28px;
      }
      .field {
        margin-bottom: 18px;
      }
      input {
        width: 100%;
        padding: 14px 16px;
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.06);
        background: rgba(6, 10, 20, 0.45);
        color: #eaf3ff;
        font-size: 16px;
        outline: none;
        box-shadow: 0 4px 14px rgba(2, 6, 23, 0.45) inset;
        transition: box-shadow 0.18s ease, transform 0.08s ease;
      }
      input:focus {
        box-shadow: 0 6px 20px rgba(79, 70, 229, 0.14);
        transform: translateY(-1px);
      }

      .error small {
        color: #ffb4b4;
      }

      .actions {
        display: flex;
        gap: 12px;
        margin-top: 10px;
      }
      .primary {
        flex: 1 1 auto;
        padding: 14px 18px;
        background: linear-gradient(90deg, #5e6bff, #4fb6e6);
        border: none;
        color: #041027;
        font-weight: 700;
        border-radius: 12px;
        cursor: pointer;
        box-shadow: 0 10px 30px rgba(79, 70, 229, 0.22);
      }
      .primary:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .secondary {
        flex: 0 0 160px;
        padding: 12px 14px;
        background: transparent;
        border: 1px solid rgba(159, 189, 255, 0.12);
        color: #bcd6ff;
        border-radius: 12px;
        cursor: pointer;
      }

      @media (max-width: 480px) {
        .auth-card {
          padding: 22px;
        }
        .brand h1 {
          font-size: 28px;
        }
        .actions {
          flex-direction: column;
        }
        .secondary {
          width: 100%;
        }
      }
    `,
  ],
})
export class LoginComponent {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  submit() {
    if (this.form.invalid) return;
    const { email, password } = this.form.value;
    this.auth.login({ email: email as string, password: password as string }).subscribe({
      next: () => this.router.navigateByUrl('/salles'),
      error: () => alert('Échec de la connexion'),
    });
  }

  goRegister() {
    this.router.navigateByUrl('/register');
  }
}
