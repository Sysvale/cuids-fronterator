import { CUIDSService } from '@sysvale/cuids-generator';
import __ENTITY__ from './__entity__.model';

export default class __ENTITY__Service extends CUIDSService<__ENTITY__> {
	constructor(resource: string, httpClient?: any) {
		super(resource, httpClient);
	}
}
