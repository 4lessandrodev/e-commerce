export abstract class BaseDomainEntity {
  constructor(public criatedAt?: Date, public updatedAt?: Date) {
    this.criatedAt = criatedAt ?? new Date();
    this.updatedAt = updatedAt ?? new Date();
  }
}
