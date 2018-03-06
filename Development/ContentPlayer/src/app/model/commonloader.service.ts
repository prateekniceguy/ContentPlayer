import {Content, ContentDesign, ContentLogic, ContentData} from './content';
import {Helper} from './initializationapi';
import {Injectable} from '@angular/core';

@Injectable()
export class CommonloaderService {

  constructor() {}

  createContent(helper: Helper): Content {
    const cdesign: ContentDesign = new ContentDesign();
    const clogic: ContentLogic = new ContentLogic();
    const cdata: ContentData = new ContentData();








    const c: Content = new Content(cdesign, cdata, clogic);
    return c;
  }
}
