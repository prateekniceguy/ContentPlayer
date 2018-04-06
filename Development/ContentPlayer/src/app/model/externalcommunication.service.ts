import {InitDataReader} from './initdatareader';
import {InitializationAPI, Info} from './initializationapi';
import {DataHandler} from './interfaces/dataHandler';
import {Injectable, EventEmitter} from '@angular/core';
import {SignalR, BroadcastEventListener} from '@dharapvj/ngx-signalr';

declare var $: any;

@Injectable()
export class ExternalcommunicationService implements DataHandler {
  private signalInstance: any;
  private initValues: InitializationAPI;
  private listener;
  private success;
  private failure;

  private proxy: any;
  private proxyName: String = 'HTMLPlayerHub';
  private connection: any;
  // create the Event Emitter
  public messageReceived: EventEmitter<any>;
  public connectionEstablished: EventEmitter<Boolean>;
  public connectionExists: Boolean;

  constructor(signalInstance: SignalR) {
    console.log('ExternalcommunicationService: constructor');

    this.signalInstance = signalInstance;

    // this.connect();

    // Constructor initialization
    /*this.connectionEstablished = new EventEmitter<Boolean>();// existing code to delete
    this.messageReceived = new EventEmitter<any>();
    this.connectionExists = false;
    // create hub connection
    this.connection = $.hubConnection('http://localhost:8082/signalr');
    // create new proxy as name already given in to
    this.proxy = this.connection.createHubProxy(this.proxyName);
    // register on server events
    this.registerOnServerEvents();
    // call the connecion start method to start the connection to send and receive events.
    this.startConnection();*/
  }

  connect() {
    this.signalInstance.connect().then((c) => {
      console.log('ExternalcommunicationService: connect - c=', c);
      this.connection = c;
      this.connected();
      this.call('playerReady', null);
    });

    /*const conx = this.connection = this.signalInstance.createConnection();
    this.connected();
    conx.status.subscribe((s) => console.log('ExternalcommunicationService: connect - s=', s));
    conx.start().then((c) => {
      console.log('ExternalcommunicationService: connect - c=', c);
      this.call('playerReady', null);
    });*/


  }

  call(name: string, value: any[]) {
    console.log('ExternalcommunicationService: call - name=', name, 'value=', value);
    if (!value || value.length <= 0) {
      // invoke a server side method
      this.connection.invoke(name).then((data: any[]) => {
        console.log('ExternalcommunicationService: call - data=', data);
      });

    } else {
      // invoke a server side method, with parameters
      this.connection.invoke(name, ...value).then((data: any[]) => {
        console.log('ExternalcommunicationService: call - data=', data);
      });
    }
  }

  connected() {
    console.log('ExternalcommunicationService: connected');
    // create a listener object
    const open = new BroadcastEventListener<any>('open');
    // register the listener
    this.connection.listen(open);
    // subscribe for incoming messages
    open.subscribe((value: any) => {
      console.log('ExternalcommunicationService: connected - open=', value);
      this.initValues = new InitDataReader().read(JSON.parse(value));
      this.dataLoadedSuccess();
      console.log('DataloaderService: loadData', this.initValues);
    });

    // create a listener object
    const cmsPlayerPlay = new BroadcastEventListener<any>('cmsPlayerPlay');
    // register the listener
    this.connection.listen(cmsPlayerPlay);
    // subscribe for incoming messages
    cmsPlayerPlay.subscribe((value: any) => {
      console.log('ExternalcommunicationService: connected - cmsPlayerPlay=', value);
      const info: Info = new Info('cmsPlayerPlay', value);
      this.listener(info);
    });

    // create a listener object
    const cmsPlayerPause = new BroadcastEventListener<any>('cmsPlayerPause');
    // register the listener
    this.connection.listen(cmsPlayerPause);
    // subscribe for incoming messages
    cmsPlayerPause.subscribe((value: any) => {
      console.log('ExternalcommunicationService: connected - cmsPlayerPause=', value);
      const info: Info = new Info('cmsPlayerPause', value);
      this.listener(info);
    });

  }


  loadData(data, listener, success, failure) {
    this.listener = listener;
    this.success = success;
    this.failure = failure;
    this.connect();
  }

  sendData(id: string, data: any) {
    this.call(id, [JSON.stringify(data)]);
  }

  dataLoadedSuccess() {
    this.success(this.initValues);
  }

  dataLoadedFailure() {
    throw new Error('Method not implemented.');
  }

  /* existing code to delte // method to hit from client
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
  }*/

}
