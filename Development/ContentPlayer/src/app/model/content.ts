export class Content {
  private contentDesign: ContentDesign;
  private contentData: ContentData;
  private contentLogic: ContentLogic;

  constructor(contentDesign: ContentDesign, contentData: ContentData, contentLogic: ContentLogic) {
    this.contentDesign = contentDesign;
    this.contentData = contentData;
    this.contentLogic = contentLogic;
  }

}
export class ContentDesign {}
export class ContentData {}
export class ContentLogic {
  functionalityType: number;
}
