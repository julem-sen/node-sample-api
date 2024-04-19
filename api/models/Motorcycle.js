class Motorcycle {
    constructor
    (
        MotorcycleId, BookingId, MotorcycleName, MotorcycleDescription, MotorcycleBrand,
        MotorcycleYear, OwnedBy, RentedBy, FuelType, MotorcycleType, MotorcycleTransmission,
        MotorcycleVersion, KMLimit, MotorcycleServiceStatus, Location, Price,
        PricePerWhat, CreatedAt, UpdatedAt, DeletedAt
    )
    {
        this.MotorcycleId = MotorcycleId;
        this.BookingId = BookingId;
        this.MotorcycleName = MotorcycleName;
        this.MotorcycleDescription = MotorcycleDescription;
        this.MotorcycleBrand = MotorcycleBrand;
        this.MotorcycleYear = MotorcycleYear;
        this.OwnedBy = OwnedBy;
        this.RentedBy = RentedBy;
        this.FuelType = FuelType;
        this.MotorcycleType = MotorcycleType;
        this.MotorcycleTransmission = MotorcycleTransmission;
        this.MotorcycleVersion = MotorcycleVersion;
        this.KMLimit = KMLimit;
        this.MotorcycleServiceStatus = MotorcycleServiceStatus;
        this.Location = Location;
        this.Price = Price;
        this.PricePerWhat = PricePerWhat;
        this.CreatedAt = CreatedAt;
        this.UpdatedAt = UpdatedAt;
        this.DeletedAt = DeletedAt;
    }   
}

module.exports = Motorcycle;