using MongoDB.Driver;
using tech_test_million.Models.DTOs;
using tech_test_million.Models;

namespace tech_test_million.Repositories;

public class PropertyRepository : IPropertyRepository
{
    private readonly IMongoCollection<Property> _properties;

    public PropertyRepository(IMongoDatabase database)
    {
        _properties = database.GetCollection<Property>("properties");
    }

    public async Task<IEnumerable<Property>> GetPropertiesAsync(PropertyFilterDto filter)
    {
        var filterBuilder = Builders<Property>.Filter;
        var filters = new List<FilterDefinition<Property>>();

        if (!string.IsNullOrWhiteSpace(filter.Name))
        {
            filters.Add(filterBuilder.Regex(p => p.Name, new MongoDB.Bson.BsonRegularExpression(filter.Name, "i")));
        }

        if (!string.IsNullOrWhiteSpace(filter.Address))
        {
            filters.Add(filterBuilder.Regex(p => p.Address, new MongoDB.Bson.BsonRegularExpression(filter.Address, "i")));
        }

        if (filter.MinPrice.HasValue)
        {
            filters.Add(filterBuilder.Gte(p => p.Price, filter.MinPrice.Value));
        }

        if (filter.MaxPrice.HasValue)
        {
            filters.Add(filterBuilder.Lte(p => p.Price, filter.MaxPrice.Value));
        }

        var combinedFilter = filters.Count > 0
            ? filterBuilder.And(filters)
            : filterBuilder.Empty;

        return await _properties.Find(combinedFilter).ToListAsync();
    }

    public async Task<Property> GetPropertyAsync(string id)
    {
        return await _properties.Find(p => p.IdProperty == id).FirstOrDefaultAsync();
    }
}

