import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../sevices/settings.service';
declare function customInitFunctions():any;
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {
  
  constructor(
    private settingservice:SettingsService
  ) { }

  ngOnInit(): void {
    customInitFunctions()
   
  }
 

}
