import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ProfilePage} from "../model/profile-page.model";
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfilePageService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}


  getUserById(): Observable<ProfilePage> {
    const id = localStorage.getItem('id');
    return this.http.get<ProfilePage>(`${this.apiServerUrl}/user/${id}`);
  }

}