import { CUIDSService } from '@sysvale/cuids-generator';
import __ENTITY__ from './__entity__.model';

class __ENTITY__Service extends CUIDSService<__ENTITY__> {
	constructor(resource: string) {
		super(resource);
	}
}

export default new __ENTITY__Service('__entityPlural__');
