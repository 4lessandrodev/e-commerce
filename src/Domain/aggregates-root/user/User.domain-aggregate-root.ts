import { AggregateRoot, Result, UniqueEntityID } from '../../../Shared';
import { EmailValueObject, PasswordValueObject } from '../../value-objects';
import { UserProps } from './User.domain-aggregate-root-interface';

export class User extends AggregateRoot<UserProps> {
  private constructor(props: UserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get email(): EmailValueObject {
    return this.props.email;
  }

  get password(): PasswordValueObject {
    return this.props.password;
  }

  get isClient(): boolean {
    return this.props.permission === 'CLIENT';
  }

  get isDeveloper(): boolean {
    return this.props.permission === 'DEVELOPER';
  }

  get isAdmin(): boolean {
    return this.props.permission === 'ADMIN';
  }

  get isDeliveryman(): boolean {
    return this.props.permission === 'DELIVERYMAN';
  }

  get isActive(): boolean {
    return this.props.isActive;
  }

  get isTheEmailConfirmed(): boolean {
    return this.props.isTheEmailConfirmed;
  }

  confirmEmail(): void {
    this.props.isTheEmailConfirmed = true;
    this.props.updatedAt = new Date();
  }

  deactivate(): void {
    this.props.isActive = false;
    this.props.updatedAt = new Date();
  }

  activate(): void {
    this.props.isActive = true;
    this.props.updatedAt = new Date();
  }

  makeClient(): void {
    this.props.permission = 'CLIENT';
    this.props.updatedAt = new Date();
  }

  makeAdmin(): void {
    this.props.permission = 'ADMIN';
    this.props.updatedAt = new Date();
  }

  makeDeveloper(): void {
    this.props.permission = 'DEVELOPER';
    this.props.updatedAt = new Date();
  }

  makeDeliveryman(): void {
    this.props.permission = 'DELIVERYMAN';
    this.props.updatedAt = new Date();
  }

  public static create(props: UserProps, id?: UniqueEntityID): Result<User> {
    return Result.ok<User>(new User(props, id));
  }
}
