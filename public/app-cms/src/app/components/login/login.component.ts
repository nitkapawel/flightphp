import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service'; // Zaktualizowana ścieżka
import { TOKEN_KEY } from '../../services/auth-constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'] // Używamy LESS
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError = false;
  submitted = false;
  errorMessage = '';

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    // Wywołanie metody logowania
    this.authService.login(this.f['username'].value, this.f['password'].value).subscribe({
      next: response => {
        this.loginError = false;

        if (response.error) {
          console.log('Eror from auth service - login failed');
        }
        if (response.token) {
          localStorage.setItem(TOKEN_KEY, response.token);
          console.log('logged successfully -> redirect to dashboard');
          this.authService.authStateSubject.next(true);
          this.router.navigate(['/dashboard']);
        }
      },
      error: error => {
        this.loginError = true;
        if (error.status === 401) {
          this.errorMessage = "Nieprawidłowe dane logowania";
          console.log('Login failed: Invalid credentials');
        } else {
          this.errorMessage = "Wystąpił błąd podczas logowania. Jeśli problem będzie się powtarzał, skontaktuj się z administratorem";
          console.log('Login failed:', error.message);
        }
      }
    });
  }
}
