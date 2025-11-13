import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import type { PropertyResponseDetailDto } from "@/types/property";
import { ArrowLeft } from "lucide-react";
import classNames from "classnames";

interface PropertyDetailProps {
  property: PropertyResponseDetailDto;
}

export function PropertyDetail({ property }: PropertyDetailProps) {
  const navigate = useNavigate();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const displayImages =
    property.images && property.images.length > 0
      ? property.images
      : property.image
      ? [property.image]
      : [];

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <Button variant="outline" onClick={() => navigate("/")} className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Properties
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{property.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {displayImages.length > 0 && (
            <div
              className={classNames(
                "grid gap-4",
                displayImages.length === 1
                  ? "grid-cols-1"
                  : "grid-cols-1 md:grid-cols-2"
              )}
            >
              {displayImages.map((image, index) => (
                <div
                  key={index}
                  className="relative w-full h-64 md:h-96 overflow-hidden rounded-lg"
                >
                  <img
                    src={image}
                    alt={`${property.name} - Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                Address
              </h3>
              <p className="text-lg">{property.address}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                Price
              </h3>
              <Badge variant="secondary" className="text-xl font-semibold p-2">
                {formatPrice(property.price)}
              </Badge>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                Owner ID
              </h3>
              <p className="text-base">{property.idOwner}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
