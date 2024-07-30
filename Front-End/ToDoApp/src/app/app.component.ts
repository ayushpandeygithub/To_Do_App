import { Component} from '@angular/core';
import { RouterOutlet,RouterLinkActive,RouterModule,RouterLink } from '@angular/router';
import { SidebarComponent } from './core/common/sidebar/sidebar/sidebar.component';
import { HeaderComponent } from './core/common/header/header/header.component';
import { ToastComponent } from './core/common/toast/toast.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,SidebarComponent,HeaderComponent,RouterLinkActive,RouterModule,RouterLink, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ToDoApp';
}
