import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class NotificationService {
    constructor() { }

    public showError(message: string, time?: number) {
        console.error(message);
    }
    
}