import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductServiceService {
  makeRequest(value: string, delayDuration: number) {
    // simulate http request
    return of(`Complete: ${value}`).pipe(delay(delayDuration));
  }
  constructor() {}
}
