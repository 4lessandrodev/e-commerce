import { BaseDomainEntity } from 'types-ddd';

export interface CommentProps extends BaseDomainEntity {
	text: string;
	reportedCommentQuantity?: number;
	likes?: number;
}
