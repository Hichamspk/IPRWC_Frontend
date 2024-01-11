import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public register(name: string, email: string, password: string): Observable<HttpResponse<any>> {
    return this.http.post<any>(
      `${this.apiServerUrl}/auth/register-user`,
      { name, email, password },
      { observe: 'response', withCredentials: true }
    );
  }
}
