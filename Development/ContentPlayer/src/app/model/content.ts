export class Content {

  constructor(contentDesign: ContentDesign, contentData: ContentData, contentLogic: ContentLogic) {
    this._contentDesign = contentDesign;
    this._contentData = contentData;
    this._contentLogic = contentLogic;
  }

  private _contentDesign: ContentDesign;

  get contentDesign(): ContentDesign {
    return this._contentDesign;
  }

  private _contentData: ContentData;

  get contentData(): ContentData {
    return this._contentData;
  }

  private _contentLogic: ContentLogic;

  get contentLogic(): ContentLogic {
    return this._contentLogic;
  }

}
export class ContentDesign {}
export class ContentData {
  constructor(data: object) {
    this._data = data;
  }
  private _data: object;

  get data(): object {
    return this._data;
  }
}
export class ContentLogic {
  constructor(functionalityType: number) {
    this._functionalityType = functionalityType;
  }
  private _functionalityType: number;

  get functionalityType(): number {
    return this._functionalityType;
  }
}
