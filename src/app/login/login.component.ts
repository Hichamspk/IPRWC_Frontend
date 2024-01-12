import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../service/login-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private authService: LoginService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('id')) {
      this.router.navigate(['/profile']).then(() => {
      }).catch(err => {
        console.error('Redirection error:', err);
      });
    }

    this.form = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    const { email, password } = this.form.value;
    this.authService.login(email, password).subscribe(
      response => {
        if (response && response.status === 200) {
          const id = response.body.id;
          localStorage.setItem('id', id.toString());
          this.router.navigate(['/profile']).then(() => {
          }).catch(err => {
            console.error('Navigation error:', err);
          });
        } else {
        }
      },
      error => {
        console.error('Error during login:', error);
      }
    );
  }
  hasError(controlName: string, errorName: string): boolean {
    return this.form.get(controlName)?.hasError(errorName) || false;
  }
}
