import {Injectable} from "@angular/core";
import {environment} from "../environment/environment";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public login(email: string, password: string): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.apiServerUrl}/auth/authenticate`,
      { email, password },
      { observe: 'response', withCredentials: true }
    );
  }

}
