import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-board-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './board-dialog.html',
  styleUrl: './board-dialog.scss',
})
export class BoardDialog {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<BoardDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { title?: string; description?: string },
  ) {
    this.form = this.fb.group({
      title: [data?.title || '', [Validators.required, Validators.maxLength(100)]],
      description: [data?.description || '', [Validators.maxLength(255)]],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.dialogRef.close(this.form.value);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
