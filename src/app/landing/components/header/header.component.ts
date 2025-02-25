import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,

  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  mobileOpen: boolean = false;
  currencyList: string[] = ['USD', 'INR', 'EUR', 'GBP', 'AUD'];
  selectedCurrency: string = 'USD';

  constructor(private router: Router) {}
 
  toggleDrawer() {
    this.mobileOpen = !this.mobileOpen;
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }
}
