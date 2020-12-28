import { AggregateRoot, Result, UniqueEntityID } from '../../../Shared';
import { EmailValueObject, PasswordValueObject } from '../../value-objects';
import { UserProps } from './User.domain-aggregate-root-interface';
import { ERROR_USER_HAS_MORE_THAN_ONE_PERMISSION } from './UserErrors.domain-aggregate-root';

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

  get isDeveloper(): boolean {
    return this.props.isDeveloper;
  }

  get isAdmin(): boolean {
    return this.props.isAdmin;
  }

  get isDeliveryman(): boolean {
    return this.props.isDeliveryman;
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

  makeAdmin(): void {
    this.props.isAdmin = true;
    this.props.isDeliveryman = false;
    this.props.isDeveloper = false;
    this.props.updatedAt = new Date();
  }

  makeDeveloper(): void {
    this.props.isAdmin = false;
    this.props.isDeliveryman = false;
    this.props.isDeveloper = true;
    this.props.updatedAt = new Date();
  }

  makeDeliveryman(): void {
    this.props.isAdmin = false;
    this.props.isDeliveryman = true;
    this.props.isDeveloper = false;
    this.props.updatedAt = new Date();
  }

  public static create(props: UserProps, id?: UniqueEntityID): Result<User> {
    const hasUserMoreThanOnePermission =
      (props.isAdmin && props.isDeliveryman) ||
      (props.isAdmin && props.isDeveloper) ||
      (props.isDeliveryman && props.isDeveloper);

    if (hasUserMoreThanOnePermission) {
      return Result.fail<User>(ERROR_USER_HAS_MORE_THAN_ONE_PERMISSION);
    }
    return Result.ok<User>(new User(props, id));
  }
}
