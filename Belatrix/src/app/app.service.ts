import { Injectable } from '@angular/core';
 
import {Http, Response, Headers} from "@angular/http";
import { IfObservable } from 'rxjs/observable/IfObservable';
import { Observable } from 'rxjs/Observable';
  
@Injectable()
export class FileService {
  
   constructor(private _http: Http){}
 
   getFile(): Observable<any>{
    return this._http
        .get("../assets/lugares.txt");
   };
}