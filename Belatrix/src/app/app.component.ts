import { Pipe,PipeTransform, Component, OnInit } from '@angular/core';

import {FileService} from './app.service';
import {Localidad} from './localidad/localidad.component';
import { PapaParseService } from 'ngx-papaparse';
//import {Pipe, PipeTransform} from 'angular/core';
import {Place} from './place/place.component';
import {LocalidadService} from './services/localidad.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  providers:[LocalidadService, Localidad]
})

export class AppComponent implements OnInit{ 
 
  constructor(private fileService: FileService, private papa: PapaParseService){  
  );
            
  private ngOnInit(): void{
  };
}
         