import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

declare const bootstrap: any;

@Injectable({
 providedIn: 'root',
})
export class SharedService {
 private messageSubject = new BehaviorSubject<string>('');
 message$ = this.messageSubject.asObservable();

 setMessage(message: string) {
  this.messageSubject.next(message);
 }

 getMessage() {
  return this.messageSubject.getValue();
 }

 showToast(typeToast: string, delay: number = 5000) {
  const className = typeToast === 'sucess' ? '.toast-sucess' : '.toast-error';
  debugger;
  let toast = new bootstrap.Toast(document.querySelector(className), { delay: delay })
  toast.show();
}
}
