import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Mascota } from '../../clases/mascota';
import { Vehiculo } from '../../clases/vehiculo';
import { VehiculoService } from '../../servicios/vehiculo/vehiculo.service';
import { MascotaService } from '../../servicios/mascota/mascota.service';
import { UsuarioService } from '../../servicios/usuario/usuario.service';
import { MiHttpService } from '../../servicios/http/mi-http.service';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-ver-mascotas',
  templateUrl: './ver-mascotas.component.html',
  styleUrls: ['./ver-mascotas.component.css']
})
export class VerMascotasComponent implements OnInit {
  mascotas: SelectItem[];
  cuerpoTabla: any;
  cols: any[];
  tituloTabla = "Seleccionar mascota para turno";
  mascotaSeleccionada: Mascota;
  opciones: any[];
  anios: number = 0;
  yearFilter: number;

  yearTimeout: any;
  constructor(private miMascota: Mascota, private miHttp: MiHttpService, private miRouter: Router, private miServicioMascota: MascotaService, private miUsuario: UsuarioService, private miVehiculo: Vehiculo, private miServicioVehiculo: VehiculoService) {
    this.opciones = [
      { label: 'Todos', value: null },
      { label: 'Auto', value: 1000 },
      { label: 'Moto', value: 2000 },
      { label: 'Camioneta', value: 3000 },
    ];
  }

  ngOnInit() {
    this.miServicioVehiculo.traerTodosLosVehiculos().then(data => {
      if (data != null) {
        this.cuerpoTabla = data;
        this.cols = [
          { field: 'marca', header: 'Marca' },
          { field: 'color', header: 'Color' },
          { field: 'patente', header: 'Patente' },
          { field: 'kilometros', header: 'Kilometros' },
          { field: 'tipo', header: 'Tipo' }
        ]
      } else {
        console.log("error al traer vehiculos");
      }
    });
  }

  onYearChange(event, dt) {
    if (this.yearTimeout) {
      clearTimeout(this.yearTimeout);
    }

    this.yearTimeout = setTimeout(() => {
      dt.filter(event.value, 'kilometros', 'gt');
    }, 250);
  }

  onRowSelect(datos) {
    console.log(datos);
  }

}
