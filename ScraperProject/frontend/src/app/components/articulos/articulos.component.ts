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
  valorDolarParsed : string;

  suma: number=0;
  precioPromedio: number=null;
  cantidadItems: number = 0;
  aux=0;
  valorTemp: number;
  cantidadARestar: number = 0;

  // mostrar: boolean = true;

  constructor(private articulosservice : ArticulosService) { }

  ngOnInit(): void {
    this.pedirDolar();

    
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.

    if((this.articulos!=null)&&(this.articulosAmazon!=null)&&(this.articulosEbay!=null)){

    this.suma=0;
    

    this.articulos.forEach(articulo =>{
      this.suma = this.suma +(parseFloat(articulo['precio']));
     
     
    })
    
    console.log("PASE EL PRIMER BUCLE, SUMA ES ",this.suma);

    this.aux=0;

    this.articulosAmazon.forEach(articulo =>{
      if(articulo['precio']==null){ this.cantidadARestar++;}
      else{
      this.valorTemp = parseFloat(articulo['precio'])*parseFloat(this.valorDolarParsed)*(1.3);
      articulo['precio']=parseFloat(this.valorTemp.toFixed(2));
      this.suma = this.suma +(articulo['precio']);
      if(this.aux==0){
        console.log("ARTICULO[PRECIO] amazon ES ", articulo['precio'], "Y parseFloat(...) es ",parseFloat(articulo['precio']));
        console.log("SUMA ES ",this.suma);
      }else{
        
          console.log("SUMA EN ITERACION ",this.aux," amazon ES ",this.suma);
        
      }
      //console.log("aux es ",this.aux);
      this.aux++;
    }
    })

    console.log("PASE BUCLE AMAZON, suma es ",this.suma);

    this.articulosEbay.forEach(articulo =>{
      articulo['precio']=parseFloat((parseFloat(articulo['precio'])*parseFloat(this.valorDolar.toString())*1.3).toFixed(2));
      this.suma = this.suma +(articulo['precio']);
    })

   this.cantidadItems = this.articulos.length + this.articulosAmazon.length + this.articulosEbay.length;
   this.precioPromedio = this.suma/(this.cantidadItems-this.cantidadARestar);

   console.log("PRECIO PROMEDIO",this.precioPromedio);
   console.log("CANTIDAD ITEMS",this.cantidadItems-this.cantidadARestar);
   console.log("SUMA",this.suma);

  }
  }

  async pedirDolar(){
    this.valorDolar = await this.articulosservice.getDolar();
    this.valorDolarParsed = this.valorDolar.toString();
    this.valorDolarParsed = this.valorDolarParsed.split(',').join('.');
    
  }

  // esconderArticulos() {
  //   this.mostrar=!this.mostrar;
  // }

}
