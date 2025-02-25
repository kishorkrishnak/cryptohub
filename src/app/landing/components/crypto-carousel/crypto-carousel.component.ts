import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
}

@Component({
  selector: 'app-crypto-carousel',
  standalone: true,
  imports: [CommonModule, RouterModule, ],
  templateUrl: './crypto-carousel.component.html',
  styleUrls: ['./crypto-carousel.component.css'],
})
export class CryptoCarouselComponent implements OnInit {
  trendingCoins = signal<Coin[]>([]);
  currency = 'inr';
  symbol = '₹';
  currentIndex = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchTrendingCoins();
    setInterval(() => this.nextSlide(), 3000); // Auto-scroll every 3 sec
  }

  fetchTrendingCoins(): void {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${this.currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;
    this.http
      .get<Coin[]>(url)
      .subscribe((data) => this.trendingCoins.set(data));
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.trendingCoins().length;
  }

  prevSlide(): void {
    this.currentIndex =
      (this.currentIndex - 1 + this.trendingCoins().length) %
      this.trendingCoins().length;
  }

  numberWithCommas(x: number): string {
    return x.toLocaleString();
  }
}
