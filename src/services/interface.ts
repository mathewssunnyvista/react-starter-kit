export type ImageAttributes = {
  uuid: string;
  url: string;
  content_type: string;
  title: string;
  description: string;
  alt_text: string;
};

export type ProductAttributes = {
  price?: string;
  description?: string;
  image?: [ImageAttributes];
};

export type BaseProduct = {
  id: number;
  name: string;
  uuid?: string;
};

export type BaseCategory = {
  value: number;
  label: string;
};

export type BaseFilterParams = Record<string, string>

export type Category = BaseCategory;
export type Product = BaseProduct & ProductAttributes;
export type FilterParams = BaseFilterParams;
