import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import type { PropertyResponseDto } from "@/types/property";
import classNames from "classnames";

interface PropertyCardProps {
  property: PropertyResponseDto;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    const identifier = property.id;
    navigate(`/property/${identifier}`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card
      className={classNames(
        "cursor-pointer transition-all hover:shadow-lg",
        "flex flex-col h-full"
      )}
      onClick={handleClick}
    >
      <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
        {property.image ? (
          <img
            src={property.image}
            alt={property.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <span className="text-muted-foreground">No Image</span>
          </div>
        )}
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-2">{property.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {property.address}
        </p>
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="text-lg font-semibold">
            {formatPrice(property.price)}
          </Badge>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">
          Owner ID: {property.idOwner}
        </p>
      </CardFooter>
    </Card>
  );
}
