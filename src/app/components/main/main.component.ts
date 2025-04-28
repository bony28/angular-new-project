import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HeadingHighlighterDirective } from '../../directive/heading-highlighter.directive';
import {
  CommonModule,
  DatePipe,
  TitleCasePipe,
  UpperCasePipe,
} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/models.interfaces';

@Component({
  selector: 'app-main',
  imports: [TitleCasePipe, CommonModule, DatePipe],
  templateUrl: './main.component.html',
  styles: ``,
})
export class MainComponent {
  color = '';

  dateFormat = signal<string>('');

  router = inject(Router);
  title = 'Landing Page';

  date = signal<Date>(new Date());
  products = signal<Product[]>([]);

  handleLogout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  handleViewProducts() {
    this.router.navigate(['/products']);
  }
}
