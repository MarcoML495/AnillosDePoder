import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnillosService {
  constructor(private http: HttpClient) {}
  private baseUrl = environment.anilloUrl

  getAllCharacters(): Observable <any []> {

    return this.http.get<any []>(`${this.baseUrl}/listaPersonajes`)
    
  }
}
