import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchPropertyById } from "@/store/slices/propertiesSlice";
import { PropertyDetail } from "@/components/PropertyDetail";
import { ErrorMessage } from "@/components/ErrorMessage";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selectedProperty, loading, error } = useAppSelector(
    (state) => state.properties
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchPropertyById(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorMessage
          message={error}
          onRetry={() => id && dispatch(fetchPropertyById(id))}
        />
      </div>
    );
  }

  if (!selectedProperty) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorMessage
          message="Property not found"
          onRetry={() => navigate("/")}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PropertyDetail property={selectedProperty} />
    </div>
  );
}

