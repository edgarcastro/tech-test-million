namespace tech_test_million.Models.DTOs;

public class PropertyResponseDto
{
    public string IdProperty { get; set; } = string.Empty;
    public string IdOwner { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public byte[]? Image { get; set; }
}


public class PropertyResponseDetailDto : PropertyResponseDto
{
    public List<byte[]>? Images { get; set; }
}