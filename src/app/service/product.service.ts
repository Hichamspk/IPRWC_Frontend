import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ProductModel } from "../model/product.model";
import { Category } from "../product/Category";
import { environment } from "../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(`${this.apiServerUrl}/products`);
  }

  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiServerUrl}/category`);
  }
}
