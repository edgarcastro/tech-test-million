namespace tech_test_million.Models;

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class PropertyImage
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string IdPropertyImage { get; set; } = string.Empty;

    [BsonElement("idProperty")]
    [BsonRepresentation(BsonType.ObjectId)]
    public string IdProperty { get; set; } = string.Empty;

    [BsonElement("file")]
    public byte[] File { get; set; } = Array.Empty<byte>();

    [BsonElement("enabled")]
    [BsonRepresentation(BsonType.Boolean)]
    public bool Enabled { get; set; } = true;
}