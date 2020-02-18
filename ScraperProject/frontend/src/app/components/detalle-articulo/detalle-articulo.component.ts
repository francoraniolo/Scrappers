import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


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

  constructor(private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.queryParams.subscribe(params =>{
      this.titulo = JSON.parse(params['titulo']);
      this.precio = JSON.parse(params['precio']);
      this.ecommerce = JSON.parse(params['ecommerce']);
      this.stock = JSON.parse(params['stock']);
      this.imagen = JSON.parse(params['imagen']);


    })
  }

}
