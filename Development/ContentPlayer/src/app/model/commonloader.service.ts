import {PlayerConstants} from '../common/playerconstants';
import {Content, ContentDesign, ContentLogic, ContentData} from './content';
import {HttphandlerService} from './httphandler.service';
import {Helper} from './initializationapi';
import {Injectable} from '@angular/core';

@Injectable()
export class CommonloaderService {
  private httpHandler: HttphandlerService;
  private helper: Helper;

  constructor(httpHandler: HttphandlerService) {
    this.httpHandler = httpHandler;
  }

  createContent(helper: Helper, success, failure): Content {
    this.helper = helper;
    const cdesign: ContentDesign = new ContentDesign();


    const functionalityType = 1;
    const clogic: ContentLogic = new ContentLogic(functionalityType);
    const cdata: ContentData = new ContentData();



    // load base file
    this.httpHandler.get(helper.file + PlayerConstants.BASE_FILE, this.baseLoaded.bind(this), this.loadFailed.bind(this));




    const c: Content = new Content(cdesign, cdata, clogic);
    return c;
  }

  baseLoaded(data) {
    console.log('CommonloaderService: baseLoaded - data = ', data);
    for (let i = 0; i < data.length; i++) {
      data[i] = this.helper.file + data[i] + PlayerConstants.JSON_FILE_EXTENSION;
    }
    this.httpHandler.getMultiple(data, this.sectionsLoaded.bind(this), this.sectionsFailed.bind(this));
  }

  loadFailed(error) {
    console.log('CommonloaderService: loadFailed - error = ', error);
  }



  loadSection(sectionId: string) {
    console.log('CommonloaderService: loadSection - sectionId = ', sectionId);
  }

  sectionsLoaded(data) {
    console.log('CommonloaderService: sectionsLoaded - data = ', data);
    const section = [];
    for (let i = 0; i < data.length; i++) {
      section.push(this.helper.file + data[i].data + PlayerConstants.JSON_FILE_EXTENSION,
        this.helper.file + data[i].design + PlayerConstants.JSON_FILE_EXTENSION,
        this.helper.file + data[i].logic + PlayerConstants.JSON_FILE_EXTENSION
      );
    }
    this.httpHandler.getMultiple(section, this.subsectionsLoaded.bind(this), this.subsectionsFailed.bind(this));
  }

  sectionsFailed(error) {
    console.log('CommonloaderService: sectionsFailed - error = ', error);
  }


  subsectionsLoaded(data) {
    console.log('CommonloaderService: subsectionsLoaded - data = ', data);
  }

  subsectionsFailed(error) {
    console.log('CommonloaderService: subsectionsFailed - error = ', error);
  }




}
