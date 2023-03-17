import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  message: String = "";

  set(message: string) {
    this.message = message;
    return message;
  }

  clear() {
    this.message = "";
  }
}
