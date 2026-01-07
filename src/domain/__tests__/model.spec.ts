/* eslint-disable no-undef */
import __ENTITY__ from '../__entity__.model';
import { describe, test, expect } from 'vitest';

describe('__ENTITY__ model', () => {
	test('Payload is resolved correctly', () => {
		const __entity__ = new __ENTITY__({
			id: '1',
			name: '__ENTITY__',
		});

		expect(__entity__.asRequestPayload()).toStrictEqual({
			id: '1',
			name: '__ENTITY__',
		});
	});
});
