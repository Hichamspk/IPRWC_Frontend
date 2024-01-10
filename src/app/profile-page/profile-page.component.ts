import { Component, OnInit } from '@angular/core';
import { ProfilePage } from "../model/profile-page.model";
import { ProfilePageService } from "../service/profile-page.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  user: ProfilePage | any = []

  constructor(private profilePageService: ProfilePageService, private router: Router) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  public getCurrentUser(): void {
    this.profilePageService.getUserById().subscribe(
      (response: ProfilePage) => {
        console.log('Server response:', response);
        this.user = response;
      },
      (error: HttpErrorResponse) => {
        console.error('Error:', error);
        alert(error.message);
      }
    );
  }
  navigateToAdminPanel(): void {
    this.router.navigate(['/admin']); // Update the path as per your route configuration
  }



}
