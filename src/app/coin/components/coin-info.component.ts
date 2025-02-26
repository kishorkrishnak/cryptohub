import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import axios from 'axios';
import { Chart, ChartConfiguration, ChartOptions, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-coin-info',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatProgressSpinnerModule],
  templateUrl: './coin-info.component.html',
  styleUrls: ['./coin-info.component.css'],
})
export class CoinInfoComponent implements OnInit {
  @Input() coinId!: string;
  currency: string = 'inr';
  historicData: any[] = [];
  days: number = 7;
  loading: boolean = true;

  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  chartInstance!: Chart | null;

  async fetchHistoricData() {
    this.loading = true;
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${this.coinId}/market_chart?vs_currency=${this.currency}&days=${this.days}`
      );

      this.historicData = response.data.prices;

      const labels = this.historicData.map((coin) => {
        let date = new Date(coin[0]);
        return this.days === 1
          ? `${date.getHours()}:${date.getMinutes()}`
          : date.toLocaleDateString();
      });

      const dataPoints = this.historicData.map((coin) => coin[1]);

      this.createChart(labels, dataPoints);
    } catch (error) {
      console.error('Error fetching historical data:', error);
    }
    this.loading = false;
  }

  createChart(labels: string[], dataPoints: number[]) {
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    const ctx = this.chartCanvas.nativeElement.getContext('2d');

    if (ctx) {
      this.chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: `Price (Past ${this.days} Days) in ${this.currency.toUpperCase()}`,
              data: dataPoints,
              borderColor: '#EEBC1D',
              borderWidth: 2,
              pointRadius: 0,
              tension: 0.4,
            },
          ],
        },
        options: {
          responsive: true,
        } as ChartOptions<'line'>,
      });
    }
  }

  ngOnInit() {
    this.fetchHistoricData();
  }

  updateDays(selectedDays: number) {
    this.days = selectedDays;
    this.fetchHistoricData();
  }
}
