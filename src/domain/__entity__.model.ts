import { IRequestable } from '@sysvale/cuids-generator';

export default class __ENTITY__ implements IRequestable<Object> {
	private id: string;
	private name: string;

	constructor(args?: any) {
		this.id = args?.id;
		this.name = args?.name;
	}

	asRequestPayload = (): Object => {
		return {
			id: this.id,
			name: this.name,
		};
	};
}
