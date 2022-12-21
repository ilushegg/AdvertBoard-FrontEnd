export interface Advertisement {
  id: string ,
  name: string,
  description: string,
  price: number,
  categoryId: string,
  images: string[],
  locationQuery: string,
  dateTimeCreated: string,
  isFavorite: boolean,
  status: string,
  deleted: boolean
}