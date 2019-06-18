import { Injectable } from '@angular/core';
import { Socket } from "ngx-socket-io";
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  constructor(private socket: Socket) { 
   // this.initSocketConnection;
   // this.socketDisconnect();
  }

  initSocketConnection(){
    this.socket.on('connect',()=>{
        console.log('connected')
     
  })}

  socketDisconnect(){
    this.socket.disconnect(()=>{
      console.log('disconnect');
      
    })
  }
  requestdata(event: string): Observable<any> {
    console.log(event);
    let data;
    this.socket.on(event,(res)=>{
        data = res
    }) 
    return data;
  }

}
