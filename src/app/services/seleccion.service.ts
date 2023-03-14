import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeleccionService {
  private ApiUrl = "https://localhost:7243/api/Seleccion"; // URL to web api
  constructor(private http: HttpClient) {}
    
  public getSeleccion(): Observable<any> {
    return this.http.get<any>(this.ApiUrl);
  }
  public getSeleccionFiltro(state:any): Observable<any> {
    return this.http.get<any>(this.ApiUrl+"/state/"+state);
  }
  public addItem(data: any): Observable<any> {
    return this.http.post(this.ApiUrl, data);
   }
   public UpdateItem(data: any): Observable<any> {
    return this.http.put(this.ApiUrl, data);
   }
   public deleteItem(id: number): Observable<any> {
    return this.http.delete(this.ApiUrl+"/"+id);
  }
}
