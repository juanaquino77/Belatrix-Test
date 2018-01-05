import {Http, Response, Headers} from "@angular/http";
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import {Localidad} from '../localidad/localidad.component';

import { PapaParseService } from 'ngx-papaparse';
import { Place } from "../place/place.component";

@Injectable()
export class LocalidadService {

  public title : string = "Test Frontend";
  public Tabla_1: String  = 'departamento';
  public Tabla_2: String  = 'provincia';
  public Tabla_3: String  = 'distrito';
  public departamento : Localidad[] = [];
  public provincia : Localidad[] = [];
  public distrito : Localidad[] = []; 

  
   constructor( private papa: PapaParseService){

   }
 
  parsearDatos(datos:any):any{
    let datosParseados:any[] = [];
    this.papa.parse(datos,{
      complete: (results) => {
        datosParseados.push(results.data);
      },
      error => {
        console.log('error');
      }
    });
    return datosParseados;
  };

  parsearLugares(datos:array):array{
    let datosParseados:any[] = [];
    let prueba:any[] = [];
    let pru:any[] = [];
    for (let i=0; i < datos.length-1; i++){
      datos[i][0] = datos[i][0].slice(1, -1);
      prueba = datos[i][0].split("/ ");
      prueba = this.limpiar(prueba);
      datosParseados.push(prueba);
    }    
    return datosParseados;
  };

  parsearCodigo(datos:array):Localidad[]{
    let localidadParseada:any[]= [];
    let prueba:any[] = [];
    for (let i=0; i < datos.length; i++){
      let aux3:any[] = [];
      let aux:any[] = [];
      for (let j=0; j < datos[i].length; j++){
        aux3[j] = datos[i][j];
        if (j < 2) 
          aux3[j] = datos[i][j].slice(0, -1);
      };
    prueba.push(aux3);      
    };
    localidadParseada = prueba;
    return localidadParseada;
  };

  llenarTabla(data:Array<any>, type:String ):Array<any>{
    let datosDeLocalidades = new Localidad;
    for (let i=0; i < data.length; i++){
        let placeArray:Place[] = []; 
        datosDeLocalidades.setType(this.setType(data[i].length));
        if(datosDeLocalidades.getType() === type){
            for (let j=0; j < data[i].length; j++){
                let datosDeLugares = new Place;
                datosDeLugares.setCode(this.getCodigo(data[i][j]));
                datosDeLugares.setName(this.getNombre(data[i][j]));
                datosDeLugares.setFatherCode(this.getCodigoPadre(data, i, j));
                datosDeLugares.setFatherDesciption(this.getDescripcionPadre(data, i, j));        
                placeArray[0] = datosDeLugares;
            }
            datosDeLocalidades.place.push(placeArray);
        }
    }
    datosDeLocalidades.setType(type);
    console.log(datosDeLocalidades); 
    return datosDeLocalidades;
  };

  limpiar(datos:array):array{
    let prueba2:any[] = [];
    for (let i=0; i < datos.length; i++){
      if (datos[i].length > 2 )
        prueba2[i] = datos[i];
    }
    return prueba2;
  };

  setType(type:Number):String{
    if(type === 1)
    return 'departamento';
    else{
      if(type === 2)
        return 'provincia';
        else
          return 'distrito';
      };
  };

  getCodigo(datos:array):number{
    let codigo:any[] = [];
    codigo = datos.split(" ").slice(0, 1);
    return codigo[0];
  };

  getNombre(datos:array):string{
    let codigo:string[] = [];
    codigo = datos.split(" ").slice(1);
    return codigo[0];
  };

  getCodigoPadre(datos:array, i:number, j:number):number{
    let codigo:string[] = [];
    if (j > 0 ){
      codigo[0] = this.getCodigo(datos[i][j-1]);
    }
    else{
        codigo[0] = '-';
    };
    return codigo[0];
  };

  getDescripcionPadre(datos:array, i:number, j:number):string{
    let codigo:string[] = [];
    if (j > 0 ){
      codigo[0] = this.getNombre(datos[i][j-1]);
    }
    else{
        codigo[0] = '-';  
    };
    return codigo[0];
  };




}