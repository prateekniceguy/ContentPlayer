import {Injectable, EventEmitter} from '@angular/core';

declare var $: any;

@Injectable()
export class ExternalcommunicationService {

  private proxy: any;
  private proxyName: String = 'sr';
  private connection: any;
  // create the Event Emitter
  public messageReceived: EventEmitter<any>;
  public connectionEstablished: EventEmitter<Boolean>;
  public connectionExists: Boolean;

  constructor() {
    // Constructor initialization
    this.connectionEstablished = new EventEmitter<Boolean>();
    this.messageReceived = new EventEmitter<any>();
    this.connectionExists = false;
    // create hub connection
    this.connection = $.hubConnection('http://localhost:8082/signalr');
    // create new proxy as name already given in to
    this.proxy = this.connection.createHubProxy(this.proxyName);
    // register on server events
    this.registerOnServerEvents();
    // call the connecion start method to start the connection to send and receive events.
    this.startConnection();
  }

  // method to hit from client
  public sendTime() {
    // server side hub method using proxy.invoke with method name pass as param
    this.proxy.invoke('GetRealTime');
  }
  // check in the browser console for either signalr connected or not
  private startConnection(): void {
    this.connection.start().done((data: any) => {
      console.log('Now connected ' + data.transport.name + ', connection ID= ' + data.id);
      this.connectionEstablished.emit(true);
      this.connectionExists = true;
    }).fail((error: any) => {
      console.log('Could not connect ' + error);
      this.connectionEstablished.emit(false);
    });
  }
  private registerOnServerEvents(): void {
    this.proxy.on('open', (data: any) => {
      console.log('received in SignalRService: ' + JSON.stringify(data));
      this.messageReceived.emit(data);
    });
    this.proxy.on('cmsPlayerClose', (data: any) => {
      console.log('received in SignalRService: ' + JSON.stringify(data));
      this.messageReceived.emit(data);
    });
    this.proxy.on('cmsPlayerPlay', (data: any) => {
      console.log('received in SignalRService: ' + JSON.stringify(data));
      this.messageReceived.emit(data);
    });
    this.proxy.on('cmsPlayerPause', (data: any) => {
      console.log('received in SignalRService: ' + JSON.stringify(data));
      this.messageReceived.emit(data);
    });
  }

}
