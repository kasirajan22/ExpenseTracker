import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {
  signupForm : FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required,Validators.minLength(6)]]
    },{
      validator: this.passwordMatchValidator
    });
  }
  hasError(controlName: string, errorName: string): boolean{
    const control = this.signupForm.get(controlName);
    return (control?.touched || control?.dirty) && control.hasError(errorName) || false;
  }

  passwordMatchValidator(fb: FormGroup){
    return fb.get('password')?.value === fb.get('confirmPassword')?.value ? null : { confirmPasswordNotMatching: true };
  }
  onSubmit(): void{
    this.errorMessage = null;
    if(this.signupForm.valid){
      const signUp = this.signupForm.value; 
      this.authService.register(signUp).subscribe({
        next: (response) => {
          this.router.navigate(['/transactions']);
        },
        error: (error) => {
          console.log('Error during registration:', error);
          this.errorMessage = error.error?.message || 'Registration failed. Please try again.';
        }
      });
    }
  }
}
