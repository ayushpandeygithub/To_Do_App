import { Component } from '@angular/core';
import { RouterOutlet,RouterLinkActive,RouterLink } from '@angular/router';
import { SidebarComponent } from '../../../core/common/sidebar/sidebar/sidebar.component';
import { HeaderComponent } from '../../../core/common/header/header/header.component';
import { MobileHeaderComponent } from '../../../core/common/header/mobile header/mobile-header/mobile-header.component';
import { ToastComponent } from '../../../core/common/toast/toast.component';
@Component({
  selector: 'app-app-startup',
  standalone: true,
  imports: [RouterOutlet,RouterLinkActive,RouterLink,SidebarComponent,HeaderComponent,MobileHeaderComponent,ToastComponent],
  templateUrl: './app-startup.component.html',
  styleUrl: './app-startup.component.css'
})
export class AppStartupComponent {

}
