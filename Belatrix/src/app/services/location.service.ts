import {Http, Response, Headers} from "@angular/http";
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import {Location} from '../location/location.component';

import { PapaParseService } from 'ngx-papaparse';
import { Place } from "../place/place.component";

@Injectable()
export class LocationService {

   constructor( private papa: PapaParseService){

   }
 
  parseData(data:any):any{
    let parsedData:any[] = [];
    this.papa.parse(data,{
      complete: (results) => {
        parsedData.push(results.data);
      },
      error => {
        console.log('error');
      }
    });
    return parsedData;
  };

  parsePlace(data:any[]):any[]{
    let parsedData:any[] = [];
    let auxData:any[] = [];
    for (let i=0; i < data.length-1; i++){
      data[i][0] = data[i][0].slice(1, -1);
      auxData = data[i][0].split("/ ");
      auxData = this.cleanSpace(auxData);
      parsedData.push(auxData);
    }    
    return parsedData;
  };

  parseCode(data:any[]):Location[]{
    let locationParsed:any[] = [];
    for (let i=0; i < data.length; i++){
      let codeArray:any[] = [];
      for (let j=0; j < data[i].length; j++){
        codeArray[j] = data[i][j];
        if (j < 2) 
        codeArray[j] = data[i][j].slice(0, -1);
      };
      locationParsed.push(codeArray);      
    };
    return locationParsed;
  };

  getData(data:any[], type:String ):any[]{
    let locationData = new Location;
    for (let i=0; i < data.length; i++){
        let placeArray:Place[] = []; 
        locationData.setType(this.setType(data[i].length));
        if(locationData.getType() === type){
            for (let j=0; j < data[i].length; j++){
                let placeData = new Place;
                placeData.setCode(this.getCode(data[i][j]));
                placeData.setName(this.getName(data[i][j]));
                placeData.setFatherCode(this.getFatherCode(data, i, j));
                placeData.setFatherDesciption(this.getFatherDesciption(data, i, j));        
                placeArray[0] = placeData;
            }
            locationData.place.push(placeArray);
        }
    }
    locationData.setType(type);
    return locationData;
  };

  cleanSpace(data:any[]):any[]{
    let placeArray:any[] = [];
    for (let i=0; i < data.length; i++){
      if (data[i].length > 2 )
      placeArray[i] = data[i];
    }
    return placeArray;
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

  getCode(data:String):Number{
    let code:any[];
    code = data.split(" ").slice(0, 1);
    return code[0];
  };

  getName(data:String):string{
    let code:any[];
    code = data.split(" ").slice(1);
    return code[0];
  };

  getFatherCode(data:any[], i:Number, j:Number):Number{
    let code:any[] = [];
    if (j > 0 ){
      code[0] = this.getCode(data[i][j-1]);
    }
    else{
      code[0] = '-';
    };
    return code[0];
  };

  getFatherDesciption(data:any[], i:number, j:number):string{
    let code:string[] = [];
    if (j > 0 ){
      code[0] = this.getName(data[i][j-1]);
    }
    else{
      code[0] = '-';  
    };
    return code[0];
  };
}