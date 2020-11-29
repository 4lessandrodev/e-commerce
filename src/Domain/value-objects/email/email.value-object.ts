import { Result } from '../../../Shared/Result';
import { ValueObject } from '../value-object';
export interface EmailValueObjectProps {
  value: string;
}

export class EmailValueObject extends ValueObject<EmailValueObjectProps> {
  constructor(props: EmailValueObjectProps) {
    super(props);
  }

  getValue(): string {
    return this.props.value;
  }

  public static create(value: string): Result<EmailValueObject> {
    return Result.ok<EmailValueObject>(new EmailValueObject({ value }));
  }
}
