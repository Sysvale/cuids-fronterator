/* eslint-disable no-undef */
import __entity__Service from '../__entity__.service';
import __ENTITY__ from '../__entity__.model';
import axios from 'axios';
import { vi, describe, test, expect } from 'vitest';

vi.mock('axios');

const mockedAxios = axios;

describe('__ENTITY__ service', () => {
	test('Create', async () => {
		const itemToCreate = new __ENTITY__ ({
			name: 'Test resource',
		});

		await __entity__Service.create(itemToCreate);

		expect(mockedAxios.post).toHaveBeenCalledWith('/__entityPlural__', itemToCreate);
		expect(mockedAxios.post).toHaveBeenCalledTimes(1);
	});

	test('Update', async () => {
		await __entity__Service.update({
			id: '1',
			name: 'Test resource',
		});

		expect(mockedAxios.put).toHaveBeenCalledWith('/__entityPlural__/1', { name: 'Test resource' });
		expect(mockedAxios.put).toHaveBeenCalledTimes(1);
	});

	test('Index', async () => {
		await __entity__Service.index({ filter: 'test' });

		expect(mockedAxios.get).toHaveBeenCalledWith('/__entityPlural__', { params: { filter: 'test' } });
		expect(mockedAxios.get).toHaveBeenCalledTimes(1);
	});

	test('Delete', async () => {
		await __entity__Service.delete('test');

		expect(mockedAxios.delete).toHaveBeenCalledWith('/__entityPlural__/test');
		
		await __entity__Service.delete({ id: 'test' });
		
		expect(mockedAxios.delete).toHaveBeenCalledWith('/__entityPlural__/test');
		expect(mockedAxios.delete).toHaveBeenCalledTimes(2);
	});

	test('Show', async () => {
		await __entity__Service.show({
			id: '1',
			name: 'Test resource',
		});

		expect(mockedAxios.get).toHaveBeenCalledWith('/__entityPlural__/1', { params: { name: 'Test resource' } });
		expect(mockedAxios.get).toHaveBeenCalledTimes(2);
	});
});
