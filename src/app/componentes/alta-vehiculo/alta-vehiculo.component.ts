import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import swal from 'sweetalert2';
import { Vehiculo } from '../../clases/vehiculo';
import { VehiculoService } from '../../servicios/vehiculo/vehiculo.service';
import { UsuarioService } from '../../servicios/usuario/usuario.service';
import { MiHttpService } from '../../servicios/http/mi-http.service';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { Message } from 'primeng/components/common/api';
import { Usuario } from '../../clases/usuario';


@Component({
  selector: 'app-alta-vehiculo',
  templateUrl: './alta-vehiculo.component.html',
  styleUrls: ['./alta-vehiculo.component.css']
})
export class AltaVehiculoComponent implements OnInit {
  tipoVehiculo: SelectItem[];
  cuerpoTabla: any;
  cols: any[];
  tituloTabla = "MIS VEHICULOS";
  userform: FormGroup;
  constructor(private fb: FormBuilder,private miVehiculo: Vehiculo, private miHttp: MiHttpService, private miRouter: Router, private miServicioVehiculo: VehiculoService, private miUsuario: UsuarioService) {
    this.tipoVehiculo = [
      { label: 'Tipo', value: null },
      { label: 'Auto', value: 1000 },
      { label: 'Moto', value: 2000 },
      { label: 'Camioneta', value: 3000 }
    ];
   }

  ngOnInit() {
    this.userform = this.fb.group({
      'marca': new FormControl('', Validators.required),
      'color': new FormControl('', Validators.required),
      'patente': new FormControl('', Validators.required),
      'kilometros': new FormControl('', Validators.required),
      'tipo': new FormControl('', Validators.required),
    });
    let datos= {id_usuario: this.miUsuario.getIdUsuario()};
    this.miServicioVehiculo.traerVehiculosPorDuenio(datos).then(data => {
      if (data != null) {
        this.cuerpoTabla = data;
        this.cols = [
          { field: 'marca', header: 'Marca' },
          { field: 'color', header: 'Color' },
          { field: 'patente', header: 'Patente' },
          { field: 'kilometros', header: 'Kilometros' },
          { field: 'tipo', header: 'Tipo' }
        ]
      }

    });
  }

  onSubmit(value: string) {

    console.log(this.miUsuario.getApellidoUsuario());

    this.miVehiculo.color = this.userform.value.color;
    this.miVehiculo.kilometros = this.userform.value.kilometros;
    this.miVehiculo.marca = this.userform.value.marca;
    this.miVehiculo.patente = this.userform.value.patente;
    this.miVehiculo.tipo = this.userform.value.tipo;
    this.miVehiculo.id_usuario=this.miUsuario.getIdUsuario();

    console.log(this.miVehiculo);
    this.miServicioVehiculo.agregarVehiculo(this.miVehiculo)
      .then(data => {
        if (data == "ok") {
          swal({
            type: 'success',
            title: 'OK',
            text: 'Vehiculo agregado correctamente.'
          })
          this.userform.reset();
          this.miRouter.navigate(['/cliente/mascotas']);
        } else {
          swal({
            type: 'error',
            title: 'Error',
            text: 'Error al dar de alta el vehiculo.'
          })
        }
      });

  }

}
