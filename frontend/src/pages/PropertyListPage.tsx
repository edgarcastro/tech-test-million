import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProperties } from "@/store/slices/propertiesSlice";
import { PropertyFilters } from "@/components/PropertyFilters";
import { PropertyList } from "@/components/PropertyList";
import { ErrorMessage } from "@/components/ErrorMessage";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export function PropertyListPage() {
  const dispatch = useAppDispatch();
  const { properties, loading, error, filters } = useAppSelector(
    (state) => state.properties
  );

  useEffect(() => {
    dispatch(fetchProperties(filters));
  }, [dispatch, filters]);

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Properties</h1>
        <p className="text-muted-foreground">
          Browse and filter through our property listings
        </p>
      </div>

      <PropertyFilters />

      {error && (
        <ErrorMessage
          message={error}
          onRetry={() => dispatch(fetchProperties(filters))}
        />
      )}

      {loading && properties.length === 0 ? (
        <LoadingSpinner />
      ) : (
        <PropertyList properties={properties} loading={loading} />
      )}
    </div>
  );
}
