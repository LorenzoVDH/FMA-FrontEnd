import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserManager, User, UserManagerSettings } from 'oidc-client';
import { Constants } from '../models/constants';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  private _userManager:UserManager;
  private _user: User; 
  private _loginChangedSubject = new Subject<boolean>();
  public loginChanged = this._loginChangedSubject.asObservable();

  private get idpSettings():UserManagerSettings{
    return {
      authority: Constants.idpAuthority,
      client_id: Constants.clientId,
      client_secret: Constants.clientSecret,
      redirect_uri: `${Constants.clientRoot}/signin-callback`,
      scope: "openid profile api.read api.write",
      response_type: "code",
      post_logout_redirect_uri: `${Constants.clientRoot}/signout-callback`,
    }
  }
  
  constructor(private http: HttpClient) {
    this._userManager = new UserManager(this.idpSettings); 
  }

  public login = () => {
    return this._userManager.signinRedirect(); 
  }

  public isAuthenticated = (): Promise<boolean> => {
    return this._userManager.getUser()
    .then(user => {
      if(this._user !== user){
        this._loginChangedSubject.next(this.checkUser(user));
      }
      this._user = user;
        
      return this.checkUser(user);
    })
  }
  
  private checkUser = (user : User): boolean => {
    return !!user && !user.expired;
  }  

  get tokenHeaders():any{
    const token = sessionStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    
    return headers;
  }

  public finishLogin = (): Promise<User> => {
    return this._userManager.signinRedirectCallback()
      .then(user => {
        this._user = user;
        console.log("ACCESSTOKEN BIJ FINISHLOGIN: "+user.access_token); 
        localStorage.setItem("access_token", user.access_token); 
        this._loginChangedSubject.next(this.checkUser(user));
        return user;
      }) 
  }
}
