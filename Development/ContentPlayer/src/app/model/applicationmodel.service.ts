import {CommonloaderService} from './commonloader.service';
import {Content} from './content';
import {DataloaderService} from './dataloader.service';
import {ExternalcommunicationService} from './externalcommunication.service';
import {HttphandlerService} from './httphandler.service';
import {InitializationAPI, Helper} from './initializationapi';
import {DataHandler} from './interfaces/dataHandler';
import {Injectable} from '@angular/core';

@Injectable()
export class ApplicationmodelService {
  externalCommunication: ExternalcommunicationService;
  dataLoader: DataloaderService;
  dataHandler: DataHandler;
  httpHandler: HttphandlerService;
  initValues: InitializationAPI;
  currentActive: number;
  commonLoader: CommonloaderService;

  constructor(httpHandler: HttphandlerService, commonLoader: CommonloaderService,
    dataLoader: DataloaderService, externalCommunication: ExternalcommunicationService) {
    this.httpHandler = httpHandler;
    this.commonLoader = commonLoader;
    this.externalCommunication = externalCommunication;
    this.dataLoader = dataLoader;
    this.init();
  }

  init() {
    console.log('ApplicationmodelService: init');

    // load startup config
    this.httpHandler.get('./assets/config/init.json', this.initLoaded.bind(this), this.initFailed.bind(this));
  }

  initLoaded(data) {
    console.log('ApplicationmodelService: initLoaded - data = ', data);
    if (data.environment.lms.enabled) {
      console.log('ApplicationmodelService: initLoaded - environment.lms.enabled = true');
      this.dataHandler = this.externalCommunication;
      this.dataHandler.loadData(data.environment.lms, this.baseLoaded.bind(this), this.baseFailed.bind(this));
    } else if (data.environment.standalone.enabled) {
      console.log('ApplicationmodelService: initLoaded - environment.standalone.enabled = true');
      this.dataHandler = this.dataLoader;
      this.dataHandler.loadData(data.environment.standalone, this.baseLoaded.bind(this), this.baseFailed.bind(this));
    } else {
      throw new Error('Incorrect startup config: init.json');
    }
  }


  baseLoaded(data) {
    console.log('ApplicationmodelService: baseLoaded - data = ', data);
    this.initValues = data;
    this.currentActive = 0;
    this.load(this.initValues.files[this.currentActive]);
  }

  baseFailed(error) {

  }

  initFailed(error) {
    console.log('ApplicationmodelService: initFailed - error = ', error);
  }

  load(value: Helper) {
    console.log('ApplicationmodelService: load - value = ', value);
    const content: Content = this.commonLoader.createContent(value);

  }

}
