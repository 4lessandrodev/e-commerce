import { AggregateRoot, Result, UniqueEntityID } from 'types-ddd';
import { ClientProps } from './client.domain-aggregate-root-interface';
import { Address } from '@domain/entities';
import {
  ImageValueObject,
  RegionNameValueObject as RegionNameValueObject,
} from '@domain/value-objects';

export class Client extends AggregateRoot<ClientProps> {
  private constructor(props: ClientProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get name(): RegionNameValueObject {
    return this.props.name;
  }

  get avatar(): ImageValueObject | undefined {
    return this.props.avatar;
  }

  get hasEcobag(): boolean {
    return this.props.hasEcobag;
  }

  get addresses(): Address[] {
    return this.props.addresses;
  }

  public static create(
    props: ClientProps,
    id?: UniqueEntityID,
  ): Result<Client> {
    return Result.ok<Client>(new Client(props, id));
  }
}
