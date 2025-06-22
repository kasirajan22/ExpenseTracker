import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-login',
  imports: [CommonModule,ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginForm : FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  hasError(controlName: string, errorName: string): boolean{
    const control = this.loginForm.get(controlName);
    return (control?.touched || control?.dirty) && control.hasError(errorName) || false;
  }

  passwordMatchValidator(fb: FormGroup){
    return fb.get('password')?.value === fb.get('confirmPassword')?.value ? null : { confirmPasswordNotMatching: true };
  }
  onSubmit(): void{
    this.errorMessage = null;
    if(this.loginForm.valid){
      const login = this.loginForm.value; 
      this.authService.login(login).subscribe({
        next: (response) => {
          this.router.navigate(['/transactions']);
        },
        error: (error) => {
          console.log('Error during login:', error);
          this.errorMessage = error.error?.message || 'Login failed. Please try again.';
        }
      });
    }
  }
}
