export interface FullAdvertisement {
  id: string ,
  name: string,
  description: string,
  price: number,
  categoryId: string,
  images: string[],
  dateTimeCreated: string,
  dateTimeUpdated: string,
  authorId: string,
  authorName: string,
  authorAvatar: string
}