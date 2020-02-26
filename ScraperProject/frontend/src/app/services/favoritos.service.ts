import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {

  favoritosList: AngularFireList<any>;

  selectedFavorito: Object= new Object();

  constructor(private firebase: AngularFireDatabase) { }

  getAllFavoritos(){
   return this.favoritosList = this.firebase.list('favoritos');
  }

  getFavoritos(idUser:string){
   return this.favoritosList = this.firebase.list('favoritos', ref=> ref.orderByChild('idUser').equalTo(idUser));
  }

  insertFavorito(favorito: Object){

    if(favorito['idUser']!=null){ 

    this.favoritosList.push({
      idUser : favorito['idUser'],
      titulo: favorito['titulo'],
      precio: favorito['precio'],       
      imagen: favorito['imagen'],
      stock: favorito['stock'],
      fecha: favorito['fecha'],
      respuesta: favorito['respuesta'],
      url: favorito['url'],
      ecommerce: favorito['ecommerce']

    });
    }else{
    console.log("No se pudo agregar a favoritos: usuario nulo");
         }
  }

  deleteFavorito(titulo:string){
    
    this.favoritosList.remove(titulo);
  }

  

}
