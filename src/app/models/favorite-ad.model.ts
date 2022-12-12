import { Advertisement } from "./ad.model";

export interface FavoriteAdvertisement extends Advertisement{
  deleted: boolean
}