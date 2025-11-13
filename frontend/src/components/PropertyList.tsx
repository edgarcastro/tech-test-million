import { PropertyCard } from "./PropertyCard";
import { PropertyCardSkeleton } from "./LoadingSpinner";
import { useAppSelector } from "@/store/hooks";
import type { PropertyResponseDto } from "@/types/property";
import classNames from "classnames";

interface PropertyListProps {
  properties: PropertyResponseDto[];
  loading?: boolean;
}

export function PropertyList({ properties, loading }: PropertyListProps) {
  const isLoading = useAppSelector((state) => state.properties.loading);

  if (isLoading || loading) {
    return (
      <div
        className={classNames(
          "grid gap-6",
          "grid-cols-1",
          "sm:grid-cols-2",
          "lg:grid-cols-3",
          "xl:grid-cols-4"
        )}
      >
        {[...Array(8)].map((_, i) => (
          <PropertyCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">No properties found</p>
        <p className="text-muted-foreground text-sm mt-2">
          Try adjusting your filters
        </p>
      </div>
    );
  }

  return (
    <div
      className={classNames(
        "grid gap-6",
        "grid-cols-1",
        "sm:grid-cols-2",
        "lg:grid-cols-3",
        "xl:grid-cols-4"
      )}
    >
      {properties.map((property, index) => (
        <PropertyCard key={`${property.name}-${index}`} property={property} />
      ))}
    </div>
  );
}

