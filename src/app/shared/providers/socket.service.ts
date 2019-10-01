import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  constructor(private socket: Socket) {
  }

  initSocketConnection() {
    this.socket.on('connect', () => { });
  }

  socketDisconnect() {
    this.socket.disconnect(() => { });
  }
  requestdata(event: string): Observable<any> {
    let data;
    this.socket.on(event, (res) => {
      data = res;
    });
    return data;
  }

}
