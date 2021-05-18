const validateZipCodeWithHyphen = /[0-9]{5}(-[0-9]{3})/g;
const validateZipCode = /[0-9]{8}/g;
import { Result, ValueObject } from 'types-ddd';
import { ERROR_INVALID_ZIP_CODE } from './zip-code-errors.domain';

interface ZipCodeValueObjectProps {
  value: string;
}

export class ZipCodeValueObject extends ValueObject<ZipCodeValueObjectProps> {
  private constructor(props: ZipCodeValueObjectProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  public static create(zipCode: string): Result<ZipCodeValueObject> {
    //
    let zipCodeNormalized: string = zipCode;
    const isValidZipCodeWithHyphen = validateZipCodeWithHyphen.test(zipCode);

    if (isValidZipCodeWithHyphen) {
      zipCodeNormalized = zipCode.replace(/\-/g, '');
    }

    const isValidZipCode = validateZipCode.test(zipCodeNormalized);

    if (!isValidZipCode) {
      return Result.fail<ZipCodeValueObject>(ERROR_INVALID_ZIP_CODE);
    }

    return Result.ok<ZipCodeValueObject>(
      new ZipCodeValueObject({ value: zipCodeNormalized }),
    );
  }
}
