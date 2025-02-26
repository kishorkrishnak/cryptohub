import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../landing/components/header/header.component';
import { FooterComponent } from '../landing/components/footer/footer.component';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,HeaderComponent,FooterComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private router = inject(Router);

  login() {
    this.router.navigate(['/']);
  }
}
