import {InitializationAPI, Helper} from './initializationapi';
export class InitDataReader {
  constructor() {

  }

  read(data): InitializationAPI {
    const output: InitializationAPI = new InitializationAPI();

    console.log('InitDataReader: read', data);

    if (
      data == null
      || data.homePath == null
      || data.forwardEnabled == null
      || data.playerPreview == null
      || data.sessionId == null
      || data.files == null
      || data.files.length <= 0
    ) {
      throw new Error('Invalid data');
    }

    output.homePath = data.homePath;
    output.forwardEnabled = data.forwardEnabled;
    output.playerPreview = data.playerPreview;
    output.sessionId = data.sessionId;

    for (let i = 0; i < data.files.length; i++) {
      const inithelper: Helper = new Helper(
        data.files[i].startAt, data.files[i].segmentId, data.files[i].file);
      output.files.push(inithelper);
    }


    return output;
  }
}
