import { UniqueEntityID } from '../../../Shared';
import {
  Comment,
  COMMENT_MIN_QUANTITY_TO_DELETE,
} from './Comment.domain-entity';
import { CommentProps } from './Comment.domain-entity-interface';
import { ERROR_COMMENT_TEXT_LENGTH } from './CommentErrors.domain-entity';
import { lorem } from 'faker';
import { CommentId } from './CommentId.domain-entity';

describe('Comment.domain-entity', () => {
  const makeSut = (props?: CommentProps, id?: UniqueEntityID) => {
    return Comment.create(
      {
        text: props?.text ?? 'lorem ipsum a comment valid comment',
        likes: props?.likes,
        reportedCommentQuantity: props?.reportedCommentQuantity,
      },
      id,
    );
  };

  it('Should create a valid comment', () => {
    const createdComment = makeSut();
    expect(createdComment.getResult().text).toBe(
      'lorem ipsum a comment valid comment',
    );
    expect(createdComment.isFailure).toBe(false);
  });

  it('Should fail if provide a long comment', async () => {
    const text = 'lorem ipsum a comment invalid comment'.repeat(10);
    const createdComment = makeSut({
      text,
    });
    expect(createdComment.error).toBe(ERROR_COMMENT_TEXT_LENGTH);
    expect(createdComment.isFailure).toBe(true);
  });

  it('Should fail if provide a short comment', async () => {
    const text = '';
    const createdComment = makeSut({
      text,
    });
    expect(createdComment.error).toBe(ERROR_COMMENT_TEXT_LENGTH);
    expect(createdComment.isFailure).toBe(true);
  });

  it('Should incremente a like on created comment', () => {
    const createdComment = makeSut();
    createdComment.getResult().incrementLike();
    expect(createdComment.getResult().likes).toBe(1);
    expect(createdComment.isFailure).toBe(false);
  });

  it('Should incremente a report on created comment', () => {
    const createdComment = makeSut();
    expect(createdComment.getResult().isDeleted).toBe(false);
    expect(createdComment.getResult().reportedCommentQuantity).toBe(0);
    for (let index = 0; index <= COMMENT_MIN_QUANTITY_TO_DELETE; index++) {
      createdComment.getResult().incremmentCommentReport();
    }
    expect(createdComment.getResult().reportedCommentQuantity).toBeGreaterThan(
      COMMENT_MIN_QUANTITY_TO_DELETE,
    );
    expect(createdComment.isFailure).toBe(false);
    expect(createdComment.getResult().isDeleted).toBe(true);
  });

  it('Should create a comment with provided id', () => {
    const createdId = CommentId.create().id;
    const createdComment = makeSut(
      {
        text: lorem.words(2),
      },
      createdId,
    );
    expect(createdComment.isFailure).toBe(false);
    expect(createdComment.getResult().id.toString()).toBe(createdId.toString());
  });

  it('Should fail if provide a text greatter than 250 char', () => {
    const createdId = CommentId.create().id;
    const createdComment = makeSut(
      {
        text: lorem.words(250),
      },
      createdId,
    );
    expect(createdComment.isFailure).toBe(true);
    expect(createdComment.error).toBe(ERROR_COMMENT_TEXT_LENGTH);
  });
});
