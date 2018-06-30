import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import swal from 'sweetalert2';
import { UsuarioService } from '../../servicios/usuario/usuario.service';
import { MiHttpService } from '../../servicios/http/mi-http.service';
import { Vehiculo } from '../../clases/vehiculo';
import { VehiculoService } from '../../servicios/vehiculo/vehiculo.service';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
@Component({
  selector: 'app-tabla-mis-vehiculos',
  templateUrl: './tabla-mis-vehiculos.component.html',
  styleUrls: ['./tabla-mis-vehiculos.component.css']
})
export class TablaMisVehiculosComponent implements OnInit {
  mascotas: SelectItem[];
  cuerpoTabla: any;
  cols: any[];
  tituloTabla = "Seleccionar mascota para turno";

  vehiculoSeleccionado: Vehiculo;

  @Input() id_usuario: any;
  @Output() seleccion = new EventEmitter<any>();
  constructor(private miVehiculo: Vehiculo, private miHttp: MiHttpService, private miRouter: Router, private miServicioVehiculo: VehiculoService, private miUsuario: UsuarioService) { }

  ngOnInit() {
    this.miServicioVehiculo.traerVehiculosPorDuenio(this.id_usuario).then(data => {
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

  onRowSelect(event) {
    console.log(event);
    this.seleccion.emit(this.vehiculoSeleccionado);
  }

}
