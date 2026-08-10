import { Component } from '@angular/core';
import { Footer } from '../components/footer/footer';
import { Navbar } from '../components/navbar/navbar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-portfolio-layout',
  imports: [Footer,
    Navbar,
    RouterOutlet
  ],
  templateUrl: './portfolio-layout.html',
  styleUrl: './portfolio-layout.scss',
})
export class PortfolioLayout {

}
