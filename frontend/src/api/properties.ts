import type {
  PropertyResponseDto,
  PropertyResponseDetailDto,
  PropertyFilters,
} from "@/types/property";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function formatBase64Image(base64: string | null): string | null {
  if (!base64) {
    return null;
  }

  try {
    // Determine MIME type (default to png, but could be enhanced)
    return `data:image/png;base64,${base64}`;
  } catch (error) {
    console.error("Error converting bytes to data URL:", error);
    return null;
  }
}

export const getProperties = async (
  filters?: PropertyFilters
): Promise<PropertyResponseDto[]> => {
  try {
    const params = new URLSearchParams();

    if (filters?.name) {
      params.append("name", filters.name);
    }
    if (filters?.address) {
      params.append("address", filters.address);
    }
    if (filters?.minPrice !== undefined && filters.minPrice !== null) {
      params.append("minPrice", filters.minPrice.toString());
    }
    if (filters?.maxPrice !== undefined && filters.maxPrice !== null) {
      params.append("maxPrice", filters.maxPrice.toString());
    }

    const queryString = params.toString();
    const url = `${BACKEND_URL}/properties${
      queryString ? `?${queryString}` : ""
    }`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch properties: ${response.statusText}`);
    }

    const data = (await response.json()) as Array<{
      idProperty: string;
      idOwner: string;
      name: string;
      address: string;
      price: number;
      image: string | null;
    }>;

    return data.map((property) => ({
      id: property.idProperty,
      idOwner: property.idOwner,
      name: property.name,
      address: property.address,
      price: property.price,
      image: formatBase64Image(property.image),
    }));
  } catch (error) {
    console.error("Error fetching properties:", error);
    throw error;
  }
};

export const getPropertyById = async (
  id: string
): Promise<PropertyResponseDetailDto> => {
  try {
    const response = await fetch(`${BACKEND_URL}/properties/${id}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Property not found");
      }
      throw new Error(`Failed to fetch property: ${response.statusText}`);
    }

    const data = (await response.json()) as {
      idProperty: string;
      idOwner: string;
      name: string;
      address: string;
      price: number;
      image: string | null;
      images?: string[] | null;
    };

    return {
      id: data.idProperty,
      idOwner: data.idOwner,
      name: data.name,
      address: data.address,
      price: data.price,
      image: formatBase64Image(data.image),
      images: data.images
        ? data.images
            .map((img) => formatBase64Image(img))
            .filter((img): img is string => img !== null)
        : null,
    };
  } catch (error) {
    console.error("Error fetching property:", error);
    throw error;
  }
};
