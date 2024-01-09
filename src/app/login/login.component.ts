import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
    // Check if user ID is present in localStorage
    if (localStorage.getItem('id')) {
      this.router.navigate(['/profile']).then(() => {
        // Redirected successfully
      }).catch(err => {
        console.error('Redirection error:', err);
      });
    }

    this.form = this.formBuilder.group({
      email: '',
      password: ''
    });
  }

  onSubmit(): void {
    const { email, password } = this.form.value;
    this.authService.login(email, password).subscribe(
      response => {
        if (response && response.status === 200) {
          const id = response.body.id;
          localStorage.setItem('id', id.toString());
          this.router.navigate(['/home']).then(() => {
            // Navigation successful
          }).catch(err => {
            // Handle navigation error
            console.error('Navigation error:', err);
          });
        } else {
          // Handle unsuccessful login
        }
      },
      error => {
        console.error('Error during login:', error);
      }
    );
  }
}
