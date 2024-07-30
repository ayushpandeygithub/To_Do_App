import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private toastSubject = new Subject<{ msg: string, status: 'success' | 'fail', showToast : boolean }>();
  toastState$ = this.toastSubject.asObservable();

  constructor() { }

  showToast(msg: string, status: 'success' | 'fail' = 'success' , showToast : boolean) { 
    this.toastSubject.next({ msg, status , showToast });
    setTimeout(() => {
      this.clearToast();
    }, 3000);
  }

  private clearToast() {
    this.toastSubject.next({ msg: '', status: 'success' , showToast : false});
  }
}
