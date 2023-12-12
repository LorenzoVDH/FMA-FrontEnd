import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './core/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'FleetManager-WebApp';
  public userAuthenticated = false;

  constructor(private _authService: AuthenticationService){
    this._authService.loginChanged.subscribe(userAuthenticated => {
      this.userAuthenticated = userAuthenticated;
    })
  }
  
  ngOnInit(): void {
    this._authService.isAuthenticated()
      .then(userAuthenticated => {
        this.userAuthenticated = userAuthenticated;
      })
  }
}
