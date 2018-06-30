import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'edadPipe'
})
export class EdadPipePipe implements PipeTransform {
//><
  transform(value: any, args?: any): any {
    if (value < 2 ){
      return 'Cachorro';
    }else if( value >= 2 && value < 8){
      return 'Adulto';
    }else if (value >= 8 && value < 30){
      return 'Anciano';
    }else if (value == 1000){
      return 'Perro';
    }else if (value == 2000){
      return 'Gato';
    }else{
      return value;
    }
  }

}
