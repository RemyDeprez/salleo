import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { hashPassword } from '../../utils/password.util';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly auth: AuthService,
    private readonly router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  submit() {
    if (this.form.invalid || this.isSubmitting) return;
    this.isSubmitting = true;
    const { email, password } = this.form.value;
    hashPassword(String(password || ''))
      .then((passwordHash) =>
        this.auth
          .login({ email: String(email || ''), passwordHash, clientHashed: true })
          .subscribe({
            next: () => {
              this.isSubmitting = false;
              void this.router.navigateByUrl('/salles');
            },
            error: (err) => {
              this.isSubmitting = false;
              alert('Échec de la connexion: ' + (err?.message || err));
            },
          })
      )
      .catch(() => {
        this.isSubmitting = false;
        alert('Erreur lors du hashage du mot de passe');
      });
  }

  isSubmitting = false;

  goRegister() {
    this.router.navigateByUrl('/register');
  }
}
