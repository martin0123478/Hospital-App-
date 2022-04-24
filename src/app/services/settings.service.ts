import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private linkTheme = document.querySelector('#theme');

  constructor() { 
    const url = localStorage.getItem('theme') ||  './assets/css/colors/default-dark.css'
   this.linkTheme?.setAttribute('href',url)
  }
}
