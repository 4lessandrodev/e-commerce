import { Entity, Result, UniqueEntityID } from 'types-ddd';
import { validateStringLengthBetweenMaxAndMin } from '../../utils';
import { CommentProps } from './Comment.domain-entity-interface';
import { ERROR_COMMENT_TEXT_LENGTH } from './CommentErrors.domain-entity';
export const COMMENT_TEXT_MIN_STRING_LENGTH = 1;
export const COMMENT_TEXT_MAX_STRING_LENGTH = 250;
export const COMMENT_MIN_QUANTITY_TO_DELETE = 7;

export class Comment extends Entity<CommentProps> {
  private constructor(props: CommentProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get text(): string {
    return this.props.text;
  }

  get likes(): number {
    return this.props.likes ?? 0;
  }

  get reportedCommentQuantity(): number {
    return this.props.reportedCommentQuantity ?? 0;
  }

  incrementCommentReport(): void {
    this.props.reportedCommentQuantity = this.reportedCommentQuantity + 1;
    if (this.reportedCommentQuantity >= COMMENT_MIN_QUANTITY_TO_DELETE) {
      this.deleteCommentOnReportSevenTimes();
    }
  }

  incrementLike(): void {
    this.props.likes = this.likes + 1;
  }

  deleteCommentOnReportSevenTimes(): void {
    this.props.updatedAt = new Date();
    this.props.isDeleted = true;
  }

  public static create(
    props: CommentProps,
    id?: UniqueEntityID,
  ): Result<Comment> {
    const isValidText = validateStringLengthBetweenMaxAndMin({
      text: props.text,
      maxLength: COMMENT_TEXT_MAX_STRING_LENGTH,
      minLength: COMMENT_TEXT_MIN_STRING_LENGTH,
    });

    if (!isValidText) {
      return Result.fail<Comment>(ERROR_COMMENT_TEXT_LENGTH);
    }

    return Result.ok<Comment>(new Comment(props, id));
  }
}
