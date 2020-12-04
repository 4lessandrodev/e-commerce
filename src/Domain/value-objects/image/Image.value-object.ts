import { Result } from '../../../Shared/Result';
import { validateLink } from '../../utils/validate-link.domain.util';
import { ValueObject } from '../value-object';
import { ERROR_INVALID_URL } from './Image-errors.domain';

interface ImageValueObjectProps {
  value: string;
}

/**
 * @extends ValueObject
 */
export class ImageValueObject extends ValueObject<ImageValueObjectProps> {
  private constructor(props: ImageValueObjectProps) {
    super(props);
  }

  /**
   * Return url string
   */
  getUrl(): string {
    return this.props.value;
  }

  /**
   * return a `Result.ok` with instance of ImageValueObject
   * @param url link string.
   * If provide a invalid url returns a `Result.fail`
   */
  static create(url: string): Result<ImageValueObject> {
    const isValidUrl = validateLink(url);
    if (!isValidUrl) {
      return Result.fail<ImageValueObject>(ERROR_INVALID_URL);
    }
    return Result.ok<ImageValueObject>(new ImageValueObject({ value: url }));
  }
}
