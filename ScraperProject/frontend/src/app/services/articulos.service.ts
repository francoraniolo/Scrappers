import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import {Articulo} from '../models/articulo';


@Injectable({
  providedIn: 'root'
})
export class ArticulosService {
  termino: string; 
  articulos: Articulo[];
  readonly URL_API = 'http://localhost:3000/api/articulos';

  constructor(private http: HttpClient) { }

  getArticulos(termino: string) {
    let promise = new Promise((resolve,reject)=>{
      this.http.get(this.URL_API+`/${termino}`)
      .toPromise()
      .then(
        res=> {
          console.log(res);
        }
      )
    });

    return promise;
     
  }
}
