import range from 'lodash-es/range';
import { DateTime } from 'luxon';

export function parseValue(record: any, value: string): string | Date | number {
  const vDate = DateTime.fromHTTP(record[value]);
  if (vDate.isValid) {
    return vDate.toISODate();
  }
  const asNumber = parseFloat(record[value]);
  return Number.isNaN(asNumber) ? record[value] : asNumber;
}

export function key(value: string): any {
  return (record: DataRecord) => parseValue(record, value);
}

export function numberRange(to: number, perPage: number): number[] {
  return range(1, 1 + (Math.floor(to / perPage)));
}

export function paginateData(data: any, page: number, perPage: number) {
  return data.slice((page - 1) * perPage).slice(0, perPage);
}
