import { Entity, UniqueEntityID } from 'types-ddd';

export class StateId extends Entity<any> {
	get id(): UniqueEntityID {
		return this._id;
	}

	private constructor(id?: UniqueEntityID) {
		super(null, id);
	}

	public static create(id?: UniqueEntityID): StateId {
		return new StateId(id);
	}
}
