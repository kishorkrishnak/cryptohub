import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  standalone: true,
  selector: 'app-coins-table',
  templateUrl: './coins-table.component.html',
  styleUrls: ['./coins-table.component.css'],
  imports: [CommonModule, FormsModule] 
})
export class CoinsTableComponent implements OnInit {
  coins: any[] = [];
  loading: boolean = false;
  search: string = '';
  page: number = 1;
  currency: string = 'inr';  // Default currency
  symbol: string = '₹';  // Default symbol for USD
  Math = Math; 
  getPaginationArray(): number[] {
    return Array.from({ length: Math.ceil(this.handleSearch().length / 10) }, (_, i) => i + 1);
  }
  
  async fetchCoins() {
    this.loading = true;
    try {
      const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets`, {
        params: { vs_currency: this.currency, order: 'market_cap_desc', per_page: 100, page: 1, sparkline: false }
      });
      this.coins = response.data;
    } catch (error) {
      console.error('Error fetching coins:', error);
    }
    this.loading = false;
  }

  numberWithCommas(value: number): string {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  handleSearch(): any[] {
    return this.coins.filter(coin =>
      coin.name.toLowerCase().includes(this.search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(this.search.toLowerCase())
    );
  }

  changePage(pageNumber: number) {
    this.page = pageNumber;
    const table = document.querySelector('.coin-table');
    if (table) {
      table.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  
  ngOnInit() {
    this.fetchCoins();
  }
}
