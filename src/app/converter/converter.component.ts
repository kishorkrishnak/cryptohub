import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // ✅ Import FormsModule for ngModel
import axios from 'axios';
import { FooterComponent } from '../landing/components/footer/footer.component';
import { HeaderComponent } from '../landing/components/header/header.component';


@Component({
  selector: 'app-converter',
  standalone: true,
  imports: [CommonModule, FormsModule, FooterComponent, HeaderComponent], 
  templateUrl: './converter.component.html',
  styleUrl: './converter.component.css',
})
export class ConverterComponent implements OnInit {
  value = 0;
  coins: any[] = [];
  currentCoin = 'bitcoin';
  currentCurrency = 'INR';
  currentPrice = 0;
  swapDirection = 'COIN-CURR';
  loading = false;

  currencyList = [
    { id: 'AED', text: 'United Arab Emirates Dirham (AED)' },
    { id: 'ARS', text: 'Argentine Peso (ARS)' },
    { id: 'AUD', text: 'Australian Dollar (AUD)' },
    { id: 'INR', text: 'Indian Rupee (INR)' },
    { id: 'USD', text: 'US Dollar (USD)' },
    { id: 'EUR', text: 'Euro (EUR)' },
  ];

  async fetchCoins() {
    this.loading = true;
    try {
      const response = await axios.get(
        'https://api.coingecko.com/api/v3/coins/markets',
        {
          params: {
            vs_currency: 'INR',
            x_cg_demo_api_key: 'CG-StvTPmrYMoQ5Q3upG7SJkti1',
          },
        }
      );
      this.coins = response.data;
    } catch (error) {
      console.error('Error fetching coins:', error);
    }
    this.loading = false;
  }

  async fetchCurrentPrice() {
    this.loading = true;
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${this.currentCoin}&vs_currencies=${this.currentCurrency}&x_cg_demo_api_key=CG-StvTPmrYMoQ5Q3upG7SJkti1`
      );
      this.currentPrice =
        response.data[this.currentCoin][this.currentCurrency.toLowerCase()];
    } catch (error) {
      console.error('Error fetching price:', error);
    }
    this.loading = false;
  }

  resetConverter() {
    this.currentCoin = 'bitcoin';
    this.currentCurrency = 'INR';
    this.value = 0;
  }

  ngOnInit() {
    this.fetchCoins();
    this.fetchCurrentPrice();
  }
}
