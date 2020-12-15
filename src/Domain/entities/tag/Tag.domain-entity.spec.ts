import { Result, UniqueEntityID } from '../../../Shared';
import { Tag } from './Tag.domain-entity';
import { TagProps } from './Tag.domain-entity-interface';
import { ERROR_TAG_DESCRIPTION_LENGTH } from './TagErrors.domain-entity';
import { TagId } from './TagId.domain-entity';

describe('Tag.domain-entity', () => {
  const makeSut = (props?: TagProps, id?: UniqueEntityID): Result<Tag> => {
    return Tag.create(
      {
        description: props?.description ?? 'Valid Description',
        isDeleted: props?.isDeleted,
      },
      id,
    );
  };

  it('Should create a valid  tag', async () => {
    const createdTag = makeSut();
    const createdTagResult = createdTag.getResult();
    expect(createdTag.isFailure).toBe(false);
    expect(createdTagResult.isDeleted).toBe(false);
    expect(createdTag.isSuccess).toBe(true);
    expect(createdTagResult.description).toBe('Valid Description');
    expect(createdTagResult.id).not.toBeUndefined();
    expect(createdTagResult.id).not.toBeNull();
  });

  it('Should create a valid  tag with provided id', async () => {
    const createdTagId = TagId.create().id;
    const createdTag = makeSut(
      {
        description: 'Valid Description',
      },
      createdTagId,
    );
    const createdTagResult = createdTag.getResult();
    expect(createdTag.isFailure).toBe(false);
    expect(createdTagResult.isDeleted).toBe(false);
    expect(createdTag.isSuccess).toBe(true);
    expect(createdTagResult.description).toBe('Valid Description');
    expect(createdTagResult.id.toString()).toBe(createdTagId.toString());
  });

  it('Should delete a tag', () => {
    const createdTag = makeSut();
    expect(createdTag.isFailure).toBe(false);
    expect(createdTag.getResult().isDeleted).toBe(false);
    createdTag.getResult().delete();
    expect(createdTag.getResult().isDeleted).toBe(true);
  });

  it('Should fail if provide a short description ', () => {
    const createdTag = makeSut({
      description: 'a',
    });
    expect(createdTag.isFailure).toBe(true);
    expect(createdTag.error).toBe(ERROR_TAG_DESCRIPTION_LENGTH);
  });

  it('Should fail if provide a long description ', () => {
    const createdTag = makeSut({
      description: 'this_is_a_long_description_to_test_fail_test',
    });
    expect(createdTag.isFailure).toBe(true);
    expect(createdTag.error).toBe(ERROR_TAG_DESCRIPTION_LENGTH);
  });
});
