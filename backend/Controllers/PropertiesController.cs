using Microsoft.AspNetCore.Mvc;
using tech_test_million.Models.DTOs;
using tech_test_million.Services;

namespace tech_test_million.Controllers;

[ApiController]
[Route("properties")]
public class PropertiesController : ControllerBase
{
    private readonly IPropertyService _propertyService;

    public PropertiesController(IPropertyService propertyService)
    {
        _propertyService = propertyService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<PropertyResponseDto>>> GetProperties(
        [FromQuery] string? name,
        [FromQuery] string? address,
        [FromQuery] decimal? minPrice,
        [FromQuery] decimal? maxPrice)
    {
      
        var filter = new PropertyFilterDto
        {
            Name = name,
            Address = address,
            MinPrice = minPrice,
            MaxPrice = maxPrice
        };

        var properties = await _propertyService.GetPropertiesAsync(filter);
        return Ok(properties);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<PropertyResponseDto>> GetProperty([FromRoute] string id)
    {
        var property = await _propertyService.GetPropertyAsync(id);
        if (property == null)
        {
            return NotFound("Property not found");
        }
        return Ok(property);
    }
}
