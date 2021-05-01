import { EmailValueObject, PasswordValueObject } from '@domain/value-objects';
import { AggregateRoot, Result, UniqueEntityID } from 'types-ddd';
import { Role, Term, UserProps } from './User.domain-aggregate-root-interface';

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

  get role(): Role {
    return this.props.role;
  }

  get isClient(): boolean {
    return this.props.role === 'CLIENT';
  }

  get isDeveloper(): boolean {
    return this.props.role === 'DEVELOPER';
  }

  get isAdmin(): boolean {
    return this.props.role === 'ADMIN';
  }

  get isActive(): boolean {
    return this.props.isActive;
  }

  get isTheEmailConfirmed(): boolean {
    return this.props.isTheEmailConfirmed;
  }

  get terms(): Term[] {
    return this.props.terms;
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
    this.props.role = 'CLIENT';
    this.props.updatedAt = new Date();
  }

  makeAdmin(): void {
    this.props.role = 'ADMIN';
    this.props.updatedAt = new Date();
  }

  makeDeveloper(): void {
    this.props.role = 'DEVELOPER';
    this.props.updatedAt = new Date();
  }

  public static create(props: UserProps, id?: UniqueEntityID): Result<User> {
    return Result.ok<User>(new User(props, id));
  }
}
