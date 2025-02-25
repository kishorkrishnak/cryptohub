import { Component } from '@angular/core';
import { BannerComponent } from './components/banner/banner.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import {CoinsTableComponent } from './components/coins-table/coins-table.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
  imports: [
    FooterComponent,
    HeaderComponent,
    BannerComponent,
    CoinsTableComponent
  ],
})
export class LandingComponent {}
