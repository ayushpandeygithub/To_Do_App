import { Component,Input} from '@angular/core';
import { NavigationEnd, Router  } from '@angular/router';
import { UserService } from '../../../../services/user-service/user.service';
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent  {
  currentRoute: string = '';
  title = '';
  constructor(private userService: UserService, private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
      if( this.router.url.includes('active-task')){
           this.title = 'Active'
      }
     else if( this.router.url.includes('completed-task')){
        this.title = 'Completed'
      }
      else{
        this.title='Dashboard'
      }
    }
    });
  }


  signOut(): void {
    this.userService.signOut();
    this.router.navigate(['']);
  }
  
}
