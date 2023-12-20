import { Injectable } from '@angular/core';

const TOKEN_KEY = 'token';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signOut():void {
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    }
  }

  public saveToken(token:string):void{
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.setItem(TOKEN_KEY, token);
    }
  }

  public getToken(): string | null  {
    let token : string | null = '';
    if (typeof localStorage !== 'undefined') {
      token = localStorage.getItem(TOKEN_KEY);
    }
    return token;
  }

}
