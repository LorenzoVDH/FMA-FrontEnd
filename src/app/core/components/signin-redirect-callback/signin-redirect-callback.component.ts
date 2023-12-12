import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin-redirect-callback',
  template: `<div></div>`
})

export class SigninRedirectCallbackComponent implements OnInit {
  constructor(private _authService: AuthenticationService, private _router: Router) { }

  ngOnInit(): void {
    this._authService.finishLogin()
    .then(_ => {
      this._router.navigate(['/'], { replaceUrl: true });
    })
  }
}