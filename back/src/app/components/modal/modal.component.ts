import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import type { IContent } from '@models';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnChanges {
  @Input() isOpen = false;
  @Input() title = 'Más sobre mí';
  @Input() contents: IContent[] = [];
  @Input() isEditMode = false;
  @Input() editingContentIndex: number | null = null;
  @Input() editingContentItemIndex: number | null = null;
  @Input() editContentForm: any = {};
  
  @Output() close = new EventEmitter<void>();
  @Output() startEdit = new EventEmitter<{ contentIndex: number; itemIndex: number }>();
  @Output() cancelEdit = new EventEmitter<void>();
  @Output() saveEdit = new EventEmitter<void>();
  @Output() deleteItem = new EventEmitter<{ contentIndex: number; itemIndex: number }>();
  @Output() startAdd = new EventEmitter<number>();
  @Output() saveAdd = new EventEmitter<void>();

  onBackdropClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }

  closeModal(): void {
    this.close.emit();
    document.body.style.overflow = 'auto';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen']) {
      if (this.isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    }
  }

  onStartEdit(contentIndex: number, itemIndex: number, event: Event): void {
    event.stopPropagation();
    this.startEdit.emit({ contentIndex, itemIndex });
  }

  onDeleteItem(contentIndex: number, itemIndex: number, event: Event): void {
    event.stopPropagation();
    if (confirm('¿Estás seguro de eliminar este elemento?')) {
      this.deleteItem.emit({ contentIndex, itemIndex });
    }
  }

  onStartAdd(contentIndex: number, event: Event): void {
    event.stopPropagation();
    this.startAdd.emit(contentIndex);
  }

  onSaveEdit(event: Event): void {
    event.stopPropagation();
    this.saveEdit.emit();
  }

  onCancelEdit(event: Event): void {
    event.stopPropagation();
    this.cancelEdit.emit();
  }

  onSaveAdd(event: Event): void {
    event.stopPropagation();
    this.saveAdd.emit();
  }
}
