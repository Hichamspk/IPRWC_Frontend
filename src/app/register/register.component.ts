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
      password: ['', [Validators.required, Validators.minLength(8)]],
      postalcode: ['',],
      city: [''],
      street: ['']
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const { name, email, password, street, city, postalcode } = this.form.value;
      this.registerService.register(name, email, password, street, city, postalcode).subscribe(
        response => {
          if (response && response.status === 201) {
            this.router.navigate(['/login']).then(() => {
            }).catch(err => {
              console.error('Navigation error:', err);
            });
          } else {
          }
        },
        error => {
          console.error('Error during registration:', error);
        }
      );
    }
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.form.get(controlName)?.hasError(errorName) || false;
  }
}
