import { Result } from '../../../Shared/Result';
import { validateLink } from '../../utils/validate-link.domain.util';
import { ValueObject } from '../value-object';
import { ERROR_INVALID_URL } from './image-errors.domain';

interface ImageValueObjectProps {
  value: string;
}

export class ImageValueObject extends ValueObject<ImageValueObjectProps> {
  constructor(props: ImageValueObjectProps) {
    super(props);
  }

  getUrl(): string {
    return this.props.value;
  }

  static create(url: string): Result<ImageValueObject> {
    const isValidUrl = validateLink(url);
    if (!isValidUrl) {
      return Result.fail<ImageValueObject>(ERROR_INVALID_URL);
    }
    return Result.ok<ImageValueObject>(new ImageValueObject({ value: url }));
  }
}
