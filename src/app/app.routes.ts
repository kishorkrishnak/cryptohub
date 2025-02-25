import { Routes } from '@angular/router';
import { CryptoDetailComponent } from './crypto-detail/crypto-detail.component';
import { CurrencyConverterComponent } from './currency-converter/currency-converter.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { NewsComponent } from './news/news.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent }, 
  { path: '', component: LandingComponent },
  { path: 'coins/:id', component: CryptoDetailComponent },
  { path: 'converter', component: CurrencyConverterComponent },
  { path: 'news', component: NewsComponent },
];
