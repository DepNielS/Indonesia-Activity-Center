export type GalleryCategory =
  | "ALL"
  | "PADEL"
  | "FOOD"
  | "WELLNESS"
  | "EVENTS";

export interface GalleryItem {
  id: string;

  title: string;

  category: Exclude<GalleryCategory, "ALL">;

  image: string;

  alt: string;
}