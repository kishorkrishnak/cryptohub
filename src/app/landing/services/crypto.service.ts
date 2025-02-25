// crypto.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  private currencySource = new BehaviorSubject<string>('usd');
  currency$ = this.currencySource.asObservable();

  constructor() {}

  setCurrency(currency: string): void {
    this.currencySource.next(currency);
  }
}