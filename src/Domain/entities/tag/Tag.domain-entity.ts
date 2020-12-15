import { Entity, Result, UniqueEntityID } from '../../../Shared';
import { validateStringLengthBetweenMaxAndMin } from '../../utils';
import { TagProps } from './Tag.domain-entity-interface';
import { ERROR_TAG_DESCRIPTION_LENGTH } from './TagErrors.domain-entity';
export const TAG_DESCRIPTION_MIN_STRING_LENGTH = 3;
export const TAG_DESCRIPTION_MAX_STRING_LENGTH = 27;

export class Tag extends Entity<TagProps> {
  private constructor(props: TagProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get description(): string {
    return this.props.description;
  }

  public static create(props: TagProps, id?: UniqueEntityID): Result<Tag> {
    const isValidDescription = validateStringLengthBetweenMaxAndMin({
      text: props.description,
      maxLength: TAG_DESCRIPTION_MAX_STRING_LENGTH,
      minLength: TAG_DESCRIPTION_MIN_STRING_LENGTH,
    });

    if (!isValidDescription) {
      return Result.fail<Tag>(ERROR_TAG_DESCRIPTION_LENGTH);
    }
    return Result.ok<Tag>(new Tag(props, id));
  }
}
