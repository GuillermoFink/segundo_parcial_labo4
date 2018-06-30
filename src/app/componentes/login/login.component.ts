import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../clases/usuario';
import { UsuarioService } from '../../servicios/usuario/usuario.service';
import { MiHttpService } from '../../servicios/http/mi-http.service';
import { LoginService } from '../../servicios/login/login.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: string;
  password: string;
  constructor(private miLoginService: LoginService, private miUsuario: Usuario, private miServicioUsuario: UsuarioService, private miHttp: MiHttpService, private miRoute: Router) { }

  ngOnInit() {
  }

  login() {
    let datos = { mail: this.usuario, password: this.password };
    this.miLoginService.verificarUsuario(datos)
      .then(data => {
        console.log(data);
        if (data == 'error') {
          swal({
            type: 'error',
            title: 'Oops...',
            text: 'Nombre de usuario o contraseña inválidos',
          })
        } else {
          //Guardo el Token
          localStorage.setItem('token', data);
          //Decodifico para leer Payload
          let payload = data.split('.')[1];
          let pay2 = payload.replace('-', '+').replace('_', '/');
          let datos = JSON.parse(atob(pay2));
          //Cargo datos en mi servicio de usuario
          console.log(datos);
          this.miServicioUsuario.setNombreUsuario(datos.data[0].nombre);
          this.miServicioUsuario.setApellidoUsuario(datos.data[0].apellido);
          this.miServicioUsuario.setIdUsuario(datos.data[0].id);
          this.miServicioUsuario.setMailUsuario(datos.data[0].mail);
          this.miServicioUsuario.setPasswordUsuario(datos.data[0].password);
          this.miServicioUsuario.setTipoUsuario(datos.data[0].tipo);
          let nombre = this.miServicioUsuario.getNombreUsuario();
          //Consulto tipo de usuario para su navegacion
          let timerInterval
          swal({
            title: 'Bienvenido '+ nombre,
            html: '<strong>Accediendo al sistema</strong>',
            timer: 1000,
            onOpen: () => {
              swal.showLoading()
              timerInterval = setInterval(() => {
              }, 100)
            },
            onClose: () => {
              clearInterval(timerInterval)
            }
          }).then((result) => {
            if (
              // Read more about handling dismissals
              result.dismiss === swal.DismissReason.timer
            ) {
              //console.log('I was closed by the timer')
            }
          })
          if (this.miServicioUsuario.getTipoUsuario() == 10) {
            this.miRoute.navigate(['/admin']);
          } else {
            this.miRoute.navigate(['/cliente']);
          }
        }


      })
  }
  test() {
    let data = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1Mjk2OTg0ODksImV4cCI6MjgwMDg4OTY5ODQ4OSwiYXVkIjoiNDNiNjgyY2M1ZTQyMGYzN2U3M2E1ODgwNmY1NDhlZGQxZDg5Yjg1ZCIsImRhdGEiOlt7ImlkIjoxLCJub21icmUiOiJKdWFuIiwiYXBlbGxpZG8iOiJQZXJleiIsIm1haWwiOiJqdWFuQGhvdG1haWwuY29tIiwicGFzc3dvcmQiOiIxMjMiLCJ0aXBvIjoxMH1dLCJhcHAiOiJUcCBIdWJlcnRvIn0.bGx5PXjKJT34Oy1UNuzkFSiCVS2KdZPdqTQvS2k9RKA";
    let payload = data.split('.')[1];
    let pay2 = payload.replace('-', '+').replace('_', '/');
    let datos = JSON.parse(atob(pay2));
    console.log(datos);

  }

}
