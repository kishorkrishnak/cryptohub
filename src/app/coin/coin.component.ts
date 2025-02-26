import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { MarkdownModule, provideMarkdown } from 'ngx-markdown';
import { FooterComponent } from '../landing/components/footer/footer.component';
import { HeaderComponent } from '../landing/components/header/header.component';
import { CoinInfoComponent } from './components/coin-info.component';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-coin',
  standalone: true,
  templateUrl: './coin.component.html',
  styleUrls: ['./coin.component.css'],
  providers: [provideMarkdown()],
  imports: [
    MatToolbarModule,
    MatProgressBarModule,
    MarkdownModule,
    HeaderComponent,
    FooterComponent,
    CoinInfoComponent,
    NgIf,
  ],
})
export class CoinComponent implements OnInit {
  coin: any;
  currency: string = 'usd';
  symbol: string = '₹';

  constructor(private route: ActivatedRoute) {}

  async fetchCoin(id: string) {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}?x_cg_demo_api_key=CG-StvTPmrYMoQ5Q3upG7SJkti1`
      );
      this.coin = response.data;
    } catch (error) {
      console.error('Error fetching coin:', error);
    }
  }

  numberWithCommas(x: number): string {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fetchCoin(id);
    }
  }
}
