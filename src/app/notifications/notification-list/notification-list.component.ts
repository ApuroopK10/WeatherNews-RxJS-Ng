import { Component } from '@angular/core';
import { Command, NotificationsService } from '../notifications.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css'],
})
export class NotificationListComponent {
  notif$!: Observable<Command[]>;
  constructor(private notifSer: NotificationsService) {}

  ngOnInit() {
    this.notif$ = this.notifSer.messages;
  }

  onClose(id: number) {
    this.notifSer.clearMessage(id);
  }
}
