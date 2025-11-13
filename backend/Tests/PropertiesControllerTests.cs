using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using tech_test_million.Controllers;
using tech_test_million.Models.DTOs;
using tech_test_million.Services;

namespace tech_test_million.Tests;
 
[TestFixture]
public class PropertiesControllerTests
{
    private Mock<IPropertyService> _mockPropertyService;
    private PropertiesController _controller;

    [SetUp]
    public void Setup()
    {
        _mockPropertyService = new Mock<IPropertyService>();
        _controller = new PropertiesController(_mockPropertyService.Object);
    }

    [Test]
    public async Task GetProperties_ReturnsOkResult_WithProperties()
    {
        // Arrange
        var expectedProperties = new List<PropertyResponseDto>
        {
            new PropertyResponseDto
            {
                IdProperty = "1",
                IdOwner = "owner1",
                Name = "Test Property",
                Address = "123 Test St",
                Price = 100000,
                Image = null
            }
        };

        _mockPropertyService
            .Setup(s => s.GetPropertiesAsync(It.IsAny<PropertyFilterDto>()))
            .ReturnsAsync(expectedProperties);

        // Act
        var result = await _controller.GetProperties(null, null, null, null);

        // Assert
        Assert.That(result.Result, Is.InstanceOf<OkObjectResult>());
        var okObjectResult = result.Result as OkObjectResult;
        Assert.That(okObjectResult?.Value, Is.EqualTo(expectedProperties));
    }

    [Test]
    public async Task GetProperties_WithFilters_CallsServiceWithCorrectFilter()
    {
        // Arrange
        var filter = new PropertyFilterDto
        {
            Name = "Test",
            MinPrice = 50000,
            MaxPrice = 200000
        };

        _mockPropertyService
            .Setup(s => s.GetPropertiesAsync(It.IsAny<PropertyFilterDto>()))
            .ReturnsAsync(new List<PropertyResponseDto>());

        // Act
        await _controller.GetProperties("Test", null, 50000, 200000);

        // Assert
        _mockPropertyService.Verify(s => s.GetPropertiesAsync(
            It.Is<PropertyFilterDto>(f => 
                f.Name == "Test" && 
                f.MinPrice == 50000 && 
                f.MaxPrice == 200000)), 
            Times.Once);
    }

    [Test]
    public async Task GetProperty_WithValidId_ReturnsOkResult()
    {
        // Arrange
        var propertyId = "test-id";
        var expectedProperty = new PropertyResponseDetailDto
        {
            IdProperty = propertyId,
            IdOwner = "owner1",
            Name = "Test Property",
            Address = "123 Test St",
            Price = 100000,
            Image = null,
            Images = null
        };

        _mockPropertyService
            .Setup(s => s.GetPropertyAsync(propertyId))
            .ReturnsAsync(expectedProperty!);

        // Act
        var result = await _controller.GetProperty(propertyId);

        // Assert
        Assert.That(result.Result, Is.InstanceOf<OkObjectResult>());
        var okObjectResult = result.Result as OkObjectResult;
        Assert.That(okObjectResult?.Value, Is.EqualTo(expectedProperty));
    }

    [Test]
    public async Task GetProperty_WithInvalidId_ReturnsNotFound()
    {
        // Arrange
        var propertyId = "invalid-id";

        _mockPropertyService
            .Setup(s => s.GetPropertyAsync(propertyId))
            .ReturnsAsync((PropertyResponseDetailDto?)null!);

        // Act
        var result = await _controller.GetProperty(propertyId);

        // Assert
        Assert.That(result.Result, Is.InstanceOf<NotFoundObjectResult>());
        var notFoundObjectResult = result.Result as NotFoundObjectResult;
        Assert.That(notFoundObjectResult?.Value, Is.EqualTo("Property not found"));
    }
}

