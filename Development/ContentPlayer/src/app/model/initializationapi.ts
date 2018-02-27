export class Helper {

  constructor(startAt: number, segmentId: number, file: string) {
    this.startAt = startAt;
    this.segmentId = segmentId;
    this.file = file;
  }

  private _startAt: number;

  get startAt(): number {
    return this._startAt;
  }

  set startAt(value: number) {
    this._startAt = value;
  }

  private _segmentId: number;

  get segmentId(): number {
    return this._segmentId;
  }

  set segmentId(value: number) {
    this._segmentId = value;
  }

  private _file: string;

  get file(): string {
    return this._file;
  }

  set file(value: string) {
    this._file = value;
  }

}

export class InitializationAPI {

  constructor() {
    this._files = new Array<Helper>();
  }

  private _homePath: string;

  get homePath(): string {
    return this._homePath;
  }

  set homePath(value: string) {
    this._homePath = value;
  }

  private _forwardEnabled: boolean;

  get forwardEnabled(): boolean {
    return this._forwardEnabled;
  }

  set forwardEnabled(value: boolean) {
    this._forwardEnabled = value;
  }

  private _playerPreview: boolean;

  get playerPreview(): boolean {
    return this._playerPreview;
  }

  set playerPreview(value: boolean) {
    this._playerPreview = value;
  }

  private _sessionId: string;

  get sessionId(): string {
    return this._sessionId;
  }

  set sessionId(value: string) {
    this._sessionId = value;
  }

  private _files: Array<Helper>;

  get files(): Array<Helper> {
    return this._files;
  }

  set files(value: Array<Helper>) {
    this._files = value;
  }

}
