declare interface TableProps {}

declare interface TableHeader {
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
  ID: string;
  Name: string;
  Description: string;
  Date: string;
  Amount: string;
}

declare interface Data {
  records: DataRecord[];
  paginated: DataRecord[];
  active?: number;
  page: number;
  perPage: number;
  pages: number[];
}
