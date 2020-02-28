import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FavoritosService } from '../../services/favoritos.service';  

@Component({
  selector: 'app-detalle-articulo',
  templateUrl: './detalle-articulo.component.html',
  styleUrls: ['./detalle-articulo.component.css']
})


export class DetalleArticuloComponent implements OnInit {

  titulo: string;
  precio: string;
  ecommerce : string;
  stock: boolean;
  imagen: string;
  url: string;
  fecha: string = '';
  respuesta: string = '';
  idUser: string; 

  articulo: Object;

  constructor(private favoritosService: FavoritosService, private router: ActivatedRoute) { }

  ngOnInit(): void {  
      this.router.queryParams.subscribe(params =>{
      this.titulo = JSON.parse(params['titulo']);
      this.precio = JSON.parse(params['precio']);
      this.ecommerce = JSON.parse(params['ecommerce']);
      this.stock = JSON.parse(params['stock']);
      this.imagen = JSON.parse(params['imagen']);
      this.url = JSON.parse(params['url']);
      if(params['fecha']!=null){
        this.fecha = JSON.parse(params['fecha']);
      }
      if(params['respuesta']!=null){
        this.respuesta = JSON.parse(params['respuesta']);
      }
      
      this.idUser = JSON.parse(params['userEmail']);
      console.log("USEREMAIL ES ",this.idUser);
      
      this.articulo = { 'idUser': this.idUser,
                        'titulo': this.titulo,
                        'precio': this.precio,
                        'ecommerce': this.ecommerce,
                        'stock': this.stock,
                        'imagen': this.imagen,
                        'url': this.url, 
                        'fecha': this.fecha,
                        'respuesta': this.respuesta
      }
    });



  }

  addFavorite(){
    if(this.articulo!=null){
      this.favoritosService.getAllFavoritos();
      this.favoritosService.insertFavorito(this.articulo);
    }
    
  }

}
