export interface DataHandler {
  loadData(data, success, failure);
  sendData(id: string, data);
  dataLoadedSuccess();
  dataLoadedFailure();
}
