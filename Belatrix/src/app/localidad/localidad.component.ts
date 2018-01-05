import { Pipe,PipeTransform, Component, OnInit, Input, Output } from '@angular/core';

import {LocalidadService} from '../services/localidad.service';
import {Place} from '../place/place.component';
import {FileService} from '../app.service';

import { PapaParseService } from 'ngx-papaparse';
import { Injectable } from '@angular/core';
 
import {Http, Response, Headers} from "@angular/http";
import { Observable } from 'rxjs/Observable';



@Component({
  selector: 'localidad',
  templateUrl: './localidad.component.html',
  styleUrls: ['./localidad.component.css'],
  providers:[LocalidadService, Place]
})


export class Localidad  implements OnInit{ 

    @Input() type:String;
    public place: Place[] = [];
    public imposible: number;
    
    constructor(private fileService: FileService, private localidadService: LocalidadService, public ciudad: Place){
        console.log();
    };
    ngOnInit(){
        let lugaresParseados:any[] = [];
        let datosParseados:any[] = [];
        this.fileService.getFile()
        .subscribe(data => { 
          let nuevito  = this.localidadService.parsearDatos(data._body);
          nuevito  = this.localidadService.parsearLugares(nuevito[0]);
          nuevito  = this.localidadService.parsearCodigo(nuevito);
          nuevito  = this.localidadService.llenarTabla(nuevito, this.type);
          this.place = nuevito;
          console.log(this.getPlace()); 
       })    
    };
    setType(type:String){
        this.type  = type;
    };

    getType():String {
        return this.type;
    };
    getPlace():any[]{
        return this.place.place;
    };
}