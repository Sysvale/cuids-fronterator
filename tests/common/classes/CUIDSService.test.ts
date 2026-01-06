import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { CUIDSService } from '../../../src/common/classes/CUIDSService';

vi.mock('axios', () => ({
	default: {
		post: vi.fn(),
		put: vi.fn(),
		get: vi.fn(),
		delete: vi.fn(),
	},
}));

class TestService extends CUIDSService<any> {}

describe('CUIDSService', () => {
	let service: TestService;

	beforeEach(() => {
		vi.clearAllMocks();
		service = new TestService('users', axios);
	});

	it('creates an item via POST', async () => {
		const payload = { name: 'John' };
		const response = { data: payload };

		(axios.post as any).mockResolvedValue(response);

		const result = await service.create(payload);

		expect(axios.post).toHaveBeenCalledWith('/users', payload);
		expect(result).toBe(response);
	});

	it('updates an item via PUT with id', async () => {
		const params = { id: '123', name: 'John' };
		const response = { data: params };

		(axios.put as any).mockResolvedValue(response);

		const result = await service.update(params);

		expect(axios.put).toHaveBeenCalledWith(
			'/users/123',
			{ name: 'John' }
		);
		expect(result).toBe(response);
	});

	it('lists items via GET with params', async () => {
		const params = { page: 2 };
		const response = { data: [] };

		(axios.get as any).mockResolvedValue(response);

		const result = await service.index(params);

		expect(axios.get).toHaveBeenCalledWith(
			'/users',
			{ params }
		);
		expect(result).toBe(response);
	});

	it('deletes an item using string id', async () => {
		const response = { data: null };

		(axios.delete as any).mockResolvedValue(response);

		const result = await service.delete('123');

		expect(axios.delete).toHaveBeenCalledWith('/users/123');
		expect(result).toBe(response);
	});

	it('deletes an item using object with id', async () => {
		const response = { data: null };

		(axios.delete as any).mockResolvedValue(response);

		const result = await service.delete({ id: '456' });

		expect(axios.delete).toHaveBeenCalledWith('/users/456');
		expect(result).toBe(response);
	});

	it('fetches a single item via GET with id and params', async () => {
		const params = { id: '789', expand: true };
		const response = { data: {} };

		(axios.get as any).mockResolvedValue(response);

		const result = await service.show(params);

		expect(axios.get).toHaveBeenCalledWith(
			'/users/789',
			{ params: { expand: true } }
		);
		expect(result).toBe(response);
	});
});
