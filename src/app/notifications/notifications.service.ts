import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { scan } from 'rxjs/operators';

export interface Command {
  id: number;
  type: 'success' | 'error' | 'clear';
  text?: string;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  messages = new Subject<Command[]>();
  messageData: Command[] = [];

  constructor() {}

  addSuccess(message: string) {
    const id = this.randomId();
    const finalObj: Command = {
      id,
      type: 'success',
      text: message,
    };
    this.messages.next([...this.messageData, finalObj]);
    this.messageData.push(finalObj);
    setTimeout(() => {
      this.clearMessage(id);
    }, 5000);
  }

  addError(message: string) {
    const id = this.randomId();
    const finalObj: Command = {
      id,
      type: 'error',
      text: message,
    };
    this.messages.next([...this.messageData, finalObj]);
    this.messageData.push(finalObj);
    setTimeout(() => {
      this.clearMessage(id);
    }, 5000);
  }

  clearMessage(id: number) {
    this.messageData = this.messageData.filter((comm) => comm.id !== id);
    this.messages.next([...this.messageData]);
  }

  private randomId() {
    return Math.round(Math.random() * 10000);
  }
}
