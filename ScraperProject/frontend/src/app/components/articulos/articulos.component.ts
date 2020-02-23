import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { ArticulosService } from "../../services/articulos.service";
import { async } from '@angular/core/testing';


@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css'],
  providers: [ArticulosService]
  
})
export class ArticulosComponent implements OnInit {
  
  @Input() articulos: Object[];
  @Input() articulosAmazon: Object[];
  @Input() articulosEbay : Object[];

  valorDolar : Object;
  


  // mostrar: boolean = true;

  constructor(private articulosservice : ArticulosService) { }

  ngOnInit(): void {
    this.pedirDolar();

    
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.articulosAmazon.forEach(articulo =>{
      articulo['precio']='Hola';
    })

  }

  async pedirDolar(){
    this.valorDolar = await this.articulosservice.getDolar();
    
  }

  // esconderArticulos() {
  //   this.mostrar=!this.mostrar;
  // }

}
