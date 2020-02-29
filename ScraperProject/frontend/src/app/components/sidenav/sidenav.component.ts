import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { ArticulosService } from "../../services/articulos.service";

import {ArticulosComponent} from "../articulos/articulos.component";

import { NgForm } from '@angular/forms';

import { AuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";




/** @title Responsive sidenav */
@Component({
  selector: 'app-sidenav',
  templateUrl: 'sidenav.component.html',
  styleUrls: ['sidenav.component.css'],
  providers: [ArticulosService]
})
export class SidenavComponent implements OnInit, OnDestroy {
  @ViewChild(ArticulosComponent ) child: ArticulosComponent ;

  articulos: Object;
  articulosAmazon: Object;
  articulosEbay : Object;
  listaArticulos : Object;

  loading: boolean = false;

  hayInfoGuardada: boolean=false; 
  
  user: SocialUser= null;
  loggedIn: boolean;
  
  readonly URL_API = 'http://localhost:3000/api/articulos';

    panelOpenState = false;
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(private authService: AuthService,private articulosservice : ArticulosService,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  signInWithGoogle(): void {
    window.localStorage.removeItem("articulos");
    window.localStorage.removeItem("articulosAmazon");
    window.localStorage.removeItem("articulosEbay");

    window.localStorage.removeItem("precioPromedio");

    this.child.limpiarStorage();

    this.listaArticulos=null;

    this.hayInfoGuardada=false;

    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
 
  signOut(): void {
  
    this.child.limpiarStorage();
    this.authService.signOut();
    this.listaArticulos=null;

    this.hayInfoGuardada=false;
  }


   ngOnDestroy(): void {
     this.mobileQuery.removeListener(this._mobileQueryListener);
   }

  ngOnInit(): void {

    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
     });

     this.hayInfoGuardada= localStorage.getItem("articulos")!=null;

  }

  async getArticulos(form: NgForm){

    this.loading=true;
    
    this.listaArticulos = await this.articulosservice.getArticulos(form.name.toString());
    this.articulos = this.listaArticulos[0];
    this.articulosAmazon = this.listaArticulos[1];
    this.articulosEbay = this.listaArticulos[2];

    this.loading=false;

   }

   orderPriceDownMercadoLibre(){
     this.child.orderByPriceMercadoLibre();
   }

   orderPriceUpMercadoLibre(){
    this.child.orderByPriceUpMercadoLibre();
  }

  orderPriceDownAmazon(){
    this.child.orderByPriceAmazon();
  }

  orderPriceUpAmazon(){
   this.child.orderByPriceUpAmazon();
 }

 orderPriceDownEbay(){
  this.child.orderByPriceEbay();
}

orderPriceUpEbay(){
 this.child.orderByPriceUpEbay();
}
 
orderNameMercadoLibre(){
  this.child.orderByNameMercadoLibre();
}

orderNameAmazon(){
  this.child.orderByNameAmazon();
}

orderNameEbay(){
  this.child.orderByNameEbay();
}

orderNameUpMercadoLibre(){
  this.child.orderByNameUpMercadoLibre();
}

orderNameUpAmazon(){
  this.child.orderByNameUpAmazon();
}

orderNameUpEbay(){
  this.child.orderByNameUpEbay();
}




}

