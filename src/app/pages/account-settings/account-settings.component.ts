import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {
  public linkTheme = document.querySelector('#theme');
  constructor() { }

  ngOnInit(): void {
  }

  changeTheme(theme:string){
   const url = `./assets/css/colors/${theme}.css`
   this.linkTheme?.setAttribute('href',url)
   localStorage.setItem('theme',url)
   this.checkAccount()
  }

  checkAccount(){
    const links = document.querySelectorAll('.selector')
    links.forEach(element=>{
      element.classList.remove('working');
      const btnTheme = element.getAttribute('data-theme')
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`
      const currentTheme = this.linkTheme?.getAttribute('href')
      if(btnThemeUrl === currentTheme){
        element.classList.add('working')
      }

    })
  }

}
