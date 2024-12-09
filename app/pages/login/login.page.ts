import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario_creado: string = '';
  contrasena_creada: string = '';
  nombre_creado: string = '';

  mdl_usuario: string = '';
  mdl_contrasena: string = '';
  mdl_contrasenanueva: string = '';

  constructor(private router: Router) { }

  ngOnInit() {
    // SE RECIBEN LOS PARÁMETROS ENVIADOS DE OTRAS PÁGINAS
    let extras = this.router.getCurrentNavigation();

    if(extras?.extras.state) {
      this.usuario_creado = extras?.extras.state['user'];
      this.contrasena_creada = extras?.extras.state["pass"];
      this.nombre_creado = extras?.extras.state["name"];
      this.mdl_contrasenanueva = extras?.extras.state["pass"];
    }
  }

  irCrearUsuario() {
    let extras: NavigationExtras = {
      replaceUrl: true
    }

    this.router.navigate(['crear-usuario'], extras);
  }

  login() {
    if(this.mdl_usuario == '' && this.mdl_contrasena == '') {
      console.log('DEBE INGRESAR CREDENCIALES');
    }
    else if (this.mdl_contrasenanueva == this.mdl_contrasena &&
      this.mdl_usuario == this.usuario_creado)
      {
        this.router.navigate(['principal']);
}
    else if(this.mdl_usuario == this.usuario_creado 
          && this.mdl_contrasena == this.contrasena_creada) {
            this.router.navigate(['principal']);
    } else {
      console.log('CREDENCIALES INVÁLIDAS');
    }
  }
  restablecer() {
    this.router.navigate(['restablecer']);
  }
}

