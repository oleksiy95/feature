import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class NotificationService {
    constructor(private _snackBar: MatSnackBar) { }

    public showError(message: string, duration?: number) {
        this.show(message, duration, 'notification-error');
    }

    public showSuccess(message: string, duration?: number) {
        this.show(message, duration, 'notification-success');
    }

    public showWarning(message: string, duration?: number) {
        this.show(message, duration, 'notification-warning');
    }

    public showMessage(message: string, duration?: number) {
        this.show(message, duration, '');
    }

    private show(message: string, duration = 4000, panelClass?: string,) {
        this._snackBar.open(message, 'Close', { duration, panelClass })
    }

}