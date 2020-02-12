import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css']
  
})
export class ArticulosComponent implements OnInit {
  
  @Input() articulos: Object[];

  constructor( ) { }

  ngOnInit(): void {
  }

  


}
