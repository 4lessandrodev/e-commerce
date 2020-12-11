export abstract class BaseDomainEntity {
  constructor(
    public criatedAt?: Date,
    public updatedAt?: Date,
    public isDeleted?: boolean,
  ) {
    this.criatedAt = criatedAt ?? new Date();
    this.updatedAt = updatedAt ?? new Date();
    this.isDeleted = isDeleted ?? false;
  }
}
