import { Component , Input ,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common'
import { ToastService } from '../../../services/toast-service/toast-service.service';


@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent implements OnInit {
   msg = '';
   status: 'success' | 'fail' = 'success';
   showToast = false;
  constructor(private toastService: ToastService) { }

  ngOnInit() {
    this.toastService.toastState$.subscribe(({ msg, status,showToast }) => {
      this.msg = msg;
      this.status = status;
      this.showToast = showToast;
      console.log(msg);
      
    });
  }


}
