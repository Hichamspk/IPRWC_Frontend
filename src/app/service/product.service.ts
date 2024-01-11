import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ProductModel } from "../model/product.model";
import { Category } from "../model/Category";
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

  public addProduct(product: ProductModel): Observable<ProductModel> {
    return this.http.post<ProductModel>(`${this.apiServerUrl}/products`, product);
  }

  public updateProduct(id: number, product: ProductModel): Observable<ProductModel> {
    return this.http.put<ProductModel>(`${this.apiServerUrl}/products/${id}`, product);
  }

  public deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/products/${id}`);
  }
}
