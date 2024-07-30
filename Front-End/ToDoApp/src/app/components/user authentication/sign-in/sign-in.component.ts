import { Component } from '@angular/core';
import {
  RouterOutlet,
  RouterLinkActive,
  RouterModule,
  RouterLink,
  Router,
} from '@angular/router';
import { UserService } from '../../../services/user-service/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../services/toast-service/toast-service.service';
@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLinkActive,
    RouterModule,
    RouterLink,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  username: string = '';
  password: string = '';
  passwordFieldType: string = 'password';
  passwordImageSrc: string = 'assets/user authentication/pass-hide.svg';

  constructor(
    private userService: UserService,
    private router: Router,
    private toastService: ToastService
  ) {}

  togglePasswordVisibility(): void {
    if (this.passwordFieldType === 'password') {
      this.passwordFieldType = 'text';
      this.passwordImageSrc = 'assets/user authentication/pass-show.svg';
    } else {
      this.passwordFieldType = 'password';
      this.passwordImageSrc = 'assets/user authentication/pass-hide.svg';
    }
  }

  login(): void {
    if (!this.username || !this.password) {
      this.toastService.showToast(
        'Username or Password is empty',
        'fail',
        true
      );
    } else {
      this.userService
        .login({
          userName: this.username,
          password: this.password,
        })
        .subscribe({
          next: (response: string) => {
            this.userService.setToken(response);
            this.toastService.showToast('Login successful', 'success', true);
            this.router.navigate(['/startup/dashboard']);
          },
          error: (error) => {
            if (error.status === 401)
              this.toastService.showToast(
                'Username or password is incorrect',
                'fail',
                true
              );
            else
              this.toastService.showToast('Something went wrong', 'fail', true);
          },
        });
    }
  }
}
