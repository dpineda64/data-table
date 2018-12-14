declare interface TablePagination {
  activePage: number;
  perPage: number;
  pages: number[];
  nextPage: (nextPage: number) => void;
  prevPage: (prevPage: number) => void;
}

declare interface TableColumn {
  [key: string]: any;
  text: string;
  value: string;
  orderable?: boolean;
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

declare interface Filters {
  [key: string]: any;
}

declare interface FilterRange {
  start?: any;
  end?: any;
  error?: string;
  changed?: boolean;
}
