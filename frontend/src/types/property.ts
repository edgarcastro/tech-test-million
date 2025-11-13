export interface PropertyResponseDto {
  id: string;
  idOwner: string;
  name: string;
  address: string;
  price: number;
  image: string | null;
}

export interface PropertyResponseDetailDto extends PropertyResponseDto {
  images: string[] | null;
}

export interface PropertyFilters {
  name?: string;
  address?: string;
  minPrice?: number;
  maxPrice?: number;
}
