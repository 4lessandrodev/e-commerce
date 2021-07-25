import { DomainId, IMapper } from 'types-ddd';
import { User } from '@domain/aggregates-root';
import { User as Schema } from '../entities/user.schema';
import { EmailValueObject, PasswordValueObject } from '@domain/value-objects';

export class UserMapper implements IMapper<User, Schema> {
	toDomain(target: Schema): User {
		return User.create(
			{
				email: EmailValueObject.create(target.email).getResult(),
				isActive: target.isActive,
				isTheEmailConfirmed: target.isTheEmailConfirmed,
				password: PasswordValueObject.create(
					target.password
				).getResult(),
				role: target.role,
				createdAt: target.createdAt,
				updatedAt: target.updatedAt,
				terms: target.terms
			},
			DomainId.create(target.id).id
		).getResult();
	}

	toPersistence(target: User): Schema {
		return {
			id: target.id.toString(),
			email: target.email.value,
			createdAt: target.createdAt,
			isActive: target.isActive,
			isTheEmailConfirmed: target.isTheEmailConfirmed,
			password: target.password.value,
			role: target.role,
			updatedAt: target.updatedAt,
			terms: target.terms
		};
	}
}
