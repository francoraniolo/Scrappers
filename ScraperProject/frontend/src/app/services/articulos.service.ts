import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import {Articulo} from '../models/articulo';


@Injectable({
  providedIn: 'root'
})
export class ArticulosService {
  termino: string; 
  articulos: Object;
  dolar : Object;
  //readonly URL_API = 'http://localhost:3000/api/articulos';
  readonly URL_API = 'https://niphlerscrappers.herokuapp.com/api/articulos';
  

  constructor(private http: HttpClient) { }

   async getArticulos(termino: string) : Promise<Object> {

      this.articulos = await this.http.get(this.URL_API+`/${termino}`).toPromise();
      return this.articulos;
  
  }

  async getDolar() : Promise<Object> {
    this.dolar = await this.http.get(this.URL_API+'/dolar').toPromise();
    return this.dolar;
  }
}
