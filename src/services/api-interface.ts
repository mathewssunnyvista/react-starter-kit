import { ImageAttributes } from "./interface";

export type ApiCustomAttribbutes = {
  Price: string;
  Description: string;
  Image: [ImageAttributes];
};

export type ApiProductAttribbutes = {
  fields: ApiCustomAttribbutes;
};

export type ApiProduct = {
  id: number;
  name: string;
  uuid?: string;
  json?: ApiProductAttribbutes;
};
export type ApiCategory = {
  id: number;
  name: string;
};

export type ApiErrorItem = {
  status: string;
  code: string;
  title: string;
  messageCode: string;
  detail: string;
};
