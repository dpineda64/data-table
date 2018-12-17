declare interface AppState {
  data: Data;
  isFilterActive: boolean,
  error?: Error;
}

declare interface SearchBy {
  by: string;
  text?: string;
  range?: FilterRange;
}
