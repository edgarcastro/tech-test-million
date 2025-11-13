using MongoDB.Driver;
using tech_test_million.Models.DTOs;
using tech_test_million.Models;
using tech_test_million.Repositories;

namespace tech_test_million.Services;

public class PropertyService : IPropertyService
{
    private readonly IPropertyRepository _propertyRepository;
    private readonly IMongoDatabase _database;

    public PropertyService(IPropertyRepository propertyRepository, IMongoDatabase database)
    {
        _propertyRepository = propertyRepository;
        _database = database;
    }

    public async Task<IEnumerable<PropertyResponseDto>> GetPropertiesAsync(PropertyFilterDto filter)
    {
        var properties = await _propertyRepository.GetPropertiesAsync(filter);
        var propertiesList = properties.ToList();

        if (!propertiesList.Any())
        {
            return Enumerable.Empty<PropertyResponseDto>();
        }

        var propertyIds = propertiesList.Select(p => p.IdProperty).ToList();

        // Get images
        var imagesCollection = _database.GetCollection<PropertyImage>("propertyImages");
        var images = await imagesCollection
            .Find(img => propertyIds.Contains(img.IdProperty) && img.Enabled)
            .ToListAsync();

        // Group images by property and take first enabled image
        var imagesDict = images
            .GroupBy(img => img.IdProperty)
            .ToDictionary(g => g.Key, g => g.First().File);

        // Map to DTOs
        var result = propertiesList.Select(property =>
        {
            var image = imagesDict.GetValueOrDefault(property.IdProperty);

            return new PropertyResponseDto
            {
                IdProperty = property.IdProperty,
                IdOwner = property.IdOwner,
                Name = property.Name,
                Address = property.Address,
                Price = property.Price,
                Image = image
            };
        });

        return result;
    }

    public async Task<PropertyResponseDetailDto> GetPropertyAsync(string id)
    {
        var imagesCollection = _database.GetCollection<PropertyImage>("propertyImages");
        var images = await imagesCollection
            .Find(img => img.IdProperty == id && img.Enabled)
            .ToListAsync();

        var defaultImage = images.FirstOrDefault()?.File;

        var property = await _propertyRepository.GetPropertyAsync(id);
        if (property == null)
        {
            return null;
        }
   
        return new PropertyResponseDetailDto
        {
            IdOwner = property.IdOwner,
            Name = property.Name,
            Address = property.Address,
            Price = property.Price,
            Image = defaultImage,
            Images = images.Select(img => img.File).ToList(),
        };
    }
}
