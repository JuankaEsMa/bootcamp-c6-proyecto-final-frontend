import { Injectable } from '@angular/core';

const TOKEN_KEY = 'token';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signOut():void {
    localStorage.removeItem(TOKEN_KEY);
    console.log(this.getToken)
  }

  public saveToken(token:string):void{
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.setItem(TOKEN_KEY, token);
    }
  }

  public getToken(): string | null  {
    let token : string | null = null;
    if (typeof localStorage !== 'undefined') {
      token = localStorage.getItem(TOKEN_KEY);
    }
    return token;
  }

}
