import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.page.html',
  styleUrls: ['./crear-usuario.page.scss'],
})
export class CrearUsuarioPage implements OnInit {

  mdl_usuario: string = '';
  mdl_nombre: string = '';
  mdl_contrasena: string = '';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  crearUsuario() {

    // OBJETO QUE PERMITE ENVIAR PARÁMETROS DE UNA 
    // PÁGINA A OTRA
    let extras: NavigationExtras = {
      state: {
        user: this.mdl_usuario,
        name: this.mdl_nombre,
        pass: this.mdl_contrasena
      }
    }

    this.router.navigate(['login'], extras);
  }

}
