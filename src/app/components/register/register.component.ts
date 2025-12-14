import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { hashPassword } from '../../utils/password.util';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  form!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly auth: AuthService,
    private readonly router: Router
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  submit() {
    if (this.form.invalid || this.isSubmitting) return;
    this.isSubmitting = true;
    const v = this.form.value;
    const username = String(v.username || '');
    const email = String(v.email || '');
    const password = String(v.password || '');
    console.log(username, email, password);
    //Hash the password using BCrypt
    hashPassword(password)
      .then((passwordHash) =>
        this.auth
          .register({ username, email, passwordHash, clientHashed: true })
          .subscribe({
            next: () => {
              this.isSubmitting = false;
              this.router.navigateByUrl('/salles');
            },
            error: (err) => {
              this.isSubmitting = false;
              alert('Erreur inscription: ' + (err?.message || err));
            },
          })
      );
  }

  isSubmitting = false;
}
