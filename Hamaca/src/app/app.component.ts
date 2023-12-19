import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SharedService } from './services/shared.service';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title: string = 'Hamaca';
  message: string = '';

  constructor(private sharedService: SharedService) {
    this.sharedService.message$.subscribe(message => {
      this.message = message;
    });
  }

  @ViewChild(NavBarComponent, {static : true}) listaTareasComponent: NavBarComponent | undefined;
}
