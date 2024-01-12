import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from "../model/profile-page.model";
import { environment } from '../environment/environment';
import {ShopOrder} from "../model/shop-order.model";
import {ApiResponse} from "../model/api-response.model";



@Injectable({
  providedIn: 'root'
})
export class ProfilePageService {
  private apiServerUrl = environment.apiBaseUrl;
  user: User | any = []


  constructor(private http: HttpClient) {}


  getUserById(): Observable<User> {
    const id = localStorage.getItem('id');
    return this.http.get<User>(`${this.apiServerUrl}/user/${id}`, { withCredentials: true });
  }

  public getUserOrders(userName: string): Observable<ApiResponse<ShopOrder[]>> {
    return this.http.get<ApiResponse<ShopOrder[]>>(`${this.apiServerUrl}/orders/user/${userName}`, { withCredentials: true });
  }



}
