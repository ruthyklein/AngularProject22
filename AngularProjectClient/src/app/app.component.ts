import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './components/top-bar/top-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [CommonModule, RouterOutlet, TopBarComponent, RouterModule]

})


export class AppComponent implements OnInit, OnChanges, AfterViewInit {
  title = 'AngularProject';
  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {

  }
  ngAfterViewInit(): void {
  }
}
