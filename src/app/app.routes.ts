import { Routes } from '@angular/router';
import { CoinComponent } from './coin/coin.component';
import { ConverterComponent } from './converter/converter.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { NewsComponent } from './news/news.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: LandingComponent },
  { path: 'coin/:id', component: CoinComponent },
  { path: 'converter', component: ConverterComponent },
  { path: 'news', component: NewsComponent },
];
