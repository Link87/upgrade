import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from './profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) {
  }

  getProfile(id: string): Observable<Profile> {
    return this.http.get<Profile>(`http://localhost:3000/api/v1/users/${id}/profile`)
  }

  updateProfile(id: string, profile: Profile) {
    this.http.put<any>(`http://localhost:3000/api/v1/users/${id}/profile`, profile).subscribe(offers => {});
  }
}
