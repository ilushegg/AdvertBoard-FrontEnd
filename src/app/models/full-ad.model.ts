export interface FullAdvertisement {
  id: string ,
  name: string,
  description: string,
  locationQueryString: string,
  locationLat: string,
  locationLon: string,
  price: number,
  categoryId: string,
  images: {item1: string, item2: string}[],
  dateTimeCreated: string,
  dateTimeUpdated: string,
  authorId: string,
  authorName: string,
  authorAvatar: string,
  authorNumber: string,
  authorRegisterDate: string,
  isFavorite: boolean
}