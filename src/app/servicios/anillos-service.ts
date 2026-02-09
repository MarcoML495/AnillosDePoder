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

  getCharacter(id:string): Observable <any []> {
    return this.http.get<any []>(`${this.baseUrl}/obtenerPersonaje/${id}`)
  }

  insertCharacter(nombre:string,raza:string,fechaNacimiento:string,nivelCorrupcion:number): Observable <any []> {
    return this.http.post<any []>(`${this.baseUrl}/insertarPersonaje`,{"nombre": nombre, "raza": raza, "fechaNacimiento": fechaNacimiento, "nivelCorrupcion": nivelCorrupcion})
  }

  updateCharacter(id:string,nombre:string,raza:string,fechaNacimiento:string,nivelCorrupcion:number): Observable <any []> {
    return this.http.put<any []>(`${this.baseUrl}/actualizarPersonaje/${id}`,{"nombre": nombre, "raza": raza, "fechaNacimiento": fechaNacimiento, "nivelCorrupcion": nivelCorrupcion})
  }

  deleteCharacter(id:string): Observable <any []> {
    return this.http.delete<any []>(`${this.baseUrl}/bajaFisica/${id}`)
  }

  deactivateCharacter(id:string): Observable <any []> {
    return this.http.put<any []>(`${this.baseUrl}/bajaLogica/${id}`,null)
  }

  reactivateCharacter(id:string): Observable <any []> {
    return this.http.put<any []>(`${this.baseUrl}/reactivar/${id}`,null)
  }

  getQuestion(id:string): Observable <any []> {
    return this.http.get<any []>(`${this.baseUrl}/obtenerPregunta/${id}`)
  }

  answerQuestion(id:string, res:number): Observable <any []> {
    return this.http.get<any []>(`${this.baseUrl}/respuesta/${id}/?respuestaUsuario=${res}`)
  }

  startGame(): Observable <any []> {
    return this.http.get<any []>(`${this.baseUrl}/empezarPartida/`)
  }

  getGame(id:string): Observable <any []> {
    return this.http.get<any []>(`${this.baseUrl}/obtenerPartida/${id}`)
  }

  setCorrect(id:string): Observable <any []> {
    return this.http.put<any []>(`${this.baseUrl}/correcta/${id}`,null)
  }

  finishGame(id:string): Observable <any []> {
    return this.http.put<any []>(`${this.baseUrl}/derrota/${id}`,null)
  }
}
