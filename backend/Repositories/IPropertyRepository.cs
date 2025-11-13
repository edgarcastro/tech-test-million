using tech_test_million.Models.DTOs;
using tech_test_million.Models;

namespace tech_test_million.Repositories;

public interface IPropertyRepository
{
    Task<IEnumerable<Property>> GetPropertiesAsync(PropertyFilterDto filter);
    Task<Property> GetPropertyAsync(string id);
}

