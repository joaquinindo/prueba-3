import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.page.html',
  styleUrls: ['./restablecer.page.scss'],
})
export class RestablecerPage implements OnInit {


  usuario_creado: string = '';
  mdl_contrasena: string = '';
  nombre_creado: string = '';

  mdl_usuarioc: string = '';
  mdl_contrasenan: string = '';
  mdl_contrasenanueva: string = '';

  constructor(private router: Router) { }

  ngOnInit() {
     // SE RECIBEN LOS PARÁMETROS ENVIADOS DE OTRAS PÁGINAS
     let extras = this.router.getCurrentNavigation();

     if(extras?.extras.state) {
       this.usuario_creado = extras?.extras.state['user'];
       this.mdl_contrasenan = extras?.extras.state["pass"];
     }
  }

  Restablecer() {
    

    // OBJETO QUE PERMITE ENVIAR PARÁMETROS DE UNA 
    // PÁGINA A OTRA
    let extras: NavigationExtras = {
      state: {
        user: this.mdl_usuarioc,
        pass: this.mdl_contrasenanueva
      }
    }

    this.router.navigate(['login'], extras);
  }

}
