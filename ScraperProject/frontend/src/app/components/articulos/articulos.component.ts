import { Component, OnInit, Input } from '@angular/core';
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

  valorDolar : Object;

  mostrar: boolean = true;

  constructor(private articulosservice : ArticulosService) { }

  ngOnInit(): void {
    async() =>{
      this.valorDolar = await this.articulosservice.getDolar();
    }
  }

  esconderArticulos() {
    this.mostrar=!this.mostrar;
  }

}
