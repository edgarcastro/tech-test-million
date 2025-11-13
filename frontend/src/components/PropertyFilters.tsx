import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setFilters } from "@/store/slices/propertiesSlice";
import type { PropertyFilters as PropertyFiltersType } from "@/types/property";
import classNames from "classnames";
import { Search, X } from "lucide-react";

export function PropertyFilters() {
  const dispatch = useAppDispatch();
  const currentFilters = useAppSelector((state) => state.properties.filters);

  const [localFilters, setLocalFilters] = useState<PropertyFiltersType>({
    name: currentFilters.name || "",
    address: currentFilters.address || "",
    minPrice: currentFilters.minPrice || undefined,
    maxPrice: currentFilters.maxPrice || undefined,
  });

  const handleFilterChange = (
    field: keyof PropertyFiltersType,
    value: string | number | undefined
  ) => {
    setLocalFilters((prev) => ({
      ...prev,
      [field]: value === "" ? undefined : value,
    }));
  };

  const handleApplyFilters = () => {
    const cleanedFilters: PropertyFiltersType = {
      name: localFilters.name || undefined,
      address: localFilters.address || undefined,
      minPrice: localFilters.minPrice || undefined,
      maxPrice: localFilters.maxPrice || undefined,
    };
    dispatch(setFilters(cleanedFilters));
  };

  const handleClearFilters = () => {
    const emptyFilters: PropertyFiltersType = {};
    setLocalFilters(emptyFilters);
    dispatch(setFilters(emptyFilters));
  };

  const hasActiveFilters = Boolean(
    localFilters.name ||
      localFilters.address ||
      localFilters.minPrice ||
      localFilters.maxPrice
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          Filter Properties
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className={classNames(
            "grid gap-4",
            "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
          )}
        >
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Property name..."
              value={localFilters.name || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleFilterChange("name", e.target.value)
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              placeholder="Property address..."
              value={localFilters.address || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleFilterChange("address", e.target.value)
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="minPrice">Min Price</Label>
            <Input
              id="minPrice"
              type="number"
              placeholder="Min price..."
              value={localFilters.minPrice || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleFilterChange(
                  "minPrice",
                  e.target.value ? parseFloat(e.target.value) : undefined
                )
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxPrice">Max Price</Label>
            <Input
              id="maxPrice"
              type="number"
              placeholder="Max price..."
              value={localFilters.maxPrice || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleFilterChange(
                  "maxPrice",
                  e.target.value ? parseFloat(e.target.value) : undefined
                )
              }
            />
          </div>
        </div>

        <div className="flex gap-2 mt-6 flex-wrap">
          <Button onClick={handleApplyFilters} className="flex-1 md:flex-none">
            Apply Filters
          </Button>
          {hasActiveFilters && (
            <Button
              variant="outline"
              onClick={handleClearFilters}
              className="flex-1 md:flex-none"
            >
              <X className="h-4 w-4 mr-2" />
              Clear
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
