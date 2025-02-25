import { Component } from '@angular/core';
import { CryptoCarouselComponent } from '../crypto-carousel/crypto-carousel.component';

@Component({
  selector: 'app-banner',
  standalone: true,
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  imports: [CryptoCarouselComponent],
})
export class BannerComponent {}
