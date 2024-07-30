import { Component } from '@angular/core';
import { HeroSectionComponent } from '../banner-section/hero-section.component';
import { TaskComponent } from '../task section/task/task.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeroSectionComponent,TaskComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent  {

}
