import { Pipe,PipeTransform, Component, OnInit, Input, Output } from '@angular/core';

import {LocationService} from '../services/location.service';
import {Place} from '../place/place.component';
import {FileService} from '../app.service';

import { PapaParseService } from 'ngx-papaparse';
import { Injectable } from '@angular/core';
 
import {Http, Response, Headers} from "@angular/http";
import { Observable } from 'rxjs/Observable';



@Component({
  selector: 'location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
  providers:[LocationService, Place]
})


export class Location  implements OnInit{ 

    @Input() type:String;
    public place: Place[] = [];
    
    constructor(private fileService: FileService, private locationService: LocationService, public ciudad: Place){
    };

    ngOnInit(){
        this.fileService.getFile()
        .subscribe(data => { 
          let placeData  = this.locationService.parseData(data._body);
          placeData  = this.locationService.parsePlace(placeData[0]);
          placeData  = this.locationService.parseCode(placeData);
          this.place  = this.locationService.getData(placeData, this.type);
       })    
    };

    setType(type:String){
        this.type  = type;
    };

    getType():String {
        return this.type;
    };

    getArrayPlace():any[]{
        return this.place.place;
    };
}