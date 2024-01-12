import {Observable} from "rxjs";
import {Category} from "../model/Category";
import {Injectable} from "@angular/core";
import {environment} from "../environment/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

public getCategories(): Observable<Category[]> {
  return this.http.get<Category[]>(`${this.apiServerUrl}/category`);
}

  public addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.apiServerUrl}/category`, category,  { withCredentials: true });
  }
  public updateCategory(id: number, category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.apiServerUrl}/category/${id}`, category, { withCredentials: true });
  }
}

