import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import swal from 'sweetalert2';
import { Usuario } from '../../clases/usuario';
import { MiHttpService } from '../../servicios/http/mi-http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent implements OnInit {

  userform: FormGroup;
  constructor(private fb: FormBuilder, private miUsuario: Usuario, private miHttp: MiHttpService, private miRouter: Router) { }

  ngOnInit() {
    this.userform = this.fb.group({
      'mail': new FormControl('', Validators.required),
      'nombre': new FormControl('', Validators.required),
      'apellido': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
      'password2': new FormControl('', Validators.required)
    });
  }
  onSubmit(value: string) {
    if (this.userform.value.password == this.userform.value.password2) {
      this.miUsuario.nombre = this.userform.value.nombre;
      this.miUsuario.apellido = this.userform.value.apellido;
      this.miUsuario.mail = this.userform.value.mail;
      this.miUsuario.password = this.userform.value.password;
      this.miUsuario.tipo = 20;
      this.miHttp.httpPostP('altaUsuario', this.miUsuario)
        .then(data => {
          if (data == "ok") {
            swal({
              type: 'success',
              title: 'OK',
              text: 'Por favor iniciar sesión',
            })
            this.miRouter.navigate(['/login']);
          }
        })
    } else {
      swal({
        type: 'error',
        title: 'Oops...',
        text: 'Las contraseñas no coinciden por favor revisar las mismas.',
      })
    }
  }

}
