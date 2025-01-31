import {inject, Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {
  private readonly snackBar = inject(MatSnackBar);

  private config: Partial<MatSnackBarConfig> = {
    duration: 2000,
    verticalPosition: 'top',
    horizontalPosition: 'right'
  }

  success(text: string): void {
    this.snackBar.open(text, undefined, {...this.config, panelClass: 'success'});
  }

  info(text: string): void {
    this.snackBar.open(text, undefined, {...this.config, panelClass: 'info'});
  }

  error(text: string): void {
    this.snackBar.open(text, undefined, {...this.config, panelClass: 'error'});
  }
}
