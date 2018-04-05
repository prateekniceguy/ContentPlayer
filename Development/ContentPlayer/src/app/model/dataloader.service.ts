import {InitDataReader} from './initdatareader';
import {InitializationAPI} from './initializationapi';
import {DataHandler} from './interfaces/dataHandler';
import {Injectable} from '@angular/core';

@Injectable()
export class DataloaderService implements DataHandler {
  initValues: InitializationAPI;
  private success;
  private failure;

  constructor() {
    console.log('DataloaderService: constructor');
  }

  loadData(data, success, failure): void {
    this.success = success;
    this.failure = failure;
    // throw new Error('Method not implemented.');
    this.initValues = new InitDataReader().read(JSON.parse(data.data));
    this.dataLoadedSuccess();
    console.log('DataloaderService: loadData', this.initValues);
  }

  sendData(id: string, data: any) {
    console.warn('DataloaderService: sendData - id=', id, 'data=', data);
  }

  dataLoadedSuccess(): void {
    this.success(this.initValues);
  }

  dataLoadedFailure(): void {
    throw new Error('Method not implemented.');
  }

}
