import { Routes } from '@angular/router';
import { CryptoDetailComponent } from './crypto-detail/crypto-detail.component';
import { ConverterComponent } from './converter/converter.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { NewsComponent } from './news/news.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: LandingComponent },
  { path: 'coins/:id', component: CryptoDetailComponent },
  { path: 'converter', component: ConverterComponent },
  { path: 'news', component: NewsComponent },
];
