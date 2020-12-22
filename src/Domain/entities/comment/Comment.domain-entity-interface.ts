import { BaseDomainEntity } from '../../../Shared';

export interface CommentProps extends BaseDomainEntity {
  text: string;
  reportedCommentQuantity?: number;
  likes?: number;
}
