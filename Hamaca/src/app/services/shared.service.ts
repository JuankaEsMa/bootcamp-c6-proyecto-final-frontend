import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
}
