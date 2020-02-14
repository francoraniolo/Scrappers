import { Component, OnInit } from '@angular/core';
import { ArticulosService } from "../../services/articulos.service";

import {Articulo} from '../../models/articulo';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [ArticulosService]
})
export class NavbarComponent {

  articulos: Object ;
  
  readonly URL_API = 'http://localhost:3000/api/articulos';

  constructor(private articulosservice : ArticulosService ) { }

  
  ngOnInit(): void {
  }

  async getArticulos(form: NgForm){
    
   this.articulos = await this.articulosservice.getArticulos(form.name.toString());
   console.log(form.name.toString())
   

  }

}
 
