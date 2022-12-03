export interface UploadCard{
  name: string | null,
  description: string | null,
  price: number | null,
  categoryId: string | null,
  images: string[] | null,
  country: string | null,
  city: string | null,
  street: string | null,
  house: string | null,
  flat: string | null,
  lat: string | null,
  lon: string | null,
}