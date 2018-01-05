import { Pipe,PipeTransform, Component, OnInit, Input, Output } from '@angular/core';

//import {FileService} from './services/app.service';
import { PapaParseService } from 'ngx-papaparse';

@Component({
  selector: 'place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css'],
  providers:[]//FileService]
})


export class Place{ 

    @Input() code: Number;
    @Input() name: String;
    @Input()  fatherCode: Number;
    @Input()  fatherDesciption: String;

    constructor(){
        this.code  = -1;
        this.name  = '-';
        this.fatherCode  = -1;
        this.fatherDesciption  = '-';
    };
 
    getCode():Number {
        return this.code;
    };
    setCode(code:Number):void {
         this.code = code;
    };
    getName():String {
        return this.name;
    };
    setName(name:String):void {
         this.name = name;
    };
    getFatherCode():Number {
        return this.fatherCode;
    };
    setFatherCode(fatherCode:Number):void {
         this.fatherCode = fatherCode;
    };
    getFatherDesciption():String {
        return this.fatherDesciption;
    };
    setFatherDesciption(fatherDesciption:String):void {
         this.fatherDesciption = fatherDesciption;
    }; 
}