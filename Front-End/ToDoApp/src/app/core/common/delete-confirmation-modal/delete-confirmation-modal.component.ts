import { Component, EventEmitter, Input , Output} from '@angular/core';
import { CommonModule } from '@angular/common'
@Component({
  selector: 'app-delete-confirmation-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-confirmation-modal.component.html',
  styleUrl: './delete-confirmation-modal.component.css'
})
export class DeleteConfirmationModalComponent  {
  @Input() isOpen = false;
  @Output() shouldDelete = new EventEmitter<boolean>();
  @Input() isDeleteAll = false;
  closeConfirmation() {
    this.shouldDelete.emit(false);
  }
  deleteAction(){
    this.shouldDelete.emit(true);
  } 
}
