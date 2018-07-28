import { Pipe,PipeTransform, Component, OnInit } from '@angular/core';

import {Location} from './location/location.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[Location]
})

export class AppComponent { 
 public title = 'Test - Frontend';
 

}
         