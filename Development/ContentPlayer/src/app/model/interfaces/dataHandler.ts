export interface DataHandler {
  loadData(data);
  dataLoadedSuccess();
  dataLoadedFailure();
}
