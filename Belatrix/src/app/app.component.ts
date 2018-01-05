import { Pipe,PipeTransform, Component, OnInit } from '@angular/core';

import {FileService} from './app.service';
import {Location} from './location/location.component';
import { PapaParseService } from 'ngx-papaparse';
//import {Pipe, PipeTransform} from 'angular/core';
import {Place} from './place/place.component';
import {LocationService} from './services/location.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[LocationService, Location]
})

export class AppComponent { 
 
  constructor(private fileService: FileService, private papa: PapaParseService){  
  );
}
         