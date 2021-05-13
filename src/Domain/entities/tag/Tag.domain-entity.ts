export const MIN_TAG_DESCRIPTION_LENGTH = 3;
export const MAX_TAG_DESCRIPTION_LENGTH = 27;
import { ERROR_TAG_DESCRIPTION_LENGTH } from './TagErrors.domain-entity';
import { validateStringLengthBetweenMaxAndMin } from '@domain/utils';
import { Entity, Result, UniqueEntityID } from 'types-ddd';
import { TagProps } from './Tag.domain-entity-interface';

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

  delete(): void {
    this.props.isDeleted = true;
    this.props.updatedAt = new Date();
  }

  public static create(props: TagProps, id?: UniqueEntityID): Result<Tag> {
    const isValidDescription = validateStringLengthBetweenMaxAndMin({
      text: props.description,
      maxLength: MAX_TAG_DESCRIPTION_LENGTH,
      minLength: MIN_TAG_DESCRIPTION_LENGTH,
    });

    if (!isValidDescription) {
      return Result.fail<Tag>(ERROR_TAG_DESCRIPTION_LENGTH);
    }
    return Result.ok<Tag>(new Tag(props, id));
  }
}
