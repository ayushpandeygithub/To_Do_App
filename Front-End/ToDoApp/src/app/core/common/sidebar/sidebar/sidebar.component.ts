import { Component } from '@angular/core';
import { RouterOutlet, RouterLinkActive, RouterModule } from '@angular/router';
import { AddTaskModalComponent } from '../../../../components/add task/add-task-modal/add-task-modal.component';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [ RouterOutlet, RouterLinkActive, RouterModule,AddTaskModalComponent ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
