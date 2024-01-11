import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from "../service/register-service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private registerService: RegisterService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const { name, email, password } = this.form.value;
      this.registerService.register(name, email, password).subscribe(
        response => {
          if (response && response.status === 201) {
            // Registration successful, you can redirect the user to the login page or perform other actions
            this.router.navigate(['/login']).then(() => {
              // Navigation successful
            }).catch(err => {
              console.error('Navigation error:', err);
            });
          } else {
            // Handle unsuccessful registration
          }
        },
        error => {
          console.error('Error during registration:', error);
        }
      );
    }
  }

  // Helper function to check if a form control has errors
  hasError(controlName: string, errorName: string): boolean {
    return this.form.get(controlName)?.hasError(errorName) || false;
  }
}
