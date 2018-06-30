import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import swal from 'sweetalert2';
import { Usuario } from '../../clases/usuario';
import { MiHttpService } from '../../servicios/http/mi-http.service';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-alta-usuario',
  templateUrl: './alta-usuario.component.html',
  styleUrls: ['./alta-usuario.component.css']
})
export class AltaUsuarioComponent implements OnInit {
  userform: FormGroup;
  constructor(private fb: FormBuilder, private miUsuario: Usuario, private miHttp: MiHttpService, private miRouter: Router) { }
  tipo: SelectItem[];
  ngOnInit() {
    this.tipo = [
      { label: 'Tipo', value: null },
      { label: 'Cliente', value: 20 },
      { label: 'ADmin', value: 10 }
    ];


    this.userform = this.fb.group({
      'mail': new FormControl('', Validators.email),
      'nombre': new FormControl('', Validators.required),
      'apellido': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
      'password2': new FormControl('', Validators.required),
      'tipo': new FormControl('',Validators.required)
    });
  }
  onSubmit(value: string) {
    if (this.userform.value.password == this.userform.value.password2) {
      this.miUsuario.nombre = this.userform.value.nombre;
      this.miUsuario.apellido = this.userform.value.apellido;
      this.miUsuario.mail = this.userform.value.mail;
      this.miUsuario.password = this.userform.value.password;
      this.miUsuario.tipo = this.userform.value.tipo;
      this.miHttp.httpPostP('altaUsuario', this.miUsuario)
        .then(data => {
          if (data == "ok") {
            swal({
              type: 'success',
              title: 'OK',
              text: 'Usuario creado correctamente!!',
            })
            this.miRouter.navigate(['/admin/verUsuarios'])
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
