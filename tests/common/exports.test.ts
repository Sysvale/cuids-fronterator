import { describe, it, expect } from 'vitest';
import { CUIDSService } from '../../src/common/classes/CUIDSService';

describe('common exports', () => {
	it('CUIDSService is extendable', () => {
		class TestService extends CUIDSService<string> {
			list() {
				return Promise.resolve([]);
			}
		}

		const service = new TestService('test');
		expect(service).toBeInstanceOf(CUIDSService);
	});
});
