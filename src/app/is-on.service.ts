import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IsOnService {
  private booleanState = new BehaviorSubject<boolean>(false);
  booleanState$ = this.booleanState.asObservable();
  setBooleanState(value: boolean) {
    this.booleanState.next(value);
  }
  constructor() {}
}
