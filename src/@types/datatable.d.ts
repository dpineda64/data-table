declare interface TablePagination {
  activePage: number;
  perPage: number;
  pages: number[];
  nextPage: (nextPage: number) => void;
  prevPage: (prevPage: number) => void;
}

declare interface TableColumns {
  text: string;
  value: string;
  sortable?: boolean;
  editable?: boolean;
}

declare interface orderByParams {
  value: string;
  order: boolean;
}

declare interface DataRecord {
  [key: string]: any;
}

declare interface Data {
  records: DataRecord[];
  paginated: DataRecord[];
  active?: number;
  page: number;
  perPage: number;
  pages: number[];
}
