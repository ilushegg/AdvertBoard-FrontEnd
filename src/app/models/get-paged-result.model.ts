export interface GetPagedResult<T> {
  total: number;
  offset: number;
  limit: number;
  items: T[];
}