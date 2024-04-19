class Rented {
    constructor(
        RentedId, MotorcycleId, CustomerId, Deposit, RentedFrom, RentedTo,
        OutsideLocation, Status, CreatedAt, UpdatedAt, DeletedAt
        )
        {
            this.RentedId = RentedId;
            this.MotorcycleId = MotorcycleId;
            this.CustomerId = CustomerId;
            this.Deposit = Deposit;
            this.RentedFrom = RentedFrom;
            this.RentedTo = RentedTo;
            this.OutsideLocation = OutsideLocation;
            this.Status = Status;
            this.CreatedAt = CreatedAt;
            this.UpdatedAt = UpdatedAt;
            this.DeletedAt = DeletedAt;
        }
}