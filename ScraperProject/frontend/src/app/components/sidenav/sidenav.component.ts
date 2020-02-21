import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import { ArticulosService } from "../../services/articulos.service";

import { NgForm } from '@angular/forms';

/** @title Responsive sidenav */
@Component({
  selector: 'app-sidenav',
  templateUrl: 'sidenav.component.html',
  styleUrls: ['sidenav.component.css'],
  providers: [ArticulosService]
})
export class SidenavComponent implements OnDestroy {

  articulos: Object;
  articulosAmazon: Object;
  articulosEbay : Object;
  listaArticulos : Object;
  
  
  readonly URL_API = 'http://localhost:3000/api/articulos';

    panelOpenState = false;
  mobileQuery: MediaQueryList;

  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);

  fillerContent = Array.from({length: 50}, () =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);

  private _mobileQueryListener: () => void;

  constructor(private articulosservice : ArticulosService,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  async getArticulos(form: NgForm){
    
    this.listaArticulos = await this.articulosservice.getArticulos(form.name.toString());
    this.articulos = this.listaArticulos[0];
    this.articulosAmazon = this.listaArticulos[1];
    this.articulosEbay = this.listaArticulos[2];

   }

 
}

