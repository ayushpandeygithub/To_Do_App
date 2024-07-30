import { Component } from '@angular/core';
import { UserService } from '../../../services/user-service/user.service';
import { User } from '../../../models/user.model';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../../services/toast-service/toast-service.service';
@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  wrongPattern = false;
  userName: string = '';
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
  signUp(): void {
    const usernamePattern = /^[a-zA-Z]+_[0-9]+$/;
    if (this.userName === '' || this.password === '') {
      this.toastService.showToast(
        'Username or password is not entered',
        'fail',
        true
      );
    } else if (!usernamePattern.test(this.userName)) {
      this.wrongPattern = true;
    } else {
      const newUser: User = {
        userName: this.userName,
        password: this.password,
      };
      this.userService.register(newUser).subscribe({
        next: (response: string) => {
          this.userService.setToken(response);
          this.toastService.showToast(
            'Successfully signed up',
            'success',
            true
          );
          this.router.navigate(['/startup/dashboard']);
        },
        error: (error) => {
          if (error.status === 400) {
            this.toastService.showToast('User already exists', 'fail', true);
          } else {
            this.toastService.showToast(
              'An unexpected error occurred',
              'fail',
              true
            );
          }
        },
      });
    }
  }
}
