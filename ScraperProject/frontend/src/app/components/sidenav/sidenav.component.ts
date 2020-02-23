import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import { ArticulosService } from "../../services/articulos.service";

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
export class SidenavComponent implements OnDestroy, OnInit {

  articulos: Object;
  articulosAmazon: Object;
  articulosEbay : Object;
  listaArticulos : Object;
  
  user: SocialUser;
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
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
 
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  } 
 
  signOut(): void {
    this.authService.signOut();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit(): void {

    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
    
  }

  async getArticulos(form: NgForm){
    
    this.listaArticulos = await this.articulosservice.getArticulos(form.name.toString());
    this.articulos = this.listaArticulos[0];
    this.articulosAmazon = this.listaArticulos[1];
    this.articulosEbay = this.listaArticulos[2];

   }

 
}

