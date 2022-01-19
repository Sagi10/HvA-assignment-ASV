import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Employee} from '../../models/staff/Employee';
import {Functions} from '../../models/staff/Functions';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = environment.apiUrl;
  private users;

  constructor(private httpClient: HttpClient) {
  }

  /**
   * Get all the users from HTTP-request, subscribe where the data is needed
   */
  public getAllUsers(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(`${this.url}/users`);
  }

  /**
   * This method is meant for the admin to create new users
   *
   * @param email
   * @param firstname
   * @param lastname
   * @param password
   * @param role
   */
  public createUser(email: string, firstname: string, lastname: string, password: string, role: Functions) {
    const user = {
      email,
      password,
      firstname,
      lastname,
      role,
    };

    this.httpClient.post(`${this.url}/users`, JSON.stringify(user), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).subscribe(data => console.log(data));
  };

}
