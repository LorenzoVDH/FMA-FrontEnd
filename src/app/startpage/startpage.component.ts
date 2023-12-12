import { Component } from '@angular/core';
import { AuthenticationService } from '../core/services/authentication.service';

@Component({
  selector: 'app-startpage',
  templateUrl: './startpage.component.html',
  styleUrls: ['./startpage.component.css']
})

export class StartpageComponent {
  constructor(private authenticationService:AuthenticationService){}

  onClick_login(){
    this.authenticationService.login();
  }
}

