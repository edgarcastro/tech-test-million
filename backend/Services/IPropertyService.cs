using tech_test_million.Models.DTOs;

namespace tech_test_million.Services;

public interface IPropertyService
{
    Task<IEnumerable<PropertyResponseDto>> GetPropertiesAsync(PropertyFilterDto filter);
    Task<PropertyResponseDetailDto> GetPropertyAsync(string id);
}

