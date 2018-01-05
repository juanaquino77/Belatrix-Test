import { NgModule, OnInit } from '@angular/core';
import { AlertModule } from 'ngx-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
 
import { HttpModule, JsonpModule } from '@angular/http';
 
import { AppComponent } from './app.component';
import { Location } from './location/location.component';
import { Place } from './place/place.component';

import { PapaParseModule } from 'ngx-papaparse';

import { AngularSplitModule } from 'angular-split';
import {FileService} from './app.service';
import {LocationService} from './services/location.service';

 
 
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    PapaParseModule
  ],
  declarations: [
    AppComponent,
    Location,
    Place  
  ],
  providers: [
   FileService, 
   LocationService,
   Location
  ],
  bootstrap: [ AppComponent ]
})
 
export class AppModule { }
