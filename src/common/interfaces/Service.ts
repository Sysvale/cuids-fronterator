export interface Service<T> {
	create(item: T): Promise<T>;
	update(params?: any): Promise<T>;
	index(params?: any): Promise<T[]>;
	delete(param: string | { id: string }): Promise<T | null>;
	show(params?: any): Promise<T>;
}
