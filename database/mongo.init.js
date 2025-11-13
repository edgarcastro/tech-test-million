db = db.getSiblingDB("tech-test-million");

// Create collections
db.createCollection("owners");
db.createCollection("properties");
db.createCollection("propertyImages");
db.createCollection("propertyTraces");

// Insert mock Owners
const owner1 = ObjectId();
const owner2 = ObjectId();
const owner3 = ObjectId();
const owner4 = ObjectId();
const owner5 = ObjectId();

db.owners.insertMany([
  {
    _id: owner1,
    name: "John Smith",
    address: "123 Main Street, New York, NY 10001",
    photo: null,
    birthday: ISODate("1985-05-15T00:00:00Z"),
  },
  {
    _id: owner2,
    name: "Maria Garcia",
    address: "456 Oak Avenue, Los Angeles, CA 90001",
    photo: null,
    birthday: ISODate("1990-08-22T00:00:00Z"),
  },
  {
    _id: owner3,
    name: "Robert Johnson",
    address: "789 Pine Road, Chicago, IL 60601",
    photo: null,
    birthday: ISODate("1978-12-03T00:00:00Z"),
  },
  {
    _id: owner4,
    name: "Emily Davis",
    address: "321 Elm Street, Houston, TX 77001",
    photo: null,
    birthday: ISODate("1992-03-18T00:00:00Z"),
  },
  {
    _id: owner5,
    name: "Michael Brown",
    address: "654 Maple Drive, Phoenix, AZ 85001",
    photo: null,
    birthday: ISODate("1988-07-25T00:00:00Z"),
  },
]);

// Insert mock Properties
const property1 = ObjectId();
const property2 = ObjectId();
const property3 = ObjectId();
const property4 = ObjectId();
const property5 = ObjectId();
const property6 = ObjectId();
const property7 = ObjectId();
const property8 = ObjectId();

db.properties.insertMany([
  {
    _id: property1,
    name: "Luxury Downtown Apartment",
    address: "100 Central Park West, New York, NY 10023",
    price: 850000,
    codeInternal: "PROP-001",
    year: 2020,
    idOwner: owner1,
  },
  {
    _id: property2,
    name: "Modern Beach House",
    address: "200 Ocean Drive, Miami Beach, FL 33139",
    price: 1200000,
    codeInternal: "PROP-002",
    year: 2019,
    idOwner: owner2,
  },
  {
    _id: property3,
    name: "Suburban Family Home",
    address: "300 Maple Street, San Francisco, CA 94102",
    price: 950000,
    codeInternal: "PROP-003",
    year: 2018,
    idOwner: owner1,
  },
  {
    _id: property4,
    name: "City Loft",
    address: "150 Broadway, Seattle, WA 98101",
    price: 650000,
    codeInternal: "PROP-004",
    year: 2021,
    idOwner: owner3,
  },
  {
    _id: property5,
    name: "Mountain Retreat",
    address: "500 Mountain View Road, Denver, CO 80202",
    price: 750000,
    codeInternal: "PROP-005",
    year: 2017,
    idOwner: owner4,
  },
  {
    _id: property6,
    name: "Riverside Condo",
    address: "250 River Road, Boston, MA 02101",
    price: 550000,
    codeInternal: "PROP-006",
    year: 2022,
    idOwner: owner2,
  },
  {
    _id: property7,
    name: "Historic Townhouse",
    address: "175 Heritage Lane, Philadelphia, PA 19101",
    price: 680000,
    codeInternal: "PROP-007",
    year: 2015,
    idOwner: owner5,
  },
  {
    _id: property8,
    name: "Desert Oasis",
    address: "400 Desert Trail, Las Vegas, NV 89101",
    price: 480000,
    codeInternal: "PROP-008",
    year: 2020,
    idOwner: owner3,
  },
]);

// Insert mock PropertyImages
// Using base64 encoded placeholder images (small 1x1 pixel PNG)
const placeholderImage = BinData(
  0,
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
);

db.propertyImages.insertMany([
  {
    _id: ObjectId(),
    file: placeholderImage,
    enabled: true,
    idProperty: property1,
  },
  {
    _id: ObjectId(),
    file: placeholderImage,
    enabled: true,
    idProperty: property1,
  },
  {
    _id: ObjectId(),
    file: placeholderImage,
    enabled: false,
    idProperty: property1,
  },
  {
    _id: ObjectId(),
    file: placeholderImage,
    enabled: true,
    idProperty: property2,
  },
  {
    _id: ObjectId(),
    file: placeholderImage,
    enabled: true,
    idProperty: property2,
  },
  {
    _id: ObjectId(),
    file: placeholderImage,
    enabled: true,
    idProperty: property3,
  },
  {
    _id: ObjectId(),
    file: placeholderImage,
    enabled: false,
    idProperty: property3,
  },
  {
    _id: ObjectId(),
    file: placeholderImage,
    enabled: true,
    idProperty: property4,
  },
  {
    _id: ObjectId(),
    file: placeholderImage,
    enabled: true,
    idProperty: property5,
  },
  {
    _id: ObjectId(),
    file: placeholderImage,
    enabled: true,
    idProperty: property5,
  },
  {
    _id: ObjectId(),
    file: placeholderImage,
    enabled: true,
    idProperty: property6,
  },
  {
    _id: ObjectId(),
    file: placeholderImage,
    enabled: true,
    idProperty: property7,
  },
  {
    _id: ObjectId(),
    file: placeholderImage,
    enabled: false,
    idProperty: property7,
  },
  {
    _id: ObjectId(),
    file: placeholderImage,
    enabled: true,
    idProperty: property8,
  },
]);

// Insert mock PropertyTraces
db.propertyTraces.insertMany([
  {
    _id: ObjectId(),
    dateSale: ISODate("2023-01-15T00:00:00Z"),
    name: "Initial Purchase",
    value: 800000,
    tax: 8000,
    idProperty: property1,
  },
  {
    _id: ObjectId(),
    dateSale: ISODate("2023-06-20T00:00:00Z"),
    name: "Property Valuation",
    value: 850000,
    tax: 8500,
    idProperty: property1,
  },
  {
    _id: ObjectId(),
    dateSale: ISODate("2022-11-10T00:00:00Z"),
    name: "Initial Purchase",
    value: 1150000,
    tax: 11500,
    idProperty: property2,
  },
  {
    _id: ObjectId(),
    dateSale: ISODate("2023-03-05T00:00:00Z"),
    name: "Market Assessment",
    value: 1200000,
    tax: 12000,
    idProperty: property2,
  },
  {
    _id: ObjectId(),
    dateSale: ISODate("2021-09-12T00:00:00Z"),
    name: "Initial Purchase",
    value: 900000,
    tax: 9000,
    idProperty: property3,
  },
  {
    _id: ObjectId(),
    dateSale: ISODate("2023-08-18T00:00:00Z"),
    name: "Property Appraisal",
    value: 950000,
    tax: 9500,
    idProperty: property3,
  },
  {
    _id: ObjectId(),
    dateSale: ISODate("2022-04-22T00:00:00Z"),
    name: "Initial Purchase",
    value: 620000,
    tax: 6200,
    idProperty: property4,
  },
  {
    _id: ObjectId(),
    dateSale: ISODate("2023-07-30T00:00:00Z"),
    name: "Valuation Update",
    value: 650000,
    tax: 6500,
    idProperty: property4,
  },
  {
    _id: ObjectId(),
    dateSale: ISODate("2020-05-14T00:00:00Z"),
    name: "Initial Purchase",
    value: 720000,
    tax: 7200,
    idProperty: property5,
  },
  {
    _id: ObjectId(),
    dateSale: ISODate("2023-02-28T00:00:00Z"),
    name: "Market Evaluation",
    value: 750000,
    tax: 7500,
    idProperty: property5,
  },
  {
    _id: ObjectId(),
    dateSale: ISODate("2023-01-08T00:00:00Z"),
    name: "Initial Purchase",
    value: 530000,
    tax: 5300,
    idProperty: property6,
  },
  {
    _id: ObjectId(),
    dateSale: ISODate("2023-10-15T00:00:00Z"),
    name: "Property Assessment",
    value: 550000,
    tax: 5500,
    idProperty: property6,
  },
  {
    _id: ObjectId(),
    dateSale: ISODate("2018-03-20T00:00:00Z"),
    name: "Initial Purchase",
    value: 650000,
    tax: 6500,
    idProperty: property7,
  },
  {
    _id: ObjectId(),
    dateSale: ISODate("2023-05-10T00:00:00Z"),
    name: "Valuation Review",
    value: 680000,
    tax: 6800,
    idProperty: property7,
  },
  {
    _id: ObjectId(),
    dateSale: ISODate("2021-11-25T00:00:00Z"),
    name: "Initial Purchase",
    value: 460000,
    tax: 4600,
    idProperty: property8,
  },
  {
    _id: ObjectId(),
    dateSale: ISODate("2023-09-12T00:00:00Z"),
    name: "Market Analysis",
    value: 480000,
    tax: 4800,
    idProperty: property8,
  },
]);

print("Database initialized successfully with mock data!");
