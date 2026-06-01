export enum ORDER {
  ASC = 'asc',
  DESC = 'desc'
}

export enum SORT_BY {
  CREATED_AT = 'createdAt',
  PRICE = 'productPrice',
  NAME = 'productName'
}

export const FILTERS_OPTIONS = [
  { label: 'New', value: 'new' },
  { label: 'Used', value: 'used' },
] as const;

export const SORTING_OPTIONS = [
  { label: 'Newest', value: {[SORT_BY.CREATED_AT]: ORDER.DESC} },
  { label: 'Oldest', value: {[SORT_BY.CREATED_AT]: ORDER.ASC} },
  { label: 'Price: Low to High', value: {[SORT_BY.PRICE]: ORDER.ASC} },
  { label: 'Price: High to Low', value: {[SORT_BY.PRICE]: ORDER.DESC} },
  { label: 'Name: A to Z', value: {[SORT_BY.NAME]: ORDER.ASC} },
  { label: 'Name: Z to A', value: {[SORT_BY.NAME]: ORDER.DESC} },
] as const;