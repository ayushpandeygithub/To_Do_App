import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLinkActive, RouterModule,Router } from '@angular/router';
import { UserService } from '../../../../../services/user-service/user.service';
import { AddTaskModalComponent } from '../../../../../components/add task/add-task-modal/add-task-modal.component';
@Component({
  selector: 'app-mobile-header',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLinkActive, RouterModule,AddTaskModalComponent],
  templateUrl: './mobile-header.component.html',
  styleUrl: './mobile-header.component.css',
})
export class MobileHeaderComponent implements OnInit {
  isDropdownOpen = false;
  usedLink: any;
  options = [
    { optionName: 'Dashboard', link: 'dashboard' },
    { optionName: 'Active', link: 'active-task' },
    { optionName: 'Completed', link: 'completed-task' },  
  ];
  isModalOpen = false;
  constructor(private userService: UserService, private router: Router) {}
  signOut(): void {
    this.userService.signOut();
    this.router.navigate(['']);
  }

  ngOnInit(): void {
    this.usedLink = this.options[0];
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }

  selectOption(option: any) {
    this.usedLink = option;
    this.isDropdownOpen = false;
  }
  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  get unUsedLink() {
    return this.options.filter(opt => opt.link !== this.usedLink.link);
  }
  
}
