import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FavoritosService} from '../../services/favoritos.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {

  favoritos: Object[];
  idUser: string; 

  constructor(private router: ActivatedRoute,private favoritosService: FavoritosService) { }

  ngOnInit(): void {
    this.router.queryParams.subscribe(params =>{
      this.idUser = JSON.parse(params['idUser']);
    });
    this.favoritosService.getFavoritos(this.idUser).snapshotChanges().subscribe(item=>{
      this.favoritos = [];
      item.forEach(element =>{
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        this.favoritos.push(x as Object);
      })
    });

  }

  deleteFavorito($key:string){
    
    this.favoritosService.deleteFavorito($key);
  }

}
